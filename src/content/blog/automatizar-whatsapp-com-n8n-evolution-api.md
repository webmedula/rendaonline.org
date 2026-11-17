---
title: "Como automatizar o WhatsApp com n8n e Evolution API (passo a passo, com fluxo pronto)"
description: "Conecte o WhatsApp ao n8n com a Evolution API e monte um fluxo que responde mensagens, salva contatos em planilha e avisa a equipe. Tutorial completo."
pubDate: 2026-11-17
category: automacao
tags: ["n8n", "whatsapp", "evolution api", "automacao", "tutorial"]
affiliate: false
---

Instalar o n8n é a parte fácil. O que faz ele valer a pena é ligar o WhatsApp nele: a partir daí, toda mensagem que chega vira um evento que você pode responder, registrar, classificar ou encaminhar sem ninguém tocar no celular. Este tutorial mostra como fazer isso com a **Evolution API**, a ponte de código aberto mais usada no Brasil entre o WhatsApp e o n8n.

Ao final você terá um fluxo que:

1. recebe qualquer mensagem enviada ao número da empresa;
2. responde na hora com uma saudação e as opções de atendimento;
3. salva nome, número e mensagem numa planilha do Google;
4. avisa um grupo ou número da equipe quando alguém pede "falar com atendente".

Tudo com software livre, rodando na sua própria VPS. Os valores citados são aproximados.

## Antes de começar: oficial ou não oficial?

A Evolution API trabalha de dois jeitos:

| Modo | Como conecta | Vantagem | Risco |
|---|---|---|---|
| **Baileys** (não oficial) | Lê QR Code como o WhatsApp Web | Gratuito, qualquer número, sem cadastro na Meta | O número pode ser banido se mandar mensagem em massa ou agir como spam |
| **Cloud API** (oficial da Meta) | Conta no WhatsApp Business Platform | Sem risco de ban, selo de verificação possível | Cadastro na Meta, custo por conversa iniciada pela empresa |

Para **testar e para automações internas** (responder quem escreveu, registrar contatos, avisar a equipe), o modo Baileys resolve e é por onde este tutorial começa. Para **enviar mensagens a quem não escreveu primeiro** (lembretes, campanhas, cobrança), use a API oficial. É assim que fazemos em cliente, e a troca de um modo para o outro no n8n é só mudar a credencial.

## O que você vai precisar

- Uma VPS com Docker e o n8n já rodando. Se ainda não tem, siga [como instalar o n8n numa VPS da Hostinger](/como-instalar-n8n-vps-hostinger/).
- Um subdomínio apontando para a VPS para a Evolution API (ex.: `evo.seudominio.com.br`).
- Um número de WhatsApp para a empresa, de preferência um chip novo, só para isso.
- Uma conta Google para a planilha (opcional, mas usada no passo 6).

Tempo estimado: 40 minutos.

## Passo 1: subir a Evolution API com Docker

Na VPS, crie uma pasta e o arquivo de configuração:

```bash
mkdir -p ~/evolution && cd ~/evolution
nano docker-compose.yml
```

Cole:

```yaml
services:
  evolution:
    image: atendai/evolution-api:v2.2.3
    container_name: evolution
    restart: always
    ports:
      - "127.0.0.1:8080:8080"
    environment:
      - SERVER_URL=https://evo.seudominio.com.br
      - AUTHENTICATION_API_KEY=troque-por-uma-chave-longa-e-aleatoria
      - DATABASE_ENABLED=true
      - DATABASE_PROVIDER=postgresql
      - DATABASE_CONNECTION_URI=postgresql://evolution:senha-forte@postgres:5432/evolution
      - CACHE_REDIS_ENABLED=true
      - CACHE_REDIS_URI=redis://redis:6379/6
      - CACHE_REDIS_PREFIX_KEY=evolution
      - LANGUAGE=pt-BR
    volumes:
      - evolution_instances:/evolution/instances
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      - POSTGRES_USER=evolution
      - POSTGRES_PASSWORD=senha-forte
      - POSTGRES_DB=evolution
    volumes:
      - evolution_pg:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    restart: always

volumes:
  evolution_instances:
  evolution_pg:
```

Troque `seudominio.com.br`, a `AUTHENTICATION_API_KEY` (use algo como a saída de `openssl rand -hex 32`) e `senha-forte`. Depois:

```bash
docker compose up -d
docker compose logs -f evolution
```

Quando aparecer `HTTP - ON: 8080`, a API está no ar. Pressione `Ctrl+C` para sair dos logs.

## Passo 2: colocar HTTPS no subdomínio

A API ficou escutando só em `127.0.0.1:8080`. Para o WhatsApp e o n8n chegarem nela, é preciso um proxy com SSL. Se a VPS tem CyberPanel, crie o site `evo.seudominio.com.br`, emita o SSL e, em **vHost Conf**, adicione um `context` que repasse tudo para `127.0.0.1:8080`, exatamente como feito no [tutorial do n8n, passo 3](/como-instalar-n8n-vps-hostinger/). Se usa Nginx ou Traefik, o bloco é o mesmo que você já tem para o n8n, trocando a porta.

