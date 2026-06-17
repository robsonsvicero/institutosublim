import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabaseClient';
import * as XLSX from 'xlsx';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isAdmin = user?.role === 'admin';

  // State para os dados
  const [stats, setStats] = useState({
    cursosAtivos: 0,
    totalDepoimentos: 0,
    aguardandoAprovacao: 0,
    recentes: [],
    encerrados: []
  });

  const [loading, setLoading] = useState(true);
  const [showRelatorio, setShowRelatorio] = useState(false);
  const [gerandoRelatorio, setGerandoRelatorio] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch Cursos
        const { data: cursos, error: cursosError } = await supabase
          .from('cursos_oficinas')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (cursosError) throw cursosError;

        // Fetch Depoimentos
        const { count: depoimentosCount, error: depError } = await supabase
          .from('depoimentos')
          .select('*', { count: 'exact', head: true })
          .eq('ativo', true);

        if (depError) throw depError;

        // Fetch Usuários aguardando aprovação
        const { count: usuariosCount, error: userError } = await supabase
          .from('usuarios')
          .select('*', { count: 'exact', head: true })
          .eq('aprovado', false);

        if (userError) throw userError;

        const ativos = cursos.filter(c => !c.closed);
        const recentes = cursos.slice(0, 3);
        const encerrados = cursos.filter(c => c.closed).slice(0, 4);

        setStats({
          cursosAtivos: ativos.length,
          totalDepoimentos: depoimentosCount || 0,
          aguardandoAprovacao: usuariosCount || 0,
          recentes,
          encerrados
        });

      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      navigate('/');
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Erro ao sair:', error.message);
    }
  };

  async function handleGerarRelatorio(tipo) {
    setGerandoRelatorio(true);
    try {
      let query = supabase.from('cursos_oficinas').select('*').order('created_at', { ascending: false });
      if (tipo === 'ativos') query = query.eq('closed', false);
      else if (tipo === 'encerrados') query = query.eq('closed', true);

      const { data, error } = await query;
      if (error) throw error;

      const titulo = tipo === 'ativos' ? 'Cursos em Andamento' : tipo === 'encerrados' ? 'Cursos Encerrados' : 'Todos os Cursos';

      // Monta as linhas da planilha
      const linhas = data.map(c => ({
        'Título': c.title || '-',
        'Categoria': c.category || '-',
        'Status': c.closed ? 'Encerrado' : 'Ativo',
        'Alunos': c.students || '-',
        'Frequência': c.frequency || '-',
        'Duração': c.duration || '-',
        'Próxima Aula': c.next_class || '-',
        'Data de Criação': new Date(c.created_at).toLocaleDateString('pt-BR'),
      }));

      const ws = XLSX.utils.json_to_sheet(linhas);

      // Ajusta largura das colunas automaticamente
      ws['!cols'] = [
        { wch: 35 }, // Título
        { wch: 20 }, // Categoria
        { wch: 12 }, // Status
        { wch: 10 }, // Alunos
        { wch: 15 }, // Frequência
        { wch: 12 }, // Duração
        { wch: 18 }, // Próxima Aula
        { wch: 18 }, // Data Criação
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, titulo.substring(0, 31));

      const nomeArquivo = `relatorio_${tipo}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(wb, nomeArquivo);

      setShowRelatorio(false);
    } catch (err) {
      alert('Erro ao gerar relatório: ' + err.message);
    } finally {
      setGerandoRelatorio(false);
    }
  }

  const menuItems = [
    { name: 'Painel', icon: 'fa-solid fa-border-all', path: '/admin', active: true },
    { name: 'Cursos', icon: 'fa-solid fa-graduation-cap', path: '/admin/cursos-oficinas' },
    { name: 'Depoimentos', icon: 'fa-solid fa-quote-left', path: '/admin/depoimentos' },
    ...(isAdmin ? [{ name: 'Usuários', icon: 'fa-solid fa-users', path: '/admin/usuarios' }] : []),
    { name: 'Configurações', icon: 'fa-solid fa-gear', path: '/alterar-senha' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-body">
      {/* Sidebar */}
      <aside className="w-[280px] bg-gray-50 border-r border-gray-200 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-8 pb-4">
          <h1 className="text-3xl font-montserrat font-bold text-gray-900 leading-tight mb-1">
            Painel<br />Administrativo
          </h1>
          <p className="text-sm text-gray-500">Gestão do Instituto Sublim</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
                item.active
                  ? 'bg-gray-200 text-gray-900 border-l-4 border-gray-900'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent'
              }`}
            >
              <i className={`${item.icon} w-5 text-center text-lg`}></i>
              {item.name}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {user?.nome ? user.nome.substring(0, 2).toUpperCase() : 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate w-[100px]" title={user?.nome || 'Usuário'}>
                {user?.nome || 'Usuário'}
              </p>
              <p className="text-xs text-gray-500">{isAdmin ? 'Administrador' : 'Colaborador'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-10 h-10 bg-[#00E600] hover:bg-green-500 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm"
            title="Sair"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold font-montserrat text-gray-900">Visão Geral do Painel</h2>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                placeholder="Pesquisar atividades..." 
                className="pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-full text-sm focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-primary-500 w-[280px] transition-all outline-none"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 max-w-7xl mx-auto w-full flex-1">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex justify-between relative overflow-hidden">
              <div className="z-10">
                <p className="text-xs font-bold text-gray-500 tracking-wider mb-2 uppercase">Cursos Ativos</p>
                <h3 className="text-4xl font-bold text-gray-900 font-montserrat mb-2">
                  {loading ? '...' : stats.cursosAtivos}
                </h3>
                <p className="text-sm font-medium text-teal-600 flex items-center gap-1">
                  <i className="fa-solid fa-arrow-trend-up"></i> Atualizado hoje
                </p>
              </div>
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-white z-10 shadow-md">
                <i className="fa-solid fa-graduation-cap text-2xl"></i>
              </div>
              {/* Decorative circles */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-50 rounded-full opacity-50 border-8 border-white"></div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex justify-between relative overflow-hidden">
              <div className="z-10">
                <p className="text-xs font-bold text-gray-500 tracking-wider mb-2 uppercase">Total de Depoimentos</p>
                <h3 className="text-4xl font-bold text-gray-900 font-montserrat mb-2">
                  {loading ? '...' : stats.totalDepoimentos}
                </h3>
                <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                  <i className="fa-regular fa-circle-check"></i> Ativos no site
                </p>
              </div>
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 z-10">
                <i className="fa-solid fa-quote-right text-2xl"></i>
              </div>
               {/* Decorative circles */}
               <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-50 rounded-full opacity-50 border-8 border-white"></div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100 flex justify-between relative overflow-hidden">
              <div className="z-10">
                <p className="text-xs font-bold text-red-600 tracking-wider mb-2 uppercase">Aguardando Aprovação</p>
                <h3 className="text-4xl font-bold text-red-600 font-montserrat mb-2">
                  {loading ? '...' : stats.aguardandoAprovacao}
                </h3>
                <p className="text-sm font-medium text-red-500 flex items-center gap-1">
                  {!loading && stats.aguardandoAprovacao > 0 ? '! Ação imediata necessária' : 'Tudo em dia'}
                </p>
              </div>
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 z-10">
                <i className="fa-solid fa-user-plus text-2xl"></i>
              </div>
               {/* Decorative circles */}
               <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-50 rounded-full opacity-50 border-8 border-white"></div>
            </div>
          </div>

          {/* Main Lists Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Adicionados Recentemente) */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold font-montserrat text-gray-900">Cursos Adicionados Recentemente</h3>
                  <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">Novo</span>
                </div>
                <button onClick={() => navigate('/admin/cursos-oficinas')} className="text-sm font-bold text-gray-900 hover:underline">Ver Todos</button>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <p className="text-sm text-gray-500">Carregando...</p>
                ) : stats.recentes.length === 0 ? (
                  <p className="text-sm text-gray-500">Nenhum curso encontrado.</p>
                ) : (
                  stats.recentes.map(curso => (
                    <div key={curso.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {curso.icon ? (
                            <i className={`fas fa-${curso.icon} text-2xl text-gray-500`}></i>
                          ) : (
                            <img src="https://images.unsplash.com/photo-1592424001801-9d1154c1bebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="Curso" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{curso.title}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{curso.category} • Adicionado em {new Date(curso.created_at).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right flex flex-col items-end">
                          {curso.closed ? (
                            <span className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-1">Encerrado</span>
                          ) : (
                            <span className="bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1 rounded-full mb-1 border border-gray-200">Ativo</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Column (Encerrados Recentemente) */}
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-montserrat text-gray-900">Encerrados Recentemente</h3>
                <button className="text-gray-500 hover:text-gray-900"><i className="fa-solid fa-clock-rotate-left"></i></button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                <div className="grid grid-cols-4 bg-gray-50 p-4 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="col-span-3">Título do Curso</div>
                  <div className="col-span-1 text-right">Alunos</div>
                </div>
                
                <div className="divide-y divide-gray-100 flex-1">
                  {loading ? (
                    <div className="p-4"><p className="text-sm text-gray-500">Carregando...</p></div>
                  ) : stats.encerrados.length === 0 ? (
                    <div className="p-4"><p className="text-sm text-gray-500">Nenhum curso encerrado.</p></div>
                  ) : (
                    stats.encerrados.map(curso => (
                      <div key={curso.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition">
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{curso.title}</h4>
                          <p className="text-[10px] text-gray-400 mt-1">Status: Encerrado</p>
                        </div>
                        <span className="font-bold text-gray-900">{curso.students || '-'}</span>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-4 border-t border-gray-100">
                  <button
                    onClick={() => setShowRelatorio(true)}
                    className="w-full text-center text-sm font-bold text-gray-700 hover:text-gray-900 transition flex justify-center items-center gap-2"
                  >
                    Gerar Relatório de Arquivo Completo <i className="fa-regular fa-file-pdf"></i>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Modal de Relatório */}
      {showRelatorio && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowRelatorio(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-gray-900 mb-2 font-montserrat">Gerar Relatório</h2>
            <p className="text-sm text-gray-500 mb-6">Escolha qual conjunto de cursos deseja exportar:</p>
            <div className="space-y-3">
              {[
                { tipo: 'ativos', label: 'Cursos em Andamento', icon: 'fa-solid fa-play-circle', cor: 'text-green-600 bg-green-50 border-green-200' },
                { tipo: 'encerrados', label: 'Cursos Encerrados', icon: 'fa-solid fa-stop-circle', cor: 'text-red-600 bg-red-50 border-red-200' },
                { tipo: 'todos', label: 'Todos os Cursos', icon: 'fa-solid fa-list', cor: 'text-gray-700 bg-gray-50 border-gray-200' },
              ].map(op => (
                <button
                  key={op.tipo}
                  onClick={() => handleGerarRelatorio(op.tipo)}
                  disabled={gerandoRelatorio}
                  className={`w-full text-left flex items-center gap-3 p-4 rounded-xl border font-semibold text-sm transition hover:shadow-sm disabled:opacity-60 ${op.cor}`}
                >
                  <i className={op.icon}></i>
                  {op.label}
                  <i className="fa-solid fa-download ml-auto opacity-60 text-xs"></i>
                </button>
              ))}
            </div>
            <button onClick={() => setShowRelatorio(false)} className="mt-5 w-full py-2.5 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
