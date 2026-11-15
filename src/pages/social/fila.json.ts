// Fila lida pelo robô de postagem (.github/workflows/redes-sociais.yml).
import type { APIRoute } from 'astro';
import { SITE_URL } from '../../consts';
import { getSocialItems, legendas } from '../../lib/social';

export const GET: APIRoute = async () => {
  const itens = (await getSocialItems()).map((i) => ({
    id: i.id,
    tipo: i.tipo,
    url: `${SITE_URL}${i.path}`,
    titulo: i.gancho,
    data: i.data,
    prioridade: i.prioridade,
    repetir: i.repetir,
    imagens: {
      instagram: `${SITE_URL}/social/${i.id}/instagram.jpg`,
      pinterest: `${SITE_URL}/social/${i.id}/pinterest.jpg`,
      og: `${SITE_URL}/social/${i.id}/og.jpg`,
    },
    legendas: legendas(i),
  }));
  return new Response(JSON.stringify({ gerado: new Date().toISOString(), itens }, null, 1), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
