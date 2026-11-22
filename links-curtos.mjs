// Links curtos usados nas artes de divulgação (o que a pessoa digita depois de ver a imagem).
// Cada um leva para a página com UTM, para o contador de visitas separar por campanha.
// Kit de artes: /mnt/project-files/divulgacao/kit-2026-11/ (projeto) — campanhas com o mesmo nome.
const utm = (campanha) => `?utm_source=link-curto&utm_medium=imagem&utm_campaign=${campanha}`;

export const LINKS_CURTOS = {
  '/13/': ['/ferramentas/calculadora-decimo-terceiro/', '13-salario'],
  '/salario/': ['/ferramentas/calculadora-salario-liquido/', 'ir-5-mil'],
  '/rescisao/': ['/ferramentas/calculadora-rescisao/', 'rescisao'],
  '/dolar/': ['/trabalho-online/', 'trabalho-dolar'],
  '/prompts/': ['/50-prompts-ia/', '50-prompts'],
  '/curriculo/': ['/como-fazer-curriculo-pelo-celular/', 'curriculo'],
  '/divida/': ['/ferramentas/calculadora-juros-divida/', 'juros-divida'],
};

export const linksCurtos = Object.fromEntries(
  Object.entries(LINKS_CURTOS).map(([de, [para, campanha]]) => [de, para + utm(campanha)]),
);
