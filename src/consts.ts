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
  if (t.some((x) => ['shopee', 'mercado livre', 'tiny', 'nota fiscal'].includes(x))) return 'marketplace';
  if (t.some((x) => ['site profissional', 'quanto custa'].includes(x))) return 'site';
  if (t.includes('hospedagem')) return 'hospedagem';
  if (category === 'criar-site') return 'blog';
  // ia-empresas e demais caem em automação sob medida
  return 'automacao';
}

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
