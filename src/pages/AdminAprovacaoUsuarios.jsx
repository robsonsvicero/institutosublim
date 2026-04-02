import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function AdminAprovacaoUsuarios() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [filtro, setFiltro] = useState('pendentes'); // 'pendentes', 'aprovados', 'todos'

  // Verificar se é admin
  const isAdmin = user?.email === 'hello@svicerostudio.com.br';

  useEffect(() => {
    if (!user) return;
    if (!isAdmin) {
      setFeedback('Acesso negado. Apenas administrador pode acessar esta página.');
      setTimeout(() => navigate('/admin'), 2000);
      return;
    }
    carregarUsuarios();
  }, [user, isAdmin, navigate]);

  async function carregarUsuarios() {
    setLoading(true);
    setFeedback('');

    let query = supabase
      .from('usuarios')
      .select('*')
      .order('criado_em', { ascending: false });

    if (filtro === 'pendentes') {
      query = query.eq('aprovado', false);
    } else if (filtro === 'aprovados') {
      query = query.eq('aprovado', true);
    }

    const { data, error } = await query;

    if (error) {
      setFeedback('Erro ao carregar usuários: ' + error.message);
    } else {
      setUsuarios(data || []);
    }
    setLoading(false);
  }

  async function handleAprovar(id) {
    const { error } = await supabase
      .from('usuarios')
      .update({ 
        aprovado: true,
        aprovado_em: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      setFeedback('Erro ao aprovar usuário: ' + error.message);
    } else {
      setFeedback('Usuário aprovado com sucesso!');
      await carregarUsuarios();
    }
  }

  async function handleRejeitar(id, email) {
    if (!confirm(`Tem certeza que deseja rejeitar ${email}?`)) return;

    try {
      // 1. Deletar do Supabase Auth
      await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      // 2. Deletar da tabela usuarios
      const { error } = await supabase
        .from('usuarios')
        .delete()
        .eq('id', id);

      if (error) {
        setFeedback('Erro ao rejeitar usuário: ' + error.message);
      } else {
        setFeedback('Usuário rejeitado e deletado com sucesso!');
        await carregarUsuarios();
      }
    } catch (err) {
      setFeedback('Erro: ' + err.message);
    }
  }

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Aprovação de Usuários</h2>

      {feedback && (
        <div className={`p-4 rounded mb-4 ${feedback.includes('Erro') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {feedback}
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setFiltro('pendentes');
            carregarUsuarios();
          }}
          className={`px-4 py-2 rounded ${filtro === 'pendentes' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Pendentes
        </button>
        <button
          onClick={() => {
            setFiltro('aprovados');
            carregarUsuarios();
          }}
          className={`px-4 py-2 rounded ${filtro === 'aprovados' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Aprovados
        </button>
        <button
          onClick={() => {
            setFiltro('todos');
            carregarUsuarios();
          }}
          className={`px-4 py-2 rounded ${filtro === 'todos' ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}
        >
          Todos
        </button>
      </div>

      {usuarios.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum usuário encontrado.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Nome</th>
                <th className="border p-3 text-left">E-mail</th>
                <th className="border p-3 text-left">Status</th>
                <th className="border p-3 text-left">Criado em</th>
                <th className="border p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border p-3">{user.nome || '-'}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3">
                    {user.aprovado ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Aprovado</span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pendente</span>
                    )}
                  </td>
                  <td className="border p-3 text-sm">
                    {new Date(user.criado_em).toLocaleDateString('pt-BR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="border p-3 text-center">
                    {!user.aprovado ? (
                      <>
                        <button
                          onClick={() => handleAprovar(user.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
                        >
                          Aprovar
                        </button>
                        <button
                          onClick={() => handleRejeitar(user.id, user.email)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Rejeitar
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
