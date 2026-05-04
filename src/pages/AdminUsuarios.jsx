import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function AdminUsuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('criado_em', { ascending: false });

    if (error) {
      setError('Erro ao carregar usuários: ' + error.message);
    } else {
      setUsuarios(data || []);
    }
    setLoading(false);
  }

  async function handleDeleteUser(authId, nome, role) {
    if (role === 'admin') {
      alert('Não é possível excluir um administrador por aqui.');
      return;
    }
    if (!window.confirm(`Tem certeza que deseja excluir o usuário ${nome || ''}?`)) return;
    
    setLoading(true);
    setError('');
    
    // Chama a RPC criada no Supabase para deletar o usuário
    const { error } = await supabase.rpc('delete_user_admin', { user_id: authId });
    
    if (error) {
      setError('Erro ao excluir: ' + error.message);
    } else {
      setUsuarios(usuarios.filter(u => u.auth_id !== authId));
    }
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto p-8 pt-20">
      <button onClick={() => navigate('/admin')} className="text-black hover:opacity-60 transition text-sm flex items-center gap-1 mb-4">
        <i className="fas fa-arrow-left text-xs"></i> Voltar ao painel
      </button>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Gestão de Usuários</h2>
      </div>

      <div className="mb-6 bg-blue-50 text-blue-800 p-4 rounded-lg">
        <p className="text-sm">
          <strong>Aviso:</strong> A criação manual de usuários foi desativada. Para adicionar um novo usuário, instrua-o a criar uma conta na página de <a href="/signup" className="underline font-bold">Cadastro</a>, e depois aprove-o na aba de Aprovação de Usuários.
        </p>
      </div>

      {error && <div className="text-red-500 mb-4 bg-red-50 p-3 rounded">{error}</div>}

      {loading ? (
        <div className="text-center text-gray-500 py-8">Carregando usuários...</div>
      ) : usuarios.length === 0 ? (
        <div className="text-center text-gray-500 py-8">Nenhum usuário encontrado.</div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Nome</th>
                <th className="p-4 font-semibold text-gray-600">E-mail</th>
                <th className="p-4 font-semibold text-gray-600">Perfil (Role)</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {usuarios.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="p-4">{u.nome || '-'}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4 capitalize">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    {u.aprovado ? (
                      <span className="text-green-600 text-sm font-medium"><i className="fas fa-check-circle"></i> Aprovado</span>
                    ) : (
                      <span className="text-yellow-600 text-sm font-medium"><i className="fas fa-clock"></i> Pendente</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => handleDeleteUser(u.auth_id, u.nome, u.role)}
                        className="text-sm border border-red-200 rounded py-1 px-3 hover:bg-red-50 transition text-red-600 font-medium"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
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
