import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  BookmarkCheck,
  ShieldCheck,
  Calendar,
  UserCheck,
  Home,
  MessageCircle,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { ApartmentUnit, Advisor, SeparationRequest } from '../types';
import { ADVISORS_TEAM } from '../data/apartmentsData';
import { generateSeparationWhatsAppUrl, DEMO_PHONE_WARNING } from '../utils/whatsapp';
import { createSeparation } from '../services/dataService';

interface SeparationModalProps {
  apartment: ApartmentUnit | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (req: SeparationRequest) => void;
}

export const SeparationModal: React.FC<SeparationModalProps> = ({
  apartment,
  isOpen,
  onClose,
  onSuccess,
}) => {
  // Step 1: Apartamento, Step 2: Asesor, Step 3: Datos, Step 4: Confirmación
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor>(ADVISORS_TEAM[0]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Cartagena');
  const [purchaseTimeline, setPurchaseTimeline] = useState('Inmediatamente');
  const [notes, setNotes] = useState('');

  const [separationCode, setSeparationCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setCopied(false);
      setIsSubmitting(false);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !apartment) return null;

  const handleNextFromApartment = () => {
    setStep(2);
  };

  const handleNextFromAdvisor = () => {
    setStep(3);
  };

  const handleSubmitSeparation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Generate random realistic code: ALT-[unitNumber]-[random 4 digits]
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `ALT-${apartment.unitNumber}-${randomSuffix}`;
    setSeparationCode(code);

    const newRequest: SeparationRequest = {
      code,
      apartment,
      advisor: selectedAdvisor,
      applicantName: firstName,
      applicantLastName: lastName,
      applicantIdNumber: idNumber || '1047-DEMO',
      applicantPhone: phone,
      applicantEmail: email,
      applicantCity: city,
      purchaseTimeline,
      date: new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      notes,
    };

    try {
      await createSeparation(newRequest);
    } catch (err) {
      console.error('Error saving separation:', err);
    }

    setIsSubmitting(false);
    setStep(4);
    onSuccess(newRequest);
  };

  const handleCopyCode = () => {
    if (separationCode) {
      navigator.clipboard.writeText(separationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleWhatsAppConfirmation = () => {
    const url = generateSeparationWhatsAppUrl(
      selectedAdvisor.name,
      selectedAdvisor.whatsappNumber,
      apartment.unitNumber || '701',
      separationCode,
      `${firstName} ${lastName}`
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-[#0F172A] border border-[#2A323D] rounded-lg shadow-2xl text-[#FAF9F6] overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with Steps */}
        <div className="px-6 py-5 border-b border-[#2A323D] bg-[#0B1320]/90 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-medium block">
              Proceso de Solicitud de Separación
            </span>
            <h3 className="text-xl font-serif font-semibold text-[#FAF9F6]">
              {step === 4 ? 'Solicitud Recibida' : `Paso ${step} de 3 · Apartamento ${apartment.unitNumber}`}
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

        {/* Step Indicator Bar */}
        {step < 4 && (
          <div className="bg-[#0B1320] border-b border-[#2A323D] px-6 py-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  step === 1 ? 'bg-[#C5A880] text-[#0B1320]' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                }`}
              >
                1
              </span>
              <span className={step === 1 ? 'text-[#FAF9F6] font-medium' : 'text-[#FAF9F6]/60'}>
                Apartamento
              </span>
            </div>

            <div className="w-8 h-[1px] bg-[#2A323D]" />

            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  step === 2
                    ? 'bg-[#C5A880] text-[#0B1320]'
                    : step > 2
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    : 'bg-[#1E293B] text-[#FAF9F6]/40'
                }`}
              >
                2
              </span>
              <span className={step === 2 ? 'text-[#FAF9F6] font-medium' : 'text-[#FAF9F6]/60'}>
                Asesor
              </span>
            </div>

            <div className="w-8 h-[1px] bg-[#2A323D]" />

            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  step === 3 ? 'bg-[#C5A880] text-[#0B1320]' : 'bg-[#1E293B] text-[#FAF9F6]/40'
                }`}
              >
                3
              </span>
              <span className={step === 3 ? 'text-[#FAF9F6] font-medium' : 'text-[#FAF9F6]/60'}>
                Datos
              </span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* STEP 1: Apartamento */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="p-4 bg-[#0B1320] border border-[#2A323D] rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium block">
                    Unidad a Separar
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-[#FAF9F6]">
                    Apartamento {apartment.unitNumber}
                  </h4>
                  <p className="text-xs text-[#FAF9F6]/60">
                    Piso {apartment.floor} · {apartment.type} · {apartment.orientation}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-[#FAF9F6]/50 uppercase tracking-widest block">
                    Precio de Lista
                  </span>
                  <span className="text-xl font-serif font-bold text-[#FAF9F6] tabular-nums">
                    {apartment.formattedPrice}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-[#0B1320] border border-[#2A323D] rounded">
                  <span className="text-[11px] text-[#FAF9F6]/50 block">Superficie</span>
                  <span className="font-semibold text-sm">{apartment.area} m²</span>
                </div>
                <div className="p-3 bg-[#0B1320] border border-[#2A323D] rounded">
                  <span className="text-[11px] text-[#FAF9F6]/50 block">Habitaciones</span>
                  <span className="font-semibold text-sm">{apartment.bedrooms}</span>
                </div>
                <div className="p-3 bg-[#0B1320] border border-[#2A323D] rounded">
                  <span className="text-[11px] text-[#FAF9F6]/50 block">Baños</span>
                  <span className="font-semibold text-sm">{apartment.bathrooms}</span>
                </div>
                <div className="p-3 bg-[#0B1320] border border-[#2A323D] rounded">
                  <span className="text-[11px] text-[#FAF9F6]/50 block">Parqueaderos</span>
                  <span className="font-semibold text-sm">{apartment.parkingSpots}</span>
                </div>
              </div>

              <div className="p-4 bg-[#0B1320]/60 border border-[#2A323D] rounded text-xs space-y-2 text-[#FAF9F6]/75 leading-relaxed">
                <p>
                  <strong>Condiciones comerciales de separación (Ficticias):</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-[#FAF9F6]/60 text-[11px]">
                  <li>Bloqueo temporal de la unidad por 5 días hábiles.</li>
                  <li>Asignación de asesor comercial exclusivo para presentación de contrato fiduciario.</li>
                  <li>No se realiza ningún cobro en línea ni se solicitan datos de tarjetas de crédito.</li>
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextFromApartment}
                  className="px-6 py-3 bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Continuar: Seleccionar Asesor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Asesor */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-serif font-semibold text-[#FAF9F6]">
                  Elige tu Asesor Comercial Personalizado
                </h4>
                <p className="text-xs text-[#FAF9F6]/70 mt-1">
                  El asesor seleccionado revisará personalmente tu solicitud y te contactará para coordinar la firma de separación.
                </p>
              </div>

              <div className="space-y-3">
                {ADVISORS_TEAM.map((adv) => {
                  const isSelected = selectedAdvisor.id === adv.id;
                  return (
                    <div
                      key={adv.id}
                      onClick={() => setSelectedAdvisor(adv)}
                      className={`p-4 rounded-md border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#0B1320] border-[#C5A880] ring-1 ring-[#C5A880]'
                          : 'bg-[#0B1320]/60 border-[#2A323D] hover:border-[#2A323D]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={adv.avatar}
                          alt={adv.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-full object-cover border border-[#2A323D]"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm font-semibold text-[#FAF9F6]">{adv.name}</h5>
                            {isSelected && (
                              <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-medium">
                                (Seleccionado)
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#C5A880] mt-0.5">{adv.role}</p>
                          <p className="text-[11px] text-[#FAF9F6]/50 mt-1">{adv.availability}</p>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-[#C5A880] bg-[#C5A880] text-[#0B1320]'
                            : 'border-[#2A323D]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#FAF9F6]/60 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver a Apartamento</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextFromAdvisor}
                  className="px-6 py-3 bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Continuar: Tus Datos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Datos del interesado */}
          {step === 3 && (
            <form onSubmit={handleSubmitSeparation} className="space-y-4">
              <div>
                <h4 className="text-lg font-serif font-semibold text-[#FAF9F6]">
                  Datos del Titular de la Separación
                </h4>
                <p className="text-xs text-[#FAF9F6]/70 mt-1">
                  Ingresa tus datos de contacto para emitir la constancia de reserva ficticia para el Apto {apartment.unitNumber}.
                </p>
              </div>

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
                    placeholder="Ej. Santiago"
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
                    placeholder="Ej. Restrepo"
                    className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Cédula / Documento
                  </label>
                  <input
                    type="text"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="Ej. 104728912"
                    className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+57 300 123 4567"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Ciudad de residencia
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Cartagena, Bogotá, Medellín, etc."
                    className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

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
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                  Observaciones o solicitud especial
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Por ejemplo: Consulta sobre cuotas de inicial, parqueadero adicional, etc."
                  className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none resize-none"
                />
              </div>

              <div className="p-3 bg-[#0B1320]/80 border border-[#2A323D] rounded flex items-center gap-2 text-[11px] text-[#FAF9F6]/60">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>
                  No realizamos cobros en este sitio. Tu solicitud será atendida directamente por {selectedAdvisor.name}.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#FAF9F6]/60 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver a Asesor</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>{isSubmitting ? 'Procesando solicitud...' : 'Confirmar Solicitud de Separación'}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Confirmación Final */}
          {step === 4 && (
            <div className="space-y-6 text-center py-2 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl sm:text-3xl font-serif font-semibold text-[#FAF9F6]">
                  ¡Solicitud de separación recibida!
                </h4>
                <p className="text-xs sm:text-sm text-[#FAF9F6]/70 mt-1 max-w-md mx-auto leading-relaxed">
                  Tu solicitud ha sido registrada en el sistema demostrativo de ALTURA 72 para el portafolio de YorDev.
                </p>
              </div>

              {/* Code Banner */}
              <div className="p-4 bg-[#0B1320] border border-[#C5A880]/50 rounded-lg max-w-md mx-auto">
                <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-medium block mb-1">
                  Código Único de Solicitud
                </span>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-mono font-bold tracking-wider text-white">
                    {separationCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 rounded bg-[#1E293B] hover:bg-[#2A323D] text-[#FAF9F6] transition-colors cursor-pointer"
                    title="Copiar código"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && (
                  <span className="text-[10px] text-emerald-400 mt-1 block">
                    ¡Código copiado al portapapeles!
                  </span>
                )}
              </div>

              {/* Summary Table */}
              <div className="max-w-lg mx-auto bg-[#0B1320] border border-[#2A323D] rounded-md text-left text-xs divide-y divide-[#2A323D]">
                <div className="p-3 flex justify-between">
                  <span className="text-[#FAF9F6]/50">Apartamento:</span>
                  <span className="font-semibold text-[#FAF9F6]">
                    Apto {apartment.unitNumber} (Piso {apartment.floor} · {apartment.area} m²)
                  </span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-[#FAF9F6]/50">Asesor Comercial:</span>
                  <span className="font-semibold text-[#FAF9F6]">{selectedAdvisor.name}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-[#FAF9F6]/50">Nombre del interesado:</span>
                  <span className="font-semibold text-[#FAF9F6]">
                    {firstName} {lastName}
                  </span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-[#FAF9F6]/50">Fecha de emisión:</span>
                  <span className="font-semibold text-[#FAF9F6]">
                    {new Date().toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-[#FAF9F6]/50">Plazo estimado:</span>
                  <span className="font-semibold text-[#C5A880]">{purchaseTimeline}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsAppConfirmation}
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-[#0B1320] text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notificar a {selectedAdvisor.name} vía WhatsApp</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 bg-[#1E293B] hover:bg-[#2A323D] text-[#FAF9F6] text-xs font-medium uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  Finalizar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