Teste no navegador: `https://evo.seudominio.com.br` deve mostrar um JSON com `"status": 200` e a versão da API.

## Passo 3: criar a instância e ler o QR Code

Acesse o gerenciador em `https://evo.seudominio.com.br/manager`, informe a URL e a `API KEY` do passo 1 e clique em **Instance +**. Dê o nome `empresa`, deixe o canal como **Baileys** e salve.

Abra a instância e clique em **Get QR Code**. No celular com o chip da empresa: WhatsApp → Mais opções → Dispositivos conectados → Conectar dispositivo → aponte para o QR. Em alguns segundos o status muda para **open**. Pronto, o número está conectado.

Duas configurações importantes na instância, na aba **Settings**:

- **Reject calls**: ligado, com a mensagem "Não atendemos ligações por aqui, mande mensagem".
- **Always online**: desligado (evita que o número pareça um robô).

## Passo 4: criar o webhook no n8n

No n8n, crie um fluxo novo e adicione um nó **Webhook**:

- HTTP Method: `POST`
- Path: `whatsapp-entrada`
- Respond: `Immediately`

Copie a **Production URL** (algo como `https://n8n.seudominio.com.br/webhook/whatsapp-entrada`). Clique em **Listen for test event** para deixá-lo esperando.

Volte à Evolution API, na instância `empresa`, aba **Webhook**:

- URL: cole a URL do n8n
- Enabled: ligado
- Webhook by events: desligado
- Events: marque só `MESSAGES_UPSERT`

Salve. Mande uma mensagem de outro celular para o número da empresa. O n8n deve receber um JSON parecido com este:

```json
{
  "event": "messages.upsert",
  "instance": "empresa",
  "data": {
    "key": { "remoteJid": "5562999990000@s.whatsapp.net", "fromMe": false },
    "pushName": "Maria",
    "message": { "conversation": "Oi, queria saber o preço" },
    "messageType": "conversation"
  }
}
```

Os campos que importam: `data.key.remoteJid` (quem mandou), `data.pushName` (nome no WhatsApp), `data.message.conversation` (texto) e `data.key.fromMe` (se foi você que enviou, para o fluxo ignorar).

## Passo 5: filtrar e responder

Adicione um nó **IF** depois do webhook com duas condições (ambas verdadeiras):

- `{{ $json.body.data.key.fromMe }}` is false
- `{{ $json.body.data.key.remoteJid }}` does not contain `@g.us` (ignora grupos)

No ramo **true**, adicione um nó **HTTP Request** para responder:

- Method: `POST`
- URL: `https://evo.seudominio.com.br/message/sendText/empresa`
- Headers: `apikey` = sua `AUTHENTICATION_API_KEY`
- Body (JSON):

```json
{
  "number": "{{ $('Webhook').item.json.body.data.key.remoteJid }}",
  "text": "Oi, {{ $('Webhook').item.json.body.data.pushName }}! Aqui é o atendimento da Empresa X. Responda com o número da opção:\n\n1 - Preços e serviços\n2 - Horário e endereço\n3 - Falar com atendente"
}
```

Ative o fluxo e mande "oi" do outro celular. A resposta deve chegar em um ou dois segundos.

Para tratar as opções, troque o nó IF por um **Switch** sobre `{{ $json.body.data.message.conversation }}` com as regras `1`, `2`, `3` e um ramo padrão. Cada ramo tem seu próprio HTTP Request com o texto certo. O ramo padrão manda o menu de novo.

## Passo 6: salvar o contato numa planilha

Crie uma planilha no Google Sheets com as colunas `data`, `nome`, `numero`, `mensagem`. No n8n, depois do IF, adicione um nó **Google Sheets** (operação **Append row**) ligado à planilha, mapeando:

- data: `{{ $now.format('dd/MM/yyyy HH:mm') }}`
- nome: `{{ $json.body.data.pushName }}`
- numero: `{{ $json.body.data.key.remoteJid.split('@')[0] }}`
- mensagem: `{{ $json.body.data.message.conversation }}`

A credencial do Google Sheets no n8n é OAuth; o próprio n8n explica como criar o app no Google Cloud na tela de credencial. Leva uns 10 minutos na primeira vez.

Com isso, toda conversa vira linha na planilha. É o CRM mais barato que existe, e dá para ligar depois a qualquer outro sistema.

## Passo 7: avisar a equipe quando alguém pede atendente

No ramo `3` do Switch, adicione mais um **HTTP Request** igual ao de resposta, mas com `number` fixo no WhatsApp da pessoa responsável (ou o ID de um grupo, no formato `1203630000000000@g.us`, que você pega chamando `GET /group/fetchAllGroups/empresa?getParticipants=false`) e o texto:

```
Novo pedido de atendimento
Nome: {{ $('Webhook').item.json.body.data.pushName }}
Número: {{ $('Webhook').item.json.body.data.key.remoteJid.split('@')[0] }}
Mensagem: {{ $('Webhook').item.json.body.data.message.conversation }}
```

