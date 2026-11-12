---
title: "Como instalar o n8n numa VPS da Hostinger (com Docker e SSL, passo a passo)"
description: "Instale o n8n na sua VPS da Hostinger em 20 minutos, com Docker, domínio próprio e HTTPS, e tenha automações ilimitadas sem pagar mensalidade."
pubDate: 2026-11-12
category: automacao
tags: ["n8n", "vps", "hostinger", "docker", "tutorial"]
affiliate: true
---

O **n8n** é a ferramenta de automação que mais usamos aqui. Na nuvem deles, o plano começa em torno de 20 euros por mês e limita o número de execuções. Instalado na sua própria VPS, é **gratuito e ilimitado**: você paga só o servidor, que já serve para seus sites.

Este tutorial instala o n8n numa VPS da Hostinger usando **Docker**, com domínio próprio e HTTPS automático. Leva uns 20 minutos. Se a sua VPS ainda não existe, veja antes o [tutorial de configuração da VPS com CyberPanel](/como-configurar-vps-hostinger-cyberpanel/). Os links da Hostinger são de afiliado.

## O que você vai precisar

- Uma VPS com pelo menos **2 GB de RAM** (o KVM 1 da Hostinger serve; o KVM 2 é mais folgado se já roda sites).
- Acesso SSH como root.
- Um **subdomínio** para o n8n, como `n8n.seusite.com`, apontando para o IP da VPS (registro A).

## Caminho rápido: o modelo pronto da Hostinger

Se a VPS ainda não foi criada, a Hostinger tem um modelo **"Ubuntu com n8n"** que instala tudo sozinho. Na criação da VPS, escolha esse modelo, e pule para o passo 5 deste tutorial para configurar o domínio e o SSL.

Se a VPS já existe (com CyberPanel, por exemplo), siga o caminho manual abaixo. Ele funciona em qualquer VPS Ubuntu.

## Passo 1: instalar o Docker

Entre na VPS por SSH:

```
ssh root@SEU-IP
```

Instale o Docker com o script oficial:

```
curl -fsSL https://get.docker.com | sh
docker --version
```

## Passo 2: criar a pasta e o arquivo de configuração

```
mkdir -p /opt/n8n && cd /opt/n8n
```

Crie o arquivo `docker-compose.yml`:

```
nano docker-compose.yml
```

Cole o conteúdo abaixo, trocando `n8n.seusite.com` pelo seu subdomínio, `seu@email.com` pelo seu e-mail e definindo uma senha forte:

```yaml
services:
  traefik:
    image: traefik:v3.1
    restart: always
    command:
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--entrypoints.web.http.redirections.entrypoint.to=websecure"
      - "--certificatesresolvers.le.acme.tlschallenge=true"
      - "--certificatesresolvers.le.acme.email=seu@email.com"
      - "--certificatesresolvers.le.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./letsencrypt:/letsencrypt
      - /var/run/docker.sock:/var/run/docker.sock:ro

  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    environment:
      - N8N_HOST=n8n.seusite.com
      - N8N_PROTOCOL=https
      - N8N_PORT=5678
      - WEBHOOK_URL=https://n8n.seusite.com/
      - GENERIC_TIMEZONE=America/Sao_Paulo
      - TZ=America/Sao_Paulo
      - N8N_ENCRYPTION_KEY=troque-por-uma-chave-longa-e-aleatoria
    volumes:
      - ./data:/home/node/.n8n
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.n8n.rule=Host(`n8n.seusite.com`)"
      - "traefik.http.routers.n8n.entrypoints=websecure"
      - "traefik.http.routers.n8n.tls.certresolver=le"
      - "traefik.http.services.n8n.loadbalancer.server.port=5678"
```

Salve com `Ctrl+O`, `Enter`, e saia com `Ctrl+X`.

