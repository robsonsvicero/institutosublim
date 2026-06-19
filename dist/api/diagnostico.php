<?php
// SCRIPT DE DIAGNÓSTICO - REMOVA APÓS RESOLVER O PROBLEMA!
header('Content-Type: application/json; charset=utf-8');

$CERT_PATH = __DIR__ . '/../../cora-certs/certificate.pem'; 
$KEY_PATH  = __DIR__ . '/../../cora-certs/private-key.key';

$certRealPath = realpath($CERT_PATH);
$keyRealPath  = realpath($KEY_PATH);

$info = [
    '__DIR__'           => __DIR__,
    'CERT_PATH_tentado' => $CERT_PATH,
    'CERT_real_path'    => $certRealPath ?: 'NAO ENCONTRADO',
    'CERT_existe'       => file_exists($CERT_PATH) ? 'SIM' : 'NAO',
    'KEY_PATH_tentado'  => $KEY_PATH,
    'KEY_real_path'     => $keyRealPath  ?: 'NAO ENCONTRADO',
    'KEY_existe'        => file_exists($KEY_PATH)  ? 'SIM' : 'NAO',
];

// Se os arquivos existirem, tenta fazer a chamada para a Cora sem certificado
// para ver se pelo menos a conexão de rede funciona
$info['teste_conexao_cora'] = 'nao testado';
$ch = curl_init('https://matls-clients.api.cora.com.br/token');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials&client_id=int-1PWb4Qfw9jsGL2Q4PPnEwO');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
// Se os certs existem, usa eles
if (file_exists($CERT_PATH)) {
    curl_setopt($ch, CURLOPT_SSLCERT, $CERT_PATH);
    $info['usou_certificado'] = 'SIM';
} else {
    $info['usou_certificado'] = 'NAO (arquivo nao encontrado)';
}
if (file_exists($KEY_PATH)) {
    curl_setopt($ch, CURLOPT_SSLKEY, $KEY_PATH);
}

$resp = curl_exec($ch);
$info['curl_errno'] = curl_errno($ch);
$info['curl_error'] = curl_error($ch);
$info['http_status'] = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$info['resposta_cora'] = $resp;
curl_close($ch);

echo json_encode($info, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
