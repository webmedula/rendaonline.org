export const SITE_TITLE = 'Renda Online';
export const SITE_DESCRIPTION =
  'Tutoriais práticos de inteligência artificial, automação e ferramentas para trabalhar e ganhar dinheiro online.';
export const SITE_URL = 'https://rendaonline.org';
export const AUTHOR_NAME = 'João Paulo';
// Livro do autor na Amazon (ebook Kindle, como João Paulo Rocha).
export const AUTHOR_BOOK_URL = 'https://link.amazon/B045jwofx'; // link de afiliado (Amazon Associados) do livro
export const TWITTER_HANDLE = '@Rendaonline_org';
export const ADSENSE_CLIENT = 'ca-pub-6982528073256938';

export const CATEGORIES = {
  'ia-conteudo': {
    name: 'IA para conteúdo',
    description: 'Como usar inteligência artificial para criar textos, imagens e vídeos.',
  },
  automacao: {
    name: 'Automação e agentes',
    description: 'Automatize tarefas com IA, n8n, Claude Code e outras ferramentas.',
  },
  ferramentas: {
    name: 'Ferramentas e reviews',
    description: 'Testes, comparativos e alternativas gratuitas de ferramentas de IA.',
  },
  'criar-site': {
    name: 'Criar e monetizar site',
    description: 'WordPress, VPS, SEO, AdSense e afiliados na prática.',
  },
  'ia-empresas': {
    name: 'IA para empresas',
    description: 'Atendimento no WhatsApp, automação e sites para pequenos negócios: como funciona e quanto custa.',
  },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

// Contato comercial (WebMedula). Número no formato internacional, só dígitos.
export const WHATSAPP_NUMBER = '5562982908000';
export const COMPANY_NAME = 'WebMedula';
export const COMPANY_URL = 'https://www.webmedula.com.br';
export const COMPANY_EMAIL = 'contato@webmedula.com.br';
export const COMPANY_INSTAGRAM = 'https://www.instagram.com/webmedula/';
export const COMPANY_CITY = 'Goiânia (GO)';

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Serviços prontos. Preços editáveis aqui; aparecem em /servicos/ e nas caixas no fim dos artigos.
export const SERVICES = {
  n8n: {
    name: 'Instalação do n8n na sua VPS',
    price: 'R$ 297',
    summary: 'n8n instalado com Docker, domínio próprio e HTTPS, pronto para criar automações ilimitadas.',
    includes: ['Instalação com Docker', 'Subdomínio e SSL configurados', 'Backup automático', 'Chamada de 20 min para entrega'],
  },
  vps: {
    name: 'VPS com CyberPanel configurada',
    price: 'R$ 397',
    summary: 'Servidor pronto com CyberPanel, SSL, e-mail e migração de 1 site incluída.',
    includes: ['Instalação e segurança do servidor', 'CyberPanel + LiteSpeed', 'Migração de 1 site', 'SSL e DNS configurados'],
  },
  blog: {
    name: 'Blog pronto para monetizar',
    price: 'R$ 997',
    summary: 'Site rápido com SEO técnico, AdSense, Search Console e estrutura de categorias definida.',
    includes: ['Site em Astro ou WordPress', 'SEO técnico e sitemap', 'AdSense e ads.txt', 'Páginas institucionais'],
  },
  diagnostico: {
    name: 'Diagnóstico e correção de site',
    price: 'R$ 197',
    summary: 'Site lento, ads.txt não encontrado, AdSense negado ou erro no servidor: encontramos e corrigimos.',
    includes: ['Análise de velocidade e erros', 'Correção de ads.txt e AdSense', 'Relatório do que foi feito'],
  },
  automacao: {
    name: 'Automação sob medida com IA',
    price: 'a partir de R$ 800',
    summary: 'Um fluxo que tira trabalho repetitivo da sua equipe: atendimento, planilhas, e-mails, CRM ou WhatsApp.',
    includes: ['Diagnóstico gratuito de 20 min', 'Fluxo em n8n com IA', 'Treinamento de uso', '30 dias de suporte'],
  },
  site: {
    name: 'Site profissional para empresa',
    price: 'a partir de R$ 1.500',
    summary: 'Site rápido, pensado para virar contato: oferta clara, WhatsApp, SEO técnico e medição dos pedidos de orçamento.',
    includes: ['Até 6 páginas', 'Botão de WhatsApp e formulário', 'SEO técnico e Google Search Console', 'Hospedagem no primeiro mês'],
  },
  hospedagem: {
    name: 'Hospedagem gerenciada na nossa VPS',
    price: 'a partir de R$ 39/mês',
    summary: 'Seu site em servidor rápido com LiteSpeed, SSL, backup diário e suporte direto pelo WhatsApp, sem você mexer em painel.',
    includes: ['Servidor LiteSpeed com SSL', 'Backup diário', 'Migração gratuita do site', 'Suporte por WhatsApp'],
  },
  whatsapp: {
    name: 'Atendimento no WhatsApp com IA',
    price: 'a partir de R$ 1.500',
    summary: 'Assistente com IA no número da sua empresa: responde dúvidas, agenda, qualifica e passa para a equipe quando precisa.',
    includes: ['API oficial do WhatsApp', 'IA treinada com seu negócio', 'Integração com agenda ou CRM', '30 dias de ajustes'],
    page: '/atendimento-whatsapp-com-ia/',
  },
  marketplace: {
    name: 'Automação para lojas na Shopee e Mercado Livre',
    price: 'a partir de R$ 1.500',
    summary: 'Pedidos do marketplace entram sozinhos no ERP (Tiny/Olist), a nota fiscal sai automática e o cliente recebe aviso no WhatsApp.',
    includes: ['Pedidos sincronizados no Tiny', 'NF-e emitida sem digitação', 'Avisos no WhatsApp', 'Painel de devoluções opcional'],
    page: '/automacao-shopee-mercado-livre/',
  },
  delivery: {
    name: 'Delivery próprio sem comissão (WebTenda)',
    price: 'a partir de R$ 49,90/mês',
    summary: 'Cardápio digital com link próprio, pedidos de entrega e retirada e painel do lojista. Mensalidade fixa, sem taxa por pedido, 14 dias grátis.',
    includes: ['Cardápio digital no seu link', 'Pedidos sem app e sem cadastro do cliente', 'Pix, dinheiro ou cartão direto com você', 'Painel no computador e no celular'],
    page: '/delivery-sem-comissao/',
  },
  sistemas: {
    name: 'Sistemas de código aberto instalados para sua empresa',
    price: 'instalação a partir de R$ 297',
    summary: 'Multiatendimento no WhatsApp, central de atendimento, e-mail marketing, agenda online e automação, sem licença por usuário e com os dados no seu servidor.',
    includes: ['Instalação com domínio e SSL', 'Configuração inicial e treinamento', 'Hospedagem e atualizações opcionais', 'Suporte por WhatsApp'],
    page: '/sistemas-instalados/',
  },
  manutencao: {
    name: 'Manutenção mensal de VPS e n8n',
    price: 'a partir de R$ 97/mês',
    summary: 'Atualizações, backups, monitoramento e suporte para seu servidor e suas automações.',
    includes: ['Atualizações e backups', 'Monitoramento de uptime', 'Suporte por WhatsApp'],
  },
} as const;

export type ServiceKey = keyof typeof SERVICES;

/** Escolhe o serviço mais ligado ao artigo, pelas tags e pela categoria. */
export function serviceForPost(category: string, tags: readonly string[] = []): ServiceKey {
  const t = tags.map((x) => x.toLowerCase());
  if (t.includes('n8n')) return 'n8n';
  if (t.some((x) => ['vps', 'cyberpanel'].includes(x))) return 'vps';
  if (t.some((x) => ['ads.txt', 'adsense'].includes(x)) && !t.includes('criar blog')) return 'diagnostico';
  if (t.some((x) => ['whatsapp', 'chatbot'].includes(x))) return 'whatsapp';
  if (t.some((x) => ['delivery', 'ifood', 'cardapio digital', 'restaurante'].includes(x))) return 'delivery';
  if (t.some((x) => ['shopee', 'mercado livre', 'tiny', 'nota fiscal'].includes(x))) return 'marketplace';
  if (t.some((x) => ['site profissional', 'quanto custa'].includes(x))) return 'site';
  if (t.includes('hospedagem')) return 'hospedagem';
  if (category === 'criar-site') return 'blog';
  // ia-empresas e demais caem em automação sob medida
  return 'automacao';
}

// WebTenda: sistema de delivery próprio do autor (www.webtenda.com.br). Preços conferidos no site em 14/11/2026.
const WT_UTM = 'utm_source=rendaonline&utm_medium=referral';
export const WEBTENDA = {
  name: 'WebTenda',
  url: `https://www.webtenda.com.br/?${WT_UTM}&utm_campaign=site`,
  signup(campaign: string) {
    return `https://app.webtenda.com.br/cadastro?${WT_UTM}&utm_campaign=${encodeURIComponent(campaign)}`;
  },
  trialDays: 14,
  plans: [
    {
      name: 'Básico',
      price: 'R$ 49,90',
      value: 49.9,
      summary: 'Para quem está começando o delivery.',
      includes: ['Até 50 produtos', 'Até 300 pedidos por mês', 'Link próprio do cardápio', 'Painel de pedidos', 'Entrega e retirada'],
    },
    {
      name: 'Profissional',
      price: 'R$ 89,90',
      value: 89.9,
      summary: 'Para o negócio que já tem movimento.',
      includes: ['Até 200 produtos', 'Pedidos ilimitados', 'Link próprio do cardápio', 'Painel de pedidos', 'Entrega e retirada'],
      featured: true,
    },
    {
      name: 'Completo',
      price: 'R$ 149,90',
      value: 149.9,
      summary: 'Para cardápios grandes e mercadinhos.',
      includes: ['Produtos ilimitados', 'Pedidos ilimitados', 'Link próprio do cardápio', 'Painel de pedidos', 'Entrega e retirada'],
    },
  ],
} as const;

export const SOCIAL = {
  instagram: 'https://www.instagram.com/rendaonlineorg/',
  facebook: 'https://www.facebook.com/rendaonline.org',
} as const;

// Mentoria (sites, automações e como vender esses serviços).
export const MENTORING = [
  {
    key: 'avulsa',
    name: 'Sessão avulsa',
    price: 'R$ 197',
    detail: '1 encontro de 1 hora, online',
    summary: 'Para destravar um problema específico: instalar o n8n, subir um site na VPS, montar uma automação, precificar um projeto.',
    includes: ['Encontro ao vivo por vídeo, gravado', 'Revisão do seu projeto na tela', 'Resumo com os próximos passos'],
  },
  {
    key: 'mensal',
    name: 'Mentoria mensal',
    price: 'R$ 697',
    detail: '4 encontros semanais + suporte no WhatsApp',
    summary: 'Para quem quer aprender a criar sites ou automações com acompanhamento, construindo um projeto real do começo ao fim.',
    includes: ['4 encontros de 1 hora', 'Suporte no WhatsApp entre os encontros', 'Plano de estudo sob medida', 'Templates e workflows usados na WebMedula'],
    featured: true,
  },
  {
    key: 'primeiro-cliente',
    name: 'Programa Primeiro Cliente',
    price: 'R$ 1.797',
    detail: '90 dias, 12 encontros (ou 3x de R$ 599)',
    summary: 'Para quem quer transformar sites e automações em renda: técnica, oferta, preço, proposta e o primeiro cliente pagante.',
    includes: ['12 encontros semanais de 1 hora', 'Montagem da sua oferta e tabela de preços', 'Modelos de proposta e contrato', 'Revisão do seu primeiro projeto de cliente', 'Suporte no WhatsApp por 90 dias'],
  },
] as const;

// Ferramentas grátis (calculadoras) em /ferramentas/. Páginas com AdSense.
export const TOOLS = [
  {
    slug: 'calculadora-salario-liquido',
    name: 'Calculadora de salário líquido',
    short: 'Salário líquido',
    summary: 'Descubra quanto cai na conta depois do INSS e do Imposto de Renda, já com a isenção até R$ 5 mil.',
  },
  {
    slug: 'calculadora-rescisao',
    name: 'Calculadora de rescisão',
    short: 'Rescisão',
    summary: 'Saldo de salário, aviso prévio, 13º, férias e multa do FGTS para demissão, pedido ou acordo.',
  },
  {
    slug: 'calculadora-decimo-terceiro',
    name: 'Calculadora de 13º salário',
    short: '13º salário',
    summary: 'Valor da primeira e da segunda parcela do 13º, com descontos e meses trabalhados.',
  },
  {
    slug: 'calculadora-ferias',
    name: 'Calculadora de férias',
    short: 'Férias',
    summary: 'Férias com 1/3, venda de 10 dias (abono) e adiantamento do 13º, com o líquido a receber.',
  },
  {
    slug: 'calculadora-juros-compostos',
    name: 'Calculadora de juros compostos',
    short: 'Juros compostos',
    summary: 'Simule quanto seu dinheiro rende com aportes mensais, ano a ano.',
  },
  {
    slug: 'quanto-cobrar-por-hora-freelancer',
    name: 'Quanto cobrar por hora como freelancer',
    short: 'Valor da hora (freelancer)',
    summary: 'Calcule seu valor-hora com impostos, custos, férias e o tempo que não dá para cobrar.',
  },
  {
    slug: 'calculadora-das-mei',
    name: 'Calculadora do DAS MEI 2026',
    short: 'DAS MEI',
    summary: 'Valor do DAS por atividade, total no ano e se o seu faturamento cabe no limite do MEI.',
  },
] as const;

export type ToolSlug = (typeof TOOLS)[number]['slug'];

// Seção Trabalho online (/trabalho-online/): tipos de plataforma avaliados.
export const TIPOS_TRABALHO = {
  ia: { name: 'Treinar inteligência artificial', short: 'Treinar IA', description: 'Avaliar respostas de IA, anotar dados, gravar áudio e corrigir textos. Paga melhor que microtarefas comuns.' },
  testes: { name: 'Testes de sites e transcrição', short: 'Testes e transcrição', description: 'Testar sites e apps falando em voz alta, ou transcrever áudios. Pede atenção e, muitas vezes, inglês.' },
  freela: { name: 'Freelas', short: 'Freelas', description: 'Vender o que você sabe fazer (texto, design, sites, tradução) por projeto. É onde dá para ganhar de verdade.' },
  pesquisas: { name: 'Pesquisas e recompensas', short: 'Pesquisas', description: 'Responder pesquisas e ganhar pontos. Fácil, mas paga pouco: serve como trocado, não como renda.' },
} as const;
export type TipoTrabalho = keyof typeof TIPOS_TRABALHO;

// Sistemas de código aberto que instalamos (/sistemas-instalados/). Preços editáveis aqui.
// Só software de código aberto ou com licença que permite instalar para terceiros. Não revendemos scripts de pacotes.
export const SYSTEMS = [
  {
    key: 'multiatendimento',
    name: 'Multiatendimento no WhatsApp',
    tech: 'Ticketz ou Whaticket Community',
    summary: 'Um número de WhatsApp atendido por vários atendentes ao mesmo tempo, com filas por setor, transferência, respostas rápidas e histórico de cada cliente.',
    forWho: 'Lojas, clínicas, imobiliárias e qualquer empresa que tem mais de uma pessoa respondendo no WhatsApp.',
    setup: 'R$ 497',
    monthly: 'R$ 129/mês',
    includes: ['Atendentes e setores ilimitados', 'Filas, etiquetas e respostas rápidas', 'Painel no navegador e no celular', 'Mensagem de boas-vindas e horário de atendimento'],
    whatsappUnofficial: true,
  },
  {
    key: 'chatwoot',
    name: 'Central de atendimento omnichannel',
    tech: 'Chatwoot',
    summary: 'WhatsApp, Instagram, Facebook, chat do site e e-mail numa caixa de entrada só, com etiquetas, relatórios e espaço para um assistente com IA.',
    forWho: 'Empresas que atendem por vários canais e perdem mensagens entre um app e outro.',
    setup: 'R$ 497',
    monthly: 'R$ 129/mês',
    includes: ['Chat para o site', 'Instagram, Facebook e e-mail conectados', 'Relatórios de atendimento', 'Pronto para integrar com IA via n8n'],
  },
  {
    key: 'evolution',
    name: 'API de WhatsApp própria',
    tech: 'Evolution API',
    summary: 'Sua própria API para enviar e receber mensagens de WhatsApp a partir de sistemas, planilhas e automações, sem pagar por mensagem a terceiros.',
    forWho: 'Quem quer ligar o WhatsApp ao n8n, ao CRM, ao sistema da loja ou ao Chatwoot.',
    setup: 'R$ 297',
    monthly: 'R$ 79/mês',
    includes: ['Instâncias para vários números', 'Webhooks para n8n e outros sistemas', 'Painel de conexão por QR code', 'Documentação de uso entregue'],
    whatsappUnofficial: true,
  },
  {
    key: 'n8n',
    name: 'Automação de processos',
    tech: 'n8n',
    summary: 'Fluxos que trabalham sozinhos: lead do site vai para o CRM, pedido gera nota, planilha manda mensagem, IA responde e classifica.',
    forWho: 'Empresas com tarefas repetitivas entre sistemas, planilhas e WhatsApp.',
    setup: 'R$ 297',
    monthly: 'R$ 97/mês',
    monthlyNote: 'manutenção',
    includes: ['Instalação na VPS da sua empresa', 'Subdomínio e SSL', 'Backup automático', 'Chamada de 20 min para entrega'],
    ownServer: true,
  },
  {
    key: 'mautic',
    name: 'E-mail marketing e automação de leads',
    tech: 'Mautic',
    summary: 'Envie campanhas e sequências de e-mail para sua lista sem pagar por contato, com formulários, segmentos e pontuação de leads.',
    forWho: 'Negócios com lista de clientes que hoje pagam caro por ferramenta de e-mail ou não fazem e-mail nenhum.',
    setup: 'R$ 497',
    monthly: 'R$ 99/mês',
    includes: ['Contatos ilimitados', 'Formulários para o site', 'Sequências automáticas', 'Configuração de envio (SMTP) e domínio'],
  },
  {
    key: 'calcom',
    name: 'Agenda online',
    tech: 'Cal.com',
    summary: 'Uma página onde o cliente escolhe o horário e agenda sozinho, com confirmação e lembrete, sincronizada com o Google Agenda.',
    forWho: 'Consultórios, salões, barbearias, consultores e prestadores de serviço que marcam horário.',
    setup: 'R$ 297',
    monthly: 'R$ 69/mês',
    includes: ['Página de agendamento com sua marca', 'Sincronia com Google Agenda', 'Lembretes por e-mail', 'Vários profissionais e serviços'],
  },
] as const;

export const SYSTEMS_COMBO = {
  name: 'Combo atendimento completo',
  items: 'Chatwoot + Evolution API + n8n com assistente de IA',
  setup: 'R$ 997',
  monthly: 'R$ 197/mês',
  summary: 'WhatsApp, Instagram e chat do site numa caixa só, com um assistente de IA que responde as dúvidas comuns e passa para a equipe quando precisa.',
} as const;
