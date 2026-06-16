import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // O Webhook da Cora vai bater aqui via POST.
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    // A Cora envia os dados do pagamento no body.
    // Vamos precisar validar o token/assinatura da Cora amanhã.
    const body = await req.json()
    
    // Por enquanto, simulamos que recebemos o id do pagamento
    // O payload real dependerá da documentação de webhook da Cora
    const { id_cora, status } = body

    if (!id_cora) {
      return new Response(JSON.stringify({ error: 'Payload inválido' }), { status: 400 })
    }

    // Inicializa cliente Supabase com Service Role para ignorar RLS e atualizar banco
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Se o status retornado pela Cora for de sucesso (ex: 'PAID' ou 'COMPLETED')
    // Atualizamos no banco
    if (status === 'PAID') {
      const { error } = await supabase
        .from('pagamentos_pix')
        .update({ status: 'pago', updated_at: new Date().toISOString() })
        .eq('cora_id', id_cora)

      if (error) throw error
    }

    // Retorna 200 OK rápido para a Cora saber que recebemos
    return new Response(JSON.stringify({ message: 'Webhook processado com sucesso' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Erro no webhook:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
