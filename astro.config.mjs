// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { redirectsRedes } from './redirects-redes.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://rendaonline.org',
  trailingSlash: 'always',
  redirects: { ...redirectsRedes, '/quiz/': '/quiz-renda-extra/' },
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/page/') && !page.includes('/materiais/') && !page.includes('/quiz-renda-extra/resultado/'),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
