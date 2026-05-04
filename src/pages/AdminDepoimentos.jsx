import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';

const TIPO_LABELS = { voluntario: 'Voluntário', beneficiado: 'Beneficiado', parceiro: 'Parceiro' };

const FORM_INICIAL = {
  tipo: 'voluntario',
  nome: '',
  texto: '',
  avatar_url: '',
  role: '',
  area: '',
  idade: '',
  localizacao: '',
  transformacao_de: '',
  transformacao_para: '',
  doacao: '',
  ativo: true,
  ordem: 0,
};

export default function AdminDepoimentos() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [depoimentos, setDepoimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState(false);
  const [feedback, setFeedback] = useState({ tipo: '', mensagem: '' });
  const [form, setForm] = useState(FORM_INICIAL);
  const [editId, setEditId] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [authLoading, user, navigate]);

  useEffect(() => {
    fetchDepoimentos();
  }, []);

  async function fetchDepoimentos() {
    setLoading(true);
    setErroCarregamento(false);
    setFeedback((prev) => (prev.tipo === 'erro' ? { tipo: '', mensagem: '' } : prev));
    const { data, error } = await supabase
      .from('depoimentos')
      .select('*')
      .order('tipo', { ascending: true })
      .order('ordem', { ascending: true });

    if (error) {
      setErroCarregamento(true);
      setDepoimentos([]);
      setFeedback({ tipo: 'erro', mensagem: 'Erro ao carregar depoimentos. Tente novamente.' });
    } else {
      setDepoimentos(data || []);
    }

    setLoading(false);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function iniciarEdicao(dep) {
    setForm({
      tipo: dep.tipo,
      nome: dep.nome,
      texto: dep.texto,
      avatar_url: dep.avatar_url || '',
      role: dep.role || '',
      area: dep.area || '',
      idade: dep.idade || '',
      localizacao: dep.localizacao || '',
      transformacao_de: dep.transformacao_de || '',
      transformacao_para: dep.transformacao_para || '',
      doacao: dep.doacao || '',
      ativo: dep.ativo,
      ordem: dep.ordem ?? 0,
    });
    setEditId(dep.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelarEdicao() {
    setForm(FORM_INICIAL);
    setEditId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSalvando(true);
    setFeedback({ tipo: '', mensagem: '' });

    const payload = {
      tipo: form.tipo,
      nome: form.nome,
      texto: form.texto,
      avatar_url: form.avatar_url || null,
      role: ['voluntario', 'parceiro'].includes(form.tipo) ? form.role || null : null,
      area: ['voluntario', 'parceiro'].includes(form.tipo) ? form.area || null : null,
      idade: form.tipo === 'beneficiado' ? form.idade || null : null,
      localizacao: form.tipo === 'beneficiado' ? form.localizacao || null : null,
      transformacao_de: form.tipo === 'beneficiado' ? form.transformacao_de || null : null,
      transformacao_para: form.tipo === 'beneficiado' ? form.transformacao_para || null : null,
      doacao: form.tipo === 'beneficiado' ? form.doacao || null : null,
      ativo: form.ativo,
      ordem: Number(form.ordem) || 0,
    };

    if (editId) {
      const { error } = await supabase.from('depoimentos').update(payload).eq('id', editId);
      if (error) {
        setFeedback({ tipo: 'erro', mensagem: 'Nao foi possivel salvar as alteracoes.' });
      } else {
        setDepoimentos((prev) => prev.map((d) => (d.id === editId ? { ...d, ...payload } : d)));
        setFeedback({ tipo: 'sucesso', mensagem: 'Depoimento atualizado com sucesso.' });
        cancelarEdicao();
      }
    } else {
      const { data, error } = await supabase.from('depoimentos').insert([payload]).select();
      if (error) {
        setFeedback({ tipo: 'erro', mensagem: 'Nao foi possivel adicionar o depoimento.' });
      } else if (data) {
        setDepoimentos((prev) => [data[0], ...prev]);
        setForm(FORM_INICIAL);
        setFeedback({ tipo: 'sucesso', mensagem: 'Depoimento adicionado com sucesso.' });
      }
    }
    setSalvando(false);
  }

  async function handleDelete(id) {
    if (!window.confirm('Excluir este depoimento?')) return;
    const { error } = await supabase.from('depoimentos').delete().eq('id', id);
    if (error) {
      setFeedback({ tipo: 'erro', mensagem: 'Nao foi possivel excluir o depoimento.' });
    } else {
      setDepoimentos((prev) => prev.filter((d) => d.id !== id));
      setFeedback({ tipo: 'sucesso', mensagem: 'Depoimento excluido com sucesso.' });
    }
  }

  async function toggleAtivo(dep) {
    const { error } = await supabase
      .from('depoimentos')
      .update({ ativo: !dep.ativo })
      .eq('id', dep.id);
    if (error) {
      setFeedback({ tipo: 'erro', mensagem: 'Nao foi possivel alterar o status do depoimento.' });
    } else {
      setDepoimentos((prev) =>
        prev.map((d) => (d.id === dep.id ? { ...d, ativo: !d.ativo } : d))
      );
      setFeedback({
        tipo: 'sucesso',
        mensagem: dep.ativo ? 'Depoimento desativado com sucesso.' : 'Depoimento ativado com sucesso.'
      });
    }
  }

  const listagem = filtroTipo === 'todos'
    ? depoimentos
    : depoimentos.filter((d) => d.tipo === filtroTipo);

  return (
    <div className="bg-gray-50 min-h-screen p-6 lg:p-10 pt-20">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate('/admin')} className="text-black hover:opacity-60 transition text-sm flex items-center gap-1 mb-4">
          <i className="fas fa-arrow-left text-xs"></i> Voltar ao painel
        </button>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Depoimentos</h1>
        </div>

        {feedback.mensagem && (
          <div
            className={`mb-6 rounded-xl border px-4 py-3 text-sm font-medium ${
              feedback.tipo === 'erro'
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-green-50 border-green-200 text-green-700'
            }`}
          >
            {feedback.mensagem}
          </div>
        )}

        {/* Formulário */}
        <div className="bg-white rounded-2xl shadow p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {editId ? 'Editar Depoimento' : 'Novo Depoimento'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tipo */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="voluntario">Voluntário</option>
                <option value="beneficiado">Beneficiado</option>
                <option value="parceiro">Parceiro</option>
              </select>
            </div>

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Nome da pessoa"
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            {/* Avatar URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Foto (URL ou caminho)</label>
              <input
                name="avatar_url"
                value={form.avatar_url}
                onChange={handleChange}
                placeholder="/images/foto.jpg"
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            {/* Texto */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Depoimento *</label>
              <textarea
                name="texto"
                value={form.texto}
                onChange={handleChange}
                rows={4}
                placeholder="Texto do depoimento..."
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            {/* Campos de voluntário */}
            {['voluntario', 'parceiro'].includes(form.tipo) && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {form.tipo === 'parceiro' ? 'Cargo' : 'Cargo / Período'}
                  </label>
                  <input
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder={form.tipo === 'parceiro' ? 'Ex: Diretora de Sustentabilidade' : 'Ex: Voluntária desde 2022'}
                    className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {form.tipo === 'parceiro' ? 'Empresa / Organização' : 'Área de atuação'}
                  </label>
                  <input
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    placeholder={form.tipo === 'parceiro' ? 'Ex: Parceiro 01' : 'Ex: Pedagoga'}
                    className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </>
            )}

            {/* Campos de beneficiado */}
            {form.tipo === 'beneficiado' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                  <input
                    name="idade"
                    value={form.idade}
                    onChange={handleChange}
                    placeholder="Ex: 34 anos ou 10"
                    className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                  <input
                    name="localizacao"
                    value={form.localizacao}
                    onChange={handleChange}
                    placeholder="Ex: Mandaqui, SP"
                    className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transformação: antes</label>
                  <input
                    name="transformacao_de"
                    value={form.transformacao_de}
                    onChange={handleChange}
                    placeholder="Ex: Desempregada"
                    className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transformação: depois</label>
                  <input
                    name="transformacao_para"
                    value={form.transformacao_para}
                    onChange={handleChange}
                    placeholder="Ex: Analista de Sistemas Jr"
                    className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Informação de doação</label>
                  <input
                    name="doacao"
                    value={form.doacao}
                    onChange={handleChange}
                    placeholder="Ex: R$ 150 por 6 meses"
                    className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </>
            )}

            {/* Ordem e Ativo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ordem de exibição</label>
              <input
                name="ordem"
                type="number"
                value={form.ordem}
                onChange={handleChange}
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                name="ativo"
                id="ativo"
                checked={form.ativo}
                onChange={handleChange}
                className="w-4 h-4 accent-teal-600"
              />
              <label htmlFor="ativo" className="text-sm font-medium text-gray-700">Ativo (visível no site)</label>
            </div>

            {/* Botões */}
            <div className="md:col-span-2 flex gap-3 pt-2">
              <Button type="submit" variant="primary" size="md" disabled={salvando}>
                {salvando ? 'Salvando...' : editId ? 'Salvar Alterações' : 'Adicionar Depoimento'}
              </Button>
              {editId && (
                <Button type="button" variant="outline" size="md" onClick={cancelarEdicao}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Filtro */}
        <div className="flex gap-2 mb-6">
          {['todos', 'voluntario', 'beneficiado', 'parceiro'].map((t) => (
            <button
              key={t}
              onClick={() => setFiltroTipo(t)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                filtroTipo === t
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {t === 'todos' ? 'Todos' : TIPO_LABELS[t]}
            </button>
          ))}
        </div>

        {/* Listagem */}
        {loading ? (
          <p className="text-gray-500 text-center py-12">Carregando depoimentos...</p>
        ) : erroCarregamento ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Nao foi possivel carregar os depoimentos no momento.</p>
            <Button type="button" variant="primary" size="sm" onClick={fetchDepoimentos}>
              Tentar novamente
            </Button>
          </div>
        ) : listagem.length === 0 ? (
          <p className="text-gray-400 text-center py-12">Nenhum depoimento encontrado.</p>
        ) : (
          <div className="space-y-4">
            {listagem.map((dep) => (
              <div
                key={dep.id}
                className={`bg-white rounded-xl shadow p-5 flex gap-4 items-start border-l-4 ${
                  dep.tipo === 'voluntario'
                    ? 'border-teal-500'
                    : dep.tipo === 'beneficiado'
                      ? 'border-orange-400'
                      : 'border-blue-500'
                } ${!dep.ativo ? 'opacity-50' : ''}`}
              >
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  {dep.avatar_url ? (
                    <img
                      src={dep.avatar_url}
                      alt={dep.nome}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">
                      👤
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        dep.tipo === 'voluntario'
                          ? 'bg-teal-100 text-teal-700'
                          : dep.tipo === 'beneficiado'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {TIPO_LABELS[dep.tipo]}
                    </span>
                    {!dep.ativo && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        Inativo
                      </span>
                    )}
                    <span className="text-xs text-gray-400 ml-auto">Ordem: {dep.ordem}</span>
                  </div>
                  <p className="font-bold text-gray-900">{dep.nome}</p>
                  {dep.role && <p className="text-xs text-gray-500">{dep.role} · {dep.area}</p>}
                  {dep.localizacao && <p className="text-xs text-gray-500">{dep.idade} anos · {dep.localizacao}</p>}
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{dep.texto}</p>
                </div>

                {/* Ações */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => iniciarEdicao(dep)}
                    className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => toggleAtivo(dep)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
                      dep.ativo
                        ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    {dep.ativo ? 'Desativar' : 'Ativar'}
                  </button>
                  <button
                    onClick={() => handleDelete(dep.id)}
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
