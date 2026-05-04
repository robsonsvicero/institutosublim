import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { sendEmail } from '../lib/sendEmail';

function gerarSenhaTemporaria() {
  return Math.random().toString(36).slice(-8) + Math.floor(Math.random() * 1000);
}

export default function AdminUsuarios() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
  const usersApiUrl = `${apiBaseUrl}/api/users`;
  const [usuarios, setUsuarios] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Só o admin pode acessar
  const isAdmin = user?.email === 'robsonsvicero@outlook.com';

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(usersApiUrl);
        const result = await response.json().catch(() => ({}));
        if (response.ok) setUsuarios(result.users || []);
        else setError('Erro ao carregar usuários.');
      } catch {
        setError('Nao foi possivel conectar com a API.');
      }
    }
    if (isAdmin) fetchUsers();
  }, [isAdmin, usersApiUrl]);

  async function handleAddUser(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const senhaTemp = gerarSenhaTemporaria();
    try {
      const response = await fetch(usersApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senhaTemp })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError('Erro ao cadastrar usuário: ' + (result.error || 'Erro desconhecido.'));
        setLoading(false);
        return;
      }
      // Envia e-mail automático
      console.log('Email para envio:', email, senhaTemp);
      const emailEnviado = await sendEmail({ to: email, senhaTemp });
      setLoading(false);
      if (emailEnviado) {
        setSuccess('Usuário cadastrado! Senha temporária enviada por e-mail.');
        setEmail('');
      } else {
        setSuccess('Usuário cadastrado, mas houve erro ao enviar o e-mail.');
      }
    } catch (err) {
      setError('Erro ao conectar com o backend.');
      setLoading(false);
    }
  }

  async function handleDeleteUser(id) {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${usersApiUrl}/${id}`, { method: 'DELETE' });
      const result = await response.json().catch(() => ({}));
      if (response.ok) {
        setUsuarios(usuarios.filter(u => (u.supabaseId || u.id) !== id));
      } else {
        setError('Erro ao excluir: ' + (result.error || 'Erro desconhecido.'));
      }
    } catch {
      setError('Nao foi possivel conectar com a API.');
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-8 pt-20">
      <button onClick={() => navigate('/admin')} className="text-black hover:opacity-60 transition text-sm flex items-center gap-1 mb-4">
        <i className="fas fa-arrow-left text-xs"></i> Voltar ao painel
      </button>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Gestão de Usuários</h2>
      </div>
      {!isAdmin ? (
        <div className="text-red-500">Acesso restrito ao administrador.</div>
      ) : (
        <>
          <form onSubmit={handleAddUser} className="flex gap-2 mb-8">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="E-mail do novo usuário"
              className="border p-2 rounded flex-1"
              required
            />
            <Button type="submit" variant="primary" disabled={loading}>Cadastrar Usuário</Button>
          </form>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {success && <div className="text-green-500 mb-2">{success}</div>}
          <ul className="divide-y">
            {usuarios.map(u => (
              <li key={u.supabaseId || u.id} className="py-3 flex items-center justify-between gap-4">
                <span className="text-sm text-gray-800 truncate">{u.email}</span>
                {u.email !== 'robsonsvicero@outlook.com' && (
                  <button
                    onClick={() => handleDeleteUser(u.supabaseId || u.id)}
                    className="shrink-0 text-sm border border-red-200 rounded-lg py-1.5 px-3 hover:bg-red-50 transition text-red-600 font-medium"
                  >
                    <i className="fas fa-trash mr-1 text-xs"></i> Excluir
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
