import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import BePartner from './pages/BePartner'
import OurProjects from './pages/OurProjects'
import Transparency from './pages/Transparency'
import Contact from './pages/Contact'
import Donation from './pages/Donation'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="w-full">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nossa-historia" element={<OurStory />} />
          <Route path="/seja-parceiro" element={<BePartner />} />
          <Route path="/nossos-projetos" element={<OurProjects />} />
          <Route path="/transparencia" element={<Transparency />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/doacao" element={<Donation />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App