import React from 'react';
import mspLogoImg from '../assets/branding/msp_logo.png';
import sravanTripleImg from '../assets/hero/sravan_triple_portrait.jpg';

export const mspLogo = mspLogoImg;
export const sravanTriple = sravanTripleImg;

// Logo Emblem Component
export const LogoEmblem = ({ className = "h-10 w-auto", showText = false }) => (
  <div className="flex items-center gap-3">
    <img
      src={mspLogoImg}
      alt="MSP Monogram Emblem Logo"
      className={`object-contain border border-[#C5A059]/40 rounded-sm p-1 bg-[#0a0a0a] shadow-lg ${className}`}
    />
    {showText && (
      <span className="text-sm font-cinzel tracking-[0.25em] text-[#F2EFE9] uppercase font-bold">
        SRAVAN
      </span>
    )}
  </div>
);

// Hero Visual: The Sravan Triple Portrait completely visible
export const HeroTriplePortraitVisual = ({ className = "" }) => (
  <div className={`relative w-full h-full flex items-center justify-center bg-[#050505] p-2 md:p-6 ${className}`}>
    {/* Royale Framed Border */}
    <div className="relative w-full h-full border-2 border-[#C5A059]/30 p-2 md:p-4 rounded-sm bg-[#080808]/90 flex items-center justify-center overflow-hidden group shadow-2xl">
      {/* Corner Filigree Accents */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C5A059]" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#C5A059]" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#C5A059]" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C5A059]" />

      {/* Triple Portrait Image - Completely Visible */}
      <img
        src={sravanTripleImg}
        alt="Mentalist Sravan - Triple Portrait with Cards, Mask & Cube"
        className="w-full h-full object-contain max-h-[75vh] filter brightness-105 contrast-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-transform duration-1000 group-hover:scale-[1.02]"
      />

      {/* Subtle Gold / Crimson Vignette overlay on edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-[#050505]/40 pointer-events-none" />
    </div>
  </div>
);

// History Show Visual Component
export const HistoryShowVisual = ({ className = "" }) => (
  <div className={`relative w-full h-80 md:h-96 bg-[#0a0a0a] border-2 border-[#C5A059]/30 rounded-sm p-6 overflow-hidden flex flex-col justify-between ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1c140a_0%,_#050505_90%)]" />
    
    {/* SVG Historic Clock / Compass Geometry */}
    <svg viewBox="0 0 800 400" className="w-full h-full object-cover absolute inset-0 opacity-40">
      <circle cx="400" cy="200" r="140" fill="none" stroke="#C5A059" strokeWidth="1" strokeDasharray="4 8" />
      <circle cx="400" cy="200" r="100" fill="none" stroke="#8E1018" strokeWidth="1.5" />
      <line x1="400" y1="40" x2="400" y2="360" stroke="#C5A059" strokeWidth="0.5" opacity="0.6" />
      <line x1="240" y1="200" x2="560" y2="200" stroke="#C5A059" strokeWidth="0.5" opacity="0.6" />
      <text x="400" y="80" fill="#C5A059" fontSize="14" fontFamily="serif" textAnchor="middle">XII</text>
      <text x="400" y="335" fill="#C5A059" fontSize="14" fontFamily="serif" textAnchor="middle">VI</text>
      <text x="265" y="205" fill="#C5A059" fontSize="14" fontFamily="serif" textAnchor="middle">IX</text>
      <text x="535" y="205" fill="#C5A059" fontSize="14" fontFamily="serif" textAnchor="middle">III</text>
    </svg>

    <div className="relative z-10 flex items-center justify-between text-xs text-[#C5A059] font-cinzel tracking-widest uppercase">
      <span>PRODUCTION SHOW</span>
      <span>EST. 2025</span>
    </div>

    <div className="relative z-10 space-y-2 text-center max-w-xl mx-auto">
      <span className="text-xs text-[#8E1018] tracking-[0.3em] font-cinzel uppercase block">GRAND THEATRICAL PRODUCTION</span>
      <h3 className="text-3xl md:text-5xl font-serif text-[#F2EFE9] tracking-wider uppercase">
        HISTORY SHOW
      </h3>
      <p className="text-xs md:text-sm text-[#B8B0A5] font-light italic">
        "Where past choices, historical paradoxes and forgotten timelines converge live on stage."
      </p>
    </div>

    <div className="relative z-10 flex items-center justify-between text-[10px] text-[#B8B0A5] font-mono tracking-widest">
      <span>// THE CHRONICLE OF IMPOSSIBLE TIME</span>
      <span>MENTALIST SRAVAN</span>
    </div>
  </div>
);

