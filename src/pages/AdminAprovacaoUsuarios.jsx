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

  useEffect(() => {
    carregarUsuarios();
  }, [filtro]);

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

  const handleRoleChange = (id, newRole) => {
    setUsuarios(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  async function handleAprovar(id, role) {
    const { error } = await supabase
      .from('usuarios')
      .update({ 
        aprovado: true,
        role: role,
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

  async function handleRejeitar(authId, email) {
    if (!confirm(`Tem certeza que deseja rejeitar ${email}? O usuário será excluído.`)) return;

    try {
      const { error } = await supabase.rpc('delete_user_admin', { user_id: authId });

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

  return (
    <div className="max-w-5xl mx-auto p-8 pt-20">
      <button onClick={() => navigate('/admin')} className="text-black hover:opacity-60 transition text-sm flex items-center gap-1 mb-4">
        <i className="fas fa-arrow-left text-xs"></i> Voltar ao painel
      </button>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Aprovação de Usuários</h2>
      </div>

      {feedback && (
        <div className={`p-4 rounded mb-4 ${feedback.includes('Erro') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {feedback}
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFiltro('pendentes')}
          className={`px-4 py-2 rounded ${filtro === 'pendentes' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Pendentes
        </button>
        <button
          onClick={() => setFiltro('aprovados')}
          className={`px-4 py-2 rounded ${filtro === 'aprovados' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Aprovados
        </button>
        <button
          onClick={() => setFiltro('todos')}
          className={`px-4 py-2 rounded ${filtro === 'todos' ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}
        >
          Todos
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Carregando...</div>
      ) : usuarios.length === 0 ? (
        <p className="text-center text-gray-500 py-8">Nenhum usuário encontrado.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Nome</th>
                <th className="p-4 font-semibold text-gray-600">E-mail</th>
                <th className="p-4 font-semibold text-gray-600">Cargo</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {usuarios.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{u.nome || '-'}</div>
                    <div className="text-xs text-gray-500">
                      Criado em: {new Date(u.criado_em).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    {!u.aprovado ? (
                      <select
                        value={u.role || 'voluntario'}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="border rounded p-1 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="voluntario">Voluntário</option>
                        <option value="admin">Administrador</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {u.role === 'admin' ? 'Administrador' : 'Voluntário'}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      {!u.aprovado ? (
                        <>
                          <button
                            onClick={() => handleAprovar(u.id, u.role || 'voluntario')}
                            className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 text-sm font-medium transition flex items-center gap-1"
                          >
                            <i className="fas fa-check"></i> Aprovar
                          </button>
                          <button
                            onClick={() => handleRejeitar(u.auth_id, u.email)}
                            className="bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700 text-sm font-medium transition flex items-center gap-1"
                          >
                            <i className="fas fa-times"></i> Rejeitar
                          </button>
                        </>
                      ) : (
                        <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
                          <i className="fas fa-check-circle"></i> Aprovado em {new Date(u.aprovado_em).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
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
