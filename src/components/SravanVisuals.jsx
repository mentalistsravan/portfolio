import React from 'react';

// Import real edited photographs of Mentalist Sravan
import sravanCardImg from '../assets/sravan_photos/sravan_card.webp';
import sravanSuitImg from '../assets/sravan_photos/sravan_suit.webp';
import sravanCubeImg from '../assets/sravan_photos/sravan_cube.webp';
import sravanChessImg from '../assets/sravan_photos/sravan_chess.webp';
import sravanHoodieImg from '../assets/sravan_photos/sravan_hoodie.webp';

// Export paths for easy direct usage
export const photoAssets = {
  card: sravanCardImg,
  suit: sravanSuitImg,
  cube: sravanCubeImg,
  chess: sravanChessImg,
  hoodie: sravanHoodieImg
};

// Hero Portrait: Mentalist Sravan holding Joker card with intense mysterious gaze
export const HeroPortraitVisual = ({ className = "" }) => (
  <div className={`relative w-full h-full overflow-hidden bg-[#050505] flex items-center justify-center ${className}`}>
    {/* Real Photograph with Dark Cinematic Treatment */}
    <img
      src={sravanCardImg}
      alt="Mentalist Sravan with Playing Card"
      className="w-full h-full object-cover object-top opacity-85 filter contrast-125 brightness-90 saturate-[0.9] transition-transform duration-1000 scale-105 hover:scale-100"
    />
    
    {/* Dark Gradient Vignettes & Crimson Aura */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/70 pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none opacity-80" />
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#8E1018] opacity-20 blur-[130px] rounded-full pointer-events-none" />
  </div>
);

// Artist Portrait: Sravan in Black Suit (Page 02 & 12)
export const ArtistPortraitVisual = ({ className = "" }) => (
  <div className={`relative w-full h-full overflow-hidden bg-[#0a0a0a] ${className}`}>
    <img
      src={sravanSuitImg}
      alt="Mentalist Sravan Black Suit Portrait"
      className="w-full h-full object-cover object-top opacity-90 filter contrast-125 brightness-95"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90 pointer-events-none" />
    <div className="absolute bottom-6 left-6 text-xs text-[#B8B0A5] tracking-widest uppercase font-cinzel opacity-80 z-10">
      FIG 01 / THE ARTIST
    </div>
  </div>
);

// Philosophy Close-Up Visual: Sravan with White Chess Piece (Page 03)
export const PhilosophyCloseUpVisual = ({ className = "" }) => (
  <div className={`relative w-full h-full bg-[#050505] overflow-hidden ${className}`}>
    <img
      src={sravanChessImg}
      alt="Mentalist Sravan holding Chess King"
      className="w-full h-full object-cover opacity-80 filter contrast-130 brightness-90"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-[#050505] pointer-events-none" />
    <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
  </div>
);

// Mirage Project Visual: Sravan with Rubik's Cube (Page 04 & 05)
export const MirageVisual = ({ className = "" }) => (
  <div className={`relative w-full h-80 md:h-96 bg-[#0c0c0c] overflow-hidden rounded-sm border border-[#1a1a1a] ${className}`}>
    <img
      src={sravanCubeImg}
      alt="Mentalist Sravan with Rubiks Cube"
      className="w-full h-full object-cover opacity-85 filter contrast-120 brightness-90"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent pointer-events-none" />
    <div className="absolute top-4 right-4 text-[10px] tracking-widest text-[#B8B0A5] font-cinzel z-10">
      PROJECT 01 / MIRAGE
    </div>
  </div>
);

// Physic Hour Visual: Sravan Studio Hoodie Portrait (Page 06)
export const PhysicHourVisual = ({ className = "" }) => (
  <div className={`relative w-full h-full bg-[#0a0a0a] overflow-hidden border border-[#1f1f1f] ${className}`}>
    <img
      src={sravanHoodieImg}
      alt="Mentalist Sravan Physic Hour Observation"
      className="w-full h-full object-cover opacity-85 filter contrast-125 brightness-85"
    />
    {/* Overlay grid & text marks */}
    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
    <div className="absolute bottom-4 left-4 text-xs font-mono text-[#8E1018] tracking-widest z-10">
      // EXPERIMENTAL OBSERVATION MARKS
    </div>
  </div>
);

// Sealed Confession Visual (Page 07)
export const SealedConfessionVisual = ({ className = "" }) => (
  <div className={`relative w-full h-full bg-[#12080a] overflow-hidden border border-[#2a1216] ${className}`}>
    <img
      src={sravanCardImg}
      alt="Sealed Confession Performance"
      className="w-full h-full object-cover opacity-75 filter contrast-125 brightness-80 sepia-[0.3]"
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2b0d13_0%,_#050505_90%)] mix-blend-multiply pointer-events-none" />
    <div className="absolute top-6 left-6 text-xs text-[#8E1018] tracking-widest uppercase font-cinzel z-10">
      SEALED & CONFIDENTIAL
    </div>
  </div>
);

// Insider Visual (Page 08)
export const InsiderVisual = ({ className = "" }) => (
  <div className={`relative w-full h-full bg-[#080808] overflow-hidden border border-[#1a1a1a] ${className}`}>
    <img
      src={sravanChessImg}
      alt="Insider Mystery of Parallels"
      className="w-full h-full object-cover opacity-80 filter contrast-130 brightness-85"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none" />
    <div className="absolute bottom-6 right-6 text-xs text-[#B8B0A5] tracking-widest uppercase font-mono opacity-80 z-10">
      // PARALLEL CONVERGENCE
    </div>
  </div>
);

// Craft Gallery Items with real photos
export const CraftItemVisual = ({ type, title }) => {
  let bgPhoto = null;
  if (type === 'cards') bgPhoto = sravanCardImg;
  if (type === 'cubes') bgPhoto = sravanCubeImg;
  if (type === 'books' || type === 'predictions') bgPhoto = sravanChessImg;
  if (type === 'coins' || type === 'memory') bgPhoto = sravanSuitImg;

  return (
    <div className="relative w-full aspect-square bg-[#111111] border border-[#1a1a1a] rounded-sm flex flex-col items-center justify-center p-6 group hover:border-[#8E1018]/60 transition-all duration-500 overflow-hidden cursor-pointer">
      {bgPhoto && (
        <img
          src={bgPhoto}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 filter contrast-125"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] pointer-events-none" />
      
      <span className="relative z-10 text-sm tracking-widest text-[#F2EFE9] font-cinzel uppercase font-semibold text-center">
        {title}
      </span>
      <span className="relative z-10 text-[10px] text-[#B8B0A5] tracking-widest uppercase mt-1 opacity-70">
        PHYSICAL ELEMENT
      </span>
    </div>
  );
};

// Stage Performance Visual (Page 10)
export const StagePerformanceVisual = ({ className = "" }) => (
  <div className={`relative w-full h-96 bg-[#050505] overflow-hidden border border-[#1a1a1a] ${className}`}>
    <img
      src={sravanHoodieImg}
      alt="Mentalist Sravan Stage Performance"
      className="w-full h-full object-cover opacity-80 filter contrast-125 brightness-85"
    />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#242424_0%,_#050505_90%)] mix-blend-multiply pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
  </div>
);
