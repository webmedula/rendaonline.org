// Tabelas e cálculos trabalhistas usados pelas calculadoras de /ferramentas/.
// Atualize os valores aqui quando o governo publicar tabelas novas (normalmente em janeiro).
// Fontes 2026: Portaria Interministerial MPS/MF nº 13/2026 (INSS), Lei 15.191/2025 (tabela IRRF),
// Lei 15.270/2025 (redução do IR até R$ 7.350), Decreto 12.797/2025 (salário mínimo).

export const ANO_TABELAS = 2026;
export const ATUALIZADO_EM = 'novembro de 2026';
export const SALARIO_MINIMO = 1621.0;
export const TETO_INSS = 8475.55;

/** Faixas progressivas do INSS do empregado: [limite superior, alíquota]. */
export const INSS_FAIXAS: [number, number][] = [
  [1621.0, 0.075],
  [2902.84, 0.09],
  [4354.27, 0.12],
  [8475.55, 0.14],
];

/** Tabela mensal do IRRF: [limite superior da base, alíquota, parcela a deduzir]. */
export const IRRF_FAIXAS: [number, number, number][] = [
  [2428.8, 0, 0],
  [2826.65, 0.075, 182.16],
  [3751.05, 0.15, 394.16],
  [4664.68, 0.225, 675.49],
  [Infinity, 0.275, 908.73],
];

export const DEDUCAO_DEPENDENTE = 189.59;
export const DESCONTO_SIMPLIFICADO = 607.2;
// Redução da Lei 15.270/2025 (calculada sobre o rendimento tributável bruto do mês).
export const REDUTOR_LIMITE_ISENCAO = 5000;
export const REDUTOR_LIMITE_FINAL = 7350;
export const REDUTOR_MAXIMO = 312.89;
export const REDUTOR_A = 978.62;
export const REDUTOR_B = 0.133145;

export const FGTS_ALIQUOTA = 0.08;

export const MEI_DAS = { comercio: 82.05, servicos: 86.05, ambos: 87.05 };
export const MEI_LIMITE_ANUAL = 81000;

export const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export function inss(bruto: number): number {
  let total = 0;
  let anterior = 0;
  for (const [limite, aliquota] of INSS_FAIXAS) {
    if (bruto <= anterior) break;
    total += (Math.min(bruto, limite) - anterior) * aliquota;
    anterior = limite;
  }
  return r2(total);
}

export function irrfTabela(base: number): { imposto: number; aliquota: number } {
  if (base <= 0) return { imposto: 0, aliquota: 0 };
  for (const [limite, aliquota, deducao] of IRRF_FAIXAS) {
    if (base <= limite) return { imposto: r2(Math.max(0, base * aliquota - deducao)), aliquota };
  }
  return { imposto: 0, aliquota: 0 };
}

export function redutor(rendimentoBruto: number, impostoTabela: number): number {
  let red = 0;
  if (rendimentoBruto <= REDUTOR_LIMITE_ISENCAO) red = REDUTOR_MAXIMO;
  else if (rendimentoBruto <= REDUTOR_LIMITE_FINAL) red = REDUTOR_A - REDUTOR_B * rendimentoBruto;
  return r2(Math.max(0, Math.min(impostoTabela, red)));
}

export interface ResultadoIR {
  base: number;
  aliquota: number;
  impostoTabela: number;
  reducao: number;
  imposto: number;
  metodo: 'deducoes' | 'simplificado';
}

/**
 * IRRF sobre um rendimento. `deducoesLegais` = INSS + dependentes + pensão.
 * Quando `permiteSimplificado`, usa o desconto simplificado se ele der imposto menor.
 */
