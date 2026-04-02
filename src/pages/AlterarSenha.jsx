import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export default function AlterarSenha() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleChangePassword(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (novaSenha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

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
      setNovaSenha('');
      setConfirmarSenha('');
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg">Você precisa estar logado para alterar a senha.</p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/login')}
            className="mt-4"
          >
            Ir para Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Alterar Senha</h2>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded mb-4">
            {success}
          </div>
        )}

        {!success ? (
          <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nova senha"
                value={novaSenha}
                onChange={e => setNovaSenha(e.target.value)}
                className="border p-2 rounded w-full"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
                title={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar nova senha"
                value={confirmarSenha}
                onChange={e => setConfirmarSenha(e.target.value)}
                className="border p-2 rounded w-full"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
                title={showConfirmPassword ? 'Esconder senha' : 'Mostrar senha'}
                aria-label={showConfirmPassword ? 'Esconder senha' : 'Mostrar senha'}
              >
                {showConfirmPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </button>
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Alterando...' : 'Alterar Senha'}
            </Button>

            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="text-sm text-gray-600 underline hover:text-gray-900"
            >
              Voltar
            </button>
          </form>
        ) : (
          <p className="text-center text-gray-600">Redirecionando...</p>
        )}
      </div>
    </div>
  );
}
