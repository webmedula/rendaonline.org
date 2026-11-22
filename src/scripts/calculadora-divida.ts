// Lógica da calculadora de juros da dívida (/ferramentas/calculadora-juros-divida/). Roda só no navegador.
import { brl } from '../lib/calc';
import { bind, num } from '../lib/ui';
import { parcela, taxaImplicita, valorPresente, prazo, anual, quitarRotativo, pct, duracao } from '../lib/divida';
import { TAXAS, type Taxa, type TipoDivida } from '../data/taxas-juros';
const f = document.getElementById('f') as HTMLFormElement;
const r = document.getElementById('r') as HTMLElement;
const el = (n: string) => f.elements.namedItem(n) as HTMLInputElement;
const int = (n: string) => Math.floor(num(el(n)));
const pctIn = (n: string) => num(el(n)) / 100;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

// Mostra só os campos do tipo de dívida escolhido.
function sync() {
  const t = TAXAS[el('tipo').value as TipoDivida];
  const sei = el('sei').value === 'saldo' ? 'saldo' : 'contrato';
  const ativos = new Set<string>([t.modo]);
  if (t.modo === 'parcelas') ativos.add(sei);
  if (t.portavel) ativos.add('portavel');
  f.querySelectorAll<HTMLElement>('[data-show]').forEach((node) => {
    node.hidden = !ativos.has(node.dataset.show!);
  });
  f.querySelectorAll<HTMLButtonElement>('[data-sei]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.sei === sei)));
  const tr = el('taxar');
  tr.placeholder = t.mensal ? `Média: ${t.mensal.toLocaleString('pt-BR')}` : '';
  const prop = el('proposta');
  prop.placeholder = t.mensal ? `Média: ${t.mensal.toLocaleString('pt-BR')}` : 'Ex.: 1,60';
  return t;
}
f.querySelectorAll<HTMLButtonElement>('[data-sei]').forEach((b) =>
  b.addEventListener('click', () => {
    el('sei').value = b.dataset.sei!;
    sync();
    f.dispatchEvent(new Event('change'));
  }),
);
el('tipo').addEventListener('change', sync);
sync();

// == peças de resultado ==
const card = (label: string, value: string, sub = '') =>
  `<div class="dv-card"><span>${label}</span><strong>${value}</strong>${sub ? `<small>${sub}</small>` : ''}</div>`;

function barra(divida: number, juros: number) {
  const tot = divida + juros;
  const pj = tot > 0 ? (juros / tot) * 100 : 0;
  return `<div class="dv-split" role="img" aria-label="${Math.round(pj)}% do que falta pagar é juros">
    <div class="dv-split__bar"><span class="dv-split__div" style="width:${100 - pj}%"></span><span class="dv-split__jur" style="width:${pj}%"></span></div>
    <div class="dv-split__leg"><span><i class="dv-dot dv-dot--div"></i>Dívida de verdade ${brl(divida)}</span><span><i class="dv-dot dv-dot--jur"></i>Juros ${brl(juros)} (${Math.round(pj)}%)</span></div>
  </div>`;
}

function regua(sua: number, media: number, curto: string, ref: string) {
  const max = Math.max(sua, media) * 1.3;
  const pos = (x: number) => Math.min(100, (x / max) * 100);
  const dif = sua / media - 1;
  let nivel = 'ok';
  let frase = `Sua taxa está <strong>${pct(Math.abs(dif), 0)} abaixo</strong> da média do ${esc(curto)}. Boa!`;
  if (dif > 0.25) {
    nivel = 'alto';
    frase = `Sua taxa está <strong>${pct(dif, 0)} acima</strong> da média do ${esc(curto)}. Há bastante espaço para negociar ou trocar de banco.`;
  } else if (dif > 0.03) {
    nivel = 'medio';
    frase = `Sua taxa está <strong>${pct(dif, 0)} acima</strong> da média do ${esc(curto)}.`;
  } else if (dif >= -0.03) {
    frase = `Sua taxa está <strong>na média</strong> do ${esc(curto)}.`;
  }
  return `<div class="dv-ruler dv-ruler--${nivel}">
    <p class="dv-ruler__t">${frase}</p>
    <div class="dv-ruler__track">
      <span class="dv-ruler__fill" style="width:${pos(sua)}%"></span>
      <span class="dv-ruler__mark" style="left:${pos(media)}%"><em>Média ${pct(media)}</em></span>
    </div>
    <div class="dv-ruler__you"><span><i class="dv-dot dv-dot--you"></i>Sua taxa: <strong>${pct(sua)}</strong> ao mês</span><span>Média: ${pct(media)}</span></div>
    <p class="dv-ruler__src">Média do Banco Central: ${esc(ref)}.</p>
  </div>`;
}

const alerta = (html: string, tipo: 'warn' | 'info' = 'warn') => `<p class="dv-alert dv-alert--${tipo}">${html}</p>`;

const compartilhar = `<p class="dv-share"><a class="btn btn-outline" href="#" data-share>Enviar este cálculo no WhatsApp</a></p>`;

function passos(t: Taxa, temEconomia: boolean) {
  const itens = t.portavel
    ? [
        'Peça ao seu banco o <strong>saldo devedor</strong> e o <strong>CET</strong> do contrato (ele é obrigado a informar).',
        'Peça propostas de portabilidade em 2 ou 3 bancos e compare pela taxa e pelo CET.',
        'Mostre a melhor oferta ao seu banco: muitos baixam a taxa para não perder o cliente.',
        'Nunca pague taxa adiantada para “liberar” portabilidade. Isso é golpe.',
      ]
    : [
        'Pare de usar o limite (cartão ou cheque especial) enquanto paga a dívida.',
        'Veja se tem acesso a crédito mais barato: consignado CLT, INSS ou de servidor, ou empréstimo pessoal.',
        'Use o novo empréstimo para quitar tudo de uma vez e pague só a parcela fixa.',
        'Ligue para o banco e peça um acordo: muitos baixam juros para quem propõe quitar.',
      ];
  return `<div class="dv-steps"><h3>${temEconomia ? 'Como conseguir essa economia' : 'Próximos passos'}</h3><ol>${itens.map((i) => `<li>${i}</li>`).join('')}</ol></div>`;
}

// == dívida com parcelas ==
function calcParcelas(t: Taxa) {
  const sei = el('sei').value === 'saldo' ? 'saldo' : 'contrato';
  const P = num(el('parcela'));
  let saldo: number;
  let n: number;
  let i: number | null;
  let custoTotal: number | null = null;
  let valor = 0;
  if (P <= 0) throw new Error('Digite o valor da parcela.');
  if (sei === 'contrato') {
    valor = num(el('valor'));
    const total = int('total');
    const pagas = Math.max(0, int('pagas'));
    if (valor <= 0) throw new Error('Digite o valor que caiu na sua conta.');
    if (total <= 0) throw new Error('Digite o total de parcelas do contrato.');
    if (pagas >= total) throw new Error('As parcelas pagas precisam ser menos que o total. Se já pagou tudo, a dívida acabou!');
    i = taxaImplicita(valor, P, total);
    if (i === null || i === 0) throw new Error('A parcela vezes o número de parcelas dá menos que o valor emprestado. Confira os números.');
    n = total - pagas;
    saldo = valorPresente(P, i, n);
    custoTotal = P * total - valor;
  } else {
    saldo = num(el('saldo'));
    n = int('faltam');
    if (saldo <= 0) throw new Error('Digite o saldo devedor de hoje.');
    if (n <= 0) throw new Error('Digite quantas parcelas faltam.');
    i = taxaImplicita(saldo, P, n);
    if (i === null || i === 0) throw new Error('As parcelas que faltam somam menos que o saldo devedor. Confira os números.');
  }
  const restante = P * n;
  const juros = restante - saldo;
  const media = t.mensal ? t.mensal / 100 : null;
  let html = `<div class="result-hero dv-hero">
      <p>Até o fim do contrato você ainda vai pagar</p>
      <strong>${brl(juros)} de juros</strong>
      <p>Faltam ${brl(restante)} em ${n} parcela${n > 1 ? 's' : ''} de ${brl(P)}. Desse total, só ${brl(saldo)} é a dívida de verdade.</p>
    </div>`;
  html += barra(saldo, juros);
  html += `<div class="dv-cards">
    ${card('Taxa real ao mês', pct(i), 'com IOF, seguros e tarifas')}
    ${card('Taxa real ao ano', pct(anual(i), 1))}
    ${card('Saldo devedor hoje', brl(saldo), 'aprox. valor para quitar')}
    ${custoTotal !== null ? card('Custo total do empréstimo', brl(custoTotal), `você pegou ${brl(valor)}`) : card('Juros na próxima parcela', brl(saldo * i), `de ${brl(P)}`)}
  </div>`;

  if (i > 0.3) html += alerta('A taxa deu acima de 30% ao mês, o que é muito incomum para um contrato com parcelas. Confira se os valores estão certos.');

  const tc = pctIn('taxac');
  if (tc > 0 && i - tc > 0.0005) {
    html += alerta(
      `O contrato diz <strong>${pct(tc)}</strong> ao mês, mas a conta real dá <strong>${pct(i)}</strong>. A diferença costuma ser IOF, seguro prestamista e tarifas embutidos no valor financiado. Peça o CET ao banco e veja se você autorizou cada um desses custos: seguro não pode ser obrigatório.`,
      'info',
    );
  }
  if (t.teto && tc * 100 > t.teto.valor + 0.005) {
    html += alerta(`A taxa do seu contrato passa do ${esc(t.teto.regra)}: ${t.teto.valor.toLocaleString('pt-BR')}% ao mês. Questione o banco e, se não resolver, registre reclamação no consumidor.gov.br.`);
  } else if (t.teto && i * 100 > t.teto.valor + 0.005) {
    html += alerta(
      `A taxa real deu acima do ${esc(t.teto.regra)}: ${t.teto.valor.toLocaleString('pt-BR')}% ao mês. Parte da diferença pode ser IOF, que entra na taxa real mas não no teto. Confira a taxa de juros escrita no contrato: ela não pode passar do teto.`,
      'info',
    );
  }

  if (media) html += regua(i, media, t.curto, t.ref);

  // Portabilidade ou troca
  const prop = pctIn('proposta');
  let alvo = prop > 0 ? prop : media ?? 0;
  let rotulo = prop > 0 ? 'a taxa da proposta' : 'a taxa média do mercado';
  if (!(prop > 0) && media && i <= media * 1.03) {
    alvo = i * 0.85;
    rotulo = 'uma taxa 15% menor que a sua';
  }
  let temEconomia = false;
  if (t.portavel && alvo > 0 && alvo < i) {
    const nova = parcela(saldo, alvo, n);
    const ecoMes = P - nova;
    const ecoTot = ecoMes * n;
    const nMesmo = prazo(saldo, alvo, P);
    temEconomia = ecoTot > 1;
    html += `<div class="dv-port">
      <h3>Com portabilidade a ${pct(alvo)} ao mês</h3>
      <p class="small muted">Simulação com ${rotulo}, mantendo as ${n} parcelas que faltam.</p>
      <div class="dv-port__grid">
        <div><span>Parcela nova</span><strong>${brl(nova)}</strong><small>hoje: ${brl(P)}</small></div>
        <div><span>Sobra por mês</span><strong>${brl(ecoMes)}</strong></div>
        <div class="dv-port__big"><span>Economia total</span><strong>${brl(ecoTot)}</strong></div>
      </div>
      ${Number.isFinite(nMesmo) && nMesmo < n ? `<p>Ou mantenha a parcela de ${brl(P)} e termine <strong>${duracao(n - nMesmo)} antes</strong> (${nMesmo} parcelas em vez de ${n}), economizando ${brl(P * (n - nMesmo))}.</p>` : ''}
    </div>`;
  } else if (t.portavel && alvo > 0 && prop > 0) {
    html += alerta('A taxa da proposta não é menor que a sua taxa real. Nesse caso a portabilidade não compensa.', 'info');
  }

  if (!t.portavel) {
    html += trocas(saldo, i, P, t, n);
  }
  html += passos(t, temEconomia);
  return html + compartilhar;
}

// Tabela comparando a dívida atual com créditos mais baratos, pagando o mesmo valor por mês.
function trocas(saldo: number, i: number, pagto: number, t: Taxa, nAtual: number | null, limite = Infinity) {
  const atual = nAtual !== null ? { meses: nAtual, juros: pagto * nAtual - saldo, nunca: false } : quitarRotativo(saldo, i, pagto, limite);
  const opcoes = (['pessoal', 'consignado-privado', 'consignado-inss'] as TipoDivida[])
    .map((k) => ({ k, t: TAXAS[k], i: TAXAS[k].mensal! / 100 }))
    .filter((o) => o.i < i);
  if (!opcoes.length) return '';
  const linhas = opcoes.map((o) => {
    const x = quitarRotativo(saldo, o.i, pagto);
    return { nome: o.t.nome, taxa: o.i, ...x };
  });
  const maxJ = Math.max(...[atual, ...linhas].map((l) => (Number.isFinite(l.juros) ? l.juros : 0)), 1);
  const row = (nome: string, taxa: number, l: { meses: number; juros: number; nunca: boolean }, destaque = false) =>
    `<tr class="${destaque ? 'dv-now' : ''}"><td>${esc(nome)}<small>${pct(taxa)} ao mês</small></td><td>${l.nunca ? 'não quita' : duracao(l.meses)}</td><td>${l.nunca ? '—' : brl(l.juros)}<span class="dv-mini" style="width:${l.nunca ? 100 : (l.juros / maxJ) * 100}%"></span></td></tr>`;
  const melhor = linhas[linhas.length - 1];
  const eco = !atual.nunca && !melhor.nunca ? atual.juros - melhor.juros : null;
  return `<div class="dv-swap">
    <h3>E se você trocar por um crédito mais barato?</h3>
    <p class="small muted">Pagando os mesmos ${brl(pagto)} por mês, com as taxas médias do Banco Central.</p>
    <div class="table-scroll"><table class="dv-swap__t"><thead><tr><th>Crédito</th><th>Tempo para quitar</th><th>Juros no total</th></tr></thead><tbody>
      ${row(`Sua dívida (${t.curto})`, i, atual, true)}
      ${linhas.map((l) => row(l.nome, l.taxa, l)).join('')}
    </tbody></table></div>
    ${eco !== null && eco > 0 ? `<p>Trocando por consignado, você deixaria de pagar até <strong>${brl(eco)}</strong> em juros. Mesmo o empréstimo pessoal comum já costuma sair bem mais barato.</p>` : ''}
    <p class="small muted">Consignado depende de você ser aposentado ou pensionista do INSS, servidor público ou ter carteira assinada.</p>
  </div>`;
}

// == rotativo do cartão e cheque especial ==
function calcRotativo(t: Taxa) {
  const divida = num(el('divida'));
  const pagto = num(el('pagto'));
  const i = pctIn('taxar') > 0 ? pctIn('taxar') : (t.mensal ?? 0) / 100;
  if (divida <= 0) throw new Error('Digite o valor da dívida.');
  if (pagto <= 0) throw new Error('Digite quanto consegue pagar por mês.');
  const cartao = el('tipo').value === 'cartao-rotativo';
  const limite = cartao ? divida : Infinity;
  const x = quitarRotativo(divida, i, pagto, limite);
  const jurosMes = divida * i;
  let html: string;
  if (x.nunca) {
    html = `<div class="result-hero dv-hero dv-hero--bad">
      <p>Pagando ${brl(pagto)} por mês</p>
      <strong>a dívida nunca acaba</strong>
      <p>Só de juros são cerca de ${brl(jurosMes)} por mês (${pct(i)}). Você precisa pagar mais que isso para a dívida começar a diminuir.</p>
    </div>`;
  } else {
    html = `<div class="result-hero dv-hero${x.juros > divida * 0.3 ? ' dv-hero--bad' : ''}">
      <p>Pagando ${brl(pagto)} por mês, você quita em ${duracao(x.meses)} e paga</p>
      <strong>${brl(x.juros)} de juros</strong>
      <p>No total sairão ${brl(x.pago)} do seu bolso para uma dívida de ${brl(divida)}.</p>
    </div>`;
    html += barra(divida, x.juros);
  }
  html += `<div class="dv-cards">
    ${card('Taxa ao mês', pct(i), pctIn('taxar') > 0 ? 'informada por você' : 'média do mercado')}
    ${card('Taxa ao ano', pct(anual(i), 0))}
    ${card('Juros no primeiro mês', brl(jurosMes))}
    ${card('Para quitar em 12 meses', brl(parcela(divida, i, 12)), 'por mês, nesta taxa')}
  </div>`;
  if (cartao) {
    html += alerta(
      'Pela Lei 14.690/2023, os juros e encargos do rotativo e do parcelamento da fatura não podem passar de 100% da dívida original. A simulação já aplica esse limite. Além disso, o rotativo só pode durar 30 dias: depois o banco precisa oferecer o parcelamento da fatura.',
      'info',
    );
  }
  if (t.teto && i * 100 > t.teto.valor + 0.005) {
    html += alerta(`A taxa informada passa do ${esc(t.teto.regra)}. Reclame com o banco e, se não resolver, no consumidor.gov.br.`);
  }
  if (t.mensal && pctIn('taxar') > 0) html += regua(i, t.mensal / 100, t.curto, t.ref);
  html += trocas(divida, i, pagto, t, null, limite);
  html += passos(t, false);
  return html + compartilhar;
}

bind(f, r, () => {
  const t = sync();
  return t.modo === 'rotativo' ? calcRotativo(t) : calcParcelas(t);
});

r.addEventListener('click', (ev) => {
  const a = (ev.target as HTMLElement).closest('[data-share]');
  if (!a) return;
  ev.preventDefault();
  const hero = r.querySelector('.dv-hero strong')?.textContent ?? '';
  const msg = `Fiz a conta da minha dívida: ${hero}. Veja quanto você paga de juros na sua: ${location.href}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});
