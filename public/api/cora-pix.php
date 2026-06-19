<?php
// ============================================================================
// CONFIGURAÇÕES (Obrigatório preencher no servidor final)
// ============================================================================

// 1. Configurações da Cora Bank
$CORA_CLIENT_ID = 'int-1PWb4Qfw9jsGL2Q4PPnEwO'; // O seu Client ID de Produção
// Caminho absoluto para os certificados. O ideal é colocá-los FORA da public_html!
$CERT_PATH = __DIR__ . '/../../cora-certs/certificate.pem'; 
$KEY_PATH = __DIR__ . '/../../cora-certs/private-key.key';

// 2. Configurações do Supabase (Para salvar no banco)
$SUPABASE_URL = 'https://gjbwqwvcakecuqkyrbay.supabase.co';
// INSIRA A SUA SERVICE ROLE KEY DO SUPABASE AQUI EMBAIXO:
$SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqYndxd3ZjYWtlY3Vxa3lyYmF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE1MTg3MSwiZXhwIjoyMDkwNzI3ODcxfQ.GWCe9VGF1Ivp_gNXnX_CB26MVPQIdHECl_mBRdk0PoA'; 

// ============================================================================

// Função para gerar UUID v4 válido (exigido pela Cora no Idempotency-Key)
function generateUUIDv4() {
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // Versão 4
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // Variante RFC 4122
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, x-client-info, apikey");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json; charset=utf-8');

// Lidar com CORS (Preflight OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido. Utilize POST.']);
    exit();
}

// 1. Receber os dados do frontend
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

$valor = $input['valor'] ?? null;
$doador_cpf = $input['doador_cpf'] ?? null;
$doador_nome = !empty($input['doador_nome']) ? $input['doador_nome'] : 'Doador Anônimo';
$doador_email = !empty($input['doador_email']) ? $input['doador_email'] : 'contato_' . time() . '@institutosublim.org';

if (!$valor || !$doador_cpf) {
    http_response_code(400);
    echo json_encode(['error' => 'Dados insuficientes (CPF ou valor obrigatorios)']);
    exit();
}

// VERSAO: 2026-06-18-v2
if (!file_exists($CERT_PATH) || !file_exists($KEY_PATH)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Certificados nao encontrados',
        'debug_cert_path' => $CERT_PATH,
        'debug_cert_existe' => file_exists($CERT_PATH) ? 'SIM' : 'NAO',
        'debug_key_path' => $KEY_PATH,
        'debug_key_existe' => file_exists($KEY_PATH) ? 'SIM' : 'NAO',
        'debug_dir' => __DIR__
    ]);
    exit();
}

// 2. Autenticar com a Cora (Obter Token mTLS)
$chToken = curl_init('https://matls-clients.api.cora.com.br/token');
curl_setopt($chToken, CURLOPT_POST, 1);
curl_setopt($chToken, CURLOPT_POSTFIELDS, http_build_query([
    'grant_type' => 'client_credentials',
    'client_id' => $CORA_CLIENT_ID
]));
curl_setopt($chToken, CURLOPT_RETURNTRANSFER, true);
// Configurações vitais de mTLS
curl_setopt($chToken, CURLOPT_SSLCERT, $CERT_PATH);
curl_setopt($chToken, CURLOPT_SSLKEY, $KEY_PATH);
// Descomente as duas linhas abaixo caso seu servidor PHP reclame do SSL raiz da Cora:
// curl_setopt($chToken, CURLOPT_SSL_VERIFYPEER, false);
// curl_setopt($chToken, CURLOPT_SSL_VERIFYHOST, false);

$tokenResponse = curl_exec($chToken);
$tokenStatusCode = curl_getinfo($chToken, CURLINFO_HTTP_CODE);

if (curl_errno($chToken)) {
    $err = curl_error($chToken);
    curl_close($chToken);
    http_response_code(500);
    echo json_encode(['error' => "Erro de conexão TLS (Token): $err"]);
    exit();
}
curl_close($chToken);

if ($tokenStatusCode < 200 || $tokenStatusCode >= 300) {
    http_response_code(500);
    echo json_encode(['error' => "Erro na autenticação Cora ($tokenStatusCode): $tokenResponse"]);
    exit();
}

