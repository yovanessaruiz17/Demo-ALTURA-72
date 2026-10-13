import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Lock } from 'lucide-react';

interface HeaderProps {
  onOpenAdvisor: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdvisor, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Proyecto', href: '#proyecto' },
    { label: 'Apartamentos', href: '#apartamentos' },
    { label: 'Selector Torre', href: '#selector-edificio' },
    { label: 'Amenidades', href: '#amenidades' },
    { label: 'Asesores', href: '#asesores' },
    { label: 'Ubicación', href: '#ubicacion' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1320]/95 backdrop-blur-md border-b border-[#2A323D]/60 pb-3 shadow-xl shadow-black/20'
          : 'bg-gradient-to-b from-[#0B1320] via-[#0B1320]/90 to-transparent pb-4'
      }`}
    >
      {/* Top Global Demo Notice Ribbon */}
      <div className="bg-[#101A29]/95 border-b border-[#C5A880]/35 px-4 py-1.5 text-[#FAF9F6] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40 uppercase text-[9px] tracking-wider shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
              SITIO DEMO
            </span>
            <span className="text-[#FAF9F6]/90 font-medium truncate">
              Este sitio web es un proyecto conceptual para fines de demostración y ejemplo.
            </span>
          </div>
          <span className="hidden md:inline text-[#FAF9F6]/55 text-[10px] shrink-0 font-light">
            Inmuebles, precios, disponibilidad y asesores ficticios
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-3 flex items-center justify-between">
        {/* Zone 1: Wordmark with DEMO pill */}
        <div className="flex items-center gap-2.5">
          <a
            href="#"
            className="text-xl sm:text-2xl font-serif font-semibold tracking-[0.25em] text-[#FAF9F6] hover:text-[#C5A880] transition-colors uppercase select-none"
          >
            ALTURA 72
          </a>
          <span className="text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30 select-none">
            DEMO
          </span>
        </div>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider text-[#FAF9F6]/80">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="relative py-1 hover:text-[#FAF9F6] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary action & Admin link */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="px-3 py-2 text-xs uppercase tracking-wider text-[#FAF9F6]/60 hover:text-[#C5A880] transition-colors flex items-center gap-1.5 cursor-pointer rounded border border-[#2A323D]/60 hover:border-[#C5A880]/50"
              title="Panel Administrativo (/admin)"
            >
              <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Admin</span>
            </button>
          )}

          <button
            onClick={onOpenAdvisor}
            className="group px-5 py-2.5 text-xs uppercase tracking-widest font-medium text-[#0B1320] bg-[#C5A880] hover:bg-[#DFC8A8] rounded-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>Hablar con un asesor</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#FAF9F6] hover:text-[#C5A880] transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B1320] border-b border-[#2A323D] px-6 py-6 transition-all animate-fadeIn">
          <nav className="flex flex-col gap-5 text-base tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-[#FAF9F6]/90 hover:text-[#C5A880] py-1 border-b border-[#2A323D]/40 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdvisor();
                }}
                className="w-full py-3 text-xs uppercase tracking-widest font-semibold text-[#0B1320] bg-[#C5A880] hover:bg-[#DFC8A8] rounded-sm transition-colors text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Hablar con un asesor</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2.5 text-xs uppercase tracking-wider text-[#FAF9F6]/60 hover:text-[#C5A880] border border-[#2A323D] rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Portal Administrativo</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
