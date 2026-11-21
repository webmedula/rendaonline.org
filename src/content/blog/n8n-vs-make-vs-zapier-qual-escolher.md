---
title: "n8n vs Make vs Zapier: qual ferramenta de automação escolher em 2026 (comparativo honesto)"
description: "Comparamos n8n, Make e Zapier em preço, limites, curva de aprendizado, integrações e IA. Qual compensa para pequena empresa, agência e quem quer pagar pouco."
pubDate: 2026-11-21
category: ferramentas
tags: ["n8n", "make", "zapier", "automacao", "comparativo"]
affiliate: false
---

Toda automação começa com a mesma pergunta: "liguei o formulário no WhatsApp, agora como faço isso rodar sozinho?". As três respostas mais comuns são **Zapier**, **Make** e **n8n**. As três fazem a mesma coisa em essência: quando algo acontece em um lugar, fazem algo em outro. A diferença está em quanto custa quando o volume cresce, em quanto você precisa aprender e em quem controla os seus dados.

Este comparativo é para dono de pequena empresa, agência e profissional autônomo que quer escolher uma vez e não migrar daqui a seis meses. Os preços são aproximados, mudam com frequência e variam com câmbio e plano anual; confira nos sites oficiais antes de decidir.

## Resumo para quem tem pressa

| | **Zapier** | **Make** | **n8n** |
|---|---|---|---|
| Para quem | Quem quer o caminho mais simples e paga por isso | Quem quer custo baixo com fluxos visuais mais ricos | Quem quer controle total, volume alto ou dados no próprio servidor |
| Modelo de cobrança | Por **tarefa** (cada ação conta) | Por **operação** (cada módulo executado conta) | Por **execução** (um fluxo inteiro conta 1) na nuvem; **ilimitado** se instalar na sua VPS |
| Plano gratuito | Sim, bem limitado | Sim, mais generoso | Nuvem: teste; self-hosted: grátis para sempre |
| Curva de aprendizado | Mais fácil | Média | Média para alta |
| Integrações prontas | Mais de 7.000 | Cerca de 2.000 | Cerca de 500 nativas, mas qualquer API via HTTP |
| Hospedar você mesmo | Não | Não | Sim |
| Melhor com IA | Bom | Bom | Excelente (nós de agente, memória, ferramentas) |

Em uma frase: **Zapier** é o mais fácil e o mais caro; **Make** é o meio-termo; **n8n** é o mais poderoso e, instalado na própria VPS, o mais barato em volume.

## Como cada um cobra, e por que isso muda tudo

Esse é o ponto que mais surpreende quem começa. Imagine um fluxo simples: cliente preenche formulário → salva na planilha → manda WhatsApp → cria contato no CRM. São 4 passos.

- No **Zapier**, isso são 3 tarefas (o gatilho não conta). 500 leads no mês = 1.500 tarefas.
- No **Make**, são 4 operações (o gatilho conta). 500 leads = 2.000 operações.
- No **n8n Cloud**, é 1 execução. 500 leads = 500 execuções.
- No **n8n na sua VPS**, é zero. Roda quantas vezes quiser.

Agora os planos de entrada, aproximados e em plano anual:

| Plano | Preço aproximado | O que inclui |
|---|---|---|
| Zapier Free | US$ 0 | ~100 tarefas/mês, fluxos de 2 passos, 15 min de intervalo |
| Zapier Professional | ~US$ 20/mês | ~750 tarefas/mês, multi-passo, 2 min de intervalo |
| Make Free | US$ 0 | ~1.000 operações/mês, 2 cenários ativos, 15 min de intervalo |
| Make Core | ~US$ 9/mês | ~10.000 operações/mês, cenários ilimitados, 1 min |
| n8n Cloud Starter | ~€ 20/mês | ~2.500 execuções/mês, 5 fluxos ativos |
| n8n Cloud Pro | ~€ 50/mês | ~10.000 execuções/mês, 15 fluxos ativos |
| n8n self-hosted (Community) | US$ 0 + sua VPS | Execuções e fluxos ilimitados; você mantém |

Com o exemplo dos 500 leads: Zapier já estourou o plano Professional e vai para o próximo (na casa de US$ 50 a 70/mês); Make fica folgado no Core; n8n Cloud fica no Starter; n8n na VPS custa só a VPS (R$ 40 a R$ 80/mês), que ainda pode hospedar o seu site e outros serviços.

