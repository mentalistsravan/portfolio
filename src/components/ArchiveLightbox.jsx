import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import {
  HeroPortraitVisual,
  ArtistPortraitVisual,
  PhilosophyCloseUpVisual,
  MirageVisual,
  PhysicHourVisual,
  SealedConfessionVisual,
  InsiderVisual,
  StagePerformanceVisual
} from './SravanVisuals';

export const ArchiveSection = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['ALL', 'PORTRAITS', 'PERFORMANCES', 'OBJECTS', 'STAGE', 'BEHIND THE SCENES', 'PRESS', 'VIDEO'];

  const archiveItems = [
    {
      id: 1,
      title: 'THE IMPOSSIBLE PORTRAIT',
      category: 'PORTRAITS',
      aspect: 'aspect-[3/4]',
      renderVisual: () => <HeroPortraitVisual className="h-full" />,
      year: '2025',
      location: 'STUDIO 01'
    },
    {
      id: 2,
      title: 'MIRAGE STAGE PERFORMANCE',
      category: 'PERFORMANCES',
      aspect: 'aspect-[16/9]',
      renderVisual: () => <MirageVisual className="h-full" />,
      year: '2025',
      location: 'THEATRE AUDITORIUM'
    },
    {
      id: 3,
      title: 'EYE & PERCEPTION DETAIL',
      category: 'PORTRAITS',
      aspect: 'aspect-square',
      renderVisual: () => <PhilosophyCloseUpVisual className="h-full" />,
      year: '2024',
      location: 'EDITORIAL GALLERY'
    },
    {
      id: 4,
      title: 'SEALED CONFESSION REVEAL',
      category: 'OBJECTS',
      aspect: 'aspect-[4/5]',
      renderVisual: () => <SealedConfessionVisual className="h-full" />,
      year: '2025',
      location: 'PRIVATE ARCHIVE'
    },
    {
      id: 5,
      title: 'PHYSIC HOUR LABORATORY',
      category: 'BEHIND THE SCENES',
      aspect: 'aspect-[16/10]',
      renderVisual: () => <PhysicHourVisual className="h-full" />,
      year: '2025',
      location: 'EXPERIMENTAL LAB'
    },
    {
      id: 6,
      title: 'INSIDER PARALLEL REFLECTIONS',
      category: 'STAGE',
      aspect: 'aspect-[4/3]',
      renderVisual: () => <InsiderVisual className="h-full" />,
      year: '2024',
      location: 'STAGE REHEARSAL'
    },
    {
      id: 7,
      title: 'THE ARTIST PROFILE',
      category: 'PORTRAITS',
      aspect: 'aspect-[3/4]',
      renderVisual: () => <ArtistPortraitVisual className="h-full" />,
      year: '2024',
      location: 'STUDIO EDITORIAL'
    },
    {
      id: 8,
      title: 'THE AUDITORIUM SPOTLIGHT',
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
    <section id="archive" className="w-full bg-[#050505] text-[#F2EFE9] px-6 md:px-12 py-24 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <span className="text-xs text-[#8E1018] tracking-[0.3em] uppercase font-cinzel mb-3 block">
          04 / THE ARCHIVE
        </span>
        <h2 className="text-4xl md:text-6xl font-serif tracking-tight uppercase mb-12">
          THE <br /> ARCHIVE
        </h2>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-12 border-b border-[#1a1a1a] pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-cinzel tracking-[0.2em] uppercase transition-all duration-300 py-1 px-3 rounded-full ${
                activeCategory === cat
                  ? 'bg-[#8E1018] text-[#F2EFE9]'
                  : 'text-[#B8B0A5] hover:text-[#F2EFE9] hover:bg-[#1a1a1a]'
              }`}
              data-cursor="FILTER"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className={`group relative overflow-hidden bg-[#111111] border border-[#1a1a1a] hover:border-[#8E1018]/60 transition-all duration-500 rounded-sm cursor-pointer ${item.aspect}`}
              data-cursor="VIEW"
            >
              {item.renderVisual()}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-20">
                <span className="text-[10px] text-[#8E1018] font-cinzel tracking-widest uppercase">
                  {item.category} • {item.year}
                </span>
                <h3 className="text-lg font-serif text-[#F2EFE9] tracking-wider uppercase mt-1">
                  {item.title}
                </h3>
                <span className="text-[10px] text-[#B8B0A5] tracking-widest uppercase mt-2 flex items-center gap-1">
                  FULLSCREEN LIGHTBOX <Maximize2 className="w-3 h-3 ml-1 text-[#8E1018]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Minimal Black Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100000] bg-[#050505] flex flex-col items-center justify-between p-6 md:p-12 animate-[fadeIn_0.3s_ease-out]">
          {/* Header Bar */}
          <div className="w-full flex items-center justify-between z-20">
            <div>
              <span className="text-xs text-[#8E1018] font-cinzel tracking-widest uppercase block">
                {selectedItem.category}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-[#F2EFE9] tracking-wider uppercase">
                {selectedItem.title}
              </h3>
            </div>
            <button
              onClick={closeLightbox}
              className="p-3 text-[#F2EFE9] hover:text-[#8E1018] transition-colors rounded-full border border-[#1a1a1a] hover:border-[#8E1018]"
              data-cursor="CLOSE"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Image/Visual Showcase */}
          <div className="relative w-full max-w-5xl h-[65vh] my-auto flex items-center justify-center border border-[#1a1a1a] rounded-sm overflow-hidden bg-[#080808]">
            {selectedItem.renderVisual()}
          </div>

          {/* Footer details */}
          <div className="w-full flex items-center justify-between text-xs text-[#B8B0A5] font-cinzel tracking-widest uppercase z-20 border-t border-[#1a1a1a] pt-4">
            <span>LOCATION: {selectedItem.location}</span>
            <span>YEAR: {selectedItem.year}</span>
            <span>MENTALIST SRAVAN ARCHIVE</span>
          </div>
        </div>
      )}
    </section>
  );
};
