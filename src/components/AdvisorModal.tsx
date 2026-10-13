import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, Check, PhoneCall, ShieldCheck } from 'lucide-react';
import { ADVISORS_DATA, APARTMENTS_DATA } from '../data/projectData';

interface AdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedApartmentName?: string;
  onSuccessToast: (msg: string) => void;
}

export const AdvisorModal: React.FC<AdvisorModalProps> = ({
  isOpen,
  onClose,
  selectedApartmentName,
  onSuccessToast,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [apartmentType, setApartmentType] = useState(
    selectedApartmentName || 'Apartamento 2 Habitaciones'
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedApartmentName) {
      setApartmentType(selectedApartmentName);
    }
  }, [selectedApartmentName]);

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccessToast(
        'Solicitud recibida. Un asesor comercial de ALTURA 72 se comunicará contigo a la brevedad.'
      );
    }, 600);
  };

  const handleWhatsAppDirect = (advisorNumber: string, advisorName: string) => {
    const message = encodeURIComponent(
      `Hola ${advisorName}, tengo interés en conocer disponibilidad, planos y opciones de financiación para el proyecto ALTURA 72 en Cartagena (interés: ${apartmentType}).`
    );
    window.open(`https://wa.me/${advisorNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#0F172A] border border-[#2A323D] rounded-lg shadow-2xl text-[#FAF9F6] overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2A323D]/80 bg-[#0B1320]/60">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium block">
              Atención Comercial Directa
            </span>
            <h3 className="text-xl font-serif font-semibold text-[#FAF9F6]">
              Hablar con un Asesor · ALTURA 72
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880]">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-serif font-semibold text-[#FAF9F6]">
                ¡Gracias por tu interés en ALTURA 72!
              </h4>
              <p className="text-sm text-[#FAF9F6]/70 max-w-md mx-auto leading-relaxed">
                Hemos registrado tus datos para el tipo de apartamento{' '}
                <strong className="text-[#FAF9F6]">{apartmentType}</strong>. Nuestro equipo comercial te contactará vía WhatsApp o llamada para compartirte el dossier completo y lista de precios.
              </p>
              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 text-xs uppercase tracking-widest font-semibold bg-[#C5A880] text-[#0B1320] rounded-sm hover:bg-[#DFC8A8] transition-colors cursor-pointer"
                >
                  Cerrar ventana
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Advisors Fast WhatsApp Access */}
              <div>
                <p className="text-xs uppercase tracking-wider text-[#FAF9F6]/60 mb-3">
                  Contacto Inmediato vía WhatsApp
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ADVISORS_DATA.map((adv) => (
                    <div
                      key={adv.id}
                      className="p-3.5 bg-[#0B1320]/70 border border-[#2A323D] rounded-md flex items-center justify-between gap-3 group hover:border-[#C5A880]/40 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-xs font-semibold flex items-center justify-center shrink-0">
                            {adv.initials}
                          </span>
                          <p className="text-sm font-medium text-[#FAF9F6] truncate">{adv.name}</p>
                        </div>
                        <p className="text-xs text-[#FAF9F6]/50 mt-1 truncate pl-9">{adv.role}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleWhatsAppDirect(adv.whatsappNumber, adv.name)}
                        className="px-3 py-1.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] text-xs font-medium rounded transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                        title="Abrir conversación en WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span className="hidden xs:inline">WhatsApp</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-[#2A323D]"></div>
                <span className="flex-shrink mx-4 text-[11px] uppercase tracking-widest text-[#FAF9F6]/40">
                  o déjanos tus datos de contacto
                </span>
                <div className="flex-grow border-t border-[#2A323D]"></div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1.5">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Andrés Morales"
                      className="w-full px-3.5 py-2.5 bg-[#0B1320] border border-[#2A323D] focus:border-[#C5A880] focus:outline-none rounded text-sm text-[#FAF9F6] placeholder-[#FAF9F6]/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1.5">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. +57 300 123 4567"
                      className="w-full px-3.5 py-2.5 bg-[#0B1320] border border-[#2A323D] focus:border-[#C5A880] focus:outline-none rounded text-sm text-[#FAF9F6] placeholder-[#FAF9F6]/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1.5">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-3.5 py-2.5 bg-[#0B1320] border border-[#2A323D] focus:border-[#C5A880] focus:outline-none rounded text-sm text-[#FAF9F6] placeholder-[#FAF9F6]/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1.5">
                      Tipología de Interés
                    </label>
                    <select
                      value={apartmentType}
                      onChange={(e) => setApartmentType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0B1320] border border-[#2A323D] focus:border-[#C5A880] focus:outline-none rounded text-sm text-[#FAF9F6] transition-colors"
                    >
                      {APARTMENTS_DATA.map((apt) => (
                        <option key={apt.id} value={apt.name} className="bg-[#0B1320]">
                          {apt.name} ({apt.bedrooms} hab · {apt.area} m²)
                        </option>
                      ))}
                      <option value="Información General del Proyecto" className="bg-[#0B1320]">
                        Información General del Proyecto
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1.5">
                    Mensaje o Consulta específica
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="¿Deseas programar una llamada, conocer plazos de pago o solicitar planos técnicos?"
                    className="w-full px-3.5 py-2.5 bg-[#0B1320] border border-[#2A323D] focus:border-[#C5A880] focus:outline-none rounded text-sm text-[#FAF9F6] placeholder-[#FAF9F6]/30 resize-none transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#FAF9F6]/50 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <span>Tratamiento de datos confidencial exclusivo para el proyecto ficticio ALTURA 72 (YorDev).</span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs uppercase tracking-wider text-[#FAF9F6]/60 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 text-xs uppercase tracking-widest font-semibold bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] rounded-sm transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Enviando...' : 'Solicitar información'}</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
