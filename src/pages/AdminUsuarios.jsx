import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { sendEmail } from '../lib/sendEmail';

function gerarSenhaTemporaria() {
  return Math.random().toString(36).slice(-8) + Math.floor(Math.random() * 1000);
}

export default function AdminUsuarios() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Só o admin pode acessar
  const isAdmin = user?.email === 'robsonsvicero@outlook.com';

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.auth.admin.listUsers();
      if (!error) setUsuarios(data?.users || []);
    }
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  async function handleAddUser(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const senhaTemp = gerarSenhaTemporaria();
    try {
      const response = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senhaTemp })
      });
      const result = await response.json();
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
    await supabase.auth.admin.deleteUser(id);
    setLoading(false);
    setUsuarios(usuarios.filter(u => u.id !== id));
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
              <li key={u.id} className="py-2 flex items-center justify-between">
                <span>{u.email}</span>
                {u.email !== 'robsonsvicero@outlook.com' && (
                  <Button variant="outline" size="sm" onClick={() => handleDeleteUser(u.id)}>
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
