---
title: "Backup automático da VPS com CyberPanel: sites, bancos e Docker salvos fora do servidor (passo a passo)"
description: "Monte um backup automático completo na sua VPS: sites e bancos pelo CyberPanel, volumes do Docker (n8n, Evolution) com script e cópia diária para fora com rclone."
pubDate: 2026-11-19
category: automacao
tags: ["vps", "cyberpanel", "backup", "docker", "tutorial"]
affiliate: false
---

Todo mundo que já perdeu um servidor sabe: o backup que importa é o que está **fora** da máquina, feito **sem ninguém lembrar** e **testado** pelo menos uma vez. O resto é sensação de segurança.

Este tutorial monta isso numa VPS com CyberPanel em três camadas:

1. **Sites e bancos de dados** com o backup nativo do CyberPanel, agendado.
2. **Volumes do Docker** (n8n, Evolution API, Postgres) com um script e `cron`.
3. **Cópia diária para fora do servidor** (Google Drive, Backblaze B2 ou outro) com `rclone`, mantendo só os últimos dias.

Ao final você tem um backup diário, criptografado em trânsito, guardado longe da VPS e com uma rotina de restauração que você já executou uma vez. Tempo estimado: 45 minutos. Os valores citados são aproximados.

## Antes de começar

- VPS com CyberPanel (se ainda não tem, veja [como configurar uma VPS da Hostinger com CyberPanel](/como-configurar-vps-hostinger-cyberpanel/)).
- Acesso root por SSH ou pelo terminal do painel da hospedagem.
- Uma conta onde o backup vai morar. Para começar, o Google Drive que você já tem serve. Para volume maior, Backblaze B2 custa em torno de US$ 6 por TB ao mês, aproximadamente.
- Se roda n8n ou Evolution API em Docker, saiba onde está o `docker-compose.yml` de cada um. No nosso tutorial de [instalação do n8n](/como-instalar-n8n-vps-hostinger/) ele fica em `~/n8n`; no de [Evolution API](/automatizar-whatsapp-com-n8n-evolution-api/), em `~/evolution`.

Um aviso sobre o que **não** basta: o snapshot semanal que a hospedagem oferece fica no mesmo datacenter, às vezes no mesmo disco, e normalmente é um só. Ele é uma camada a mais, não a principal.

## Camada 1: backup dos sites pelo CyberPanel

O CyberPanel já sabe fazer backup completo de cada site: arquivos, banco de dados, e-mails e configuração de DNS, num único `.tar.gz`.

### Backup manual (para entender o formato)

No painel: **Backup → Create Back up**, escolha o site e clique em **Create Backup**. O arquivo aparece em `/home/seudominio.com.br/backup/backup-seudominio.com.br-DATA.tar.gz`. Faça um agora para ter algo para testar nos próximos passos.

### Agendar

**Backup → Schedule Back up**:

| Campo | Valor sugerido |
|---|---|
| Destination | `Home` (local, por enquanto; a cópia para fora é a camada 3) |
| Frequency | `Daily` |
| Retention | `3` (dias mantidos na VPS; o histórico longo fica fora) |
| Websites | todos os que importam |

O CyberPanel agenda via `cron` do próprio sistema e grava os arquivos na pasta `backup` de cada site. Com retenção 3, você gasta no máximo três vezes o tamanho do site em disco local.

### Se o backup falhar

Os erros ficam em **Backup → Backup Logs**. Os dois mais comuns:

- **Site grande demais e o `tar` estoura o tempo**: aumente a frequência de limpeza de cache do WordPress ou exclua a pasta `wp-content/cache` do site antes do backup.
- **Banco com nome diferente do site**: o CyberPanel só inclui bancos criados por ele. Banco criado "na mão" via MySQL precisa entrar na camada 2.

## Camada 2: backup dos containers Docker

O CyberPanel não enxerga o Docker. O que roda em container (n8n, Evolution API, Postgres, Redis) precisa de rotina própria. A forma mais segura é parar brevemente o container, copiar o volume e subir de novo. Para n8n e Evolution isso leva segundos e pode rodar de madrugada.

Crie o script:

```bash
mkdir -p /root/backup-scripts /root/backups
nano /root/backup-scripts/docker-backup.sh
```

Cole, ajustando os nomes dos volumes à sua instalação (veja com `docker volume ls`):

```bash
#!/usr/bin/env bash
set -euo pipefail

DEST=/root/backups
DATA=$(date +%F)
KEEP_DAYS=3

mkdir -p "$DEST"

backup_volume () {
  local volume="$1"
  echo "Copiando volume $volume"
  docker run --rm \
    -v "${volume}:/origem:ro" \
    -v "${DEST}:/destino" \
    alpine tar czf "/destino/${volume}-${DATA}.tar.gz" -C /origem .
}

# Postgres: dump lógico é mais confiável do que copiar o volume
backup_postgres () {
  local container="$1" user="$2" db="$3"
  echo "Dump do banco $db"
  docker exec "$container" pg_dump -U "$user" -d "$db" | gzip > "${DEST}/${db}-${DATA}.sql.gz"
}

# n8n (volume de dados do tutorial)
docker stop n8n >/dev/null
backup_volume n8n_n8n_data
docker start n8n >/dev/null

# Evolution API
backup_volume evolution_evolution_instances
backup_postgres evolution-postgres-1 evolution evolution

# Limpa cópias locais antigas
find "$DEST" -type f -mtime +"$KEEP_DAYS" -delete

echo "Backup Docker concluído em $DEST"
```

