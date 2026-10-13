import React, { useState, useMemo } from 'react';
import {
  Maximize2,
  Bed,
  Bath,
  Car,
  Filter,
  RotateCcw,
  ArrowUpRight,
  Eye,
  BookmarkCheck,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import { BUILDING_APARTMENTS } from '../data/apartmentsData';
import { ApartmentUnit, ApartmentStatus } from '../types';

interface BuildingCatalogProps {
  apartments?: ApartmentUnit[];
  onSelectApartment: (apt: ApartmentUnit) => void;
  onOpenSeparation: (apt: ApartmentUnit) => void;
  onOpenAdvisorInquiry: (apt: ApartmentUnit) => void;
}

export const BuildingCatalog: React.FC<BuildingCatalogProps> = ({
  apartments,
  onSelectApartment,
  onOpenSeparation,
  onOpenAdvisorInquiry,
}) => {
  // Filter States
  const [filterBedrooms, setFilterBedrooms] = useState<string>('all');
  const [filterArea, setFilterArea] = useState<string>('all');
  const [filterPrice, setFilterPrice] = useState<string>('all');
  const [filterFloor, setFilterFloor] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleResetFilters = () => {
    setFilterBedrooms('all');
    setFilterArea('all');
    setFilterPrice('all');
    setFilterFloor('all');
    setFilterStatus('all');
  };

  const isFiltered =
    filterBedrooms !== 'all' ||
    filterArea !== 'all' ||
    filterPrice !== 'all' ||
    filterFloor !== 'all' ||
    filterStatus !== 'all';

  const sourceApartments = apartments && apartments.length > 0 ? apartments : BUILDING_APARTMENTS;

  // Memoized Filter Logic
  const filteredApartments = useMemo(() => {
    return sourceApartments.filter((apt) => {
      // Habitaciones
      if (filterBedrooms !== 'all' && apt.bedrooms !== Number(filterBedrooms)) {
        return false;
      }

      // Área
      if (filterArea === 'under-70' && apt.area >= 70) return false;
      if (filterArea === '70-100' && (apt.area < 70 || apt.area > 100)) return false;
      if (filterArea === 'over-100' && apt.area <= 100) return false;

      // Precio (en millones COP)
      if (filterPrice === 'up-to-450' && apt.priceCop > 450000000) return false;
      if (filterPrice === 'up-to-550' && apt.priceCop > 550000000) return false;
      if (filterPrice === 'up-to-700' && apt.priceCop > 700000000) return false;
      if (filterPrice === 'over-700' && apt.priceCop <= 700000000) return false;

      // Piso
      const floor = apt.floor ?? 0;
      if (filterFloor === '3-4' && (floor < 3 || floor > 4)) return false;
      if (filterFloor === '5-6' && (floor < 5 || floor > 6)) return false;
      if (filterFloor === '7-8' && (floor < 7 || floor > 8)) return false;
      if (filterFloor === '9-10' && (floor < 9 || floor > 10)) return false;

      // Estado
      if (filterStatus !== 'all' && apt.status !== filterStatus) return false;

      return true;
    });
  }, [filterBedrooms, filterArea, filterPrice, filterFloor, filterStatus]);

  const getStatusBadge = (status: ApartmentStatus) => {
    switch (status) {
      case 'Disponible':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Disponible
          </span>
        );
      case 'Separado':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Separado
          </span>
        );
      case 'Vendido':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-700 text-slate-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            Vendido
          </span>
        );
    }
  };

  return (
    <section id="apartamentos" className="py-24 sm:py-32 bg-[#0B1320] text-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium mb-3">
            <span className="px-2 py-0.5 rounded bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30 text-[10px] tracking-wider font-semibold">
              SIMULACIÓN DEMO
            </span>
            <span aria-hidden="true" className="text-[#FAF9F6]/40">·</span>
            <span>Disponibilidad Ilustrativa</span>
            <span aria-hidden="true" className="text-[#FAF9F6]/40">·</span>
            <span>Torre ALTURA 72</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF9F6] leading-tight">
            Encuentra tu apartamento <br />
            <span className="font-normal italic">según tus necesidades.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#FAF9F6]/75 font-light leading-relaxed">
            Explora las unidades disponibles en cada nivel de la torre. Filtra por número de alcobas, piso, superficie o presupuesto y solicita asesoría o separación inmediata.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-[#0F172A] border border-[#2A323D] rounded-lg p-5 sm:p-6 mb-10 shadow-xl">
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#2A323D]/60">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C5A880] font-medium">
              <Filter className="w-4 h-4" />
              <span>Filtros de Búsqueda</span>
            </div>

            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-xs text-[#FAF9F6]/70 hover:text-[#C5A880] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpiar filtros</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Habitaciones */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/60 mb-1.5">
                Habitaciones
              </label>
              <select
                value={filterBedrooms}
                onChange={(e) => setFilterBedrooms(e.target.value)}
                className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none transition-colors"
              >
                <option value="all">Todas las habitaciones</option>
                <option value="1">1 Habitación</option>
                <option value="2">2 Habitaciones</option>
                <option value="3">3 Habitaciones</option>
              </select>
            </div>

            {/* Área */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/60 mb-1.5">
                Área construida
              </label>
              <select
                value={filterArea}
                onChange={(e) => setFilterArea(e.target.value)}
                className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none transition-colors"
              >
                <option value="all">Cualquier área</option>
                <option value="under-70">Menos de 70 m²</option>
                <option value="70-100">70 m² a 100 m²</option>
                <option value="over-100">Más de 100 m²</option>
              </select>
            </div>

            {/* Precio */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/60 mb-1.5">
                Rango de Precio (COP)
              </label>
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none transition-colors"
              >
                <option value="all">Cualquier precio</option>
                <option value="up-to-450">Hasta $450M COP</option>
                <option value="up-to-550">Hasta $550M COP</option>
                <option value="up-to-700">Hasta $700M COP</option>
                <option value="over-700">Más de $700M COP</option>
              </select>
            </div>

            {/* Piso */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/60 mb-1.5">
                Nivel / Piso
              </label>
              <select
                value={filterFloor}
                onChange={(e) => setFilterFloor(e.target.value)}
                className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none transition-colors"
              >
                <option value="all">Todos los pisos (3 al 10)</option>
                <option value="3-4">Pisos 3 y 4</option>
                <option value="5-6">Pisos 5 y 6</option>
                <option value="7-8">Pisos 7 y 8</option>
                <option value="9-10">Pisos 9 y 10 (Altos / PH)</option>
              </select>
            </div>

            {/* Estado */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/60 mb-1.5">
                Estado Comercial
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none transition-colors"
              >
                <option value="all">Todos los estados</option>
                <option value="Disponible">🟢 Disponible</option>
                <option value="Separado">🟡 Separado</option>
                <option value="Vendido">🔴 Vendido</option>
              </select>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#2A323D]/50 flex items-center justify-between text-xs text-[#FAF9F6]/60">
            <span>
              Mostrando <strong className="text-[#FAF9F6]">{filteredApartments.length}</strong> de{' '}
              {BUILDING_APARTMENTS.length} apartamentos
            </span>
            <span className="text-[#C5A880] text-[11px] hidden sm:inline">
              Precios y disponibilidad actualizados para demostración
            </span>
          </div>
        </div>

        {/* Empty State */}
        {filteredApartments.length === 0 && (
          <div className="p-12 text-center bg-[#0F172A] border border-[#2A323D] rounded-lg space-y-4 max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 mx-auto text-[#C5A880]" />
            <h3 className="text-xl font-serif text-[#FAF9F6]">No hay apartamentos con estos filtros</h3>
            <p className="text-xs text-[#FAF9F6]/70">
              Prueba modificando el rango de precio, habitaciones o piso para ver otras opciones en el edificio.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#C5A880] text-[#0B1320] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#DFC8A8] transition-colors cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        )}

        {/* Apartments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApartments.map((apt) => (
            <article
              key={apt.id}
              className="bg-[#0F172A] border border-[#2A323D] rounded-md overflow-hidden flex flex-col group hover:border-[#C5A880]/50 transition-all duration-300"
            >
              {/* Image Preview & Status */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0B1320]">
                <img
                  src={apt.image}
                  alt={`Apartamento ${apt.unitNumber}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />

                {/* Status and Unit Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="px-2.5 py-1 bg-[#0B1320]/85 backdrop-blur-sm border border-[#2A323D] rounded text-xs font-serif font-semibold text-[#FAF9F6]">
                    Apto {apt.unitNumber} · Piso {apt.floor}
                  </div>
                  <div>{getStatusBadge(apt.status)}</div>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium">
                    {apt.type}
                  </span>
                  <span className="text-lg font-serif font-bold text-[#FAF9F6] tabular-nums">
                    {apt.formattedPrice}
                  </span>
                </div>
              </div>

              {/* Apartment Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-serif font-semibold text-[#FAF9F6] group-hover:text-[#DFC8A8] transition-colors">
                    Apartamento {apt.unitNumber}
                  </h3>
                  <p className="text-xs text-[#FAF9F6]/70 line-clamp-2 mt-1 leading-relaxed">
                    {apt.tagline}
                  </p>
                </div>

                {/* Key Spec Grid (Área, Habs, Baños, Parqueaderos) */}
                <div className="grid grid-cols-4 gap-2 py-3 border-y border-[#2A323D]/60 text-center text-xs">
                  <div className="space-y-0.5">
                    <Maximize2 className="w-3.5 h-3.5 mx-auto text-[#C5A880]" />
                    <span className="text-[11px] text-[#FAF9F6]/50 block">Área</span>
                    <span className="font-semibold text-[#FAF9F6] tabular-nums">{apt.area} m²</span>
                  </div>
                  <div className="space-y-0.5 border-l border-[#2A323D]/60">
                    <Bed className="w-3.5 h-3.5 mx-auto text-[#C5A880]" />
                    <span className="text-[11px] text-[#FAF9F6]/50 block">Habs</span>
                    <span className="font-semibold text-[#FAF9F6] tabular-nums">{apt.bedrooms}</span>
                  </div>
                  <div className="space-y-0.5 border-l border-[#2A323D]/60">
                    <Bath className="w-3.5 h-3.5 mx-auto text-[#C5A880]" />
                    <span className="text-[11px] text-[#FAF9F6]/50 block">Baños</span>
                    <span className="font-semibold text-[#FAF9F6] tabular-nums">{apt.bathrooms}</span>
                  </div>
                  <div className="space-y-0.5 border-l border-[#2A323D]/60">
                    <Car className="w-3.5 h-3.5 mx-auto text-[#C5A880]" />
                    <span className="text-[11px] text-[#FAF9F6]/50 block">Pq.</span>
                    <span className="font-semibold text-[#FAF9F6] tabular-nums">{apt.parkingSpots}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectApartment(apt)}
                      className="py-2 px-3 text-xs uppercase tracking-wider font-medium text-[#FAF9F6] bg-[#0B1320] hover:bg-[#1E293B] border border-[#2A323D] rounded-sm transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Detalle</span>
                    </button>

                    <button
                      onClick={() => onOpenAdvisorInquiry(apt)}
                      className="py-2 px-3 text-xs uppercase tracking-wider font-medium text-[#FAF9F6] bg-[#0B1320] hover:bg-[#1E293B] border border-[#2A323D] rounded-sm transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Asesor</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                    </button>
                  </div>

                  {apt.status === 'Disponible' ? (
                    <button
                      onClick={() => onOpenSeparation(apt)}
                      className="w-full py-2.5 px-4 bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <BookmarkCheck className="w-3.5 h-3.5" />
                      <span>Solicitar separación</span>
                    </button>
                  ) : apt.status === 'Separado' ? (
                    <button
                      onClick={() => onOpenAdvisorInquiry(apt)}
                      className="w-full py-2 px-4 bg-amber-950/40 hover:bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-medium uppercase tracking-wider rounded-sm transition-colors text-center cursor-pointer"
                    >
                      Lista de espera / Consultar
                    </button>
                  ) : (
                    <div className="w-full py-2 px-4 bg-slate-900/60 border border-slate-800 text-slate-500 text-xs text-center rounded-sm select-none">
                      Unidad no disponible
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
