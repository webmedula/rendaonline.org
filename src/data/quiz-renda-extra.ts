// Quiz "Qual renda extra online combina com você?" (/quiz-renda-extra/).
// Perguntas, perfis e pontuação ficam aqui. A página do quiz e as páginas de resultado
// (/quiz-renda-extra/resultado/<perfil>/) leem deste arquivo.

export const QUIZ_PATH = '/quiz-renda-extra/';

export type PerfilKey = 'treinar-ia' | 'freelancer' | 'criador' | 'automacao' | 'trocados' | 'negocio';

export interface Link {
  texto: string;
  href: string;
  nota?: string;
}

export interface Perfil {
  key: PerfilKey;
  emoji: string;
  nome: string;
  /** Frase curta que aparece na imagem de compartilhamento e no topo do resultado. */
  chamada: string;
  resumo: string;
  porque: string[];
  /** Quanto e quando, sem promessa. */
  ganhos: string;
  prazo: string;
  /** Plano dos primeiros 7 dias. */
  passos: string[];
  links: Link[];
  /** Chamada final (serviço, mentoria ou diagnóstico). */
  cta?: { titulo: string; texto: string; botao: string; href: string };
  cor: string;
}

export const PERFIS: Record<PerfilKey, Perfil> = {
  'treinar-ia': {
    key: 'treinar-ia',
    emoji: '🤖',
    nome: 'Treinador de IA',
    chamada: 'Você ganha em dólar ensinando a inteligência artificial a responder melhor.',
    resumo:
      'Empresas como as donas do ChatGPT e do Gemini pagam pessoas para avaliar e corrigir respostas de IA. Você escolhe as tarefas, trabalha de casa no computador e recebe em dólar por PayPal ou Payoneer.',
    porque: [
      'Você tem atenção a detalhes e escreve bem, que é o que essas plataformas mais testam.',
      'Não precisa investir nada nem ter clientes: a plataforma manda as tarefas.',
      'Dá para encaixar nas horas livres, sem horário fixo.',
    ],
    ganhos: 'De US$ 5 a US$ 25 por hora, conforme a plataforma e o projeto. Projetos vêm em ondas, então não conte com isso como salário fixo.',
    prazo: 'Aprovação leva de alguns dias a algumas semanas. O primeiro pagamento costuma sair no primeiro mês de tarefas.',
    passos: [
      'Dia 1: leia as avaliações da Outlier e da OneForma e escolha duas para se cadastrar.',
      'Dia 2: monte um currículo simples em português e inglês destacando escrita, revisão e sua formação.',
      'Dias 3 e 4: faça os testes de entrada com calma. Eles são eliminatórios e não dá para refazer.',
      'Dia 5: crie sua conta no PayPal ou Payoneer para receber em dólar.',
      'Dias 6 e 7: enquanto espera a aprovação, cadastre-se em uma terceira plataforma (CrowdGen ou Clickworker) para não depender de uma só.',
    ],
    links: [
      { texto: 'Outlier é confiável? Quanto paga em português', href: '/trabalho-online/outlier/' },
      { texto: 'OneForma: projetos em português', href: '/trabalho-online/oneforma/' },
      { texto: 'Appen (CrowdGen): como trabalhar', href: '/trabalho-online/appen/' },
      { texto: 'Mindrift: freelas de IA para especialistas', href: '/trabalho-online/mindrift/' },
      { texto: 'Todas as plataformas avaliadas', href: '/trabalho-online/' },
    ],
    cor: '#2563eb',
  },
  freelancer: {
    key: 'freelancer',
    emoji: '💼',
    nome: 'Freelancer turbinado com IA',
    chamada: 'Você ganha vendendo o que já sabe fazer, entregando em metade do tempo com IA.',
    resumo:
      'Texto, design, tradução, edição de vídeo, planilhas, atendimento: tem empresa pagando por isso todo dia em sites de freela. Com IA você entrega mais rápido, cobra por projeto e decide quanto vale a sua hora.',
    porque: [
      'Você tem uma habilidade que dá para vender por projeto.',
      'Freela é o caminho com maior teto de ganho entre as rendas online comuns.',
      'A IA corta o tempo de entrega, o que aumenta o seu ganho por hora.',
    ],
    ganhos: 'Os primeiros projetos costumam sair entre R$ 100 e R$ 500. Com avaliações boas, R$ 2 mil a R$ 5 mil por mês é um patamar comum para quem se dedica meio período.',
    prazo: 'O primeiro projeto costuma vir entre 2 e 6 semanas, depois de muitas propostas enviadas. Depois das primeiras avaliações fica bem mais fácil.',
    passos: [
      'Dia 1: escolha UM serviço para vender (exemplo: "artigos para blog" ou "posts para Instagram"), não cinco.',
      'Dia 2: calcule seu preço mínimo na calculadora de valor da hora para não trabalhar no prejuízo.',
      'Dia 3: crie perfil na Workana e no 99Freelas com 3 exemplos de trabalho (pode fazer exemplos para empresas fictícias).',
      'Dias 4 a 6: mande de 5 a 10 propostas por dia, curtas e específicas para cada projeto.',
      'Dia 7: monte seus modelos de prompt para entregar mais rápido. Os 50 prompts grátis ajudam aqui.',
    ],
    links: [
      { texto: 'Calculadora: quanto cobrar por hora como freelancer', href: '/ferramentas/quanto-cobrar-por-hora-freelancer/' },
      { texto: 'Workana: como conseguir os primeiros freelas', href: '/trabalho-online/workana/' },
      { texto: '99Freelas: taxas e como conseguir projetos', href: '/trabalho-online/99freelas/' },
      { texto: 'Como usar IA para criar textos, imagens e vídeos', href: '/guia-ia-para-criar-textos-imagens-e-videos/' },
      { texto: 'Calculadora do DAS MEI 2026', href: '/ferramentas/calculadora-das-mei/' },
    ],
    cor: '#7c3aed',
  },
  criador: {
    key: 'criador',
    emoji: '🎬',
    nome: 'Criador de conteúdo com IA',
    chamada: 'Você constrói um canal ou blog que vai rendendo com anúncios e indicações.',
    resumo:
      'Blog, YouTube, TikTok ou Instagram sobre um assunto que você domina, com a IA ajudando a escrever roteiros, criar imagens e editar vídeos. O dinheiro vem de anúncios, links de afiliado e produtos próprios.',
    porque: [
      'Você gosta de criar e topa construir algo que cresce com o tempo.',
      'É o caminho em que o trabalho de hoje continua rendendo nos próximos meses.',
      'A IA tirou a maior barreira, que era produzir muito conteúdo sozinho.',
    ],
    ganhos: 'Nos primeiros meses quase nada. Um blog ou canal consistente costuma passar dos R$ 500 a R$ 2 mil por mês entre o 6º e o 12º mês, e daí para cima.',
    prazo: 'Pense em 6 a 12 meses. É o caminho mais lento para o primeiro real, e o que mais compensa para quem tem paciência.',
    passos: [
      'Dia 1: escolha um assunto que você aguenta falar por um ano e que as pessoas pesquisam (teste no Google e no YouTube).',
      'Dia 2: liste 30 ideias de posts ou vídeos com ajuda da IA.',
      'Dia 3: crie o canal ou o blog. Para blog, siga o guia de como criar do zero.',
      'Dias 4 a 6: produza e publique os 3 primeiros conteúdos usando as ferramentas de IA gratuitas.',
      'Dia 7: defina sua meta de frequência (exemplo: 3 vídeos por semana) e bloqueie esse tempo na agenda.',
    ],
    links: [
      { texto: 'Como criar um blog do zero e monetizar', href: '/como-criar-um-blog-do-zero/' },
      { texto: 'Como usar IA para criar textos, imagens e vídeos', href: '/guia-ia-para-criar-textos-imagens-e-videos/' },
      { texto: 'Como criar vídeos com IA de graça no Gemini', href: '/como-criar-videos-com-ia-gratis-gemini/' },
      { texto: 'Melhores ferramentas de IA gratuitas', href: '/melhores-ferramentas-de-ia-gratuitas/' },
      { texto: 'ChatGPT, Claude ou Gemini: qual usar', href: '/chatgpt-vs-claude-vs-gemini-qual-usar/' },
    ],
    cor: '#db2777',
  },
  automacao: {
    key: 'automacao',
    emoji: '⚙️',
    nome: 'Criador de sites e automações',
    chamada: 'Você ganha bem resolvendo problemas de pequenas empresas com sites, IA e automação.',
    resumo:
      'Clínicas, lojas, restaurantes e prestadores de serviço precisam de site, atendimento no WhatsApp com IA e tarefas automáticas, e quase nenhum sabe fazer. Com ferramentas como n8n e Claude Code dá para entregar isso sem ser programador.',
    porque: [
      'Você gosta de tecnologia e de resolver problema, que é exatamente o que esse cliente compra.',
      'É o caminho com o maior valor por cliente: um projeto costuma valer de R$ 800 a R$ 3 mil.',
      'Dá para vender manutenção mensal e ter renda recorrente.',
    ],
    ganhos: 'Um ou dois clientes por mês já somam R$ 1.500 a R$ 5 mil. A manutenção mensal (R$ 100 a R$ 300 por cliente) vai acumulando.',
    prazo: 'De 1 a 3 meses para aprender o básico e fechar o primeiro cliente, mais rápido se você já conhece alguém com negócio.',
    passos: [
      'Dia 1: leia o guia de automação sem programar e escolha uma ferramenta (n8n é a que mais usamos).',
      'Dia 2: instale o n8n e faça uma automação simples para você mesmo.',
      'Dias 3 e 4: monte uma demonstração para um tipo de negócio, como confirmação de consulta no WhatsApp.',
      'Dia 5: veja quanto custa um site e um chatbot para definir seus preços.',
      'Dias 6 e 7: ofereça para 3 negócios que você conhece, com um preço de lançamento em troca de depoimento.',
    ],
    links: [
      { texto: 'Como automatizar tarefas com IA sem programar', href: '/como-automatizar-tarefas-com-ia-sem-programar/' },
      { texto: 'Como instalar o n8n numa VPS', href: '/como-instalar-n8n-vps-hostinger/' },
      { texto: 'Claude Code: o que é e como usar', href: '/claude-code-o-que-e-e-como-usar/' },
      { texto: 'Quanto custa um site profissional (para definir seu preço)', href: '/quanto-custa-um-site-profissional/' },
      { texto: 'Chatbot de WhatsApp com IA: como funciona e quanto custa', href: '/chatbot-whatsapp-com-ia-para-empresas-quanto-custa/' },
    ],
    cta: {
      titulo: 'Quer chegar ao primeiro cliente com acompanhamento?',
      texto: 'Na mentoria você monta sua oferta, sua tabela de preços e seu primeiro projeto com quem faz isso todo dia na WebMedula.',
      botao: 'Ver a mentoria',
      href: '/mentoria/',
    },
    cor: '#0a664a',
  },
  trocados: {
    key: 'trocados',
    emoji: '📱',
    nome: 'Renda de bolso',
    chamada: 'Você junta um dinheiro extra no celular, nos minutos livres do dia.',
    resumo:
      'Pesquisas pagas, testes de sites e microtarefas não pedem experiência nem investimento e cabem na fila do banco. Paga pouco, mas é dinheiro de verdade, e é um bom primeiro passo enquanto você monta algo maior.',
    porque: [
      'Você tem pouco tempo ou só o celular agora.',
      'Começa hoje: o cadastro leva minutos e não tem teste difícil.',
      'Serve de ponte enquanto você aprende uma habilidade que paga mais.',
    ],
    ganhos: 'De R$ 30 a R$ 200 por mês somando dois ou três apps. Testes de sites pagam melhor (cerca de US$ 4 a US$ 10 por teste), mas aparecem menos.',
    prazo: 'O primeiro saque costuma sair entre 1 e 4 semanas, conforme o valor mínimo de cada app.',
    passos: [
      'Dia 1: instale o MeSeems e complete o perfil inteiro (perfil completo recebe mais pesquisas).',
      'Dia 2: cadastre-se no ySense e no Userfeel.',
      'Dia 3: crie um e-mail só para essas plataformas, para não lotar o seu.',
      'Dias 4 a 6: reserve 15 minutos por dia, de preferência sempre no mesmo horário.',
      'Dia 7: veja quanto juntou e escolha uma habilidade para aprender, porque é ela que vai multiplicar sua renda.',
    ],
    links: [
      { texto: 'MeSeems: app brasileiro de pesquisas pagas', href: '/trabalho-online/meseems/' },
      { texto: 'ySense: pesquisas pagas em dólar', href: '/trabalho-online/ysense/' },
      { texto: 'Userfeel: ganhe testando sites', href: '/trabalho-online/userfeel/' },
      { texto: 'Clickworker: microtarefas', href: '/trabalho-online/clickworker/' },
      { texto: 'Todas as plataformas avaliadas', href: '/trabalho-online/' },
    ],
    cor: '#ea580c',
  },
  negocio: {
    key: 'negocio',
    emoji: '🏪',
    nome: 'Dono de negócio que vende mais online',
    chamada: 'Sua renda extra está dentro do seu próprio negócio: vender mais e perder menos tempo.',
    resumo:
      'Para quem já tem loja, consultório, restaurante ou serviço, o dinheiro mais rápido não está em outro trabalho. Está em atender o cliente na hora pelo WhatsApp, ter um site que gera pedido e tirar a equipe de tarefas repetitivas.',
    porque: [
      'Você já tem clientes e produto, então cada venda a mais custa pouco.',
      'Atendimento lento no WhatsApp é a causa mais comum de venda perdida em pequenos negócios.',
      'Automação devolve horas da semana que hoje vão para digitar, responder e cobrar.',
    ],
    ganhos: 'Depende do negócio. O diagnóstico grátis calcula quanto você perde por mês com atendimento lento e trabalho manual, usando os seus números.',
    prazo: 'Muita coisa dá para colocar no ar em 1 a 4 semanas.',
    passos: [
      'Dia 1: faça o diagnóstico grátis de automação (2 minutos) e veja quanto sua empresa perde por mês.',
      'Dia 2: meça quanto tempo seus clientes esperam pela primeira resposta no WhatsApp.',
      'Dia 3: liste as 10 perguntas que mais chegam. Elas são a base de um atendimento automático.',
      'Dia 4: confira se seu negócio aparece no Google Maps com fotos, horário e WhatsApp.',
      'Dias 5 a 7: escolha uma coisa para automatizar primeiro, a que mais faz você perder venda.',
    ],
    links: [
      { texto: 'Diagnóstico grátis: quanto sua empresa perde sem automação', href: '/diagnostico-automacao/' },
      { texto: 'Chatbot de WhatsApp com IA: como funciona e quanto custa', href: '/chatbot-whatsapp-com-ia-para-empresas-quanto-custa/' },
      { texto: 'Delivery próprio sem comissão do iFood', href: '/delivery-sem-comissao/' },
      { texto: 'Quanto custa um site profissional', href: '/quanto-custa-um-site-profissional/' },
      { texto: 'Serviços com preço fechado', href: '/servicos/' },
    ],
    cta: {
      titulo: 'Descubra quanto seu negócio está perdendo',
      texto: 'Responda 10 perguntas rápidas e veja, com os seus números, quanto custa o atendimento lento e o trabalho manual, e o que resolver primeiro.',
      botao: 'Fazer o diagnóstico grátis',
      href: '/diagnostico-automacao/',
    },
    cor: '#b45309',
  },
};

