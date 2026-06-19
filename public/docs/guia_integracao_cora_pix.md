# 🏦 Guia de Integração: PIX via API Cora Bank

**Stack utilizada:** React (Frontend) + PHP (Backend) + Supabase (Banco de dados)  
**Última atualização:** Junho de 2026  
**Status:** Testado e funcionando em produção ✅

---

## 📋 Índice

1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Pré-requisitos na Cora](#2-pré-requisitos-na-cora)
3. [O que é mTLS e por que importa](#3-o-que-é-mtls-e-por-que-importa)
4. [Backend PHP (O coração da integração)](#4-backend-php-o-coração-da-integração)
5. [Frontend React](#5-frontend-react)
6. [Integração com Supabase (Banco de dados)](#6-integração-com-supabase-banco-de-dados)
7. [Deploy e Configuração no Servidor](#7-deploy-e-configuração-no-servidor)
8. [Armadilhas e Lições Aprendidas](#8-armadilhas-e-lições-aprendidas)
9. [Checklist de Deploy](#9-checklist-de-deploy)
10. [Glossário](#10-glossário)

---

## 1. Visão Geral da Arquitetura

```
[Usuário no Browser]
        |
        | POST /api/cora-pix.php  (JSON com dados do doador)
        v
[Servidor de Hospedagem - PHP]
        |
        | 1. Autentica com mTLS (Certificado + Chave Privada)
        | 2. Obtém Access Token
        | 3. Cria Invoice (cobrança PIX)
        | 4. Salva no banco de dados (Supabase REST API)
        | 5. Retorna QR Code (EMV / Copia e Cola)
        v
[Usuário vê o QR Code e paga]
        |
        | Webhook (Cora notifica quando pagamento for confirmado)
        v
[Servidor atualiza status no banco]
```

> [!IMPORTANT]
> **Por que PHP e não Supabase Edge Functions?**
> A API de produção da Cora exige **mTLS** (mutual TLS), ou seja, o servidor que faz a requisição precisa apresentar um certificado de cliente. O ambiente Supabase Edge Functions (baseado em Deno) **não suporta corretamente** a injeção de certificados de cliente em requisições `fetch` para servidores externos, resultando em erro `invalid_client`. O PHP com `cURL` suporta mTLS nativamente e sem limitações.

---

## 2. Pré-requisitos na Cora

### 2.1 Criar uma conta de integração
1. Acesse [developers.cora.com.br](https://developers.cora.com.br)
2. Crie uma conta ou faça login na conta bancária da empresa
3. Navegue até **Integrações > API** no painel

### 2.2 Gerar o Certificado mTLS
1. No painel da Cora, vá em **Integrações > Certificados**
2. Clique em **"Gerar novo certificado"**
3. O sistema irá baixar um arquivo `.zip` contendo:
   - `certificate.pem` — o certificado público
   - `private-key.key` — a chave privada (NUNCA compartilhe este arquivo!)
4. Anote o seu **Client ID** (formato: `int-XXXXXXXXXXXXXXXXXXXX`)

> [!CAUTION]
> O arquivo `private-key.key` é como a senha do cofre do banco. Se alguém tiver acesso a ele + ao seu Client ID, poderá gerar cobranças em nome da sua empresa. **Nunca suba este arquivo para o GitHub ou deixe acessível pela web.**

### 2.3 Ambientes disponíveis
| Ambiente | URL Token | URL Invoices | Certificado |
|---|---|---|---|
| **Produção** | `https://matls-clients.api.cora.com.br/token` | `https://matls-clients.api.cora.com.br/v2/invoices` | Gerado no painel Produção |
| **Sandbox/Stage** | `https://matls-clients.api.stage.cora.com.br/token` | `https://matls-clients.api.stage.cora.com.br/v2/invoices` | Gerado no painel Stage |

> [!WARNING]
> Os certificados de **Produção** e **Sandbox** são diferentes e não intercambiáveis. Usar o certificado de produção apontando para o endpoint de stage resulta em `invalid_client`, e vice-versa.

---

## 3. O que é mTLS e por que importa

**TLS normal** (HTTPS padrão): Só o servidor apresenta certificado. O cliente (browser, servidor PHP) apenas verifica se o servidor é confiável.

**mTLS (mutual TLS)**: **Ambos** os lados apresentam certificado. O servidor da Cora verifica se quem está se conectando é realmente você, usando o certificado que você gerou no painel deles.

```
Handshake TLS normal:
  Cora → "Aqui está meu certificado (sou a Cora mesmo)"
  Você → "Ok, confio em você"

Handshake mTLS:
  Cora → "Aqui está meu certificado (sou a Cora mesmo)"
  Você → "Aqui está meu certificado (sou o Cliente int-XXXX)"
  Cora → "Ok, reconheço você, pode prosseguir"
```

O PHP faz isso automaticamente quando você informa o certificado e a chave no `cURL`:
```php
curl_setopt($ch, CURLOPT_SSLCERT, '/caminho/para/certificate.pem');
curl_setopt($ch, CURLOPT_SSLKEY,  '/caminho/para/private-key.key');
```

---

## 4. Backend PHP (O coração da integração)

Crie o arquivo `public/api/cora-pix.php` no seu projeto:

```php
<?php
// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

$CORA_CLIENT_ID = 'int-SEU-CLIENT-ID-AQUI';

// Caminhos dos certificados (coloque FORA da public_html para maior segurança)
$CERT_PATH = __DIR__ . '/../../cora-certs/certificate.pem';
$KEY_PATH  = __DIR__ . '/../../cora-certs/private-key.key';

// Supabase (para salvar as transações)
$SUPABASE_URL         = 'https://SEU-PROJETO.supabase.co';
$SUPABASE_SERVICE_KEY = 'sua-service-role-key-do-supabase';

// ============================================================================

// Função para gerar UUID v4 válido (obrigatório no Idempotency-Key da Cora)
function generateUUIDv4() {
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

// Headers CORS (necessário para o frontend React chamar este arquivo)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json; charset=utf-8');

// Responde ao preflight do browser sem fazer nada
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { http_response_code(405); echo json_encode(['error' => 'Use POST']); exit(); }

// ── PASSO 1: Receber dados do frontend ──────────────────────────────────────
$input      = json_decode(file_get_contents('php://input'), true);
$valor      = $input['valor']       ?? null;
$doador_cpf = $input['doador_cpf']  ?? null;
$doador_nome  = !empty($input['doador_nome'])  ? $input['doador_nome']  : 'Doador Anônimo';
$doador_email = !empty($input['doador_email']) ? $input['doador_email'] : 'contato@seusite.org';

if (!$valor || !$doador_cpf) {
    http_response_code(400);
    echo json_encode(['error' => 'Campos valor e doador_cpf são obrigatórios']);
    exit();
}

// Verifica se os certificados existem
if (!file_exists($CERT_PATH) || !file_exists($KEY_PATH)) {
    http_response_code(500);
    echo json_encode(['error' => 'Certificados não encontrados. Verifique $CERT_PATH e $KEY_PATH.']);
    exit();
}

// ── PASSO 2: Autenticar com a Cora (OAuth2 client_credentials via mTLS) ─────
$chToken = curl_init('https://matls-clients.api.cora.com.br/token');
curl_setopt_array($chToken, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => http_build_query(['grant_type' => 'client_credentials', 'client_id' => $CORA_CLIENT_ID]),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSLCERT        => $CERT_PATH,  // ← Aqui acontece o mTLS
    CURLOPT_SSLKEY         => $KEY_PATH,
]);

$tokenResponse = curl_exec($chToken);
$tokenStatus   = curl_getinfo($chToken, CURLINFO_HTTP_CODE);

if (curl_errno($chToken)) {
    echo json_encode(['error' => 'Erro de conexão TLS: ' . curl_error($chToken)]);
    exit();
}
curl_close($chToken);

if ($tokenStatus < 200 || $tokenStatus >= 300) {
    http_response_code(500);
    echo json_encode(['error' => "Erro na autenticação Cora ($tokenStatus): $tokenResponse"]);
    exit();
}

$accessToken = json_decode($tokenResponse, true)['access_token'];

// ── PASSO 3: Criar a cobrança PIX (Invoice) ──────────────────────────────────
$valorCentavos = (int) round(floatval($valor) * 100);  // A Cora usa centavos!
$dueDate       = date('Y-m-d', strtotime('+3 days'));
$cpfLimpo      = preg_replace('/\D/', '', $doador_cpf);

$payload = [
    'customer' => [
        'name'     => $doador_nome,
        'email'    => $doador_email,
        'document' => [
            'identity' => $cpfLimpo,
            'type'     => strlen($cpfLimpo) === 14 ? 'CNPJ' : 'CPF'
        ]
    ],
    'services' => [[
        'name'        => 'Doação - Nome da ONG',
        'description' => 'Contribuição voluntária',
        'amount'      => $valorCentavos
    ]],
    'payment_terms' => ['due_date' => $dueDate],
    'payment_forms' => ['PIX']
];

$chPix = curl_init('https://matls-clients.api.cora.com.br/v2/invoices');
curl_setopt_array($chPix, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json',
        'Idempotency-Key: ' . generateUUIDv4()  // ← DEVE ser UUID v4 válido!
    ],
    CURLOPT_SSLCERT => $CERT_PATH,
    CURLOPT_SSLKEY  => $KEY_PATH,
]);

$pixResponse = curl_exec($chPix);
$pixStatus   = curl_getinfo($chPix, CURLINFO_HTTP_CODE);
curl_close($chPix);

if ($pixStatus < 200 || $pixStatus >= 300) {
    http_response_code(500);
    echo json_encode(['error' => "Erro ao gerar PIX Cora ($pixStatus): $pixResponse"]);
    exit();
}

$pixData = json_decode($pixResponse, true);
$coraId  = $pixData['id']         ?? null;
$emv     = $pixData['pix']['emv'] ?? null;  // Código "Copia e Cola" do PIX

if (!$emv) {
    http_response_code(500);
    echo json_encode(['error' => 'Cora não retornou o código PIX (emv).']);
    exit();
}

// ── PASSO 4: Salvar no Supabase ──────────────────────────────────────────────
$chSupa = curl_init("$SUPABASE_URL/rest/v1/pagamentos_pix");
curl_setopt_array($chSupa, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode([
        'valor'             => $valor,
        'status'            => 'pendente',
        'cora_id'           => $coraId,
        'qr_code_copia_cola'=> $emv,
        'doador_nome'       => $doador_nome,
        'doador_email'      => $doador_email,
    ]),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
        'apikey: ' . $SUPABASE_SERVICE_KEY,
        'Authorization: Bearer ' . $SUPABASE_SERVICE_KEY,
        'Content-Type: application/json',
        'Prefer: return=representation'
    ],
]);

$supaResponse = curl_exec($chSupa);
$supaStatus   = curl_getinfo($chSupa, CURLINFO_HTTP_CODE);
curl_close($chSupa);

$pagamentoId = null;
if ($supaStatus >= 200 && $supaStatus < 300) {
    $rows = json_decode($supaResponse, true);
    $pagamentoId = $rows[0]['id'] ?? null;
}

// ── PASSO 5: Retornar para o frontend ────────────────────────────────────────
echo json_encode([
    'sucesso'           => true,
    'pagamento_id'      => $pagamentoId,
    'qr_code_copia_cola'=> $emv
]);
```

---

## 5. Frontend React

### 5.1 Formulário de coleta de dados do doador

```jsx
// Antes de gerar o PIX, sempre colete Nome + E-mail + CPF
const [doadorNome, setDoadorNome]   = useState('');
const [doadorEmail, setDoadorEmail] = useState('');
const [doadorCpf, setDoadorCpf]     = useState('');
const [pixData, setPixData]         = useState(null);
const [isLoading, setIsLoading]     = useState(false);

const formatarCPF = (value) => {
  const n = value.replace(/\D/g, '').slice(0, 11);
  return n.replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const gerarPix = async (valor) => {
  if (!doadorNome.trim()) return alert('Informe seu nome.');
  if (doadorCpf.replace(/\D/g, '').length !== 11) return alert('CPF inválido.');

  setIsLoading(true);
  try {
    const response = await fetch('/api/cora-pix.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        valor,
        doador_nome:  doadorNome,
        doador_email: doadorEmail,
        doador_cpf:   doadorCpf.replace(/\D/g, '')
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error);
    setPixData(data);
  } catch (err) {
    alert('Erro ao gerar PIX: ' + err.message);
  } finally {
    setIsLoading(false);
  }
};
```

### 5.2 Exibir o QR Code

```jsx
import { QRCodeSVG } from 'qrcode.react';
// npm install qrcode.react

{isLoading && <p>Gerando PIX seguro...</p>}

{pixData && (
  <div>
    <QRCodeSVG value={pixData.qr_code_copia_cola} size={220} />
    <p>Código Copia e Cola:</p>
    <code>{pixData.qr_code_copia_cola}</code>
    <button onClick={() => navigator.clipboard.writeText(pixData.qr_code_copia_cola)}>
      Copiar Código
    </button>
  </div>
)}
```

---

## 6. Integração com Supabase (Banco de dados)

### 6.1 Tabela necessária

Execute no **SQL Editor** do Supabase:

```sql
CREATE TABLE pagamentos_pix (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at          TIMESTAMPTZ DEFAULT now(),
  valor               NUMERIC(10,2) NOT NULL,
  status              TEXT DEFAULT 'pendente', -- 'pendente' | 'pago' | 'cancelado'
  cora_id             TEXT,          -- ID da cobrança na Cora
  qr_code_copia_cola  TEXT,          -- Código EMV para o QR Code
  doador_nome         TEXT,
  doador_email        TEXT
);

-- Ativar RLS
ALTER TABLE pagamentos_pix ENABLE ROW LEVEL SECURITY;

-- Permitir que o service_role escreva (o PHP usa service_role)
-- A leitura pública não é necessária (dados financeiros são sensíveis)
```

### 6.2 Polling de status no frontend (verificar se foi pago)

```jsx
// Verifica a cada 5 segundos se o pagamento foi confirmado
useEffect(() => {
  if (!pixData?.pagamento_id) return;
  
  const interval = setInterval(async () => {
    const { data } = await supabase
      .from('pagamentos_pix')
      .select('status')
      .eq('id', pixData.pagamento_id)
      .single();

    if (data?.status === 'pago') {
      alert('Pagamento confirmado! Obrigado!');
      clearInterval(interval);
    }
  }, 5000);

  return () => clearInterval(interval);
}, [pixData]);
```

---

## 7. Deploy e Configuração no Servidor

### 7.1 Estrutura de pastas recomendada no servidor

```
/home/usuário/                     ← Raiz do usuário (não acessível pela web)
  ├── cora-certs/
  │   ├── certificate.pem          ← Certificado (fora da public_html!)
  │   └── private-key.key          ← Chave privada (fora da public_html!)
  │
  └── public_html/                 ← Pasta pública (acessível pela web)
      ├── index.html
      ├── assets/
      │   └── index-XXXXXX.js
      └── api/
          └── cora-pix.php         ← Script PHP
```

### 7.2 Verificando os caminhos no PHP

No arquivo `cora-pix.php`, os caminhos seguem esta lógica:

```php
// __DIR__ = /home/usuário/public_html/api
// /../../  = sobe 2 pastas = /home/usuário/
// /cora-certs/ = entra na pasta segura

$CERT_PATH = __DIR__ . '/../../cora-certs/certificate.pem';
//                       ↑ sobe de /api  ↑ sobe de /public_html
```

### 7.3 Script de diagnóstico (usar apenas para testar, remover depois)

Crie `public/api/diagnostico.php` temporariamente:

```php
<?php
header('Content-Type: application/json');
$CERT_PATH = __DIR__ . '/../../cora-certs/certificate.pem';
$KEY_PATH  = __DIR__ . '/../../cora-certs/private-key.key';

echo json_encode([
    '__DIR__'      => __DIR__,
    'cert_existe'  => file_exists($CERT_PATH) ? 'SIM ✅' : 'NÃO ❌',
    'key_existe'   => file_exists($KEY_PATH)  ? 'SIM ✅' : 'NÃO ❌',
    'cert_path'    => realpath($CERT_PATH) ?: 'não encontrado',
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
```

Acesse `https://seusite.com.br/api/diagnostico.php` no browser para verificar.

---

## 8. Armadilhas e Lições Aprendidas

### ❌ Armadilha 1: Supabase Edge Functions não suportam mTLS

**Problema:** A API da Cora usa mTLS obrigatório. O Supabase Edge Functions (Deno) não consegue enviar certificados de cliente em requisições `fetch` para APIs externas.

**Solução:** Use PHP com cURL no servidor de hospedagem tradicional. O cURL suporta mTLS nativamente.

---

### ❌ Armadilha 2: Certificados com quebras de linha incorretas

**Problema:** Ao salvar certificados como variáveis de ambiente (Supabase Secrets, `.env`), as quebras de linha `\n` viram texto literal `\\n`, corrompendo o certificado.

**Solução ao usar PHP:** Leia o arquivo diretamente com `file_exists()` e passe o caminho para o cURL. Não é necessário manipular o conteúdo.

---

### ❌ Armadilha 3: Idempotency-Key deve ser UUID v4

**Problema:** A Cora rejeita com erro `400` se o `Idempotency-Key` não for um UUID v4 válido no formato `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

**Solução:** Use a função `generateUUIDv4()` do exemplo acima. Não use `bin2hex(random_bytes(16))` — isso gera hex sem hífens.

---

### ❌ Armadilha 4: CPF inválido (zeros ou placeholder)

**Problema:** A Cora valida o CPF do cliente. Enviar `00000000000` (placeholder) causa erro `400: is not a valid CPF`.

**Solução:** Sempre colete o CPF real do usuário com um formulário antes de gerar o PIX.

---

### ❌ Armadilha 5: Certificado de produção no endpoint de sandbox

**Problema:** O certificado gerado em "Produção" só funciona com `api.cora.com.br`. O certificado de "Stage" só funciona com `api.stage.cora.com.br`. Misturar os dois causa `invalid_client`.

**Solução:** Use sempre o ambiente e o certificado correspondentes.

---

### ❌ Armadilha 6: Valor em reais vs. centavos

**Problema:** A API da Cora espera o valor em **centavos** (inteiro). Enviar `50.00` como reais resulta em uma cobrança de R$ 5.000,00.

**Solução:**
```php
$valorCentavos = (int) round(floatval($valor) * 100);
// R$ 50,00 → 5000 centavos ✅
```

---

## 9. Checklist de Deploy

Antes de publicar, confirme cada item:

- [ ] Arquivo `certificate.pem` enviado para `cora-certs/` (fora da public_html)
- [ ] Arquivo `private-key.key` enviado para `cora-certs/` (fora da public_html)
- [ ] `$CORA_CLIENT_ID` correto no `cora-pix.php`
- [ ] `$SUPABASE_SERVICE_KEY` preenchida no `cora-pix.php`
- [ ] Tabela `pagamentos_pix` criada no Supabase com RLS ativado
- [ ] Acessar `/api/diagnostico.php` e confirmar `cert_existe: SIM ✅`
- [ ] Fazer um teste real de doação e verificar se o QR Code aparece
- [ ] Verificar no painel da Cora se a cobrança foi criada
- [ ] **Remover** o arquivo `diagnostico.php` do servidor após os testes

---

## 10. Glossário

| Termo | Significado |
|---|---|
| **mTLS** | Mutual TLS — protocolo onde ambos os lados (cliente e servidor) se autenticam com certificados |
| **certificate.pem** | Certificado público que identifica sua empresa perante a API da Cora |
| **private-key.key** | Chave privada correspondente ao certificado. Nunca compartilhar. |
| **Client ID** | Identificador único da sua integração na Cora (formato `int-XXXX`) |
| **Access Token** | Token temporário (1 hora) obtido após autenticação, usado nas chamadas subsequentes |
| **Invoice** | Cobrança criada na Cora. Cada PIX gerado é uma Invoice. |
| **EMV** | Padrão do código "Copia e Cola" do PIX (também chamado de Payload PIX) |
| **Idempotency-Key** | UUID único por requisição. Evita criar cobranças duplicadas se a requisição for repetida. |
| **Service Role Key** | Chave secreta do Supabase com acesso total ao banco de dados (ignora RLS) |
