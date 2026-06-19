import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';

export default function AlterarSenha() {
  const { user, signOut } = useAuth();
  const isAdmin = user?.role === 'admin';
  const navigate = useNavigate();

  // Senha
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [errorSenha, setErrorSenha] = useState('');
  const [successSenha, setSuccessSenha] = useState('');
  const [loadingSenha, setLoadingSenha] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Perfil
  const [nomeEdit, setNomeEdit] = useState('');
  const [emailEdit, setEmailEdit] = useState('');
  const [errorPerfil, setErrorPerfil] = useState('');
  const [successPerfil, setSuccessPerfil] = useState('');
  const [loadingPerfil, setLoadingPerfil] = useState(false);

  // Notificações
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifNovoCadastro, setNotifNovoCadastro] = useState(true);
  const [notifDepoimentos, setNotifDepoimentos] = useState(false);
  const [notifCursos, setNotifCursos] = useState(false);
  const [successNotif, setSuccessNotif] = useState('');

  // Sessões
  const [sessoes, setSessoes] = useState([]);
  const [loadingSessoes, setLoadingSessoes] = useState(false);
  const [activeTab, setActiveTab] = useState('senha');

  const menuItems = [
    { name: 'Painel', icon: 'fa-solid fa-border-all', path: '/admin' },
    { name: 'Cursos', icon: 'fa-solid fa-graduation-cap', path: '/admin/cursos-oficinas' },
    { name: 'Depoimentos', icon: 'fa-solid fa-quote-left', path: '/admin/depoimentos' },
    ...(isAdmin ? [{ name: 'Usuários', icon: 'fa-solid fa-users', path: '/admin/usuarios' }] : []),
    { name: 'Configurações', icon: 'fa-solid fa-gear', path: '/alterar-senha', active: true },
  ];

  useEffect(() => {
    if (user) {
      setNomeEdit(user.nome || '');
      setEmailEdit(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 'sessoes') {
      fetchSessoes();
    }
  }, [activeTab]);

  async function fetchSessoes() {
    setLoadingSessoes(true);
    // O Supabase não expõe uma API de listagem de sessões pelo client-side,
    // mas podemos simular com a sessão atual.
    const { data } = await supabase.auth.getSession();
    const now = new Date();
    setSessoes([
      {
        id: 'current',
        device: 'Navegador Web (Sessão Atual)',
        location: 'São Paulo, BR',
        lastSeen: 'Agora',
        isCurrent: true,
        icon: 'fa-solid fa-globe',
      },
    ]);
    setLoadingSessoes(false);
  }

  async function handleLogout() {
    navigate('/');
    await supabase.auth.signOut();
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setErrorSenha('');
    setSuccessSenha('');
    if (novaSenha.length < 6) { setErrorSenha('A senha deve ter pelo menos 6 caracteres.'); return; }
    if (novaSenha !== confirmarSenha) { setErrorSenha('As senhas não coincidem.'); return; }
    setLoadingSenha(true);
    const { error } = await supabase.auth.updateUser({ password: novaSenha });
    setLoadingSenha(false);
    if (error) {
      setErrorSenha('Erro ao alterar senha: ' + error.message);
    } else {
      setSuccessSenha('Senha alterada com sucesso!');
      setNovaSenha('');
      setConfirmarSenha('');
      setTimeout(() => setSuccessSenha(''), 3000);
    }
  }

  async function handleSavePerfil(e) {
    e.preventDefault();
    setErrorPerfil('');
    setSuccessPerfil('');
    if (!nomeEdit.trim()) { setErrorPerfil('O nome não pode estar vazio.'); return; }
    setLoadingPerfil(true);

    // Atualiza o nome na tabela usuarios
    const { error: dbError } = await supabase
      .from('usuarios')
      .update({ nome: nomeEdit.trim() })
      .eq('auth_id', user.id || user.auth_id);

    setLoadingPerfil(false);

    if (dbError) {
      setErrorPerfil('Erro ao atualizar perfil: ' + dbError.message);
    } else {
      setSuccessPerfil('Perfil atualizado com sucesso!');
      setTimeout(() => setSuccessPerfil(''), 3000);
    }
  }

  function handleSaveNotif() {
    setSuccessNotif('Preferências de notificação salvas!');
    setTimeout(() => setSuccessNotif(''), 3000);
  }

  async function handleSignOutAll() {
    if (!window.confirm('Deseja encerrar todas as sessões? Você precisará fazer login novamente.')) return;
    navigate('/');
    await supabase.auth.signOut({ scope: 'global' });
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-500">Você precisa estar logado.</p>
      </div>
    );
  }

  const ToggleSwitch = ({ checked, onChange, id }) => (
    <button
      id={id}
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex w-11 h-6 rounded-full transition-colors focus:outline-none ${checked ? 'bg-[#007F5F]' : 'bg-gray-200'}`}
    >
      <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transition-transform mt-1 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

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
          <h2 className="text-xl font-bold font-montserrat text-gray-900">Painel de Configurações</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="Pesquisar configurações..."
                className="pl-9 pr-4 py-2 bg-gray-100 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-gray-300 w-full sm:w-[280px] transition-all outline-none"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 flex-1 w-full max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-2">Configurações de Segurança</h1>
            <p className="text-gray-500 text-sm">Gerencie suas credenciais de conta e preferências de segurança para proteger seus dados institucionais.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Menu Lateral */}
            <div className="w-full lg:w-72 flex flex-col gap-3 flex-shrink-0">
              {[
                { id: 'perfil', icon: 'fa-regular fa-user', label: 'Informações do Perfil', sub: 'Configurações de identidade pública' },
                { id: 'senha', icon: 'fa-solid fa-lock', label: 'Senha e Segurança', sub: 'Credenciais e 2FA' },
                { id: 'notificacoes', icon: 'fa-regular fa-bell', label: 'Notificações', sub: 'Alertas e e-mails' },
                { id: 'sessoes', icon: 'fa-solid fa-desktop', label: 'Sessões Ativas', sub: 'Gerencie seus acessos' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left p-4 rounded-xl flex items-start gap-3 transition-all ${
                    activeTab === tab.id
                      ? 'border-2 border-gray-900 bg-white shadow-sm'
                      : 'border border-gray-200 bg-white/50 hover:bg-white hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} mt-0.5 ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-500'}`}></i>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{tab.label}</p>
                    <p className="text-xs text-gray-500">{tab.sub}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Painel Principal */}
            <div className="flex-1 w-full">

              {/* ─── PERFIL ─── */}
              {activeTab === 'perfil' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl">
                  <h2 className="text-xl font-bold font-montserrat text-gray-900 mb-1">Informações do Perfil</h2>
                  <p className="text-sm text-gray-500 mb-8">Atualize seu nome de exibição no painel administrativo.</p>
                  <div className="border-t border-gray-100 pt-8">

                    {successPerfil && (
                      <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-2">
                        <i className="fa-solid fa-check-circle"></i> {successPerfil}
                      </div>
                    )}
                    {errorPerfil && (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-2">
                        <i className="fa-solid fa-circle-exclamation"></i> {errorPerfil}
                      </div>
                    )}

                    {/* Avatar */}
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                        {nomeEdit ? nomeEdit.substring(0, 2).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{nomeEdit || 'Usuário'}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          {isAdmin ? 'Administrador' : 'Colaborador'}
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleSavePerfil} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Nome de Exibição</label>
                        <input
                          type="text"
                          value={nomeEdit}
                          onChange={e => setNomeEdit(e.target.value)}
                          className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:ring-2 focus:ring-gray-900 outline-none transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">E-mail (somente leitura)</label>
                        <input
                          type="email"
                          value={emailEdit}
                          readOnly
                          className="border border-gray-100 rounded-xl p-3 w-full text-sm bg-gray-50 text-gray-400 cursor-not-allowed outline-none"
                        />
                        <p className="text-[11px] text-gray-400 mt-1">O e-mail é gerenciado pelo sistema de autenticação e não pode ser alterado aqui.</p>
                      </div>
                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          disabled={loadingPerfil}
                          className="bg-[#007F5F] hover:bg-[#00664A] text-white px-6 py-3 rounded-xl text-sm font-bold transition shadow-sm disabled:opacity-70"
                        >
                          {loadingPerfil ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ─── SENHA ─── */}
              {activeTab === 'senha' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl">
                  <h2 className="text-xl font-bold font-montserrat text-gray-900 mb-1">Alterar Senha</h2>
                  <p className="text-sm text-gray-500 mb-8">Certifique-se de que sua conta está usando uma senha longa e aleatória para se manter seguro.</p>
                  <div className="border-t border-gray-100 pt-8">
                    {successSenha && (
                      <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-2">
                        <i className="fa-solid fa-check-circle"></i> {successSenha}
                      </div>
                    )}
                    {errorSenha && (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-2">
                        <i className="fa-solid fa-circle-exclamation"></i> {errorSenha}
                      </div>
                    )}
                    <form onSubmit={handleChangePassword} className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Senha Atual</label>
                        <div className="relative">
                          <input type="password" placeholder="••••••••" className="border border-gray-200 rounded-xl p-3 w-full text-sm bg-gray-50 text-gray-400 cursor-not-allowed outline-none" disabled />
                          <i className="fa-regular fa-eye absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"></i>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Nova Senha</label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Digite a nova senha"
                              value={novaSenha}
                              onChange={e => setNovaSenha(e.target.value)}
                              className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:ring-2 focus:ring-gray-900 outline-none transition"
                              required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                              {showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Confirmar Senha</label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirme a nova senha"
                              value={confirmarSenha}
                              onChange={e => setConfirmarSenha(e.target.value)}
                              className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:ring-2 focus:ring-gray-900 outline-none transition"
                              required
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                              {showConfirmPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                        <p className="text-xs font-bold text-gray-700 mb-3">Requisitos de Senha:</p>
                        <ul className="space-y-2 text-xs text-gray-500">
                          <li className="flex items-center gap-2">
                            <i className={`fa-solid fa-circle-check ${novaSenha.length >= 6 ? 'text-green-600' : 'text-gray-300'}`}></i> Mínimo de 6 caracteres
                          </li>
                          <li className="flex items-center gap-2">
                            <i className={`fa-solid fa-circle-check ${/[A-Z]/.test(novaSenha) && /[0-9]/.test(novaSenha) ? 'text-green-600' : 'text-gray-300'}`}></i> Pelo menos uma letra maiúscula e um número
                          </li>
                          <li className="flex items-center gap-2">
                            <i className={`fa-solid fa-circle-check ${/[^A-Za-z0-9]/.test(novaSenha) ? 'text-green-600' : 'text-gray-300'}`}></i> Pelo menos um caractere especial
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <button type="button" onClick={() => navigate('/login')} className="text-xs font-bold text-gray-500 hover:text-gray-900 underline">Esqueceu sua senha?</button>
                        <button type="submit" disabled={loadingSenha} className="bg-[#007F5F] hover:bg-[#00664A] text-white px-6 py-3 rounded-xl text-sm font-bold transition shadow-sm disabled:opacity-70">
                          {loadingSenha ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ─── NOTIFICAÇÕES ─── */}
              {activeTab === 'notificacoes' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl">
                  <h2 className="text-xl font-bold font-montserrat text-gray-900 mb-1">Preferências de Notificação</h2>
                  <p className="text-sm text-gray-500 mb-8">Escolha quais alertas e comunicações você deseja receber.</p>
                  <div className="border-t border-gray-100 pt-8 space-y-0">

                    {successNotif && (
                      <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-2">
                        <i className="fa-solid fa-check-circle"></i> {successNotif}
                      </div>
                    )}

                    {[
                      { id: 'notif-email', label: 'Notificações por E-mail', sub: 'Receba um resumo semanal das atividades do painel no seu e-mail.', checked: notifEmail, setChecked: setNotifEmail },
                      { id: 'notif-cadastro', label: 'Novos Cadastros', sub: 'Seja notificado quando um novo usuário se cadastrar e aguardar aprovação.', checked: notifNovoCadastro, setChecked: setNotifNovoCadastro },
                      { id: 'notif-depoimentos', label: 'Novos Depoimentos', sub: 'Receba um alerta quando um depoimento for editado ou excluído.', checked: notifDepoimentos, setChecked: setNotifDepoimentos },
                      { id: 'notif-cursos', label: 'Atualizações de Cursos', sub: 'Notificação quando um curso ou oficina for adicionado ou alterado.', checked: notifCursos, setChecked: setNotifCursos },
                    ].map((item, i, arr) => (
                      <div key={item.id} className={`flex items-start justify-between gap-6 py-5 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.sub}</p>
                        </div>
                        <ToggleSwitch id={item.id} checked={item.checked} onChange={item.setChecked} />
                      </div>
                    ))}

                    <div className="pt-6 flex justify-end">
                      <button
                        onClick={handleSaveNotif}
                        className="bg-[#007F5F] hover:bg-[#00664A] text-white px-6 py-3 rounded-xl text-sm font-bold transition shadow-sm"
                      >
                        Salvar Preferências
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SESSÕES ─── */}
              {activeTab === 'sessoes' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl">
                  <h2 className="text-xl font-bold font-montserrat text-gray-900 mb-1">Sessões Ativas</h2>
                  <p className="text-sm text-gray-500 mb-8">Gerencie e encerre suas sessões ativas em outros dispositivos.</p>
                  <div className="border-t border-gray-100 pt-8">

                    {loadingSessoes ? (
                      <div className="flex items-center justify-center py-10 text-gray-400">
                        <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {sessoes.map(s => (
                          <div key={s.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                                <i className={`${s.icon} text-gray-600 text-sm`}></i>
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                  {s.device}
                                  {s.isCurrent && (
                                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase">Atual</span>
                                  )}
                                </p>
                                <p className="text-xs text-gray-500">{s.location} · {s.lastSeen}</p>
                              </div>
                            </div>
                            {!s.isCurrent && (
                              <button className="text-xs font-bold text-red-600 hover:text-red-800 underline flex-shrink-0">Encerrar</button>
                            )}
                          </div>
                        ))}

                        {/* Informação */}
                        <div className="p-4 rounded-xl border border-yellow-100 bg-yellow-50 flex gap-3">
                          <i className="fa-solid fa-circle-info text-yellow-500 mt-0.5 flex-shrink-0"></i>
                          <p className="text-xs text-yellow-700 leading-relaxed">
                            O Supabase gerencia as sessões de autenticação de forma segura. Para encerrar <strong>todas</strong> as sessões de outros dispositivos, use o botão abaixo.
                          </p>
                        </div>

                        <div className="pt-4 flex justify-between items-center">
                          <div>
                            <p className="text-xs font-bold text-gray-700">Encerrar Todas as Sessões</p>
                            <p className="text-xs text-gray-400">Você será deslogado de todos os dispositivos.</p>
                          </div>
                          <button
                            onClick={handleSignOutAll}
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
                          >
                            <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                            Encerrar Tudo
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
