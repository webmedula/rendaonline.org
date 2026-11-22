// Taxas médias de juros por tipo de crédito (pessoa física), usadas pela calculadora de juros da dívida.
// Fonte: Banco Central do Brasil, Sistema Gerenciador de Séries Temporais (SGS) e dados de taxas por instituição.
// ATUALIZAÇÃO AUTOMÁTICA: o robô .github/workflows/taxas-bcb.yml roda scripts/atualizar-taxas-bcb.mjs,
// que busca a última média mensal de cada série SGS (campo `sgs`) na API pública do BC e grava em
// src/data/taxas-bcb.json. Os valores abaixo (`mensal`/`ref`) são só a reserva, usados enquanto
// uma série ainda não foi buscada ou se a busca falhar.
// Consulta manual de uma série: https://api.bcb.gov.br/dados/serie/bcdata.sgs.<SERIE>/dados/ultimos/1?formato=json
import bcb from './taxas-bcb.json';

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
/** "2026-09" -> "setembro de 2026" */
const mesExtenso = (ym: string) => `${MESES[Number(ym.slice(5, 7)) - 1]} de ${ym.slice(0, 4)}`;

export type TipoDivida =
  | 'consignado-inss'
  | 'consignado-publico'
  | 'consignado-privado'
  | 'pessoal'
  | 'veiculos'
  | 'imobiliario'
  | 'cartao-parcelado'
  | 'cartao-rotativo'
  | 'cheque-especial'
  | 'outro';

export interface Taxa {
  nome: string;
  /** Nome curto, para textos ("seu consignado do INSS"). */
  curto: string;
  /** Média do mercado em % ao mês (null quando não há média publicada). */
  mensal: number | null;
  /** Mês de referência e tipo de dado, como aparece na página. */
  ref: string;
  /** Série SGS mensal (% a.m.) do Banco Central usada na atualização automática. */
  sgs?: number;
  /** 'parcelas' = contrato com parcelas fixas; 'rotativo' = dívida que gira (cartão, cheque especial). */
  modo: 'parcelas' | 'rotativo';
  /** Portabilidade de crédito se aplica (Res. CMN 4.292/2013). */
  portavel: boolean;
  /** Teto legal em % ao mês, quando existe. */
  teto?: { valor: number; regra: string };
}

const RESERVA: Record<TipoDivida, Taxa> = {
  'consignado-inss': {
    sgs: 25468,
    nome: 'Consignado INSS (aposentados e pensionistas)',
    curto: 'consignado do INSS',
    mensal: 1.76,
    ref: 'média de setembro de 2026 (23,22% ao ano)',
    modo: 'parcelas',
    portavel: true,
    teto: { valor: 1.85, regra: 'teto do CNPS para o consignado do INSS (Resolução CNPS 1.368/2025; confira o valor vigente no site do INSS)' },
  },
  'consignado-publico': {
    sgs: 25467,
    nome: 'Consignado de servidor público',
    curto: 'consignado de servidor',
    mensal: 1.81,
    ref: 'mediana das taxas dos bancos, 29/10 a 05/11/2026 (24,01% ao ano)',
    modo: 'parcelas',
    portavel: true,
  },
  'consignado-privado': {
    sgs: 25466,
    nome: 'Consignado CLT (Crédito do Trabalhador)',
    curto: 'consignado CLT',
    mensal: 3.32,
    ref: 'mediana das taxas dos bancos, 29/10 a 05/11/2026 (47,81% ao ano)',
    modo: 'parcelas',
    portavel: true,
  },
  pessoal: {
    sgs: 25464,
    nome: 'Empréstimo pessoal (sem consignação)',
    curto: 'empréstimo pessoal',
    mensal: 6.42,
    ref: 'média de setembro de 2026 (110,94% ao ano)',
    modo: 'parcelas',
    portavel: true,
  },
  veiculos: {
    sgs: 25471,
    nome: 'Financiamento de veículo',
    curto: 'financiamento do carro',
    mensal: 1.97,
    ref: 'média de junho de 2026 (26,4% ao ano)',
    modo: 'parcelas',
    portavel: true,
  },
  imobiliario: {
    sgs: 25497,
    nome: 'Financiamento imobiliário',
    curto: 'financiamento da casa',
    mensal: 1.11,
    ref: 'média de setembro de 2026 (14,20% ao ano)',
    modo: 'parcelas',
    portavel: true,
  },
  'cartao-parcelado': {
    sgs: 25478,
    nome: 'Parcelamento da fatura do cartão',
    curto: 'parcelamento da fatura',
    mensal: 9.32,
    ref: 'média de junho de 2026 (191,3% ao ano)',
    modo: 'parcelas',
    portavel: false,
  },
  'cartao-rotativo': {
    sgs: 25477,
    nome: 'Rotativo do cartão de crédito',
    curto: 'rotativo do cartão',
    mensal: 15.29,
    ref: 'média de setembro de 2026 (cerca de 444% ao ano)',
    modo: 'rotativo',
    portavel: false,
  },
  'cheque-especial': {
    sgs: 25463,
    nome: 'Cheque especial',
    curto: 'cheque especial',
    mensal: 7.56,
    ref: 'média de junho de 2026 (139,8% ao ano)',
    modo: 'rotativo',
    portavel: false,
    teto: { valor: 8, regra: 'limite de 8% ao mês do cheque especial (Resolução CMN 4.765/2019)' },
  },
  outro: {
    nome: 'Outro empréstimo ou financiamento',
    curto: 'empréstimo',
    mensal: null,
    ref: '',
    modo: 'parcelas',
    portavel: true,
  },
};

type Bcb = { atualizadoEm: string | null; series: Record<string, { valor: number; mes: string }> };
const dados = bcb as Bcb;

/** Taxas finais: média mais recente buscada no BC, ou a reserva acima. */
export const TAXAS = Object.fromEntries(
  (Object.keys(RESERVA) as TipoDivida[]).map((k) => {
    const t = RESERVA[k];
    const d = t.sgs ? dados.series[String(t.sgs)] : undefined;
    if (!d) return [k, t];
    const anual = ((Math.pow(1 + d.valor / 100, 12) - 1) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 });
    return [k, { ...t, mensal: d.valor, ref: `média de ${mesExtenso(d.mes)} (${anual}% ao ano)` }];
  }),
) as Record<TipoDivida, Taxa>;

/** Mês em que as taxas foram conferidas pela última vez. */
export const ATUALIZACAO_TAXAS = dados.atualizadoEm ? mesExtenso(dados.atualizadoEm.slice(0, 7)) : 'novembro de 2026';

/** Opções para trocar uma dívida cara por outra mais barata (mostradas para rotativo, cheque especial e parcelamentos caros). */
export const TROCAS: TipoDivida[] = ['pessoal', 'consignado-privado', 'consignado-inss'];