export function irrf(bruto: number, deducoesLegais: number, permiteSimplificado = true): ResultadoIR {
  const opcoes: { base: number; metodo: ResultadoIR['metodo'] }[] = [
    { base: r2(bruto - deducoesLegais), metodo: 'deducoes' },
  ];
  if (permiteSimplificado) opcoes.push({ base: r2(bruto - DESCONTO_SIMPLIFICADO), metodo: 'simplificado' });
  let melhor: ResultadoIR | null = null;
  for (const o of opcoes) {
    const t = irrfTabela(o.base);
    const reducao = redutor(bruto, t.imposto);
    const imposto = r2(t.imposto - reducao);
    if (!melhor || imposto < melhor.imposto) {
      melhor = { base: Math.max(0, o.base), aliquota: t.aliquota, impostoTabela: t.imposto, reducao, imposto, metodo: o.metodo };
    }
  }
  return melhor!;
}

export interface SalarioLiquido {
  bruto: number;
  inss: number;
  ir: ResultadoIR;
  outros: number;
  liquido: number;
  fgts: number;
}

export function salarioLiquido(bruto: number, dependentes = 0, pensao = 0, outros = 0): SalarioLiquido {
  const vInss = inss(bruto);
  const ir = irrf(bruto, vInss + dependentes * DEDUCAO_DEPENDENTE + pensao);
  return {
    bruto,
    inss: vInss,
    ir,
    outros: r2(pensao + outros),
    liquido: r2(bruto - vInss - ir.imposto - pensao - outros),
    fgts: r2(bruto * FGTS_ALIQUOTA),
  };
}

/** 13º salário: tributação exclusiva, só com deduções legais (sem desconto simplificado). */
export function decimoTerceiro(salario: number, meses: number, mediaVariaveis = 0, dependentes = 0) {
  const bruto = r2(((salario + mediaVariaveis) / 12) * meses);
  const primeira = r2(bruto / 2);
  const vInss = inss(bruto);
  const ir = irrf(bruto, vInss + dependentes * DEDUCAO_DEPENDENTE, false);
  const liquido = r2(bruto - vInss - ir.imposto);
  return { bruto, primeira, inss: vInss, ir, segunda: r2(liquido - primeira), liquido, fgts: r2(bruto * FGTS_ALIQUOTA) };
}

export function ferias(opts: {
  salario: number;
  mediaVariaveis?: number;
  dias: number;
  venderDias?: boolean;
  adiantar13?: boolean;
  dependentes?: number;
}) {
  const base = opts.salario + (opts.mediaVariaveis ?? 0);
  const diaria = base / 30;
  const diasGozo = opts.venderDias ? Math.min(opts.dias, 30) - 10 : opts.dias;
  const valorFerias = r2(diaria * diasGozo);
  const terco = r2(valorFerias / 3);
  const abono = opts.venderDias ? r2(diaria * 10) : 0;
  const tercoAbono = opts.venderDias ? r2(abono / 3) : 0;
  const tributavel = r2(valorFerias + terco);
  const vInss = inss(tributavel);
  const ir = irrf(tributavel, vInss + (opts.dependentes ?? 0) * DEDUCAO_DEPENDENTE);
  const adiantamento13 = opts.adiantar13 ? r2(opts.salario / 2) : 0;
  const bruto = r2(tributavel + abono + tercoAbono + adiantamento13);
  return {
    diasGozo,
    valorFerias,
    terco,
    abono,
    tercoAbono,
    adiantamento13,
    bruto,
    inss: vInss,
    ir,
    liquido: r2(bruto - vInss - ir.imposto),
  };
}

// ---------- Rescisão ----------

export type Motivo = 'sem-justa-causa' | 'pedido' | 'justa-causa' | 'acordo';
export type Aviso = 'indenizado' | 'trabalhado' | 'nao-cumprido';

const DIA = 86400000;