Quando os fluxos passam de alguns milhares de passos por mês, a diferença de preço entre Zapier e n8n self-hosted vira a diferença entre centenas de reais e dezenas.

## Facilidade de uso

**Zapier** é o mais amigável. A interface é uma lista de passos, as integrações têm telas prontas e a maior parte das pessoas monta o primeiro Zap em 10 minutos sem ler nada. O preço é a falta de flexibilidade: lógica condicional e loops existem, mas são limitados e custam tarefas.

**Make** usa um canvas visual com módulos redondos ligados por linhas. Dá para ver o dado passando, ramificar, agregar, repetir. Leva um pouco mais para entender, mas quem passa dessa fase monta coisas que no Zapier seriam dolorosas.

**n8n** também é canvas, com nós retangulares. A diferença é a profundidade: cada nó mostra o JSON de entrada e saída, você pode escrever expressões em JavaScript em qualquer campo, inserir um nó de código, tratar erro por fluxo. Quem nunca viu JSON sente o degrau no começo. Quem já mexeu com planilha avançada ou um pouco de programação se sente em casa em um ou dois dias.

Se você nunca automatizou nada e não quer aprender, Zapier. Se aceita uma semana de curva para pagar menos e fazer mais, Make ou n8n.

## Integrações

Pela contagem, Zapier ganha de longe. Mas a conta engana um pouco:

- As ferramentas que uma pequena empresa brasileira usa (WhatsApp via API oficial ou Evolution, Google Sheets, Gmail, Notion, RD Station, Pipedrive, Mercado Pago, Asaas, Bling, Tiny) têm integração nas três, ou são acessíveis por **HTTP Request** e webhook, que as três oferecem.
- No n8n, "não tem integração nativa" quase nunca é problema, porque o nó HTTP Request com autenticação cobre qualquer API documentada. Foi assim que montamos a ligação com a Evolution API no [tutorial de automação do WhatsApp](/automatizar-whatsapp-com-n8n-evolution-api/).
- Sistemas brasileiros de nicho (ERP local, sistema de clínica, sistema de delivery) raramente estão em qualquer catálogo. Nesse caso o que decide é se o sistema tem API, não qual ferramenta você usa.

Onde Zapier ainda leva vantagem real: ferramentas americanas pouco conhecidas, com integração pronta e campos já mapeados, para quem não quer abrir documentação de API.

## Inteligência artificial

As três têm nós de IA (OpenAI, Anthropic, Google), e as três servem para "receber texto, pedir para a IA classificar, decidir o que fazer".

O **n8n** foi mais longe. Tem nós de **agente** (a IA decide quais ferramentas usar), **memória** de conversa por sessão, **vector store** para consultar documentos da empresa e integração com modelos rodando localmente. Para construir um atendente de WhatsApp que lembra o contexto e consulta a agenda, é hoje a opção mais completa fora de programar do zero. É o que usamos nos projetos descritos em [chatbot de WhatsApp com IA para empresas](/chatbot-whatsapp-com-ia-para-empresas-quanto-custa/).

**Make** e **Zapier** têm recursos de IA bons para enriquecer dados e tomar decisões simples dentro de um fluxo, e os dois lançam novidades nessa área o tempo todo. Mas para agente conversacional com memória, ainda ficam atrás.

## Dados, privacidade e controle

No Zapier e no Make, cada mensagem de cliente, cada CPF de formulário, cada nota fiscal passa pelos servidores deles, nos Estados Unidos ou na Europa. Para a maior parte das pequenas empresas isso é aceitável, e as duas têm boas práticas de segurança. Mas há três situações em que pesa:

1. **Dados de saúde** (clínicas, psicólogos, laboratórios), em que a LGPD pede mais cuidado sobre onde os dados trafegam.
2. **Volume de dados pessoais**, em que um vazamento no fornecedor vira problema seu.
3. **Dependência**: a ferramenta muda o preço, encerra o plano gratuito ou é comprada, e seus fluxos vão junto.

O n8n instalado na sua VPS resolve as três: os dados ficam no seu servidor, no Brasil se quiser, e os fluxos são seus arquivos. O custo é cuidar da máquina: atualizar, fazer backup, monitorar. Falamos de como fazer isso em [backup automático da VPS](/backup-automatico-vps-cyberpanel/).

## Confiabilidade e manutenção

**Zapier** e **Make** cuidam de tudo: servidor, atualização, uptime. Se quebrar, é problema deles. Em troca, você não pode fazer nada quando o serviço cai.

