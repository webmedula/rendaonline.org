---
title: "VPS Hostinger: como configurar do zero com CyberPanel (tutorial 2026)"
description: "Passo a passo para configurar uma VPS da Hostinger com CyberPanel: escolher o plano, instalar o painel, criar o site, emitir SSL, apontar o domínio e proteger o servidor."
pubDate: 2026-11-12
category: criar-site
tags: ["vps", "hostinger", "cyberpanel", "tutorial"]
affiliate: true
---

Uma VPS é um servidor só seu. Em vez de dividir a máquina com centenas de sites, como na hospedagem compartilhada, você tem processador, memória e disco reservados, e pode instalar o que quiser: sites, n8n, ferramentas de IA, bancos de dados. Custa um pouco mais, mas é o que permite crescer sem trocar de hospedagem.

Este tutorial mostra como configurar uma VPS da **Hostinger** com o **CyberPanel**, do zero até o site no ar com SSL. É a configuração que usamos aqui no Renda Online. Os links da Hostinger são de afiliado.

## Por que VPS e por que CyberPanel

**VPS** em vez de compartilhada quando você:

- Vai rodar mais de um site.
- Quer instalar n8n, Ollama ou outras ferramentas.
- Precisa de velocidade de verdade (LiteSpeed com cache no servidor).
- Quer controle sobre PHP, firewall e backups.

**CyberPanel** porque é gratuito, usa o servidor **OpenLiteSpeed** (um dos mais rápidos para WordPress) e tem painel visual para criar sites, e-mails, SSL e backups. A alternativa mais conhecida, o cPanel, custa a partir de US$ 20 por mês só a licença.

## Passo 1: escolher o plano

Na Hostinger, os planos de VPS vão de 1 a 8 vCPUs. Para começar:

| Uso | Plano recomendado |
| --- | --- |
| 1 a 3 sites WordPress | KVM 1 (1 vCPU, 4 GB) |
| Sites + n8n + automações | KVM 2 (2 vCPUs, 8 GB) |
| IA local (Ollama) ou muitos sites | KVM 4 ou mais |

O KVM 2 é o melhor custo-benefício para quem vai seguir os tutoriais deste site. Os preços mudam com promoções; confira na página da Hostinger.

Na hora de criar, escolha:

- **Localização:** Brasil (São Paulo), para menor latência.
- **Sistema:** a Hostinger oferece modelos prontos. Escolha **"Ubuntu 22.04 com CyberPanel"** (ou a versão mais nova disponível). Isso já instala o painel.
- **Senha do root:** forte, e guarde num gerenciador de senhas.

Em poucos minutos a VPS fica pronta. Anote o **IP** que aparece no painel da Hostinger.

## Passo 2: entrar no CyberPanel

Abra no navegador:

```
https://SEU-IP:8090
```

O navegador vai reclamar do certificado (é normal nessa primeira vez; clique em avançar). O usuário é `admin` e a senha inicial está no painel da Hostinger, em *VPS → Visão geral → Informações do painel*. Ou, se não aparecer, pegue pelo terminal:

```
cat /root/.litespeed_password
```

Primeira coisa a fazer: em **Users → Modify User → admin**, troque a senha.

## Passo 3: apontar o domínio

No lugar em que você registrou o domínio (Registro.br, Hostinger, GoDaddy):

- Crie um registro **A** com nome `@` (ou vazio) apontando para o IP da VPS.
- Crie um registro **A** com nome `www` apontando para o mesmo IP.

