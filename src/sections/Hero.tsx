import React from 'react';
import { ArrowDown, MessageSquare, ArrowUpRight } from 'lucide-react';
import { PROJECT_IMAGES } from '../data/projectData';

interface HeroProps {
  onOpenAdvisor: () => void;
  onExploreApartments: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAdvisor, onExploreApartments }) => {
  return (
    <section className="relative min-h-[95vh] lg:min-h-screen flex items-end justify-start pt-32 sm:pt-36 pb-16 sm:pb-20 overflow-hidden bg-[#0B1320]">
      {/* Background Architectural Image with Luxury Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={PROJECT_IMAGES.hero}
          alt="Edificio ALTURA 72 en Cartagena de Indias"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000 ease-out"
        />
        {/* Measured scrims for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/60 to-[#0B1320]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1320]/90 via-[#0B1320]/50 to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Subtle Location, Brand & Demo Kicker */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40 font-semibold tracking-wider uppercase text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              SITIO DE EJEMPLO / DEMO
            </span>
            <span className="text-[#FAF9F6]/40 hidden sm:inline">·</span>
            <span className="uppercase tracking-[0.2em] text-[#FAF9F6]/80 font-medium">
              Cartagena de Indias · Edificio Residencial
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.08] tracking-tight text-[#FAF9F6]">
            Tu próximo hogar <br />
            <span className="font-normal italic">comienza aquí.</span>
          </h1>

          {/* Secondary Text */}
          <p className="text-base sm:text-lg md:text-xl text-[#FAF9F6]/85 font-light leading-relaxed max-w-2xl">
            ALTURA 72 combina arquitectura contemporánea, espacios pensados para vivir y una ubicación estratégica en Cartagena.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onExploreApartments}
              className="px-8 py-3.5 bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] text-xs font-semibold uppercase tracking-widest rounded-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <span>Explorar apartamentos</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAdvisor}
              className="px-8 py-3.5 border border-[#FAF9F6]/30 hover:border-[#C5A880] text-[#FAF9F6] hover:text-[#C5A880] bg-[#0B1320]/40 backdrop-blur-sm text-xs font-medium uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hablar con un asesor</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Clean Unboxed Financial & Configuration Information */}
          <div className="pt-6 sm:pt-8 border-t border-[#FAF9F6]/15 flex flex-wrap items-baseline gap-y-3 gap-x-8 text-xs sm:text-sm">
            <div>
              <span className="text-[#FAF9F6]/50 uppercase tracking-widest text-[11px] block">
                Inversión estimada
              </span>
              <span className="text-[#FAF9F6] font-serif text-lg sm:text-xl tracking-tight font-semibold tabular-nums">
                Desde $420.000.000 COP
              </span>
            </div>

            <div className="hidden sm:block w-[1px] h-8 bg-[#FAF9F6]/20 self-center" />

            <div>
              <span className="text-[#FAF9F6]/50 uppercase tracking-widest text-[11px] block">
                Configuración
              </span>
              <span className="text-[#FAF9F6] font-medium tracking-wide">
                Apartamentos de 1, 2 y 3 habitaciones
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
