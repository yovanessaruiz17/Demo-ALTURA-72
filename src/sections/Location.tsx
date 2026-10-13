import React from 'react';
import { MapPin, Navigation, Compass, Clock, Building, Palmtree, Plane } from 'lucide-react';
import { LOCATION_POINTS } from '../data/projectData';

export const Location: React.FC = () => {
  return (
    <section id="ubicacion" className="py-24 sm:py-32 bg-[#0B1320] text-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium mb-3">
            <span>Ubicación Estratégica</span>
            <span aria-hidden="true" className="text-[#FAF9F6]/40">·</span>
            <span>Cartagena de Indias, Colombia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF9F6] leading-tight">
            El privilegio de estar cerca de todo, <br />
            <span className="font-normal italic">en el sosiego residencial.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#FAF9F6]/75 font-light leading-relaxed">
            ALTURA 72 se implanta en un punto neurálgico de Cartagena de Indias. Una posición privilegiada que equilibra la serenidad del entorno residencial con accesos directos al centro histórico, las bahías y la infraestructura comercial de la ciudad.
          </p>
        </div>

        {/* Location Grid: Visual Map Preview + Contextual Points */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Visual Map Canvas (Prepared for future Google Maps integration) */}
          <div className="lg:col-span-7 bg-[#0F172A] border border-[#2A323D] rounded-md overflow-hidden relative aspect-[16/11] flex flex-col justify-between p-6 sm:p-8">
            {/* Background architectural grid representing Cartesian coordinates */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, #C5A880 1px, transparent 0)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* Stylized Coastal Line Art / Nautical Map Silhouette */}
            <svg
              className="absolute inset-0 w-full h-full stroke-[#C5A880]/25 fill-none pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 400"
              preserveAspectRatio="none"
            >
              {/* Bay coast line */}
              <path
                d="M 50,0 Q 150,120 220,180 T 360,240 T 480,310 T 600,400"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {/* Island contour representation */}
              <path
                d="M 120,60 C 180,90 200,160 160,210 C 120,260 70,220 60,150 Z"
                strokeWidth="1"
                fill="rgba(197, 168, 128, 0.03)"
              />
              {/* Secondary bay curve */}
              <path
                d="M 280,100 C 350,140 400,220 340,290 C 290,340 230,300 240,220 Z"
                strokeWidth="1"
                fill="rgba(255, 255, 255, 0.02)"
              />
            </svg>

            {/* Top Bar inside Map Canvas */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880] animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-[#FAF9F6]/80 font-medium">
                  Cartagena de Indias, Colombia
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#FAF9F6]/50 uppercase tracking-widest">
                <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>10°24'N 75°32'W</span>
              </div>
            </div>

            {/* Central Pin Anchor for ALTURA 72 */}
            <div className="relative z-10 self-center text-center my-auto py-6">
              <div className="relative inline-flex items-center justify-center">
                {/* Ripple rings */}
                <div className="absolute w-20 h-20 rounded-full border border-[#C5A880]/30 animate-ping opacity-30" />
                <div className="absolute w-14 h-14 rounded-full border border-[#C5A880]/50" />
                <div className="w-10 h-10 rounded-full bg-[#C5A880] text-[#0B1320] flex items-center justify-center shadow-lg font-serif font-bold text-xs">
                  A72
                </div>
              </div>
              <div className="mt-3 bg-[#0B1320]/90 backdrop-blur-md border border-[#2A323D] px-4 py-1.5 rounded-sm inline-block">
                <span className="text-xs font-serif font-semibold text-[#FAF9F6] block">
                  ALTURA 72
                </span>
                <span className="text-[10px] text-[#C5A880] uppercase tracking-wider block">
                  Sector Residencial Exclusivo
                </span>
              </div>
            </div>

            {/* Bottom Status / Preparation Note */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-4 border-t border-[#2A323D]/60 text-xs text-[#FAF9F6]/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Acceso por corredor vial principal y frente marítimo</span>
              </div>
              <span className="text-[11px] text-[#FAF9F6]/40 italic">
                (Visualizador preparado para Google Maps en Fase 2)
              </span>
            </div>
          </div>

          {/* Location Points & Mobility Estimates */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#C5A880] font-medium mb-2">
              Distancias y Conectividad
            </h3>

            <div className="space-y-3">
              {LOCATION_POINTS.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#0F172A]/70 border border-[#2A323D] rounded-md flex items-start gap-4 hover:border-[#C5A880]/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0B1320] border border-[#2A323D] flex items-center justify-center text-[#C5A880] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-sm font-medium text-[#FAF9F6] truncate">
                        {pt.title}
                      </h4>
                      <span className="text-xs font-serif font-bold text-[#C5A880] tabular-nums shrink-0">
                        {pt.timeEst}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#FAF9F6]/40 block mb-1">
                      {pt.category}
                    </span>
                    <p className="text-xs text-[#FAF9F6]/70 leading-relaxed font-light">
                      {pt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
