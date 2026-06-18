import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Cliente HTTP rudimentar que escreve direto no Socket TLS (contornando o fetch do Supabase)
async function fetchRawTLS(urlStr: string, options: any, cert: string, key: string) {
  const url = new URL(urlStr)
  const hostname = url.hostname
  const port = url.port ? parseInt(url.port) : 443
  const path = url.pathname + url.search

  // Conecta diretamente via TLS enviando o certificado do cliente
  const conn = await Deno.connectTls({
    hostname,
    port,
    certChain: cert,
    privateKey: key
  })

  const bodyStr = typeof options.body === 'string' ? options.body : (options.body ? options.body.toString() : '')
  
  // Escreve a requisição usando HTTP/1.0 para forçar o fechamento sem chunked encoding
  let reqStr = `${options.method || 'GET'} ${path} HTTP/1.0\r\n`
  reqStr += `Host: ${hostname}\r\n`
  reqStr += `Connection: close\r\n`
  reqStr += `Accept: application/json\r\n`
  
  if (options.headers) {
    for (const [k, v] of Object.entries(options.headers)) {
      reqStr += `${k}: ${v}\r\n`
    }
  }
  
  const encodedBody = new TextEncoder().encode(bodyStr)
  if (bodyStr) {
    reqStr += `Content-Length: ${encodedBody.length}\r\n`
  }
  
  reqStr += `\r\n`
  if (bodyStr) {
    reqStr += bodyStr
  }

  await conn.write(new TextEncoder().encode(reqStr))

  // Lê a resposta completa
  const buf = new Uint8Array(8192)
  let resBytes = new Uint8Array(0)
  
  while (true) {
    const n = await conn.read(buf)
    if (n === null || n === 0) break
    
    const chunk = buf.subarray(0, n)
    const newResBytes = new Uint8Array(resBytes.length + chunk.length)
    newResBytes.set(resBytes)
    newResBytes.set(chunk, resBytes.length)
    resBytes = newResBytes
  }
  conn.close()

  const resStr = new TextDecoder().decode(resBytes)

  // O HTTP sempre separa headers do corpo com dois CRLF
  const splitIndex = resStr.indexOf('\r\n\r\n')
  if (splitIndex === -1) {
    throw new Error('Resposta HTTP malformada: ' + resStr)
  }

  const headerPart = resStr.substring(0, splitIndex)
  const bodyPart = resStr.substring(splitIndex + 4)
  
  const lines = headerPart.split('\r\n')
  const statusLine = lines[0]
  const statusCode = parseInt(statusLine.split(' ')[1])

  return {
    ok: statusCode >= 200 && statusCode < 300,
    status: statusCode,
    text: () => Promise.resolve(bodyPart),
    json: () => {
      try {
        return Promise.resolve(JSON.parse(bodyPart))
      } catch (e) {
        return Promise.reject(new Error(`Erro ao fazer parse do JSON. Status: ${statusCode}. Body: ${bodyPart}`))
      }
    }
  }
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

    const CORA_CLIENT_ID = raw_CORA_CLIENT_ID.replace(/^"|"$/g, '')
    const certFormated = raw_CORA_CERT_PEM.replace(/^"|"$/g, '').replace(/\\n/g, '\n')
    const keyFormated = raw_CORA_KEY_PEM.replace(/^"|"$/g, '').replace(/\\n/g, '\n')

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

    const tokenResponse = await fetchRawTLS('https://matls-clients.api.cora.com.br/token', tokenOptions, certFormated, keyFormated)

    if (!tokenResponse.ok) {
      const err = await tokenResponse.text()
      throw new Error(`Erro na autenticação Cora (${tokenResponse.status}): ${err}`)
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

    const invoiceResponse = await fetchRawTLS('https://matls-clients.api.cora.com.br/v2/invoices', invoiceOptions, certFormated, keyFormated)

    if (!invoiceResponse.ok) {
      const err = await invoiceResponse.text()
      throw new Error(`Erro ao gerar PIX Cora (${invoiceResponse.status}): ${err}`)
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
