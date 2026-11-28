// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { redirectsRedes } from './redirects-redes.mjs';
import { linksCurtos } from './links-curtos.mjs';
import { readdirSync, readFileSync } from 'node:fs';

// Data da última atualização de cada artigo (updatedDate ou pubDate) para o <lastmod> do sitemap.
// Ajuda o Google a saber o que é novo e priorizar o rastreamento.
const lastmodPorUrl = new Map();
for (const f of readdirSync('./src/content/blog')) {
  if (!f.endsWith('.md')) continue;
  const fm = readFileSync(`./src/content/blog/${f}`, 'utf8').split('---')[1] ?? '';
  const data = (fm.match(/^updatedDate:\s*(\S+)/m) ?? fm.match(/^pubDate:\s*(\S+)/m))?.[1];
  if (data) lastmodPorUrl.set(`https://rendaonline.org/${f.replace(/\.md$/, '')}/`, new Date(data).toISOString());
}
const ultimaData = [...lastmodPorUrl.values()].sort().at(-1);

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
      serialize(item) {
        const lastmod = lastmodPorUrl.get(item.url);
        if (lastmod) item.lastmod = lastmod;
        // Páginas que listam artigos mudam sempre que sai um artigo novo.
        else if (item.url === 'https://rendaonline.org/' || item.url.endsWith('/blog/') || item.url.includes('/categoria/')) item.lastmod = ultimaData;
        return item;
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