export const PERFIL_KEYS = Object.keys(PERFIS) as PerfilKey[];

type Pontos = Partial<Record<PerfilKey, number>>;

export interface Opcao {
  v: string;
  label: string;
  pontos: Pontos;
}

export interface Pergunta {
  id: string;
  titulo: string;
  dica?: string;
  opcoes: Opcao[];
}

export const PERGUNTAS: Pergunta[] = [
  {
    id: 'situacao',
    titulo: 'Qual é a sua situação hoje?',
    opcoes: [
      { v: 'clt', label: 'Trabalho com carteira e quero um extra', pontos: { 'treinar-ia': 2, criador: 2, freelancer: 1, trocados: 1, automacao: 1 } },
      { v: 'sem-renda', label: 'Estou sem trabalho e preciso de renda', pontos: { freelancer: 3, 'treinar-ia': 2, trocados: 2, automacao: 1 } },
      { v: 'estudante', label: 'Sou estudante', pontos: { 'treinar-ia': 2, criador: 2, trocados: 2, freelancer: 1 } },
      { v: 'autonomo', label: 'Sou autônomo ou freelancer', pontos: { freelancer: 3, automacao: 2, criador: 1 } },
      { v: 'negocio', label: 'Tenho um negócio, loja ou consultório', pontos: { negocio: 11 } },
      { v: 'casa', label: 'Fico em casa (cuido da família, aposentado)', pontos: { trocados: 2, 'treinar-ia': 2, criador: 1, freelancer: 1 } },
    ],
  },
  {
    id: 'tempo',
    titulo: 'Quanto tempo por semana você consegue dedicar?',
    opcoes: [
      { v: 'pouco', label: 'Menos de 3 horas', pontos: { trocados: 4, negocio: 1 } },
      { v: 'medio', label: 'De 3 a 10 horas', pontos: { 'treinar-ia': 3, criador: 2, freelancer: 1, trocados: 1 } },
      { v: 'bom', label: 'De 10 a 20 horas', pontos: { freelancer: 3, automacao: 2, criador: 2, 'treinar-ia': 2 } },
      { v: 'muito', label: 'Mais de 20 horas', pontos: { freelancer: 3, automacao: 4, criador: 2, 'treinar-ia': 1 } },
    ],
  },
  {
    id: 'urgencia',
    titulo: 'Para quando você precisa do primeiro dinheiro?',
    opcoes: [
      { v: 'ja', label: 'Para ontem, o quanto antes', pontos: { trocados: 3, freelancer: 2, 'treinar-ia': 1 } },
      { v: 'mes', label: 'Dentro de um mês', pontos: { 'treinar-ia': 3, freelancer: 2, automacao: 1 } },
      { v: 'trimestre', label: 'Em 2 ou 3 meses está bom', pontos: { automacao: 3, freelancer: 2, criador: 1 } },
      { v: 'longo', label: 'Quero construir algo que cresça com o tempo', pontos: { criador: 4, automacao: 2 } },
    ],
  },
  {
    id: 'habilidade',
    titulo: 'O que você faz melhor ou mais gosta de fazer?',
    opcoes: [
      { v: 'escrever', label: 'Escrever, revisar e pesquisar', pontos: { 'treinar-ia': 3, freelancer: 2, criador: 2 } },
      { v: 'tecnologia', label: 'Mexer com computador e tecnologia', pontos: { automacao: 6, freelancer: 1 } },
      { v: 'criar', label: 'Criar vídeos, fotos, design ou posts', pontos: { criador: 4, freelancer: 2 } },
      { v: 'conversar', label: 'Conversar, vender e convencer', pontos: { automacao: 3, freelancer: 2, criador: 2, negocio: 1 } },
      { v: 'detalhes', label: 'Seguir instruções com atenção aos detalhes', pontos: { 'treinar-ia': 4, trocados: 1 } },
      { v: 'nao-sei', label: 'Ainda não sei', pontos: { trocados: 3, 'treinar-ia': 1 } },
    ],
  },
  {
    id: 'equipamento',
    titulo: 'Onde você vai trabalhar?',
    opcoes: [
      { v: 'celular', label: 'Só no celular', pontos: { trocados: 4, criador: 1 } },
      { v: 'computador', label: 'Tenho computador ou notebook', pontos: { 'treinar-ia': 2, freelancer: 2, automacao: 2, criador: 1 } },
    ],
  },
  {
    id: 'ingles',
    titulo: 'Como está o seu inglês?',
    dica: 'Não precisa de inglês para nenhum dos caminhos. Ele só abre mais portas em alguns.',
    opcoes: [
      { v: 'nada', label: 'Não sei inglês', pontos: { freelancer: 1, criador: 1, trocados: 1 } },
      { v: 'basico', label: 'Básico, leio com tradutor', pontos: { automacao: 1, freelancer: 1 } },
      { v: 'bom', label: 'Intermediário ou fluente', pontos: { 'treinar-ia': 3, freelancer: 1 } },
    ],
  },
  {
    id: 'objetivo',
    titulo: 'O que mais te atrai?',
    opcoes: [
      { v: 'tarefas', label: 'Pegar tarefas e receber, sem cliente nem chefe', pontos: { 'treinar-ia': 3, trocados: 2 } },
      { v: 'clientes', label: 'Ter meus clientes e cobrar bem pelo meu trabalho', pontos: { freelancer: 3, automacao: 4 } },
      { v: 'passiva', label: 'Algo que continue rendendo depois de pronto', pontos: { criador: 4 } },
      { v: 'vender-mais', label: 'Fazer meu negócio vender mais', pontos: { negocio: 6 } },
    ],
  },
];