function parseData(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function addDias(d: Date, n: number) {
  return new Date(d.getTime() + n * DIA);
}

function diasNoMes(ano: number, mes: number) {
  return new Date(Date.UTC(ano, mes + 1, 0)).getUTCDate();
}

/** Anos completos entre duas datas. */
export function anosCompletos(inicio: Date, fim: Date) {
  let anos = fim.getUTCFullYear() - inicio.getUTCFullYear();
  const aniv = new Date(Date.UTC(fim.getUTCFullYear(), inicio.getUTCMonth(), inicio.getUTCDate()));
  if (fim < aniv) anos--;
  return Math.max(0, anos);
}

/** Avos do 13º: meses do ano da saída com 15 dias ou mais trabalhados. */
export function avos13(admissao: Date, fim: Date) {
  const ano = fim.getUTCFullYear();
  let avos = 0;
  for (let m = 0; m <= fim.getUTCMonth(); m++) {
    const iniMes = new Date(Date.UTC(ano, m, 1));
    const fimMes = new Date(Date.UTC(ano, m, diasNoMes(ano, m)));
    const ini = admissao > iniMes ? admissao : iniMes;
    const f = fim < fimMes ? fim : fimMes;
    if (f < ini) continue;
    const dias = Math.round((f.getTime() - ini.getTime()) / DIA) + 1;
    if (dias >= 15) avos++;
  }
  return Math.min(12, avos);
}

/** Avos de férias proporcionais: meses desde o último aniversário da admissão (fração de 15+ dias conta). */
export function avosFerias(admissao: Date, fim: Date) {
  const anos = anosCompletos(admissao, fim);
  let inicio = new Date(Date.UTC(admissao.getUTCFullYear() + anos, admissao.getUTCMonth(), admissao.getUTCDate()));
  let avos = 0;
  for (;;) {
    const prox = new Date(Date.UTC(inicio.getUTCFullYear(), inicio.getUTCMonth() + 1, inicio.getUTCDate()));
    if (addDias(prox, -1) <= fim) {
      avos++;
      inicio = prox;
    } else break;
  }
  const resto = Math.round((fim.getTime() - inicio.getTime()) / DIA) + 1;
  if (resto >= 15) avos++;
  return Math.min(12, avos);
}

export interface EntradaRescisao {
  salario: number;
  admissao: string; // AAAA-MM-DD
  saida: string; // último dia trabalhado
  motivo: Motivo;
  aviso: Aviso;
  feriasVencidas: number; // períodos
  saldoFgts: number;
  dependentes: number;
}

export interface Linha {
  nome: string;
  valor: number;
  nota?: string;
}

export function rescisao(e: EntradaRescisao) {
  const adm = parseData(e.admissao);
  const saida = parseData(e.saida);
  if (!(saida >= adm)) throw new Error('A data de saída precisa ser depois da admissão.');
  const s = e.salario;
  const anos = anosCompletos(adm, saida);
  const diasAvisoCheio = Math.min(90, 30 + 3 * anos);

  const proventos: Linha[] = [];
  const descontos: Linha[] = [];

  // Saldo de salário
  const diasSaldo = Math.min(30, saida.getUTCDate());
  const saldo = r2((s / 30) * diasSaldo);
  proventos.push({ nome: `Saldo de salário (${diasSaldo} dias)`, valor: saldo });

  // Aviso prévio e projeção
  let diasAvisoIndenizado = 0;
  if (e.motivo === 'sem-justa-causa' && e.aviso === 'indenizado') diasAvisoIndenizado = diasAvisoCheio;
  if (e.motivo === 'acordo' && e.aviso === 'indenizado') diasAvisoIndenizado = Math.floor(diasAvisoCheio / 2);
  const fimProjetado = addDias(saida, diasAvisoIndenizado);
  const avisoValor = r2((s / 30) * diasAvisoIndenizado);
  if (avisoValor > 0) {
    proventos.push({
      nome: `Aviso prévio indenizado (${diasAvisoIndenizado} dias)`,
      valor: avisoValor,
      nota: e.motivo === 'acordo' ? 'No acordo, metade do aviso.' : `30 dias + 3 por ano completo (${anos} ${anos === 1 ? 'ano' : 'anos'}).`,
    });
  }

  const temProporcionais = e.motivo !== 'justa-causa';

  // 13º proporcional
  let avos13v = 0;
  let valor13 = 0;
  if (temProporcionais) {
    avos13v = avos13(adm, fimProjetado);
    valor13 = r2((s / 12) * avos13v);
    proventos.push({ nome: `13º salário proporcional (${avos13v}/12)`, valor: valor13 });
  }

  // Férias vencidas
  if (e.feriasVencidas > 0) {
    const fv = r2(s * e.feriasVencidas);
    proventos.push({ nome: `Férias vencidas (${e.feriasVencidas} ${e.feriasVencidas === 1 ? 'período' : 'períodos'})`, valor: fv });
    proventos.push({ nome: '1/3 sobre férias vencidas', valor: r2(fv / 3) });
  }

  // Férias proporcionais
  let avosF = 0;
  if (temProporcionais) {
    avosF = avosFerias(adm, fimProjetado);
    const fp = r2((s / 12) * avosF);
    proventos.push({ nome: `Férias proporcionais (${avosF}/12)`, valor: fp });
    proventos.push({ nome: '1/3 sobre férias proporcionais', valor: r2(fp / 3) });
  }

  // Desconto do aviso não cumprido (pedido de demissão)
  if (e.motivo === 'pedido' && e.aviso === 'nao-cumprido') {
    descontos.push({ nome: 'Aviso prévio não cumprido (30 dias)', valor: r2(s), nota: 'A empresa pode descontar quando você não cumpre o aviso.' });
  }

  // INSS e IRRF: saldo de salário e 13º são tributados separadamente. Verbas indenizadas (aviso indenizado, férias na rescisão) são isentas.
  const inssSaldo = inss(saldo);
  const irSaldo = irrf(saldo, inssSaldo + e.dependentes * DEDUCAO_DEPENDENTE);
  descontos.push({ nome: 'INSS sobre saldo de salário', valor: inssSaldo });
  if (irSaldo.imposto > 0) descontos.push({ nome: 'IRRF sobre saldo de salário', valor: irSaldo.imposto });
  if (valor13 > 0) {
    const inss13 = inss(valor13);
    const ir13 = irrf(valor13, inss13 + e.dependentes * DEDUCAO_DEPENDENTE, false);
    descontos.push({ nome: 'INSS sobre 13º', valor: inss13 });
    if (ir13.imposto > 0) descontos.push({ nome: 'IRRF sobre 13º', valor: ir13.imposto });
  }

  const totalProventos = r2(proventos.reduce((a, l) => a + l.valor, 0));
  const totalDescontos = r2(descontos.reduce((a, l) => a + l.valor, 0));
  const liquido = r2(totalProventos - totalDescontos);

  // FGTS
  const fgtsMes = r2((saldo + avisoValor + valor13) * FGTS_ALIQUOTA);
  const baseMulta = r2(e.saldoFgts + fgtsMes);
  const pctMulta = e.motivo === 'sem-justa-causa' ? 0.4 : e.motivo === 'acordo' ? 0.2 : 0;
  const multa = r2(baseMulta * pctMulta);
  const pctSaque = e.motivo === 'sem-justa-causa' ? 1 : e.motivo === 'acordo' ? 0.8 : 0;
  const saqueFgts = r2(baseMulta * pctSaque);

  return {
    anos,
    diasAvisoCheio,
    fimProjetado: fimProjetado.toISOString().slice(0, 10),
    proventos,
    descontos,
    totalProventos,
    totalDescontos,
    liquido,
    fgtsMes,
    multa,
    pctMulta,
    saqueFgts,
    pctSaque,
    seguroDesemprego: e.motivo === 'sem-justa-causa',
  };
}

// ---------- Juros compostos ----------

export function jurosCompostos(opts: {
  inicial: number;
  aporte: number;
  taxa: number; // em %
  taxaPeriodo: 'mes' | 'ano';
  meses: number;
}) {
  const i = opts.taxaPeriodo === 'mes' ? opts.taxa / 100 : Math.pow(1 + opts.taxa / 100, 1 / 12) - 1;
  let saldo = opts.inicial;
  let investido = opts.inicial;
  const anos: { ano: number; investido: number; juros: number; saldo: number }[] = [];
  for (let m = 1; m <= opts.meses; m++) {
    saldo = saldo * (1 + i) + opts.aporte;
    investido += opts.aporte;
    if (m % 12 === 0 || m === opts.meses) {
      anos.push({ ano: Math.ceil(m / 12), investido: r2(investido), juros: r2(saldo - investido), saldo: r2(saldo) });
    }
  }
  return { taxaMensal: i, final: r2(saldo), investido: r2(investido), juros: r2(saldo - investido), anos };
}

export const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const pct = (n: number, casas = 2) => `${(n * 100).toLocaleString('pt-BR', { maximumFractionDigits: casas })}%`;

// ---------- MEI ----------

export const MEI_INSS = r2(SALARIO_MINIMO * 0.05);
export const MEI_ICMS = 1;
export const MEI_ISS = 5;
export type AtividadeMei = keyof typeof MEI_DAS;

/** Limite proporcional do MEI no ano de abertura: R$ 6.750 por mês de atividade. */
export function limiteMei(mesesNoAno: number) {
  return r2((MEI_LIMITE_ANUAL / 12) * mesesNoAno);
}

export function dasMei(atividade: AtividadeMei, faturamentoMensal: number, mesesNoAno = 12) {
  const das = MEI_DAS[atividade];
  const limite = limiteMei(mesesNoAno);
  const faturamentoAno = r2(faturamentoMensal * mesesNoAno);
  const excesso = r2(Math.max(0, faturamentoAno - limite));
  const situacao = excesso === 0 ? 'ok' : excesso <= limite * 0.2 ? 'excesso-ate-20' : 'excesso-acima-20';
  return {
    das,
    inss: MEI_INSS,
    icms: atividade === 'servicos' ? 0 : MEI_ICMS,
    iss: atividade === 'comercio' ? 0 : MEI_ISS,
    totalAno: r2(das * mesesNoAno),
    limite,
    faturamentoAno,
    excesso,
    situacao,
    pctLimite: limite ? faturamentoAno / limite : 0,
  };
}

// ---------- Quanto cobrar por hora ----------

export type Regime = 'mei' | 'simples' | 'outro';

export function valorHora(o: {
  rendaDesejada: number; // líquido por mês que você quer tirar
  custosFixos: number; // por mês
  horasDia: number;
  diasSemana: number;
  semanasFolga: number; // férias + feriados, por ano
  pctFaturavel: number; // 0-100
  regime: Regime;
  aliquota: number; // % para simples/outro
  incluir13Ferias: boolean;
  margem: number; // % de reserva / lucro
}) {
  const semanas = Math.max(0, 52 - o.semanasFolga);
  const horasMes = (o.horasDia * o.diasSemana * semanas) / 12;
  const horasFaturaveis = horasMes * (o.pctFaturavel / 100);
  const fator = o.incluir13Ferias ? (12 + 1 + 1 / 3) / 12 : 1;
  const renda = o.rendaDesejada * fator;
  const imposto = o.regime === 'mei' ? 0 : o.aliquota / 100;
  const das = o.regime === 'mei' ? MEI_DAS.servicos : 0;
  const custo = renda + o.custosFixos + das;
  const comMargem = custo * (1 + o.margem / 100);
  const faturamento = imposto < 1 ? comMargem / (1 - imposto) : 0;
  const hora = horasFaturaveis > 0 ? faturamento / horasFaturaveis : 0;
  const faturamentoAno = faturamento * 12;
  return {
    horasMes: r2(horasMes),
    horasFaturaveis: r2(horasFaturaveis),
    reservas: r2(renda - o.rendaDesejada),
    das,
    impostos: r2(faturamento * imposto),
    margemValor: r2(comMargem - custo),
    faturamento: r2(faturamento),
    hora: r2(hora),
    dia: r2(hora * o.horasDia),
    faturamentoAno: r2(faturamentoAno),
    passaLimiteMei: o.regime === 'mei' && faturamentoAno > MEI_LIMITE_ANUAL,
  };
}
