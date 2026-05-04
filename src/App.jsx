import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import BePartner from './pages/BePartner'
import BeVolunteer from './pages/BeVolunteer'
import OurProjects from './pages/OurProjects'
import Transparency from './pages/Transparency'
import Contact from './pages/Contact'
import TransformLivesDonation from './pages/Donation'
import InscricaoOficinas from './pages/InscricaoOficinas';
import Oficinas from './pages/Oficinas';
import AdminCursosOficinas from './pages/AdminCursosOficinas';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminUsuarios from './pages/AdminUsuarios';
import AdminAprovacaoUsuarios from './pages/AdminAprovacaoUsuarios';
import AlterarSenha from './pages/AlterarSenha';
import AdminDashboard from './pages/AdminDashboard';
import AdminDepoimentos from './pages/AdminDepoimentos';
import CartaoVisitaDigital from './pages/CartaoVisitaDigital';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  const location = useLocation();
  const isCartao = location.pathname === '/cartao';
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/alterar-senha';
  
  return (
    <div className="w-full">
      {!isCartao && !isAuthRoute && (
        <Header fixed={!isAdminRoute} textColor={isAdminRoute ? 'admin' : undefined} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nossa-historia" element={<OurStory />} />
        <Route path="/seja-parceiro" element={<BePartner />} />
        <Route path="/seja-voluntario" element={<BeVolunteer />} />
        <Route path="/nossos-projetos" element={<OurProjects />} />
        <Route path="/transparencia" element={<Transparency />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/doacao" element={<TransformLivesDonation />} />
        <Route path="/inscricao-oficinas" element={<InscricaoOficinas />} />
        <Route path="/oficinas" element={<Oficinas />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cartao" element={<CartaoVisitaDigital />} />

        {/* Rotas protegidas (Administrador ou Voluntário) */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/cursos-oficinas" element={<ProtectedRoute><AdminCursosOficinas /></ProtectedRoute>} />
        <Route path="/admin/depoimentos" element={<ProtectedRoute><AdminDepoimentos /></ProtectedRoute>} />
        <Route path="/alterar-senha" element={<ProtectedRoute><AlterarSenha /></ProtectedRoute>} />

        {/* Rotas protegidas exclusivas para Administradores */}
        <Route path="/admin/usuarios" element={<ProtectedRoute requireAdmin={true}><AdminUsuarios /></ProtectedRoute>} />
        <Route path="/admin/aprovacao-usuarios" element={<ProtectedRoute requireAdmin={true}><AdminAprovacaoUsuarios /></ProtectedRoute>} />
      </Routes>
      {!isCartao && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}

export default App