**n8n Cloud** é parecido: eles cuidam.

**n8n self-hosted** é você (ou quem você contratar). Na prática, com Docker, uma VPS decente e backup automatizado, um n8n para pequena empresa roda meses sem intervenção. Mas precisa de alguém que saiba o que fazer quando o disco enche ou uma atualização quebra um nó. Se esse alguém não existe na sua empresa, ou você contrata manutenção, ou escolhe nuvem.

## Qual escolher, por perfil

| Perfil | Recomendação | Por quê |
|---|---|---|
| Autônomo com 2 ou 3 automações simples e pouco volume | **Make Free** ou **Zapier Free** | Grátis, sem servidor, resolve |
| Pequena empresa com WhatsApp, planilha e CRM, algumas centenas de leads/mês | **n8n na VPS** (com alguém mantendo) ou **Make Core** | Custo baixo com volume; n8n se vai ter IA no atendimento |
| Agência que monta automação para clientes | **n8n na VPS**, uma instância por cliente ou multi-projeto | Sem custo por execução, dados separados, você controla |
| Quem quer atendente de WhatsApp com IA e memória | **n8n** | É onde os nós de agente e memória estão mais maduros |
| Quem não tem ninguém técnico e não quer contratar | **Zapier** ou **Make** | Zero manutenção vale o preço maior |
| Clínica ou negócio com dados sensíveis | **n8n na VPS** | Dados não saem do seu servidor |

## Dá para migrar depois?

Dá, mas não é apertar um botão. Os três usam conceitos parecidos (gatilho, ações, condições), então a lógica se traduz. O trabalho é refazer as conexões e testar. Um fluxo de 5 passos leva uma hora; 20 fluxos levam uma semana. Por isso vale escolher pensando em onde você estará em um ano, não só hoje.

Se a dúvida é entre Make e n8n, uma regra prática: comece no n8n se já sabe que vai ter WhatsApp com IA ou volume alto; comece no Make se quer testar ideias rápido e o volume ainda é pequeno.

## Na prática, na WebMedula

Na [WebMedula](/servicos/) usamos n8n em praticamente todos os projetos, instalado na VPS do cliente ou na nossa, com Docker, domínio próprio, SSL e backup diário. A razão é a combinação de custo zero por execução, nós de IA maduros e dados sob controle do cliente. Para quem só quer a base, o serviço de [instalação do n8n na VPS](/servicos/) deixa tudo pronto por R$ 297, com chamada de entrega para mostrar onde mexer. Quem prefere não cuidar do servidor contrata junto a [manutenção mensal](/servicos/), que inclui atualizações, backups e monitoramento.

Quando o cliente já tem fluxos no Make ou no Zapier e eles funcionam, não migramos por migrar. Migramos quando a fatura mensal passa do custo de uma VPS com manutenção, quando entra IA conversacional no projeto, ou quando o tipo de dado pede que fique no Brasil.

## Perguntas frequentes

**n8n é gratuito mesmo?**
A versão Community, instalada por você, é gratuita e sem limite de execuções. Você paga só a VPS. A versão em nuvem (n8n Cloud) é paga. Alguns recursos de empresa (SSO, ambientes, log avançado) ficam na licença Enterprise.

**Make é a mesma coisa que o antigo Integromat?**
Sim. O Integromat virou Make em 2022, com a mesma lógica de cenários e operações.

**Qual é mais fácil para quem nunca programou?**
Zapier, depois Make. O n8n exige entender a ideia de JSON e expressões; não é programar, mas é um degrau a mais.

**Posso usar mais de um?**
Pode, e muita gente usa: Zapier ou Make para integrações rápidas com ferramentas americanas, n8n para o que tem volume, IA ou dado sensível. Só evite a mesma automação em dois lugares.

**Quanto de VPS o n8n precisa?**
Para pequena empresa, 2 vCPU e 4 GB de RAM sobram, inclusive dividindo com Evolution API e um banco Postgres. O passo a passo está em [como instalar o n8n numa VPS](/como-instalar-n8n-vps-hostinger/).

**E o Power Automate, Pipedream, Activepieces?**
Power Automate faz sentido se a empresa vive no Microsoft 365. Pipedream é ótimo para quem programa. Activepieces é um concorrente open source do n8n, mais simples e menos maduro. Para a maioria dos casos de pequena empresa no Brasil, a escolha fica entre os três deste artigo.
