import React from 'react';
import { ArrowUpRight, ArrowDown, MessageSquare } from 'lucide-react';
import { PROJECT_IMAGES } from '../data/projectData';

interface CommercialCTAProps {
  onOpenAdvisor: () => void;
  onExploreApartments: () => void;
}

export const CommercialCTA: React.FC<CommercialCTAProps> = ({
  onOpenAdvisor,
  onExploreApartments,
}) => {
  return (
    <section className="relative py-28 sm:py-36 bg-[#0B1320] text-[#FAF9F6] overflow-hidden">
      {/* Background with texture & subtle architectural preview */}
      <div className="absolute inset-0 z-0">
        <img
          src={PROJECT_IMAGES.terrace}
          alt="Terraza social ALTURA 72"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-25 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/85 to-[#0B1320]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* Editorial Subtitle */}
        <div className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium mb-4">
          <span>Oportunidad de Inversión Residencial</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#FAF9F6] leading-tight max-w-3xl mx-auto">
          Encuentra el apartamento que <br />
          <span className="font-normal italic">está hecho para ti.</span>
        </h2>

        {/* Description */}
        <p className="mt-6 text-base sm:text-lg text-[#FAF9F6]/80 font-light leading-relaxed max-w-2xl mx-auto">
          Conoce disponibilidad, precios y opciones de financiación con uno de nuestros asesores.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreApartments}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF9F6] hover:bg-white text-[#0B1320] text-xs font-semibold uppercase tracking-widest rounded-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg whitespace-nowrap"
          >
            <span>Ver apartamentos</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenAdvisor}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] text-xs font-semibold uppercase tracking-widest rounded-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Hablar con un asesor</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quiet footnote */}
        <p className="mt-8 text-xs text-[#FAF9F6]/50">
          Atención comercial personalizada sin compromiso · Asesoría jurídica y fiduciaria
        </p>
      </div>
    </section>
  );
};
