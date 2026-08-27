import React, { useState } from 'react';
import { X, Play, ExternalLink, Film, Sparkles } from 'lucide-react';
import {
  HeroTriplePortraitVisual,
  HistoryShowVisual,
  MirageVisual,
  InsiderVisual,
  StagePerformanceVisual,
  sravanTriple,
  LogoEmblem,
  InstagramIcon
} from './SravanVisuals';

export const ArchiveSection = () => {
  const [activeCategory, setActiveCategory] = useState('ALL MEDIA');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['ALL MEDIA', 'INSTAGRAM REELS', 'LIVE PERFORMANCES', 'IMPROV ACTS', 'PORTRAITS'];

  const archiveItems = [
    {
      id: 'reel-kochi',
      title: 'CRAZY MIND MAGIC @ KOCHI',
      category: 'INSTAGRAM REELS',
      type: 'video',
      instagramUrl: 'https://www.instagram.com/mentalist_sravan/',
      aspect: 'aspect-[9/16] sm:aspect-square',
      description: 'Live mind reading encounter with an audience member in Kochi, revealing unspoken personal thoughts in real-time.',
      year: '2025',
      location: 'KOCHI, INDIA',
      renderPreview: () => (
        <div className="relative w-full h-full bg-[#080808] overflow-hidden flex flex-col justify-between p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#24140b_0%,_#050505_90%)]" />
          <div className="relative z-10 flex items-center justify-between text-xs text-[#C5A059] font-cinzel tracking-widest">
            <span className="flex items-center gap-1.5"><InstagramIcon className="w-4 h-4 text-[#8E1018]" /> REEL</span>
            <span>2025</span>
          </div>
          <div className="relative z-10 my-auto text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#8E1018] text-[#F2EFE9] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 ml-1 fill-current" />
            </div>
            <h4 className="text-xl font-serif text-[#F2EFE9] uppercase tracking-wider">CRAZY MIND MAGIC</h4>
            <span className="text-[10px] text-[#C5A059] font-cinzel tracking-widest uppercase block">@KOCHI • LIVE REEL</span>
          </div>
          <div className="relative z-10 text-[10px] text-[#B8B0A5] font-mono tracking-widest flex items-center justify-between">
            <span>INSTAGRAM REEL</span>
            <span className="text-[#C5A059] flex items-center gap-1">WATCH ↗</span>
          </div>
        </div>
      )
    },
    {
      id: 'improv-act',
      title: 'INDIA\'S FIRST IMPROV MENTALISM ACT',
      category: 'IMPROV ACTS',
      type: 'video',
      instagramUrl: 'https://www.instagram.com/mentalist_sravan/',
      aspect: 'aspect-[16/9]',
      description: 'An unscripted live mentalism act where spectator choices directly shape the climax of the performance.',
      year: '2025',
      location: 'LIVE STAGE',
      renderPreview: () => (
        <div className="relative w-full h-full bg-[#080808] overflow-hidden flex flex-col justify-between p-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1c1308_0%,_#050505_95%)]" />
          <div className="relative z-10 flex items-center justify-between text-xs text-[#C5A059] font-cinzel tracking-widest">
            <span className="flex items-center gap-1.5"><Film className="w-4 h-4 text-[#C5A059]" /> IMPROV SHOW</span>
            <span>SPECIAL</span>
          </div>
          <div className="relative z-10 my-auto text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#C5A059] text-[#050505] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 ml-1 fill-current" />
            </div>
            <h4 className="text-xl font-serif text-[#F2EFE9] uppercase tracking-wider">IMPROV MENTALISM ACT</h4>
            <p className="text-xs text-[#B8B0A5] italic max-w-sm mx-auto font-light">"First Unscripted Live Mentalism Performance in India"</p>
          </div>
          <div className="relative z-10 text-[10px] text-[#B8B0A5] font-mono tracking-widest flex items-center justify-between">
            <span>LIVE RECORDING</span>
            <span className="text-[#C5A059]">VIEW EMBED ↗</span>
          </div>
        </div>
      )
    },
    {
      id: 'tic-tac-toe',
      title: 'MIND GAME — TIC TAC TOE PREDICTION',
      category: 'INSTAGRAM REELS',
      type: 'video',
      instagramUrl: 'https://www.instagram.com/mentalist_sravan/',
      aspect: 'aspect-square',
      description: 'A psychological prediction game played out on a Tic-Tac-Toe grid with a mind-bending audience reveal.',
      year: '2024',
      location: 'STUDIO & STAGE',
      renderPreview: () => (
        <div className="relative w-full h-full bg-[#080808] overflow-hidden flex flex-col justify-between p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#2b0d13_0%,_#050505_90%)]" />
          <div className="relative z-10 flex items-center justify-between text-xs text-[#C5A059] font-cinzel tracking-widest">
            <span className="flex items-center gap-1.5"><InstagramIcon className="w-4 h-4 text-[#8E1018]" /> REEL</span>
            <span>2024</span>
          </div>
          <div className="relative z-10 my-auto text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#8E1018] text-[#F2EFE9] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            </div>
            <h4 className="text-lg font-serif text-[#F2EFE9] uppercase tracking-wider">TIC TAC TOE GAME</h4>
            <span className="text-[10px] text-[#C5A059] font-cinzel tracking-widest uppercase block">PSYCHOLOGICAL PREDICTION</span>
          </div>
          <div className="relative z-10 text-[10px] text-[#B8B0A5] font-mono tracking-widest flex items-center justify-between">
            <span>INSTAGRAM POST</span>
            <span className="text-[#C5A059]">WATCH ↗</span>
          </div>
        </div>
      )
    },
    {
      id: 'triple-portrait-embed',
      title: 'THE ROYALE TRIPLE PORTRAIT',
      category: 'PORTRAITS',
      type: 'photo',
      instagramUrl: 'https://www.instagram.com/mentalist_sravan/',
      aspect: 'aspect-square',
      description: 'Mentalist Sravan capturing cards, the jester mask, and Rubik\'s cube in a sharp black suit.',
      year: '2025',
      location: 'ROYAL STUDIO',
      renderPreview: () => (
        <div className="relative w-full h-full bg-[#050505] p-2 flex items-center justify-center">
          <img src={sravanTriple} alt="Mentalist Sravan Triple Portrait" className="w-full h-full object-contain filter brightness-105 contrast-110" />
          <div className="absolute top-4 right-4 bg-[#050505]/80 px-2 py-1 border border-[#C5A059]/40 rounded text-[9px] text-[#C5A059] font-cinzel">
            INSTAGRAM PHOTO
          </div>
        </div>
      )
    },
    {
      id: 'conversational-act',
      title: 'CONVERSATIONAL MENTALISM',
      category: 'IMPROV ACTS',
      type: 'video',
      instagramUrl: 'https://www.instagram.com/mentalist_sravan/',
      aspect: 'aspect-[4/3]',
      description: 'Intimate psychological illusions conducted purely through conversational cues and subtle eye movements.',
      year: '2025',
      location: 'INTIMATE VENUE',
      renderPreview: () => (
        <div className="relative w-full h-full bg-[#080808] overflow-hidden flex flex-col justify-between p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a150b_0%,_#050505_95%)]" />
          <div className="relative z-10 flex items-center justify-between text-xs text-[#C5A059] font-cinzel tracking-widest">
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#C5A059]" /> SPECIAL</span>
            <span>2025</span>
          </div>
          <div className="relative z-10 my-auto text-center space-y-2">
            <h4 className="text-xl font-serif text-[#F2EFE9] uppercase tracking-wider">CONVERSATIONAL ACT</h4>
            <p className="text-xs text-[#B8B0A5] font-light italic max-w-xs mx-auto">"Unfiltered perception through human conversation"</p>
          </div>
          <div className="relative z-10 text-[10px] text-[#B8B0A5] font-mono tracking-widest flex items-center justify-between">
            <span>INSTAGRAM MEDIA</span>
            <span className="text-[#C5A059]">VIEW EMBED ↗</span>
          </div>
        </div>
      )
    },
    {
      id: 'history-production-embed',
      title: 'HISTORY SHOW — LIVE STAGE CHRONICLE',
      category: 'LIVE PERFORMANCES',
      type: 'video',
      instagramUrl: 'https://www.instagram.com/mentalist_sravan/',
      aspect: 'aspect-[16/9]',
      description: 'Grand theatre stage production decoding forgotten historical choices and timelines live on stage.',
      year: '2025',
      location: 'GRAND AUDITORIUM',
      renderPreview: () => <HistoryShowVisual className="h-full" />
    }
  ];

  const filteredItems = activeCategory === 'ALL MEDIA'
    ? archiveItems
    : archiveItems.filter(item => item.category === activeCategory);

  const openLightbox = (item) => setSelectedItem(item);
  const closeLightbox = () => setSelectedItem(null);

  return (
    <section id="archive" className="w-full bg-[#050505] text-[#F2EFE9] px-6 md:px-12 py-28 border-t-2 border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Instagram Profile Header Banner */}
        <div className="bg-[#080808] border-2 border-[#C5A059]/40 p-8 md:p-10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059] opacity-5 blur-[120px] pointer-events-none rounded-full" />

          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full border-2 border-[#C5A059] p-1 bg-[#050505] flex items-center justify-center shrink-0 shadow-xl">
              <LogoEmblem className="h-10 w-auto" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-cinzel font-bold tracking-wider text-[#F2EFE9]">
                  @mentalist_sravan
                </h3>
                <span className="w-4 h-4 bg-[#8E1018] rounded-full flex items-center justify-center text-[10px] text-[#F2EFE9] font-bold">
                  ✓
                </span>
              </div>
              <p className="text-xs text-[#C5A059] font-cinzel tracking-widest uppercase mt-1">
                INSTAGRAM ARCHIVE & LIVE REELS
              </p>
              <p className="text-xs text-[#B8B0A5] font-light mt-2 max-w-xl">
                Improv & Conversational Mentalist. Explore real audience encounters, live stage performance highlights, and signature mentalism acts.
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/mentalist_sravan/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#8E1018] hover:bg-[#a6131c] text-[#F2EFE9] text-xs font-cinzel tracking-[0.25em] uppercase font-bold transition-all duration-300 flex items-center gap-2 rounded-sm shrink-0 shadow-lg"
          >
            <InstagramIcon className="w-4 h-4" /> FOLLOW ON INSTAGRAM <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel mb-2 block">
              INSTAGRAM MEDIA ARCHIVE
            </span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight uppercase text-[#F2EFE9]">
              THE <span className="italic text-[#C5A059]">ARCHIVE</span>
            </h2>
          </div>

          <a
            href="https://www.instagram.com/mentalist_sravan/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-cinzel tracking-widest text-[#C5A059] hover:text-[#F2EFE9] uppercase flex items-center gap-1.5"
          >
            VIEW FULL PROFILE ON INSTAGRAM <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 border-b border-[#C5A059]/20 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-cinzel tracking-[0.2em] uppercase transition-all duration-300 py-2 px-4 rounded-sm border ${
                activeCategory === cat
                  ? 'bg-[#C5A059] text-[#050505] border-[#C5A059] font-bold shadow-lg'
                  : 'text-[#B8B0A5] hover:text-[#F2EFE9] border-[#1a1a1a] hover:border-[#C5A059]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Media Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className={`group relative overflow-hidden bg-[#080808] border-2 border-[#C5A059]/30 hover:border-[#C5A059] transition-all duration-500 rounded-sm cursor-pointer ${item.aspect}`}
            >
              {item.renderPreview()}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-20">
                <span className="text-[10px] text-[#C5A059] font-cinzel tracking-widest uppercase">
                  {item.category} • {item.year}
                </span>
                <h3 className="text-lg font-serif text-[#F2EFE9] tracking-wider uppercase mt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#B8B0A5] font-light line-clamp-2 mt-1">
                  {item.description}
                </p>
                <div className="pt-3 flex items-center justify-between text-[10px] text-[#C5A059] font-cinzel tracking-widest uppercase">
                  <span>CLICK TO EMBED & WATCH</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Royale Instagram & Video Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100000] bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-between p-6 md:p-12 animate-[fadeIn_0.3s_ease-out]">
          {/* Header Bar */}
          <div className="w-full flex items-center justify-between z-20 max-w-5xl">
            <div>
              <span className="text-xs text-[#C5A059] font-cinzel tracking-widest uppercase block">
                {selectedItem.category} • {selectedItem.location}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-[#F2EFE9] tracking-wider uppercase">
                {selectedItem.title}
              </h3>
            </div>
            <button
              onClick={closeLightbox}
              className="p-3 text-[#F2EFE9] hover:text-[#C5A059] transition-colors rounded-full border border-[#C5A059]/40 hover:border-[#C5A059]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Image/Visual Showcase */}
          <div className="relative w-full max-w-5xl h-[60vh] my-auto flex items-center justify-center border-2 border-[#C5A059]/40 rounded-sm overflow-hidden bg-[#080808] p-4">
            {selectedItem.renderPreview()}
          </div>

          {/* Bottom Action Footer */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8B0A5] font-cinzel tracking-widest uppercase z-20 border-t border-[#C5A059]/30 pt-4 max-w-5xl">
            <p className="text-xs text-[#B8B0A5] font-light max-w-md">
              {selectedItem.description}
            </p>

            <a
              href={selectedItem.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#8E1018] hover:bg-[#a6131c] text-[#F2EFE9] text-xs font-cinzel tracking-[0.2em] uppercase font-bold transition-all flex items-center gap-2 rounded-sm shrink-0"
            >
              <InstagramIcon className="w-4 h-4" /> OPEN ON INSTAGRAM @mentalist_sravan <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
