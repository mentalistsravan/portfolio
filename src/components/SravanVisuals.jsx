import React from 'react';
import mspLogoImg from '../assets/branding/msp_logo.png';
import sravanTripleImg from '../assets/hero/sravan_triple_portrait.jpg';

export const mspLogo = mspLogoImg;
export const sravanTriple = sravanTripleImg;

// Custom Instagram Camera Icon Component
export const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Plain Logo Emblem Component (No Frame)
export const LogoEmblem = ({ className = "h-10 w-auto", showText = false }) => (
  <div className="flex items-center gap-3">
    <img
      src={mspLogoImg}
      alt="Mentalist Sravan Logo"
      className={`object-contain ${className}`}
    />
    {showText && (
      <span className="text-base font-serif font-bold tracking-wider text-[#F2EFE9] uppercase">
        Mentalist Sravan
      </span>
    )}
  </div>
);

// Plain Hero Visual: Unclipped Triple Portrait on Pure Black (No Frame/Filigree)
export const HeroTriplePortraitVisual = ({ className = "" }) => (
  <div className={`relative w-full h-full flex items-center justify-center bg-black ${className}`}>
    <img
      src={sravanTripleImg}
      alt="Mentalist Sravan - Triple Portrait"
      className="w-full h-full object-contain max-h-[80vh] filter brightness-105 contrast-110 transition-transform duration-700 hover:scale-[1.01]"
    />
  </div>
);

// Plain History Show Visual Component (No Frame)
export const HistoryShowVisual = ({ className = "" }) => (
  <div className={`relative w-full h-80 md:h-96 bg-black p-6 overflow-hidden flex flex-col justify-between ${className}`}>
    {/* SVG Historic Clock / Compass Geometry */}
    <svg viewBox="0 0 800 400" className="w-full h-full object-cover absolute inset-0 opacity-25">
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

// Plain Mirage Visual Component (No Frame)
export const MirageVisual = ({ className = "" }) => (
  <div className={`relative w-full h-80 md:h-96 bg-black p-6 overflow-hidden flex flex-col justify-between ${className}`}>
    <svg viewBox="0 0 800 400" className="w-full h-full object-cover absolute inset-0 opacity-20">
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

// Plain Insider Visual Component (No Frame)
export const InsiderVisual = ({ className = "" }) => (
  <div className={`relative w-full h-80 md:h-96 bg-black p-6 overflow-hidden flex flex-col justify-between ${className}`}>
    <svg viewBox="0 0 800 400" className="w-full h-full object-cover absolute inset-0 opacity-25">
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

// Plain Stage Performance Visual (No Frame)
export const StagePerformanceVisual = ({ className = "" }) => (
  <div className={`relative w-full h-96 bg-black p-6 overflow-hidden flex flex-col justify-between ${className}`}>
    <div className="relative z-10 text-center my-auto space-y-4 max-w-xl mx-auto">
      <img src={mspLogoImg} alt="MSP Emblem" className="w-16 h-16 mx-auto object-contain" />
      <h3 className="text-3xl md:text-5xl font-serif text-[#F2EFE9] tracking-wider uppercase">
        THE STAGE CHANGES EVERYTHING.
      </h3>
      <p className="text-xs text-[#C5A059] font-cinzel tracking-[0.25em] uppercase">
        ONE ROOM. ONE AUDIENCE. ONE IMPOSSIBLE MOMENT.
      </p>
    </div>
  </div>
);
