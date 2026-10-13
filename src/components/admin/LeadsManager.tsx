import React, { useState } from 'react';
import { Search, Mail, Phone, MessageSquare, Calendar, User, Eye, X, MessageCircle } from 'lucide-react';
import { Lead, LeadStatus } from '../../types';
import { updateLeadStatus } from '../../services/dataService';

interface LeadsManagerProps {
  leads: Lead[];
  onReload: () => void;
  onToast: (msg: string) => void;
}

export const LeadsManager: React.FC<LeadsManagerProps> = ({ leads, onReload, onToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.apartment.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    await updateLeadStatus(leadId, newStatus);
    onToast(`Estado del prospecto actualizado a "${newStatus}"`);
    onReload();
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'Nuevo':
        return 'bg-emerald-950/70 text-emerald-400 border-emerald-500/40';
      case 'Contactado':
        return 'bg-sky-950/70 text-sky-400 border-sky-500/40';
      case 'En seguimiento':
        return 'bg-amber-950/70 text-amber-400 border-amber-500/40';
      case 'Cerrado':
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF9F6]">
            Gestión de Leads & Prospectos
          </h2>
          <p className="text-xs text-[#FAF9F6]/60 mt-0.5">
            Canalización de consultas comerciales, solicitudes de cotización e información desde el sitio web.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-[#0F172A] border border-[#2A323D] px-3 py-1.5 rounded text-[#FAF9F6]/75">
          <span>Total prospectos: <strong className="text-[#C5A880]">{leads.length}</strong></span>
          <span>·</span>
          <span>Nuevos: <strong className="text-emerald-400">{leads.filter((l) => l.status === 'Nuevo').length}</strong></span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#0F172A] border border-[#2A323D] rounded-lg p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF9F6]/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, correo, teléfono o apartamento..."
            className="w-full pl-9 pr-4 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#FAF9F6]/50 whitespace-nowrap">Estado:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none cursor-pointer"
          >
            <option value="all">Todos los estados</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Contactado">Contactado</option>
            <option value="En seguimiento">En seguimiento</option>
            <option value="Cerrado">Cerrado</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#0F172A] border border-[#2A323D] rounded-lg overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2A323D] bg-[#0B1320] text-[11px] uppercase tracking-wider text-[#FAF9F6]/60">
                <th className="py-3.5 px-4">Nombre / Contacto</th>
                <th className="py-3.5 px-4">Apartamento</th>
                <th className="py-3.5 px-4">Asesor Asignado</th>
                <th className="py-3.5 px-4">Fecha</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-right">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A323D]/60 text-xs">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#FAF9F6]/50">
                    No se encontraron prospectos con los filtros actuales.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-medium text-[#FAF9F6]">
                      <div className="font-semibold text-sm">{lead.name}</div>
                      <div className="text-[#FAF9F6]/60 text-[11px] flex items-center gap-2 mt-0.5">
                        <span>{lead.phone}</span>
                        <span>·</span>
                        <span className="truncate max-w-[140px]">{lead.email}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#0B1320] border border-[#2A323D] text-[#C5A880] font-medium inline-block">
                        {lead.apartment}
                      </span>
                      <div className="text-[10px] text-[#FAF9F6]/50 mt-1">
                        Plazo: {lead.purchaseTimeline}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#FAF9F6]/80 font-medium">
                      {lead.advisor}
                    </td>

                    <td className="py-3.5 px-4 text-[#FAF9F6]/60 text-[11px]">
                      {new Date(lead.createdAt).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={`text-xs px-2.5 py-1 rounded font-medium border cursor-pointer focus:outline-none ${getStatusBadge(
                          lead.status
                        )}`}
                      >
                        <option value="Nuevo" className="bg-[#0B1320] text-emerald-300">Nuevo</option>
                        <option value="Contactado" className="bg-[#0B1320] text-sky-300">Contactado</option>
                        <option value="En seguimiento" className="bg-[#0B1320] text-amber-300">En seguimiento</option>
                        <option value="Cerrado" className="bg-[#0B1320] text-zinc-300">Cerrado</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-1.5 text-[#FAF9F6]/60 hover:text-[#C5A880] hover:bg-white/5 rounded transition-colors cursor-pointer inline-flex items-center gap-1"
                        title="Ver detalle del mensaje"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-[11px] hidden sm:inline">Ver</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0F172A] border border-[#2A323D] rounded-lg max-w-lg w-full p-6 text-[#FAF9F6] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A323D]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880]">
                  Detalle del Prospecto
                </span>
                <h3 className="text-xl font-serif font-semibold text-[#FAF9F6]">
                  {selectedLead.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 text-[#FAF9F6]/50 hover:text-[#FAF9F6] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-[#0B1320] rounded border border-[#2A323D]/60">
                <div>
                  <span className="text-[#FAF9F6]/50 block">Teléfono / WhatsApp</span>
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#C5A880] hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>{selectedLead.phone}</span>
                  </a>
                </div>
                <div>
                  <span className="text-[#FAF9F6]/50 block">Correo Electrónico</span>
                  <span className="font-medium text-[#FAF9F6]">{selectedLead.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-[#0B1320] rounded border border-[#2A323D]/60">
                <div>
                  <span className="text-[#FAF9F6]/50 block">Unidad de Interés</span>
                  <span className="font-medium text-[#C5A880]">{selectedLead.apartment}</span>
                </div>
                <div>
                  <span className="text-[#FAF9F6]/50 block">Horizonte de Compra</span>
                  <span className="font-medium text-[#FAF9F6]">{selectedLead.purchaseTimeline}</span>
                </div>
              </div>

              <div>
                <span className="text-[#FAF9F6]/50 block mb-1">Mensaje o Consulta:</span>
                <div className="p-3 bg-[#0B1320] rounded border border-[#2A323D]/60 text-[#FAF9F6]/85 leading-relaxed italic">
                  "{selectedLead.message || 'Sin mensaje adicional (solicitud estándar de cotización).'}"
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[#FAF9F6]/50">Cambiar estado del prospecto:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => {
                    const newSt = e.target.value as LeadStatus;
                    handleStatusChange(selectedLead.id, newSt);
                    setSelectedLead({ ...selectedLead, status: newSt });
                  }}
                  className={`text-xs px-3 py-1.5 rounded font-medium border cursor-pointer focus:outline-none ${getStatusBadge(
                    selectedLead.status
                  )}`}
                >
                  <option value="Nuevo" className="bg-[#0B1320] text-emerald-300">Nuevo</option>
                  <option value="Contactado" className="bg-[#0B1320] text-sky-300">Contactado</option>
                  <option value="En seguimiento" className="bg-[#0B1320] text-amber-300">En seguimiento</option>
                  <option value="Cerrado" className="bg-[#0B1320] text-zinc-300">Cerrado</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#2A323D]">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-[#0B1320] hover:bg-[#1E293B] border border-[#2A323D] text-xs uppercase tracking-wider rounded text-[#FAF9F6] transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
