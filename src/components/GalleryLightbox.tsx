import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
    };

    if (currentIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null) return null;
  const currentItem = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fadeIn">
      {/* Top Bar with title & close */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880]">
            Galería ALTURA 72 · {currentItem.tag}
          </span>
          <h3 className="text-lg sm:text-xl font-serif text-[#FAF9F6]">{currentItem.title}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Cerrar galería"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image View */}
      <div className="relative max-w-5xl max-h-[75vh] w-full mx-4 flex items-center justify-center">
        <img
          src={currentItem.image}
          alt={currentItem.title}
          referrerPolicy="no-referrer"
          className="max-h-[75vh] max-w-full object-contain rounded shadow-2xl"
        />

        {/* Previous Button */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
          className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-[#C5A880] text-white hover:text-[#0B1320] transition-colors cursor-pointer"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => onNavigate((currentIndex + 1) % items.length)}
          className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-[#C5A880] text-white hover:text-[#0B1320] transition-colors cursor-pointer"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption & Index */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-center">
        <p className="text-sm text-[#FAF9F6]/80 max-w-xl mx-auto mb-2">
          {currentItem.description}
        </p>
        <span className="text-xs text-[#FAF9F6]/50 tracking-widest tabular-nums">
          {currentIndex + 1} / {items.length}
        </span>
      </div>
    </div>
  );
};
