---
title: "CRM simples e barato para pequena empresa: o que precisa ter, opções gratuitas e como ligar ao WhatsApp"
description: "Como escolher um CRM para pequena empresa sem pagar caro nem complicar: o mínimo que ele precisa fazer, opções gratuitas e baratas e como alimentar sozinho pelo WhatsApp."
pubDate: 2026-11-23
category: ia-empresas
tags: ["crm", "vendas", "planilha", "automacao", "ia para empresas"]
affiliate: false
---

Toda pequena empresa já tem um CRM. Ele só costuma ser ruim: é o WhatsApp do dono, o caderno do vendedor, um grupo de "leads" e uma planilha que ninguém atualiza desde março. O resultado é sempre o mesmo. Cliente que pediu orçamento e nunca recebeu retorno, proposta enviada e esquecida, cliente antigo que ninguém chama de volta.

Este guia é para dono de pequena empresa ou prestador de serviço que quer organizar isso sem pagar R$ 300 por usuário e sem passar duas semanas configurando. Ele mostra o mínimo que um CRM precisa fazer, as opções gratuitas e baratas que funcionam de verdade, **quanto custa** cada caminho e como fazer o CRM se alimentar sozinho a partir do WhatsApp, que é onde os seus clientes estão. Valores são aproximados.

## O que um CRM precisa fazer (e só isso)

CRM é uma lista de pessoas que podem comprar de você, com três informações ao lado de cada nome: **em que etapa está**, **qual é o próximo passo** e **quando**. Todo o resto é acessório.

Para uma empresa pequena, o mínimo é:

| Função | O que significa na prática |
|---|---|
| **Contato** | Nome, telefone, de onde veio (Instagram, indicação, Google), o que quer |
| **Etapa** | Novo → Em conversa → Proposta enviada → Fechado ou Perdido |
| **Próximo passo com data** | "Ligar quinta", "mandar proposta até sexta". Sem isso, não é CRM, é agenda de contatos |
| **Histórico** | O que já foi dito, o que foi prometido |
| **Lembrete** | Alguém ou algo avisa que o próximo passo venceu |
| **Visão geral** | Quantos em cada etapa, quantos fechados no mês, de onde vieram os que fecharam |

Se a ferramenta faz isso e a equipe usa, está resolvido. Se a ferramenta faz 40 coisas e a equipe não usa, não está.

## Os três caminhos

### Caminho 1: planilha bem feita (R$ 0)

Uma planilha no Google Sheets com as colunas da tabela acima, uma aba por etapa ou uma coluna "Etapa" com lista suspensa, e formatação condicional pintando de vermelho o próximo passo vencido. Funciona para 1 ou 2 pessoas e até uns 100 contatos ativos.

Vantagens: grátis, todo mundo sabe usar, começa hoje.
Limites: ninguém lembra de abrir; não tem histórico de conversa; duas pessoas editando ao mesmo tempo bagunça; não avisa nada sozinha.

A planilha vira CRM de verdade quando algo a alimenta e a cobra automaticamente, e é disso que trata a seção de automação abaixo.

### Caminho 2: CRM gratuito ou barato de mercado (R$ 0 a R$ 100 por usuário/mês)

Há CRMs feitos para pequena empresa com plano gratuito honesto. Valores aproximados, planos mudam:

| Ferramenta | Plano grátis | Plano pago de entrada | Observação |
|---|---|---|---|
| **HubSpot CRM** | Sim, contatos ilimitados, pipeline, e-mail | ~US$ 15 a 20 por usuário/mês | Muito completo; interface em português; a versão paga sobe rápido de preço |
| **Pipedrive** | Teste de 14 dias | ~US$ 14 a 24 por usuário/mês | O mais focado em pipeline de vendas; simples de usar |
| **RD Station CRM** | Sim, 1 usuário, pipeline básico | ~R$ 60 a 80 por usuário/mês | Brasileiro, integra bem com WhatsApp e Instagram |
| **Agendor** | Sim, limitado | ~R$ 60 a 90 por usuário/mês | Brasileiro, pensado para equipe de vendas externa |
| **Notion** | Sim | ~US$ 10 por usuário/mês | Não é CRM, mas um banco de dados com visão kanban faz o papel para equipes pequenas |
| **Bitrix24** | Sim, bem completo | ~R$ 100/mês para 5 usuários | Faz de tudo; por isso mesmo é pesado para quem quer simplicidade |

