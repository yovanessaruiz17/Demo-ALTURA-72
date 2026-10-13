import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToPublic: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToPublic }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const correctPassword = import.meta.env.VITE_ADMIN_PASS || 'admin72';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (password.trim() === correctPassword) {
        sessionStorage.setItem('altura72_admin_auth', 'true');
        onLoginSuccess();
      } else {
        setError('Contraseña incorrecta. (Prueba con "admin72" para demo)');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#070D18] flex items-center justify-center p-4 sm:p-6 text-[#FAF9F6]">
      <div className="w-full max-w-md bg-[#0F172A] border border-[#2A323D] rounded-lg shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onBackToPublic}
          className="inline-flex items-center gap-1.5 text-xs text-[#FAF9F6]/60 hover:text-[#C5A880] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al sitio público</span>
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] mx-auto mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-medium block">
            ALTURA 72 · Gestión Comercial
          </span>
          <h1 className="text-2xl font-serif font-semibold text-[#FAF9F6] mt-1">
            Portal Administrativo
          </h1>
          <p className="text-xs text-[#FAF9F6]/60 mt-1.5">
            Acceso restringido para control de inventario, asesores y seguimiento de leads.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#FAF9F6]/70 mb-1.5">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña maestra"
                className="w-full px-3.5 py-2.5 bg-[#0B1320] border border-[#2A323D] rounded text-sm text-[#FAF9F6] focus:border-[#C5A880] focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FAF9F6]/40 hover:text-[#FAF9F6] transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-xs text-rose-400 mt-1.5">{error}</p>}
          </div>

          <div className="p-3 bg-[#0B1320]/80 border border-[#2A323D]/60 rounded text-[11px] text-[#FAF9F6]/60 flex items-start gap-2">
            <KeyRound className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#FAF9F6]/90 block">Credencial Demo para evaluación:</strong>
              Usa <code className="text-[#C5A880] font-mono bg-black/40 px-1 py-0.5 rounded">admin72</code> para acceder al panel.
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-[#C5A880] hover:bg-[#DFC8A8] text-[#0B1320] text-xs font-semibold uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {isLoading ? (
              <span>Verificando...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Ingresar al Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-[11px] text-[#FAF9F6]/40 border-t border-[#2A323D]/60 pt-4">
          ALTURA 72 · Plataforma Inmobiliaria desarrollada por YorDev
        </div>
      </div>
    </div>
  );
};
