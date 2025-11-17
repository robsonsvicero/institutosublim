import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white lg:bg-transparent shadow-sm lg:shadow-none transition-all duration-300">
        <div className={`lg:backdrop-blur-sm ${isScrolled ? 'lg:bg-white lg:shadow-md' : 'lg:bg-white/10'}`}>
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 relative z-50">
                <img
                  src="/images/sublim_horizontal 1.png"
                  alt="Instituto Sublim"
                  className="h-20"
                />

              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8">
                <Link
                  to="/"
                  className={`text-header transition ${isScrolled
                    ? 'text-[var(--color-text)] hover:text-[var(--color-primary)]'
                    : 'text-white/90 hover:text-white'
                    }`}
                >
                  Início
                </Link>
                <Link
                  to="/nossa-historia"
                  className={`text-header transition ${isScrolled
                    ? 'text-[var(--color-text)] hover:text-[var(--color-primary)]'
                    : 'text-white/80 hover:text-white'
                    }`}
                >
                  Nossa História
                </Link>
                <Link
                  to="/nossos-projetos"
                  className={`text-header transition ${isScrolled
                    ? 'text-[var(--color-text)] hover:text-[var(--color-primary)]'
                    : 'text-white/80 hover:text-white'
                    }`}
                >
                  Nossos Projetos
                </Link>
                <a
                  href="#transparency"
                  className={`text-header transition ${isScrolled
                    ? 'text-[var(--color-text)] hover:text-[var(--color-primary)]'
                    : 'text-white/80 hover:text-white'
                    }`}
                >
                  Transparência
                </a>
                <Link
                  to="/seja-parceiro"
                  className={`text-header transition ${isScrolled
                    ? 'text-[var(--color-text)] hover:text-[var(--color-primary)]'
                    : 'text-white/80 hover:text-white'
                    }`}
                >
                  Seja Parceiro
                </Link>
                <a
                  href="#contact"
                  className={`text-header transition ${isScrolled
                    ? 'text-[var(--color-text)] hover:text-[var(--color-primary)]'
                    : 'text-white/80 hover:text-white'
                    }`}
                >
                  Contato
                </a>
              </nav>

              {/* CTA Button - Desktop */}
              <div className="hidden lg:flex">
                <Button variant="primary" icon="fa-regular fa-heart">
                  QUERO AJUDAR
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Abrir menu"
                className="lg:hidden p-2 rounded-full bg-primary focus:outline-none transition relative z-50"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </header >

      {/* Mobile Navigation - Full Screen Overlay */}
      {
        isOpen && (
          <div className="lg:hidden fixed inset-0 bg-white z-40 pt-24 overflow-y-auto">
            <div className="container mx-auto px-6">
              <nav className="flex flex-col items-center gap-8 py-8">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition"
                >
                  Início
                </Link>

                <Link
                  to="/nossa-historia"
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition"
                >
                  Nossa História
                </Link>

                <a
                  href="#projects"
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition"
                >
                  Nossos Projetos
                </a>

                <a
                  href="#transparency"
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition"
                >
                  Transparência
                </a>

                <Link
                  to="/seja-parceiro"
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition"
                >
                  Seja Parceiro
                </Link>

                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition"
                >
                  Contato
                </a>

                <div className="mt-8 w-full max-w-xs">
                  <a
                    href="#donate"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full inline-flex items-center justify-center text-base py-4"
                  >
                    <Button variant="primary" icon="fa-regular fa-heart">
                      QUERO AJUDAR
                    </Button>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        )
      }
    </>
  );
}