// Gera as imagens de compartilhamento do quiz (Open Graph 1200x630) em public/quiz/.
// Com --divulgacao <pasta>, gera também story 1080x1920 e pin 1000x1500 para divulgar.
// Uso: npx tsx scripts/gerar-imagens-quiz.ts [--divulgacao /caminho]
import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { PERFIS, PERFIL_KEYS, type Perfil } from '../src/data/quiz-renda-extra';

const raiz = new URL('..', import.meta.url).pathname;
const logo = `data:image/png;base64,${readFileSync(join(raiz, 'public/logo-branco.png')).toString('base64')}`;
const outDiv = process.argv.includes('--divulgacao') ? process.argv[process.argv.indexOf('--divulgacao') + 1] : '';

const base = `
  *{box-sizing:border-box;margin:0}
  body{font-family:'Noto Sans','DejaVu Sans',system-ui,sans-serif;color:#fff;background:#0a664a;
    background-image:radial-gradient(circle at 85% 15%,rgba(255,255,255,.13),transparent 45%),radial-gradient(circle at 10% 95%,rgba(0,0,0,.25),transparent 50%);}
  .wrap{width:100%;height:100%;display:flex;flex-direction:column;padding:var(--pad)}
  .logo{height:var(--logo);width:auto;align-self:flex-start}
  .eyebrow{font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#bff3dc}
  .pill{display:inline-block;background:#fff;color:#0a664a;font-weight:800;border-radius:999px}
  .emoji{font-family:'Noto Color Emoji';line-height:1}
  h1{font-weight:900;line-height:1.05;letter-spacing:-.01em}
  .card{background:#fff;color:#1a1d23;border-radius:28px;box-shadow:0 20px 50px rgba(0,0,0,.25)}
  .url{font-weight:700;color:#bff3dc}
`;

function ogQuiz() {
  const chips = PERFIL_KEYS.map((k) => `<span class="chip"><span class="emoji">${PERFIS[k].emoji}</span> ${PERFIS[k].nome.replace(' turbinado com IA', '').replace(' que vende mais online', '')}</span>`).join('');
  return `<style>${base}
    .wrap{--pad:56px 64px;--logo:62px}
    h1{font-size:76px;margin:26px 0 22px;max-width:1000px}
    .sub{font-size:30px;color:#e6fff4;margin-bottom:28px}
    .chips{display:flex;flex-wrap:wrap;gap:12px;max-width:1080px}
    .chip{background:rgba(255,255,255,.14);border:2px solid rgba(255,255,255,.35);border-radius:999px;padding:8px 18px;font-size:23px;font-weight:700}
    .foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center}
    .pill{font-size:30px;padding:14px 30px}
  </style><div class="wrap">
    <img class="logo" src="${logo}"><h1>Qual renda extra online combina com você?</h1>
    <p class="sub">7 perguntas · 1 minuto · plano para os próximos 7 dias</p>
    <div class="chips">${chips}</div>
    <div class="foot"><span class="pill">Fazer o quiz grátis →</span><span class="url" style="font-size:28px">rendaonline.org/quiz</span></div>
  </div>`;
}

function ogPerfil(p: Perfil) {
  return `<style>${base}
    .wrap{--pad:48px 60px;--logo:54px}
    .top{display:flex;justify-content:space-between;align-items:center}
    .eyebrow{font-size:24px}
    .card{margin:26px 0 0;padding:34px 40px;display:flex;gap:34px;align-items:center;border-top:14px solid ${p.cor}}
    .emoji{font-size:150px}
    .deu{font-size:26px;font-weight:800;color:#5b6270;text-transform:uppercase;letter-spacing:.06em}
    h1{font-size:${p.nome.length > 28 ? 54 : 66}px;color:${p.cor};margin:6px 0 12px}
    .ch{font-size:27px;line-height:1.3;color:#1a1d23}
    .foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center}
    .q{font-size:32px;font-weight:800}
    .pill{font-size:28px;padding:12px 28px}
  </style><div class="wrap">
    <div class="top"><img class="logo" src="${logo}"><span class="eyebrow">Quiz de renda extra</span></div>
    <div class="card"><span class="emoji">${p.emoji}</span><div><p class="deu">Meu resultado</p><h1>${p.nome}</h1><p class="ch">${p.chamada}</p></div></div>
    <div class="foot"><span class="q">E você, qual combina com você?</span><span class="pill">Faça o quiz →</span></div>
  </div>`;
}

