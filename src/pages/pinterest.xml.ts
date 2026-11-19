// Feed RSS para o Pinterest publicar sozinho (Configurações → Criar Pins em massa → Publicação automática).
// Cada item traz a imagem vertical 1000x1500 gerada no build.
import type { APIRoute } from 'astro';
import { SITE_URL, SITE_TITLE } from '../consts';
import { getSocialItems, linkComUtm } from '../lib/social';
import { renderSocialImage } from '../lib/social-image';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const itens = (await getSocialItems()).filter((i) => i.fila !== false).sort((a, b) => b.data.localeCompare(a.data));
  const xml: string[] = [];
  for (const i of itens) {
    const img = `${SITE_URL}/social/${i.id}/pinterest.jpg`;
    const tamanho = (await renderSocialImage(i, 'pinterest')).length;
    const titulo = i.tipo === 'artigo' && i.gancho.length <= 100 ? i.gancho : i.titulo;
    const desc = `${i.texto} ${i.hashtags.slice(0, 5).join(' ')}`.slice(0, 500);
    xml.push(`<item>
<title>${esc(titulo.slice(0, 100))}</title>
<link>${esc(linkComUtm(i.path, 'pinterest'))}</link>
<guid isPermaLink="false">${esc(i.id)}</guid>
<description>${esc(desc)}</description>
<pubDate>${new Date(i.data).toUTCString()}</pubDate>
<enclosure url="${img}" length="${tamanho}" type="image/jpeg"/>
<media:content url="${img}" type="image/jpeg" medium="image" width="1000" height="1500"/>
</item>`);
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>${esc(SITE_TITLE)}</title>
<link>${SITE_URL}/</link>
<description>Guias de IA, automação, calculadoras grátis e trabalho online.</description>
<language>pt-BR</language>
${xml.join('\n')}
</channel>
</rss>`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
