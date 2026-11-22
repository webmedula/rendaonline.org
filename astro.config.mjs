// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { redirectsRedes } from './redirects-redes.mjs';
import { linksCurtos } from './links-curtos.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://rendaonline.org',
  trailingSlash: 'always',
  // Mantém o espaço entre texto e link quando o link começa numa linha nova ("Veja<a" colava as palavras).
  compressHTML: false,
  redirects: { ...redirectsRedes, ...linksCurtos, '/quiz/': '/quiz-renda-extra/' },
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/page/') &&
        !page.includes('/materiais/') &&
        !page.includes('/quiz-renda-extra/resultado/') &&
        !page.endsWith('/links/'),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
