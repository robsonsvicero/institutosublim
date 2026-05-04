

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

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [authLoading, user, navigate]);

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
    <div className="bg-white min-h-screen p-8 pt-20">
      <button onClick={() => navigate('/admin')} className="text-black hover:opacity-60 transition text-sm flex items-center gap-1 mb-4">
        <i className="fas fa-arrow-left text-xs"></i> Voltar ao painel
      </button>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Administração de Cursos e Oficinas</h1>
      </div>

      {/* Formulário */}
      <div className="max-w-2xl mx-auto mb-12 border rounded-xl p-6 bg-gray-50">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          {editingId ? 'Editar Curso/Oficina' : 'Novo Curso/Oficina'}
        </h2>
        {feedback && (
          <div className={`mb-4 p-3 rounded text-sm font-medium ${feedback.includes('Erro') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {feedback}
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="border p-2 rounded" required />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Categoria" className="border p-2 rounded" required />
          <input name="frequency" value={form.frequency} onChange={handleChange} placeholder="Frequência" className="border p-2 rounded" />
          <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duração" className="border p-2 rounded" />
          <input name="students" value={form.students} onChange={handleChange} placeholder="Alunos" className="border p-2 rounded" />
          <input name="nextClass" value={form.nextClass} onChange={handleChange} placeholder="Próxima turma" className="border p-2 rounded" />
          <input name="icon" value={form.icon} onChange={handleChange} placeholder="Ícone (ex: fas fa-keyboard)" className="border p-2 rounded" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="closed" checked={form.closed} onChange={handleChange} />
            <span>Encerrado</span>
          </label>
          <div className="flex gap-3">
            <Button type="submit" variant="primary" className="flex-1">
              {editingId ? 'Salvar Alterações' : 'Cadastrar'}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={handleCancelEdit}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-3 text-center text-gray-500">Carregando...</div>
        ) : items.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">Nenhum curso ou oficina cadastrado.</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className={`flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 border-2 transition ${editingId === item.id ? 'border-teal-400' : 'border-gray-200'}`}>
              <div>
                {item.closed && (
                  <span className="inline-block mb-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Encerrado</span>
                )}
                <div className="text-sm font-semibold text-teal-500 mb-1">{item.category}</div>
                <h2 className="text-xl font-bold text-primary-dark mb-4">{item.title}</h2>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between"><span className="text-gray-500">Frequência:</span><span className="font-medium">{item.frequency}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Duração:</span><span className="font-medium">{item.duration}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Alunos:</span><span className="font-medium text-teal-700">{item.students}</span></div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">Próxima Turma</p>
                  <p className="text-sm font-bold text-gray-900">{item.next_class}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 text-sm border border-gray-300 rounded-lg py-2 px-3 hover:bg-gray-50 transition text-gray-700 font-medium"
                >
                  <i className="fas fa-pencil-alt mr-1 text-xs"></i> Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 text-sm border border-red-200 rounded-lg py-2 px-3 hover:bg-red-50 transition text-red-600 font-medium"
                >
                  <i className="fas fa-trash mr-1 text-xs"></i> Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
