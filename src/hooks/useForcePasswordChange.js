import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// Simulação: senha temporária tem prefixo 'temp-' (ajuste conforme sua lógica)
export function useForcePasswordChange(user) {
  const [mustChange, setMustChange] = useState(false);

  useEffect(() => {
    async function checkPassword() {
      if (!user) return;
      // Aqui você pode buscar um campo customizado ou usar uma convenção
      // Exemplo: buscar metadados do usuário
      const { data } = await supabase.auth.getUser();
      // Supondo que user.user_metadata.temp_password === true
      if (data?.user?.user_metadata?.temp_password) {
        setMustChange(true);
      } else {
        setMustChange(false);
      }
    }
    checkPassword();
  }, [user]);

  return mustChange;
}
