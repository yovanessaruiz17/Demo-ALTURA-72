import React, { useState, useEffect } from 'react';
import {
  X,
  Maximize2,
  Bed,
  Bath,
  Car,
  BookmarkCheck,
  MessageSquare,
  ArrowUpRight,
  Check,
  Compass,
  Layers,
} from 'lucide-react';
import { ApartmentUnit, ApartmentStatus } from '../types';

interface ApartmentDetailModalProps {
  apartment: ApartmentUnit | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSeparation: (apt: ApartmentUnit) => void;
  onOpenInquiry: (apt: ApartmentUnit) => void;
  onOpenAdvisorWhatsApp: (apt: ApartmentUnit) => void;
}

export const ApartmentDetailModal: React.FC<ApartmentDetailModalProps> = ({
  apartment,
  isOpen,
  onClose,
  onOpenSeparation,
  onOpenInquiry,
  onOpenAdvisorWhatsApp,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (apartment) {
      setSelectedImage(apartment.image);
    }
  }, [apartment]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !apartment) return null;

  const getStatusBadge = (status: ApartmentStatus) => {
    switch (status) {
      case 'Disponible':
        return (
          <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-medium">
            Disponible para Separación
          </span>
        );
      case 'Separado':
        return (
          <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-medium">
            Separado (En Validación Fiduciaria)
          </span>
        );
      case 'Vendido':
        return (
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-400 text-xs font-medium">
            Unidad Vendida
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-[#0F172A] border border-[#2A323D] rounded-lg shadow-2xl text-[#FAF9F6] overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2A323D] bg-[#0B1320]/80">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium">
                Ficha Técnica · ALTURA 72
              </span>
              <span className="text-xs text-[#FAF9F6]/40">·</span>
              {getStatusBadge(apartment.status)}
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#FAF9F6] mt-0.5">
              Apartamento {apartment.unitNumber} · Piso {apartment.floor}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#FAF9F6]/60 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Visual and Thumbnails */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] rounded-md overflow-hidden bg-[#0B1320] border border-[#2A323D]">
                <img
                  src={selectedImage || apartment.image}
                  alt={`Apartamento ${apartment.unitNumber}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between bg-[#0B1320]/80 backdrop-blur-sm p-2.5 rounded border border-[#2A323D]/60">
                  <div className="flex items-center gap-1.5 text-xs text-[#C5A880]">
                    <Compass className="w-3.5 h-3.5" />
                    <span>{apartment.orientation}</span>
                  </div>
                  <div className="text-lg font-serif font-bold text-[#FAF9F6] tabular-nums">
                    {apartment.formattedPrice}
                  </div>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {apartment.gallery && apartment.gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {apartment.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-12 rounded overflow-hidden border shrink-0 transition-all cursor-pointer ${
                        selectedImage === img
                          ? 'border-[#C5A880] ring-1 ring-[#C5A880]'
                          : 'border-[#2A323D] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Vista ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Key Specs & Description */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#0B1320] border border-[#2A323D] rounded-md text-xs">
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-[#C5A880]" />
                  <div>
                    <span className="text-[#FAF9F6]/50 block text-[10px]">Área Total</span>
                    <span className="font-semibold text-sm">{apartment.area} m²</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-[#C5A880]" />
                  <div>
                    <span className="text-[#FAF9F6]/50 block text-[10px]">Habitaciones</span>
                    <span className="font-semibold text-sm">{apartment.bedrooms}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-[#2A323D]/60 pt-2">
                  <Bath className="w-4 h-4 text-[#C5A880]" />
                  <div>
                    <span className="text-[#FAF9F6]/50 block text-[10px]">Baños</span>
                    <span className="font-semibold text-sm">{apartment.bathrooms}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-[#2A323D]/60 pt-2">
                  <Car className="w-4 h-4 text-[#C5A880]" />
                  <div>
                    <span className="text-[#FAF9F6]/50 block text-[10px]">Parqueaderos</span>
                    <span className="font-semibold text-sm">{apartment.parkingSpots} privado(s)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest text-[#FAF9F6]/60">
                  Concepto y Distribución
                </h4>
                <p className="text-xs sm:text-sm text-[#FAF9F6]/75 leading-relaxed font-light">
                  {apartment.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {apartment.status === 'Disponible' ? (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSeparation(apartment);
                    }}
                    className="w-full py-3 px-4 bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <BookmarkCheck className="w-4 h-4" />
                    <span>Solicitar separación</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenInquiry(apartment);
                    }}
                    className="w-full py-2.5 px-4 bg-amber-950/40 hover:bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-medium uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <BookmarkCheck className="w-4 h-4" />
                    <span>Consultar lista de espera</span>
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenInquiry(apartment);
                    }}
                    className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-[#FAF9F6] bg-[#0B1320] hover:bg-[#1E293B] border border-[#2A323D] rounded-sm transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Solicitar información</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenAdvisorWhatsApp(apartment);
                    }}
                    className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-[#FAF9F6] bg-[#0B1320] hover:bg-[#1E293B] border border-[#2A323D] rounded-sm transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Hablar con un asesor</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features and Specifications List */}
          <div className="pt-4 border-t border-[#2A323D]">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A880] font-medium mb-3">
              Características & Acabados de la Unidad
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {apartment.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 bg-[#0B1320] border border-[#2A323D]/60 rounded text-xs text-[#FAF9F6]/80"
                >
                  <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
