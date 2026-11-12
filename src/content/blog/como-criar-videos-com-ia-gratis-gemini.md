---
title: "Como criar vídeos com IA de graça usando o Gemini (tutorial + modelo de prompt)"
description: "Passo a passo para gerar clipes de vídeo com IA no Gemini sem pagar, juntar em um vídeo completo no CapCut e publicar no YouTube, TikTok ou Instagram. Com modelo de prompt."
pubDate: 2026-11-12
category: ia-conteudo
tags: ["gemini", "video com ia", "veo", "tutorial"]
affiliate: false
---

Dá para criar vídeos curtos com IA sem pagar nada: o **Gemini** gera clipes de alguns segundos com o modelo **Veo**, e o **CapCut** junta tudo, coloca narração e legenda. Este tutorial mostra o fluxo completo, do prompt ao vídeo publicado, e termina com um modelo de prompt para você copiar.

Um aviso antes de começar: o plano gratuito do Gemini tem uma **cota pequena de vídeos por dia** (na data em que escrevemos, poucos clipes diários, e o número muda com frequência). O método aqui foi pensado para isso: poucos clipes bem escolhidos, e o resto do vídeo feito com imagens, texto e narração.

## O que você vai produzir

Um vídeo vertical de 30 a 60 segundos, no formato de Shorts, Reels ou TikTok, com:

- 2 a 4 clipes gerados pelo Gemini,
- narração (gravada por você ou gerada por IA),
- legendas automáticas,
- música de fundo.

Esse formato é o que mais cresce nas plataformas e o que mais cabe na cota gratuita.

## Passo 1: o roteiro (5 minutos)

Antes de gerar qualquer clipe, defina o que o vídeo diz. Use o Gemini ou o Claude com este pedido:

> Escreva um roteiro de 45 segundos para um vídeo vertical sobre **[tema]**. Estrutura: gancho de 5 segundos que gera curiosidade, 3 pontos de 10 segundos cada, e uma chamada final de 5 segundos. Linguagem falada, frases curtas. Para cada trecho, descreva em uma linha a cena que deveria aparecer na tela.

O resultado te dá o texto da narração **e** a descrição de cada cena. As descrições viram os prompts de vídeo.

## Passo 2: gerar os clipes no Gemini

