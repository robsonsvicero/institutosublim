import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Lidar com requisição OPTIONS (CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { valor, doador_nome, doador_email, doador_cpf, diaVencimento } = await req.json()

    if (!valor || !doador_cpf) {
      return new Response(JSON.stringify({ error: 'Dados insuficientes (CPF ou valor)' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Obter as variáveis de ambiente com as credenciais da Cora
    const CORA_CLIENT_ID = Deno.env.get('CORA_CLIENT_ID')
    const CORA_CERT_PEM = Deno.env.get('CORA_CERT_PEM')
    const CORA_KEY_PEM = Deno.env.get('CORA_KEY_PEM')

    if (!CORA_CLIENT_ID || !CORA_CERT_PEM || !CORA_KEY_PEM) {
       throw new Error('Configurações mTLS da Cora ausentes no backend.')
    }

    // Configurar cliente HTTP com mTLS no Deno
    let client;
    try {
      client = Deno.createHttpClient({
        certChain: CORA_CERT_PEM.replace(/\\n/g, '\n'),
        privateKey: CORA_KEY_PEM.replace(/\\n/g, '\n'),
      })
    } catch (e) {
      console.warn("Deno.createHttpClient falhou, ignorando config de mTLS no http client, tentaremos sem (pode falhar se o ambiente exigir): ", e.message)
    }

    // 1. Obter Token (Produção)
    const tokenOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CORA_CLIENT_ID
      })
    }
    if (client) tokenOptions.client = client;

    const tokenResponse = await fetch('https://matls-clients.api.cora.com.br/token', tokenOptions)

    if (!tokenResponse.ok) {
      const err = await tokenResponse.text()
      throw new Error(`Erro na autenticação Cora: ${err}`)
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // 2. Criar Boleto/Pix
    const valorCentavos = Math.round(Number(valor) * 100)
    
    // Data de vencimento = hoje + 3 dias
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 3)
    const dueDateStr = dueDate.toISOString().split('T')[0]

    // Limpar CPF
    const cpfLimpo = doador_cpf.replace(/\D/g, '')

    const payload = {
      customer: {
        name: doador_nome || 'Doador Anônimo',
        email: doador_email || `contato_${Date.now()}@institutosublim.org`,
        document: {
          identity: cpfLimpo,
          type: cpfLimpo.length === 14 ? "CNPJ" : "CPF"
        }
      },
      services: [
        {
          name: "Doação Mensal - Instituto Sublim",
          description: "Contribuição voluntária para a ONG",
          amount: valorCentavos
        }
      ],
      payment_terms: {
        due_date: dueDateStr
      },
      payment_forms: ["PIX"]
    }

    const invoiceOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': crypto.randomUUID()
      },
      body: JSON.stringify(payload)
    }
    if (client) invoiceOptions.client = client;

    const invoiceResponse = await fetch('https://matls-clients.api.cora.com.br/v2/invoices', invoiceOptions)

    if (!invoiceResponse.ok) {
      const err = await invoiceResponse.text()
      throw new Error(`Erro ao gerar PIX Cora: ${err}`)
    }

    const invoiceData = await invoiceResponse.json()
    
    const coraId = invoiceData.id
    const emv = invoiceData.pix?.emv

    if (!emv) {
        throw new Error('A Cora não retornou a chave Pix Copia e Cola.')
    }

    // Inicializa cliente Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // 3. Inserir no banco de dados (Status pendente)
    // Tabela: pagamentos_pix
    const { data, error } = await supabase
      .from('pagamentos_pix')
      .insert([
        {
          valor,
          status: 'pendente',
          cora_id: coraId,
          qr_code_copia_cola: emv,
          doador_nome,
          doador_email
        }
      ])
      .select()
      .single()

    if (error) {
      console.error("Erro ao salvar no supabase: ", error)
      throw error
    }

    // 4. Retornar os dados para o frontend exibir
    return new Response(JSON.stringify({ 
      sucesso: true,
      pagamento_id: data.id,
      qr_code_copia_cola: emv
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("Function Error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200, // Retornamos 200 para que o frontend consiga ler o JSON de erro sem o SupabaseJS lançar exceção cega
    })
  }
})
