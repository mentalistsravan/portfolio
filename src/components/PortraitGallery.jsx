import React, { useState } from 'react';
import { X, Maximize2, Sparkles, ExternalLink } from 'lucide-react';
import {
  sravanSpotlight,
  sravanHandsSuit,
  sravanSideProfile,
  sravanBalconyHarbor,
  sravanNeonDuotone,
  sravanTriple,
  InstagramIcon
} from './SravanVisuals';

export const PortraitGallery = () => {
  const [activeCategory, setActiveCategory] = useState('ALL PORTRAITS');
  const [selectedPortrait, setSelectedPortrait] = useState(null);

  const categories = ['ALL PORTRAITS', 'STUDIO', 'THEATRICAL', 'CINEMATIC', 'NEON & STAGE'];

  const galleryItems = [
    {
      id: 'spotlight',
      title: 'THE SPOTLIGHT',
      category: 'THEATRICAL',
      image: sravanSpotlight,
      aspect: 'aspect-[3/4]',
      year: '2025',
      location: 'STAGE STUDIO',
      description: 'Mentalist Sravan under single-source stage lighting, capturing the dramatic tension between light, shadow and perception.'
    },
    {
      id: 'hands-suit',
      title: 'INTIMATE OBSERVER',
      category: 'STUDIO',
      image: sravanHandsSuit,
      aspect: 'aspect-[3/4]',
      year: '2025',
      location: 'DARK STUDIO',
      description: 'A quiet moment of psychological focus. Mind reading built around perception, choice, and human behavior.'
    },
    {
      id: 'neon-duotone',
      title: 'MIRAGE ILLUSION',
      category: 'NEON & STAGE',
      image: sravanNeonDuotone,
      aspect: 'aspect-[3/4]',
      year: '2025',
      location: 'THEATRICAL LIGHTS',
      description: 'Cyan and crimson dual rim lighting — a striking visual embodiment of MIRAGE and perception.'
    },
    {
      id: 'balcony-harbor',
      title: 'MIST & HARBOR',
      category: 'CINEMATIC',
      image: sravanBalconyHarbor,
      aspect: 'aspect-square',
      year: '2025',
      location: 'HARBOR OVERLOOK',
      description: 'Standing above misty waters, reflecting on time, coincidence, and unscripted choices.'
    },
    {
      id: 'side-profile',
      title: 'THE SHADOW PROFILE',
      category: 'STUDIO',
      image: sravanSideProfile,
      aspect: 'aspect-[3/4]',
      year: '2025',
      location: 'PROFILE PORTRAIT',
      description: 'Exploring the mysterious boundaries between what we know and what we think we know.'
    },
    {
      id: 'royale-triple',
      title: 'THE TRIPLE PORTRAIT',
      category: 'STUDIO',
      image: sravanTriple,
      aspect: 'aspect-[3/4]',
      year: '2025',
      location: 'ROYAL STUDIO',
      description: 'Cards, mask, and Rubik\'s cube convergence — signature portrait of Mentalist Sravan.'
    }
  ];

  const filteredItems = activeCategory === 'ALL PORTRAITS'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="portraits" className="w-full bg-black text-[#F2EFE9] px-6 md:px-12 py-28 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel mb-2 block">
              03 / VISUAL GALLERY
            </span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight uppercase text-[#F2EFE9]">
              PORTRAIT <span className="italic text-[#C5A059]">GALLERY</span>
            </h2>
          </div>

          <div className="text-xs font-cinzel tracking-widest text-[#B8B0A5] uppercase italic max-w-xs">
            "Capturing moments where psychology, theatre and presence collide."
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 border-b border-white/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-cinzel tracking-[0.2em] uppercase transition-all duration-300 py-2.5 px-5 rounded-sm ${
                activeCategory === cat
                  ? 'bg-[#C5A059] text-black font-bold shadow-lg'
                  : 'text-[#B8B0A5] hover:text-[#F2EFE9] border border-white/10 hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Layout for Portraits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPortrait(item)}
              className="group relative bg-black border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#C5A059]/60"
            >
              <div className={`w-full ${item.aspect} overflow-hidden bg-black`}>
                <img
                  src={item.image}
                  alt=""
                  role="presentation"
                  className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700"
                />
              </div>

              {/* Gradient Overlay & Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-between p-6 pointer-events-none">
                <div className="flex items-center justify-between text-[10px] text-[#C5A059] font-cinzel tracking-widest uppercase">
                  <span>{item.category}</span>
                  <span>{item.year}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-serif text-[#F2EFE9] tracking-wider uppercase group-hover:text-[#C5A059] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#B8B0A5] font-light line-clamp-2">
                    {item.description}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-[10px] text-[#C5A059] font-cinzel tracking-widest uppercase font-semibold">
                    <Maximize2 className="w-3 h-3" /> VIEW FULL HIGH-RES PORTRAIT
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPortrait && (
        <div className="fixed inset-0 z-[100000] bg-black/95 flex flex-col items-center justify-between p-4 md:p-8 animate-[fadeIn_0.2s_ease-out]">
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between max-w-5xl z-20">
            <div>
              <span className="text-xs text-[#C5A059] font-cinzel tracking-widest uppercase block">
                {selectedPortrait.category} • {selectedPortrait.location}
              </span>
              <h3 className="text-xl md:text-3xl font-serif text-[#F2EFE9] tracking-wider uppercase">
                {selectedPortrait.title}
              </h3>
            </div>
            <button
              onClick={() => setSelectedPortrait(null)}
              className="p-3 text-[#F2EFE9] hover:text-[#C5A059] transition-colors rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Image View */}
          <div className="relative w-full max-w-5xl max-h-[75vh] my-auto flex items-center justify-center overflow-hidden">
            <img
              src={selectedPortrait.image}
              alt=""
              role="presentation"
              className="max-w-full max-h-[75vh] object-contain shadow-2xl filter brightness-105 contrast-105"
            />
          </div>

          {/* Bottom Bar */}
          <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8B0A5] font-cinzel tracking-widest uppercase z-20 border-t border-white/10 pt-4">
            <p className="text-xs text-[#B8B0A5] font-light max-w-lg">
              {selectedPortrait.description}
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#booking"
                onClick={() => setSelectedPortrait(null)}
                className="px-6 py-3 bg-[#C5A059] hover:bg-[#8E1018] text-black hover:text-[#F2EFE9] text-xs font-cinzel tracking-[0.2em] uppercase font-bold transition-all rounded-sm"
              >
                BOOK SRAVAN
              </a>
              <a
                href="https://www.instagram.com/mentalist_sravan/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 border border-white/20 hover:border-white text-[#F2EFE9] text-xs font-cinzel tracking-[0.2em] uppercase transition-all flex items-center gap-2 rounded-sm"
              >
                <InstagramIcon className="w-4 h-4 text-[#C5A059]" /> INSTAGRAM <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
