---
title: "ads.txt não encontrado no AdSense: como resolver de vez (guia com os 5 motivos)"
description: "O AdSense avisa que o ads.txt não foi encontrado, mas o arquivo existe? Veja os 5 motivos reais, como testar cada um e o passo a passo para corrigir no WordPress, VPS e Cloudflare."
pubDate: 2026-11-12
category: criar-site
tags: ["adsense", "ads.txt", "monetizacao", "tutorial"]
affiliate: false
---

O aviso **"Ganhos em risco: o arquivo ads.txt não foi encontrado"** no AdSense é um dos problemas mais comuns de quem monetiza um site, e um dos mais irritantes, porque na maioria das vezes o arquivo **existe** e abre normalmente no navegador. O Google simplesmente não consegue chegar nele.

Este guia lista os cinco motivos que causam isso, como testar cada um em um minuto e como corrigir. Ele foi escrito depois de resolver exatamente esse problema aqui no Renda Online, onde o aviso ficou meses no ar e segurou a receita.

## O que o ads.txt faz

É um arquivo de texto na raiz do site (`seusite.com/ads.txt`) que diz quais empresas podem vender anúncios no seu domínio. Para o AdSense, basta uma linha:

```
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

Troque o `pub-...` pelo seu ID de editor, que fica em **AdSense → Conta → Informações da conta**. O código `f08c47fec0942fa0` é sempre o mesmo para o Google.

Sem o arquivo, o AdSense continua mostrando anúncios, mas **reduz o que você ganha**, porque muitos anunciantes só compram espaço em sites com ads.txt válido.

## Antes de tudo: o teste de 1 minuto

Abra, numa aba anônima, estes quatro endereços:

1. `https://seusite.com/ads.txt`
2. `https://www.seusite.com/ads.txt`
3. `http://seusite.com/ads.txt`
4. `http://www.seusite.com/ads.txt`

**Todos os quatro** precisam mostrar o texto do arquivo, direto ou depois de um redirecionamento limpo. Se algum deles der erro, aviso de segurança, página em branco ou uma tela de "verificando seu navegador", achou o problema. O Google testa o domínio do jeito que ele está cadastrado no AdSense, e se for a versão com `www`, é ela que precisa funcionar.

## Motivo 1: o `www` não funciona

É o mais comum, e foi o nosso caso. O site funciona em `seusite.com`, mas `www.seusite.com` não tem registro DNS ou não tem SSL, então dá erro antes de chegar no arquivo.

**Como confirmar:** o endereço 2 do teste acima dá "site não encontrado" ou "conexão não segura".

**Como corrigir:**

1. No DNS do domínio, crie um registro **A** com nome `www` apontando para o mesmo IP do site (ou um **CNAME** `www` → `seusite.com`).
2. Emita o SSL de novo para cobrir o `www`. No CyberPanel: **SSL → Manage SSL → Issue SSL**. No cPanel: **SSL/TLS Status → Run AutoSSL**. Na Hostinger compartilhada, o SSL é automático depois que o DNS propaga.
3. Redirecione o `www` para a versão sem `www` (ou o contrário, mas escolha uma) com este trecho no `.htaccess`:

```
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.seusite\.com$ [NC]
RewriteRule ^(.*)$ https://seusite.com/$1 [R=301,L]
```

Veja o [tutorial de configuração da VPS](/como-configurar-vps-hostinger-cyberpanel/) para os detalhes do DNS e do SSL.

## Motivo 2: firewall ou proteção anti-robô bloqueando o Google

Cloudflare em modo "Under Attack", Wordfence, ModSecurity, Imunify e alguns plugins de segurança bloqueiam robôs, e o robô do AdSense cai junto.

