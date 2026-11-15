// Gera as imagens dos posts (JPEG) no build, com satori (layout → SVG) e sharp (SVG → JPEG).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { FORMATOS, type Formato, type SocialItem } from './social';

const root = process.cwd();
const fonte = (peso: number) =>
  readFileSync(join(root, `node_modules/@fontsource/montserrat/files/montserrat-latin-${peso}-normal.woff`));
const FONTES = [
  { name: 'Montserrat', data: fonte(600), weight: 600 as const, style: 'normal' as const },
  { name: 'Montserrat', data: fonte(800), weight: 800 as const, style: 'normal' as const },
];
const LOGO = `data:image/png;base64,${readFileSync(join(root, 'public/logo-branco.png')).toString('base64')}`;

const VERDE = '#0a664a';
const VERDE_ESCURO = '#063d2c';
const VERDE_CLARO = '#3ccf96';
const TEXTO_CLARO = '#d4f3e5';

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

function cortar(s: string, max: number) {
  if (s.length <= max) return s;
  const c = s.slice(0, max);
  return c.slice(0, c.lastIndexOf(' ')).replace(/[,.;:\s]+$/, '') + '…';
}

function tamanhoTitulo(titulo: string, f: Formato) {
  const n = titulo.length;
  const base = f === 'og' ? [72, 64, 56, 48] : f === 'pinterest' ? [100, 88, 76, 66] : [100, 86, 74, 64];
  if (n <= 28) return base[0];
  if (n <= 45) return base[1];
  if (n <= 65) return base[2];
  return base[3];
}

function layout(i: SocialItem, f: Formato): Node {
  const { width, height } = FORMATOS[f];
  const og = f === 'og';
  const pad = og ? 64 : 84;
  const titulo = cortar(i.titulo, og ? 80 : 95);
  const inner = width - pad * 2;
  const sub = cortar(i.subtitulo, og ? 110 : f === 'pinterest' ? 170 : 140);

  const selo = h(
    'div',
    {
      display: 'flex',
      alignSelf: 'flex-start',
      background: 'rgba(255,255,255,0.14)',
      border: '2px solid rgba(255,255,255,0.35)',
      color: '#fff',
      fontSize: og ? 24 : 30,
      fontWeight: 800,
      letterSpacing: 2,
      textTransform: 'uppercase',
      padding: og ? '10px 22px' : '14px 28px',
      borderRadius: 999,
    },
    i.selo
  );

  const tituloEl = h(
    'div',
    { display: 'flex', width: inner, color: '#fff', fontSize: tamanhoTitulo(titulo, f), fontWeight: 800, lineHeight: 1.08, letterSpacing: -1 },
    titulo
  );
  const subEl = sub
    ? h('div', { display: 'flex', width: inner, color: TEXTO_CLARO, fontSize: og ? 30 : 40, fontWeight: 600, lineHeight: 1.3, marginTop: og ? 18 : 36 }, sub)
    : null;

  const botao = h(
    'div',
    {
      display: 'flex',
      alignSelf: 'flex-start',
      background: VERDE_CLARO,
      color: '#0b2a1f',
      fontSize: og ? 26 : 38,
      fontWeight: 800,
      padding: og ? '14px 28px' : '22px 40px',
      borderRadius: 16,
    },
    `${i.cta} »`
  );

  const rodape = h(
    'div',
    { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: inner },
    [
      h('img', { width: og ? 200 : 260, height: og ? 63 : 82 }, undefined, { src: LOGO }),
      h('div', { display: 'flex', color: TEXTO_CLARO, fontSize: og ? 24 : 32, fontWeight: 600 }, '@rendaonlineorg'),
    ]
  );

  const decor = [
    h('div', { position: 'absolute', top: -height * 0.18, right: -width * 0.28, width: width * 0.8, height: width * 0.8, borderRadius: 9999, background: 'rgba(60,207,150,0.13)' }),
    h('div', { position: 'absolute', bottom: -width * 0.25, left: -width * 0.2, width: width * 0.6, height: width * 0.6, borderRadius: 9999, background: 'rgba(0,0,0,0.12)' }),
  ];

  return h(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      // o satori soma o padding à largura (content-box), então desconta aqui
      width: width - pad * 2,
      height: height - pad * 2,
      padding: pad,
      backgroundImage: `linear-gradient(160deg, ${VERDE} 0%, ${VERDE_ESCURO} 100%)`,
      fontFamily: 'Montserrat',
      position: 'relative',
    },
    [
      ...decor,
      selo,
      h('div', { display: 'flex', flexDirection: 'column', width: inner }, [tituloEl, subEl].filter(Boolean)),
      h('div', { display: 'flex', flexDirection: 'column', width: inner, gap: og ? 28 : 56 }, og ? [rodape] : [botao, rodape]),
    ]
  );
}

const memo = new Map<string, Promise<Buffer>>();

export function renderSocialImage(i: SocialItem, f: Formato): Promise<Buffer> {
  const key = `${i.id}/${f}`;
  let p = memo.get(key);
  if (!p) {
    p = (async () => {
      const { width, height } = FORMATOS[f];
      const svg = await satori(layout(i, f) as any, { width, height, fonts: FONTES });
      return sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
    })();
    memo.set(key, p);
  }
  return p;
}
