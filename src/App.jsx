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
import AdminUsuarios from './pages/AdminUsuarios';
import AlterarSenha from './pages/AlterarSenha';
import AdminDashboard from './pages/AdminDashboard';
import CartaoVisitaDigital from './pages/CartaoVisitaDigital';

function AppContent() {
  const location = useLocation();
  const isInscricaoOficinas = location.pathname === '/inscricao-oficinas';
  const isCartao = location.pathname === '/cartao';
  return (
    <div className="w-full">
      {!isCartao && (
        <Header fixed={!isInscricaoOficinas} textColor={isInscricaoOficinas ? '#8B8B8B' : undefined} />
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
        <Route path="/admin/cursos-oficinas" element={<AdminCursosOficinas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/alterar-senha" element={<AlterarSenha />} />
        <Route path="/cartao" element={<CartaoVisitaDigital />} />
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