Dê permissão e teste:

```bash
chmod +x /root/backup-scripts/docker-backup.sh
/root/backup-scripts/docker-backup.sh
ls -lh /root/backups
```

Se o nome de algum container ou volume estiver errado, o `set -e` para o script no primeiro erro e mostra qual foi. Confira com `docker ps` e `docker volume ls`.

Agende para rodar antes da cópia externa, por exemplo às 3h:

```bash
crontab -e
```

```
0 3 * * * /root/backup-scripts/docker-backup.sh >> /var/log/docker-backup.log 2>&1
```

## Camada 3: copiar tudo para fora com rclone

O `rclone` é o "canivete" para falar com praticamente qualquer nuvem: Google Drive, OneDrive, Dropbox, Backblaze B2, S3, Wasabi, outro servidor por SFTP.

### Instalar e conectar

```bash
curl https://rclone.org/install.sh | sudo bash
rclone config
```

Escolha **n** (new remote), dê o nome `backup-remoto` e siga as perguntas do provedor. Dois casos comuns:

- **Google Drive**: tipo `drive`, deixe client_id e secret em branco, escopo `1` (acesso total), e quando perguntar sobre *auto config* responda **n** porque a VPS não tem navegador. O rclone mostra um comando para rodar no seu computador, que abre o navegador, você autoriza e cola o token de volta no servidor.
- **Backblaze B2**: tipo `b2`, cole `account` (keyID) e `key` (applicationKey) criados no painel do B2 com permissão só no bucket de backup.

Teste:

```bash
rclone mkdir backup-remoto:vps-backups
rclone lsd backup-remoto:
```

### Script de envio

```bash
nano /root/backup-scripts/enviar-backup.sh
```

```bash
#!/usr/bin/env bash
set -euo pipefail

REMOTO="backup-remoto:vps-backups"
HOST=$(hostname -s)
KEEP_DAYS=30

# Sites do CyberPanel
for dir in /home/*/backup; do
  [ -d "$dir" ] || continue
  site=$(basename "$(dirname "$dir")")
  rclone copy "$dir" "$REMOTO/$HOST/sites/$site" --min-age 10m --transfers 2
done

# Docker
rclone copy /root/backups "$REMOTO/$HOST/docker" --min-age 10m --transfers 2

# Configurações do servidor que dão trabalho para refazer
tar czf /tmp/config-${HOST}.tar.gz \
  /usr/local/lsws/conf \
  /etc/letsencrypt 2>/dev/null || true
rclone copy /tmp/config-${HOST}.tar.gz "$REMOTO/$HOST/config"
rm -f /tmp/config-${HOST}.tar.gz

# Apaga no remoto o que passou da retenção
rclone delete "$REMOTO/$HOST" --min-age "${KEEP_DAYS}d"
rclone rmdirs "$REMOTO/$HOST" --leave-root

echo "Envio concluído: $(date)"
```

O `--min-age 10m` evita enviar um arquivo que ainda está sendo escrito. Permissão, teste e agendamento, uma hora depois dos backups:

```bash
chmod +x /root/backup-scripts/enviar-backup.sh
/root/backup-scripts/enviar-backup.sh
crontab -e
```

```
0 4 * * * /root/backup-scripts/enviar-backup.sh >> /var/log/enviar-backup.log 2>&1
```

Confira o resultado em `rclone ls backup-remoto:vps-backups` ou direto no Drive.

## Camada extra: saber quando falhou

Backup que falha em silêncio é igual a não ter backup. A forma mais simples de ser avisado é acrescentar, no fim do script de envio, uma mensagem para você mesmo. Se você já tem o n8n rodando com WhatsApp, basta um webhook:

```bash
curl -s -X POST "https://n8n.seudominio.com.br/webhook/backup-ok" \
  -H "Content-Type: application/json" \
  --data "{\"host\":\"$HOST\",\"status\":\"ok\",\"data\":\"$(date +%F)\"}" >/dev/null
```

No n8n, um fluxo com Webhook → envio de WhatsApp (como no [tutorial da Evolution API](/automatizar-whatsapp-com-n8n-evolution-api/)) manda "Backup da VPS ok" todo dia às 4h. O mais importante é o oposto: um segundo fluxo com nó **Schedule** às 6h verifica se a mensagem do dia chegou e, se não chegou, avisa "Backup NÃO rodou". Sem n8n, um e-mail com `mail` ou um serviço gratuito de "dead man's switch" (Healthchecks.io tem plano grátis) cumprem o mesmo papel.

