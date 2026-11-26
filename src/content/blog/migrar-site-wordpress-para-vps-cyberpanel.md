---
title: "Como migrar um site WordPress para uma VPS com CyberPanel sem derrubar o site (passo a passo)"
description: "Mova seu WordPress da hospedagem compartilhada para uma VPS com CyberPanel e LiteSpeed: cópia, banco, DNS, SSL, cache e checklist final, com o site no ar o tempo todo."
pubDate: 2026-11-26
category: automacao
tags: ["vps", "cyberpanel", "wordpress", "migracao", "tutorial"]
affiliate: false
---

Site WordPress em hospedagem compartilhada costuma funcionar bem até o dia em que não funciona: fica lento no horário de pico, cai quando um plugin pesa, o suporte responde em 48 horas e o plano "ilimitado" tem um limite de processos que ninguém contou. A mudança para uma VPS com CyberPanel resolve isso, e o medo de "e se o site cair durante a migração" é o que mais segura as pessoas.

Este tutorial faz a migração **com o site no ar o tempo todo**: você monta a cópia na VPS, testa com o domínio apontado só no seu computador e, quando estiver tudo certo, troca o DNS. Se algo der errado, o site antigo continua respondendo. Tempo estimado: 1h30 para um site de tamanho médio. Valores citados são aproximados.

## Antes de começar

- **VPS com CyberPanel instalado**, com um site ainda não criado para o domínio. Se não tem, veja [como configurar uma VPS da Hostinger com CyberPanel](/como-configurar-vps-hostinger-cyberpanel/).
- **Acesso ao painel da hospedagem atual** (cPanel, Plesk, hPanel) ou, no mínimo, FTP e phpMyAdmin.
- **Acesso ao painel de DNS** do domínio (registrador ou Cloudflare).
- **Acesso de administrador ao WordPress** atual.
- **Um backup completo** feito antes de tocar em qualquer coisa. Mesmo que a hospedagem faça backup, faça o seu: na seção de backup do painel ou com um plugin como UpdraftPlus ou All-in-One WP Migration.

Anote também o **TTL** atual do registro A do domínio no DNS e baixe para 300 segundos (5 minutos) agora. Assim, quando você trocar o DNS no fim, a propagação será rápida.

## Visão geral do caminho

1. Criar o site vazio no CyberPanel.
2. Copiar os arquivos do WordPress antigo para a VPS.
3. Exportar e importar o banco de dados.
4. Ajustar o `wp-config.php`.
5. Testar na VPS com o arquivo *hosts* do seu computador, sem mexer no DNS.
6. Emitir SSL, ligar o cache do LiteSpeed.
7. Trocar o DNS.
8. Checklist final e desligar a hospedagem antiga.

## Passo 1: criar o site no CyberPanel

No CyberPanel: **Websites → Create Website**. Preencha o domínio (`seudominio.com.br`), um e-mail, escolha PHP na mesma versão que o site usa hoje (veja no painel antigo ou em *Ferramentas → Saúde do site → Informações* no WordPress; 8.2 ou 8.3 para a maioria) e marque **SSL** e **DKIM** se quiser. Clique em **Create Website**.

Isso cria a pasta `/home/seudominio.com.br/public_html` e um usuário de sistema para o site. Não use o instalador de WordPress do CyberPanel aqui: vamos trazer o site existente.

Crie também o banco: **Databases → Create Database**, escolha o site, defina nome do banco, usuário e senha. Anote os três.

## Passo 2: copiar os arquivos

Há duas formas. A mais confiável para site médio ou grande é por linha de comando; a mais simples para site pequeno é por plugin.

### Opção A: por linha de comando (recomendada)

Na hospedagem antiga, se houver acesso SSH, compacte a pasta do WordPress:

```bash
cd ~/public_html
tar czf ~/site.tar.gz .
```

Se não houver SSH, use o gerenciador de arquivos do painel antigo para compactar `public_html` em um `.zip` e anote o link ou baixe o arquivo.

Na VPS, como root, baixe e descompacte no lugar certo:

