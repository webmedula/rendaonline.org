<?php
/**
 * Recebe os contatos dos formulários de material grátis do Renda Online.
 *
 * Os contatos ficam FORA da pasta pública, em /home/rendaonline.org/leads/leads.csv
 * (o deploy com rsync --delete não apaga essa pasta). Baixe pelo Gerenciador de
 * Arquivos do CyberPanel.
 *
 * Opcional: crie /home/rendaonline.org/leads/config.php retornando um array, por exemplo:
 *   <?php return ['notify_email' => 'voce@exemplo.com', 'webhook_url' => 'https://n8n.seudominio.com/webhook/leads'];
 * webhook_url recebe cada contato em JSON (para n8n, planilha, CRM...).
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

function responder(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

// Verificação rápida usada pelo deploy: o PHP roda e a pasta de contatos aceita gravação?
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET' && isset($_GET['status'])) {
    $dir = dirname(__DIR__, 2) . '/leads';
    if (!is_dir($dir)) @mkdir($dir, 0750, true);
    responder(200, ['ok' => true, 'gravavel' => is_dir($dir) && is_writable($dir)]);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    responder(405, ['ok' => false, 'erro' => 'Use POST.']);
}

// Aceita JSON ou formulário comum.
$raw = file_get_contents('php://input', false, null, 0, 20000);
$in = json_decode((string) $raw, true);
if (!is_array($in)) {
    $in = $_POST;
}

$campo = function (string $k, int $max = 200) use ($in): string {
    $v = isset($in[$k]) && is_scalar($in[$k]) ? (string) $in[$k] : '';
    $v = trim(preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $v));
    return mb_substr($v, 0, $max);
};

// Armadilha para robôs: campo escondido que pessoas não preenchem.
if ($campo('site') !== '') {
    responder(200, ['ok' => true]);
}

$nome = $campo('nome', 80);
$email = mb_strtolower($campo('email', 160));
$whats = preg_replace('/\D+/', '', $campo('whatsapp', 30));
$isca = preg_replace('/[^a-z0-9-]/', '', $campo('isca', 60)) ?: 'desconhecida';
$origem = $campo('origem', 200);
$utm = $campo('utm', 300);
$aceite = in_array($campo('consentimento'), ['1', 'true', 'on', 'sim'], true);
$querWhats = in_array($campo('quer_whatsapp'), ['1', 'true', 'on', 'sim'], true);

$erros = [];
if (mb_strlen($nome) < 2) $erros[] = 'Informe seu nome.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $erros[] = 'Informe um e-mail válido.';
if ($whats !== '' && (strlen($whats) < 10 || strlen($whats) > 13)) $erros[] = 'WhatsApp com DDD, só números.';
if (!$aceite) $erros[] = 'É preciso aceitar para receber o material.';
if ($erros) {
    responder(422, ['ok' => false, 'erro' => implode(' ', $erros)]);
}
if ($whats !== '' && strlen($whats) <= 11) {
    $whats = '55' . $whats;
}

$base = dirname(__DIR__, 2) . '/leads';
if (!is_dir($base) && !@mkdir($base, 0750, true)) {
    responder(500, ['ok' => false, 'erro' => 'Falha ao salvar.']);
}

// Limite simples: 8 envios por IP por hora.
$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
$ip = trim(explode(',', $ip)[0]);
$rlDir = $base . '/.limite';
@mkdir($rlDir, 0750, true);
$rlFile = $rlDir . '/' . hash('sha256', $ip . date('YmdH'));
$conta = (int) @file_get_contents($rlFile);
if ($conta >= 8) {
    responder(429, ['ok' => false, 'erro' => 'Muitos envios. Tente mais tarde.']);
}
@file_put_contents($rlFile, (string) ($conta + 1));
if (mt_rand(1, 50) === 1) {
    foreach (glob($rlDir . '/*') ?: [] as $f) {
        if (filemtime($f) < time() - 7200) @unlink($f);
    }
}

$textoConsentimento = 'v1: aceito receber o material e conteúdos e ofertas do Renda Online e da WebMedula por e-mail e WhatsApp; posso cancelar quando quiser.';
$agora = (new DateTime('now', new DateTimeZone('America/Sao_Paulo')))->format('Y-m-d H:i:s');

// Evita fórmulas maliciosas quando o CSV for aberto no Excel.
$limpa = fn(string $v): string => preg_match('/^[=+\-@\t]/', $v) ? "'" . $v : $v;

$linha = [$agora, $nome, $email, $whats, $querWhats ? 'sim' : 'nao', $isca, $origem, $utm, $ip,
    mb_substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 200), $textoConsentimento];
$linha = array_map($limpa, $linha);

$csv = $base . '/leads.csv';
$novo = !file_exists($csv);
$fh = @fopen($csv, 'ab');
if (!$fh) {
    responder(500, ['ok' => false, 'erro' => 'Falha ao salvar.']);
}
flock($fh, LOCK_EX);
if ($novo) {
    fwrite($fh, "\xEF\xBB\xBF"); // BOM para o Excel abrir acentos certo
    fputcsv($fh, ['data', 'nome', 'email', 'whatsapp', 'quer_whatsapp', 'material', 'pagina', 'utm', 'ip', 'navegador', 'consentimento'], ';');
}
fputcsv($fh, $linha, ';');
flock($fh, LOCK_UN);
fclose($fh);
@chmod($csv, 0640);

// Configuração opcional.
$cfg = ['notify_email' => 'contato@webmedula.com.br', 'webhook_url' => ''];
if (is_file($base . '/config.php')) {
    $extra = include $base . '/config.php';
    if (is_array($extra)) $cfg = array_merge($cfg, $extra);
}

$dados = ['data' => $agora, 'nome' => $nome, 'email' => $email, 'whatsapp' => $whats,
    'quer_whatsapp' => $querWhats, 'material' => $isca, 'pagina' => $origem, 'utm' => $utm];

// Webhook (n8n, Make, planilha...). Melhor esforço, não bloqueia a resposta por muito tempo.
if (!empty($cfg['webhook_url']) && function_exists('curl_init')) {
    $ch = curl_init($cfg['webhook_url']);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($dados, JSON_UNESCAPED_UNICODE),
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 4,
    ]);
    @curl_exec($ch);
    curl_close($ch);
}

// Aviso por e-mail (depende do servidor ter envio de e-mail configurado).
if (!empty($cfg['notify_email']) && function_exists('mail')) {
    $assunto = '=?UTF-8?B?' . base64_encode("Novo contato ($isca): $nome") . '?=';
    $corpo = "Novo contato pelo Renda Online\n\nNome: $nome\nE-mail: $email\nWhatsApp: " . ($whats ?: '-') .
        "\nQuer receber no WhatsApp: " . ($querWhats ? 'sim' : 'não') . "\nMaterial: $isca\nPágina: $origem\nData: $agora\n";
    $headers = "From: Renda Online <nao-responda@rendaonline.org>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
    @mail($cfg['notify_email'], $assunto, $corpo, $headers);
}

responder(200, ['ok' => true]);
