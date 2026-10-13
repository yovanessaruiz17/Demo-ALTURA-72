import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  Inbox,
  FileCheck2,
  LogOut,
  ExternalLink,
  RotateCcw,
  Database,
  Shield,
} from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { ApartmentsManager } from './ApartmentsManager';
import { AdvisorsManager } from './AdvisorsManager';
import { LeadsManager } from './LeadsManager';
import { SeparationsManager } from './SeparationsManager';
import {
  getApartments,
  getAdvisors,
  getLeads,
  getSeparations,
  resetDataToDefaults,
  subscribeToDataChanges,
} from '../../services/dataService';
import { isSupabaseConfigured } from '../../services/supabase';
import { ApartmentUnit, Advisor, Lead, SeparationRequest } from '../../types';

interface AdminLayoutProps {
  onBackToPublic: () => void;
  onLogout: () => void;
  onToast: (msg: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  onBackToPublic,
  onLogout,
  onToast,
}) => {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'apartments' | 'advisors' | 'leads' | 'separations'>('dashboard');

  const [apartments, setApartments] = useState<ApartmentUnit[]>([]);
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [separations, setSeparations] = useState<SeparationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isSupabaseActive = isSupabaseConfigured();

  const loadAllData = async () => {
    try {
      const [apts, advs, lds, seps] = await Promise.all([
        getApartments(),
        getAdvisors(),
        getLeads(),
        getSeparations(),
      ]);
      setApartments(apts);
      setAdvisors(advs);
      setLeads(lds);
      setSeparations(seps);
    } catch (e) {
      console.error('Error loading admin data', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
    const unsubscribe = subscribeToDataChanges(() => {
      loadAllData();
    });
    return () => unsubscribe();
  }, []);

  const handleReset = async () => {
    if (window.confirm('¿Deseas restablecer los datos del inventario, prospectos y solicitudes a los valores iniciales de demostración?')) {
      await resetDataToDefaults();
      onToast('Datos restablecidos a los valores originales.');
      loadAllData();
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'apartments',
      label: 'Apartamentos',
      icon: Building2,
      badge: apartments.length,
    },
    {
      id: 'advisors',
      label: 'Asesores',
      icon: Users,
      badge: advisors.length,
    },
    {
      id: 'leads',
      label: 'Leads',
      icon: Inbox,
      badge: leads.filter((l) => l.status === 'Nuevo').length,
    },
    {
      id: 'separations',
      label: 'Solicitudes',
      icon: FileCheck2,
      badge: separations.filter((s) => s.status === 'Pendiente').length,
    },
  ];

  return (
    <div className="min-h-screen bg-[#070D18] text-[#FAF9F6] flex flex-col font-sans">
      {/* Top Admin Bar */}
      <header className="bg-[#0B1320] border-b border-[#2A323D] sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] font-serif font-bold text-sm">
            72
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold tracking-wider text-[#FAF9F6] text-sm sm:text-base">
                ALTURA 72
              </span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#1E293B] text-[#C5A880] border border-[#2A323D]">
                Admin
              </span>
            </div>
            <span className="text-[10px] text-[#FAF9F6]/50 block">
              Sistema de Gestión Inmobiliaria · YorDev
            </span>
          </div>
        </div>

        {/* Database mode & Action buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] border ${
              isSupabaseActive
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                : 'bg-[#1E293B] text-[#FAF9F6]/75 border-[#2A323D]'
            }`}
            title={
              isSupabaseActive
                ? 'Sincronización activa con Supabase'
                : 'Operando con almacenamiento local persistente (LocalStorage)'
            }
          >
            <Database className="w-3.5 h-3.5" />
            <span>{isSupabaseActive ? 'Supabase Conectado' : 'Almacenamiento Local Activo'}</span>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 sm:px-2.5 sm:py-1 text-[#FAF9F6]/60 hover:text-[#C5A880] hover:bg-white/5 rounded text-xs transition-colors flex items-center gap-1 cursor-pointer"
            title="Restablecer datos demo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Restablecer Demo</span>
          </button>

          <button
            onClick={onBackToPublic}
            className="p-1.5 sm:px-3 sm:py-1.5 bg-[#1E293B] hover:bg-[#2A323D] text-[#FAF9F6] rounded text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="hidden sm:inline">Ver Sitio Público</span>
          </button>

          <button
            onClick={onLogout}
            className="p-1.5 sm:px-3 sm:py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 rounded text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Cerrar sesión administrativa"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-[#0B1320]/80 border-b border-[#2A323D] px-4 sm:px-8 overflow-x-auto">
        <nav className="flex space-x-1 sm:space-x-6 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={`py-3 px-3 text-xs uppercase tracking-wider font-medium border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#C5A880] text-[#C5A880]'
                    : 'border-transparent text-[#FAF9F6]/60 hover:text-[#FAF9F6] hover:border-[#2A323D]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#C5A880] text-[#0B1320]' : 'bg-[#1E293B] text-[#FAF9F6]/80'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
        {isLoading ? (
          <div className="py-20 text-center text-[#FAF9F6]/50 space-y-2">
            <div className="w-6 h-6 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs">Cargando base de datos de ALTURA 72...</p>
          </div>
        ) : (
          <>
            {currentTab === 'dashboard' && (
              <AdminDashboard
                apartments={apartments}
                advisors={advisors}
                leads={leads}
                separations={separations}
                onNavigateTab={(t) => setCurrentTab(t)}
              />
            )}

            {currentTab === 'apartments' && (
              <ApartmentsManager
                apartments={apartments}
                onReload={loadAllData}
                onToast={onToast}
              />
            )}

            {currentTab === 'advisors' && (
              <AdvisorsManager
                advisors={advisors}
                onReload={loadAllData}
                onToast={onToast}
              />
            )}

            {currentTab === 'leads' && (
              <LeadsManager
                leads={leads}
                onReload={loadAllData}
                onToast={onToast}
              />
            )}

            {currentTab === 'separations' && (
              <SeparationsManager
                separations={separations}
                onReload={loadAllData}
                onToast={onToast}
              />
            )}
          </>
        )}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-[#2A323D] bg-[#0B1320] py-4 px-4 sm:px-8 text-center text-[11px] text-[#FAF9F6]/40">
        ALTURA 72 · Desarrollado por YorDev. Modo demostrativo seguro y arquitectura lista para Supabase.
      </footer>
    </div>
  );
};