/** Ordem de desempate: caminhos com retorno mais provável primeiro. */
const DESEMPATE: PerfilKey[] = ['negocio', 'freelancer', 'treinar-ia', 'automacao', 'criador', 'trocados'];

export function pontuar(respostas: Record<string, string>) {
  const total: Record<PerfilKey, number> = { 'treinar-ia': 0, freelancer: 0, criador: 0, automacao: 0, trocados: 0, negocio: 0 };
  for (const p of PERGUNTAS) {
    const op = p.opcoes.find((o) => o.v === respostas[p.id]);
    if (!op) continue;
    for (const [k, v] of Object.entries(op.pontos)) total[k as PerfilKey] += v ?? 0;
  }
  // Só celular: caminhos que exigem computador perdem força.
  if (respostas.equipamento === 'celular') {
    total.automacao -= 4;
    total['treinar-ia'] -= 2;
    total.freelancer -= 1;
  }
  const ranking = [...PERFIL_KEYS].sort((a, b) => total[b] - total[a] || DESEMPATE.indexOf(a) - DESEMPATE.indexOf(b));
  const max = Math.max(1, total[ranking[0]]);
  const pct = (k: PerfilKey) => Math.max(0, Math.round((total[k] / max) * 100));
  return { principal: ranking[0], segundo: ranking[1], total, ranking, pct };
}

export function resultadoPath(k: PerfilKey) {
  return `${QUIZ_PATH}resultado/${k}/`;
}