```bash
cd /home/seudominio.com.br/public_html
# Se o arquivo está acessível por URL temporária na hospedagem antiga:
wget -O /tmp/site.tar.gz "https://seudominio.com.br/site.tar.gz"
# Ou, com SSH nos dois lados, direto de servidor para servidor:
# scp usuario@ip-antigo:~/site.tar.gz /tmp/site.tar.gz
tar xzf /tmp/site.tar.gz
rm /tmp/site.tar.gz
```

Ajuste a propriedade dos arquivos para o usuário do site (o CyberPanel mostra o nome em **Websites → List Websites → Manage**; costuma ser as primeiras letras do domínio mais números):

```bash
chown -R usuariodosite:usuariodosite /home/seudominio.com.br/public_html
find /home/seudominio.com.br/public_html -type d -exec chmod 755 {} \;
find /home/seudominio.com.br/public_html -type f -exec chmod 644 {} \;
```

Ou, pelo painel, **Websites → Manage → Fix Permissions**.

Se você compactou com `.zip` em vez de `.tar.gz`, troque o `tar xzf` por `unzip -o /tmp/site.zip`. **Apague o arquivo compactado da hospedagem antiga** depois de baixar; ele contém o seu `wp-config.php` com senhas.

### Opção B: por plugin

Instale o **All-in-One WP Migration** ou o **Duplicator** no site antigo, exporte o pacote, instale um WordPress limpo na VPS (**WordPress → Deploy WordPress** no CyberPanel), instale o mesmo plugin lá e importe. Funciona bem até uns 500 MB; acima disso a versão gratuita limita e a importação pelo navegador fica frágil. Nesse caso, volte para a opção A.

## Passo 3: exportar e importar o banco

Na hospedagem antiga, abra o **phpMyAdmin**, selecione o banco do WordPress (o nome está no `wp-config.php` antigo, em `DB_NAME`), clique em **Exportar → Método rápido → SQL** e baixe o arquivo. Se o banco é grande (acima de 100 MB) e há SSH:

```bash
mysqldump -u USUARIO -p NOME_DO_BANCO | gzip > ~/banco.sql.gz
```

Na VPS, importe para o banco criado no passo 1:

```bash
# arquivo .sql
mysql -u USUARIO_NOVO -p NOME_DO_BANCO_NOVO < /tmp/banco.sql
# arquivo .sql.gz
gunzip -c /tmp/banco.sql.gz | mysql -u USUARIO_NOVO -p NOME_DO_BANCO_NOVO
```

Ou pelo phpMyAdmin do CyberPanel (**Databases → PHPMyAdmin**), aba **Importar**. O limite de upload padrão é generoso, mas para arquivos grandes a linha de comando é mais segura.

## Passo 4: ajustar o wp-config.php

Edite `/home/seudominio.com.br/public_html/wp-config.php` e troque as quatro linhas de conexão pelos dados do banco novo:

```php
define( 'DB_NAME', 'nome_do_banco_novo' );
define( 'DB_USER', 'usuario_novo' );
define( 'DB_PASSWORD', 'senha_nova' );
define( 'DB_HOST', 'localhost' );
```

Se o `DB_HOST` antigo tinha algo como `mysql.hospedagem.com.br`, agora é `localhost`. Verifique também se existe uma linha `$table_prefix` e se ela bate com o prefixo das tabelas importadas (`wp_` na maioria dos casos).

Se o site antigo rodava em HTTP e vai passar a HTTPS, ou se o domínio muda (de `www` para sem `www`, por exemplo), ajuste as URLs no banco com o WP-CLI, que o CyberPanel instala junto:

```bash
cd /home/seudominio.com.br/public_html
sudo -u usuariodosite wp search-replace 'http://seudominio.com.br' 'https://seudominio.com.br' --all-tables --precise
```

Isso cuida de todas as referências, inclusive dentro de conteúdos serializados que o "localizar e substituir" manual quebra.

## Passo 5: testar sem mexer no DNS

Aqui está o truque que mantém o site no ar. Você faz **o seu computador** achar que o domínio já aponta para a VPS, enquanto o resto do mundo continua vendo a hospedagem antiga.

Edite o arquivo *hosts*:

- **Windows**: abra o Bloco de Notas como administrador e edite `C:\Windows\System32\drivers\etc\hosts`.
- **Mac/Linux**: `sudo nano /etc/hosts`.

