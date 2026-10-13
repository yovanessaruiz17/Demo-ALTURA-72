import React, { useState } from 'react';
import { Plus, Edit2, Phone, Mail, MessageCircle, CheckCircle, XCircle, Users, X } from 'lucide-react';
import { Advisor, AdvisorStatus } from '../../types';
import { saveAdvisor, toggleAdvisorStatus } from '../../services/dataService';

interface AdvisorsManagerProps {
  advisors: Advisor[];
  onReload: () => void;
  onToast: (msg: string) => void;
}

export const AdvisorsManager: React.FC<AdvisorsManagerProps> = ({
  advisors,
  onReload,
  onToast,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdvisor, setEditingAdvisor] = useState<Advisor | null>(null);

  const handleOpenCreate = () => {
    setEditingAdvisor({
      id: `advisor-${Date.now()}`,
      name: '',
      role: 'Asesor comercial',
      specialty: 'Asesor comercial',
      status: 'Activo',
      availability: 'Disponible hoy · Atención en línea',
      phoneDisplay: '+57 (300) 000-DEMO',
      whatsappNumber: '573000000000',
      email: 'asesor@altura72-demo.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Especialista en proyectos residenciales contemporáneos y estructuración de crédito.',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (adv: Advisor) => {
    setEditingAdvisor({ ...adv });
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (adv: Advisor) => {
    const newStatus: AdvisorStatus = adv.status === 'Inactivo' ? 'Activo' : 'Inactivo';
    await toggleAdvisorStatus(adv.id, newStatus);
    onToast(`Asesor ${adv.name} ahora está ${newStatus}`);
    onReload();
  };

  const handleSubmitModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdvisor) return;

    await saveAdvisor(editingAdvisor);
    setIsModalOpen(false);
    onToast(`Asesor ${editingAdvisor.name} guardado correctamente.`);
    onReload();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF9F6]">
            Equipo de Asesores Comerciales
          </h2>
          <p className="text-xs text-[#FAF9F6]/60 mt-0.5">
            Administra asesores, roles de especialidad, disponibilidad y activación para asignación de clientes.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Asesor</span>
        </button>
      </div>

      {/* Advisors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {advisors.map((adv) => {
          const isActive = adv.status !== 'Inactivo';
          return (
            <div
              key={adv.id}
              className={`bg-[#0F172A] border rounded-lg p-6 flex flex-col justify-between transition-all ${
                isActive ? 'border-[#2A323D]' : 'border-zinc-800 opacity-70 bg-[#0B1320]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={adv.avatar}
                      alt={adv.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#C5A880]/50"
                    />
                    <div>
                      <h3 className="font-serif font-bold text-[#FAF9F6] text-base">{adv.name}</h3>
                      <p className="text-xs text-[#C5A880]">{adv.role || adv.specialty}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      isActive
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}
                  >
                    {isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[#FAF9F6]/75 border-t border-[#2A323D]/60 pt-3">
                  <div className="flex items-center gap-2 text-[11px] text-[#FAF9F6]/60">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <span className="truncate">{adv.availability}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{adv.phoneDisplay}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span className="truncate">{adv.email}</span>
                  </div>
                </div>

                {adv.bio && (
                  <p className="text-[11px] text-[#FAF9F6]/55 italic mt-3 line-clamp-2">
                    "{adv.bio}"
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-[#2A323D]/60">
                <button
                  onClick={() => handleToggleStatus(adv)}
                  className={`text-xs px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                      : 'bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300'
                  }`}
                >
                  {isActive ? (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Desactivar</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Activar</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleOpenEdit(adv)}
                  className="text-xs px-3 py-1.5 bg-[#0B1320] hover:bg-[#1E293B] border border-[#2A323D] text-[#FAF9F6] rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Editar</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Edit / Create Advisor */}
      {isModalOpen && editingAdvisor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0F172A] border border-[#2A323D] rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 text-[#FAF9F6] shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#2A323D]">
              <h3 className="text-xl font-serif font-semibold text-[#FAF9F6]">
                {editingAdvisor.name ? `Editar a ${editingAdvisor.name}` : 'Crear Asesor Comercial'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#FAF9F6]/50 hover:text-[#FAF9F6] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitModal} className="space-y-4 pt-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={editingAdvisor.name}
                  onChange={(e) => setEditingAdvisor({ ...editingAdvisor, name: e.target.value })}
                  placeholder="Ej. Laura Gómez"
                  className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                  Especialidad / Rol *
                </label>
                <input
                  type="text"
                  required
                  value={editingAdvisor.role}
                  onChange={(e) =>
                    setEditingAdvisor({
                      ...editingAdvisor,
                      role: e.target.value,
                      specialty: e.target.value,
                    })
                  }
                  placeholder="Ej. Especialista en inversión inmobiliaria"
                  className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Teléfono Visible *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAdvisor.phoneDisplay}
                    onChange={(e) => setEditingAdvisor({ ...editingAdvisor, phoneDisplay: e.target.value })}
                    placeholder="+57 (300) 000-DEMO"
                    className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    WhatsApp (Dígitos) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAdvisor.whatsappNumber}
                    onChange={(e) => setEditingAdvisor({ ...editingAdvisor, whatsappNumber: e.target.value })}
                    placeholder="573000000000"
                    className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={editingAdvisor.email}
                  onChange={(e) => setEditingAdvisor({ ...editingAdvisor, email: e.target.value })}
                  placeholder="asesor@altura72-demo.com"
                  className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                  Texto de Disponibilidad
                </label>
                <input
                  type="text"
                  value={editingAdvisor.availability || ''}
                  onChange={(e) => setEditingAdvisor({ ...editingAdvisor, availability: e.target.value })}
                  placeholder="Ej. Disponible hoy · Respuesta promedio < 15 min"
                  className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                  URL Fotografía Avatar
                </label>
                <input
                  type="text"
                  value={editingAdvisor.avatar || ''}
                  onChange={(e) => setEditingAdvisor({ ...editingAdvisor, avatar: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                  Perfil / Reseña Profesional
                </label>
                <textarea
                  rows={3}
                  value={editingAdvisor.bio || ''}
                  onChange={(e) => setEditingAdvisor({ ...editingAdvisor, bio: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#2A323D]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#FAF9F6]/60 hover:text-white transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Guardar Asesor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
