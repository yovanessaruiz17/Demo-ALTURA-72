import React, { useState } from 'react';
import {
  Building,
  Maximize2,
  Bed,
  Bath,
  Car,
  BookmarkCheck,
  Eye,
  ArrowUpRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { BUILDING_APARTMENTS } from '../data/apartmentsData';
import { ApartmentUnit, ApartmentStatus } from '../types';

interface BuildingSelectorProps {
  apartments?: ApartmentUnit[];
  onSelectApartment: (apt: ApartmentUnit) => void;
  onOpenSeparation: (apt: ApartmentUnit) => void;
  onOpenAdvisorInquiry: (apt: ApartmentUnit) => void;
}

export const BuildingSelector: React.FC<BuildingSelectorProps> = ({
  apartments,
  onSelectApartment,
  onOpenSeparation,
  onOpenAdvisorInquiry,
}) => {
  const sourceApartments = apartments && apartments.length > 0 ? apartments : BUILDING_APARTMENTS;

  // Default selected unit
  const [selectedUnitId, setSelectedUnitId] = useState<string>('apt-701');
  const [activeMobileFloor, setActiveMobileFloor] = useState<number>(7);

  const selectedUnit =
    sourceApartments.find((a) => a.id === selectedUnitId) || sourceApartments[0];

  // Group apartments by floor descending (Piso 10 down to Piso 3)
  const floors = [10, 9, 8, 7, 6, 5, 4, 3];

  const getApartmentsByFloor = (floorNum: number) => {
    return sourceApartments.filter((a) => a.floor === floorNum);
  };

  const getStatusColor = (status: ApartmentStatus, isSelected: boolean) => {
    const ring = isSelected ? 'ring-2 ring-[#C5A880] ring-offset-2 ring-offset-[#0B1320] scale-[1.03] z-10' : '';
    switch (status) {
      case 'Disponible':
        return `bg-emerald-950/50 hover:bg-emerald-900/60 border-emerald-500/50 text-emerald-300 ${ring}`;
      case 'Separado':
        return `bg-amber-950/50 hover:bg-amber-900/60 border-amber-500/50 text-amber-300 ${ring}`;
      case 'Vendido':
        return `bg-slate-900/70 border-slate-700/60 text-slate-500 ${ring}`;
    }
  };

  return (
    <section id="selector-edificio" className="py-24 sm:py-32 bg-[#0F172A] text-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium mb-3">
            <span>Visualizador Arquitectónico</span>
            <span aria-hidden="true" className="text-[#FAF9F6]/40">·</span>
            <span>Selector por Pisos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF9F6] leading-tight">
            Explora la torre <br />
            <span className="font-normal italic">piso por piso.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#FAF9F6]/75 font-light leading-relaxed">
            Haz clic sobre cualquier apartamento en la fachada interactiva para consultar su altura, orientación, superficie y disponibilidad inmediata.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 p-4 bg-[#0B1320] border border-[#2A323D] rounded-md mb-10 text-xs">
          <span className="text-[#FAF9F6]/50 uppercase tracking-wider text-[11px]">Convenciones:</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-emerald-950 border border-emerald-500/50" />
            <span className="text-[#FAF9F6]/80">Disponible (Activo para separación)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-amber-950 border border-amber-500/50" />
            <span className="text-[#FAF9F6]/80">Separado (En proceso)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-slate-900 border border-slate-700" />
            <span className="text-[#FAF9F6]/60">Vendido</span>
          </div>
        </div>

        {/* Main Interactive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center: Architectural Tower Representation */}
          <div className="lg:col-span-7 bg-[#0B1320] border border-[#2A323D] rounded-lg p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            {/* Architectural Grid Background */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(#C5A880 1px, transparent 1px), linear-gradient(to right, #C5A880 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Building Crown / Rooftop Amenity */}
            <div className="relative z-10 mb-4 p-3 bg-gradient-to-r from-[#C5A880]/15 via-[#C5A880]/25 to-[#C5A880]/15 border border-[#C5A880]/40 rounded text-center">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-medium flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Rooftop & Sky Lounge · Piscina Infinity
              </span>
            </div>

            {/* Floors Stack */}
            <div className="relative z-10 space-y-2.5">
              {floors.map((floorNum) => {
                const floorUnits = getApartmentsByFloor(floorNum);
                return (
                  <div key={floorNum} className="flex items-center gap-3">
                    {/* Floor Label */}
                    <div className="w-16 sm:w-20 text-right shrink-0">
                      <span className="text-xs font-serif font-semibold text-[#FAF9F6]/80 block">
                        Piso {floorNum}
                      </span>
                      <span className="text-[10px] text-[#FAF9F6]/40 uppercase tracking-widest block">
                        {floorNum === 10 ? 'PH' : `${floorUnits.length} aptos`}
                      </span>
                    </div>

                    {/* Floor Units Row */}
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      {floorUnits.map((unit) => {
                        const isSelected = unit.id === selectedUnitId;
                        return (
                          <button
                            key={unit.id}
                            onClick={() => setSelectedUnitId(unit.id)}
                            className={`p-2.5 sm:p-3 border rounded text-left transition-all duration-200 cursor-pointer ${getStatusColor(
                              unit.status,
                              isSelected
                            )}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-serif font-bold text-xs sm:text-sm tracking-tight">
                                {unit.unitNumber}
                              </span>
                              <span className="text-[10px] uppercase tracking-wider font-light opacity-80">
                                {unit.area}m²
                              </span>
                            </div>
                            <div className="text-[10px] opacity-75 mt-0.5 truncate">
                              {unit.bedrooms} {unit.bedrooms === 1 ? 'hab' : 'habs'} · {unit.type}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Building Base / Grand Lobby */}
            <div className="relative z-10 mt-4 p-3 bg-[#0F172A] border border-[#2A323D] rounded text-center">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#FAF9F6]/60 font-medium">
                Nivel 1 & 2 · Lobby Monumental a Doble Altura & Parqueaderos
              </span>
            </div>
          </div>

          {/* Right: Selected Apartment Active Spec Inspector */}
          <div className="lg:col-span-5 sticky top-28 bg-[#0B1320] border border-[#2A323D] rounded-lg overflow-hidden shadow-2xl p-6 sm:p-7 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium">
                  Unidad Seleccionada en Torre
                </span>
                <span className="text-xs text-[#FAF9F6]/40">·</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded border ${
                    selectedUnit.status === 'Disponible'
                      ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40'
                      : selectedUnit.status === 'Separado'
                      ? 'border-amber-500/40 text-amber-300 bg-amber-950/40'
                      : 'border-slate-700 text-slate-400 bg-slate-900/60'
                  }`}
                >
                  {selectedUnit.status}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#FAF9F6]">
                Apartamento {selectedUnit.unitNumber}
              </h3>
              <p className="text-xs text-[#FAF9F6]/60 mt-1">
                Piso {selectedUnit.floor} · {selectedUnit.type} · {selectedUnit.orientation}
              </p>
            </div>

            {/* Visual Thumbnail */}
            <div className="relative aspect-[16/9] rounded overflow-hidden bg-[#0F172A] border border-[#2A323D]">
              <img
                src={selectedUnit.image}
                alt={`Apartamento ${selectedUnit.unitNumber}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
                <span className="text-xs text-[#FAF9F6]/70">Inversión</span>
                <span className="text-xl font-serif font-bold text-[#FAF9F6] tabular-nums">
                  {selectedUnit.formattedPrice}
                </span>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-4 gap-2 p-3 bg-[#0F172A] border border-[#2A323D] rounded text-center text-xs">
              <div>
                <Maximize2 className="w-3.5 h-3.5 mx-auto text-[#C5A880] mb-1" />
                <span className="text-[10px] text-[#FAF9F6]/50 block">Área</span>
                <span className="font-semibold text-[#FAF9F6]">{selectedUnit.area} m²</span>
              </div>
              <div className="border-l border-[#2A323D]">
                <Bed className="w-3.5 h-3.5 mx-auto text-[#C5A880] mb-1" />
                <span className="text-[10px] text-[#FAF9F6]/50 block">Habs</span>
                <span className="font-semibold text-[#FAF9F6]">{selectedUnit.bedrooms}</span>
              </div>
              <div className="border-l border-[#2A323D]">
                <Bath className="w-3.5 h-3.5 mx-auto text-[#C5A880] mb-1" />
                <span className="text-[10px] text-[#FAF9F6]/50 block">Baños</span>
                <span className="font-semibold text-[#FAF9F6]">{selectedUnit.bathrooms}</span>
              </div>
              <div className="border-l border-[#2A323D]">
                <Car className="w-3.5 h-3.5 mx-auto text-[#C5A880] mb-1" />
                <span className="text-[10px] text-[#FAF9F6]/50 block">Pq.</span>
                <span className="font-semibold text-[#FAF9F6]">{selectedUnit.parkingSpots}</span>
              </div>
            </div>

            <p className="text-xs text-[#FAF9F6]/70 leading-relaxed font-light">
              {selectedUnit.description}
            </p>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              {selectedUnit.status === 'Disponible' ? (
                <button
                  onClick={() => onOpenSeparation(selectedUnit)}
                  className="w-full py-3 px-4 bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors text-center cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>Solicitar separación de esta unidad</span>
                </button>
              ) : selectedUnit.status === 'Separado' ? (
                <button
                  onClick={() => onOpenAdvisorInquiry(selectedUnit)}
                  className="w-full py-3 px-4 bg-amber-950/40 hover:bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-medium uppercase tracking-wider rounded-sm transition-colors text-center cursor-pointer"
                >
                  Unidad en proceso · Inscribir lista de espera
                </button>
              ) : (
                <div className="w-full py-2.5 px-4 bg-slate-900/60 border border-slate-800 text-slate-500 text-xs text-center rounded-sm">
                  Unidad vendida · Consulta otras unidades del piso
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectApartment(selectedUnit)}
                  className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-[#FAF9F6] bg-[#0F172A] hover:bg-[#1E293B] border border-[#2A323D] rounded-sm transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Ver ficha</span>
                </button>

                <button
                  onClick={() => onOpenAdvisorInquiry(selectedUnit)}
                  className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-[#FAF9F6] bg-[#0F172A] hover:bg-[#1E293B] border border-[#2A323D] rounded-sm transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Hablar con asesor</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
