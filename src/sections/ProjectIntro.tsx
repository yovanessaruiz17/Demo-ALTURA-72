import React from 'react';
import { PROJECT_IMAGES } from '../data/projectData';

export const ProjectIntro: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Arquitectura contemporánea',
      description:
        'Líneas puras, voladizos estructurados y terrazas corridas que dialogan con la brisa del Caribe. Un edificio pensado para envejecer con dignidad mediante materiales nobles y protección solar pasiva.',
    },
    {
      num: '02',
      title: 'Diseño funcional',
      description:
        'Espacios interiores diáfanos con ventilación cruzada y alturas libres generosas. Cada metro cuadrado responde a una lógica de habitabilidad real, optimizando el almacenamiento y la luz natural.',
    },
    {
      num: '03',
      title: 'Espacios sociales',
      description:
        'Áreas comunes concebidas como extensiones naturales del hogar: rooftop con piscina infinita, sky lounge apergolado y lobby monumental a doble altura para recibir con distinción.',
    },
    {
      num: '04',
      title: 'Seguridad',
      description:
        'Infraestructura integral con control de acceso perimetral automatizado, monitoreo por circuito cerrado y recepción asistida 24 horas para garantizar tranquilidad absoluta a residentes e invitados.',
    },
    {
      num: '05',
      title: 'Ubicación estratégica',
      description:
        'Implantado en una zona residencial privilegiada de Cartagena, con conexión expedita hacia el centro histórico, las marinas náuticas y los corredores viales clave de la ciudad.',
    },
  ];

  return (
    <section id="proyecto" className="py-24 sm:py-32 bg-[#0B1320] text-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium mb-3">
            <span>El Proyecto</span>
            <span aria-hidden="true" className="text-[#FAF9F6]/40">·</span>
            <span>Cartagena de Indias</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#FAF9F6] leading-tight">
            Una nueva forma de <br />
            <span className="font-normal italic">vivir Cartagena.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#FAF9F6]/75 font-light leading-relaxed">
            ALTURA 72 nace como una respuesta serena a la vida urbana contemporánea en la costa norte colombiana. No es una torre más en el horizonte, sino un proyecto residencial diseñado con rigor formal, privacidad y calidez matérica.
          </p>
        </div>

        {/* Architectural Composition Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Visual Architectural Showcase */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-md overflow-hidden bg-[#0F172A] border border-[#2A323D] group">
              <img
                src={PROJECT_IMAGES.lobby}
                alt="Lobby y arquitectura de ALTURA 72"
                referrerPolicy="no-referrer"
                className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase tracking-widest text-[#C5A880] block mb-1">
                  Atrio Principal
                </span>
                <p className="text-sm font-serif text-[#FAF9F6]">
                  Lobby a doble altura revestido en piedra natural y luz rasante.
                </p>
              </div>
            </div>

            <div className="p-6 bg-[#0F172A]/80 border border-[#2A323D] rounded-md space-y-3">
              <div className="text-xs uppercase tracking-widest text-[#FAF9F6]/50">
                Memoria Descriptiva
              </div>
              <p className="text-xs sm:text-sm text-[#FAF9F6]/70 leading-relaxed">
                El edificio se concibe a través de una envolvente térmica eficiente que tamiza el sol caribeño, amplias terrazas apergoladas y materiales de bajo mantenimiento como piedra caliza, concreto a la vista y carpintería de roble tropical.
              </p>
            </div>
          </div>

          {/* Right Column: Architectural Pillars */}
          <div className="lg:col-span-7 divide-y divide-[#2A323D]">
            {pillars.map((item) => (
              <div
                key={item.num}
                className="py-6 sm:py-8 first:pt-0 last:pb-0 group transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-2">
                  <span className="font-serif text-lg text-[#C5A880] font-light tabular-nums shrink-0">
                    {item.num}.
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#FAF9F6] tracking-tight group-hover:text-[#DFC8A8] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="sm:pl-12">
                  <p className="text-sm sm:text-base text-[#FAF9F6]/70 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
