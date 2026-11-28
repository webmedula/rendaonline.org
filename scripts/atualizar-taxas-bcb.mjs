// Busca a última taxa média mensal de juros (pessoa física) de cada série SGS na API pública do
// Banco Central e grava em src/data/taxas-bcb.json. Usado pela calculadora de juros da dívida.
// Roda no GitHub Actions (.github/workflows/taxas-bcb.yml) ou à mão: node scripts/atualizar-taxas-bcb.mjs
//
// Segurança dos dados:
// - confere o nome oficial de cada série no Portal de Dados Abertos do BC antes de aceitar o valor;
// - recusa valores fora de uma faixa plausível;
// - se uma série falhar, mantém o último valor bom (e a calculadora ainda tem a reserva no código).
import { readFile, writeFile, appendFile } from 'node:fs/promises';

const ARQUIVO = new URL('../src/data/taxas-bcb.json', import.meta.url);

// código SGS (% a.m.) -> palavras que precisam aparecer no título oficial da série
const SERIES = {
  25463: ['pessoas fisicas', 'cheque especial'],
  25464: ['pessoas fisicas', 'nao consignado'],
  25466: ['pessoas fisicas', 'consignado', 'setor privado'],
  25467: ['pessoas fisicas', 'consignado', 'publico'],
  25468: ['pessoas fisicas', 'consignado', 'inss'],
  25471: ['pessoas fisicas', 'veiculos'],
  25477: ['pessoas fisicas', 'cartao de credito', 'rotativo'],
  25478: ['pessoas fisicas', 'cartao de credito', 'parcelado'],
  25497: ['pessoas fisicas', 'imobiliario'],
  432: ['meta selic'], // Selic (% a.a.), série diária: guardamos só o último valor
};
const SELIC = '432';

const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

async function getJson(url, tentativas = 3) {
  let erro;
  for (let i = 0; i < tentativas; i++) {
    try {
      const r = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': 'rendaonline-taxas/1.0' }, signal: AbortSignal.timeout(30000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } catch (e) {
      erro = e;
      await new Promise((ok) => setTimeout(ok, 2000 * (i + 1)));
    }
  }
  throw erro;
}

/** Título oficial da série no Portal de Dados Abertos do BC (null se o portal não responder). */
async function titulo(codigo) {
  try {
    const j = await getJson(`https://dadosabertos.bcb.gov.br/api/3/action/package_search?q=${codigo}&rows=20`, 2);
    const p = (j?.result?.results ?? []).find((x) => String(x.name ?? '').startsWith(`${codigo}-`));
    return p?.title ?? null;
  } catch {
    return null;
  }
}

const atual = JSON.parse(await readFile(ARQUIVO, 'utf8'));
const series = { ...(atual.series ?? {}) };
const linhas = [];
let ok = 0;

for (const [codigo, palavras] of Object.entries(SERIES)) {
  try {
    const t = await titulo(codigo);
    if (t === null) throw new Error('não consegui conferir o nome da série no portal de dados abertos');
    const faltam = palavras.filter((w) => !norm(t).includes(w));
    if (faltam.length) throw new Error(`o nome oficial não bate (${t}); faltou: ${faltam.join(', ')}`);

    const selic = codigo === SELIC;
    // Séries mensais: últimos 13 meses (para o histórico da página /taxas-de-juros/).
    const dados = await getJson(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigo}/dados/ultimos/${selic ? 1 : 13}?formato=json`);
    if (!Array.isArray(dados) || !dados.length) throw new Error('resposta vazia');
    const pontos = dados.map((d) => {
      const v = Number(String(d?.valor ?? '').replace(',', '.'));
      const [dd, mm, aaaa] = String(d?.data ?? '').split('/');
      if (!Number.isFinite(v) || v < 0.1 || v > 40) throw new Error(`valor fora da faixa: ${d?.valor}`);
      if (!/^\d{2}$/.test(mm ?? '') || !/^\d{4}$/.test(aaaa ?? '')) throw new Error(`data inválida: ${d?.data}`);
      return { valor: Math.round(v * 100) / 100, mes: `${aaaa}-${mm}`, dia: `${aaaa}-${mm}-${dd}` };
    });
    // A API devolve os "últimos N" do mais novo para o mais antigo: ordenamos sempre por data.
    pontos.sort((a, b) => a.dia.localeCompare(b.dia));
    const ult = pontos[pontos.length - 1];
    const anterior = series[codigo];
    if (!selic && anterior?.mes && ult.mes < anterior.mes) throw new Error(`o mês mais recente (${ult.mes}) é anterior ao já salvo (${anterior.mes})`);
    const valor = ult.valor;
    const [aaaa, mm] = ult.mes.split('-');
    const antes = series[codigo];
    series[codigo] = selic
      ? { valor, mes: ult.mes, dia: ult.dia }
      : { valor, mes: ult.mes, hist: pontos.map((x) => [x.mes, x.valor]) };
    ok++;
    linhas.push(`| ${codigo} | ${t} | ${valor.toFixed(2)}% ${selic ? 'a.a.' : 'a.m.'} | ${mm}/${aaaa} | ${antes ? `${antes.valor}% (${antes.mes})` : 'novo'} |`);
  } catch (e) {
    linhas.push(`| ${codigo} | ⚠️ ${e.message} | mantido | | ${series[codigo] ? `${series[codigo].valor}% (${series[codigo].mes})` : 'reserva do código'} |`);
  }
}

const resumo = [
  `### Taxas médias do Banco Central: ${ok} de ${Object.keys(SERIES).length} séries atualizadas`,
  '',
  '| Série | Nome oficial | Valor | Mês | Antes |',
  '|---|---|---|---|---|',
  ...linhas,
].join('\n');
console.log(resumo);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, resumo + '\n');

if (ok === 0) {
  console.error('Nenhuma série foi atualizada. O arquivo não foi alterado.');
  process.exit(1);
}

const mudou = JSON.stringify(series) !== JSON.stringify(atual.series ?? {});
const saida = { atualizadoEm: mudou || !atual.atualizadoEm ? new Date().toISOString().slice(0, 10) : atual.atualizadoEm, series };
await writeFile(ARQUIVO, JSON.stringify(saida, null, 2) + '\n');
console.log(mudou ? 'Arquivo atualizado.' : 'Sem mudança nos valores.');
