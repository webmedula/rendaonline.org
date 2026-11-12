export const SITE_TITLE = 'Renda Online';
export const SITE_DESCRIPTION =
  'Tutoriais práticos de inteligência artificial, automação e ferramentas para trabalhar e ganhar dinheiro online.';
export const SITE_URL = 'https://rendaonline.org';
export const AUTHOR_NAME = 'João Paulo';
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
} as const;

export type CategorySlug = keyof typeof CATEGORIES;
