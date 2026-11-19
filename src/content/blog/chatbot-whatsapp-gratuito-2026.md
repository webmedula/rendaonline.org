---
title: "Chatbot para WhatsApp Grátis em 2026: 5 Formas de Criar sem Pagar Nada"
description: "Guia completo com 5 formas reais de criar um chatbot para WhatsApp grátis em 2026: desde as automações nativas do WhatsApp Business até IA no seu próprio número. Com passo a passo."
pubDate: 2026-11-18
category: ia-empresas
tags: ["chatbot", "whatsapp", "gratis", "ia", "automacao"]
image: /social/chatbot-whatsapp-gratuito-2026/og.jpg
imageAlt: "Chatbot para WhatsApp grátis em 2026 - guia completo com 5 formas de criar"
affiliate: false
draft: false
---

Responder cliente no WhatsApp rápido custa caro? Nem sempre.

Em 2026, existem pelo menos **5 formas de criar um chatbot para WhatsApp sem pagar mensalidade** — cada uma com seus limites, mas todas de graça. A escolha depende do que você precisa: só uma mensagem automática quando está ocupado, ou um assistente de IA que entende perguntas e responde sozinho.

Este guia mostra as 5 opções lado a lado, com o passo a passo da que funciona para a maioria dos pequenos negócios.

## Opção 1: Automações nativas do WhatsApp Business (zero reais, zero inteligência)

O próprio aplicativo **WhatsApp Business** (gratuito, disponível na Play Store e App Store) já vem com três recursos automáticos:

- **Mensagem de saudação**: dispara quando o cliente escreve pela primeira vez.
- **Mensagem de ausência**: quando você não responde dentro de um prazo.
- **Respostas rápidas**: atalhos de teclado para mensagens prontas (ex.: digitar `/preco` e enviar a tabela).

**Vantagem**: é 100% gratuito, não precisa instalar nada, não precisa de conhecimento técnico.

**Limite**: nenhum desses recursos **entende** o que o cliente escreveu. A saudagem é a mesma para todo mundo. Se o cliente perguntar "qual o horário?", a resposta que ele recebe é a mesma de quem perguntou "quanto custa?".

**Para quem serve**: profissionais que querem só uma resposta inicial enquanto atendem manualmente.

**Como configurar**:
1. Baixe o WhatsApp Business na loja do seu celular.
2. Vá em **Configurações → Ferramentas comerciais → Mensagem de saudação**.
3. Ative e escreva a mensagem (ex.: "Olá! Recebemos sua mensagem e vamos responder em breve.").
4. Repita o mesmo para **Mensagem de ausência** e crie **Respostas rápidas** no mesmo menu.

## Opção 2: Meta Business Agent (IA gratuita por enquanto)

Desde 2026, a Meta liberou no Brasil o **Meta Business Agent** — um assistente de IA dentro do próprio WhatsApp Business que lê a pergunta do cliente e responde com base nas informações que você cadastrou (horário, endereço, catálogo, perguntas frequentes).

**Vantagem**: entende texto livre, não precisa de configuração técnica, é gratuito (por enquanto — a Meta já anunciou que vai cobrar no futuro).

**Limite**: exige que a empresa seja qualificada (nem todo mundo consegue ativar), e a Meta pode limitar o uso. Além disso, desliga as mensagens de saudação e ausência ao ser ativado.

**Para quem serve**: empresas que já usam WhatsApp Business e querem IA sem instalar ferramentas extras.

**Como ativar**:
1. Abra o WhatsApp Business e vá em **Configurações → Meta Business Agent**.
2. Siga as instruções para ensinar o agente sobre seu negócio.
3. Pronto — o agente começa a responder no lugar da saudação padrão.

## Opção 3: 1.000 respostas grátis por mês na API oficial do WhatsApp

Desde outubro de 2026, a Meta oferece **1.000 respostas de serviço gratuitas por mês** para cada número comercial na API oficial do WhatsApp. Isso significa que você pode usar uma ferramenta de chatbot conectada à API oficial e pagar **zero** pelas primeiras 1.000 conversas.

**Vantagem**: usa a API oficial (sem risco de bloqueio), integra com sistemas de gestão.

**Limite**: passa a pagar R$ 0,035 por resposta depois da 1.000ª. A ferramenta de chatbot em si pode ter custo, embora algumas tenham plano gratuito.

**Para quem serve**: empresas que já faturam e querem uma solução profissional, mas ainda têm volume baixo de atendimento.

**Como usar**:
1. Escolha uma plataforma com plano gratuito que use a API oficial (SendPulse, ManyChat, Typebot — verifique se o plano Free inclui WhatsApp).
2. Conecte seu número comercial seguindo o passo a passo da plataforma.
3. Monte o fluxo de respostas e publique.

## Opção 4: n8n + Evolution API (gratuito, mas precisa de servidor)

Essa é a opção mais poderosa e a que recomendamos para quem quer **controle total** sem pagar mensalidade.

