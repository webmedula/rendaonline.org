// Diagnóstico de automação para empresas (/diagnostico-automacao/).
// Cálculo puro: roda no navegador e no build (exemplo da página). Todas as premissas ficam visíveis para o visitante.

export const SEGMENTOS = {
  loja: 'Loja física ou comércio',
  online: 'Loja online ou marketplace (Shopee, Mercado Livre)',
  saude: 'Clínica, consultório ou estética',
  servicos: 'Prestação de serviços (escritório, oficina, agência)',
  alimentacao: 'Restaurante, delivery ou alimentação',
  outro: 'Outro tipo de negócio',
} as const;
export type Segmento = keyof typeof SEGMENTOS;

export const EQUIPES = {
  '1': 'Só eu',
  '2-5': '2 a 5 pessoas',
  '6-15': '6 a 15 pessoas',
  '16+': '16 ou mais',
} as const;
export type Equipe = keyof typeof EQUIPES;

export const MENSAGENS = {
  '10': { label: 'Até 10 por dia', valor: 10 },
  '30': { label: '10 a 30 por dia', valor: 20 },
  '80': { label: '30 a 80 por dia', valor: 55 },
  '150': { label: 'Mais de 80 por dia', valor: 120 },
} as const;
export type Mensagens = keyof typeof MENSAGENS;

/** Tempo da primeira resposta e % dos pedidos de orçamento que se perdem por demora (premissa conservadora, editável). */
export const RESPOSTA = {
  '5min': { label: 'Em poucos minutos', perda: 0 },
  '1h': { label: 'Em até 1 hora', perda: 5 },
  horas: { label: 'Em algumas horas', perda: 10 },
  dia: { label: 'Só no dia seguinte, às vezes', perda: 20 },
} as const;
export type Resposta = keyof typeof RESPOSTA;

export const TAREFAS = {
  perguntas: 'Responder as mesmas perguntas (preço, horário, endereço)',
  agenda: 'Agendar, confirmar e remarcar horários',
  orcamentos: 'Montar e enviar orçamentos',
  pedidos: 'Digitar pedidos ou dados em planilha ou sistema',
  notas: 'Emitir nota fiscal à mão',
  cobranca: 'Cobrar clientes e enviar boletos ou Pix',
  relatorios: 'Juntar números e montar relatórios',
  posvenda: 'Avisar status do pedido e pedir avaliação',
} as const;
export type Tarefa = keyof typeof TAREFAS;

export const HORAS = {
  '3': { label: 'Até 5 horas por semana', valor: 3 },
  '8': { label: '5 a 10 horas', valor: 7.5 },
  '15': { label: '10 a 20 horas', valor: 15 },
  '30': { label: '20 a 40 horas', valor: 30 },
  '50': { label: 'Mais de 40 horas', valor: 50 },
} as const;
export type Horas = keyof typeof HORAS;

export const SITE = {
  traz: 'Tem site e ele traz clientes',
  parado: 'Tem site, mas quase não traz clientes',
  nao: 'Não tem site (só Instagram ou WhatsApp)',
} as const;
export type Site = keyof typeof SITE;

export const DORES = {
  atendimento: 'Atendimento lento ou mensagens sem resposta',
  tempo: 'Equipe presa em tarefas manuais',
  vendas: 'Poucos clientes novos',
  erros: 'Erros de digitação, pedidos ou notas',
  controle: 'Falta de controle e de números do negócio',
} as const;
export type Dor = keyof typeof DORES;

export interface Premissas {
  /** Multiplicador do salário para custo total (encargos, 13º, férias, FGTS). */
  encargos: number;
  /** Horas de trabalho por mês. */
  horasMes: number;
  /** % das tarefas repetitivas que dá para automatizar. */
  pctAutomatizavel: number;
  /** % dos pedidos de orçamento perdidos pela demora na resposta. */
  pctPerdido: number;
}

export interface Respostas {
  segmento: Segmento;
  equipe: Equipe;
  mensagens: Mensagens;
  resposta: Resposta;
  tarefas: Tarefa[];
  horas: Horas;
  salario: number;
  pedidosSemana: number;
  ticket: number;
  fecha: number; // de cada 10 pedidos, quantos fecham
  site: Site;
  dor: Dor;
}

export const SEMANAS_MES = 4.33;

export function premissasPadrao(r: Pick<Respostas, 'resposta'>): Premissas {
  return { encargos: 1.5, horasMes: 176, pctAutomatizavel: 60, pctPerdido: RESPOSTA[r.resposta].perda };
}

export interface Recomendacao {
  key: 'whatsapp' | 'marketplace' | 'automacao' | 'site' | 'agenda' | 'delivery';
  titulo: string;
  porque: string;
  preco: string;
  precoMin: number;
  href: string;
}

export interface Resultado {
  horasSemana: number;
  horasMesAutomatizaveis: number;
  custoHora: number;
  custoTempoMes: number;
  economiaTempoMes: number;
  pedidosMes: number;
  pedidosPerdidosMes: number;
  vendasPerdidasMes: number;
  totalMes: number;
  totalAno: number;
  nivel: { nome: 'Baixo' | 'Médio' | 'Alto'; texto: string };
  recomendacoes: Recomendacao[];
}

