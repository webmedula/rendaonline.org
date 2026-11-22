// Conteúdo para as redes sociais: uma lista única de tudo que pode virar post
// (artigos, calculadoras, páginas e reviews de plataformas), com legenda pronta
// e imagens geradas no build em /social/<id>/<formato>.jpg.
//
// - /social/fila.json  → lida pelo robô de postagem (scripts/social/publicar.mjs)
// - /pinterest.xml     → feed que o Pinterest lê sozinho (publicação automática por RSS)
// - BlogPost/ToolLayout usam /social/<id>/og.jpg como imagem de compartilhamento
import { getCollection } from 'astro:content';
import { CATEGORIES, SITE_URL, TOOLS, type CategorySlug } from '../consts';

export type SocialTipo = 'artigo' | 'ferramenta' | 'pagina' | 'plataforma';

export interface SocialItem {
  id: string;
  tipo: SocialTipo;
  path: string;
  /** Selo no topo da imagem. */
  selo: string;
  /** Título grande da imagem. */
  titulo: string;
  /** Texto menor da imagem. */
  subtitulo: string;
  /** Texto do botão da imagem e da chamada na legenda. */
  cta: string;
  /** Primeira linha da legenda (a que aparece antes do "ver mais"). */
  gancho: string;
  /** Corpo da legenda. */
  texto: string;
  hashtags: string[];
  /** Data de publicação (ISO). Artigos novos passam na frente da fila. */
  data: string;
  /** Ordem na fila de conteúdo antigo: menor sai antes. */
  prioridade: number;
  /** Pode voltar a ser postado depois de um tempo. */
  repetir: boolean;
  /** false = só gera a imagem de compartilhamento (og), fora da fila do robô e do Pinterest. */
  fila?: boolean;
}

export const FORMATOS = {
  instagram: { width: 1080, height: 1350 },
  pinterest: { width: 1000, height: 1500 },
  og: { width: 1200, height: 630 },
} as const;
export type Formato = keyof typeof FORMATOS;

const BASE_TAGS = ['#rendaonline'];
const TAGS_CATEGORIA: Record<CategorySlug, string[]> = {
  'ia-conteudo': ['#inteligenciaartificial', '#ia', '#chatgpt', '#criacaodeconteudo', '#marketingdigital'],
  automacao: ['#automacao', '#inteligenciaartificial', '#n8n', '#produtividade', '#ia'],
  ferramentas: ['#ferramentasdeia', '#inteligenciaartificial', '#ia', '#produtividade', '#tecnologia'],
  'criar-site': ['#blog', '#adsense', '#criarsite', '#marketingdigital', '#rendaextra'],
  'ia-empresas': ['#empreendedorismo', '#pequenasempresas', '#automacao', '#whatsappbusiness', '#vendas'],
};
const TAGS_TRABALHO = ['#trabalhoonline', '#rendaextra', '#trabalhoremoto', '#ganhardinheiro', '#homeoffice', '#freelancer'];
const TAGS_FINANCAS = ['#financaspessoais', '#clt', '#direitostrabalhistas', '#dinheiro', '#educacaofinanceira'];

/** Separa "Título: complemento" em título curto + subtítulo para a imagem. */
function dividirTitulo(title: string): [string, string] {
  const m = title.match(/^(.{12,70}?)[:?]\s+(.+)$/);
  if (m) {
    const q = title.charAt(m[1].length) === '?' ? '?' : '';
    return [m[1] + q, capitalizar(m[2])];
  }
  const p = title.match(/^(.{12,80}?)\s+\((.+)\)$/);
  if (p) return [p[1], capitalizar(p[2])];
  return [title, ''];
}

