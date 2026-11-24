---
title: "E-mail profissional com domínio próprio no CyberPanel: criar contas, SPF, DKIM e DMARC para não cair no spam"
description: "Crie contato@suaempresa.com.br na sua VPS com CyberPanel, configure SPF, DKIM, DMARC e PTR, teste a entrega e saiba quando vale mais usar um serviço de envio."
pubDate: 2026-11-24
category: automacao
tags: ["vps", "cyberpanel", "email", "dns", "tutorial"]
affiliate: false
---

Um e-mail `contato@suaempresa.com.br` passa mais confiança do que qualquer `suaempresa2024@gmail.com`, e se você já tem uma VPS com CyberPanel ele custa zero a mais por mês. O problema é que criar a conta leva dois minutos e fazer o e-mail **chegar na caixa de entrada** de quem recebe leva uma hora de configuração de DNS que quase ninguém faz. Este tutorial cobre as duas partes.

Ao final você terá: contas de e-mail com o seu domínio, acesso por webmail e pelo celular, SPF, DKIM e DMARC configurados, PTR reverso apontado e um teste de entrega com nota alta. Também vai saber quando **não** vale usar o servidor para enviar e-mail e o que usar no lugar. Valores citados são aproximados.

## Antes de começar

- VPS com CyberPanel e um site já criado para o domínio. Se não tem, veja [como configurar uma VPS da Hostinger com CyberPanel](/como-configurar-vps-hostinger-cyberpanel/).
- Acesso ao painel de DNS do domínio. Pode ser o DNS do próprio CyberPanel, a Cloudflare ou o registrador (Registro.br, GoDaddy, Hostinger). Os exemplos abaixo valem para qualquer um.
- Acesso root à VPS (SSH ou terminal do painel da hospedagem).
- **Porta 25 liberada.** Alguns provedores bloqueiam a porta de saída 25 em VPS novas para evitar spam. Teste antes de qualquer coisa:

```bash
timeout 5 bash -c 'cat < /dev/null > /dev/tcp/gmail-smtp-in.l.google.com/25' && echo "porta 25 aberta" || echo "porta 25 BLOQUEADA"
```

Se estiver bloqueada, abra um chamado na hospedagem pedindo a liberação (a Hostinger libera mediante pedido) ou pule para a seção "Quando não enviar pelo servidor".

## Passo 1: criar a conta de e-mail

No CyberPanel: **Email → Create Email**. Escolha o domínio, digite o nome (`contato`), uma senha forte e clique em **Create Email**. Repita para `financeiro@`, `nome@` e o que precisar. Não há limite de contas; o limite é o disco da VPS.

Dica: crie também `postmaster@` e `abuse@`, mesmo que redirecionando para `contato@`. Alguns provedores de e-mail checam se esses endereços existem antes de aceitar mensagens do seu domínio.

## Passo 2: acessar pelo webmail e pelo celular

**Webmail**: `https://seudominio.com.br:8090/rainloop` ou, pelo painel, **Email → Access Webmail**. Login com o e-mail completo e a senha.

**Celular, Outlook ou Thunderbird** (configuração manual):

| Campo | Valor |
|---|---|
| Servidor de entrada (IMAP) | `mail.seudominio.com.br`, porta 993, SSL/TLS |
| Servidor de saída (SMTP) | `mail.seudominio.com.br`, porta 465 (SSL) ou 587 (STARTTLS) |
| Usuário | o e-mail completo |
| Senha | a que você criou |

Para o `mail.seudominio.com.br` funcionar com SSL sem aviso de certificado, no CyberPanel vá em **SSL → MailServer SSL**, escolha o domínio e emita. Confira também que existe um registro `A` para `mail` apontando para o IP da VPS (o CyberPanel cria ao criar o site, mas se o DNS está na Cloudflare você precisa criar lá, **sem proxy**, nuvem cinza).

Nesse ponto o e-mail já funciona. Se parar aqui, vai cair no spam. Os próximos três passos são o que separa um e-mail de empresa de um e-mail suspeito.

## Passo 3: SPF, o "quem pode enviar por mim"

SPF é um registro `TXT` no domínio raiz que lista quais servidores têm permissão para enviar e-mail em nome dele. Para enviar só pela VPS:

```
Tipo: TXT   Nome: @   Valor: v=spf1 a mx ip4:SEU.IP.DA.VPS -all
```

Troque `SEU.IP.DA.VPS` pelo IP do servidor. Se o domínio também envia pelo Google Workspace ou por um serviço de disparo, cada um entra com um `include:`:

```
v=spf1 a mx ip4:SEU.IP.DA.VPS include:_spf.google.com -all
```

Regras importantes: **um só registro SPF por domínio** (dois registros invalidam os dois) e no máximo 10 `include`s somados. O `-all` no fim diz "quem não está na lista, rejeite"; é o que você quer.