const REC: Record<Recomendacao['key'], Omit<Recomendacao, 'porque'>> = {
  delivery: {
    key: 'delivery',
    titulo: 'Delivery próprio sem comissão (WebTenda)',
    preco: 'a partir de R$ 49,90/mês',
    precoMin: 49.9,
    href: '/delivery-sem-comissao/',
  },
  whatsapp: {
    key: 'whatsapp',
    titulo: 'Atendimento no WhatsApp com IA',
    preco: 'a partir de R$ 1.500',
    precoMin: 1500,
    href: '/atendimento-whatsapp-com-ia/',
  },
  agenda: {
    key: 'agenda',
    titulo: 'Agendamento e confirmação automáticos',
    preco: 'a partir de R$ 800',
    precoMin: 800,
    href: '/atendimento-whatsapp-com-ia/',
  },
  marketplace: {
    key: 'marketplace',
    titulo: 'Pedidos e notas fiscais automáticos',
    preco: 'a partir de R$ 1.500',
    precoMin: 1500,
    href: '/automacao-shopee-mercado-livre/',
  },
  automacao: {
    key: 'automacao',
    titulo: 'Automação sob medida com IA',
    preco: 'a partir de R$ 800',
    precoMin: 800,
    href: '/servicos/',
  },
  site: {
    key: 'site',
    titulo: 'Site profissional que gera contatos',
    preco: 'a partir de R$ 1.500',
    precoMin: 1500,
    href: '/servicos/',
  },
};

export function calcular(r: Respostas, p: Premissas = premissasPadrao(r)): Resultado {
  const horasSemana = r.tarefas.length ? HORAS[r.horas].valor : 0;
  const custoHora = (Math.max(0, r.salario) * p.encargos) / p.horasMes;
  const custoTempoMes = horasSemana * SEMANAS_MES * custoHora;
  const horasMesAutomatizaveis = horasSemana * SEMANAS_MES * (p.pctAutomatizavel / 100);
  const economiaTempoMes = horasMesAutomatizaveis * custoHora;

  const pedidosMes = Math.max(0, r.pedidosSemana) * SEMANAS_MES;
  const pedidosPerdidosMes = pedidosMes * (p.pctPerdido / 100);
  const vendasPerdidasMes = pedidosPerdidosMes * (Math.min(10, Math.max(0, r.fecha)) / 10) * Math.max(0, r.ticket);

  const totalMes = economiaTempoMes + vendasPerdidasMes;

  // Nível de oportunidade: quanto mais tarefas manuais, mensagens e demora, maior.
  let pontos = r.tarefas.length;
  pontos += { '10': 0, '30': 1, '80': 2, '150': 3 }[r.mensagens];
  pontos += { '5min': 0, '1h': 1, horas: 2, dia: 3 }[r.resposta];
  pontos += { '3': 0, '8': 1, '15': 2, '30': 3, '50': 3 }[r.horas];
  const nivel: Resultado['nivel'] =
    pontos >= 9
      ? { nome: 'Alto', texto: 'Seu negócio tem muito trabalho manual que já dá para automatizar. É aqui que a automação se paga mais rápido.' }
      : pontos >= 5
        ? { nome: 'Médio', texto: 'Há tarefas e atendimentos que podem rodar sozinhos e liberar a equipe para vender e atender melhor.' }
        : { nome: 'Baixo', texto: 'Sua operação já é enxuta. Ainda assim, uma ou duas automações pontuais podem valer a pena.' };

  // Recomendações por prioridade.
  const recs: Recomendacao[] = [];
  const add = (key: Recomendacao['key'], porque: string) => {
    if (!recs.some((x) => x.key === key)) recs.push({ ...REC[key], porque });
  };
  const t = new Set(r.tarefas);
  const atendimentoPesado = r.resposta === 'horas' || r.resposta === 'dia' || r.mensagens === '80' || r.mensagens === '150';

  if (r.segmento === 'alimentacao')
    add('delivery', 'Cardápio digital no seu link: o cliente pede sem app, paga direto a você e o pedido cai num painel. Mensalidade fixa, sem comissão por pedido, 14 dias grátis.');
  if (r.segmento === 'online' || (t.has('pedidos') && t.has('notas')))
    add('marketplace', 'Pedidos entram sozinhos no sistema, a nota fiscal sai automática e o cliente recebe o status no WhatsApp.');
  if (atendimentoPesado || t.has('perguntas') || r.dor === 'atendimento')
    add('whatsapp', 'Um assistente responde na hora, 24 horas por dia, tira dúvidas, qualifica o cliente e passa para a equipe só o que precisa.');
  if (t.has('agenda') || r.segmento === 'saude')
    add('agenda', 'Cliente marca sozinho pelo WhatsApp, recebe lembrete e confirma. Menos faltas e menos tempo no telefone.');
  if (t.has('orcamentos') || t.has('cobranca') || t.has('relatorios') || t.has('pedidos') || t.has('posvenda') || r.dor === 'tempo' || r.dor === 'controle' || r.dor === 'erros')
    add('automacao', 'Orçamentos, cobranças, planilhas e relatórios gerados sozinhos, sem digitação e sem erro.');
  if (r.site !== 'traz' || r.dor === 'vendas')
    add('site', r.site === 'nao'
      ? 'Um site rápido, que aparece no Google e leva o visitante direto para o seu WhatsApp.'
      : 'Reformular o site para virar contato: oferta clara, WhatsApp em destaque e medição dos pedidos.');
  if (!recs.length) add('automacao', 'Uma automação pontual na tarefa que mais toma tempo hoje.');

  return {
    horasSemana,
    horasMesAutomatizaveis,
    custoHora,
    custoTempoMes,
    economiaTempoMes,
    pedidosMes,
    pedidosPerdidosMes,
    vendasPerdidasMes,
    totalMes,
    totalAno: totalMes * 12,
    nivel,
    recomendacoes: recs.slice(0, 3),
  };
}
