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
import Donation from './pages/Donation'
import InscricaoOficinas from './pages/InscricaoOficinas';
import Oficinas from './pages/Oficinas';

function AppContent() {
  const location = useLocation();
  const isInscricaoOficinas = location.pathname === '/inscricao-oficinas';
  return (
    <div className="w-full">
      <Header fixed={!isInscricaoOficinas} textColor={isInscricaoOficinas ? '#8B8B8B' : undefined} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nossa-historia" element={<OurStory />} />
        <Route path="/seja-parceiro" element={<BePartner />} />
        <Route path="/seja-voluntario" element={<BeVolunteer />} />
        <Route path="/nossos-projetos" element={<OurProjects />} />
        <Route path="/transparencia" element={<Transparency />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/doacao" element={<Donation />} />
        <Route path="/inscricao-oficinas" element={<InscricaoOficinas />} />
        <Route path="/oficinas" element={<Oficinas />} />
      </Routes>
      <Footer />
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