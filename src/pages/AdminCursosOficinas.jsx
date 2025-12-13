

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';



export default function AdminCursosOficinas() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    category: '',
    title: '',
    frequency: '',
    duration: '',
    students: '',
    nextClass: '',
    icon: '',
    closed: false
  });

  // Redireciona se não estiver logado
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [authLoading, user, navigate]);

  // Buscar cursos/oficinas ao carregar
  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      const { data, error } = await supabase
        .from('cursos_oficinas')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setItems(data || []);
      setLoading(false);
    }
    fetchItems();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from('cursos_oficinas')
      .insert([
        {
          category: form.category,
          title: form.title,
          frequency: form.frequency,
          duration: form.duration,
          students: form.students,
          next_class: form.nextClass,
          icon: form.icon,
          closed: form.closed
        }
      ])
      .select();
    if (!error && data) {
      setItems([data[0], ...items]);
      setForm({
        category: '',
        title: '',
        frequency: '',
        duration: '',
        students: '',
        nextClass: '',
        icon: '',
        closed: false
      });
    }
  }

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Administração de Cursos e Oficinas</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12 grid grid-cols-1 gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="border p-2 rounded" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Categoria" className="border p-2 rounded" required />
        <input name="frequency" value={form.frequency} onChange={handleChange} placeholder="Frequência" className="border p-2 rounded" />
        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duração" className="border p-2 rounded" />
        <input name="students" value={form.students} onChange={handleChange} placeholder="Alunos" className="border p-2 rounded" />
        <input name="nextClass" value={form.nextClass} onChange={handleChange} placeholder="Próxima turma" className="border p-2 rounded" />
        <input name="icon" value={form.icon} onChange={handleChange} placeholder="Ícone (ex: fas fa-keyboard)" className="border p-2 rounded" />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="closed" checked={form.closed} onChange={handleChange} />
          <span>Encerrado</span>
        </label>
        <Button type="submit" variant="primary">Cadastrar</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-3 text-center text-gray-500">Carregando...</div>
        ) : items.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">Nenhum curso ou oficina cadastrado.</div>
        ) : (
          items.map((item) => (
            <Card key={item.id} className="flex flex-col items-center text-center gap-4 p-8 relative">
              {item.closed && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Encerrado</span>
              )}
              <div className="mb-4">
                <i className={`${item.icon} text-primary-600 text-4xl`}></i>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h2>
              <div className="flex flex-col text-left w-full">
                <div className="text-sm text-primary-600 mb-2 font-semibold">{item.category}</div>
                <ul className="mb-4 text-gray-700 text-sm space-y-1">
                  <li><strong>Frequência:</strong> {item.frequency}</li>
                  <li><strong>Duração:</strong> {item.duration}</li>
                  <li><strong>Alunos:</strong> {item.students}</li>
                  <li><strong>Próxima turma:</strong> {item.next_class}</li>
                </ul>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