**Como confirmar:** ao abrir o ads.txt aparece uma tela de verificação antes do arquivo, ou o site dá erro 403 para ferramentas automáticas (teste em [httpstatus.io](https://httpstatus.io) colocando a URL do ads.txt: tem que retornar **200**).

**Como corrigir:**

- **Cloudflare:** em **Security → WAF → Custom rules**, crie uma regra que permita (Skip) o caminho `/ads.txt`. Ou baixe o nível de segurança para "Medium".
- **Wordfence:** em **Firewall → Blocking**, veja se há bloqueios por país ou por padrão que peguem o Google. Libere.
- **ModSecurity / Imunify (VPS):** veja o log do firewall no painel, procure por bloqueios em `/ads.txt` e adicione uma exceção.

## Motivo 3: o arquivo está no lugar errado ou com nome errado

O arquivo tem que estar na **raiz do domínio**, não dentro de `/wp-content/` nem numa subpasta, e o nome é exatamente `ads.txt`, minúsculo.

**Como confirmar:** `seusite.com/ads.txt` dá 404.

**Como corrigir:**

- **WordPress:** o jeito mais simples é o plugin oficial **Site Kit do Google**, que cria o arquivo, ou o plugin **Ads.txt Manager**. Se preferir manual, envie o arquivo pelo gerenciador de arquivos da hospedagem para a pasta `public_html`.
- **Site estático (Astro, Hugo, Next):** coloque o arquivo na pasta `public/` e faça o deploy.
- **Subdomínio:** o AdSense procura o ads.txt no **domínio raiz**. Se o seu site é `blog.seusite.com`, o arquivo precisa estar em `seusite.com/ads.txt`.

## Motivo 4: o arquivo abre, mas o conteúdo está errado

O arquivo existe, mas tem erro de formato, ou o ID do editor está errado, ou o servidor entrega como HTML em vez de texto.

**Como confirmar:** abra o ads.txt e confira: cada linha tem 3 ou 4 campos separados por vírgula; o `pub-` é o seu; não há tags HTML nem texto de tema. Com `curl -I https://seusite.com/ads.txt` (ou pelo httpstatus.io), o `Content-Type` tem que ser `text/plain`.

**Como corrigir:** refaça o arquivo só com as linhas necessárias. Se você não usa outras redes de anúncios, deixe apenas a linha do Google. Arquivos com dezenas de linhas de redes que você nem usa só aumentam a chance de erro.

## Motivo 5: cache e paciência

Você corrigiu tudo e o aviso continua. O AdSense **leva de alguns dias a algumas semanas** para reler o arquivo, e caches (do servidor, do plugin, da Cloudflare) podem entregar a versão antiga.

**Como corrigir:**

1. Limpe o cache do site (plugin de cache, LiteSpeed, Cloudflare).
2. No AdSense, em **Sites**, abra o aviso e clique em **Verificar agora** (quando disponível).
3. Espere. Se depois de 2 semanas o aviso continuar, volte ao teste de 1 minuto: alguma das quatro URLs ainda está falhando.

## Checklist final

- [ ] As quatro URLs (com e sem `www`, http e https) abrem o arquivo ou redirecionam para ele.
- [ ] A resposta é **200** e `Content-Type: text/plain`.
- [ ] O arquivo está na raiz do domínio principal, com o nome `ads.txt`.
- [ ] A linha do Google tem o seu `pub-` correto.
- [ ] Nenhum firewall ou anti-robô bloqueia `/ads.txt`.
- [ ] Cache limpo e nova verificação pedida no AdSense.

## Perguntas frequentes

**Preciso do ads.txt para ser aprovado no AdSense?**
Não é obrigatório para a aprovação, mas é obrigatório para ganhar o valor cheio. Crie assim que a conta for aprovada.

**Posso ter outras redes no arquivo?**
Pode, uma linha por rede. Mas só inclua as que você usa de verdade. Linhas de redes abandonadas são risco sem benefício.

**O aviso some sozinho depois de corrigir?**
Sim, mas leva dias. Você pode acelerar pedindo a verificação no painel do AdSense.

**Meu site é no Blogger ou em subdomínio, e agora?**
No Blogger, ative o ads.txt personalizado em **Configurações → Monetização**. Em subdomínio de terceiros (como `seusite.wordpress.com`), você não controla a raiz e o AdSense não vai funcionar; é preciso ter domínio próprio.

## Próximos passos

Com o ads.txt resolvido, o próximo ganho de receita vem do tráfego e do conteúdo. Veja o [guia para criar e monetizar um blog](/como-criar-um-blog-do-zero/) para a estratégia completa.
