# rendaonline.org

Site estático do Renda Online, feito com [Astro](https://astro.build). Cada artigo é um arquivo Markdown em `src/content/blog/`.

## Comandos

| Comando           | O que faz                                   |
| ----------------- | ------------------------------------------- |
| `npm install`     | Instala as dependências                     |
| `npm run dev`     | Abre o site local em `localhost:4321`       |
| `npm run build`   | Gera o site pronto em `dist/`               |
| `npm run preview` | Mostra o `dist/` gerado                     |
| `npm run check`   | Confere erros de tipo e de conteúdo         |

## Escrever um artigo

Crie `src/content/blog/<slug-do-artigo>.md`. O nome do arquivo vira a URL (`/slug-do-artigo/`).

```md
---
title: "Título do artigo"
description: "Resumo de até 160 caracteres, aparece no Google."
pubDate: 2026-11-15
updatedDate: 2026-11-20        # opcional
category: ferramentas           # ia-conteudo | automacao | ferramentas | criar-site
tags: ["ia", "gratis"]
image: /images/slug-do-artigo.webp   # opcional, 1200x630
imageAlt: "Descrição da imagem"
affiliate: true                 # mostra o aviso de links de afiliado
draft: false                    # true esconde o artigo
---

Texto do artigo em Markdown.
```

Imagens ficam em `public/images/`.

## Deploy

Cada push na branch `main` roda o workflow em `.github/workflows/deploy.yml`: ele gera o site e envia a pasta `dist/` por rsync para a VPS.

Segredos necessários no repositório (Settings → Secrets and variables → Actions):

| Segredo       | Valor                                                   |
| ------------- | ------------------------------------------------------- |
| `VPS_HOST`    | IP ou domínio da VPS                                    |
| `VPS_USER`    | Usuário SSH                                             |
| `VPS_PORT`    | Porta SSH (opcional, padrão 22)                         |
| `VPS_PATH`    | Pasta pública do site, ex.: `/home/rendaonline.org/public_html` |
| `VPS_SSH_KEY` | Chave privada SSH (a pública vai em `~/.ssh/authorized_keys` na VPS) |

Redirecionamentos de URLs antigas ficam em `public/.htaccess`.
