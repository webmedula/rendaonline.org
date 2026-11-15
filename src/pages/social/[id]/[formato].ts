import type { APIRoute, GetStaticPaths } from 'astro';
import { FORMATOS, getSocialItems, type Formato, type SocialItem } from '../../../lib/social';
import { renderSocialImage } from '../../../lib/social-image';

export const getStaticPaths: GetStaticPaths = async () => {
  const itens = await getSocialItems();
  return itens.flatMap((item) =>
    (Object.keys(FORMATOS) as Formato[]).map((f) => ({ params: { id: item.id, formato: `${f}.jpg` }, props: { item, f } }))
  );
};

export const GET: APIRoute = async ({ props }) => {
  const { item, f } = props as { item: SocialItem; f: Formato };
  const buf = await renderSocialImage(item, f);
  return new Response(new Uint8Array(buf), { headers: { 'Content-Type': 'image/jpeg' } });
};