O [n8n](https://n8n.io) é uma ferramenta de automação de código aberto que você instala no seu próprio servidor. A [Evolution API](https://evolution-api.com) é uma ponte gratuita que conecta seu WhatsApp ao n8n. Juntas, elas formam um chatbot completo — com IA, se você quiser.

**Vantagem**: zero de mensalidade (só o custo do servidor, a partir de R$ 29/mês), dados 100% seus, possibilidade de integrar com IA (ChatGPT, Gemini), agendamento, CRM e planilhas.

**Limite**: precisa de conhecimento técnico para instalar e configurar, ou contratar quem faça. A Evolution API usa QR code (conexão não oficial), o que tem risco de bloqueio.

**Para quem serve**: quem tem um negócio com volume médio de atendimento, quer IA de verdade e tem alguém técnico na equipe (ou pode pagar uma instalação única).

**Como montar**:

1. **Tenha um servidor**: uma VPS da Hostinger por R$ 29,90/mês já roda n8n e Evolution API.
2. **Instale o n8n**: siga nosso tutorial de [como instalar o n8n na VPS](/como-instalar-n8n-vps-hostinger/).
3. **Instale a Evolution API**: siga o guia de [automatizar WhatsApp com n8n e Evolution API](/automatizar-whatsapp-com-n8n-evolution-api/).
4. **Monte o fluxo**: no n8n, crie um webhook para receber mensagens, um filtro para identificar o assunto e um nó HTTP para enviar a resposta de volta.

Se quiser IA, adicione um nó de ChatGPT ou Gemini no meio do fluxo — o cliente pergunta, a IA responde com base no que você ensinar.

## Opção 5: Plataformas com plano gratuito (Wapzen, SendPulse, Typebot)

Algumas plataformas oferecem planos gratuitos que incluem WhatsApp:

- **Wapzen**: IA gratuita no seu número, sem limite de conversas (por enquanto). A conexão não é via API oficial.
- **SendPulse**: teste grátis de 7 dias, depois planos a partir de US$ 12/mês. Usa API oficial.
- **Typebot**: 200 chats por mês no plano Free, sem WhatsApp incluso — WhatsApp só no plano Pro (US$ 89/mês).

**Vantagem**: não precisa de servidor nem de conhecimento técnico.

**Limite**: o plano Free quase sempre limita volume, funcionalidades ou tempo de uso.

**Para quem serve**: quem quer testar antes de investir.

## Qual escolher?

| Opção | Grátis? | Entende perguntas? | Risco de bloqueio | Ideal para |
|---|---|---|---|---|
| WhatsApp Business | ✅ Sim | ❌ Não | ❌ Nenhum | Quem quer só uma resposta inicial |
| Meta Business Agent | ✅ Sim (por enquanto) | ✅ Sim | ❌ Nenhum | Empresas com WhatsApp Business |
| API oficial + ferramenta | ✅ 1.000/mês | ✅ Depende da ferramenta | ❌ Nenhum | Quem usa API oficial |
| n8n + Evolution API | ✅ Só o servidor | ✅ Sim (com IA) | ⚠️ Médio (QR code) | Quem quer controle total |
| Plataforma Free | ✅ Limitado | ✅ Depende | ⚠️ Baixo a médio | Quem quer testar |

## Passo a passo: a opção mais prática para começar hoje

Se você quer algo que funciona **agora**, **entende perguntas** e **não custa nada hoje**, a ordem recomendada é:

1. **Ative as automações do WhatsApp Business** (5 minutos, zero real) — já melhora a primeira impressão.
2. **Ative o Meta Business Agent** se estiver disponível para sua conta — IA grátis sem instalar nada.
3. **Monte um fluxo no n8n** se tiver servidor ou quiser controle total — veja nosso tutorial de [automatizar WhatsApp com n8n](/automatizar-whatsapp-com-n8n-evolution-api/).

Nenhuma delas exige cartão de crédito para começar.

## Perguntas Frequentes

### Chatbot para WhatsApp é gratuito mesmo?

Sim, existem opções gratuitas reais. As automações do WhatsApp Business não custam nada. O Meta Business Agent é gratuito por enquanto. A API oficial dá 1.000 respostas grátis por mês. E ferramentas como n8n + Evolution API custam só o servidor (a partir de R$ 29/mês).

### Qual a melhor opção gratuita para pequenas empresas?

Para a maioria, o **Meta Business Agent** é o melhor custo-benefício: IA gratuita, sem instalação, direto no WhatsApp Business. Se não estiver disponível, o **n8n + Evolution API** é a alternativa mais completa, desde que você tenha um servidor.

### Preciso de cartão de crédito para começar?

Não. As automações do WhatsApp Business e o Meta Business Agent não pedem cartão. O n8n você instala no seu servidor sem cartão também.

### O que acontece depois das 1.000 respostas grátis da API?

A Meta cobra R$ 0,035 por resposta de serviço a partir da 1.001ª. Para a maioria dos pequenos negócios, 1.000 respostas por mês é suficiente. Se passar, o custo é baixo (R$ 35 a cada 1.000 respostas extras).

### Vale a pena pagar por um chatbot?

Depende do volume. Se você já perde cliente por demora no atendimento, o retorno de um chatbot pago (R$ 50 a R$ 200/mês) costuma superar o custo. Use o [diagnóstico grátis de automação](/diagnostico-automacao/) para calcular quanto sua empresa perde sem automatizar.

### Como evitar golpe de chatbot?

Desconfie de:
- Empresas que cobram taxa para "liberar" seu WhatsApp
- Promessas de chatbot que vende sozinho sem você configurar
- Conexão por QR code que pede acesso à sua conta pessoal

Plataformas sérias usam a API oficial da Meta ou são transparentes sobre o método de conexão.

---

Quer uma solução completa sem dor de cabeça? A [WebMedula](https://www.webmedula.com.br) monta o chatbot no WhatsApp da sua empresa com IA, integração com agenda e CRM, a partir de R$ 1.500. [Veja como funciona](/chatbot-whatsapp-com-ia-para-empresas-quanto-custa/) ou [faça o diagnóstico grátis](/diagnostico-automacao/).
