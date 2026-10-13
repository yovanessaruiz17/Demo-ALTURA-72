import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/projectData';
import { GalleryItem } from '../types';

interface GalleryProps {
  onOpenLightbox: (itemIndex: number) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onOpenLightbox }) => {
  const [activeTab, setActiveTab] = useState<string>('Todos');

  const categories = ['Todos', 'Fachada & Lobby', 'Interiores', 'Exteriores'];

  const filteredItems =
    activeTab === 'Todos'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="galeria" className="py-24 sm:py-32 bg-[#0F172A] text-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium mb-3">
              <span>Registro Visual</span>
              <span aria-hidden="true" className="text-[#FAF9F6]/40">·</span>
              <span>Galería de Espacios</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF9F6]">
              Atmósferas que invitan <br />
              <span className="font-normal italic">a permanecer.</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0B1320] border border-[#2A323D] rounded-md self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === cat
                    ? 'bg-[#C5A880] text-[#0B1320] shadow-sm font-semibold'
                    : 'text-[#FAF9F6]/70 hover:text-[#FAF9F6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const originalIndex = GALLERY_ITEMS.findIndex((g) => g.id === item.id);
            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(originalIndex)}
                className="group relative rounded-md overflow-hidden bg-[#0B1320] border border-[#2A323D] aspect-[4/3] cursor-pointer hover:border-[#C5A880]/60 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-[#0B1320]/80 backdrop-blur-sm text-[#C5A880]">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium block mb-1">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-serif font-medium text-[#FAF9F6]">{item.title}</h3>
                  <p className="text-xs text-[#FAF9F6]/60 line-clamp-1 mt-1 font-light opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
