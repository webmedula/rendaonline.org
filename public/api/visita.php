<?php
/**
 * Contador de visitas por campanha de divulgação (links com utm_*).
 *
 * POST (enviado pelo site): grava uma linha em /home/rendaonline.org/leads/visitas.csv
 *   data;origem;meio;campanha;pagina;site_de_onde_veio — sem IP, sem cookie, sem dado pessoal.
 * GET ?relatorio : tabela com as visitas por campanha e origem (hoje, 7 dias, 30 dias, total).
 */
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');
date_default_timezone_set('America/Sao_Paulo');

$dir = dirname(__DIR__, 2) . '/leads';
$arq = $dir . '/visitas.csv';
$limpa = function ($v, int $max = 80): string {
    $v = is_scalar($v) ? (string) $v : '';
    $v = mb_strtolower(trim($v));
    $v = preg_replace('/[^a-z0-9._\/-]+/u', '-', $v);
    return mb_substr(trim($v, '-'), 0, $max);
};

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    $ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
    if ($ua === '' || preg_match('/bot|crawl|spider|preview|facebookexternalhit|whatsapp|slurp|headless/i', $ua)) {
        http_response_code(204);
        exit;
    }
    $in = json_decode((string) file_get_contents('php://input', false, null, 0, 4000), true);
    if (!is_array($in) || empty($in['s'])) {
        http_response_code(204);
        exit;
    }
    if (!is_dir($dir)) @mkdir($dir, 0750, true);
    if (is_file($arq) && filesize($arq) > 20 * 1024 * 1024) {
        http_response_code(204);
        exit;
    }
    $linha = [date('Y-m-d H:i:s'), $limpa($in['s'], 40), $limpa($in['m'] ?? '', 40), $limpa($in['c'] ?? '', 60), $limpa($in['p'] ?? '', 150), $limpa($in['r'] ?? '', 80)];
    @file_put_contents($arq, implode(';', $linha) . "\n", FILE_APPEND | LOCK_EX);
    http_response_code(204);
    exit;
}

if (!isset($_GET['relatorio'])) {
    http_response_code(404);
    exit;
}

header('Content-Type: text/html; charset=utf-8');
$hoje = date('Y-m-d');
$d7 = date('Y-m-d', strtotime('-6 days'));
$d30 = date('Y-m-d', strtotime('-29 days'));
$tab = [];
$totais = ['hoje' => 0, 'd7' => 0, 'd30' => 0, 'total' => 0];
if (is_file($arq) && ($fh = fopen($arq, 'r'))) {
    while (($l = fgets($fh)) !== false) {
        $c = explode(';', rtrim($l, "\n"));
        if (count($c) < 5) continue;
        $dia = substr($c[0], 0, 10);
        $chave = ($c[3] ?: '(sem campanha)') . ' | ' . $c[1] . ($c[2] ? ' / ' . $c[2] : '');
        $tab[$chave] ??= ['hoje' => 0, 'd7' => 0, 'd30' => 0, 'total' => 0];
        $inc = ['total'];
        if ($dia === $hoje) $inc[] = 'hoje';
        if ($dia >= $d7) $inc[] = 'd7';
        if ($dia >= $d30) $inc[] = 'd30';
        foreach ($inc as $k) { $tab[$chave][$k]++; $totais[$k]++; }
    }
    fclose($fh);
}
uasort($tab, fn($a, $b) => [$b['d7'], $b['total']] <=> [$a['d7'], $a['total']]);
$h = fn($s) => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
?><!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Visitas por campanha</title>
<style>body{font:16px system-ui,sans-serif;margin:24px auto;max-width:900px;padding:0 16px;color:#1a1d23}h1{color:#0a664a;font-size:24px}table{border-collapse:collapse;width:100%}th,td{padding:8px 10px;border-bottom:1px solid #e3e6ea;text-align:right}th:first-child,td:first-child{text-align:left}tr.t td{font-weight:700;background:#e8f8f0}p{color:#5b6270}</style></head>
<body><h1>Visitas vindas da divulgação</h1>
<p>Cada linha é campanha | origem / meio. Conta uma visita por pessoa, por página, por sessão. Atualizado em <?= $h(date('d/m/Y H:i')) ?>.</p>
<table><tr><th>Campanha | origem</th><th>Hoje</th><th>7 dias</th><th>30 dias</th><th>Total</th></tr>
<tr class="t"><td>Total</td><td><?= $totais['hoje'] ?></td><td><?= $totais['d7'] ?></td><td><?= $totais['d30'] ?></td><td><?= $totais['total'] ?></td></tr>
<?php foreach ($tab as $k => $v): ?><tr><td><?= $h($k) ?></td><td><?= $v['hoje'] ?></td><td><?= $v['d7'] ?></td><td><?= $v['d30'] ?></td><td><?= $v['total'] ?></td></tr>
<?php endforeach; ?></table>
<?php if (!$tab): ?><p>Ainda não há visitas registradas.</p><?php endif; ?>
</body></html>