Para a maioria das pequenas empresas brasileiras, a escolha fica entre HubSpot grátis (se a equipe aceita interface mais cheia) e RD Station CRM ou Pipedrive (se quer algo direto). Comece no plano grátis e só pague quando algo específico faltar.

### Caminho 3: CRM próprio, de código aberto, na sua VPS (R$ 40 a R$ 150/mês no total)

Para quem tem várias pessoas na equipe (e por isso o preço por usuário pesa), quer os dados no próprio servidor ou precisa que o CRM converse com o WhatsApp e com a IA sem limite, existem opções de código aberto maduras:

- **Twenty CRM**: moderno, visual parecido com Notion, pipeline, e-mail, API. É o que mais tem crescido.
- **EspoCRM**: mais antigo, muito completo, leve, em português.
- **Chatwoot**: não é CRM, é central de atendimento (WhatsApp, Instagram, e-mail numa caixa só), mas para empresa que vende por conversa muitas vezes resolve mais do que um CRM.

O custo é a VPS (R$ 40 a R$ 80/mês, que pode ser a mesma do site e do n8n) mais alguém para instalar e manter. Usuários ilimitados, sem mensalidade por pessoa. Veja o que já deixamos pronto para instalar em [sistemas instalados para empresas](/sistemas-instalados/).

## Como escolher em 5 minutos

- **Só você, ou você e mais uma pessoa**: planilha automatizada (caminho 1 + automação) ou HubSpot grátis.
- **2 a 5 pessoas vendendo, sem ninguém técnico**: RD Station CRM, Pipedrive ou HubSpot. Pague só quando o grátis limitar.
- **5 ou mais pessoas, ou vende quase tudo por WhatsApp**: Chatwoot ou Twenty na VPS, com n8n alimentando.
- **Dados sensíveis ou muita integração**: código aberto na VPS.

Qualquer um deles é melhor do que o WhatsApp do dono. O que decide o sucesso não é a ferramenta, é o próximo tópico.

## O que faz o CRM morrer (e como evitar)

CRM morre quando depende de alguém digitar. Vendedor no fim do dia não vai abrir o sistema para anotar as 12 conversas que teve. Em um mês a base está desatualizada e em dois ninguém mais abre.

A solução é inverter: **o CRM se alimenta sozinho, e a pessoa só confirma ou corrige**. Na prática:

1. **Todo lead entra automaticamente.** Formulário do site, mensagem no WhatsApp da empresa, comentário no Instagram, lead de anúncio: cada um vira um contato na etapa "Novo", com origem preenchida, sem ninguém digitar.
2. **A conversa fica registrada.** Com o WhatsApp na API oficial, as mensagens entram no histórico do contato. O vendedor atende pelo WhatsApp normal e o CRM registra.
3. **A IA resume e classifica.** Depois de cada conversa, um resumo de duas linhas e uma sugestão de etapa ("pediu orçamento de 3 unidades, enviar proposta até quarta"). O vendedor aceita com um toque.
4. **O lembrete vem até a pessoa.** Próximo passo vencido vira mensagem no WhatsApp do vendedor de manhã: "Hoje: ligar para Marcos (proposta enviada há 5 dias), enviar orçamento para Clínica Vida".
5. **O dono recebe o resumo da semana** sem abrir nada: quantos leads entraram, de onde, quantos fecharam, quem está parado.

Isso é um fluxo de automação, não um CRM diferente. Dá para montar em cima de qualquer um dos três caminhos, inclusive da planilha. Mostramos a base técnica em [como automatizar o WhatsApp com n8n e Evolution API](/automatizar-whatsapp-com-n8n-evolution-api/), onde o passo 6 é exatamente "salvar o contato numa planilha".

## Quanto custa cada caminho, no total

| Caminho | Ferramenta | Automação (entrada de leads, lembretes, resumo) | Total mensal aproximado |
|---|---|---|---|
| Planilha + automação | R$ 0 | VPS com n8n: R$ 40 a R$ 80; implantação única R$ 800 a R$ 2.000 | R$ 40 a R$ 80 |
| CRM de mercado, 3 usuários | R$ 0 a R$ 250 | Mesma VPS, ou plano de automação da própria ferramenta | R$ 50 a R$ 350 |
| CRM próprio na VPS | R$ 0 | VPS R$ 40 a R$ 80 + manutenção R$ 100 a R$ 300 | R$ 150 a R$ 400, usuários ilimitados |

