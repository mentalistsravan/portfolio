import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';
import {
  HeroTriplePortraitVisual,
  HistoryShowVisual,
  MirageVisual,
  InsiderVisual,
  StagePerformanceVisual,
  sravanTriple
} from './SravanVisuals';

export const ArchiveSection = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['ALL', 'PORTRAITS', 'PRODUCTION', 'STAGE', 'THEATRE'];

  const archiveItems = [
    {
      id: 1,
      title: 'THE TRIPLE PORTRAIT OF PERCEPTION',
      category: 'PORTRAITS',
      aspect: 'aspect-square',
      renderVisual: () => (
        <div className="w-full h-full bg-[#050505] p-2 flex items-center justify-center">
          <img src={sravanTriple} alt="Mentalist Sravan Triple Portrait" className="w-full h-full object-contain" />
        </div>
      ),
      year: '2025',
      location: 'ROYAL STUDIO'
    },
    {
      id: 2,
      title: 'HISTORY SHOW — THE IMPOSSIBLE TIME CHRONICLE',
      category: 'PRODUCTION',
      aspect: 'aspect-[16/9]',
      renderVisual: () => <HistoryShowVisual className="h-full" />,
      year: '2025',
      location: 'GRAND THEATRE'
    },
    {
      id: 3,
      title: 'MIRAGE — PERCEPTION SHOW',
      category: 'THEATRE',
      aspect: 'aspect-[4/3]',
      renderVisual: () => <MirageVisual className="h-full" />,
      year: '2025',
      location: 'ROYAL AUDITORIUM'
    },
    {
      id: 4,
      title: 'INSIDER — THE MYSTERY OF PARALLELS',
      category: 'PRODUCTION',
      aspect: 'aspect-[4/3]',
      renderVisual: () => <InsiderVisual className="h-full" />,
      year: '2024',
      location: 'STAGE REHEARSAL'
    },
    {
      id: 5,
      title: 'LIVE STAGE PERFORMANCE SPOTLIGHT',
      category: 'STAGE',
      aspect: 'aspect-[16/9]',
      renderVisual: () => <StagePerformanceVisual className="h-full" />,
      year: '2025',
      location: 'LIVE VENUE'
    }
  ];

  const filteredItems = activeCategory === 'ALL'
    ? archiveItems
    : archiveItems.filter(item => item.category === activeCategory);

  const openLightbox = (item) => setSelectedItem(item);
  const closeLightbox = () => setSelectedItem(null);

  return (
    <section id="archive" className="w-full bg-[#050505] text-[#F2EFE9] px-6 md:px-12 py-28 border-t-2 border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto">
        <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel mb-3 block">
          THE ARCHIVE
        </span>
        <h2 className="text-4xl md:text-6xl font-serif tracking-tight uppercase mb-12 text-[#F2EFE9]">
          THE <span className="italic text-[#C5A059]">ARCHIVE</span>
        </h2>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-12 border-b border-[#C5A059]/20 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-cinzel tracking-[0.2em] uppercase transition-all duration-300 py-1.5 px-4 rounded-sm border ${
                activeCategory === cat
                  ? 'bg-[#C5A059] text-[#050505] border-[#C5A059] font-bold shadow-lg'
                  : 'text-[#B8B0A5] hover:text-[#F2EFE9] border-[#1a1a1a] hover:border-[#C5A059]/40'
              }`}
              data-cursor="FILTER"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className={`group relative overflow-hidden bg-[#080808] border-2 border-[#C5A059]/30 hover:border-[#C5A059] transition-all duration-500 rounded-sm cursor-pointer ${item.aspect}`}
              data-cursor="VIEW"
            >
              {item.renderVisual()}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-20">
                <span className="text-[10px] text-[#C5A059] font-cinzel tracking-widest uppercase">
                  {item.category} • {item.year}
                </span>
                <h3 className="text-lg font-serif text-[#F2EFE9] tracking-wider uppercase mt-1">
                  {item.title}
                </h3>
                <span className="text-[10px] text-[#B8B0A5] tracking-widest uppercase mt-2 flex items-center gap-1">
                  FULLSCREEN LIGHTBOX <Maximize2 className="w-3 h-3 ml-1 text-[#C5A059]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Minimal Black Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100000] bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-between p-6 md:p-12 animate-[fadeIn_0.3s_ease-out]">
          {/* Header Bar */}
          <div className="w-full flex items-center justify-between z-20 max-w-5xl">
            <div>
              <span className="text-xs text-[#C5A059] font-cinzel tracking-widest uppercase block">
                {selectedItem.category}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-[#F2EFE9] tracking-wider uppercase">
                {selectedItem.title}
              </h3>
            </div>
            <button
              onClick={closeLightbox}
              className="p-3 text-[#F2EFE9] hover:text-[#C5A059] transition-colors rounded-full border border-[#C5A059]/40 hover:border-[#C5A059]"
              data-cursor="CLOSE"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Image/Visual Showcase */}
          <div className="relative w-full max-w-5xl h-[65vh] my-auto flex items-center justify-center border-2 border-[#C5A059]/40 rounded-sm overflow-hidden bg-[#080808] p-4">
            {selectedItem.renderVisual()}
          </div>

          {/* Footer details */}
          <div className="w-full flex items-center justify-between text-xs text-[#B8B0A5] font-cinzel tracking-widest uppercase z-20 border-t border-[#C5A059]/30 pt-4 max-w-5xl">
            <span>LOCATION: {selectedItem.location}</span>
            <span>YEAR: {selectedItem.year}</span>
            <span>MENTALIST SRAVAN ARCHIVE</span>
          </div>
        </div>
      )}
    </section>
  );
};