O **Traefik** é o que cuida do HTTPS: ele pede o certificado no Let's Encrypt e renova sozinho. A `N8N_ENCRYPTION_KEY` protege as senhas que você vai guardar no n8n; gere uma com `openssl rand -hex 32` e **guarde num lugar seguro**, porque sem ela os dados não abrem.

## Passo 3: atenção se a VPS já tem CyberPanel

O CyberPanel já usa as portas 80 e 443 para os seus sites. Nesse caso, o Traefik não pode usar as mesmas portas. Duas opções:

**Opção A (mais simples):** remova o serviço `traefik` do arquivo, deixe só o `n8n` e troque as `labels` por:

```yaml
    ports:
      - "127.0.0.1:5678:5678"
```

Depois, no CyberPanel, crie o site `n8n.seusite.com`, emita o SSL e, em **Websites → Manage → Rewrite Rules**, coloque:

```
RewriteEngine On
RewriteRule ^(.*)$ http://127.0.0.1:5678/$1 [P,L]
```

Assim o OpenLiteSpeed faz o HTTPS e repassa para o n8n.

**Opção B:** use uma VPS separada só para o n8n. Mais limpo, custa outro servidor.

## Passo 4: subir o n8n

```
docker compose up -d
docker compose logs -f n8n
```

Quando aparecer `Editor is now accessible via: https://n8n.seusite.com`, está no ar. Saia dos logs com `Ctrl+C`.

## Passo 5: primeiro acesso

Abra `https://n8n.seusite.com`. Na primeira vez, ele pede para criar o usuário dono (nome, e-mail e senha). Esse é o seu login.

Depois, em **Settings → Usage and plan**, ative a licença gratuita da comunidade com o seu e-mail: ela libera recursos extras (histórico de execuções, pastas) sem custo.

## Passo 6: a primeira automação, para testar

1. Clique em **Add workflow**.
2. Adicione o nó **Schedule Trigger** e configure para rodar a cada 1 hora.
3. Adicione o nó **HTTP Request** com a URL `https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current_weather=true` (previsão do tempo em São Paulo, sem precisar de chave).
4. Adicione o nó **Telegram** (crie um bot com o @BotFather, pegue o token e o seu chat ID) e envie a temperatura.
5. Clique em **Test workflow**. Se a mensagem chegar, está tudo funcionando. Ative o fluxo.

A partir daí, siga os fluxos do guia [Como automatizar tarefas com IA sem programar](/como-automatizar-tarefas-com-ia-sem-programar/).

## Manutenção

**Atualizar o n8n** (faça a cada mês, as versões novas trazem nós de IA novos):

```
cd /opt/n8n && docker compose pull && docker compose up -d
```

**Backup:** a pasta `/opt/n8n/data` tem tudo (fluxos, credenciais, histórico). Inclua ela no backup da VPS. Um `tar czf n8n-backup.tgz /opt/n8n` antes de cada atualização é um bom hábito.

**Ver se está rodando:**

```
docker compose ps
```

**Reiniciar:**

```
docker compose restart n8n
```

## Problemas comuns

**O SSL não é emitido.** O subdomínio não propagou, ou as portas 80/443 estão fechadas no firewall da Hostinger. Confira os dois e rode `docker compose logs traefik`.

**Webhooks não funcionam.** A variável `WEBHOOK_URL` precisa ser exatamente `https://n8n.seusite.com/`, com barra no final.

**"Secure cookie" ao abrir.** Você abriu pelo IP e não pelo domínio com HTTPS. Use o domínio.

**Memória cheia.** Fluxos com muitas execuções enchem o banco. Em **Settings → Executions**, configure para apagar execuções antigas após 7 dias.

## Quanto custa

Zero além da VPS. Um KVM 1 ou KVM 2 da Hostinger roda o n8n e seus sites juntos. Comparado ao plano da nuvem do n8n, você economiza a partir de 20 euros por mês e não tem limite de execuções. É uma das melhores relações custo-benefício em automação hoje.