Para comparar com o custo de não ter: uma proposta esquecida por mês já costuma valer mais do que qualquer linha da tabela. Mas o número exato é o seu, e o jeito de saber é medir: quantos orçamentos saíram no mês, quantos tiveram retorno, quantos fecharam.

## Passo a passo para colocar em 2 semanas

1. **Dia 1: definir as etapas.** No máximo 5. Escreva o que precisa acontecer para um contato mudar de etapa.
2. **Dia 2: escolher o caminho** pela regra dos 5 minutos acima e criar a conta ou a planilha.
3. **Dias 3 a 5: migrar o que existe.** Só os contatos dos últimos 3 meses. O resto fica onde está; se voltar, entra de novo.
4. **Dias 6 a 10: ligar a entrada automática** de leads (site, WhatsApp, Instagram). A partir daqui ninguém mais digita lead.
5. **Dias 11 a 14: ligar lembretes e resumo semanal.** Combinar com a equipe: o lembrete de manhã é a lista do dia.
6. **Depois de 30 dias: ligar a IA** para resumir conversas e sugerir etapa. Só agora, com a rotina formada.

## Erros que mais vemos

- **Começar pela ferramenta mais completa.** Dezenas de campos, ninguém preenche, o CRM vira peso.
- **Etapas demais.** "Primeiro contato", "qualificado", "reunião marcada", "reunião feita", "proposta em elaboração"... Cinco bastam.
- **Não ter próximo passo com data.** Contato sem próximo passo é contato esquecido. Torne o campo obrigatório.
- **Cada vendedor com o próprio WhatsApp.** Quando ele sai, leva os clientes. Número da empresa na API oficial, com cada vendedor atendendo pelo painel.
- **Depender de digitação.** Já falamos. É a causa número um de CRM abandonado.
- **Não olhar os números.** CRM que ninguém lê não muda nada. O resumo semanal automático resolve.

## Na prática, na WebMedula

Na [WebMedula](/servicos/) montamos o CRM de acordo com o tamanho da empresa, e quase sempre o trabalho de verdade está na automação em volta dele, não na ferramenta. Para a maioria dos clientes pequenos, a entrega é: CRM de mercado no plano gratuito ou Chatwoot/Twenty instalado na VPS, WhatsApp na API oficial, n8n recebendo todo lead (site, WhatsApp, Instagram, anúncios) e criando o contato, lembrete diário no WhatsApp de cada vendedor, resumo semanal para o dono e, depois do primeiro mês, IA resumindo conversas e sugerindo etapa. Faz parte do serviço de [automação sob medida com IA](/servicos/), e começa pelo [diagnóstico gratuito](/diagnostico-automacao/), onde olhamos como os leads chegam hoje e onde estão se perdendo.

Para quem vende por conversa e quer o atendimento inteiro automatizado, o caminho é o [atendimento no WhatsApp com IA](/atendimento-whatsapp-com-ia/), que já entrega o lead qualificado dentro do CRM.

## Perguntas frequentes

**Planilha serve como CRM?**
Para 1 ou 2 pessoas e até uns 100 contatos ativos, serve, desde que algo a alimente e cobre automaticamente. Sem automação, dura um mês.

**Preciso de CRM se só vendo pelo WhatsApp?**
Precisa, e é justamente onde mais se perde negócio. Uma central como o Chatwoot, que junta todas as conversas e marca etapa, costuma resolver melhor do que um CRM tradicional nesse caso.

**HubSpot grátis é grátis mesmo?**
Sim, com contatos ilimitados e pipeline. O que é pago são automações avançadas, sequências de e-mail e relatórios. Muita empresa pequena fica anos no gratuito.

**Qual a diferença entre CRM e sistema de atendimento?**
CRM organiza a venda por etapas. Sistema de atendimento (Chatwoot, central de WhatsApp) organiza as conversas. Empresa pequena que vende por conversa muitas vezes precisa mais do segundo; os dois podem conviver.

**Dá para integrar com o sistema de nota fiscal ou com o financeiro?**
Dá, por automação. "Fechou" no CRM dispara a emissão da nota ou a cobrança. Mas isso é a segunda fase; primeiro a base tem que estar viva.

**Quanto tempo até a equipe usar de verdade?**
Com entrada automática e lembrete diário, duas a quatro semanas. Sem isso, a maioria desiste em um mês.
