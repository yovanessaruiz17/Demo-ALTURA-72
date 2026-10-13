import React from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  Ban,
  Users,
  Inbox,
  FileCheck2,
  DollarSign,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { ApartmentUnit, Advisor, Lead, SeparationRequest } from '../../types';

interface AdminDashboardProps {
  apartments: ApartmentUnit[];
  advisors: Advisor[];
  leads: Lead[];
  separations: SeparationRequest[];
  onNavigateTab: (tab: 'apartments' | 'advisors' | 'leads' | 'separations') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  apartments,
  advisors,
  leads,
  separations,
  onNavigateTab,
}) => {
  const totalUnits = apartments.length;
  const availableUnits = apartments.filter((a) => a.status === 'Disponible' || a.status === 'Últimas unidades').length;
  const separatedUnits = apartments.filter((a) => a.status === 'Separado').length;
  const soldUnits = apartments.filter((a) => a.status === 'Vendido').length;

  const newLeads = leads.filter((l) => l.status === 'Nuevo').length;
  const activeAdvisors = advisors.filter((a) => a.status === 'Activo' || !a.status).length;
  const pendingSeparations = separations.filter((s) => s.status === 'Pendiente' || s.status === 'En validación').length;

  const totalInventoryValue = apartments.reduce((acc, curr) => acc + (curr.priceCop || 0), 0);
  const soldValue = apartments
    .filter((a) => a.status === 'Vendido')
    .reduce((acc, curr) => acc + (curr.priceCop || 0), 0);
  const separatedValue = apartments
    .filter((a) => a.status === 'Separado')
    .reduce((acc, curr) => acc + (curr.priceCop || 0), 0);

  const formatCOP = (val: number) => `$${new Intl.NumberFormat('es-CO').format(val)} COP`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border border-[#2A323D] rounded-lg p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-medium block">
            Resumen General de Operaciones
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF9F6] mt-1">
            ALTURA 72 · Panel de Control
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF9F6]/70 mt-1 max-w-xl">
            Control de inventario de apartamentos en tiempo real, asignación de asesores comerciales y canalización de prospectos comerciales.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Inventario Activo
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B1320] border border-[#2A323D] text-[#C5A880]">
            Bocagrande, Cartagena
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Disponibles */}
        <div
          onClick={() => onNavigateTab('apartments')}
          className="bg-[#0F172A] border border-[#2A323D] hover:border-emerald-500/50 rounded-lg p-5 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#FAF9F6]/60">Disponibles</span>
            <div className="w-8 h-8 rounded-full bg-emerald-950/50 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#FAF9F6]">{availableUnits}</span>
            <span className="text-xs text-[#FAF9F6]/50">de {totalUnits} unidades</span>
          </div>
          <div className="mt-2 w-full bg-[#0B1320] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all"
              style={{ width: `${(availableUnits / (totalUnits || 1)) * 100}%` }}
            />
          </div>
          <span className="text-[11px] text-emerald-400/90 mt-3 inline-flex items-center gap-1 group-hover:underline">
            Ver catálogo <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Separados */}
        <div
          onClick={() => onNavigateTab('apartments')}
          className="bg-[#0F172A] border border-[#2A323D] hover:border-amber-500/50 rounded-lg p-5 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#FAF9F6]/60">Separados</span>
            <div className="w-8 h-8 rounded-full bg-amber-950/50 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#FAF9F6]">{separatedUnits}</span>
            <span className="text-xs text-[#FAF9F6]/50">en proceso fiduciario</span>
          </div>
          <div className="mt-2 w-full bg-[#0B1320] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all"
              style={{ width: `${(separatedUnits / (totalUnits || 1)) * 100}%` }}
            />
          </div>
          <span className="text-[11px] text-amber-400/90 mt-3 inline-flex items-center gap-1 group-hover:underline">
            Gestionar <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Vendidos */}
        <div
          onClick={() => onNavigateTab('apartments')}
          className="bg-[#0F172A] border border-[#2A323D] hover:border-rose-500/50 rounded-lg p-5 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#FAF9F6]/60">Vendidos</span>
            <div className="w-8 h-8 rounded-full bg-rose-950/50 text-rose-400 flex items-center justify-center">
              <Ban className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#FAF9F6]">{soldUnits}</span>
            <span className="text-xs text-[#FAF9F6]/50">escriturados</span>
          </div>
          <div className="mt-2 w-full bg-[#0B1320] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-rose-500 h-full rounded-full transition-all"
              style={{ width: `${(soldUnits / (totalUnits || 1)) * 100}%` }}
            />
          </div>
          <span className="text-[11px] text-rose-400/90 mt-3 inline-flex items-center gap-1 group-hover:underline">
            Ver ventas <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Leads Nuevos */}
        <div
          onClick={() => onNavigateTab('leads')}
          className="bg-[#0F172A] border border-[#2A323D] hover:border-[#C5A880]/60 rounded-lg p-5 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#FAF9F6]/60">Leads Nuevos</span>
            <div className="w-8 h-8 rounded-full bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#C5A880]">{newLeads}</span>
            <span className="text-xs text-[#FAF9F6]/50">de {leads.length} totales</span>
          </div>
          <div className="mt-2 w-full bg-[#0B1320] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#C5A880] h-full rounded-full transition-all"
              style={{ width: `${(newLeads / (leads.length || 1)) * 100}%` }}
            />
          </div>
          <span className="text-[11px] text-[#C5A880] mt-3 inline-flex items-center gap-1 group-hover:underline">
            Bandeja de prospectos <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Secondary Financial & Commercial Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Inventario Financiero */}
        <div className="bg-[#0F172A] border border-[#2A323D] rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#C5A880]" />
            <h3 className="text-base font-serif font-semibold text-[#FAF9F6]">
              Valorización del Proyecto
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-xs border-b border-[#2A323D]/60 pb-2">
              <span className="text-[#FAF9F6]/60">Valor Total Portafolio</span>
              <span className="font-mono text-[#FAF9F6] font-medium">{formatCOP(totalInventoryValue)}</span>
            </div>
            <div className="flex justify-between items-center text-xs border-b border-[#2A323D]/60 pb-2">
              <span className="text-emerald-400/90">Monto Vendido</span>
              <span className="font-mono text-emerald-400 font-medium">{formatCOP(soldValue)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-amber-400/90">Monto en Separación</span>
              <span className="font-mono text-amber-400 font-medium">{formatCOP(separatedValue)}</span>
            </div>
          </div>
        </div>

        {/* Asesores y Separaciones */}
        <div className="bg-[#0F172A] border border-[#2A323D] rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#C5A880]" />
            <h3 className="text-base font-serif font-semibold text-[#FAF9F6]">
              Equipo Comercial & Solicitudes
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-xs border-b border-[#2A323D]/60 pb-2">
              <span className="text-[#FAF9F6]/60">Asesores Activos</span>
              <span className="text-[#FAF9F6] font-semibold">{activeAdvisors} asignados</span>
            </div>
            <div className="flex justify-between items-center text-xs border-b border-[#2A323D]/60 pb-2">
              <span className="text-[#FAF9F6]/60">Solicitudes de Separación</span>
              <span className="text-[#C5A880] font-semibold">{separations.length} recibidas</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#FAF9F6]/60">Separaciones por Validar</span>
              <span className="text-amber-400 font-semibold">{pendingSeparations} pendientes</span>
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="bg-[#0F172A] border border-[#2A323D] rounded-lg p-6 space-y-3">
          <h3 className="text-base font-serif font-semibold text-[#FAF9F6]">
            Acciones Rápidas
          </h3>
          <p className="text-xs text-[#FAF9F6]/60">
            Gestiona la torre y el embudo de ventas en un clic:
          </p>
          <div className="space-y-2 pt-1">
            <button
              onClick={() => onNavigateTab('apartments')}
              className="w-full py-2 px-3 bg-[#0B1320] hover:bg-[#1E293B] border border-[#2A323D] rounded text-xs text-[#FAF9F6] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>+ Crear o editar apartamento</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </button>
            <button
              onClick={() => onNavigateTab('leads')}
              className="w-full py-2 px-3 bg-[#0B1320] hover:bg-[#1E293B] border border-[#2A323D] rounded text-xs text-[#FAF9F6] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Gestionar leads ({newLeads} nuevos)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </button>
            <button
              onClick={() => onNavigateTab('separations')}
              className="w-full py-2 px-3 bg-[#0B1320] hover:bg-[#1E293B] border border-[#2A323D] rounded text-xs text-[#FAF9F6] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Revisar solicitudes de separación</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </button>
          </div>
        </div>
      </div>

      {/* Actividad Reciente */}
      <div className="bg-[#0F172A] border border-[#2A323D] rounded-lg p-6">
        <h3 className="text-base font-serif font-semibold text-[#FAF9F6] mb-4">
          Prospectos y Solicitudes Recientes
        </h3>
        <div className="space-y-3">
          {leads.slice(0, 4).map((lead) => (
            <div
              key={lead.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#0B1320] border border-[#2A323D]/60 rounded text-xs gap-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C5A880]/10 text-[#C5A880] flex items-center justify-center font-bold font-serif shrink-0">
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-[#FAF9F6]">{lead.name}</div>
                  <div className="text-[#FAF9F6]/60 text-[11px]">
                    Interesado en {lead.apartment} · Asesor: {lead.advisor}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                    lead.status === 'Nuevo'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                      : lead.status === 'Contactado'
                      ? 'bg-sky-950/60 text-sky-400 border border-sky-500/40'
                      : lead.status === 'En seguimiento'
                      ? 'bg-amber-950/60 text-amber-400 border border-amber-500/40'
                      : 'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  {lead.status}
                </span>
                <span className="text-[11px] text-[#FAF9F6]/40">
                  {new Date(lead.createdAt).toLocaleDateString('es-CO', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
