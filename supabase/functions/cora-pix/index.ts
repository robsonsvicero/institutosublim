import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
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

    const raw_CORA_CLIENT_ID = Deno.env.get('CORA_CLIENT_ID')
    const raw_CORA_CERT_PEM = Deno.env.get('CORA_CERT_PEM')
    const raw_CORA_KEY_PEM = Deno.env.get('CORA_KEY_PEM')

    if (!raw_CORA_CLIENT_ID || !raw_CORA_CERT_PEM || !raw_CORA_KEY_PEM) {
       throw new Error('Configurações mTLS da Cora ausentes no backend.')
    }

    // REMOVE as aspas duplas caso o Supabase tenha injetado como string literal
    const CORA_CLIENT_ID = raw_CORA_CLIENT_ID.replace(/^"|"$/g, '')
    const certFormated = raw_CORA_CERT_PEM.replace(/^"|"$/g, '').replace(/\\n/g, '\n')
    const keyFormated = raw_CORA_KEY_PEM.replace(/^"|"$/g, '').replace(/\\n/g, '\n')

    // Configurar cliente HTTP com mTLS no Deno
    let client;
    try {
      client = Deno.createHttpClient({
        certChain: certFormated,
        privateKey: keyFormated,
      })
    } catch (e) {
      throw new Error("Deno.createHttpClient falhou: " + e.message)
    }

    // 1. Obter Token (Produção)
    const tokenOptions: any = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CORA_CLIENT_ID
      }).toString()
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
    
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 3)
    const dueDateStr = dueDate.toISOString().split('T')[0]

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

    const invoiceOptions: any = {
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

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

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

    return new Response(JSON.stringify({ 
      sucesso: true,
      pagamento_id: data.id,
      qr_code_copia_cola: emv
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error: any) {
    console.error("Function Error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  }
})
