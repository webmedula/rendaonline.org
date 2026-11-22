// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { redirectsRedes } from './redirects-redes.mjs';
import { linksCurtos } from './links-curtos.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://rendaonline.org',
  trailingSlash: 'always',
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