$tokenData = json_decode($tokenResponse, true);
$accessToken = $tokenData['access_token'];

// 3. Gerar o PIX (Invoice)
$valorCentavos = (int) round(floatval($valor) * 100);
$dueDate = date('Y-m-d', strtotime('+3 days'));
$cpfLimpo = preg_replace('/\D/', '', $doador_cpf);

$payloadPix = [
    'customer' => [
        'name' => $doador_nome,
        'email' => $doador_email,
        'document' => [
            'identity' => $cpfLimpo,
            'type' => strlen($cpfLimpo) === 14 ? 'CNPJ' : 'CPF'
        ]
    ],
    'services' => [
        [
            'name' => 'Doação Mensal - Instituto Sublim',
            'description' => 'Contribuição voluntária para a ONG',
            'amount' => $valorCentavos
        ]
    ],
    'payment_terms' => [
        'due_date' => $dueDate
    ],
    'payment_forms' => ['PIX']
];

$chPix = curl_init('https://matls-clients.api.cora.com.br/v2/invoices');
curl_setopt($chPix, CURLOPT_POST, 1);
curl_setopt($chPix, CURLOPT_POSTFIELDS, json_encode($payloadPix));
curl_setopt($chPix, CURLOPT_RETURNTRANSFER, true);
curl_setopt($chPix, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $accessToken,
    'Content-Type: application/json',
    'Idempotency-Key: ' . generateUUIDv4()
]);
curl_setopt($chPix, CURLOPT_SSLCERT, $CERT_PATH);
curl_setopt($chPix, CURLOPT_SSLKEY, $KEY_PATH);

$pixResponse = curl_exec($chPix);
$pixStatusCode = curl_getinfo($chPix, CURLINFO_HTTP_CODE);

if (curl_errno($chPix)) {
    $err = curl_error($chPix);
    curl_close($chPix);
    http_response_code(500);
    echo json_encode(['error' => "Erro de conexão TLS (Invoice): $err"]);
    exit();
}
curl_close($chPix);

if ($pixStatusCode < 200 || $pixStatusCode >= 300) {
    http_response_code(500);
    echo json_encode(['error' => "Erro ao gerar PIX Cora ($pixStatusCode): $pixResponse"]);
    exit();
}

$pixData = json_decode($pixResponse, true);
$coraId = $pixData['id'] ?? null;
$emv = $pixData['pix']['emv'] ?? null;

if (!$emv) {
    http_response_code(500);
    echo json_encode(['error' => 'A Cora não retornou a chave Pix Copia e Cola.']);
    exit();
}

// 4. Salvar no Supabase (REST API)
$supabasePayload = [
    'valor' => $valor,
    'status' => 'pendente',
    'cora_id' => $coraId,
    'qr_code_copia_cola' => $emv,
    'doador_nome' => $doador_nome,
    'doador_email' => $doador_email
];

$chSupabase = curl_init("$SUPABASE_URL/rest/v1/pagamentos_pix");
curl_setopt($chSupabase, CURLOPT_POST, 1);
curl_setopt($chSupabase, CURLOPT_POSTFIELDS, json_encode($supabasePayload));
curl_setopt($chSupabase, CURLOPT_RETURNTRANSFER, true);
curl_setopt($chSupabase, CURLOPT_HTTPHEADER, [
    'apikey: ' . $SUPABASE_SERVICE_KEY,
    'Authorization: Bearer ' . $SUPABASE_SERVICE_KEY,
    'Content-Type: application/json',
    'Prefer: return=representation'
]);

$supabaseResponse = curl_exec($chSupabase);
$supabaseStatusCode = curl_getinfo($chSupabase, CURLINFO_HTTP_CODE);
curl_close($chSupabase);

$pagamentoId = null;
if ($supabaseStatusCode >= 200 && $supabaseStatusCode < 300) {
    $supabaseData = json_decode($supabaseResponse, true);
    if (is_array($supabaseData) && count($supabaseData) > 0) {
        $pagamentoId = $supabaseData[0]['id'] ?? null;
    }
}

// 5. Retornar dados para o Front-end
echo json_encode([
    'sucesso' => true,
    'pagamento_id' => $pagamentoId,
    'qr_code_copia_cola' => $emv
]);
