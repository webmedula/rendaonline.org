// Taxas médias de juros por tipo de crédito (pessoa física), usadas pela calculadora de juros da dívida.
// Fonte: Banco Central do Brasil, Sistema Gerenciador de Séries Temporais (SGS) e dados de taxas por instituição.
// COMO ATUALIZAR: o BC publica as médias do mês anterior no fim de cada mês, junto com a nota
// "Estatísticas monetárias e de crédito" (https://www.bcb.gov.br/estatisticas/estatisticasmonetariascredito).
// Troque `mensal` (% ao mês) e `ref` de cada linha pela série indicada e mude ATUALIZACAO_TAXAS.
// Consulta rápida de uma série: https://api.bcb.gov.br/dados/serie/bcdata.sgs.<SERIE>/dados/ultimos/1?formato=json

export const ATUALIZACAO_TAXAS = 'novembro de 2026';

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
  /** Série SGS ou base usada (para quem for atualizar). */
  serie: string;
  /** 'parcelas' = contrato com parcelas fixas; 'rotativo' = dívida que gira (cartão, cheque especial). */
  modo: 'parcelas' | 'rotativo';
  /** Portabilidade de crédito se aplica (Res. CMN 4.292/2013). */
  portavel: boolean;
  /** Teto legal em % ao mês, quando existe. */
  teto?: { valor: number; regra: string };
}

export const TAXAS: Record<TipoDivida, Taxa> = {
  'consignado-inss': {
    nome: 'Consignado INSS (aposentados e pensionistas)',
    curto: 'consignado do INSS',
    mensal: 1.76,
    ref: 'média de setembro de 2026 (23,22% ao ano)',
    serie: 'SGS 25468 (a.m.) / 20746 (a.a.)',
    modo: 'parcelas',
    portavel: true,
    teto: { valor: 1.85, regra: 'teto do CNPS para o consignado do INSS (Resolução CNPS 1.368/2025; confira o valor vigente no site do INSS)' },
  },
  'consignado-publico': {
    nome: 'Consignado de servidor público',
    curto: 'consignado de servidor',
    mensal: 1.81,
    ref: 'mediana das taxas dos bancos, 29/10 a 05/11/2026 (24,01% ao ano)',
    serie: 'SGS 25467 (a.m.)',
    modo: 'parcelas',
    portavel: true,
  },
  'consignado-privado': {
    nome: 'Consignado CLT (Crédito do Trabalhador)',
    curto: 'consignado CLT',
    mensal: 3.32,
    ref: 'mediana das taxas dos bancos, 29/10 a 05/11/2026 (47,81% ao ano)',
    serie: 'SGS 25466 (a.m.)',
    modo: 'parcelas',
    portavel: true,
  },
  pessoal: {
    nome: 'Empréstimo pessoal (sem consignação)',
    curto: 'empréstimo pessoal',
    mensal: 6.42,
    ref: 'média de setembro de 2026 (110,94% ao ano)',
    serie: 'SGS 25464 (a.m.) / 20742 (a.a.)',
    modo: 'parcelas',
    portavel: true,
  },
  veiculos: {
    nome: 'Financiamento de veículo',
    curto: 'financiamento do carro',
    mensal: 1.97,
    ref: 'média de junho de 2026 (26,4% ao ano)',
    serie: 'SGS 25471 (a.m.)',
    modo: 'parcelas',
    portavel: true,
  },
  imobiliario: {
    nome: 'Financiamento imobiliário',
    curto: 'financiamento da casa',
    mensal: 1.11,
    ref: 'média de setembro de 2026 (14,20% ao ano)',
    serie: 'SGS 20772 (a.a.)',
    modo: 'parcelas',
    portavel: true,
  },
  'cartao-parcelado': {
    nome: 'Parcelamento da fatura do cartão',
    curto: 'parcelamento da fatura',
    mensal: 9.32,
    ref: 'média de junho de 2026 (191,3% ao ano)',
    serie: 'SGS 25478 (a.m.)',
    modo: 'parcelas',
    portavel: false,
  },
  'cartao-rotativo': {
    nome: 'Rotativo do cartão de crédito',
    curto: 'rotativo do cartão',
    mensal: 15.29,
    ref: 'média de setembro de 2026 (cerca de 444% ao ano)',
    serie: 'SGS 25477 (a.m.)',
    modo: 'rotativo',
    portavel: false,
  },
  'cheque-especial': {
    nome: 'Cheque especial',
    curto: 'cheque especial',
    mensal: 7.56,
    ref: 'média de junho de 2026 (139,8% ao ano)',
    serie: 'SGS 25463 (a.m.)',
    modo: 'rotativo',
    portavel: false,
    teto: { valor: 8, regra: 'limite de 8% ao mês do cheque especial (Resolução CMN 4.765/2019)' },
  },
  outro: {
    nome: 'Outro empréstimo ou financiamento',
    curto: 'empréstimo',
    mensal: null,
    ref: '',
    serie: '',
    modo: 'parcelas',
    portavel: true,
  },
};

/** Opções para trocar uma dívida cara por outra mais barata (mostradas para rotativo, cheque especial e parcelamentos caros). */
export const TROCAS: TipoDivida[] = ['pessoal', 'consignado-privado', 'consignado-inss'];