Acrescente uma linha com o IP da VPS:

```
145.223.00.00  seudominio.com.br www.seudominio.com.br
```

Salve, feche o navegador, abra de novo e acesse `http://seudominio.com.br`. Você deve ver o site servido pela VPS (confirme criando um arquivo `teste.txt` na `public_html` da VPS e acessando `seudominio.com.br/teste.txt`; se abrir, está vindo da VPS).

Checklist de teste:

- Página inicial, 3 páginas internas, 2 posts.
- Login no `/wp-admin/`.
- Formulário de contato envia.
- Imagens da biblioteca de mídia aparecem.
- Loja (se WooCommerce): carrinho, checkout em modo teste.
- **Configurações → Links permanentes → Salvar** (regenera o `.htaccess`; o OpenLiteSpeed lê as regras de reescrita do `.htaccess` do WordPress normalmente).

Erros comuns nesta fase e correção:

| Sintoma | Causa provável | Correção |
|---|---|---|
| "Erro ao estabelecer conexão com o banco" | Dados do `wp-config.php` errados | Revise o passo 4 |
| Página inicial abre, internas dão 404 | Regras de reescrita | Salve os links permanentes de novo; confira que o `.htaccess` existe |
| Imagens quebradas | Permissões ou URL antiga | `Fix Permissions`; `wp search-replace` do passo 4 |
| Tela branca | PHP em versão incompatível ou extensão faltando | Troque a versão em **Websites → Manage → PHP**; veja o log em **Logs → Error Logs** |
| Redireciona para o site antigo | Cache do navegador ou plugin de cache antigo | Limpe o cache e desative plugins de cache da hospedagem antiga (veja o passo 6) |

Não avance enquanto o site não estiver igual ou melhor do que o antigo neste teste.

## Passo 6: SSL e cache do LiteSpeed

**SSL**: em **SSL → Manage SSL**, escolha o site e clique em **Issue SSL**. Como o DNS ainda não aponta para a VPS, a emissão vai falhar agora; o CyberPanel instala um certificado temporário. **Repita a emissão logo depois do passo 7**, quando o DNS já propagou, e ela passa.

**Cache**: desinstale no WordPress os plugins de cache da hospedagem antiga (WP Rocket, W3 Total Cache, cache do cPanel/Hostinger etc.) e instale o **LiteSpeed Cache**. Ele conversa direto com o servidor OpenLiteSpeed e é o motivo principal de o site ficar mais rápido na VPS. Configuração inicial: **LiteSpeed Cache → Presets → Advanced** e salve. Em **Page Optimization**, ligue minificação de CSS/JS só depois de confirmar que o site não quebrou.

Verifique que o cache está servindo: abra o site em janela anônima, pressione F12 → Rede → recarregue → clique na primeira requisição → nos cabeçalhos de resposta deve haver `x-litespeed-cache: hit` a partir da segunda visita.

## Passo 7: trocar o DNS

Com tudo testado, apague a linha do arquivo *hosts* (para voltar a ver o que o mundo vê) e, no painel de DNS, altere o registro **A** de `@` e de `www` para o IP da VPS. Se o DNS está na Cloudflare, mantenha o proxy (nuvem laranja) se já usava; se não usava, deixe cinza por enquanto para simplificar o SSL.

Como o TTL foi baixado para 300 segundos no começo, em 5 a 15 minutos a maior parte do mundo já vê a VPS. Confira em um site de verificação de propagação ou com:

```bash
dig +short A seudominio.com.br
```

Assim que devolver o IP da VPS, volte ao CyberPanel e **emita o SSL de novo**. Agora passa. Ative o redirecionamento para HTTPS em **Websites → Manage → Rewrite Rules → Force HTTP → HTTPS** (ou pelo plugin LiteSpeed Cache).

E-mail: se o domínio tinha e-mails na hospedagem antiga, migre as contas antes de desligar (veja [e-mail profissional no CyberPanel](/email-profissional-dominio-proprio-cyberpanel/)) e só então mude o registro **MX**. Se usa Google Workspace ou outro serviço externo, não mexa no MX.

## Passo 8: checklist final e desligamento

Nas 48 horas seguintes:

