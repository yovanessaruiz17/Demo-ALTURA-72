import React from 'react';
import { MessageCircle, Mail, PhoneCall, ShieldCheck, ArrowUpRight, Clock, Star } from 'lucide-react';
import { ADVISORS_TEAM } from '../data/apartmentsData';
import { Advisor } from '../types';
import { generateAdvisorWhatsAppUrl, DEMO_PHONE_WARNING } from '../utils/whatsapp';

interface AdvisorsSectionProps {
  advisors?: Advisor[];
  onSelectAdvisorForInquiry: (advisor: Advisor) => void;
}

export const AdvisorsSection: React.FC<AdvisorsSectionProps> = ({
  advisors,
  onSelectAdvisorForInquiry,
}) => {
  const sourceAdvisors = advisors && advisors.length > 0 ? advisors : ADVISORS_TEAM;
  const activeAdvisors = sourceAdvisors.filter((adv) => adv.status !== 'Inactivo');

  const handleWhatsApp = (adv: Advisor) => {
    const url = generateAdvisorWhatsAppUrl(adv.name, adv.whatsappNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="asesores" className="py-24 sm:py-32 bg-[#0B1320] text-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium mb-3">
            <span>Equipo Comercial & Consultoría</span>
            <span aria-hidden="true" className="text-[#FAF9F6]/40">·</span>
            <span>Atención Personalizada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF9F6] leading-tight">
            Habla con nuestros <br />
            <span className="font-normal italic">asesores inmobiliarios.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#FAF9F6]/75 font-light leading-relaxed">
            Nuestro equipo especializado te orienta en la elección de tu tipología, opciones de financiamiento directo y el proceso de separación para ALTURA 72.
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeAdvisors.map((adv) => (
            <article
              key={adv.id}
              className="bg-[#0F172A] border border-[#2A323D] rounded-lg overflow-hidden flex flex-col justify-between group hover:border-[#C5A880]/50 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Advisor Portrait */}
                <div className="relative aspect-square overflow-hidden bg-[#0B1320]">
                  <img
                    src={adv.avatar}
                    alt={adv.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />

                  {/* Availability badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 p-2 bg-[#0B1320]/90 backdrop-blur-sm rounded border border-[#2A323D] text-[11px] text-[#FAF9F6]/90">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="truncate">{adv.availability}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium block">
                      {adv.role}
                    </span>
                    <h3 className="text-2xl font-serif font-semibold text-[#FAF9F6] group-hover:text-[#DFC8A8] transition-colors mt-0.5">
                      {adv.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#FAF9F6]/70 leading-relaxed font-light">
                    {adv.bio}
                  </p>

                  <div className="pt-2 text-xs text-[#FAF9F6]/50 space-y-1">
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{adv.phoneDisplay}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span className="truncate">{adv.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => handleWhatsApp(adv)}
                  className="w-full py-3 px-4 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contactar por WhatsApp</span>
                </button>

                <button
                  onClick={() => onSelectAdvisorForInquiry(adv)}
                  className="w-full py-2.5 px-4 bg-[#0B1320] hover:bg-[#1E293B] border border-[#2A323D] text-xs font-medium uppercase tracking-wider text-[#FAF9F6] rounded-sm transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Solicitar formulario formal</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Demo Warning Notice */}
        <div className="mt-12 p-4 rounded-md bg-[#0F172A]/50 border border-[#2A323D] flex items-center gap-3 text-xs text-[#FAF9F6]/60">
          <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
          <span>
            {DEMO_PHONE_WARNING} Todos los asesores y teléfonos expuestos forman parte del concepto de demostración comercial para ALTURA 72 (YorDev).
          </span>
        </div>
      </div>
    </section>
  );
};
