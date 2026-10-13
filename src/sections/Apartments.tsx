import React, { useState } from 'react';
import { Maximize2, Bed, Bath, ArrowUpRight, Check } from 'lucide-react';
import { APARTMENTS_DATA } from '../data/projectData';
import { Apartment } from '../types';

interface ApartmentsProps {
  onSelectApartment: (apartment: Apartment) => void;
  onOpenAdvisorForApartment: (apartmentName: string) => void;
}

export const Apartments: React.FC<ApartmentsProps> = ({
  onSelectApartment,
  onOpenAdvisorForApartment,
}) => {
  const [filterBedrooms, setFilterBedrooms] = useState<number | 'all'>('all');

  const filteredApartments =
    filterBedrooms === 'all'
      ? APARTMENTS_DATA
      : APARTMENTS_DATA.filter((apt) => apt.bedrooms === filterBedrooms);

  return (
    <section id="apartamentos" className="py-24 sm:py-32 bg-[#0F172A] text-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium mb-3">
              <span>Tipologías Residenciales</span>
              <span aria-hidden="true" className="text-[#FAF9F6]/40">·</span>
              <span>Disponibilidad Ficticia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF9F6]">
              Apartamentos diseñados <br />
              <span className="italic font-normal">para trascender.</span>
            </h2>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0B1320] border border-[#2A323D] rounded-md self-start md:self-end">
            <button
              onClick={() => setFilterBedrooms('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                filterBedrooms === 'all'
                  ? 'bg-[#C5A880] text-[#0B1320] shadow-sm font-semibold'
                  : 'text-[#FAF9F6]/70 hover:text-[#FAF9F6]'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilterBedrooms(1)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                filterBedrooms === 1
                  ? 'bg-[#C5A880] text-[#0B1320] shadow-sm font-semibold'
                  : 'text-[#FAF9F6]/70 hover:text-[#FAF9F6]'
              }`}
            >
              1 Hab
            </button>
            <button
              onClick={() => setFilterBedrooms(2)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                filterBedrooms === 2
                  ? 'bg-[#C5A880] text-[#0B1320] shadow-sm font-semibold'
                  : 'text-[#FAF9F6]/70 hover:text-[#FAF9F6]'
              }`}
            >
              2 Habs
            </button>
            <button
              onClick={() => setFilterBedrooms(3)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                filterBedrooms === 3
                  ? 'bg-[#C5A880] text-[#0B1320] shadow-sm font-semibold'
                  : 'text-[#FAF9F6]/70 hover:text-[#FAF9F6]'
              }`}
            >
              3 Habs
            </button>
          </div>
        </div>

        {/* Apartments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApartments.map((apt) => (
            <article
              key={apt.id}
              className="bg-[#0B1320] border border-[#2A323D] rounded-md overflow-hidden flex flex-col group hover:border-[#C5A880]/50 transition-all duration-300"
            >
              {/* Image Container with single-level elevation */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#0F172A]">
                <img
                  src={apt.image}
                  alt={apt.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-transparent to-transparent opacity-80" />

                {/* Clean unboxed metadata overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="text-[11px] tracking-wider uppercase font-medium px-2.5 py-1 bg-[#0B1320]/80 backdrop-blur-sm border border-[#2A323D] rounded-sm text-[#C5A880]">
                    {apt.status}
                  </div>
                  <div className="text-[11px] tracking-wider text-[#FAF9F6]/80 px-2 py-0.5 bg-[#0B1320]/60 backdrop-blur-sm rounded-sm">
                    {apt.floorRange}
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between">
                  <div className="text-xs text-[#FAF9F6]/70">Desde</div>
                  <div className="text-xl font-serif font-bold text-[#FAF9F6] tabular-nums tracking-tight">
                    {apt.formattedPrice}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-xl font-serif font-semibold text-[#FAF9F6] group-hover:text-[#DFC8A8] transition-colors">
                    {apt.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#FAF9F6]/70 line-clamp-2 leading-relaxed">
                    {apt.tagline}
                  </p>
                </div>

                {/* Specs Row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#2A323D]/70 text-xs">
                  <div className="flex items-center gap-1.5 text-[#FAF9F6]/80">
                    <Maximize2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span className="tabular-nums font-medium">{apt.area} m²</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#FAF9F6]/80 border-x border-[#2A323D]/70 px-2">
                    <Bed className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span className="tabular-nums font-medium">{apt.bedrooms} hab</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#FAF9F6]/80 justify-end">
                    <Bath className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span className="tabular-nums font-medium">{apt.bathrooms} baños</span>
                  </div>
                </div>

                {/* Quick 2 highlights */}
                <ul className="space-y-1.5 text-xs text-[#FAF9F6]/60">
                  {apt.features.slice(0, 2).map((feat: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectApartment(apt)}
                    className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-[#FAF9F6] bg-[#0F172A] hover:bg-[#2A323D] border border-[#2A323D] rounded-sm transition-colors text-center cursor-pointer"
                  >
                    Ver detalles
                  </button>
                  <button
                    onClick={() => onOpenAdvisorForApartment(apt.name || apt.unitNumber || 'Apartamento')}
                    className="py-2.5 px-3 text-xs uppercase tracking-wider font-semibold text-[#0B1320] bg-[#C5A880] hover:bg-[#DFC8A8] rounded-sm transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>Cotizar</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
