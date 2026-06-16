import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// TODO: Importar chaves e certificado da Cora
// const CORA_CLIENT_ID = Deno.env.get('CORA_CLIENT_ID')
// const CORA_CLIENT_SECRET = Deno.env.get('CORA_CLIENT_SECRET')

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
    const { valor, doador_nome, doador_email } = await req.json()

    if (!valor) {
      return new Response(JSON.stringify({ error: 'Valor não informado' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Inicializa cliente Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // TODO: Fazer a requisição mTLS para a API da Cora para gerar o PIX
    // Como ainda não temos os certificados, vamos MOCKAR (simular) o retorno.
    
    // Simulação do retorno da Cora:
    const mockCoraId = `cora_mock_${Date.now()}`
    const mockQrCodeCopiaCola = `00020126580014br.gov.bcb.pix0136${mockCoraId}5204000053039865405${valor}5802BR5915INSTITUTO SUBLIM6009SAO PAULO62070503***63041A2B`
    const mockQrCodeBase64 = "MOCK_BASE64_IMAGE_DATA_HERE" // No frontend usaremos uma lib para gerar o QR code a partir do copia e cola se necessário.

    // 1. Inserir no banco de dados (Status pendente)
    const { data, error } = await supabase
      .from('pagamentos_pix')
      .insert([
        {
          valor,
          status: 'pendente',
          cora_id: mockCoraId,
          qr_code_base64: mockQrCodeBase64,
          qr_code_copia_cola: mockQrCodeCopiaCola,
          doador_nome,
          doador_email
        }
      ])
      .select()
      .single()

    if (error) throw error

    // 2. Retornar os dados para o frontend exibir
    return new Response(JSON.stringify({ 
      sucesso: true,
      pagamento_id: data.id,
      qr_code_copia_cola: mockQrCodeCopiaCola,
      // qr_code_base64: mockQrCodeBase64 // Se a API retornar a imagem
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
