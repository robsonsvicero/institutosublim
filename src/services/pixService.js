import { supabase } from '../lib/supabaseClient'; // Ajuste o path se necessário

/**
 * Serviço responsável por comunicar com o Backend (Edge Functions) para gerar e consultar PIX.
 */

// Como as edge functions ainda não estão ativas na produção com a Cora,
// usaremos mock para simular o frontend funcionando hoje.
const IS_MOCK_MODE = true;

export const pixService = {
  /**
   * Solicita a geração de um novo PIX
   */
  async gerarPix(valor, doador_nome = 'Anônimo', doador_email = '') {
    try {
      if (IS_MOCK_MODE) {
        // Simula o tempo de rede
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simula o id gerado e salvo no Supabase
        const mockId = 'mock-id-' + Date.now();
        const qrCodeCopiaCola = `00020126580014br.gov.bcb.pix0136mock1235204000053039865405${valor.toFixed(2)}5802BR5915INSTITUTO SUBLIM6009SAO PAULO62070503***63041A2B`;
        
        return {
          sucesso: true,
          pagamento_id: mockId,
          qr_code_copia_cola: qrCodeCopiaCola
        };
      }

      // Lógica real quando a edge function estiver no ar:
      /*
      const { data, error } = await supabase.functions.invoke('cora-pix', {
        body: { valor, doador_nome, doador_email }
      });
      
      if (error) throw error;
      return data;
      */
    } catch (error) {
      console.error("Erro ao gerar PIX:", error);
      throw error;
    }
  },

  /**
   * Consulta o status do pagamento pelo ID
   */
  async verificarStatusPix(pagamento_id) {
    if (IS_MOCK_MODE) {
      // Simula a consulta
      await new Promise(resolve => setTimeout(resolve, 500));
      // Sorteio bobo apenas para simular que uma hora ele "paga" durante o teste visual
      const mockStatus = Math.random() > 0.8 ? 'pago' : 'pendente';
      return { status: mockStatus };
    }

    // Lógica real consultando o Supabase
    /*
    const { data, error } = await supabase
      .from('pagamentos_pix')
      .select('status')
      .eq('id', pagamento_id)
      .single();

    if (error) throw error;
    return data;
    */
  }
};
