import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import { createClient } from '@supabase/supabase-js';

export default function AdminUsuarios() {
  const { user, signOut } = useAuth();
  const isAdmin = user?.role === 'admin';
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('todos'); // 'todos' ou 'pendentes'

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ nome: '', role: 'voluntario' });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({ nome: '', email: '', password: '', role: 'voluntario' });

  const menuItems = [
    { name: 'Painel', icon: 'fa-solid fa-border-all', path: '/admin' },
    { name: 'Cursos', icon: 'fa-solid fa-graduation-cap', path: '/admin/cursos-oficinas' },
    { name: 'Depoimentos', icon: 'fa-solid fa-quote-left', path: '/admin/depoimentos' },
    ...(isAdmin ? [{ name: 'Usuários', icon: 'fa-solid fa-users', path: '/admin/usuarios', active: true }] : []),
    { name: 'Configurações', icon: 'fa-solid fa-gear', path: '/alterar-senha' },
  ];

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('criado_em', { ascending: false });
    if (!error) {
      setUsuarios(data || []);
    }
    setLoading(false);
  }

  async function handleLogout() {
    navigate('/');
    await supabase.auth.signOut();
  }

  async function handleDeleteUser(authId, nome, role) {
    if (role === 'admin') {
      alert('Não é possível excluir um administrador por aqui.');
      return;
    }
    if (!window.confirm(`Tem certeza que deseja excluir o usuário ${nome || ''}?`)) return;
    
    setLoading(true);
    const { error } = await supabase.rpc('delete_user_admin', { user_id: authId });
    if (!error) {
      setUsuarios(usuarios.filter(u => u.auth_id !== authId));
    } else {
      alert('Erro ao excluir: ' + error.message);
    }
    setLoading(false);
  }

  async function handleAprovar(id, currentRole) {
    const role = currentRole || 'voluntario';
    const { error } = await supabase
      .from('usuarios')
      .update({ 
        aprovado: true,
        role: role,
        aprovado_em: new Date().toISOString()
      })
      .eq('id', id);

    if (!error) {
      fetchItems();
    } else {
      alert('Erro ao aprovar usuário: ' + error.message);
    }
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({ nome: item.nome || '', role: item.role || 'voluntario' });
    setShowModal(true);
  }

  async function handleSaveEdit(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('usuarios').update(form).eq('id', editingId);
    if (!error) {
      fetchItems();
      setShowModal(false);
    } else {
      alert('Erro ao atualizar: ' + error.message);
    }
    setLoading(false);
  }

  async function handleCreateUser(e) {
    e.preventDefault();
    if (createForm.password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);
    
    // Cliente temporário para não deslogar o admin atual
    const tempSupabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY,
      { auth: { persistSession: false } }
    );

    const { data: authData, error: authError } = await tempSupabase.auth.signUp({
      email: createForm.email,
      password: createForm.password,
    });

    if (authError) {
      alert('Erro ao criar credenciais de acesso: ' + authError.message);
      setLoading(false);
      return;
    }

    // Insere no banco com o client principal (que tem permissão de admin)
    const { error: dbError } = await supabase.from('usuarios').insert([{
      auth_id: authData.user.id,
      email: createForm.email,
      nome: createForm.nome,
      role: createForm.role,
      aprovado: true,
      aprovado_em: new Date().toISOString()
    }]);

    if (dbError) {
      alert('Acesso criado, mas erro ao criar perfil no banco: ' + dbError.message);
    } else {
      fetchItems();
      setShowCreateModal(false);
      setCreateForm({ nome: '', email: '', password: '', role: 'voluntario' });
      setActiveTab('todos');
    }
    setLoading(false);
  }

  const pendentes = usuarios.filter(u => !u.aprovado);

  // "Todos" mostra TODOS os usuários (aprovados + pendentes); "Pendentes" só os pendentes
  const currentList = activeTab === 'todos' ? usuarios : pendentes;
  
  const filteredList = currentList.filter(item => {
    const matchSearch = !search || item.nome?.toLowerCase().includes(search.toLowerCase()) || item.email?.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex font-body">
      {/* Sidebar */}
      <aside className="w-[220px] bg-gray-50 border-r border-gray-200 flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-7 pb-4">
          <h1 className="text-2xl font-montserrat font-bold text-gray-900 leading-tight mb-1">
            Painel<br />Administrativo
          </h1>
          <p className="text-xs text-gray-500">Gestão do Instituto Sublim</p>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
                item.active
                  ? 'bg-gray-200 text-gray-900 border-l-4 border-gray-900'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent'
              }`}
            >
              <i className={`${item.icon} w-4 text-center`}></i>
              {item.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {user?.nome ? user.nome.substring(0, 2).toUpperCase() : 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-gray-900 truncate w-[90px]" title={user?.nome || 'Usuário'}>
                {user?.nome || 'Usuário'}
              </p>
              <p className="text-[10px] text-gray-500">{isAdmin ? 'Administrador' : 'Colaborador'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-9 h-9 bg-[#00E600] hover:bg-green-500 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm"
            title="Sair"
          >
            <i className="fa-solid fa-arrow-right-from-bracket text-sm"></i>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen relative">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold font-montserrat text-gray-900">Painel de Usuários</h2>
          <div className="flex-1"></div>
          <div className="flex items-center gap-5">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="Pesquisar usuários..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-100 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 w-[280px] transition-all outline-none"
              />
            </div>
            <button
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition"
              onClick={() => setShowCreateModal(true)}
            >
               Adicionar Novo
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 flex-1 w-full max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-6">Gerenciamento de Usuários</h1>
            
            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-200">
              <button 
                onClick={() => setActiveTab('todos')}
                className={`pb-3 font-bold text-sm border-b-2 transition-colors ${
                  activeTab === 'todos' 
                    ? 'border-gray-900 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Todos os Usuários
              </button>
              <button 
                onClick={() => setActiveTab('pendentes')}
                className={`pb-3 font-bold text-sm border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'pendentes' 
                    ? 'border-gray-900 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Pendentes de Aprovação
                {pendentes.length > 0 && (
                  <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {pendentes.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Column Headers */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] px-6 py-4 bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <div>Usuário</div>
              <div>Função</div>
              <div>Status</div>
              <div>Última Atividade</div>
              <div className="text-right">Ações</div>
            </div>

            {/* List */}
            {loading ? (
              <div className="p-12 text-center text-gray-400">
                <i className="fa-solid fa-spinner fa-spin text-2xl mb-2"></i>
                <p className="text-sm">Carregando...</p>
              </div>
            ) : filteredList.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <i className="fa-solid fa-inbox text-3xl mb-2 opacity-40"></i>
                <p className="text-sm">Nenhum usuário encontrado.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredList.map(item => (
                  <div key={item.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] px-6 py-4 items-center hover:bg-gray-50 transition group">
                    {/* User Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center font-bold text-gray-400">
                        {item.nome ? item.nome.substring(0, 2).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{item.nome || 'Usuário Sem Nome'}</h4>
                        <p className="text-xs text-gray-500">{item.email}</p>
                      </div>
                    </div>

                    {/* Role */}
                    <div>
                      <span className="inline-block bg-gray-100 text-gray-600 font-bold text-[10px] px-2 py-1 rounded capitalize">
                        {item.role || 'voluntario'}
                      </span>
                    </div>

                    {/* Status */}
                    <div>
                      {item.aprovado ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-1 rounded-full bg-green-50 text-green-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Ativo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-1 rounded-full bg-yellow-50 text-yellow-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                          Pendente
                        </span>
                      )}
                    </div>

                    {/* Última atividade (Mock visual / fallback data de criação) */}
                    <div>
                      <p className="text-sm text-gray-600">
                        {new Date(item.criado_em).toLocaleDateString('pt-BR')}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end">
                      {activeTab === 'pendentes' ? (
                        <div className="flex gap-2">
                           <button 
                            onClick={() => handleAprovar(item.id, item.role)}
                            className="bg-green-600 text-white p-1.5 rounded text-xs font-bold shadow-sm hover:bg-green-700" title="Aprovar"
                          >
                             <i className="fa-solid fa-check"></i>
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(item.auth_id, item.nome, item.role)}
                            className="bg-red-600 text-white p-1.5 rounded text-xs font-bold shadow-sm hover:bg-red-700" title="Rejeitar"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      ) : (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                          <button onClick={() => handleEdit(item)} className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center shadow-sm" title="Editar">
                            <i className="fa-solid fa-pen text-xs"></i>
                          </button>
                          <button onClick={() => {
                            if (item.role !== 'admin') {
                              handleDeleteUser(item.auth_id, item.nome, item.role);
                            } else {
                              alert('Não é possível excluir um administrador por aqui.');
                            }
                          }} className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 flex items-center justify-center shadow-sm" title="Excluir">
                            <i className="fa-solid fa-trash text-xs"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
        
        {/* Modal de Edição */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
              <h2 className="text-lg font-bold text-gray-900 mb-4 font-montserrat">Editar Usuário</h2>
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Nome</label>
                  <input
                    type="text"
                    value={form.nome}
                    onChange={e => setForm({ ...form, nome: e.target.value })}
                    className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Função</label>
                  <select
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                  >
                    <option value="voluntario">Voluntário</option>
                    <option value="parceiro">Parceiro</option>
                    <option value="beneficiado">Beneficiado</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition shadow-sm">
                    Salvar Alterações
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de Criação */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
              <h2 className="text-lg font-bold text-gray-900 mb-4 font-montserrat">Adicionar Novo Usuário</h2>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Nome *</label>
                  <input
                    type="text"
                    value={createForm.nome}
                    onChange={e => setCreateForm({ ...createForm, nome: e.target.value })}
                    className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">E-mail *</label>
                  <input
                    type="email"
                    value={createForm.email}
                    onChange={e => setCreateForm({ ...createForm, email: e.target.value })}
                    className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Senha Temporária *</label>
                  <input
                    type="password"
                    value={createForm.password}
                    onChange={e => setCreateForm({ ...createForm, password: e.target.value })}
                    placeholder="Mínimo 6 caracteres"
                    className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Função</label>
                  <select
                    value={createForm.role}
                    onChange={e => setCreateForm({ ...createForm, role: e.target.value })}
                    className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                  >
                    <option value="voluntario">Voluntário</option>
                    <option value="parceiro">Parceiro</option>
                    <option value="beneficiado">Beneficiado</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" disabled={loading} className="flex-1 bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition shadow-sm disabled:opacity-50">
                    {loading ? 'Criando...' : 'Cadastrar Usuário'}
                  </button>
                  <button type="button" disabled={loading} onClick={() => setShowCreateModal(false)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