## Passo 4: DKIM, a assinatura digital

DKIM assina cada e-mail com uma chave privada no servidor; o receptor confere com a chave pública publicada no DNS. É o fator que mais pesa para o Gmail.

No CyberPanel: **DNS → Add/Delete Records**, escolha o domínio e veja se já existe um registro `TXT` em `default._domainkey`. Se não existe, vá em **Email → DKIM Manager**, escolha o domínio e clique em **Generate Now**. O painel mostra o registro no formato:

```
Nome: default._domainkey
Tipo: TXT
Valor: v=DKIM1; k=rsa; p=MIIBIjANBgkqh...
```

Se o DNS fica no próprio CyberPanel, pronto. Se fica na Cloudflare ou no registrador, copie esse registro para lá exatamente como está (o valor é longo; alguns painéis pedem para dividir em duas strings entre aspas, e isso é normal).

Confira:

```bash
dig +short TXT default._domainkey.seudominio.com.br
```

Tem que devolver o `v=DKIM1...`. Se vier vazio, espere a propagação (minutos na Cloudflare, até algumas horas em registradores).

## Passo 5: DMARC, a política

DMARC diz ao receptor o que fazer quando SPF ou DKIM falham e para onde mandar os relatórios. Registro `TXT` em `_dmarc`:

```
Nome: _dmarc
Tipo: TXT
Valor: v=DMARC1; p=quarantine; rua=mailto:dmarc@seudominio.com.br; adkim=r; aspf=r; pct=100
```

Comece com `p=none` por uma semana se tiver dúvida se outros serviços enviam pelo domínio (um sistema de nota fiscal, um CRM); os relatórios em `dmarc@` mostram quem está enviando. Depois mude para `quarantine` e, quando tudo estiver certo, para `reject`. Desde 2024 Gmail e Yahoo exigem DMARC publicado para quem envia volume; mesmo para pouco volume, ter o registro melhora a entrega.

## Passo 6: PTR reverso e hostname

Quando sua VPS se conecta ao servidor do Gmail, ele faz a pergunta inversa: "esse IP pertence a qual nome?". Se a resposta não bater com o nome que o servidor diz ter, o e-mail perde pontos ou é recusado.

1. No painel da hospedagem (na Hostinger: VPS → Configurações → **Reverse DNS / PTR**), aponte o IP para `mail.seudominio.com.br`.
2. Na VPS, confira o hostname que o Postfix anuncia:

```bash
postconf myhostname
```

Se não for `mail.seudominio.com.br`, ajuste:

```bash
postconf -e "myhostname = mail.seudominio.com.br"
hostnamectl set-hostname mail.seudominio.com.br
systemctl restart postfix
```

3. Confira a ida e a volta:

```bash
dig +short A mail.seudominio.com.br      # deve devolver o IP da VPS
dig +short -x SEU.IP.DA.VPS              # deve devolver mail.seudominio.com.br.
```

## Passo 7: testar a entrega de verdade

Abra o webmail e envie um e-mail para o endereço temporário que o site **mail-tester.com** mostra (grátis, até alguns testes por dia). A nota vai de 0 a 10 com o detalhe de cada verificação: SPF, DKIM, DMARC, PTR, listas de bloqueio, conteúdo.

Objetivo: **9 ou 10**. Os descontos mais comuns e a correção:

| Aviso | Causa | Correção |
|---|---|---|
| SPF fail / softfail | IP fora do registro ou dois registros SPF | Revise o passo 3 |
| DKIM not signed | Chave não gerada ou não publicada | Passo 4; `dig` tem que devolver a chave |
| No DMARC | Registro ausente | Passo 5 |
| PTR mismatch | Reverso não aponta para o hostname | Passo 6 |
| Listed in blacklist | IP da VPS com histórico ruim | Pedir remoção na lista indicada; se persistir, troque o IP na hospedagem |

Depois, mande um e-mail para um Gmail seu e abra **Mostrar original**: deve aparecer `SPF: PASS`, `DKIM: PASS`, `DMARC: PASS`.

## Quando não enviar pelo servidor

O e-mail da VPS é excelente para o que uma pequena empresa manda no dia a dia: resposta a cliente, orçamento, nota fiscal, confirmação de pedido. Para três casos, use um serviço de envio no lugar:

1. **Campanhas e newsletters** (centenas ou milhares de destinatários de uma vez). O IP de uma VPS não tem reputação para isso e vai parar em lista de bloqueio.
2. **E-mails transacionais em volume** gerados por sistema (loja, SaaS, automações do n8n): a entrega precisa ser garantida e monitorada.
3. **Porta 25 bloqueada** sem liberação pela hospedagem.

