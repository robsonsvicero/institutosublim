import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import * as XLSX from 'xlsx';

const FORM_VAZIO = {
  tipo: 'voluntario',
  nome: '',
  texto: '',
  avatar_url: '',
  role: '',
  area: '',
  ativo: true,
  ordem: 0,
};

function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

const ITEMS_PER_PAGE = 10;

export default function AdminDepoimentos() {
  const { user, signOut } = useAuth();
  const isAdmin = user?.role === 'admin';
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(FORM_VAZIO);
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState({ msg: '', type: '' });
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterAtivo, setFilterAtivo] = useState('todos'); // 'todos', 'sim', 'nao'
  const [filterTipo, setFilterTipo] = useState('todos'); // 'todos', 'voluntario', 'beneficiado', 'parceiro'
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  function handleExportar() {
    if (items.length === 0) return;
    
    const linhas = filtered.map(d => ({
      'Nome': d.nome || '-',
      'Tipo': d.tipo || '-',
      'Área/Tag': d.area || '-',
      'Papel/Cargo': d.role || '-',
      'Visível no Site': d.ativo ? 'Sim' : 'Não',
      'Data de Criação': new Date(d.created_at).toLocaleDateString('pt-BR'),
      'Texto': d.texto || '-'
    }));

    const ws = XLSX.utils.json_to_sheet(linhas);
    ws['!cols'] = [
      { wch: 30 }, { wch: 15 }, { wch: 15 }, { wch: 20 },
      { wch: 15 }, { wch: 18 }, { wch: 60 }
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Depoimentos");
    XLSX.writeFile(wb, `depoimentos_export_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  const menuItems = [
    { name: 'Painel', icon: 'fa-solid fa-border-all', path: '/admin' },
    { name: 'Cursos', icon: 'fa-solid fa-graduation-cap', path: '/admin/cursos-oficinas' },
    { name: 'Depoimentos', icon: 'fa-solid fa-quote-left', path: '/admin/depoimentos', active: true },
    ...(isAdmin ? [{ name: 'Usuários', icon: 'fa-solid fa-users', path: '/admin/usuarios' }] : []),
    { name: 'Configurações', icon: 'fa-solid fa-gear', path: '/alterar-senha' },
  ];

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    const { data, error } = await supabase
      .from('depoimentos')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) {
      setItems(data || []);
    }
    setLoading(false);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleOpenNew() {
    setEditingId(null);
    setForm(FORM_VAZIO);
    setFeedback({ msg: '', type: '' });
    setShowModal(true);
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({
      tipo: item.tipo || 'voluntario',
      nome: item.nome || '',
      texto: item.texto || '',
      avatar_url: item.avatar_url || '',
      role: item.role || '',
      area: item.area || '',
      ativo: item.ativo,
      ordem: item.ordem || 0,
    });
    setFeedback({ msg: '', type: '' });
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setEditingId(null);
    setForm(FORM_VAZIO);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback({ msg: '', type: '' });
    const payload = {
      tipo: form.tipo,
      nome: form.nome,
      texto: form.texto,
      avatar_url: form.avatar_url,
      role: form.role,
      area: form.area,
      ativo: form.ativo,
      ordem: form.ordem,
    };

    if (editingId) {
      const { error } = await supabase.from('depoimentos').update(payload).eq('id', editingId);
      if (!error) {
        setFeedback({ msg: 'Depoimento atualizado com sucesso!', type: 'success' });
        fetchItems();
        setTimeout(handleCloseModal, 1000);
      } else {
        setFeedback({ msg: 'Erro ao atualizar: ' + error.message, type: 'error' });
      }
    } else {
      const { data, error } = await supabase.from('depoimentos').insert([payload]).select();
      if (!error && data) {
        setFeedback({ msg: 'Depoimento cadastrado com sucesso!', type: 'success' });
        fetchItems();
        setTimeout(handleCloseModal, 1000);
      } else {
        setFeedback({ msg: 'Erro ao cadastrar: ' + error?.message, type: 'error' });
      }
    }
  }

  async function toggleAtivo(item) {
    const newStatus = !item.ativo;
    const { error } = await supabase.from('depoimentos').update({ ativo: newStatus }).eq('id', item.id);
    if (!error) {
      setItems(items.map(i => i.id === item.id ? { ...i, ativo: newStatus } : i));
    }
  }

  async function handleLogout() {
    navigate('/');
    await supabase.auth.signOut();
  }

  const filtered = items.filter(item => {
    const matchSearch = !search || item.nome?.toLowerCase().includes(search.toLowerCase()) || item.texto?.toLowerCase().includes(search.toLowerCase());
    const matchAtivo = filterAtivo === 'todos' ? true : filterAtivo === 'sim' ? item.ativo : !item.ativo;
    const matchTipo = filterTipo === 'todos' ? true : item.tipo === filterTipo;
    return matchSearch && matchAtivo && matchTipo;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 flex font-body pb-16 md:pb-0">
      {/* Sidebar Desktop / Bottom Nav Mobile */}
      <aside className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex flex-row justify-around md:relative md:w-[220px] md:bg-gray-50 md:border-r md:border-t-0 md:flex-col md:flex md:sticky md:top-0 md:h-screen">
        <div className="hidden md:block p-7 pb-4">
          <h1 className="text-2xl font-montserrat font-bold text-gray-900 leading-tight mb-1">
            Painel<br />Administrativo
          </h1>
          <p className="text-xs text-gray-500">Gestão do Instituto Sublim</p>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 flex flex-row justify-around w-full px-2 py-2 md:px-4 md:py-4 md:space-y-1 md:flex-col md:justify-start">
          {menuItems.map(item => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 flex-1 md:flex-none py-2 md:px-4 md:py-3 rounded-lg transition-colors ${
                item.active
                  ? 'text-gray-900 md:bg-gray-200 md:border-l-4 md:border-gray-900'
                  : 'text-gray-500 hover:text-gray-900 md:text-gray-600 md:hover:bg-gray-100 md:border-l-4 md:border-transparent'
              }`}
              title={item.name}
            >
              <i className={`${item.icon} text-xl md:w-4 md:text-center md:text-base`}></i>
              <span className="hidden md:block text-sm font-semibold">{item.name}</span>
            </button>
          ))}
          
          {/* Logout Mobile Only (as last icon) */}
          <button
            onClick={handleLogout}
            className="md:hidden flex flex-col items-center justify-center flex-1 py-2 text-red-500 hover:text-red-700 transition-colors"
            title="Sair"
          >
            <i className="fa-solid fa-arrow-right-from-bracket text-xl"></i>
          </button>
        </nav>

        {/* User Profile (Desktop Only) */}
        <div className="hidden md:flex p-4 border-t border-gray-200 items-center justify-between">
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
        <header className="bg-white border-b border-gray-200 px-4 py-4 md:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold font-montserrat text-gray-900">Painel de Depoimentos</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="Pesquisar depoimentos..."
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                className="pl-9 pr-4 py-2 bg-gray-100 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 w-full sm:w-[280px] transition-all outline-none"
              />
            </div>
            <button
              onClick={handleOpenNew}
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition whitespace-nowrap"
            >
              <i className="fa-solid fa-plus"></i> Adicionar Novo
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 flex-1 max-w-5xl">
          {/* Page Title + Actions */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-1">Depoimentos</h1>
              <p className="text-sm text-gray-500">Gerencie e selecione o feedback da comunidade para a vitrine de impacto.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowFilterModal(true)} className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition shadow-sm">
                <i className="fa-solid fa-filter text-gray-400 text-xs"></i> Filtros
              </button>
              <button onClick={handleExportar} className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition shadow-sm">
                <i className="fa-solid fa-download text-gray-400 text-xs"></i> Exportar
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Depoimentos Recentes</h3>
              <div className="flex items-center gap-4">
                <p className="text-xs text-gray-500 font-medium">
                  Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + (paginated.length > 0 ? 1 : 0)}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} de {filtered.length}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40 bg-white"
                  >
                    <i className="fa-solid fa-chevron-left text-[10px]"></i>
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40 bg-white"
                  >
                    <i className="fa-solid fa-chevron-right text-[10px]"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* List */}
            {loading ? (
              <div className="p-12 text-center text-gray-400">
                <i className="fa-solid fa-spinner fa-spin text-2xl mb-2"></i>
                <p className="text-sm">Carregando...</p>
              </div>
            ) : paginated.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <i className="fa-solid fa-inbox text-3xl mb-2 opacity-40"></i>
                <p className="text-sm">Nenhum depoimento encontrado.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {paginated.map(item => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition relative group">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border border-gray-100 flex items-center justify-center font-bold text-gray-400">
                          {item.avatar_url ? (
                            <img src={item.avatar_url} alt={item.nome} className="w-full h-full object-cover" />
                          ) : (
                            item.nome.substring(0, 2).toUpperCase()
                          )}
                        </div>
                        {item.ativo && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white">
                            <i className="fa-solid fa-check text-[8px]"></i>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-gray-900 text-base">{item.nome}</h4>
                          {/* Botões de Ação ao Passar o Mouse */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                            <button onClick={() => handleEdit(item)} className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center shadow-sm">
                              <i className="fa-solid fa-pen text-xs"></i>
                            </button>
                            <button onClick={async () => {
                              if(window.confirm('Excluir?')) {
                                await supabase.from('depoimentos').delete().eq('id', item.id);
                                fetchItems();
                              }
                            }} className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 flex items-center justify-center shadow-sm">
                              <i className="fa-solid fa-trash text-xs"></i>
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">
                          {item.role || (item.tipo === 'voluntario' ? 'Voluntário' : item.tipo === 'parceiro' ? 'Parceiro' : 'Doador')} • {formatDate(item.created_at)}
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed mb-4 italic">
                          "{item.texto}"
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => toggleAtivo(item)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <div className={`w-10 h-5 rounded-full relative transition-colors ${item.ativo ? 'bg-green-700' : 'bg-gray-300'}`}>
                              <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${item.ativo ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                            </div>
                            <span className="text-xs text-gray-500">{item.ativo ? 'Visível no Site' : 'Oculto'}</span>
                          </button>

                          <div className="flex items-center gap-2">
                            {item.area && (
                              <span className="bg-gray-100 text-gray-600 font-bold text-[10px] uppercase px-2 py-1 rounded">
                                {item.area}
                              </span>
                            )}
                            <span className="bg-gray-100 text-gray-600 font-bold text-[10px] uppercase px-2 py-1 rounded">
                              {item.tipo}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal Formulário */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold font-montserrat text-gray-900">
                {editingId ? 'Editar Depoimento' : 'Novo Depoimento'}
              </h2>
              <button onClick={handleCloseModal} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition text-gray-500">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {feedback.msg && (
                <div className={`md:col-span-2 rounded-xl border px-4 py-3 text-sm font-medium ${
                  feedback.type === 'error'
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-green-50 border-green-200 text-green-700'
                }`}>
                  {feedback.msg}
                </div>
              )}
              
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Tipo *</label>
                <select
                  name="tipo" value={form.tipo} onChange={handleChange} required
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition bg-white"
                >
                  <option value="voluntario">Voluntário</option>
                  <option value="beneficiado">Beneficiado</option>
                  <option value="parceiro">Parceiro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nome *</label>
                <input
                  name="nome" value={form.nome} onChange={handleChange} required
                  placeholder="Nome do autor"
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Avatar URL</label>
                <input
                  name="avatar_url" value={form.avatar_url} onChange={handleChange}
                  placeholder="https://..."
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Papel / Cargo</label>
                <input
                  name="role" value={form.role} onChange={handleChange}
                  placeholder="Ex: Líder Comunitário"
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Área / Tag</label>
                <input
                  name="area" value={form.area} onChange={handleChange}
                  placeholder="Ex: Educação"
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Texto do Depoimento *</label>
                <textarea
                  name="texto" value={form.texto} onChange={handleChange} required rows={4}
                  placeholder="Escreva o depoimento aqui..."
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox" name="ativo" id="ativo"
                  checked={form.ativo} onChange={handleChange}
                  className="w-4 h-4 accent-teal-600"
                />
                <label htmlFor="ativo" className="text-sm font-medium text-gray-700">Visível no Site</label>
              </div>

              <div className="md:col-span-2 flex gap-3 pt-2 border-t border-gray-100 mt-2">
                <button
                  type="submit"
                  className="flex-1 bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition text-sm"
                >
                  {editingId ? 'Salvar Alterações' : 'Adicionar Depoimento'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition text-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Filtros */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowFilterModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 font-montserrat">Filtros Avançados</h2>
              <button onClick={() => setShowFilterModal(false)} className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-xmark"></i></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Visibilidade</label>
                <select 
                  value={filterAtivo} 
                  onChange={e => { setFilterAtivo(e.target.value); setCurrentPage(1); }}
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
                >
                  <option value="todos">Todos</option>
                  <option value="sim">Apenas Visíveis no Site</option>
                  <option value="nao">Apenas Ocultos</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Tipo de Depoimento</label>
                <select 
                  value={filterTipo} 
                  onChange={e => { setFilterTipo(e.target.value); setCurrentPage(1); }}
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
                >
                  <option value="todos">Todos os Tipos</option>
                  <option value="voluntario">Voluntários</option>
                  <option value="beneficiado">Beneficiados</option>
                  <option value="parceiro">Parceiros</option>
                </select>
              </div>
            </div>

            <button onClick={() => setShowFilterModal(false)} className="mt-6 w-full py-3 rounded-xl bg-black text-white font-bold text-sm hover:bg-gray-800 transition">
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
