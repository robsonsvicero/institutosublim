import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchUserProfile(authUser) {
    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    // Busca o perfil na tabela usuarios
    const { data: profile } = await supabase
      .from('usuarios')
      .select('role, aprovado')
      .eq('auth_id', authUser.id)
      .single();

    // Combina os dados do auth com os do banco
    setUser({
      ...authUser,
      role: profile?.role || 'voluntario',
      aprovado: profile?.aprovado || false,
    });
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      fetchUserProfile(data?.session?.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoading(true);
      fetchUserProfile(session?.user);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
