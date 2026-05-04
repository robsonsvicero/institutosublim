

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
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

export default function AdminCursosOficinas() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(FORM_VAZIO);
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState('');

  // A verificação de autenticação agora é feita pelo ProtectedRoute no App.jsx

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    const { data, error } = await supabase
      .from('cursos_oficinas')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setItems(data || []);
    setLoading(false);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(FORM_VAZIO);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback('');
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
        setFeedback('Curso/Oficina atualizado com sucesso!');
        setEditingId(null);
        setForm(FORM_VAZIO);
        fetchItems();
      } else {
        setFeedback('Erro ao atualizar: ' + error.message);
      }
    } else {
      const { data, error } = await supabase.from('cursos_oficinas').insert([payload]).select();
      if (!error && data) {
        setFeedback('Curso/Oficina cadastrado com sucesso!');
        setItems([data[0], ...items]);
        setForm(FORM_VAZIO);
      } else {
        setFeedback('Erro ao cadastrar: ' + error?.message);
      }
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir este curso/oficina?')) return;
    const { error } = await supabase.from('cursos_oficinas').delete().eq('id', id);
    if (!error) {
      setItems(items.filter((i) => i.id !== id));
      if (editingId === id) { setEditingId(null); setForm(FORM_VAZIO); }
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6 lg:p-10 pt-20">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate('/admin')} className="text-black hover:opacity-60 transition text-sm flex items-center gap-1 mb-4">
          <i className="fas fa-arrow-left text-xs"></i> Voltar ao painel
        </button>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Cursos e Oficinas</h1>
        </div>

        {feedback && (
          <div
            className={`mb-6 rounded-xl border px-4 py-3 text-sm font-medium ${
              feedback.includes('Erro')
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-green-50 border-green-200 text-green-700'
            }`}
          >
            {feedback}
          </div>
        )}

        {/* Formulário */}
        <div className="bg-white rounded-2xl shadow p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {editingId ? 'Editar Curso/Oficina' : 'Novo Curso/Oficina'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
              <input 
                name="title" 
                value={form.title} 
                onChange={handleChange} 
                placeholder="Ex: Informática Básica" 
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
              <input 
                name="category" 
                value={form.category} 
                onChange={handleChange} 
                placeholder="Ex: Capacitação" 
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frequência</label>
              <input 
                name="frequency" 
                value={form.frequency} 
                onChange={handleChange} 
                placeholder="Ex: Sábados, das 09h às 12h" 
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duração</label>
              <input 
                name="duration" 
                value={form.duration} 
                onChange={handleChange} 
                placeholder="Ex: 3 meses" 
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Público / Alunos</label>
              <input 
                name="students" 
                value={form.students} 
                onChange={handleChange} 
                placeholder="Ex: Jovens de 14 a 18 anos" 
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Próxima Turma / Início</label>
              <input 
                name="nextClass" 
                value={form.nextClass} 
                onChange={handleChange} 
                placeholder="Ex: Março de 2026" 
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ícone (FontAwesome)</label>
              <input 
                name="icon" 
                value={form.icon} 
                onChange={handleChange} 
                placeholder="Ex: fas fa-keyboard" 
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400" 
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input 
                type="checkbox" 
                name="closed" 
                id="closed" 
                checked={form.closed} 
                onChange={handleChange} 
                className="w-4 h-4 accent-teal-600" 
              />
              <label htmlFor="closed" className="text-sm font-medium text-gray-700">Encerrado (não aceita inscrições)</label>
            </div>

            <div className="md:col-span-2 flex gap-3 pt-2">
              <Button type="submit" variant="primary" size="md">
                {editingId ? 'Salvar Alterações' : 'Adicionar Curso/Oficina'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" size="md" onClick={handleCancelEdit}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Listagem */}
        {loading ? (
          <p className="text-gray-500 text-center py-12">Carregando...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-400 text-center py-12">Nenhum curso ou oficina cadastrado.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-xl shadow p-5 flex gap-4 items-start border-l-4 border-teal-500 ${item.closed ? 'opacity-50' : ''}`}
              >
                <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
                  <i className={`${item.icon || 'fas fa-graduation-cap'} text-xl`}></i>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-700">
                      {item.category}
                    </span>
                    {item.closed && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
                        Encerrado
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-gray-900 text-lg">{item.title}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2">
                    <p className="text-xs text-gray-500"><strong>Frequência:</strong> {item.frequency || '-'}</p>
                    <p className="text-xs text-gray-500"><strong>Duração:</strong> {item.duration || '-'}</p>
                    <p className="text-xs text-gray-500"><strong>Alunos:</strong> {item.students || '-'}</p>
                    <p className="text-xs text-gray-500"><strong>Próxima Turma:</strong> {item.next_class || '-'}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-xs bg-red-50 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-100 font-medium"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

  );
}
