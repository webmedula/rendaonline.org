---
title: "Claude Code: o que é e como usar passo a passo (mesmo sem saber programar)"
description: "O que é o Claude Code, como instalar no Windows, Mac ou Linux, e 5 usos práticos para quem não programa: organizar arquivos, extrair dados, criar sites e automações."
pubDate: 2026-11-12
category: automacao
tags: ["claude code", "agentes de ia", "tutorial"]
affiliate: false
---

O **Claude Code** é um agente de IA que trabalha dentro do terminal do seu computador. Você escreve o que quer em português, e ele cria arquivos, roda comandos, escreve e corrige código, organiza pastas e monta projetos inteiros. A diferença para um chat comum é simples: o chat **responde**, o Claude Code **faz**.

Este site inteiro, por exemplo, foi reconstruído com ele: o layout, as páginas, o deploy automático. Este tutorial mostra como instalar, como dar as primeiras instruções e cinco usos práticos para quem não é programador.

## O que ele faz, na prática

Pense nele como um assistente técnico sentado no seu computador. Você diz:

- *"Organize as fotos desta pasta por ano e mês."*
- *"Leia estes 40 PDFs de notas fiscais e monte uma planilha com fornecedor, valor e data."*
- *"Crie uma página de captura com um formulário que salva os e-mails numa planilha do Google."*
- *"Esse script deu erro, descubra o motivo e corrija."*

Ele lê os arquivos, decide os passos, executa, testa, e te mostra o resultado. Quando precisa fazer algo mais sensível (apagar arquivos, instalar programas), pede sua confirmação antes.

## O que você precisa

- Um computador com **Windows 10 ou 11, macOS ou Linux**.
- **Node.js** instalado (é o que roda o programa). Versão 18 ou mais nova.
- Uma conta na Anthropic. O plano gratuito permite testar; para uso diário, os planos pagos começam em torno de US$ 20 por mês, e o uso pela API é cobrado por consumo. Confira os valores atuais no site oficial, porque mudam.

## Instalação em 5 minutos

### 1. Instale o Node.js

