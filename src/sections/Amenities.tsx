import React from 'react';
import {
  Waves,
  SunMedium,
  Dumbbell,
  Building2,
  Flame,
  Briefcase,
  Car,
  ArrowUpRight,
} from 'lucide-react';
import { AMENITIES_DATA } from '../data/projectData';

export const Amenities: React.FC<{ onOpenAdvisor: () => void }> = ({ onOpenAdvisor }) => {
  // Mapping functional iconography to each amenity without clutter
  const getAmenityIcon = (id: string) => {
    switch (id) {
      case 'piscina':
        return <Waves className="w-5 h-5 text-[#C5A880]" />;
      case 'terraza-social':
        return <SunMedium className="w-5 h-5 text-[#C5A880]" />;
      case 'gimnasio':
        return <Dumbbell className="w-5 h-5 text-[#C5A880]" />;
      case 'lobby':
        return <Building2 className="w-5 h-5 text-[#C5A880]" />;
      case 'zona-bbq':
        return <Flame className="w-5 h-5 text-[#C5A880]" />;
      case 'coworking':
        return <Briefcase className="w-5 h-5 text-[#C5A880]" />;
      case 'parqueaderos':
        return <Car className="w-5 h-5 text-[#C5A880]" />;
      default:
        return <Building2 className="w-5 h-5 text-[#C5A880]" />;
    }
  };

  const featuredAmenities = AMENITIES_DATA.filter((a) => a.image);
  const secondaryAmenities = AMENITIES_DATA.filter((a) => !a.image);

  return (
    <section id="amenidades" className="py-24 sm:py-32 bg-[#0B1320] text-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium mb-3">
            <span>Vida y Confort</span>
            <span aria-hidden="true" className="text-[#FAF9F6]/40">·</span>
            <span>Espacios Comunes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF9F6] leading-tight">
            Amenidades concebidas <br />
            <span className="font-normal italic">como santuarios cotidianos.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#FAF9F6]/75 font-light leading-relaxed">
            Cada área social en ALTURA 72 ha sido diseñada para elevar la calidad de vida, facilitando momentos de relajación, trabajo y encuentro sin salir de la torre.
          </p>
        </div>

        {/* Featured Visual Amenities (Piscina, Terraza social, Lobby) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredAmenities.map((amenity) => (
            <div
              key={amenity.id}
              className="group relative rounded-md overflow-hidden bg-[#0F172A] border border-[#2A323D] flex flex-col justify-end aspect-[4/5] hover:border-[#C5A880]/50 transition-colors"
            >
              <img
                src={amenity.image}
                alt={amenity.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/60 to-transparent" />

              <div className="relative z-10 p-6 space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#0B1320]/80 border border-[#2A323D] flex items-center justify-center mb-3">
                  {getAmenityIcon(amenity.id)}
                </div>
                <span className="text-[11px] uppercase tracking-widest text-[#C5A880] block">
                  {amenity.category}
                </span>
                <h3 className="text-2xl font-serif font-semibold text-[#FAF9F6]">
                  {amenity.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF9F6]/80 leading-relaxed font-light">
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Architectural Amenities Grid (Gimnasio, Zona BBQ, Coworking, Parqueaderos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {secondaryAmenities.map((amenity) => (
            <div
              key={amenity.id}
              className="p-6 bg-[#0F172A]/70 border border-[#2A323D] rounded-md flex flex-col justify-between hover:border-[#C5A880]/40 transition-colors"
            >
              <div>
                <div className="w-9 h-9 rounded-full bg-[#0B1320] border border-[#2A323D] flex items-center justify-center mb-4">
                  {getAmenityIcon(amenity.id)}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block mb-1">
                  {amenity.category}
                </span>
                <h3 className="text-xl font-serif font-medium text-[#FAF9F6] mb-2">
                  {amenity.name}
                </h3>
                <p className="text-xs text-[#FAF9F6]/70 leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet advisory prompt */}
        <div className="mt-12 p-6 rounded-md bg-[#0F172A]/40 border border-[#2A323D] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#FAF9F6]/70 text-center sm:text-left">
            Todas las áreas comunes se entregan totalmente dotadas, climatizadas y decoradas bajo el concepto editorial de ALTURA 72.
          </p>
          <button
            onClick={onOpenAdvisor}
            className="px-5 py-2 text-xs uppercase tracking-widest text-[#C5A880] hover:text-[#FAF9F6] border border-[#C5A880]/30 hover:border-[#C5A880] rounded-sm transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <span>Consultar especificaciones</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
