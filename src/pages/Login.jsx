import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/ui/Button';
import { useForcePasswordChange } from '../hooks/useForcePasswordChange';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const navigate = useNavigate();
  const mustChange = useForcePasswordChange(user);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 1. Fazer login no Supabase Auth
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    
    if (authError) {
      setLoading(false);
      setError('Usuário ou senha inválidos.');
      return;
    }

    // 2. Verificar se usuário foi aprovado
    const { data: usuarioData, error: dbError } = await supabase
      .from('usuarios')
      .select('aprovado')
      .eq('auth_id', data.user.id)
      .single();

    if (dbError || !usuarioData) {
      setLoading(false);
      setError('Dados de usuário não encontrados. Contate o administrador.');
      await supabase.auth.signOut();
      return;
    }

    if (!usuarioData.aprovado) {
      setLoading(false);
      setError('Sua conta ainda não foi aprovada pelo administrador.');
      await supabase.auth.signOut();
      return;
    }

    setLoading(false);
    if (data?.user) {
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
    <div className="min-h-screen flex items-center justify-center bg-[#D1D1D1]">
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
                disabled={loading}
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
              {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}
              <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
            </form>
            <div className="flex flex-col gap-2 text-sm">
              <button
                className="text-primary-600 underline hover:text-primary-700"
                type="button"
                onClick={() => setShowReset(true)}
              >
                Esqueci minha senha
              </button>
              <Link to="/signup" className="text-primary-600 underline hover:text-primary-700">
                Criar nova conta
              </Link>
            </div>
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
              disabled={loading}
            />
            <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Enviando...' : 'Enviar e-mail de recuperação'}</Button>
            {resetMsg && (
              <div className={`text-sm p-2 rounded text-center ${resetMsg.includes('erro') || resetMsg.includes('Erro') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {resetMsg}
              </div>
            )}
            <button
              className="text-primary-600 underline hover:text-primary-700"
              type="button"
              onClick={() => setShowReset(false)}
            >
              Voltar ao login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
