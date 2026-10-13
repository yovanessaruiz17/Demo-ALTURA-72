import React from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdvisor: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdvisor, onOpenAdmin }) => {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070D17] text-[#FAF9F6] border-t border-[#2A323D]/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2A323D]/40">
          {/* Brand & Identity Column */}
          <div className="md:col-span-6 space-y-4">
            <a
              href="#"
              className="text-2xl font-serif font-semibold tracking-[0.25em] text-[#FAF9F6] uppercase inline-block"
            >
              ALTURA 72
            </a>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40 text-[10px] uppercase tracking-wider font-semibold">
                SITIO DE EJEMPLO / DEMO
              </span>
              <span className="text-xs uppercase tracking-widest text-[#C5A880]/80">
                Proyecto conceptual
              </span>
            </div>
            <p className="text-sm text-[#FAF9F6]/70 font-light max-w-md leading-relaxed">
              Cartagena de Indias, Colombia.
            </p>
            <p className="text-xs text-[#FAF9F6]/50 max-w-md leading-relaxed">
              Una propuesta arquitectónica contemporánea pensada para redefinir el estándar residencial de lujo discreto frente al Caribe colombiano.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#FAF9F6]/40 font-medium">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF9F6]/80 font-light">
              <li>
                <button
                  onClick={() => handleNavClick('#proyecto')}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  Proyecto
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#apartamentos')}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  Apartamentos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#selector-edificio')}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  Selector Torre
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#amenidades')}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  Amenidades
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#asesores')}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  Asesores
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#ubicacion')}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  Ubicación
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdvisor}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer flex items-center gap-1 text-[#C5A880]"
                >
                  <span>Contacto</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact and Sales Advisory Info */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#FAF9F6]/40 font-medium">
              Atención Comercial
            </h4>
            <p className="text-xs text-[#FAF9F6]/70 leading-relaxed">
              Lunes a Sábado: 9:00 AM – 6:00 PM <br />
              Domingos con cita previa.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdvisor}
                className="w-full py-2.5 px-4 bg-[#0B1320] border border-[#2A323D] hover:border-[#C5A880] text-xs font-medium uppercase tracking-widest text-[#FAF9F6] rounded-sm transition-colors text-center cursor-pointer"
              >
                Solicitar Asesoría
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Attribution Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF9F6]/50">
          <p className="text-center sm:text-left leading-relaxed max-w-2xl">
            ALTURA 72 es un proyecto inmobiliario conceptual desarrollado por <strong className="text-[#FAF9F6]/80 font-medium">YorDev</strong>. Los inmuebles, precios, disponibilidad, asesores y datos utilizados son ficticios.
          </p>
          <div className="flex items-center gap-4 text-[11px] tracking-wider uppercase text-[#FAF9F6]/40">
            <span>ALTURA 72 © {new Date().getFullYear()}</span>
            <span>·</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-[#C5A880] transition-colors flex items-center gap-1 cursor-pointer text-[#FAF9F6]/60"
                title="Acceso al Portal Administrativo"
              >
                <Lock className="w-3 h-3 text-[#C5A880]" />
                <span>Panel Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
