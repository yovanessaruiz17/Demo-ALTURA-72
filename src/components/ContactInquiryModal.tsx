import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ApartmentUnit, Advisor, ContactInquiry, Lead } from '../types';
import { BUILDING_APARTMENTS, ADVISORS_TEAM } from '../data/apartmentsData';
import { generateAdvisorWhatsAppUrl, DEMO_PHONE_WARNING } from '../utils/whatsapp';
import { createLead } from '../services/dataService';

interface ContactInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialApartment?: ApartmentUnit | null;
  initialAdvisor?: Advisor | null;
  onSuccess: (inquiry: ContactInquiry) => void;
}

export const ContactInquiryModal: React.FC<ContactInquiryModalProps> = ({
  isOpen,
  onClose,
  initialApartment,
  initialAdvisor,
  onSuccess,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedApartmentId, setSelectedApartmentId] = useState<string>(
    initialApartment?.id || BUILDING_APARTMENTS[0].id
  );
  const [selectedAdvisorId, setSelectedAdvisorId] = useState<string>(
    initialAdvisor?.id || ADVISORS_TEAM[0].id
  );
  const [purchaseTimeline, setPurchaseTimeline] = useState<string>('1-3 meses');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialApartment) setSelectedApartmentId(initialApartment.id);
    if (initialAdvisor) setSelectedAdvisorId(initialAdvisor.id);
  }, [initialApartment, initialAdvisor]);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setIsSubmitting(false);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentApartment = BUILDING_APARTMENTS.find((a) => a.id === selectedApartmentId);
  const currentAdvisor = ADVISORS_TEAM.find((a) => a.id === selectedAdvisorId) || ADVISORS_TEAM[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) return;

    setIsSubmitting(true);

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: `${firstName} ${lastName}`.trim(),
      phone,
      email,
      apartment: currentApartment ? `Apto ${currentApartment.unitNumber}` : 'Interés general',
      apartmentId: currentApartment?.id,
      advisor: currentAdvisor.name,
      advisorId: currentAdvisor.id,
      message: message.trim() || 'Consulta enviada desde el portal web comercial.',
      purchaseTimeline,
      createdAt: new Date().toISOString(),
      status: 'Nuevo',
    };

    try {
      await createLead(newLead);
    } catch (err) {
      console.error('Error saving lead:', err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
    onSuccess({
      apartment: currentApartment,
      advisor: currentAdvisor,
      applicantName: firstName,
      applicantLastName: lastName,
      applicantPhone: phone,
      applicantEmail: email,
      purchaseTimeline,
      message,
    });
  };

  const handleWhatsApp = () => {
    const url = generateAdvisorWhatsAppUrl(
      currentAdvisor.name,
      currentAdvisor.whatsappNumber,
      currentApartment?.unitNumber,
      `Plan de compra: ${purchaseTimeline}`
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#0F172A] border border-[#2A323D] rounded-lg shadow-2xl text-[#FAF9F6] overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#2A323D] bg-[#0B1320]/90 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-medium block">
              Solicitud de Información Comercial
            </span>
            <h3 className="text-xl font-serif font-semibold text-[#FAF9F6]">
              {submitted ? 'Consulta Registrada' : 'Hablar con un Asesor · ALTURA 72'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#FAF9F6]/60 hover:text-white hover:bg-white/5 rounded-md transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-serif font-semibold text-[#FAF9F6]">
                ¡Gracias por comunicarte con ALTURA 72!
              </h4>
              <p className="text-xs sm:text-sm text-[#FAF9F6]/75 max-w-md mx-auto leading-relaxed">
                Hemos asignado tu consulta a <strong className="text-[#FAF9F6]">{currentAdvisor.name}</strong> para el apartamento <strong className="text-[#FAF9F6]">{currentApartment?.unitNumber}</strong>. Te contactará por llamada o WhatsApp en breve.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-[#0B1320] text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Abrir chat de WhatsApp con {currentAdvisor.name}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 bg-[#1E293B] hover:bg-[#2A323D] text-[#FAF9F6] text-xs font-medium uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ej. Laura"
                    className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Ej. Castillo"
                    className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+57 300 000 0000"
                    className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              {/* Apartment and Advisor Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Apartamento de interés
                  </label>
                  <select
                    value={selectedApartmentId}
                    onChange={(e) => setSelectedApartmentId(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  >
                    {BUILDING_APARTMENTS.map((apt) => (
                      <option key={apt.id} value={apt.id} className="bg-[#0B1320]">
                        Apto {apt.unitNumber} (Piso {apt.floor} · {apt.area} m² · {apt.formattedPrice})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Asesor asignado
                  </label>
                  <select
                    value={selectedAdvisorId}
                    onChange={(e) => setSelectedAdvisorId(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  >
                    {ADVISORS_TEAM.map((adv) => (
                      <option key={adv.id} value={adv.id} className="bg-[#0B1320]">
                        {adv.name} · {adv.role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Purchase Timeline Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                  ¿Cuándo planeas comprar? *
                </label>
                <select
                  value={purchaseTimeline}
                  onChange={(e) => setPurchaseTimeline(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                >
                  <option value="Inmediatamente">Inmediatamente</option>
                  <option value="1-3 meses">1-3 meses</option>
                  <option value="3-6 meses">3-6 meses</option>
                  <option value="Estoy explorando">Estoy explorando</option>
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                  Mensaje o consulta específica
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu consulta sobre formas de pago, visitas virtuales o planos arquitectónicos..."
                  className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#FAF9F6]/50">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Tus datos son de carácter confidencial y para uso demostrativo en YorDev.</span>
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
                  className="px-6 py-2.5 bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