// Mirage Visual Component
export const MirageVisual = ({ className = "" }) => (
  <div className={`relative w-full h-80 md:h-96 bg-[#0a0a0a] border-2 border-[#C5A059]/30 rounded-sm p-6 overflow-hidden flex flex-col justify-between ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#241a0d_0%,_#050505_95%)]" />
    <svg viewBox="0 0 800 400" className="w-full h-full object-cover absolute inset-0 opacity-30">
      <polygon points="400,0 200,400 600,400" fill="#C5A059" opacity="0.08" />
      <polygon points="400,0 320,400 480,400" fill="#8E1018" opacity="0.12" />
    </svg>
    <div className="relative z-10 flex items-center justify-between text-xs text-[#C5A059] font-cinzel tracking-widest uppercase">
      <span>PROJECT 01 / MIRAGE</span>
      <span>THEATRE SHOW</span>
    </div>
    <div className="relative z-10 text-center space-y-2">
      <h3 className="text-3xl md:text-5xl font-serif text-[#F2EFE9] tracking-wider uppercase">
        MIRAGE
      </h3>
      <p className="text-xs text-[#B8B0A5] font-cinzel tracking-widest uppercase">
        WHAT YOU SEE IS ONLY THE BEGINNING
      </p>
    </div>
    <div className="relative z-10 text-[10px] text-[#B8B0A5] font-mono tracking-widest">
      // PERCEPTION & EXPECTATION
    </div>
  </div>
);

// Insider Visual Component
export const InsiderVisual = ({ className = "" }) => (
  <div className={`relative w-full h-80 md:h-96 bg-[#0a0a0a] border-2 border-[#C5A059]/30 rounded-sm p-6 overflow-hidden flex flex-col justify-between ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1f0a0d_0%,_#050505_95%)]" />
    <svg viewBox="0 0 800 400" className="w-full h-full object-cover absolute inset-0 opacity-35">
      <line x1="0" y1="0" x2="400" y2="200" stroke="#C5A059" strokeWidth="1" opacity="0.4" />
      <line x1="800" y1="0" x2="400" y2="200" stroke="#C5A059" strokeWidth="1" opacity="0.4" />
      <line x1="0" y1="400" x2="400" y2="200" stroke="#8E1018" strokeWidth="1" opacity="0.4" />
      <line x1="800" y1="400" x2="400" y2="200" stroke="#8E1018" strokeWidth="1" opacity="0.4" />
    </svg>
    <div className="relative z-10 flex items-center justify-between text-xs text-[#C5A059] font-cinzel tracking-widest uppercase">
      <span>PROJECT 02 / INSIDER</span>
      <span>PSYCHOLOGICAL THRILLER</span>
    </div>
    <div className="relative z-10 text-center space-y-2">
      <h3 className="text-3xl md:text-5xl font-serif text-[#F2EFE9] tracking-wider uppercase">
        INSIDER
      </h3>
      <p className="text-xs text-[#B8B0A5] font-cinzel tracking-widest uppercase">
        THE MYSTERY OF PARALLELS
      </p>
    </div>
    <div className="relative z-10 text-[10px] text-[#B8B0A5] font-mono tracking-widest">
      // CHOICE & COINCIDENCE
    </div>
  </div>
);

// Stage Performance Visual
export const StagePerformanceVisual = ({ className = "" }) => (
  <div className={`relative w-full h-96 bg-[#050505] border-2 border-[#C5A059]/30 rounded-sm p-6 overflow-hidden flex flex-col justify-between ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#241a0d_0%,_#050505_95%)]" />
    <div className="relative z-10 text-center my-auto space-y-4 max-w-xl mx-auto">
      <img src={mspLogoImg} alt="MSP Emblem" className="w-16 h-16 mx-auto object-contain border border-[#C5A059]/40 p-2 rounded-sm" />
      <h3 className="text-3xl md:text-5xl font-serif text-[#F2EFE9] tracking-wider uppercase">
        THE STAGE CHANGES EVERYTHING.
      </h3>
      <p className="text-xs text-[#C5A059] font-cinzel tracking-[0.25em] uppercase">
        ONE ROOM. ONE AUDIENCE. ONE IMPOSSIBLE MOMENT.
      </p>
    </div>
  </div>
);
