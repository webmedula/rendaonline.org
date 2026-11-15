#!/usr/bin/env node
// Robô de postagem do Renda Online no Facebook e no Instagram (API oficial da Meta).
// Roda no GitHub Actions (.github/workflows/redes-sociais.yml). Sem segredo configurado, só mostra o que postaria.
//
// Variáveis:
//   META_PAGE_TOKEN  token de acesso da Página do Facebook (segredo). Página e Instagram são descobertos por ele.
//   MODO             "publicar" (padrão) ou "teste" (não posta nada, só mostra)
//   PLATAFORMAS      "facebook,instagram" (padrão)
//   ITEM             id de um item específico para postar agora (opcional)
//   FILA_URL         padrão https://rendaonline.org/social/fila.json
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';

const GRAPH = `https://graph.facebook.com/${process.env.META_GRAPH_VERSION || 'v23.0'}`;
const TOKEN = (process.env.META_PAGE_TOKEN || '').trim();
const MODO = process.env.MODO === 'teste' ? 'teste' : 'publicar';
const PLATAFORMAS = (process.env.PLATAFORMAS || 'facebook,instagram').split(',').map((s) => s.trim()).filter(Boolean);
const ITEM = (process.env.ITEM || '').trim();
const FILA_URL = process.env.FILA_URL || 'https://rendaonline.org/social/fila.json';
const ESTADO = process.env.ESTADO || 'social/publicados.json';
const DIA = 86400000;
const NOVO_ATE = 4 * DIA; // artigo publicado há menos de 4 dias fura a fila
const REPETIR_APOS = 30 * DIA; // conteúdo antigo volta a circular depois de 30 dias
// Artigos de antes da estreia do robô entram na fila normal (senão os 16 primeiros passariam na frente de tudo).
const ESTREIA = Date.parse('2026-11-15T00:00:00Z');

const resumo = [];
const log = (s = '') => { console.log(s); resumo.push(s); };

async function graph(path, params = {}, method = 'GET') {
  const body = new URLSearchParams({ ...params, access_token: TOKEN });
  const url = method === 'GET' ? `${GRAPH}/${path}?${body}` : `${GRAPH}/${path}`;
  const r = await fetch(url, method === 'GET' ? {} : { method, body });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) {
    const e = j.error || {};
    const dica = e.code === 190 ? ' (token inválido ou expirado: gere outro e atualize o segredo META_PAGE_TOKEN)' : e.code === 10 || e.code === 200 ? ' (falta permissão no token)' : '';
    throw new Error(`${e.message || r.status}${dica}`);
  }
  return j;
}

function escolher(itens, feitos, agora) {
  if (ITEM) return itens.find((i) => i.id === ITEM);
  const novos = itens
    .filter((i) => i.tipo === 'artigo' && !feitos[i.id] && Date.parse(i.data) >= ESTREIA && agora - Date.parse(i.data) < NOVO_ATE)
    .sort((a, b) => b.data.localeCompare(a.data));
  if (novos.length) return novos[0];
  const nunca = itens.filter((i) => !feitos[i.id]).sort((a, b) => a.prioridade - b.prioridade || b.data.localeCompare(a.data));
  if (nunca.length) return nunca[0];
  const antigos = itens
    .filter((i) => i.repetir && agora - Date.parse(feitos[i.id]) > REPETIR_APOS)
    .sort((a, b) => Date.parse(feitos[a.id]) - Date.parse(feitos[b.id]));
  return antigos[0];
}

async function imagemNoAr(url) {
  const r = await fetch(url, { method: 'HEAD' });
  return r.ok && (r.headers.get('content-type') || '').includes('image/jpeg');
}

async function postarFacebook(pageId, item) {
  const r = await graph(`${pageId}/photos`, { url: item.imagens.instagram, message: item.legendas.facebook }, 'POST');
  return r.post_id || r.id;
}

async function postarInstagram(igId, item) {
  const c = await graph(`${igId}/media`, { image_url: item.imagens.instagram, caption: item.legendas.instagram }, 'POST');
  for (let t = 0; t < 20; t++) {
    const s = await graph(c.id, { fields: 'status_code' });
    if (s.status_code === 'FINISHED') break;
    if (s.status_code === 'ERROR') throw new Error('o Instagram recusou a imagem');
    await new Promise((ok) => setTimeout(ok, 3000));
  }
  const p = await graph(`${igId}/media_publish`, { creation_id: c.id }, 'POST');
  return p.id;
}

async function main() {
  const estado = JSON.parse(readFileSync(ESTADO, 'utf8'));
  const fila = await (await fetch(`${FILA_URL}?t=${Date.now()}`)).json();
  const itens = fila.itens;
  const agora = Date.now();
  log(`## Redes sociais (${MODO})`);
  log(`Fila: ${itens.length} itens no site.`);

  let pageId, igId;
  if (!TOKEN) {
    log('');
    log('⚠️ Segredo META_PAGE_TOKEN ainda não configurado: nada foi postado. Abaixo, o que seria postado.');
  } else {
    const me = await graph('me', { fields: 'id,name,instagram_business_account{id,username}' });
    pageId = me.id;
    igId = me.instagram_business_account?.id;
    log(`Página: ${me.name} (${pageId}). Instagram: ${igId ? '@' + me.instagram_business_account.username : 'não ligado à Página'}.`);
  }

  let falhas = 0;
  for (const plat of PLATAFORMAS) {
    estado[plat] ??= {};
    const item = escolher(itens, estado[plat], agora);
    log('');
    log(`### ${plat}`);
    if (!item) { log('Nada para postar agora.'); continue; }
    log(`Escolhido: **${item.titulo}** (${item.id})`);
    log('```');
    log(item.legendas[plat] ?? item.legendas.facebook);
    log('```');
    log(`Imagem: ${item.imagens.instagram}`);
    if (!TOKEN || MODO === 'teste') continue;
    if (plat === 'instagram' && !igId) { log('Pulado: o Instagram não está ligado à Página do Facebook.'); continue; }
    try {
      if (!(await imagemNoAr(item.imagens.instagram))) throw new Error('a imagem ainda não está no ar (deploy pendente?)');
      const id = plat === 'facebook' ? await postarFacebook(pageId, item) : await postarInstagram(igId, item);
      estado[plat][item.id] = new Date().toISOString();
      log(`✅ Publicado (id ${id}).`);
    } catch (e) {
      falhas++;
      log(`❌ Falhou: ${e.message}`);
      console.log(`::error::${plat}: ${e.message}`);
    }
  }

  writeFileSync(ESTADO, JSON.stringify(estado, null, 2) + '\n');
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, resumo.join('\n') + '\n');
  if (falhas) process.exit(1);
}

main().catch((e) => {
  console.log(`::error::${e.message}`);
  process.exit(1);
});