A propagação leva de minutos a algumas horas. Para conferir, use [dnschecker.org](https://dnschecker.org).

**Não pule o `www`.** Sem ele, o SSL não cobre `www.seusite.com`, e o AdSense pode não encontrar o `ads.txt`. Foi exatamente esse erro que travou a receita deste site por meses.

## Passo 4: criar o site

No CyberPanel: **Websites → Create Website**.

- **Package:** Default.
- **Owner:** admin.
- **Domain Name:** `seusite.com` (sem www).
- **Email:** o seu.
- **PHP:** a versão mais nova (8.3 ou superior).
- Marque **SSL** e **DKIM Support** se for usar e-mail.

Clique em **Create Website**. A pasta do site fica em `/home/seusite.com/public_html`.

Se for usar WordPress, em **Websites → List → Manage → WP Install** o CyberPanel instala com um clique. Depois, no WordPress, instale o plugin **LiteSpeed Cache**, que conversa direto com o servidor.

## Passo 5: emitir o SSL

Com o DNS já propagado: **SSL → Manage SSL → selecione o site → Issue SSL**. Ele emite um certificado gratuito do Let's Encrypt que cobre `seusite.com` e `www.seusite.com`, e renova sozinho.

Teste abrindo `https://seusite.com` e `https://www.seusite.com`. Os dois têm que abrir com o cadeado, sem aviso.

Para forçar HTTPS e o domínio sem www, coloque no `.htaccess` da pasta do site (**Websites → Manage → Rewrite Rules**):

```
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.seusite\.com$ [NC]
RewriteRule ^(.*)$ https://seusite.com/$1 [R=301,L]
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://seusite.com/$1 [R=301,L]
```

## Passo 6: proteger o servidor

Cinco ajustes que levam 10 minutos e evitam a maioria dos problemas:

1. **Firewall:** em **Security → Firewall**, deixe abertas só as portas 22 (SSH), 80, 443, 8090 (painel) e 25/465/587 se for usar e-mail.
2. **SSH por chave, sem senha.** Gere uma chave no seu computador (`ssh-keygen -t ed25519`), coloque a pública em `/root/.ssh/authorized_keys` e, em `/etc/ssh/sshd_config`, defina `PasswordAuthentication no`. Reinicie com `systemctl restart sshd`. Teste a chave **antes** de desativar a senha.
3. **Atualizações:** `apt update && apt upgrade -y` uma vez por mês.
4. **Backups:** em **Backup → Create Backup** agende backups diários para um destino externo (Google Drive ou S3, configurado em **Backup → Add Destination**). A Hostinger também oferece backups semanais da VPS inteira no painel dela.
5. **ModSecurity:** em **Security → ModSecurity Conf**, ative. Ele bloqueia ataques comuns. Se bloquear algo legítimo (como o robô do AdSense), ajuste as regras em vez de desligar.

## Passo 7: um usuário por site (opcional, recomendado)

O CyberPanel cria um usuário Linux para cada site, com acesso só à pasta daquele site. Descubra o nome com:

```
stat -c %U /home/seusite.com/public_html
```

Use esse usuário, e não o root, para deploys automáticos (GitHub Actions, por exemplo). Assim, se a chave vazar, o estrago fica limitado a um site. Para liberar o SSH para ele:

```
usermod -s /bin/bash NOME_DO_USUARIO
```

e adicione o nome na linha `AllowUsers` do `sshd_config`, se ela existir.

## Problemas comuns

**O painel não abre na porta 8090.** Confira o firewall da Hostinger (no painel dela, em *Firewall*) e o do CyberPanel. Os dois precisam liberar a porta.

**SSL falha com "DNS problem".** O domínio ainda não propagou, ou o `www` não tem registro. Espere e tente de novo.

**Site abre com erro 500.** Quase sempre é uma regra errada no `.htaccess`. Comente as linhas novas e teste.

**Erro 403 para robôs (Google, AdSense).** O ModSecurity ou o Imunify pode estar bloqueando. Veja o log em **Security → ModSecurity → Logs** e libere o que for legítimo.

## Quanto custa manter

| Item | Custo aproximado |
| --- | --- |
| VPS KVM 2 | R$ 40 a R$ 70 por mês, conforme a promoção |
| CyberPanel | Gratuito |
| SSL | Gratuito (Let's Encrypt) |
| Domínio .com.br | Cerca de R$ 40 por ano |

Por menos de R$ 100 por mês você tem servidor para vários sites, n8n e automações. Com um único site de afiliados dando resultado, já se paga.

## Próximos passos

- [Como instalar o n8n na VPS](/como-instalar-n8n-vps-hostinger/) para rodar automações ilimitadas.
- [Como criar um blog do zero](/como-criar-um-blog-do-zero/) para montar o site em cima dessa base.
