// Isca grátis: "50 prompts para ganhar dinheiro com IA".
// Usado pela página do material (/materiais/50-prompts-ia/) e pelo PDF.
// Os [colchetes] são o que a pessoa troca pelos dados dela.

export interface Prompt {
  title: string;
  use: string; // quando usar
  prompt: string;
  tip?: string;
}

export interface PromptSection {
  id: string;
  title: string;
  intro: string;
  prompts: Prompt[];
}

export const LEAD_MAGNET = {
  slug: '50-prompts-ia',
  title: '50 prompts para ganhar dinheiro com IA',
  subtitle: 'Prontos para copiar no ChatGPT, Gemini ou Claude: da ideia ao primeiro cliente.',
  version: 'Edição novembro de 2026',
  pdf: '/materiais/50-prompts-para-ganhar-dinheiro-com-ia.pdf',
  page: '/materiais/50-prompts-ia/',
  landing: '/50-prompts-ia/',
};

export const PROMPT_SECTIONS: PromptSection[] = [
  {
    id: 'ideia',
    title: '1. Descobrir a sua forma de ganhar dinheiro',
    intro:
      'Antes de sair produzindo, use a IA como um consultor que faz perguntas. Quanto mais verdade você contar sobre seu tempo, habilidades e dinheiro disponível, melhor a resposta.',
    prompts: [
      {
        title: 'Entrevista de diagnóstico',
        use: 'Quando você ainda não sabe por onde começar.',
        prompt:
          'Aja como um consultor de carreira e negócios digitais no Brasil. Antes de sugerir qualquer coisa, me faça 10 perguntas, uma de cada vez, sobre minhas habilidades, experiência, tempo livre por semana, dinheiro que posso investir, ferramentas que já uso e o que eu não gosto de fazer. Depois das respostas, sugira 3 formas realistas de ganhar os primeiros R$ 1.000 por mês com ajuda de IA, com prazo estimado, custo inicial e o primeiro passo de cada uma.',
        tip: 'Responda com detalhes. "Sei mexer no Canva e tenho 1h por noite" rende mais do que "sei design".',
      },
      {
        title: 'Habilidades que viram serviço',
        use: 'Para enxergar o que você já sabe e outras pessoas pagariam para ter feito.',
        prompt:
          'Minha profissão atual é [profissão] e no dia a dia eu faço [tarefas que você faz bem]. Liste 15 serviços que eu poderia vender online para pequenas empresas ou pessoas físicas usando essas habilidades mais ferramentas de IA. Para cada serviço, diga quem compra, quanto se cobra em média no Brasil e quanto tempo leva para entregar.',
      },
      {
        title: 'Teste de demanda em 48 horas',
        use: 'Para validar uma ideia antes de investir tempo.',
        prompt:
          'Tenho esta ideia de renda: [descreva a ideia]. Monte um teste de validação que eu consiga fazer em 48 horas e sem gastar dinheiro: onde encontrar as primeiras pessoas interessadas, que mensagem mandar, que pergunta fazer e qual resultado indica que vale continuar. Seja direto e prático.',
      },
      {
        title: 'Plano de 30 dias',
        use: 'Quando já escolheu o caminho e precisa de rotina.',
        prompt:
          'Escolhi este caminho: [caminho escolhido]. Tenho [X horas] por dia, de [dias da semana]. Crie um plano de 30 dias dividido por semana, com tarefas diárias de no máximo [X horas], metas mensuráveis por semana e o que fazer se eu atrasar. A meta do mês é [meta concreta, ex.: conseguir 2 clientes].',
        tip: 'Peça para transformar o plano em uma tabela e cole numa planilha ou no Notion.',
      },
      {
        title: 'Advogado do diabo',
        use: 'Para enxergar riscos antes de gastar dinheiro.',
        prompt:
          'Seja um investidor cético. Analise meu plano: [cole o plano]. Aponte os 5 maiores riscos, as suposições que eu estou fazendo sem prova e o que provavelmente vai dar errado nos primeiros 3 meses. Para cada problema, sugira como eu posso testar ou reduzir o risco de forma barata.',
      },
    ],
  },
  {
    id: 'freelancer',
    title: '2. Conseguir clientes como freelancer',
    intro:
      'Plataformas como Workana, 99Freelas e Fiverr premiam quem responde rápido, entende o problema do cliente e mostra prova. A IA ajuda nas três coisas.',
    prompts: [
      {
        title: 'Perfil que vende',
        use: 'Para reescrever sua bio em plataformas de freelance e no LinkedIn.',
        prompt:
          'Reescreva meu perfil de freelancer para a plataforma [Workana/99Freelas/Fiverr/LinkedIn]. Eu ofereço [serviço] para [tipo de cliente]. Meus diferenciais são [diferenciais] e meus melhores resultados foram [resultados]. Escreva um título de até 60 caracteres e uma descrição de até 800 caracteres, falando do problema do cliente primeiro e de mim depois. Sem clichês como "profissional dedicado".',
      },
      {
        title: 'Proposta para um projeto publicado',
        use: 'Toda vez que for responder um projeto em plataforma.',
        prompt:
          'Este é o projeto publicado pelo cliente: [cole o texto do projeto]. Escreva uma proposta de até 150 palavras que: 1) mostre que entendi o problema com uma frase específica sobre o projeto dele, 2) diga como vou resolver em 3 passos, 3) cite um resultado parecido que já entreguei: [seu exemplo], 4) termine com uma pergunta que faça ele responder. Tom profissional e humano.',
        tip: 'Envie nas primeiras horas após o projeto ser publicado. Velocidade pesa muito.',
      },
      {
        title: 'Portfólio sem clientes',
        use: 'Quando você está começando e não tem trabalhos para mostrar.',
        prompt:
          'Estou começando como [área] e ainda não tenho clientes. Sugira 5 projetos de portfólio fictícios, mas realistas, que eu possa fazer em um fim de semana cada, mostrando exatamente o tipo de trabalho que [tipo de cliente] contrata. Para cada um, diga o briefing, o que entregar e como apresentar no portfólio.',
      },
      {
        title: 'Prospecção ativa',
        use: 'Para abordar empresas direto, sem esperar plataforma.',
        prompt:
          'Quero oferecer [serviço] para [tipo de negócio] em [cidade]. Escreva 3 versões de mensagem de primeiro contato para WhatsApp ou Instagram, com até 60 palavras cada, que citem algo específico do negócio (deixe [detalhe observado] para eu preencher), ofereçam uma melhoria concreta e terminem com uma pergunta simples. Nada de "tudo bem?" no começo nem tom de vendedor.',
      },
      {
        title: 'Follow-up que não é chato',
        use: 'Quando o cliente parou de responder.',
        prompt:
          'Mandei uma proposta de [serviço] para [cliente] há [X dias] e ele não respondeu. Escreva 3 mensagens de acompanhamento para enviar com intervalo de 3, 7 e 14 dias. Cada uma deve trazer algo novo (uma ideia, um exemplo, uma pergunta) em vez de só "conseguiu ver?". Máximo de 50 palavras cada.',
      },
    ],
  },
  {
    id: 'conteudo',
    title: '3. Blog, AdSense e afiliados',
    intro:
      'Conteúdo escrito ainda é a forma mais barata de atrair visitas todo dia. O segredo é escolher temas que as pessoas buscam e escrever melhor que os concorrentes, não mais rápido.',
    prompts: [
      {
        title: 'Mapa de temas do nicho',
        use: 'No começo do blog ou quando faltam ideias.',
        prompt:
          'Meu blog é sobre [nicho] para [público]. Monte um mapa de conteúdo com 5 grandes temas e 8 artigos em cada um. Para cada artigo, informe a palavra-chave principal provável, a intenção de busca (aprender, comparar ou comprar) e se dá para incluir link de afiliado. Priorize perguntas reais que iniciantes digitam no Google.',
        tip: 'Confirme o volume das palavras no Google Trends ou no Planejador de Palavras-chave antes de escrever.',
      },
      {
        title: 'Estrutura que ranqueia',
        use: 'Antes de escrever cada artigo.',
        prompt:
          'Vou escrever um artigo para a busca "[palavra-chave]". Crie a estrutura com título (até 60 caracteres), meta descrição (até 155), introdução que responda a pergunta nas 2 primeiras frases, subtítulos H2 e H3, uma tabela comparativa se fizer sentido e 5 perguntas frequentes. Diga também o que um artigo precisa ter para ser melhor que os 3 primeiros resultados.',
      },
      {
        title: 'Rascunho com a sua experiência',
        use: 'Para escrever rápido sem soar como texto genérico de IA.',
        prompt:
          'Escreva o artigo seguindo esta estrutura: [cole a estrutura]. Use frases curtas, exemplos brasileiros e linguagem de conversa. Onde houver espaço para experiência pessoal, deixe marcado [MINHA EXPERIÊNCIA: o que testei, quanto paguei, o que deu errado] para eu preencher. Não invente números, preços ou estudos: marque [CONFERIR] quando precisar de dado.',
        tip: 'O Google e os leitores valorizam teste real. Preencha as marcações antes de publicar.',
      },
      {
        title: 'Review honesto de produto afiliado',
        use: 'Para artigos que recomendam produtos ou ferramentas.',
        prompt:
          'Escreva a estrutura de um review honesto de [produto] para [público]. Inclua: para quem é e para quem não é, prós e contras reais, preço e alternativas mais baratas, um veredito claro e onde inserir o link de afiliado sem parecer propaganda. Me faça 8 perguntas sobre a minha experiência com o produto antes de escrever.',
      },
      {
        title: 'Atualizar artigo que caiu',
        use: 'Quando um post perdeu posições no Google.',
        prompt:
          'Este artigo perdeu tráfego: [cole o texto ou os subtítulos]. A busca principal é "[palavra-chave]". Compare com o que um leitor de [ano] espera e liste: informações desatualizadas, seções que faltam, trechos que podem sair, um título melhor e 3 perguntas novas para o FAQ.',
      },
    ],
  },
  {
    id: 'redes',
    title: '4. Redes sociais e vídeos curtos',
    intro:
      'Rede social é vitrine: ela traz as pessoas, e o que gera dinheiro é o que vem depois (serviço, produto ou indicação). Use a IA para manter frequência sem perder sua voz.',
    prompts: [
      {
        title: '30 dias de conteúdo',
        use: 'Para planejar um mês inteiro de posts em uma tarde.',
        prompt:
          'Crie um calendário de 30 dias de conteúdo para o Instagram de [perfil/negócio], que fala com [público] e vende [produto ou serviço]. Misture 40% de conteúdo que ensina, 30% de bastidores e prova, 20% de conteúdo que gera conversa e 10% de oferta direta. Para cada dia: formato (carrossel, reels ou stories), tema, gancho da primeira frase e chamada para ação.',
      },
      {
        title: 'Roteiro de reels de 30 segundos',
        use: 'Para gravar vídeos curtos sem enrolar.',
        prompt:
          'Escreva um roteiro de vídeo curto (30 a 40 segundos) sobre [tema] para [público]. Estrutura: gancho de até 2 segundos que gere curiosidade, problema, 3 dicas rápidas e chamada para ação para [ação desejada]. Indique o que aparece na tela em cada parte e o texto que vai escrito no vídeo.',
        tip: 'Grave 5 roteiros de uma vez, no mesmo dia, e poste ao longo da semana.',
      },
      {
        title: 'Um conteúdo, cinco formatos',
        use: 'Para aproveitar um artigo ou vídeo em várias redes.',
        prompt:
          'Transforme este conteúdo [cole o texto ou a transcrição] em: 1 carrossel de 7 telas para Instagram, 1 post para LinkedIn de até 1.300 caracteres, 3 posts curtos para X/Threads, 1 roteiro de reels de 30 segundos e 1 mensagem para lista de transmissão no WhatsApp. Adapte o tom a cada rede.',
      },
      {
        title: 'Bio e destaque que convertem',
        use: 'Para o perfil deixar claro o que você vende.',
        prompt:
          'Reescreva a bio do Instagram de [perfil]. Ajudo [público] a [resultado] com [como]. Crie 5 opções de bio com até 150 caracteres, com chamada para o link. Depois sugira 5 destaques (nome e o que colocar em cada um) para quem chega no perfil entender, confiar e chamar no WhatsApp.',
      },
      {
        title: 'Responder comentários e DMs',
        use: 'Para transformar perguntas em conversas de venda.',
        prompt:
          'Vendo [produto/serviço] por [preço]. Escreva respostas curtas e simpáticas para estas mensagens que recebo com frequência: "quanto custa?", "como funciona?", "vou pensar", "tem desconto?" e "é confiável?". Cada resposta deve tirar a dúvida e terminar com uma pergunta que continue a conversa.',
      },
    ],
  },
  {
    id: 'empresas',
    title: '5. Vender serviços de IA para empresas locais',
    intro:
      'Clínicas, lojas, restaurantes e prestadores de serviço sabem que precisam de IA, mas não sabem por onde começar. Quem chega com uma solução simples e um preço claro sai na frente.',
    prompts: [
      {
        title: 'Encontrar o problema que dá dinheiro',
        use: 'Antes de oferecer qualquer coisa a um tipo de negócio.',
        prompt:
          'Liste os 10 problemas do dia a dia de um(a) [tipo de negócio, ex.: clínica odontológica] que custam mais tempo ou dinheiro, como faltas, demora no atendimento ou retrabalho. Para cada um, diga como uma solução simples com IA ou automação resolveria, quanto o negócio economizaria por mês (estimativa) e quanto daria para cobrar pela solução.',
      },
      {
        title: 'Oferta em uma página',
        use: 'Para empacotar um serviço com preço fechado.',
        prompt:
          'Monte uma oferta de serviço de [serviço com IA, ex.: atendimento automático no WhatsApp] para [tipo de negócio]. Inclua nome do serviço, promessa em uma frase, o que está incluído, o que não está, prazo de entrega, preço de implantação, mensalidade opcional e garantia. Escreva como uma página curta que eu possa mandar em PDF.',
      },
      {
        title: 'Roteiro da primeira reunião',
        use: 'Para conduzir a conversa de diagnóstico com o dono do negócio.',
        prompt:
          'Vou conversar 20 minutos com o dono de [tipo de negócio] sobre automação e IA. Crie um roteiro de reunião com 8 perguntas que descubram onde ele perde tempo e dinheiro, como ele atende hoje e quanto custa esse problema. No fim, uma forma natural de apresentar a minha solução e o próximo passo.',
      },
      {
        title: 'Calcular o retorno para o cliente',
        use: 'Para justificar o preço com números do próprio cliente.',
        prompt:
          'Meu cliente é um(a) [tipo de negócio] que recebe [X] mensagens por dia e leva [Y] minutos em cada uma. A atendente custa [R$ Z] por mês. Calcule quanto tempo e dinheiro uma automação que resolve [N]% das mensagens economiza por mês e por ano, e escreva um parágrafo simples para eu mostrar ao cliente comparando com o investimento de [preço].',
      },
      {
        title: 'Prompt do atendente virtual',
        use: 'Para criar o "cérebro" de um assistente de atendimento para um cliente.',
        prompt:
          'Escreva as instruções de sistema para um assistente virtual de atendimento de [nome do negócio], um(a) [tipo de negócio] em [cidade]. Informações: horários [horários], serviços e preços [lista], endereço [endereço], formas de pagamento [formas]. O assistente deve ser cordial e objetivo, responder só com base nessas informações, nunca inventar preço, oferecer agendamento e passar para um humano quando o cliente pedir ou quando for reclamação.',
        tip: 'Teste com 20 perguntas reais que o negócio recebe antes de colocar no ar.',
      },
    ],
  },
  {
    id: 'produtos',
    title: '6. Produtos digitais: ebook, curso e modelos',
    intro:
      'Produto digital é vender uma vez o trabalho de criar e receber várias vezes. Comece pequeno: um guia ou um modelo pronto que resolve uma dor específica vende mais que um curso gigante.',
    prompts: [
      {
        title: 'Ideia de produto que já tem demanda',
        use: 'Para escolher o que criar.',
        prompt:
          'Meu público é [público] e eu sei bastante sobre [assunto]. Sugira 10 produtos digitais pequenos (guia, checklist, planilha, modelo, minicurso) que resolvam um problema urgente desse público. Para cada um: o problema que resolve, formato, preço sugerido entre R$ 19 e R$ 97 e como provar que há demanda antes de criar.',
      },
      {
        title: 'Sumário de ebook',
        use: 'Para estruturar um ebook ou guia.',
        prompt:
          'Crie o sumário de um ebook chamado "[título]" para [público], com 8 a 10 capítulos. Cada capítulo deve terminar com uma ação prática. Para cada capítulo, escreva 3 tópicos e o resultado que o leitor terá ao terminar. Sugira também 3 títulos alternativos mais chamativos.',
      },
      {
        title: 'Escrever um capítulo com a sua voz',
        use: 'Para acelerar a escrita mantendo seu estilo.',
        prompt:
          'Este é um texto que eu escrevi e mostra meu estilo: [cole 2 ou 3 parágrafos seus]. Analise o tom, o tamanho das frases e as expressões. Depois escreva o capítulo "[nome do capítulo]" com os tópicos [tópicos], imitando esse estilo. Marque [EXEMPLO MEU] onde eu devo colocar uma história pessoal.',
      },
      {
        title: 'Página de vendas',
        use: 'Para vender o produto na Hotmart, Kiwify ou no seu site.',
        prompt:
          'Escreva a página de vendas do produto [nome], que custa [preço] e entrega [o que entrega] para [público]. Estrutura: título com o resultado, subtítulo, a dor, por que as soluções comuns falham, o que tem dentro (em tópicos), para quem é e para quem não é, bônus, garantia de 7 dias, perguntas frequentes e chamada final. Não prometa resultados financeiros garantidos.',
      },
      {
        title: 'Sequência de e-mails de lançamento',
        use: 'Para vender para a sua lista.',
        prompt:
          'Escreva uma sequência de 5 e-mails para vender [produto] para minha lista de [público]. E-mail 1: conteúdo útil sobre o problema. 2: história de alguém que resolveu. 3: apresentação do produto. 4: respostas às objeções [objeções comuns]. 5: último dia da condição especial. Cada e-mail com assunto curto, até 250 palavras e um único link.',
      },
    ],
  },
  {
    id: 'ecommerce',
    title: '7. Lojas virtuais e marketplaces',
    intro:
      'Na Shopee, no Mercado Livre e na loja própria, a IA economiza horas em anúncios, atendimento e análise. O ganho vem de escalar o que já vende.',
    prompts: [
      {
        title: 'Título e descrição de anúncio',
        use: 'Para cada produto novo ou anúncio que não vende.',
        prompt:
          'Crie o anúncio de [produto] para o [Mercado Livre/Shopee]. Características: [características]. Público: [público]. Escreva um título de até 60 caracteres com as palavras que o comprador busca, 5 tópicos de benefícios, uma descrição completa com medidas e o que vem na caixa, e 5 perguntas e respostas frequentes. Sem palavras proibidas pelas plataformas, como "o melhor" ou "promoção".',
      },
      {
        title: 'Analisar avaliações dos concorrentes',
        use: 'Para melhorar seu produto e seu anúncio com o que os clientes reclamam.',
        prompt:
          'Estas são avaliações de produtos concorrentes ao meu: [cole 20 a 50 avaliações]. Agrupe as reclamações e os elogios por tema, com a frequência de cada um. Depois diga: o que eu devo destacar no meu anúncio, o que devo mudar no produto ou na embalagem e que dúvida devo responder antes da compra.',
      },
      {
        title: 'Precificação com taxas',
        use: 'Para não vender no prejuízo.',
        prompt:
          'Me ajude a precificar [produto]. Custo: [R$]. Frete médio que eu pago: [R$]. Embalagem: [R$]. Imposto: [%]. Taxa da plataforma: [%] + [R$ fixos]. Quero margem líquida de [%]. Calcule o preço de venda mínimo e o ideal, mostre a conta passo a passo e simule o lucro se eu der 10% de desconto.',
        tip: 'Confira as taxas atuais na central de vendedores. Elas mudam com frequência.',
      },
      {
        title: 'Respostas para o pós-venda',
        use: 'Para atender rápido e evitar avaliação negativa.',
        prompt:
          'Tenho uma loja de [segmento] na [plataforma]. Escreva modelos de mensagem para: pedido enviado, atraso na entrega, produto com defeito, cliente pedindo troca, cliente irritado e pedido de avaliação depois da entrega. Tom educado, resolvendo o problema primeiro e sem prometer o que eu não posso cumprir.',
      },
      {
        title: 'Produtos para testar',
        use: 'Para encontrar o próximo produto a vender.',
        prompt:
          'Vendo [produtos atuais] para [público]. Sugira 15 produtos complementares que esse mesmo cliente compraria, com faixa de preço, por que combinam e como montar kits que aumentem o valor do pedido. Indique quais têm risco maior de devolução.',
      },
    ],
  },
  {
    id: 'automacao',
    title: '8. Automação e produtividade',
    intro:
      'Automatizar libera horas para o que dá dinheiro. Ferramentas como o n8n conectam WhatsApp, planilhas, e-mail e IA sem programar quase nada, e a própria IA ajuda a montar os fluxos.',
    prompts: [
      {
        title: 'Mapear o que automatizar',
        use: 'Para descobrir onde você (ou o cliente) perde mais tempo.',
        prompt:
          'Vou descrever minha semana de trabalho: [descreva suas tarefas repetitivas, com quanto tempo leva cada uma]. Liste o que pode ser automatizado, ordenado pelo tempo economizado. Para cada item, sugira a ferramenta (n8n, Zapier, Make, planilha, IA) e o nível de dificuldade de 1 a 5.',
      },
      {
        title: 'Desenhar um fluxo no n8n',
        use: 'Antes de montar a automação.',
        prompt:
          'Quero criar no n8n uma automação que [objetivo, ex.: pega os leads do formulário do site, salva numa planilha do Google e manda uma mensagem de boas-vindas no WhatsApp]. Descreva o fluxo nó por nó: gatilho, cada nó com o nome exato no n8n, os campos que preciso configurar, como tratar erros e como testar antes de ativar.',
        tip: 'Peça o fluxo em JSON para importar no n8n e revise as credenciais antes de ativar.',
      },
      {
        title: 'Fórmula de planilha',
        use: 'Quando travar no Excel ou no Google Planilhas.',
        prompt:
          'No Google Planilhas, tenho na coluna A [dados], na coluna B [dados] e na coluna C [dados]. Quero [resultado desejado]. Me dê a fórmula, explique cada parte em português simples e diga o que fazer se der erro.',
      },
      {
        title: 'Resumo de reunião com tarefas',
        use: 'Depois de qualquer reunião ou áudio longo.',
        prompt:
          'Esta é a transcrição de uma reunião: [cole a transcrição]. Faça um resumo de 5 linhas, liste as decisões tomadas, as tarefas com responsável e prazo, e as perguntas que ficaram sem resposta. Depois escreva uma mensagem curta para eu enviar aos participantes no WhatsApp.',
      },
      {
        title: 'E-mail e caixa de entrada',
        use: 'Para responder e-mails difíceis ou repetitivos.',
        prompt:
          'Recebi este e-mail: [cole o e-mail]. Quero responder [o que você quer dizer, ex.: recusar com educação e oferecer outra data]. Escreva 2 versões: uma curta e uma mais formal. Depois sugira um modelo reutilizável para esse tipo de e-mail.',
      },
    ],
  },
  {
    id: 'vendas',
    title: '9. Vendas, propostas e objeções',
    intro:
      'A maior parte do dinheiro se perde entre o "tenho interesse" e o pagamento. Proposta clara, resposta rápida e boa conversa sobre preço fecham mais negócios que qualquer anúncio.',
    prompts: [
      {
        title: 'Proposta comercial completa',
        use: 'Depois da conversa de diagnóstico com o cliente.',
        prompt:
          'Escreva uma proposta comercial para [cliente], um(a) [tipo de negócio], para o serviço [serviço]. Na conversa ele disse que o problema é [problema] e que quer [resultado]. Estrutura: resumo do problema com as palavras dele, solução proposta, etapas e prazos, investimento com 2 opções (básica e completa), condições de pagamento, o que não está incluso e próximo passo. Linguagem simples, até 1 página.',
      },
      {
        title: 'Responder "está caro"',
        use: 'Quando o cliente reclama do preço.',
        prompt:
          'Ofereci [serviço] por [preço] e o cliente respondeu: "[resposta do cliente]". Escreva 3 respostas possíveis, sem dar desconto de cara: uma que mostra o retorno do investimento, uma que oferece uma versão menor por um preço menor e uma que pergunta o que exatamente pesa para ele. Tom calmo e seguro.',
      },
      {
        title: 'Treinar uma negociação',
        use: 'Para ensaiar antes de uma reunião importante.',
        prompt:
          'Vamos simular uma negociação. Você é o dono de um(a) [tipo de negócio], desconfiado e com pouco tempo, e eu vou tentar vender [serviço] por [preço]. Faça objeções realistas, uma de cada vez. Depois de 8 mensagens, saia do personagem e me dê uma nota de 0 a 10 com o que eu fiz bem e o que melhorar.',
        tip: 'Repita até tirar nota 8 ou mais. Na reunião real você vai estar bem mais tranquilo.',
      },
      {
        title: 'Garantia e escopo',
        use: 'Para evitar que o projeto cresça sem você cobrar a mais.',
        prompt:
          'Vou prestar o serviço [serviço] para [cliente]. Escreva um texto simples de escopo e garantia para colocar na proposta: o que está incluído, quantas rodadas de ajuste, o que conta como pedido novo, prazo de resposta do cliente e como funciona a garantia. Tom amigável, sem juridiquês.',
        tip: 'Para contratos de valor alto, peça para um advogado revisar.',
      },
      {
        title: 'Pedir depoimento e indicação',
        use: 'Depois de entregar um trabalho que deu certo.',
        prompt:
          'Acabei de entregar [serviço] para [cliente] e ele ficou satisfeito. Escreva uma mensagem de WhatsApp pedindo um depoimento curto, com 3 perguntas que facilitem a resposta (como era antes, o que mudou, para quem ele indicaria). Depois escreva uma segunda mensagem, para enviar uma semana depois, pedindo a indicação de 2 conhecidos.',
      },
    ],
  },
  {
    id: 'gestao',
    title: '10. Preço, finanças e crescimento',
    intro:
      'Ganhar dinheiro online é também saber quanto cobrar, para onde o dinheiro vai e o que dá mais retorno pela hora trabalhada.',
    prompts: [
      {
        title: 'Quanto cobrar pela hora',
        use: 'Antes de passar qualquer orçamento.',
        prompt:
          'Quero ganhar [R$] líquidos por mês trabalhando [horas] por semana. Meus custos fixos são [lista com valores] e pago [imposto, ex.: DAS do MEI]. Considere férias, dias sem cliente e tempo gasto com tarefas que não são cobradas. Calcule meu valor-hora mínimo e o preço de um projeto que leva [X horas].',
        tip: 'Use também a calculadora grátis de valor-hora do Renda Online para conferir.',
      },
      {
        title: 'Pacotes em três níveis',
        use: 'Para o cliente escolher entre opções em vez de dizer sim ou não.',
        prompt:
          'Eu vendo [serviço] e hoje cobro [preço] por um formato único. Crie 3 pacotes (básico, recomendado e completo) com nome, o que inclui cada um, preço e para quem é. O pacote do meio deve ser o mais atraente. Sugira também uma opção de mensalidade recorrente.',
      },
      {
        title: 'Organizar o caixa do mês',
        use: 'Uma vez por mês, para saber se está dando lucro.',
        prompt:
          'Estas foram minhas entradas e saídas do mês: [cole a lista]. Classifique por categoria, calcule lucro, margem e quanto cada fonte de renda trouxe. Aponte os 3 gastos que mais pesam, o que dá para cortar e qual fonte de renda merece mais tempo no próximo mês.',
      },
      {
        title: 'Renda recorrente',
        use: 'Para deixar de depender só de projetos avulsos.',
        prompt:
          'Hoje eu ganho com [serviços avulsos]. Sugira 5 formas de transformar isso em renda recorrente mensal, como manutenção, suporte, assinatura de conteúdo ou planos. Para cada uma, diga o que eu entrego todo mês, quanto cobrar e como oferecer aos clientes atuais.',
      },
      {
        title: 'Revisão de 90 dias',
        use: 'A cada trimestre, para decidir o próximo passo.',
        prompt:
          'Nos últimos 90 dias eu fiz: [o que fez], ganhei [quanto], com estas fontes: [fontes], e gastei [horas] por semana. Analise o que deu mais retorno por hora, o que devo parar de fazer, o que devo dobrar e monte as 3 prioridades dos próximos 90 dias com metas mensuráveis.',
      },
    ],
  },
];

export const TOTAL_PROMPTS = PROMPT_SECTIONS.reduce((n, s) => n + s.prompts.length, 0);
