import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Check,
  X,
  Building2,
  DollarSign,
  Layers,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import { ApartmentUnit, ApartmentStatus } from '../../types';
import {
  saveApartment,
  updateApartmentStatus,
  updateApartmentPrice,
  deleteApartment,
} from '../../services/dataService';

interface ApartmentsManagerProps {
  apartments: ApartmentUnit[];
  onReload: () => void;
  onToast: (msg: string) => void;
}

export const ApartmentsManager: React.FC<ApartmentsManagerProps> = ({
  apartments,
  onReload,
  onToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingApartment, setEditingApartment] = useState<ApartmentUnit | null>(null);

  // Filter apartments
  const filteredApartments = apartments.filter((apt) => {
    const unitNum = apt.unitNumber || apt.number || '';
    const aptType = apt.type || '';
    const aptFloor = apt.floor !== undefined ? String(apt.floor) : '';

    const matchesSearch =
      unitNum.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aptType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aptFloor.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'Disponible' && (apt.status === 'Disponible' || apt.status === 'Últimas unidades')) ||
      apt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenCreate = () => {
    const nextUnitNum = `${Math.floor(Math.random() * 8) + 3}0${Math.floor(Math.random() * 3) + 1}`;
    setEditingApartment({
      id: `apt-${Date.now()}`,
      unitNumber: nextUnitNum,
      floor: parseInt(nextUnitNum[0]) || 4,
      type: 'Tipo B',
      area: 88,
      bedrooms: 2,
      bathrooms: 2,
      parkingSpots: 1,
      priceCop: 450000000,
      formattedPrice: '$450.000.000 COP',
      status: 'Disponible',
      tagline: 'Nueva unidad de arquitectura vanguardista con vista despejada.',
      description:
        'Distribución contemporánea con amplios ventanales termoacústicos, cocina abierta con isla central y balcón panorámico.',
      features: [
        'Alcoba principal con baño en suite y vestier',
        'Cocina de diseño con herrajes de cierre suave',
        'Balcón corrido con vista a la bahía',
        '1 parqueadero privado en sótano',
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      ],
      orientation: 'Norte - Vista a la bahía',
    });
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (apt: ApartmentUnit) => {
    setEditingApartment({ ...apt });
    setIsEditModalOpen(true);
  };

  const handleInlineStatusChange = async (id: string, newStatus: ApartmentStatus) => {
    await updateApartmentStatus(id, newStatus);
    onToast(`Estado de la unidad actualizado a "${newStatus}"`);
    onReload();
  };

  const handleDelete = async (apt: ApartmentUnit) => {
    if (window.confirm(`¿Estás seguro de eliminar el Apto ${apt.unitNumber}? Esta acción se reflejará en el catálogo público.`)) {
      await deleteApartment(apt.id);
      onToast(`Apartamento ${apt.unitNumber} eliminado.`);
      onReload();
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApartment) return;

    // Recalculate formatted price
    const formattedPrice = `$${new Intl.NumberFormat('es-CO').format(editingApartment.priceCop)} COP`;
    const toSave: ApartmentUnit = {
      ...editingApartment,
      formattedPrice,
    };

    await saveApartment(toSave);
    setIsEditModalOpen(false);
    onToast(`Apartamento ${toSave.unitNumber} guardado exitosamente.`);
    onReload();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF9F6]">
            Inventario de Apartamentos
          </h2>
          <p className="text-xs text-[#FAF9F6]/60 mt-0.5">
            Crea, edita precios, estados y acabados. Los cambios se sincronizan en tiempo real con el catálogo público y el selector de la torre.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Apartamento</span>
        </button>
      </div>

      {/* Search & Status Filters */}
      <div className="bg-[#0F172A] border border-[#2A323D] rounded-lg p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF9F6]/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por número (ej. 301, 701), tipo o piso..."
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
            <option value="all">Todos ({apartments.length})</option>
            <option value="Disponible">Disponibles</option>
            <option value="Separado">Separados</option>
            <option value="Vendido">Vendidos</option>
          </select>
        </div>
      </div>

      {/* Table / Cards List */}
      <div className="bg-[#0F172A] border border-[#2A323D] rounded-lg overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2A323D] bg-[#0B1320] text-[11px] uppercase tracking-wider text-[#FAF9F6]/60">
                <th className="py-3.5 px-4">Unidad</th>
                <th className="py-3.5 px-4">Tipo & Área</th>
                <th className="py-3.5 px-4">Distribución</th>
                <th className="py-3.5 px-4">Precio (COP)</th>
                <th className="py-3.5 px-4">Estado Comercial</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A323D]/60 text-xs">
              {filteredApartments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#FAF9F6]/50">
                    No se encontraron apartamentos con los criterios especificados.
                  </td>
                </tr>
              ) : (
                filteredApartments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-medium text-[#FAF9F6]">
                      <div className="flex items-center gap-3">
                        <img
                          src={apt.image}
                          alt={`Apto ${apt.unitNumber}`}
                          className="w-10 h-10 rounded object-cover border border-[#2A323D]"
                        />
                        <div>
                          <span className="font-serif font-bold text-sm block">Apto {apt.unitNumber}</span>
                          <span className="text-[11px] text-[#C5A880]">Piso {apt.floor}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#FAF9F6]">{apt.type}</div>
                      <div className="text-[#FAF9F6]/60 text-[11px]">{apt.area} m² construidos</div>
                    </td>

                    <td className="py-3.5 px-4 text-[#FAF9F6]/75">
                      <div>{apt.bedrooms} alc. · {apt.bathrooms} bñs.</div>
                      <div className="text-[11px] text-[#FAF9F6]/50">{apt.parkingSpots} parqueadero(s)</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-mono font-semibold text-[#C5A880]">
                        {apt.formattedPrice}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={apt.status}
                        onChange={(e) => handleInlineStatusChange(apt.id, e.target.value as ApartmentStatus)}
                        className={`text-xs px-2.5 py-1 rounded font-medium border cursor-pointer focus:outline-none ${
                          apt.status === 'Disponible' || apt.status === 'Últimas unidades'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                            : apt.status === 'Separado'
                            ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                            : 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                        }`}
                      >
                        <option value="Disponible" className="bg-[#0B1320] text-emerald-300">🟢 Disponible</option>
                        <option value="Separado" className="bg-[#0B1320] text-amber-300">🟡 Separado</option>
                        <option value="Vendido" className="bg-[#0B1320] text-rose-300">🔴 Vendido</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(apt)}
                          className="p-1.5 text-[#FAF9F6]/60 hover:text-[#C5A880] hover:bg-white/5 rounded transition-colors cursor-pointer"
                          title="Editar apartamento completo"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(apt)}
                          className="p-1.5 text-[#FAF9F6]/40 hover:text-rose-400 hover:bg-rose-950/30 rounded transition-colors cursor-pointer"
                          title="Eliminar apartamento"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Apartment Modal */}
      {isEditModalOpen && editingApartment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0F172A] border border-[#2A323D] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 text-[#FAF9F6] shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#2A323D]">
              <h3 className="text-xl font-serif font-semibold text-[#FAF9F6]">
                {editingApartment.id.startsWith('apt-') && !apartments.some((a) => a.id === editingApartment.id)
                  ? 'Crear Nuevo Apartamento'
                  : `Editar Apartamento ${editingApartment.unitNumber}`}
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-[#FAF9F6]/50 hover:text-[#FAF9F6] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Número *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingApartment.unitNumber}
                    onChange={(e) => setEditingApartment({ ...editingApartment, unitNumber: e.target.value })}
                    className="w-full px-3 py-1.5 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Piso *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    required
                    value={editingApartment.floor}
                    onChange={(e) => setEditingApartment({ ...editingApartment, floor: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-1.5 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Tipología *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingApartment.type}
                    onChange={(e) => setEditingApartment({ ...editingApartment, type: e.target.value })}
                    placeholder="Ej. Tipo A"
                    className="w-full px-3 py-1.5 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Área (m²) *
                  </label>
                  <input
                    type="number"
                    min={30}
                    required
                    value={editingApartment.area}
                    onChange={(e) => setEditingApartment({ ...editingApartment, area: parseFloat(e.target.value) || 50 })}
                    className="w-full px-3 py-1.5 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Alcobas *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    required
                    value={editingApartment.bedrooms}
                    onChange={(e) => setEditingApartment({ ...editingApartment, bedrooms: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-1.5 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Baños *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    required
                    value={editingApartment.bathrooms}
                    onChange={(e) => setEditingApartment({ ...editingApartment, bathrooms: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-1.5 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Parqueaderos *
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={4}
                    required
                    value={editingApartment.parkingSpots}
                    onChange={(e) => setEditingApartment({ ...editingApartment, parkingSpots: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Estado Comercial *
                  </label>
                  <select
                    value={editingApartment.status}
                    onChange={(e) => setEditingApartment({ ...editingApartment, status: e.target.value as ApartmentStatus })}
                    className="w-full px-3 py-1.5 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Separado">Separado</option>
                    <option value="Vendido">Vendido</option>
                  </select>
                </div>
              </div>

              {/* Price & Orientation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Precio COP ($) *
                  </label>
                  <input
                    type="number"
                    step={1000000}
                    required
                    value={editingApartment.priceCop}
                    onChange={(e) => setEditingApartment({ ...editingApartment, priceCop: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 bg-[#0B1320] border border-[#2A323D] rounded text-xs font-mono text-[#C5A880] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                    Orientación / Vista
                  </label>
                  <input
                    type="text"
                    value={editingApartment.orientation || ''}
                    onChange={(e) => setEditingApartment({ ...editingApartment, orientation: e.target.value })}
                    placeholder="Ej. Nororiente · Vista al mar"
                    className="w-full px-3 py-1.5 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              {/* Tagline & Description */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                  Subtítulo / Tagline Comercial
                </label>
                <input
                  type="text"
                  value={editingApartment.tagline}
                  onChange={(e) => setEditingApartment({ ...editingApartment, tagline: e.target.value })}
                  placeholder="Ej. Distribución balanceada con balcón panorámico hacia jardines interiores."
                  className="w-full px-3 py-1.5 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                  Descripción Arquitectónica
                </label>
                <textarea
                  rows={3}
                  value={editingApartment.description}
                  onChange={(e) => setEditingApartment({ ...editingApartment, description: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none resize-none"
                />
              </div>

              {/* Features (one per line) */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                  Características & Acabados (una por línea)
                </label>
                <textarea
                  rows={4}
                  value={editingApartment.features.join('\n')}
                  onChange={(e) =>
                    setEditingApartment({
                      ...editingApartment,
                      features: e.target.value.split('\n').filter((f) => f.trim().length > 0),
                    })
                  }
                  className="w-full px-3 py-1.5 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none font-mono"
                />
              </div>

              {/* Main Image URL */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#FAF9F6]/70 mb-1">
                  URL Imagen Principal
                </label>
                <input
                  type="text"
                  value={editingApartment.image}
                  onChange={(e) => setEditingApartment({ ...editingApartment, image: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#0B1320] border border-[#2A323D] rounded text-xs text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#2A323D]">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#FAF9F6]/60 hover:text-white transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
