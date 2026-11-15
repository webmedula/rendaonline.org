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

## Redes sociais (postagem automática)

Cada artigo, calculadora, página de destaque e review de plataforma vira post sozinho. Tudo é gerado no build a partir de `src/lib/social.ts`:

| Endereço | Para que serve |
| --- | --- |
| `/social/<id>/instagram.jpg` | Imagem 1080x1350 do post (Instagram e Facebook) |
| `/social/<id>/pinterest.jpg` | Imagem vertical 1000x1500 (Pinterest) |
| `/social/<id>/og.jpg` | Imagem 1200x630 que aparece ao compartilhar o link (WhatsApp, Facebook) |
| `/social/fila.json` | Fila com legendas prontas, lida pelo robô |
| `/pinterest.xml` | Feed que o Pinterest lê sozinho (publicação automática por RSS) |
| `/links/` | Página do link da bio do Instagram |

O workflow `.github/workflows/redes-sociais.yml` roda 4 vezes ao dia e posta 1 conteúdo no Facebook e no Instagram pela API oficial da Meta. Artigo novo passa na frente; depois vem a fila por prioridade, e o que já foi postado volta a circular depois de 30 dias. O que já saiu fica registrado em `social/publicados.json`.

- Segredo necessário: `META_PAGE_TOKEN` (token da Página do Facebook, que não expira). Sem ele o robô só mostra o que postaria.
- Testar sem postar: Actions → "Redes sociais" → Run workflow → modo `teste`.
- Postar um item específico agora: Run workflow → modo `publicar` → `item` = id da fila.
- Título mais curto na imagem de um artigo: campo opcional `socialTitle` no frontmatter.
- Ganchos das calculadoras e textos das páginas ficam em `src/lib/social.ts`.
