import React, { useEffect, useState } from 'react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { sendEmail } from '../lib/sendEmail';

function gerarSenhaTemporaria() {
  return Math.random().toString(36).slice(-8) + Math.floor(Math.random() * 1000);
}

export default function AdminUsuarios() {
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
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Gestão de Usuários</h2>
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
              <li key={u.supabaseId || u.id} className="py-2 flex items-center justify-between">
                <span>{u.email}</span>
                {u.email !== 'robsonsvicero@outlook.com' && (
                  <Button variant="outline" size="sm" onClick={() => handleDeleteUser(u.supabaseId || u.id)}>
                    Excluir
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