function story() {
  const lista = PERFIL_KEYS.map((k) => `<li><span class="emoji">${PERFIS[k].emoji}</span>${PERFIS[k].nome}</li>`).join('');
  return `<style>${base}
    .wrap{--pad:110px 80px 100px;--logo:90px;align-items:center;text-align:center}
    .logo{align-self:center}
    .eyebrow{font-size:34px;margin-top:56px}
    h1{font-size:100px;margin:20px 0 30px}
    .sub{font-size:38px;color:#e6fff4;margin-bottom:44px}
    ul{list-style:none;padding:0;display:grid;gap:18px;width:100%}
    li{background:rgba(255,255,255,.13);border:2px solid rgba(255,255,255,.3);border-radius:24px;padding:18px 30px;font-size:38px;font-weight:700;text-align:left;display:flex;gap:22px;align-items:center}
    li .emoji{font-size:52px}
    .pill{font-size:46px;padding:28px 56px;margin-top:auto;padding-top:28px}
    ul{margin-bottom:50px}
    .url{font-size:40px;margin-top:26px}
  </style><div class="wrap">
    <img class="logo" src="${logo}"><p class="eyebrow">Quiz grátis · 1 minuto</p>
    <h1>Qual renda extra online combina com você?</h1>
    <p class="sub">Descubra entre 6 caminhos o certo para o seu tempo e suas habilidades</p>
    <ul>${lista}</ul>
    <span class="pill">Faça o quiz agora 👆</span><p class="url">rendaonline.org/quiz</p>
  </div>`;
}

function pin() {
  return `<style>${base}
    .wrap{--pad:90px 70px 80px;--logo:72px;align-items:center;text-align:center}
    .logo{align-self:center}
    .emoji.big{font-size:180px;margin:60px 0 10px}
    h1{font-size:96px;margin:20px 0 30px}
    .sub{font-size:38px;color:#e6fff4}
    .pill{font-size:42px;padding:24px 50px;margin-top:auto}
    .url{font-size:34px;margin-top:22px}
    .row{display:flex;gap:26px;justify-content:center;margin:60px 0 26px}.row .emoji{font-size:84px}
  </style><div class="wrap">
    <img class="logo" src="${logo}"><span class="emoji big">🧭</span>
    <h1>Qual renda extra online combina com você?</h1>
    <p class="sub">Quiz grátis de 7 perguntas com um plano para os próximos 7 dias</p>
    <p class="row">${PERFIL_KEYS.map((k) => `<span class="emoji">${PERFIS[k].emoji}</span>`).join('')}</p>
    <p class="sub">6 caminhos: treinar IA, freela, conteúdo, sites e automação, apps e negócio próprio</p>
    <span class="pill">Fazer o quiz</span><p class="url">rendaonline.org</p>
  </div>`;
}

// Playwright não é dependência do site; usa o instalado na máquina.
const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch();
async function shot(html: string, w: number, h: number, file: string) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"></head><body style="width:${w}px;height:${h}px">${html}</body></html>`);
  await page.waitForTimeout(150);
  await page.screenshot({ path: file, type: 'png' });
  await page.close();
  console.log('ok', file);
}

const outOg = join(raiz, 'public/quiz');
mkdirSync(outOg, { recursive: true });
await shot(ogQuiz(), 1200, 630, join(outOg, 'og-quiz.png'));
for (const k of PERFIL_KEYS) await shot(ogPerfil(PERFIS[k]), 1200, 630, join(outOg, `og-${k}.png`));
if (outDiv) {
  mkdirSync(outDiv, { recursive: true });
  await shot(story(), 1080, 1920, join(outDiv, 'quiz-story-whatsapp-instagram.png'));
  await shot(pin(), 1000, 1500, join(outDiv, 'quiz-pinterest.png'));
  await shot(ogQuiz(), 1200, 630, join(outDiv, 'quiz-post-facebook.png'));
}
await browser.close();