function capitalizar(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Textos das calculadoras (ganchos escritos à mão, com o que a pessoa procura).
const FERRAMENTAS: Record<string, { gancho: string; texto: string; titulo: string; prioridade: number }> = {
  'calculadora-decimo-terceiro': {
    titulo: 'Quanto vai cair do seu 13º?',
    gancho: '💰 A 1ª parcela do 13º sai até 30/11. Já sabe quanto vai receber?',
    texto: 'Calcule em 10 segundos o valor da 1ª e da 2ª parcela, com INSS e Imposto de Renda descontados e o 13º proporcional aos meses trabalhados. Grátis e sem cadastro.',
    prioridade: 1,
  },
  'calculadora-salario-liquido': {
    titulo: 'Quanto sobra do seu salário?',
    gancho: 'Seu salário bruto não é o que cai na conta. Veja quanto sobra de verdade 👇',
    texto: 'A calculadora desconta INSS e Imposto de Renda com as regras de 2026, já com a isenção para quem ganha até R$ 5 mil. Grátis e sem cadastro.',
    prioridade: 3,
  },
  'calculadora-juros-divida': {
    titulo: 'Quanto você paga de juros na sua dívida?',
    gancho: 'Você sabe quanto do seu empréstimo é só juros? Faça a conta em 1 minuto 👇',
    texto: 'Coloque o valor, a parcela e o prazo: a calculadora mostra a taxa real, quanto ainda falta de juros, a comparação com a média do Banco Central e quanto você economiza levando a dívida para outro banco.',
    prioridade: 2,
  },
  'calculadora-rescisao': {
    titulo: 'Quanto você recebe na rescisão?',
    gancho: 'Saiu ou vai sair do emprego? Confira se a rescisão está certa antes de assinar.',
    texto: 'Saldo de salário, aviso prévio, 13º, férias e multa do FGTS para demissão sem justa causa, pedido de demissão ou acordo. Calcule grátis.',
    prioridade: 4,
  },
  'calculadora-das-mei': {
    titulo: 'Quanto é o DAS do MEI em 2026?',
    gancho: 'MEI: o DAS vence todo dia 20. Você sabe o valor certo da sua atividade?',
    texto: 'Veja o valor do DAS por atividade, quanto você paga no ano e se o seu faturamento ainda cabe no limite do MEI.',
    prioridade: 5,
  },
  'calculadora-ferias': {
    titulo: 'Quanto você recebe nas férias?',
    gancho: 'Vai tirar férias? Descubra quanto entra na conta antes de sair.',
    texto: 'Férias com 1/3, venda de 10 dias (abono pecuniário) e adiantamento do 13º, com INSS e IR descontados. Calcule grátis.',
    prioridade: 6,
  },
  'quanto-cobrar-por-hora-freelancer': {
    titulo: 'Quanto cobrar por hora como freelancer?',
    gancho: 'Freelancer: se você cobra pouco, trabalha muito e ganha mal. Faça a conta certa.',
    texto: 'A calculadora considera impostos, custos, férias e as horas que não dá para cobrar, e mostra o seu valor-hora mínimo.',
    prioridade: 7,
  },
  'calculadora-juros-compostos': {
    titulo: 'Quanto seu dinheiro rende com juros compostos?',
    gancho: 'Quanto R$ 200 por mês viram em 10 anos? A resposta surpreende.',
    texto: 'Simule aportes mensais, taxa e prazo e veja o crescimento ano a ano em um gráfico. Grátis e sem cadastro.',
    prioridade: 8,
  },
};

// Páginas fixas que valem divulgar de tempos em tempos.
const PAGINAS: Omit<SocialItem, 'tipo' | 'repetir'>[] = [
  {
    id: 'quiz-renda-extra',
    path: '/quiz-renda-extra/',
    selo: 'Quiz grátis',
    titulo: 'Qual renda extra online combina com você?',
    subtitulo: '7 perguntas rápidas e um plano para os seus primeiros 7 dias.',
    cta: 'Faça o quiz',
    gancho: '🧩 Qual renda extra online combina com você? Faça o teste em 1 minuto.',
    texto: 'Responda 7 perguntas sobre o seu tempo, o que você sabe fazer e a sua urgência e descubra o caminho certo para começar, com um plano para os primeiros 7 dias. Depois, marque um amigo para ele fazer também.',
    hashtags: ['#rendaextra', '#trabalhoonline', '#ganhardinheiro', '#quiz', '#rendaextraonline'],
    data: '2026-11-15',
    prioridade: 0.5,
  },
  {
    id: '50-prompts-ia',
    path: '/50-prompts-ia/',
    selo: 'PDF grátis',
    titulo: '50 prompts para ganhar dinheiro com IA',
    subtitulo: 'Copie, cole no ChatGPT, Claude ou Gemini e use hoje.',
    cta: 'Baixe grátis',
    gancho: '🎁 Material grátis: 50 prompts prontos para ganhar dinheiro com IA.',
    texto: 'Prompts para criar conteúdo, vender serviços como freelancer, montar ofertas e atender clientes. É só copiar, colar e adaptar. O PDF é gratuito.',
    hashtags: ['#prompts', '#chatgpt', '#inteligenciaartificial', '#rendaextra', '#ganhardinheiro'],
    data: '2026-11-14',
    prioridade: 2,
  },
  {
    id: 'diagnostico-automacao',
    path: '/diagnostico-automacao/',
    selo: 'Teste grátis para empresas',
    titulo: 'Quanto sua empresa perde sem automação?',
    subtitulo: '10 perguntas, 2 minutos e um plano do que automatizar primeiro.',
    cta: 'Faça o diagnóstico',
    gancho: 'Quanto tempo sua equipe gasta respondendo a mesma pergunta no WhatsApp?',
    texto: 'Responda 10 perguntas em 2 minutos e veja quanto tempo e dinheiro sua empresa perde com tarefas manuais e atendimento lento, e o que automatizar primeiro. Gratuito.',
    hashtags: ['#empreendedorismo', '#automacao', '#pequenasempresas', '#produtividade', '#gestao'],
    data: '2026-11-14',
    prioridade: 9,
  },
  {
    id: 'trabalho-online',
    path: '/trabalho-online/',
    selo: 'Trabalho online',
    titulo: '12 sites para trabalhar online e ganhar em dólar',
    subtitulo: 'Testamos quanto pagam, se aceitam brasileiros e como receber.',
    cta: 'Veja a lista',
    gancho: 'Quer ganhar em dólar de casa? Estas plataformas pagam de verdade.',
    texto: 'Treinar IA, testar sites, freelas e pesquisas: avaliamos 12 plataformas com quanto pagam, se aceitam brasileiros e como receber o dinheiro.',
    hashtags: TAGS_TRABALHO,
    data: '2026-11-13',
    prioridade: 10,
  },
  {
    id: 'delivery-sem-comissao',
    path: '/delivery-sem-comissao/',
    selo: 'Para restaurantes',
    titulo: 'Delivery próprio sem pagar comissão',
    subtitulo: 'Cardápio digital no seu link, mensalidade fixa e 14 dias grátis.',
    cta: 'Teste grátis',
    gancho: 'Cansou de deixar até 23% de cada pedido para o aplicativo de delivery?',
    texto: 'Tenha cardápio digital com link próprio, pedidos de entrega e retirada e painel do lojista, com mensalidade fixa e sem taxa por pedido. 14 dias grátis para testar.',
    hashtags: ['#delivery', '#restaurante', '#lanchonete', '#cardapiodigital', '#empreendedorismo'],
    data: '2026-11-14',
    prioridade: 12,
  },
  {
    id: 'atendimento-whatsapp-com-ia',
    path: '/atendimento-whatsapp-com-ia/',
    selo: 'Para empresas',
    titulo: 'Seu WhatsApp respondendo clientes 24 horas',
    subtitulo: 'Assistente com IA que tira dúvidas, agenda e chama a equipe quando precisa.',
    cta: 'Saiba mais',
    gancho: 'Cliente que espera resposta no WhatsApp compra do concorrente.',
    texto: 'Um assistente com inteligência artificial no número da sua empresa: responde dúvidas, agenda horários, qualifica o contato e passa para um humano quando precisa.',
    hashtags: ['#whatsappbusiness', '#atendimento', '#inteligenciaartificial', '#pequenasempresas', '#vendas'],
    data: '2026-11-13',
    prioridade: 14,
  },
  {
    id: 'sistemas-instalados',
    path: '/sistemas-instalados/',
    selo: 'Para empresas',
    titulo: 'Sistemas de atendimento sem pagar por usuário',
    subtitulo: 'Multiatendimento no WhatsApp, Chatwoot, e-mail marketing e agenda online.',
    cta: 'Veja os sistemas',
    gancho: 'Sua empresa paga licença por atendente? Dá para ter o mesmo sistema no seu servidor.',
    texto: 'Instalamos e hospedamos sistemas de código aberto para atendimento no WhatsApp, central omnichannel, e-mail marketing e agenda online, com seus dados no seu servidor.',
    hashtags: ['#empreendedorismo', '#atendimento', '#whatsappbusiness', '#tecnologia', '#pequenasempresas'],
    data: '2026-11-14',
    prioridade: 16,
  },
];

// Páginas que só precisam da imagem de compartilhamento (WhatsApp, Facebook, LinkedIn),
// sem entrar na fila de postagem automática.
const SO_COMPARTILHAMENTO: Omit<SocialItem, 'tipo' | 'repetir' | 'fila' | 'prioridade' | 'hashtags' | 'gancho' | 'texto'>[] = [
  {
    id: 'mentoria',
    path: '/mentoria/',
    selo: 'Mentoria ao vivo',
    titulo: 'Aprenda a criar sites e automações com IA',
    subtitulo: 'E a vender esses serviços para empresas, com quem faz isso todo dia.',
    cta: 'Conheça a mentoria',
    data: '2026-11-13',
  },
  {
    id: 'servicos',
    path: '/servicos/',
    selo: 'Serviços',
    titulo: 'Sites, automações e IA para o seu negócio',
    subtitulo: 'n8n instalado, VPS configurada, blogs prontos e atendimento com IA.',
    cta: 'Veja os serviços',
    data: '2026-11-12',
  },
  {
    id: 'automacao-shopee-mercado-livre',
    path: '/automacao-shopee-mercado-livre/',
    selo: 'Para lojistas',
    titulo: 'Automação para Shopee e Mercado Livre',
    subtitulo: 'Pedidos no Tiny e nota fiscal emitida sem digitação.',
    cta: 'Saiba mais',
    data: '2026-11-13',
  },
  {
    id: 'ferramentas',
    path: '/ferramentas/',
    selo: 'Calculadoras grátis',
    titulo: 'Calculadoras grátis de salário, rescisão, férias e MEI',
    subtitulo: 'Atualizadas com as tabelas de 2026. Sem cadastro.',
    cta: 'Calcule grátis',
    data: '2026-11-13',
  },
];

let cache: SocialItem[] | undefined;

export async function getSocialItems(): Promise<SocialItem[]> {
  if (cache) return cache;
  const itens: SocialItem[] = [];

  const posts = await getCollection('blog', ({ data }) => !data.draft);
  for (const post of posts) {
    const d = post.data;
    const [titulo, sub] = dividirTitulo(d.socialTitle ?? d.title);
    itens.push({
      id: post.id,
      tipo: 'artigo',
      path: `/${post.id}/`,
      selo: CATEGORIES[d.category].name,
      titulo,
      subtitulo: sub || d.description,
      cta: 'Leia o guia completo',
      gancho: d.title,
      texto: d.description,
      hashtags: TAGS_CATEGORIA[d.category],
      data: d.pubDate.toISOString(),
      prioridade: 20,
      repetir: true,
    });
  }

  for (const t of TOOLS) {
    const f = FERRAMENTAS[t.slug];
    itens.push({
      id: t.slug,
      tipo: 'ferramenta',
      path: `/ferramentas/${t.slug}/`,
      selo: 'Calculadora grátis',
      titulo: f?.titulo ?? t.name,
      subtitulo: t.summary,
      cta: 'Calcule grátis',
      gancho: f?.gancho ?? `${t.name}: grátis e sem cadastro.`,
      texto: f?.texto ?? t.summary,
      hashtags: t.slug === 'calculadora-juros-divida'
        ? ['#dividas', '#emprestimo', '#portabilidade', '#educacaofinanceira', '#financaspessoais']
        : t.slug.includes('freelancer') || t.slug.includes('mei')
        ? ['#freelancer', '#mei', '#empreendedorismo', '#rendaextra', '#financas']
        : TAGS_FINANCAS,
      data: '2026-11-13T12:00:00.000Z',
      prioridade: f?.prioridade ?? 11,
      repetir: true,
    });
  }

  for (const p of PAGINAS) itens.push({ ...p, tipo: 'pagina', repetir: true, data: new Date(p.data + 'T12:00:00Z').toISOString() });

  const plataformas = await getCollection('plataformas');
  for (const p of plataformas) {
    const d = p.data;
    itens.push({
      id: `plataforma-${p.id}`,
      tipo: 'plataforma',
      path: `/trabalho-online/${p.id}/`,
      selo: 'Trabalho online',
      titulo: `${d.name} paga mesmo?`,
      subtitulo: `Ganhos: ${d.ganhos}. Aceita brasileiros: ${d.aceitaBrasil}.`,
      cta: 'Leia a avaliação',
      gancho: `${d.name} paga mesmo? Testamos e contamos tudo.`,
      texto: d.description,
      hashtags: TAGS_TRABALHO,
      data: d.pubDate.toISOString(),
      prioridade: 30 + d.order / 100,
      repetir: true,
    });
  }

  // Na fila de conteúdo antigo, artigos se alternam com calculadoras e páginas (o mais novo primeiro).
  itens
    .filter((i) => i.tipo === 'artigo')
    .sort((a, b) => b.data.localeCompare(a.data))
    .forEach((i, n) => (i.prioridade = 1.5 + n * 1.5));

  for (const p of SO_COMPARTILHAMENTO)
    itens.push({ ...p, tipo: 'pagina', gancho: p.titulo, texto: p.subtitulo, hashtags: [], prioridade: 99, repetir: false, fila: false, data: new Date(p.data + 'T12:00:00Z').toISOString() });

  for (const i of itens) i.hashtags = [...new Set([...i.hashtags, ...BASE_TAGS])];
  cache = itens;
  return itens;
}

/** Link com UTM para medir no Analytics de onde veio a visita. */
export function linkComUtm(path: string, origem: string) {
  return `${SITE_URL}${path}?utm_source=${origem}&utm_medium=social&utm_campaign=autopost`;
}

export function legendas(i: SocialItem) {
  const tags = i.hashtags;
  const facebook = [i.gancho, '', i.texto, '', `👉 ${i.cta}: ${linkComUtm(i.path, 'facebook')}`, '', tags.slice(0, 4).join(' ')].join('\n');
  const instagram = [
    i.gancho,
    '',
    i.texto,
    '',
    `🔗 ${i.cta}: link na bio (rendaonline.org/links)`,
    '',
    'Salve este post para consultar depois e mande para quem precisa ver isso.',
    '',
    tags.slice(0, 10).join(' '),
  ].join('\n');
  return { facebook, instagram };
}