## O teste que quase ninguém faz: restaurar

Faça uma vez, agora, enquanto está tudo bem:

**Site do CyberPanel**: baixe um `.tar.gz` do remoto para `/home/backup/`, vá em **Backup → Restore Back up**, selecione o arquivo e restaure num domínio de teste (ex.: `teste.seudominio.com.br`). Abra o site de teste e confira páginas e login.

**n8n**: numa pasta nova, suba um n8n limpo com o mesmo `docker-compose.yml`, pare o container, descompacte o volume dentro de `/var/lib/docker/volumes/NOME/_data/` e inicie. Os fluxos e credenciais devem aparecer.

**Postgres da Evolution**: `gunzip -c evolution-DATA.sql.gz | docker exec -i evolution-postgres-1 psql -U evolution -d evolution` num banco de teste.

Anote quanto tempo levou cada restauração. Esse número é o que você promete para si mesmo (e para clientes) quando algo der errado.

## Quanto custa manter

| Item | Custo aproximado |
|---|---|
| Espaço local (3 dias de retenção) | Já incluso no disco da VPS; conte 3 vezes o tamanho dos sites |
| Google Drive (15 GB grátis) | R$ 0 para sites pequenos; plano de 100 GB em torno de R$ 7/mês |
| Backblaze B2 | Cerca de US$ 6 por TB ao mês, com 10 GB gratuitos |
| rclone, CyberPanel, scripts | R$ 0 |
| Seu tempo para montar | Uma tarde, uma única vez |
| Seu tempo para manter | Olhar a mensagem de confirmação e testar uma restauração a cada trimestre |

## Erros que mais vemos

- **Backup no mesmo disco e só.** Se o disco morre, morre tudo junto. Daí a camada 3.
- **Nunca testar restauração.** Arquivo corrompido, banco que não entra, variável de ambiente que faltou. Só se descobre no pior dia.
- **Guardar o token do rclone sem proteger o servidor.** Quem entra como root na VPS tem acesso ao seu Drive. Mantenha SSH por chave, firewall e atualizações em dia, como no [tutorial da VPS](/como-configurar-vps-hostinger-cyberpanel/).
- **Backup que cresce até lotar o disco.** Por isso a retenção local curta e o `find -delete`.
- **Copiar o volume do Postgres com o banco rodando.** Pode gerar backup inconsistente. Use `pg_dump`, como no script.
- **Não incluir o `.env` e o `docker-compose.yml`.** O volume sem o arquivo de configuração é meio backup. Guarde a pasta do compose inteira na camada 3 (acrescente um `rclone copy ~/n8n ...` se quiser).

## Na prática, na WebMedula

Na [WebMedula](/servicos/) toda VPS que entregamos sai com exatamente essas três camadas montadas: backup nativo do CyberPanel agendado, script para os containers e cópia diária para um bucket externo com retenção de 30 dias, mais o aviso automático de falha. Antes de entregar, fazemos uma restauração de teste e anotamos o tempo. Isso faz parte do serviço de [VPS com CyberPanel configurada](/servicos/) e também da [instalação do n8n](/servicos/).

Para quem já tem servidor e não quer cuidar disso, a [manutenção mensal de VPS e n8n](/servicos/) inclui backups, atualizações, monitoramento de uptime e suporte por WhatsApp. É a diferença entre torcer para não dar problema e saber que, se der, o site volta em uma hora.

## Perguntas frequentes

**Preciso parar o site para fazer backup?**
Não. O CyberPanel faz o backup com o site rodando. Só os containers do Docker param por alguns segundos, e dá para escolher a hora de menor movimento.

**Google Drive serve como destino de verdade?**
Para sites pequenos e médios, serve bem e é gratuito até 15 GB. Para volumes grandes ou vários servidores, um bucket B2 ou S3 sai mais barato e não mistura com seus arquivos pessoais.

**E se eu tiver vários sites na mesma VPS?**
O script da camada 3 já percorre todas as pastas `backup` de todos os sites. Basta marcar todos no agendamento do CyberPanel.

**Com que frequência devo testar a restauração?**
Uma vez ao montar e depois a cada três meses, ou sempre que mudar algo grande no servidor (versão do CyberPanel, novo container, migração).

**O snapshot da hospedagem não substitui isso?**
Ele complementa. Snapshot restaura a máquina inteira, o que é útil, mas costuma ser um só, semanal e no mesmo datacenter. O backup granular e externo é o que te salva na maioria dos casos reais, como um site invadido ou um `rm` no lugar errado.

**Posso criptografar os arquivos antes de enviar?**
Sim. O rclone tem o remote tipo `crypt`, que envolve o `backup-remoto` e criptografa nomes e conteúdo com uma senha sua. Vale a pena se o destino é uma conta compartilhada.
