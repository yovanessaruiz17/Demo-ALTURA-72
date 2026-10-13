import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#0F172A] border border-[#C5A880]/40 text-[#FAF9F6] p-4 rounded-md shadow-2xl flex items-start gap-3 animate-fadeIn">
      <CheckCircle2 className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
      <div className="text-xs sm:text-sm text-[#FAF9F6]/90 leading-relaxed pr-2">
        {message}
      </div>
      <button
        onClick={onClose}
        className="text-[#FAF9F6]/40 hover:text-white transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
