import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

export default function Header({ fixed = true, textColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const sobreNosBtnRef = useRef(null);

  useEffect(() => {
    if (!fixed) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fixed]);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
    setSubmenuOpen(false);
  };

  const linkClass = isScrolled
    ? 'text-[#8B8B8B] hover:text-primary-dark transition'
    : 'text-white hover:text-primary-200 transition';

  const desktopMenu = (
    <nav className="hidden lg:flex items-center gap-8">
      <Link to="/" onClick={handleLinkClick} className={linkClass}>Início</Link>
      <div className="relative group">
        <button ref={sobreNosBtnRef} className={linkClass + ' flex items-center gap-2'} tabIndex={0} onClick={() => setSubmenuOpen(!submenuOpen)}>
          Sobre Nós <span className="fa fa-chevron-down text-xs"></span>
        </button>
        {submenuOpen && ReactDOM.createPortal(
          <div className="fixed min-w-[200px] bg-white rounded-xl shadow-lg border border-gray-100 transition-opacity z-[9999] opacity-100 pointer-events-auto" style={sobreNosBtnRef.current ? { left: sobreNosBtnRef.current.getBoundingClientRect().left, top: sobreNosBtnRef.current.getBoundingClientRect().bottom + 8 } : {}}>
            <Link to="/nossa-historia" onClick={handleLinkClick} className="block px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-t-xl">Nossa História</Link>
            <Link to="/seja-voluntario" onClick={handleLinkClick} className="block px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700">Seja Voluntário</Link>
            <Link to="/nossos-projetos" onClick={handleLinkClick} className="block px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-b-xl">Nossos Projetos</Link>
          </div>, document.body)
        }
      </div>
      <Link to="/transparencia" onClick={handleLinkClick} className={linkClass}>Transparência</Link>
      <Link to="/seja-parceiro" onClick={handleLinkClick} className={linkClass}>Seja Parceiro</Link>
      <Link to="/oficinas" onClick={handleLinkClick} className={linkClass}>Oficinas e Capacitações</Link>
      <Link to="/contato" onClick={handleLinkClick} className={linkClass}>Contato</Link>
      <Link
        to="/admin"
        onClick={handleLinkClick}
        aria-label="Ir para Admin"
        title="Admin"
        className={`${linkClass} opacity-70 hover:opacity-100`}
      >
        <i className="fas fa-cog text-base"></i>
      </Link>
      <Link to="/doacao" onClick={handleLinkClick}>
        <Button variant="primary" icon="fas fa-heart" >DOE AGORA</Button>
      </Link>
    </nav>
  );

  const mobileMenu = isOpen && (
    <div className="lg:hidden fixed inset-0 bg-white z-40 pt-24 overflow-y-auto">
      <div className="container mx-auto px-6">
        <nav className="flex flex-col items-center gap-8 py-8">
          <Link to="/" onClick={handleLinkClick} className="text-xl font-medium text-[#8B8B8B] hover:text-primary-dark transition">Início</Link>
          <div className="relative">
            <button className="text-header flex items-center gap-2 w-full py-3" onClick={() => setSubmenuOpen(!submenuOpen)} aria-label="Abrir submenu Sobre Nós">Sobre Nós <span className="fa fa-chevron-down text-xs"></span></button>
            {submenuOpen && (
              <div className="pl-4 border-l-2 border-primary-100">
                <Link to="/nossa-historia" onClick={handleLinkClick} className="block py-2 text-gray-700">Nossa História</Link>
                <Link to="/seja-voluntario" onClick={handleLinkClick} className="block py-2 text-gray-700">Seja Voluntário</Link>
                <Link to="/nossos-projetos" onClick={handleLinkClick} className="block py-2 text-gray-700">Nossos Projetos</Link>
              </div>
            )}
          </div>
          <Link to="/transparencia" onClick={handleLinkClick} className="text-xl font-medium text-[#8B8B8B] hover:text-primary-dark transition">Transparência</Link>
          <Link to="/seja-parceiro" onClick={handleLinkClick} className="text-xl font-medium text-[#8B8B8B] hover:text-primary-dark transition">Seja Parceiro</Link>
          <Link to="/oficinas" onClick={handleLinkClick} className="text-xl font-medium text-[#8B8B8B] hover:text-primary-dark transition">Oficinas e Capacitações</Link>
          <Link to="/contato" onClick={handleLinkClick} className="text-xl font-medium text-[#8B8B8B] hover:text-primary-dark transition">Contato</Link>
          <Link
            to="/admin"
            onClick={handleLinkClick}
            aria-label="Ir para Admin"
            title="Admin"
            className="text-[#8B8B8B] hover:text-primary-dark transition opacity-70 hover:opacity-100"
          >
            <i className="fas fa-cog text-xl"></i>
          </Link>
          <div className="mt-8 w-full max-w-xs">
            <Link to="/doacao" onClick={handleLinkClick} className="w-full inline-flex items-center justify-center text-base py-4">
              <Button variant="primary" icon="fas fa-heart">DOE AGORA</Button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <header className={`${fixed ? 'fixed inset-x-0 top-0 z-[1000]' : ''} bg-white lg:bg-transparent shadow-sm lg:shadow-none transition-all duration-300`}>
        <div className={`lg:backdrop-blur-sm ${isScrolled ? 'lg:bg-white lg:shadow-md' : 'lg:bg-white/10'} p-1 lg:px-[204px] overflow-visible`}>
          <div className="container mx-auto">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center gap-2 relative z-50">
                <img src="/images/sublim_horizontal 1.png" alt="Instituto Sublim" className="h-20" />
              </Link>
              {desktopMenu}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Abrir menu"
                className="lg:hidden p-2 rounded-full bg-primary-500 focus:outline-none transition relative z-50"
              >
                <svg className="w-6 h-6 text-PRIMARY-DARK" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