Nesses casos, um serviço de SMTP transacional (Brevo, Resend, Amazon SES, Mailgun, SendGrid; vários têm plano grátis de centenas de e-mails por dia e cobram em torno de US$ 1 a US$ 15 por 10 mil e-mails, aproximadamente) resolve. Você continua **recebendo** na VPS e só o **envio** passa por eles: basta adicionar o `include:` do serviço no SPF e o DKIM que ele fornece. No n8n, é só trocar a credencial SMTP.

## Manutenção mínima

- **Backup** das caixas: elas ficam em `/home/vmail/seudominio.com.br/`. O backup do CyberPanel inclui e-mails se a opção estiver marcada; veja [backup automático da VPS com CyberPanel](/backup-automatico-vps-cyberpanel/) para a cópia externa.
- **Disco**: caixa de e-mail cresce. Em **Email → List Emails** dá para ver o uso por conta. Oriente a equipe a apagar ou arquivar anexos antigos, ou defina cota ao criar a conta.
- **Reputação**: uma vez por mês, mande um e-mail de teste pelo mail-tester e confira se a nota se manteve. Se caiu, o IP pode ter entrado em lista.
- **Senhas**: e-mail é o alvo número um de invasão. Senha forte e única por conta; troque a de quem sai da empresa no mesmo dia.

## Quanto custa

| Opção | Custo aproximado mensal | Para quem |
|---|---|---|
| E-mail na própria VPS (este tutorial) | R$ 0 além da VPS que você já paga | Pequena empresa, poucas contas, uso normal |
| Google Workspace | ~R$ 30 a R$ 40 por usuário | Equipe que vive no Google (Drive, Meet, Agenda) |
| Microsoft 365 Business | ~R$ 30 a R$ 60 por usuário | Equipe que vive no Office |
| Zoho Mail | grátis até 5 usuários (limitado); ~R$ 5 a R$ 20 por usuário | Quem quer sair da VPS gastando pouco |
| Serviço SMTP transacional (só envio) | grátis a ~US$ 15 por 10 mil e-mails | Sistemas, automações, campanhas |

Para uma empresa com 3 a 5 pessoas, a VPS economiza de R$ 100 a R$ 200 por mês em relação ao Workspace. O custo oculto é o tempo de quem configura e mantém, que este tutorial tenta reduzir a quase zero.

## Na prática, na WebMedula

Na [WebMedula](/servicos/) o e-mail profissional faz parte da entrega da [VPS com CyberPanel configurada](/servicos/): criamos as contas, emitimos o SSL do servidor de e-mail, publicamos SPF, DKIM e DMARC, apontamos o PTR e só entregamos com nota 10 no teste de entrega e `PASS` nos três cabeçalhos do Gmail. Para clientes que enviam e-mail por sistema (loja, n8n, agendamento), configuramos um serviço de SMTP transacional para o envio e deixamos o recebimento na VPS, com os dois no mesmo SPF.

Quem prefere não ter servidor nenhum contrata a [hospedagem gerenciada](/servicos/), que inclui e-mail com domínio próprio, backup diário e suporte pelo WhatsApp. E quem já tem a VPS e só quer que alguém cuide dela, inclusive do e-mail, contrata a manutenção mensal, também em [serviços](/servicos/).

## Perguntas frequentes

**Meu e-mail está caindo no spam mesmo com tudo configurado. O que mais pode ser?**
Três causas comuns: IP da VPS em lista de bloqueio (confira no mail-tester e no MXToolbox), conteúdo do e-mail com cara de spam (só imagem, muitos links, assunto em maiúsculas) e domínio muito novo sem histórico. Para a última, mande e-mails normais por algumas semanas e peça para os destinatários responderem; a reputação se constrói.

**Posso usar o Gmail para ler e enviar pelo meu domínio?**
Pode. No Gmail, em Configurações → Contas → "Enviar e-mail como", adicione o endereço e use `mail.seudominio.com.br`, porta 465, com o e-mail e a senha. Para receber, use "Verificar e-mails de outras contas" (POP) ou simplesmente redirecione a conta da VPS para o Gmail no CyberPanel (**Email → Email Forwarding**).

**Quantas contas posso criar?**
Quantas quiser. O limite é espaço em disco e, na prática, a reputação: muitas contas enviando muito de um IP só pedem um serviço de envio dedicado.

**O DNS do domínio precisa estar no CyberPanel?**
Não. Pode ficar na Cloudflare ou no registrador. Só garanta que os registros `A` de `mail`, `MX`, `TXT` de SPF, DKIM e DMARC estejam publicados lá, e que `mail` não passe pelo proxy da Cloudflare.

**E se a porta 25 continuar bloqueada?**
Receber continua funcionando (entrada é na porta 25 do seu servidor, que a hospedagem não bloqueia). Para enviar, use um serviço de SMTP transacional pela porta 587, como explicado acima.

**DKIM com chave de 1024 ou 2048 bits?**
2048, sempre que o painel de DNS aceitar o registro longo. O CyberPanel gera 2048 por padrão nas versões recentes.
