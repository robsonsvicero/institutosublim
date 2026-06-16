import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';

const FORM_VAZIO = {
  category: '',
  title: '',
  frequency: '',
  duration: '',
  students: '',
  nextClass: '',
  icon: '',
  closed: false,
};

const CATEGORY_COLORS = {
  'Meio Ambiente': 'bg-green-100 text-green-700',
  'Tecnologia': 'bg-blue-100 text-blue-700',
  'Saúde': 'bg-emerald-100 text-emerald-700',
  'Educação': 'bg-purple-100 text-purple-700',
  'Capacitação': 'bg-orange-100 text-orange-700',
  'Arte': 'bg-pink-100 text-pink-700',
};

function getCategoryColor(category) {
  if (!category) return 'bg-gray-100 text-gray-600';
  const key = Object.keys(CATEGORY_COLORS).find(k =>
    category.toLowerCase().includes(k.toLowerCase())
  );
  return key ? CATEGORY_COLORS[key] : 'bg-teal-100 text-teal-700';
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

const ITEMS_PER_PAGE = 8;

export default function AdminCursosOficinas() {
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
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recentActivity, setRecentActivity] = useState([]);

  const menuItems = [
    { name: 'Painel', icon: 'fa-solid fa-border-all', path: '/admin' },
    { name: 'Cursos', icon: 'fa-solid fa-graduation-cap', path: '/admin/cursos-oficinas', active: true },
    { name: 'Depoimentos', icon: 'fa-solid fa-quote-left', path: '/admin/depoimentos' },
    ...(isAdmin ? [{ name: 'Usuários', icon: 'fa-solid fa-users', path: '/admin/usuarios' }] : []),
    { name: 'Configurações', icon: 'fa-solid fa-gear', path: '/alterar-senha' },
  ];

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    const { data, error } = await supabase
      .from('cursos_oficinas')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) {
      setItems(data || []);
      // Últimas 3 atividades (itens mais recentes)
      setRecentActivity((data || []).slice(0, 3).map(d => ({
        title: d.closed ? 'Curso Encerrado' : 'Curso Ativo',
        desc: d.title,
        color: d.closed ? 'bg-red-400' : 'bg-green-400',
      })));
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
      category: item.category || '',
      title: item.title || '',
      frequency: item.frequency || '',
      duration: item.duration || '',
      students: item.students || '',
      nextClass: item.next_class || '',
      icon: item.icon || '',
      closed: item.closed || false,
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
      category: form.category,
      title: form.title,
      frequency: form.frequency,
      duration: form.duration,
      students: form.students,
      next_class: form.nextClass,
      icon: form.icon,
      closed: form.closed,
    };

    if (editingId) {
      const { error } = await supabase.from('cursos_oficinas').update(payload).eq('id', editingId);
      if (!error) {
        setFeedback({ msg: 'Curso/Oficina atualizado com sucesso!', type: 'success' });
        fetchItems();
        setTimeout(handleCloseModal, 1000);
      } else {
        setFeedback({ msg: 'Erro ao atualizar: ' + error.message, type: 'error' });
      }
    } else {
      const { data, error } = await supabase.from('cursos_oficinas').insert([payload]).select();
      if (!error && data) {
        setFeedback({ msg: 'Curso/Oficina cadastrado com sucesso!', type: 'success' });
        fetchItems();
        setTimeout(handleCloseModal, 1000);
      } else {
        setFeedback({ msg: 'Erro ao cadastrar: ' + error?.message, type: 'error' });
      }
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir este curso/oficina?')) return;
    const { error } = await supabase.from('cursos_oficinas').delete().eq('id', id);
    if (!error) {
      setItems(items.filter(i => i.id !== id));
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    if (signOut) signOut();
    navigate('/login');
  }

  const categories = [...new Set(items.map(i => i.category).filter(Boolean))];

  const filtered = items.filter(item => {
    const matchSearch = !search || item.title?.toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCategory || item.category === filterCategory;
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-base font-bold font-montserrat text-gray-900">Painel de Impacto ONG</h2>
          <div className="flex items-center gap-5">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="Pesquisar cursos..."
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                className="pl-9 pr-4 py-2 bg-gray-100 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 w-[220px] transition-all outline-none"
              />
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <button className="hover:text-gray-900 relative">
                <i className="fa-regular fa-bell text-lg"></i>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="hover:text-gray-900">
                <i className="fa-regular fa-circle-question text-lg"></i>
              </button>
            </div>
            <button
              onClick={handleOpenNew}
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition"
            >
              <i className="fa-solid fa-plus"></i> Adicionar Novo
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 flex-1">
          {/* Page Title + Actions */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-1">Cursos e Oficinas</h1>
              <p className="text-sm text-gray-500">Gerencie seus programas educacionais e sessões comunitárias.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition shadow-sm">
                <i className="fa-solid fa-filter text-gray-400"></i> Filtrar
              </button>
              <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition shadow-sm">
                <i className="fa-solid fa-download text-gray-400"></i> Exportar
              </button>
            </div>
          </div>

          <div className="flex gap-8 items-start">
            {/* Table Card */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Table Header Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900">Programas Ativos</h3>
                  <select
                    value={filterCategory}
                    onChange={e => { setFilterCategory(e.target.value); setCurrentPage(1); }}
                    className="border border-gray-200 rounded-lg text-sm px-3 py-1.5 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Todas as Categorias</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Column Headers */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] px-6 py-3 bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <div>Nome do Curso</div>
                  <div>Categoria</div>
                  <div>Alunos</div>
                  <div>Status</div>
                  <div>Última Atualização</div>
                  <div className="text-right">Ações</div>
                </div>

                {/* Rows */}
                {loading ? (
                  <div className="p-12 text-center text-gray-400">
                    <i className="fa-solid fa-spinner fa-spin text-2xl mb-2"></i>
                    <p className="text-sm">Carregando...</p>
                  </div>
                ) : paginated.length === 0 ? (
                  <div className="p-12 text-center text-gray-400">
                    <i className="fa-solid fa-inbox text-3xl mb-2 opacity-40"></i>
                    <p className="text-sm">Nenhum curso encontrado.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {paginated.map(item => (
                      <div key={item.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] px-6 py-4 items-center hover:bg-gray-50 transition">
                        {/* Nome */}
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {item.icon ? (
                              <i className={`${item.icon} text-gray-500 text-lg`}></i>
                            ) : (
                              <i className="fa-solid fa-graduation-cap text-gray-400 text-lg"></i>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm leading-tight">{item.title}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              {item.frequency && `${item.frequency}`}
                              {item.duration && ` • ${item.duration}`}
                            </p>
                          </div>
                        </div>

                        {/* Categoria */}
                        <div>
                          <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${getCategoryColor(item.category)}`}>
                            {item.category || '-'}
                          </span>
                        </div>

                        {/* Alunos */}
                        <div>
                          <p className="text-sm font-bold text-gray-900">{item.students || '-'}</p>
                          <div className="mt-1 w-20 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full bg-teal-500" style={{ width: '65%' }}></div>
                          </div>
                        </div>

                        {/* Status */}
                        <div>
                          {item.closed ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                              Inativo
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                              Ativo
                            </span>
                          )}
                        </div>

                        {/* Data */}
                        <div className="text-sm text-gray-500">
                          {formatDate(item.created_at)}
                        </div>

                        {/* Ações */}
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-500 flex items-center justify-center transition"
                            title="Editar"
                          >
                            <i className="fa-solid fa-pen text-xs"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-500 flex items-center justify-center transition"
                            title="Excluir"
                          >
                            <i className="fa-solid fa-trash text-xs"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} a {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} de {filtered.length} cursos
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition text-xs"
                      >
                        <i className="fa-solid fa-chevron-left"></i>
                      </button>
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                        <button
                          key={p}
                          onClick={() => setCurrentPage(p)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                            p === currentPage
                              ? 'bg-gray-900 text-white'
                              : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                      {totalPages > 5 && <span className="text-gray-400 px-1">...</span>}
                      {totalPages > 5 && (
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className="w-8 h-8 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition"
                        >
                          {totalPages}
                        </button>
                      )}
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition text-xs"
                      >
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Atividade Recente */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Atividade Recente</h3>
                {recentActivity.length === 0 ? (
                  <p className="text-xs text-gray-400">Nenhuma atividade.</p>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((act, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${act.color}`}></span>
                        <div>
                          <p className="text-xs font-bold text-gray-800">{act.title}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{act.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Formulário */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold font-montserrat text-gray-900">
                {editingId ? 'Editar Curso / Oficina' : 'Novo Curso / Oficina'}
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
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Título *</label>
                <input
                  name="title" value={form.title} onChange={handleChange} required
                  placeholder="Ex: Informática Básica"
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Categoria *</label>
                <input
                  name="category" value={form.category} onChange={handleChange} required
                  placeholder="Ex: Tecnologia"
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Frequência</label>
                <input
                  name="frequency" value={form.frequency} onChange={handleChange}
                  placeholder="Ex: Sábados, das 09h às 12h"
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Duração</label>
                <input
                  name="duration" value={form.duration} onChange={handleChange}
                  placeholder="Ex: 3 meses"
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Público / Alunos</label>
                <input
                  name="students" value={form.students} onChange={handleChange}
                  placeholder="Ex: Jovens de 14 a 18 anos"
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Próxima Turma</label>
                <input
                  name="nextClass" value={form.nextClass} onChange={handleChange}
                  placeholder="Ex: Março de 2026"
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Ícone (FontAwesome class)</label>
                <input
                  name="icon" value={form.icon} onChange={handleChange}
                  placeholder="Ex: fas fa-keyboard"
                  className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox" name="closed" id="closed"
                  checked={form.closed} onChange={handleChange}
                  className="w-4 h-4 accent-teal-600"
                />
                <label htmlFor="closed" className="text-sm font-medium text-gray-700">Encerrado (não aceita inscrições)</label>
              </div>

              <div className="md:col-span-2 flex gap-3 pt-2 border-t border-gray-100 mt-2">
                <button
                  type="submit"
                  className="flex-1 bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition text-sm"
                >
                  {editingId ? 'Salvar Alterações' : 'Adicionar Curso / Oficina'}
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
    </div>
  );
}
