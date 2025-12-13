import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/ui/Button';
import { useForcePasswordChange } from '../hooks/useForcePasswordChange';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const navigate = useNavigate();
  const mustChange = useForcePasswordChange(user);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError('Usuário ou senha inválidos.');
    } else if (data?.user) {
      setUser(data.user);
      navigate('/admin');
      if (onLogin) onLogin(data.user);
    }
  }

  // Redireciona para alteração de senha se necessário
  React.useEffect(() => {
    if (mustChange) {
      navigate('/alterar-senha');
    }
  }, [mustChange, navigate]);

  async function handleResetPassword(e) {
    e.preventDefault();
    setResetMsg('');
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: window.location.origin + '/alterar-senha'
    });
    if (error) {
      setResetMsg('Erro ao enviar e-mail: ' + error.message);
    } else {
      setResetMsg('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-4">
        {!showReset ? (
          <>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold mb-4 text-center">Login Administrativo</h2>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border p-2 rounded"
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border p-2 rounded"
                required
              />
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
            </form>
            <button
              className="text-sm text-primary-600 underline mt-2"
              type="button"
              onClick={() => setShowReset(true)}
            >
              Esqueci minha senha
            </button>
          </>
        ) : (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-4 text-center">Recuperar Senha</h2>
            <input
              type="email"
              placeholder="Seu e-mail"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <Button type="submit" variant="primary">Enviar e-mail de recuperação</Button>
            <button
              className="text-sm text-primary-600 underline"
              type="button"
              onClick={() => setShowReset(false)}
            >
              Voltar ao login
            </button>
            {resetMsg && <div className={resetMsg.startsWith('Erro') ? 'text-red-500' : 'text-green-600'}>{resetMsg}</div>}
          </form>
        )}
      </div>
    </div>
  );
}
