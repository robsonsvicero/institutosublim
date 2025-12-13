import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export default function AlterarSenha() {
  const { user } = useAuth();
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleChangePassword(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (novaSenha !== confirmarSenha) {
      setError('A nova senha e a confirmação não coincidem.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: novaSenha });
    setLoading(false);
    if (error) {
      setError('Erro ao alterar senha: ' + error.message);
    } else {
      setSuccess('Senha alterada com sucesso!');
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');
    }
  }

  if (!user) {
    return <div className="p-8 text-center">Você precisa estar logado para alterar a senha.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Alterar Senha</h2>
      <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Nova senha"
          value={novaSenha}
          onChange={e => setNovaSenha(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmarSenha}
          onChange={e => setConfirmarSenha(e.target.value)}
          className="border p-2 rounded"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">{success}</div>}
        <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Alterando...' : 'Alterar Senha'}</Button>
      </form>
    </div>
  );
}