- Site abre em `https://` em celular e computador, com cadeado.
- Formulários enviam e os e-mails chegam (teste de verdade).
- Google Search Console sem erros novos de rastreamento.
- Loja: um pedido real de teste de ponta a ponta.
- Backup automático configurado na VPS: [backup automático da VPS com CyberPanel](/backup-automatico-vps-cyberpanel/).
- Cron do WordPress funcionando (agendamentos, publicações programadas). Se falhar, desative o `WP_CRON` no `wp-config.php` e crie um cron real no CyberPanel chamando `wp cron event run --due-now` a cada 15 minutos.

Depois de uma semana sem problemas, cancele a hospedagem antiga. Antes de cancelar, baixe um último backup de lá e guarde por 30 dias.

## Quanto custa e o que muda

| Item | Hospedagem compartilhada | VPS com CyberPanel |
|---|---|---|
| Mensalidade aproximada | R$ 15 a R$ 60 | R$ 40 a R$ 120 (VPS de 2 a 4 GB) |
| Sites por conta | 1 a "ilimitado" (com limite de processos) | Quantos a memória aguentar; 5 a 10 sites pequenos numa VPS de 4 GB |
| Velocidade | Depende dos vizinhos | Recursos só seus, LiteSpeed com cache nativo |
| E-mail | Incluso, limitado | Incluso, sem limite de contas |
| Suporte | Do provedor, genérico | Você ou quem você contratar |
| Manutenção | Zero | Atualizações, backup, monitoramento (ou contratar) |

A migração em si, feita por alguém, costuma custar entre R$ 200 e R$ 600 por site, aproximadamente, e muitos serviços de VPS gerenciada incluem a primeira migração.

## Na prática, na WebMedula

Na [WebMedula](/servicos/) a migração é parte do serviço de [VPS com CyberPanel configurada](/servicos/): instalamos e protegemos o servidor, trazemos o site exatamente pelo roteiro acima (cópia, banco, teste por *hosts*, SSL, LiteSpeed Cache, DNS), medimos a velocidade antes e depois e entregamos com backup externo diário configurado. A migração do primeiro site está incluída. Para quem não quer ter VPS própria, a [hospedagem gerenciada](/servicos/) traz o site para a nossa estrutura com LiteSpeed, SSL e backup, também com migração gratuita, e a gente cuida do servidor; o cliente só cuida do site.

Quando o site é lento também por causa de tema ou plugins pesados, a migração melhora mas não resolve tudo. Por isso antes de migrar fazemos um [diagnóstico gratuito](/diagnostico-automacao/) rápido e dizemos o que vai mudar com a VPS e o que precisa ser ajustado no próprio WordPress.

## Perguntas frequentes

**O site vai ficar fora do ar em algum momento?**
Não, se você seguir o teste pelo arquivo *hosts* antes de trocar o DNS. O site antigo responde até o DNS propagar, e o novo já está pronto quando isso acontece. O único "vazio" possível é alguém que comenta ou faz um pedido nos minutos da propagação; para loja, faça a troca no horário de menor movimento.

**Preciso saber Linux?**
Para seguir este tutorial, o básico: copiar e colar comandos, editar um arquivo. Tudo o que é possível pelo painel do CyberPanel está indicado como alternativa.

**Posso migrar vários sites para a mesma VPS?**
Sim, repetindo o roteiro para cada um. Uma VPS de 4 GB aguenta de 5 a 10 sites WordPress pequenos ou médios com folga. Crie um usuário por site (o CyberPanel faz isso sozinho) para que um site invadido não afete os outros.

**E se o WordPress antigo está muito desatualizado?**
Migre primeiro, atualize depois, na VPS, com backup feito. Atualizar na hospedagem antiga antes de migrar adiciona um risco sem necessidade.

**O LiteSpeed Cache funciona com qualquer tema?**
Com a grande maioria. Os problemas aparecem na minificação e combinação de CSS/JS, não no cache de página. Por isso a recomendação de ligar o preset básico primeiro e as otimizações uma a uma.

**Quanto tempo leva para o site ficar mais rápido?**
Imediatamente após ligar o LiteSpeed Cache. Em geral o tempo de resposta do servidor cai de centenas de milissegundos para dezenas; o restante do tempo de carregamento depende do tema, das imagens e dos plugins.