E, para o cliente, responda "Já avisei a equipe, alguém fala com você em instantes". A partir daí quem atende continua a conversa pelo WhatsApp Web normal, porque a Evolution não bloqueia o uso manual do número.

## Onde a IA entra

Com o fluxo acima funcionando, trocar o menu de números por uma resposta inteligente é adicionar um nó entre o IF e o HTTP Request de resposta: o nó **OpenAI** ou **Anthropic** do n8n, com um prompt de sistema contendo os serviços, preços, horário e o tom da empresa, e a mensagem do cliente como entrada. A resposta do modelo vai para o campo `text`. Para guardar o histórico da conversa e não repetir perguntas, use o nó **Window Buffer Memory** com `remoteJid` como chave de sessão.

É exatamente essa arquitetura que descrevemos, do ponto de vista do dono do negócio, em [chatbot de WhatsApp com IA: como funciona e quanto custa](/chatbot-whatsapp-com-ia-para-empresas-quanto-custa/) e nos guias para [clínicas](/automacao-de-atendimento-para-clinicas/) e [salões de beleza](/automacao-de-atendimento-para-saloes-de-beleza/).

## Problemas comuns

- **O QR Code expira antes de ler.** Clique em Get QR Code de novo; ele renova a cada 30 segundos.
- **Webhook não chega no n8n.** Confira se a URL é a de *produção* (`/webhook/`, não `/webhook-test/`) e se o fluxo está ativado. Teste com `curl -X POST` na URL para ver se o n8n responde.
- **`fromMe` não está vindo como booleano.** Em algumas versões vem como string `"false"`. No IF, use *String → is equal to → false* em vez de *Boolean*.
- **Mensagem de áudio ou imagem quebra o fluxo.** `data.message.conversation` só existe para texto. Adicione um IF para `messageType` igual a `conversation` ou `extendedTextMessage` e responda "Por aqui só consigo ler texto" nos outros casos.
- **Número desconectou sozinho.** Acontece se o celular ficou muitos dias sem internet. Reconecte pelo QR. Para evitar isso de vez, migre para a API oficial.
- **O número foi banido.** Quase sempre por envio em massa ou por mandar mensagem a muita gente que não salvou o contato. Para campanhas, use a API oficial; o modo Baileys é para responder, não para disparar.

## Quanto custa manter isso

| Item | Custo aproximado |
|---|---|
| VPS (a mesma do n8n, 4 GB de RAM aguenta n8n + Evolution + Postgres) | R$ 40 a R$ 80/mês |
| Evolution API e n8n | R$ 0 (código aberto) |
| Chip da empresa | R$ 20 a R$ 40/mês |
| API oficial da Meta, se migrar | R$ 0 para responder quem escreveu; alguns centavos por conversa que a empresa inicia |
| IA, se ligar | R$ 30 a R$ 150/mês conforme o volume |

Ou seja: por menos de R$ 100 por mês uma pequena empresa tem atendimento automático, registro de contatos e aviso para a equipe, sem mensalidade de plataforma de chatbot.

## Na prática, na WebMedula

Na [WebMedula](/servicos/) este é o esqueleto de boa parte dos projetos de atendimento. A gente instala o n8n e a Evolution API na VPS do cliente com domínio, SSL e backup diário, conecta o número (oficial quando o cliente precisa disparar mensagens), monta o fluxo com IA treinada no negócio e liga à agenda ou ao CRM que a empresa já usa. O cliente recebe os acessos e um vídeo curto mostrando onde mexer para trocar textos e horários.

Quem quer só a base pronta para montar os próprios fluxos contrata a [instalação do n8n na VPS](/servicos/), por R$ 297, e segue este tutorial. Quem quer o atendimento inteiro funcionando, com IA e integração, contrata o [atendimento no WhatsApp com IA](/atendimento-whatsapp-com-ia/). E quem ainda não sabe o que automatizar primeiro começa pelo [diagnóstico gratuito](/diagnostico-automacao/).

## Perguntas frequentes

**Preciso deixar o celular ligado?**
No modo Baileys, o celular precisa se conectar à internet de vez em quando, como no WhatsApp Web, mas não precisa ficar ligado o tempo todo. Na API oficial, não existe celular: o número fica só na nuvem.

**Posso usar meu número atual da empresa?**
Pode, mas se ele já tem muito histórico e grupos, prefira um chip novo para a automação e mantenha o antigo para a equipe. Menos risco e menos confusão.

**A Evolution API é segura?**
Ela roda na sua VPS, só você tem a chave e as mensagens não passam por terceiros. O cuidado é o mesmo de qualquer serviço: HTTPS, chave longa, porta não exposta na internet (por isso o `127.0.0.1` no Docker).

**Dá para conectar mais de um número?**
Sim. Cada número é uma instância na mesma Evolution API, e cada instância aponta para o webhook que você quiser no n8n.

**Funciona com Typebot, Chatwoot ou Dify?**
Funciona. A Evolution tem integração nativa com os três. Mas para começar, o n8n sozinho já cobre quase tudo, e você entende o que está acontecendo.
