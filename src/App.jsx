import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import BePartner from './pages/BePartner'
import OurProjects from './pages/OurProjects'

function App() {
  return (
    <BrowserRouter>
      <div className="w-full">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nossa-historia" element={<OurStory />} />
          <Route path="/seja-parceiro" element={<BePartner />} />
          <Route path="/nossos-projetos" element={<OurProjects />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App