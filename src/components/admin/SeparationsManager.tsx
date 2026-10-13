import React, { useState } from 'react';
import { Search, Eye, CheckCircle2, Clock, Ban, Copy, Check, X, FileText } from 'lucide-react';
import { SeparationRequest, SeparationStatus } from '../../types';
import { updateSeparationStatus } from '../../services/dataService';

interface SeparationsManagerProps {
  separations: SeparationRequest[];
  onReload: () => void;
  onToast: (msg: string) => void;
}

export const SeparationsManager: React.FC<SeparationsManagerProps> = ({
  separations,
  onReload,
  onToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSeparation, setSelectedSeparation] = useState<SeparationRequest | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filtered = separations.filter((sep) => {
    const clientFull = `${sep.applicantName} ${sep.applicantLastName}`.toLowerCase();
    const aptNum = sep.apartment?.unitNumber || sep.apartmentUnitNumber || '';
    const advName = sep.advisor?.name || sep.advisorName || '';

    const matchesSearch =
      sep.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clientFull.includes(searchTerm.toLowerCase()) ||
      aptNum.includes(searchTerm) ||
      advName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || sep.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (code: string, newStatus: SeparationStatus) => {
    await updateSeparationStatus(code, newStatus);
    onToast(`Separación ${code} actualizada a "${newStatus}"`);
    onReload();
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onToast(`Código ${code} copiado al portapapeles`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusBadge = (status?: SeparationStatus) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-amber-950/70 text-amber-400 border-amber-500/40';
      case 'En validación':
        return 'bg-sky-950/70 text-sky-400 border-sky-500/40';
      case 'Aprobada':
        return 'bg-emerald-950/70 text-emerald-400 border-emerald-500/40';
      case 'Rechazada':
        return 'bg-rose-950/70 text-rose-400 border-rose-500/40';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF9F6]">
            Solicitudes de Separación
          </h2>
          <p className="text-xs text-[#FAF9F6]/60 mt-0.5">
            Control de reservas de inmuebles, verificación de consignaciones fiduciarias y datos de compradores.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-[#0F172A] border border-[#2A323D] px-3 py-1.5 rounded text-[#FAF9F6]/75">
          <span>Total solicitudes: <strong className="text-[#C5A880]">{separations.length}</strong></span>
          <span>·</span>
          <span>Pendientes: <strong className="text-amber-400">{separations.filter((s) => s.status === 'Pendiente').length}</strong></span>
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
            placeholder="Buscar por código (ej. ALT-701), cliente, asesor o apartamento..."
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
            <option value="Pendiente">Pendiente</option>
            <option value="En validación">En validación</option>
            <option value="Aprobada">Aprobada</option>
            <option value="Rechazada">Rechazada</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0F172A] border border-[#2A323D] rounded-lg overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2A323D] bg-[#0B1320] text-[11px] uppercase tracking-wider text-[#FAF9F6]/60">
                <th className="py-3.5 px-4">Código</th>
                <th className="py-3.5 px-4">Apartamento</th>
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-4">Asesor</th>
                <th className="py-3.5 px-4">Fecha</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-right">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A323D]/60 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#FAF9F6]/50">
                    No se registraron solicitudes con estos parámetros de búsqueda.
                  </td>
                </tr>
              ) : (
                filtered.map((sep) => {
                  const aptNum = sep.apartment?.unitNumber || sep.apartmentUnitNumber || 'S/N';
                  const advName = sep.advisor?.name || sep.advisorName || 'Sin asignar';
                  const clientName = `${sep.applicantName} ${sep.applicantLastName}`;

                  return (
                    <tr key={sep.code} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 font-mono font-bold text-[#C5A880]">
                          <span>{sep.code}</span>
                          <button
                            onClick={() => copyToClipboard(sep.code)}
                            className="p-1 hover:text-white transition-colors cursor-pointer"
                            title="Copiar código"
                          >
                            {copiedCode === sep.code ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-[#FAF9F6]/40" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-[#FAF9F6]">
                        <span className="px-2 py-0.5 rounded bg-[#0B1320] border border-[#2A323D] text-[#FAF9F6]">
                          Apto {aptNum}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#FAF9F6]">{clientName}</div>
                        <div className="text-[#FAF9F6]/60 text-[11px]">{sep.applicantPhone}</div>
                      </td>

                      <td className="py-3.5 px-4 text-[#FAF9F6]/80 font-medium">
                        {advName}
                      </td>

                      <td className="py-3.5 px-4 text-[#FAF9F6]/60 text-[11px]">
                        {sep.date}
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={sep.status || 'Pendiente'}
                          onChange={(e) => handleStatusChange(sep.code, e.target.value as SeparationStatus)}
                          className={`text-xs px-2.5 py-1 rounded font-medium border cursor-pointer focus:outline-none ${getStatusBadge(
                            sep.status
                          )}`}
                        >
                          <option value="Pendiente" className="bg-[#0B1320] text-amber-300">Pendiente</option>
                          <option value="En validación" className="bg-[#0B1320] text-sky-300">En validación</option>
                          <option value="Aprobada" className="bg-[#0B1320] text-emerald-300">Aprobada</option>
                          <option value="Rechazada" className="bg-[#0B1320] text-rose-300">Rechazada</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedSeparation(sep)}
                          className="p-1.5 text-[#FAF9F6]/60 hover:text-[#C5A880] hover:bg-white/5 rounded transition-colors cursor-pointer inline-flex items-center gap-1"
                          title="Ver expediente de separación"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="text-[11px] hidden sm:inline">Dossier</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Separation Detail Dossier Modal */}
      {selectedSeparation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0F172A] border border-[#2A323D] rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 text-[#FAF9F6] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A323D]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880]">
                  Expediente de Separación
                </span>
                <h3 className="text-xl font-serif font-bold text-[#FAF9F6] flex items-center gap-2">
                  <span>Código: {selectedSeparation.code}</span>
                  <button
                    onClick={() => copyToClipboard(selectedSeparation.code)}
                    className="p-1 hover:text-[#C5A880] cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </h3>
              </div>
              <button
                onClick={() => setSelectedSeparation(null)}
                className="p-1 text-[#FAF9F6]/50 hover:text-[#FAF9F6] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Apartamento y Asesor */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-[#0B1320] rounded border border-[#2A323D]/60">
                <div>
                  <span className="text-[#FAF9F6]/50 block">Apartamento</span>
                  <span className="font-serif font-bold text-sm text-[#C5A880]">
                    Unidad {selectedSeparation.apartment?.unitNumber || selectedSeparation.apartmentUnitNumber}
                  </span>
                  <span className="text-[11px] text-[#FAF9F6]/60 block mt-0.5">
                    {selectedSeparation.apartment?.formattedPrice || 'Valor de lista'}
                  </span>
                </div>
                <div>
                  <span className="text-[#FAF9F6]/50 block">Asesor Asignado</span>
                  <span className="font-medium text-[#FAF9F6] block">
                    {selectedSeparation.advisor?.name || selectedSeparation.advisorName}
                  </span>
                  <span className="text-[11px] text-[#FAF9F6]/60 block mt-0.5">
                    {selectedSeparation.advisor?.phoneDisplay}
                  </span>
                </div>
              </div>

              {/* Datos del Comprador */}
              <div className="p-3 bg-[#0B1320] rounded border border-[#2A323D]/60 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium block">
                  Datos del Interesado / Titular
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[#FAF9F6]/50 block">Nombre Completo:</span>
                    <span className="font-semibold text-[#FAF9F6]">
                      {selectedSeparation.applicantName} {selectedSeparation.applicantLastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#FAF9F6]/50 block">Documento de Identidad:</span>
                    <span className="font-mono text-[#FAF9F6]">
                      {selectedSeparation.applicantIdNumber || 'No informado'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-[#FAF9F6]/50 block">Teléfono:</span>
                    <a
                      href={`https://wa.me/${selectedSeparation.applicantPhone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C5A880] hover:underline"
                    >
                      {selectedSeparation.applicantPhone}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#FAF9F6]/50 block">Correo:</span>
                    <span className="text-[#FAF9F6]">{selectedSeparation.applicantEmail}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-[#FAF9F6]/50 block">Ciudad de Residencia:</span>
                    <span className="text-[#FAF9F6]">{selectedSeparation.applicantCity || 'Cartagena'}</span>
                  </div>
                  <div>
                    <span className="text-[#FAF9F6]/50 block">Horizonte de Pago:</span>
                    <span className="text-[#FAF9F6]">{selectedSeparation.purchaseTimeline}</span>
                  </div>
                </div>
              </div>

              {/* Notas del proceso fiduciario */}
              <div>
                <span className="text-[#FAF9F6]/50 block mb-1">Notas de Trámite / Observaciones:</span>
                <div className="p-3 bg-[#0B1320] rounded border border-[#2A323D]/60 text-[#FAF9F6]/85 leading-relaxed italic">
                  "{selectedSeparation.notes || 'Separación generada vía portal comercial. Pendiente validación de consignación bancaria.'}"
                </div>
              </div>

              {/* Actualizar estado */}
              <div className="flex items-center justify-between pt-2 border-t border-[#2A323D]/60">
                <span className="text-[#FAF9F6]/60">Estado de la separación:</span>
                <select
                  value={selectedSeparation.status || 'Pendiente'}
                  onChange={(e) => {
                    const newSt = e.target.value as SeparationStatus;
                    handleStatusChange(selectedSeparation.code, newSt);
                    setSelectedSeparation({ ...selectedSeparation, status: newSt });
                  }}
                  className={`text-xs px-3 py-1.5 rounded font-medium border cursor-pointer focus:outline-none ${getStatusBadge(
                    selectedSeparation.status
                  )}`}
                >
                  <option value="Pendiente" className="bg-[#0B1320] text-amber-300">Pendiente</option>
                  <option value="En validación" className="bg-[#0B1320] text-sky-300">En validación</option>
                  <option value="Aprobada" className="bg-[#0B1320] text-emerald-300">Aprobada</option>
                  <option value="Rechazada" className="bg-[#0B1320] text-rose-300">Rechazada</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#2A323D]">
              <button
                onClick={() => setSelectedSeparation(null)}
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