Baixe em [nodejs.org](https://nodejs.org) e instale com as opções padrão. Para conferir, abra o terminal (no Windows, procure por "PowerShell" no menu Iniciar) e digite:

```
node -v
```

Se aparecer um número de versão, está pronto.

### 2. Instale o Claude Code

No mesmo terminal:

```
npm install -g @anthropic-ai/claude-code
```

### 3. Entre numa pasta e inicie

Vá até a pasta em que quer trabalhar e rode:

```
cd Documentos/meu-projeto
claude
```

Na primeira vez ele abre o navegador para você entrar na sua conta. Depois disso, você já está conversando com ele dentro da pasta.

**Dica importante:** sempre inicie o Claude Code **dentro da pasta do projeto**. Ele só mexe nos arquivos dessa pasta, o que é mais seguro e evita confusão.

## Como dar instruções que funcionam

A qualidade do resultado depende da clareza do pedido. Três regras:

1. **Diga o objetivo, não o método.** Em vez de "crie um script em Python que leia CSV", diga "quero uma planilha com o total de vendas por mês a partir destes arquivos". Ele escolhe a melhor forma.
2. **Dê o contexto.** "Os arquivos estão na pasta `dados`, a coluna de valor se chama `total` e as datas estão no formato dia/mês/ano."
3. **Peça para ele explicar antes de executar, quando for algo grande.** "Antes de fazer, me diga o plano." Você revisa e manda seguir.

Exemplo completo de pedido:

> Na pasta `notas` tem 40 PDFs de notas fiscais. Extraia de cada um: nome do fornecedor, CNPJ, valor total e data de emissão. Monte um arquivo `notas.xlsx` com uma linha por nota e um total no final. Se algum PDF não der para ler, liste o nome dele no fim.

## 5 usos práticos para quem não programa

### 1. Organizar arquivos e pastas

> Organize os arquivos desta pasta em subpastas por tipo (imagens, documentos, planilhas, vídeos) e renomeie as fotos com a data em que foram tiradas.

Funciona com milhares de arquivos e leva segundos.

### 2. Extrair dados de PDFs, imagens e sites

> Abra o site [endereço] e extraia a lista de produtos com nome e preço para uma planilha.

Antes de extrair dados de qualquer site, confira os termos de uso dele e a LGPD. Dados públicos de empresas (nome, endereço, telefone comercial) costumam ser permitidos; dados pessoais, não.

### 3. Criar sites e páginas

> Crie uma landing page para um curso de confeitaria, com título, 3 benefícios, depoimentos e um botão de WhatsApp. Visual limpo, cores pastel, funciona no celular.

Ele gera o HTML, CSS e, se você pedir, publica no GitHub Pages ou na sua hospedagem. Foi assim que este site foi feito.

### 4. Montar automações

> Crie um script que, todo dia às 8h, leia a planilha `vendas.xlsx`, calcule o total do dia anterior e me envie um resumo no Telegram.

Ele escreve o script, explica como agendar e testa com você.

### 5. Entender e corrigir coisas que já existem

> Este arquivo `.htaccess` está dando erro 500 no meu site. Encontre o problema e corrija.

Ou: *"Explique o que este script faz, em português simples."* Ótimo para herdar projetos de freelancers.

## Comandos úteis dentro do Claude Code

| Comando | O que faz |
| --- | --- |
| `/help` | Lista os comandos |
| `/clear` | Limpa a conversa e começa do zero |
| `/init` | Cria um arquivo `CLAUDE.md` com instruções permanentes para o projeto |
| `/cost` | Mostra quanto a sessão atual gastou |
| `Esc` | Interrompe o que ele está fazendo |

O arquivo **CLAUDE.md** merece atenção: tudo o que você escreve nele vale para todas as conversas naquela pasta. Exemplo: "Responda sempre em português. Nunca apague arquivos sem perguntar. As planilhas ficam na pasta `dados`."

## Cuidados

- **Ele pode errar.** Revise o resultado, principalmente em dados financeiros.
- **Confirme antes de apagar ou sobrescrever.** Por padrão ele pergunta; não desative isso no começo.
- **Faça backup** da pasta antes de tarefas grandes. Um `git init` na pasta resolve: ele mesmo pode configurar.
- **Custo:** cada tarefa consome tokens. Tarefas com muitos arquivos grandes custam mais. Use `/cost` para acompanhar.
- **Dados sensíveis:** o conteúdo dos arquivos que ele lê é enviado para a Anthropic processar. Não use com dados que não podem sair do seu computador.

## Claude Code, Codex ou Gemini CLI?

Os três são agentes de terminal parecidos. O Claude Code é o mais usado por quem trabalha com código e, na nossa experiência, o que melhor entende pedidos em português e projetos grandes. O **Codex** (OpenAI) e o **Gemini CLI** (Google) são alternativas boas, e o Gemini CLI tem o plano gratuito mais generoso. Vale testar os três com o mesmo pedido e ficar com o que te atender melhor.

## Perguntas frequentes

**Preciso saber programar?**
Não. Precisa saber descrever o que quer e revisar o resultado. Com o tempo você aprende o básico só de ver o que ele faz.

**Funciona no celular?**
Não diretamente. Ele roda no computador. Existe a versão web, no site da Anthropic, que funciona no navegador do celular para projetos no GitHub.

**É gratuito?**
Tem uso gratuito limitado para testar. Para usar todo dia, é preciso um plano pago ou créditos de API.

**Ele pode estragar meu computador?**
Ele só mexe na pasta em que foi iniciado e pede confirmação para ações destrutivas. Com backup e as confirmações ligadas, o risco é pequeno.

## Próximo passo

Instale, entre numa pasta com arquivos bagunçados e peça para organizar. É o melhor primeiro teste. Depois, veja o guia [Como automatizar tarefas com IA sem programar](/como-automatizar-tarefas-com-ia-sem-programar/) para ligar o Claude Code às suas rotinas.
