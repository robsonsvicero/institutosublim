import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-[50px] pb-[24px] px-[16px] lg:pt-[100px] lg:px-[204px]" style={{ background: '#1a202c', color: '#cbd5e1' }}>
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo e Descrição */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/sublim_horizontal 1.png" alt="Instituto Sublim" className="h-24" />

            </div>
            <p className="text-sm opacity-75 mb-6">
              Transformando vidas na Zona Norte de São Paulo através de ações sociais,
              capacitação profissional e fortalecimento comunitário desde 2020.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                <i className="fa-brands fa-facebook text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                <i className="fa-brands fa-whatsapp text-lg"></i>
              </a>
            </div>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Institucional</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/nossa-historia" onClick={handleLinkClick} className="text-sm opacity-75 hover:opacity-100 hover:text-white transition">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link to="/transparencia" onClick={handleLinkClick} className="text-sm opacity-75 hover:opacity-100 hover:text-white transition">
                  Transparência
                </Link>
              </li>
              <li>
                <Link to="/contato" onClick={handleLinkClick} className="text-sm opacity-75 hover:opacity-100 hover:text-white transition">
                  Contato
                </Link>
              </li>
              <li>
                <a href="#terms" className="text-sm opacity-75 hover:opacity-100 hover:text-white transition">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          {/* Apoie */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Apoie</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/doacao" onClick={handleLinkClick} className="text-sm opacity-75 hover:opacity-100 hover:text-white transition">
                  Doar Agora
                </Link>
              </li>
              <li>
                <Link to="/seja-voluntario" onClick={handleLinkClick} className="text-sm opacity-75 hover:opacity-100 hover:text-white transition">
                  Seja Voluntário
                </Link>
              </li>
              <li>
                <Link to="/seja-parceiro" onClick={handleLinkClick} className="text-sm opacity-75 hover:opacity-100 hover:text-white transition">
                  Seja Parceiro
                </Link>
              </li>
              <li>
                <Link to="/nossos-projetos" onClick={handleLinkClick} className="text-sm opacity-75 hover:opacity-100 hover:text-white transition">
                  Nossos Projetos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-start gap-3">
            <i className="fas fa-map-marker-alt text-primary-500 mt-1"></i>
            <div className="text-sm">
              <p>R. Albertina Vieira da Silva Gordo, 154</p>
              <p className="opacity-75">Vila Aurora (Zona Norte), São Paulo - SP</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <i className="fas fa-phone text-primary-500"></i>
            <a href="tel:+5511975911225" className="text-sm hover:text-white transition">
              (11) 97591-1225
            </a>
          </div>

          <div className="flex items-center gap-3">
            <i className="fas fa-envelope text-primary-500"></i>
            <a href="mailto:contato@institutosublim.org.br" className="text-sm hover:text-white transition">
              contato@institutosublim.org.br
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-75">
            <p>© 2025 Instituto Sublim. Todos os direitos reservados.</p>
            <p>CNPJ: 12.345.678/0001-90 | Utilidade Pública</p>
            <div className='flex flex-col justify-center item-center'>
              <p className='text-center'>Desenvolvido por</p>
              <a 
              href="http://svicerostudio.com.br"
              target="_blank"  
              rel="noopener noreferrer">
                <img src="/images/logo_svicerostudio.png" alt="Svicero Studio" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}