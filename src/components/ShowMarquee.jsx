import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react';

// Optimized show photograph imports
import show1 from '../assets/shows/show_01.jpg';
import show2 from '../assets/shows/show_02.jpg';
import show3 from '../assets/shows/show_03.jpg';
import show4 from '../assets/shows/show_04.jpg';
import show5 from '../assets/shows/show_05.jpg';

export const showImages = [
  {
    id: 'show-01',
    src: show1,
    title: 'THE GRAND AUDITORIUM',
    category: 'LIVE THEATRE',
    date: 'STAGE PRODUCTION',
    caption: 'Mentalist Sravan captivating a full auditorium with unscripted psychological revelations.'
  },
  {
    id: 'show-02',
    src: show2,
    title: 'PSYCHOLOGICAL CONVERGENCE',
    category: 'STAGE ILLUSION',
    date: 'LIVE EXPERIENCE',
    caption: 'Intimate audience interaction where thoughts, random choices and certainty converge.'
  },
  {
    id: 'show-03',
    src: show3,
    title: 'THE CHRONICLE REVEAL',
    category: 'FEATURED WORK',
    date: 'THEATRE CHRONICLE',
    caption: 'Moments of shared disbelief as impossible historical predictions materialize live.'
  },
  {
    id: 'show-04',
    src: show4,
    title: 'IMPOSSIBLE CHOICES',
    category: 'INTERACTIVE THEATRE',
    date: 'PERFORMANCE ART',
    caption: 'Exploring memory and perception where spectators actively shape the narrative.'
  },
  {
    id: 'show-05',
    src: show5,
    title: 'THE SPOTLIGHT MOMENT',
    category: 'STAGE FOCUS',
    date: 'LIVE ILLUSION',
    caption: 'Where silence in the auditorium becomes the most powerful psychological tension.'
  }
];

export const ShowMarquee = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowRight') {
        const currentIndex = showImages.findIndex((img) => img.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % showImages.length;
        setSelectedImage(showImages[nextIndex]);
      }
      if (e.key === 'ArrowLeft') {
        const currentIndex = showImages.findIndex((img) => img.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + showImages.length) % showImages.length;
        setSelectedImage(showImages[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Double list for seamless 50% translation infinite loop
  const marqueeItems = [...showImages, ...showImages];

  return (
    <section id="stage" className="w-full bg-black text-[#F2EFE9] py-24 border-b border-white/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel font-semibold">
              03 / LIVE ARCHIVE
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight uppercase text-[#F2EFE9]">
            STAGE <span className="italic text-[#C5A059]">CHRONICLES</span>
          </h2>
        </div>
        <div className="text-xs font-cinzel tracking-widest text-[#B8B0A5] uppercase italic max-w-sm">
          Where thought becomes theatre in front of a live audience.
          <span className="block text-[10px] text-[#C5A059] not-italic tracking-[0.2em] mt-2">
            HOVER TO PAUSE • CLICK TO EXPAND
          </span>
        </div>
      </div>

      {/* Marquee Track Container with Gradient Edge Fade */}
      <div className="relative w-full overflow-hidden group">
        {/* Left Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-20" />
        
        {/* Right Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-20" />

        {/* Scrolling Strip */}
        <div className="flex w-max animate-marquee space-x-6 md:space-x-8 px-4 py-2">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => setSelectedImage(item)}
              className="relative w-[300px] sm:w-[380px] md:w-[460px] aspect-[3/2] flex-shrink-0 cursor-pointer overflow-hidden border border-white/10 hover:border-[#C5A059]/70 transition-all duration-500 group/card rounded-sm bg-[#080808]"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 filter brightness-95 group-hover/card:brightness-105 contrast-105"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 opacity-70 group-hover/card:opacity-90 transition-opacity duration-300" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-cinzel tracking-widest text-[#C5A059] bg-black/60 backdrop-blur-xs px-2.5 py-1 border border-[#C5A059]/30 rounded-xs uppercase">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/70 border border-white/20 text-[#F2EFE9] flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 hover:text-[#C5A059]">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-serif text-[#F2EFE9] tracking-wider uppercase group-hover/card:text-[#C5A059] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#B8B0A5] font-sans-body line-clamp-1 opacity-80 group-hover/card:opacity-100">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Subtle Status */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-6 flex items-center justify-between text-[10px] font-cinzel tracking-widest text-[#B8B0A5]/60 uppercase">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#C5A059]" /> 5 AUTHENTIC STAGE PHOTOGRAPHS
        </span>
        <span>MENTALIST SRAVAN • LIVE PERFORMANCES</span>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 text-white/70 hover:text-[#C5A059] transition-colors z-50 bg-black/50 rounded-full border border-white/10 cursor-pointer"
            aria-label="Close image modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = showImages.findIndex((img) => img.id === selectedImage.id);
              const prevIndex = (currentIndex - 1 + showImages.length) % showImages.length;
              setSelectedImage(showImages[prevIndex]);
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-[#C5A059] transition-colors z-50 bg-black/60 rounded-full border border-white/10 cursor-pointer"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = showImages.findIndex((img) => img.id === selectedImage.id);
              const nextIndex = (currentIndex + 1) % showImages.length;
              setSelectedImage(showImages[nextIndex]);
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-[#C5A059] transition-colors z-50 bg-black/60 rounded-full border border-white/10 cursor-pointer"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="max-w-5xl w-full flex flex-col items-center bg-black border border-white/15 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-h-[75vh] flex items-center justify-center bg-[#050505] overflow-hidden">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="w-full p-6 sm:p-8 bg-black border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-cinzel tracking-widest text-[#C5A059] uppercase font-semibold">
                    {selectedImage.category}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase">
                    {selectedImage.date}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif text-[#F2EFE9] tracking-wider uppercase">
                  {selectedImage.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#B8B0A5] font-sans-body max-w-2xl leading-relaxed">
                  {selectedImage.caption}
                </p>
              </div>

              <div className="text-[11px] font-cinzel tracking-widest text-[#C5A059] uppercase sm:text-right whitespace-nowrap">
                STAGE ARCHIVE
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