1. Abra [gemini.google.com](https://gemini.google.com) e entre com a conta Google.
2. Clique em **Vídeo** nas opções (ou escreva "gere um vídeo de..." e o Gemini entende).
3. Cole o prompt da cena. Exemplo:

> Gere um vídeo vertical, 9:16, de uma mesa de trabalho vista de cima, com um notebook aberto, uma caneca de café fumegante e a luz da manhã entrando pela janela. Movimento lento da câmera se aproximando do notebook. Estilo realista, cores quentes, sem texto na imagem.

4. Espere a geração (de 30 segundos a alguns minutos).
5. Baixe o clipe pelo botão de download.

Repita para cada cena. Com a cota gratuita, gere primeiro as cenas do gancho e do final, que são as mais importantes. Os pontos do meio podem ser imagens estáticas com movimento (o CapCut faz isso).

### O que funciona nos prompts de vídeo

- **Formato explícito:** "vertical, 9:16" para Shorts e Reels; "16:9" para YouTube normal.
- **Uma ação por clipe.** Cenas com muita coisa acontecendo saem confusas.
- **Movimento de câmera:** "câmera se aproxima lentamente", "câmera gira em volta", "câmera parada".
- **Estilo:** "realista", "cinematográfico", "animação 3D", "aquarela".
- **Sem texto e sem rosto em close**, pelo menos no começo. Texto sai errado e rostos muito próximos ainda ficam estranhos.
- **Sem marcas e sem pessoas reais.** Além de não funcionar bem, pode violar os termos de uso.

## Passo 3: imagens para as cenas restantes

Para as cenas que não couberam na cota de vídeo, gere imagens no próprio Gemini (a cota de imagens é maior):

> Gere uma imagem vertical 9:16 de [descrição da cena], estilo realista, cores quentes, sem texto.

Gere 2 variações por cena e escolha a melhor. No CapCut, uma imagem com zoom lento parece um clipe e ninguém nota a diferença.

## Passo 4: narração

Duas opções:

- **Sua voz**, gravada no celular. Converte melhor, porque é real. Grave num cômodo pequeno, perto do microfone.
- **Voz de IA**, se você não quer aparecer. O **ElevenLabs** tem a voz mais natural em português e dá cerca de 10 minutos grátis por mês; o **CapCut** tem narração gratuita embutida, um pouco mais robótica.

Cole o roteiro, gere o áudio e baixe.

## Passo 5: montar no CapCut

1. Instale o **CapCut** (celular ou computador). É gratuito.
2. Crie um projeto novo em **9:16**.
3. Importe os clipes, as imagens e o áudio da narração.
4. Coloque a narração na linha de áudio e distribua os clipes e imagens em cima, na ordem do roteiro.
5. Nas imagens, aplique um **zoom lento** (Animação → Entrada → Zoom) para dar movimento.
6. **Legendas:** Texto → Legendas automáticas → Português. Revise as palavras erradas.
7. **Música:** Áudio → Sons, filtre por "sem direitos autorais" e deixe o volume em 10 a 15%.
8. Exporte em 1080p.

## Passo 6: publicar

- **YouTube Shorts:** título com a pergunta que o vídeo responde, até 60 caracteres.
- **Instagram Reels e TikTok:** a legenda importa mais que o título. Use a primeira linha como gancho.
- Publique o mesmo vídeo nas três plataformas. O custo é zero e o alcance é diferente em cada uma.

## Modelo de prompt para copiar

Troque os colchetes e use no Gemini:

```
Gere um vídeo [vertical 9:16 / horizontal 16:9] de [cena: o que aparece, onde, em que momento do dia].
Ação: [uma única ação acontecendo].
Câmera: [parada / se aproximando lentamente / girando em volta / seguindo o objeto].
Estilo: [realista / cinematográfico / animação 3D / ilustração].
Iluminação: [luz natural da manhã / luz de fim de tarde / luz de estúdio / neon].
Cores: [quentes / frias / vibrantes / tons pastel].
Sem texto, sem logotipos, sem rostos em close.
```

## Vale a pena pagar pelo Gemini?

O plano pago do Google (o AI Pro, dentro do Google One) libera mais vídeos por dia, clipes mais longos e qualidade maior. Faz sentido se você vai publicar todo dia. Para quem está começando, a cota gratuita com o método deste tutorial (poucos clipes + imagens + narração) é suficiente para 3 a 5 vídeos por semana.

## Erros comuns

- **Gastar a cota em testes.** Escreva o roteiro e as cenas antes de gerar qualquer clipe.
- **Vídeo só com clipes de IA e sem narração própria.** Fica genérico e as plataformas estão reduzindo o alcance desse tipo de conteúdo. A narração com a sua opinião é o que diferencia.
- **Legendas sem revisão.** A transcrição automática erra nomes e termos técnicos.
- **Esquecer o gancho.** Os primeiros 2 segundos decidem se a pessoa continua. Comece pela cena mais forte.

## Perguntas frequentes

**Posso monetizar vídeos feitos com IA?**
Pode, desde que o vídeo tenha valor próprio: roteiro seu, narração ou comentário seu. O YouTube desmonetiza canais que só publicam conteúdo repetitivo gerado por IA, sem edição ou ponto de vista.

**Os vídeos do Gemini têm marca d'água?**
Têm uma marca invisível (SynthID) que identifica que foram gerados por IA. Não aparece na tela e não impede o uso.

**Qual a duração máxima de cada clipe?**
Poucos segundos por clipe no plano gratuito. Por isso o método junta vários clipes curtos com imagens e narração.

**Dá para fazer no celular?**
Dá. O Gemini e o CapCut funcionam no celular. O computador só facilita a organização dos arquivos.

## Próximos passos

- Veja o [guia completo de IA para criar textos, imagens e vídeos](/guia-ia-para-criar-textos-imagens-e-videos/) para o fluxo de conteúdo inteiro.
- Use as [ferramentas de IA gratuitas](/melhores-ferramentas-de-ia-gratuitas/) para a narração e as imagens.
- Automatize a publicação com o guia de [automação sem programar](/como-automatizar-tarefas-com-ia-sem-programar/).
