import React from 'react';

// Hero Portrait: Dramatic split light editorial portrait
export const HeroPortraitVisual = ({ className = "" }) => (
  <div className={`relative w-full h-full overflow-hidden bg-[#050505] flex items-center justify-center ${className}`}>
    {/* Background ambient lighting */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#050505] to-[#050505]" />
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#8E1018] opacity-15 blur-[120px] rounded-full pointer-events-none" />
    
    {/* SVG Editorial Portrait Art */}
    <svg viewBox="0 0 800 1000" className="w-full h-full object-cover relative z-10 opacity-90 filter drop-shadow-2xl">
      <defs>
        <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F2EFE9" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#B8B0A5" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#1A1A1A" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0.95" />
        </linearGradient>
        
        <linearGradient id="suitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A1A1A" />
          <stop offset="50%" stopColor="#111111" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>

        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F2EFE9" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8E1018" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Dramatic theatrical spotlight beam */}
      <polygon points="400,0 200,1000 600,1000" fill="url(#heroGradient)" opacity="0.07" />

      {/* Silhouette & Suit Base */}
      <path d="M 220 1000 L 260 750 Q 320 620 400 620 Q 480 620 540 750 L 580 1000 Z" fill="url(#suitGradient)" stroke="#1a1a1a" strokeWidth="1" />
      {/* Lapel details */}
      <path d="M 330 630 L 400 780 L 370 1000" fill="none" stroke="#2a2a2a" strokeWidth="2" opacity="0.6" />
      <path d="M 470 630 L 400 780 L 430 1000" fill="none" stroke="#1a1a1a" strokeWidth="2" opacity="0.6" />
      {/* Dark shirt collar */}
      <path d="M 370 630 L 400 680 L 430 630 Z" fill="#0b0b0b" />

      {/* Neck */}
      <path d="M 360 540 Q 400 550 440 540 L 440 630 Q 400 640 360 630 Z" fill="#141414" />

      {/* Head and Jawline */}
      <path d="M 310 400 Q 310 260 400 250 Q 490 260 490 400 Q 490 520 400 550 Q 310 520 310 400 Z" fill="#121212" stroke="#1f1f1f" strokeWidth="1" />
      
      {/* Split Lighting Highlights - Warm Ivory side light */}
      <path d="M 400 250 Q 480 260 480 390 Q 475 490 400 545 Q 430 450 430 350 Z" fill="#F2EFE9" opacity="0.12" />
      
      {/* Crimson shadow accent on cheek */}
      <path d="M 320 370 Q 350 470 400 540 Q 340 490 325 400 Z" fill="#8E1018" opacity="0.25" />

      {/* Intense Eyes Gaze */}
      <circle cx="365" cy="380" r="14" fill="#080808" />
      <circle cx="435" cy="380" r="14" fill="#080808" />
      <circle cx="366" cy="380" r="4" fill="url(#eyeGlow)" />
      <circle cx="434" cy="380" r="4" fill="url(#eyeGlow)" />
      {/* Catchlight */}
      <circle cx="368" cy="378" r="1.5" fill="#F2EFE9" />
      <circle cx="432" cy="378" r="1.5" fill="#F2EFE9" />

      {/* Brow structure */}
      <path d="M 345 365 Q 365 360 385 370" fill="none" stroke="#2a2a2a" strokeWidth="3" />
      <path d="M 415 370 Q 435 360 455 365" fill="none" stroke="#3a3a3a" strokeWidth="3" />

      {/* Subtle Lips / Expression */}
      <path d="M 375 480 Q 400 485 425 480" fill="none" stroke="#262626" strokeWidth="2" />

      {/* Floating thought lines / mentalism aura */}
      <circle cx="400" cy="400" r="280" fill="none" stroke="#8E1018" strokeWidth="1" strokeDasharray="4 12" opacity="0.2" />
      <circle cx="400" cy="400" r="340" fill="none" stroke="#F2EFE9" strokeWidth="0.5" strokeDasharray="2 20" opacity="0.15" />
    </svg>

    {/* Cinematic vignettes */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-80 pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] opacity-60 pointer-events-none" />
  </div>
);

// Artist Portrait: Asymmetric Editorial
export const ArtistPortraitVisual = ({ className = "" }) => (
  <div className={`relative w-full h-full overflow-hidden bg-[#111111] ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_#1a1a1a_0%,_#050505_100%)]" />
    <svg viewBox="0 0 600 750" className="w-full h-full object-cover relative z-10 opacity-85">
      {/* Overhead spot */}
      <polygon points="450,0 200,750 600,750" fill="#F2EFE9" opacity="0.04" />
      {/* Silhouette Sravan in motion / storytelling */}
      <path d="M 180 750 Q 220 500 320 400 Q 380 340 380 250 Q 380 160 300 160 Q 240 160 220 220" fill="none" stroke="#F2EFE9" strokeWidth="1.5" opacity="0.3" />
      <path d="M 280 750 L 320 480 Q 380 430 420 330 Q 460 230 400 150 Q 320 80 220 180 Q 150 260 180 420" fill="#080808" stroke="#1c1c1c" strokeWidth="1" />
      {/* Crimson aura highlight */}
      <path d="M 400 150 Q 460 230 420 330" fill="none" stroke="#8E1018" strokeWidth="3" opacity="0.6" />
      <circle cx="360" cy="220" r="3" fill="#F2EFE9" />
    </svg>
    <div className="absolute bottom-6 left-6 text-xs text-[#B8B0A5] tracking-widest uppercase font-cinzel opacity-60">
      FIG 01 / THE ARTIST
    </div>
  </div>
);

// Philosophy Close-Up Visual
export const PhilosophyCloseUpVisual = ({ className = "" }) => (
  <div className={`relative w-full h-full bg-[#050505] overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#050505_80%)]" />
    <svg viewBox="0 0 1000 600" className="w-full h-full object-cover opacity-70">
      {/* High contrast close-up eye contours */}
      <path d="M 200 300 Q 500 100 800 300 Q 500 500 200 300 Z" fill="#0a0a0a" stroke="#222" strokeWidth="2" />
      <circle cx="500" cy="300" r="120" fill="#050505" stroke="#8E1018" strokeWidth="2" />
      <circle cx="500" cy="300" r="50" fill="#F2EFE9" opacity="0.9" />
      <circle cx="500" cy="300" r="20" fill="#050505" />
      {/* Reflection lines */}
      <line x1="450" y1="200" x2="550" y2="400" stroke="#F2EFE9" strokeWidth="1" opacity="0.2" />
      <line x1="100" y1="300" x2="900" y2="300" stroke="#8E1018" strokeWidth="0.5" strokeDasharray="8 12" opacity="0.4" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] pointer-events-none" />
  </div>
);

// Mirage Project Visual
export const MirageVisual = ({ className = "" }) => (
  <div className={`relative w-full h-80 md:h-96 bg-[#111111] overflow-hidden rounded-sm border border-[#1a1a1a] ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#262626_0%,_#050505_100%)]" />
    <svg viewBox="0 0 800 450" className="w-full h-full object-cover opacity-80">
      {/* Stage light pyramid */}
      <polygon points="400,0 150,450 650,450" fill="#F2EFE9" opacity="0.05" />
      <polygon points="400,0 300,450 500,450" fill="#8E1018" opacity="0.08" />
      {/* Sravan silhouette on stage */}
      <path d="M 380 450 L 390 350 Q 400 320 400 300 Q 400 320 410 350 L 420 450 Z" fill="#050505" stroke="#F2EFE9" strokeWidth="1" opacity="0.7" />
      <circle cx="400" cy="285" r="12" fill="#050505" stroke="#F2EFE9" strokeWidth="1" />
      {/* Floor reflection grid */}
      <line x1="0" y1="400" x2="800" y2="400" stroke="#2a2a2a" strokeWidth="1" />
      <line x1="0" y1="425" x2="800" y2="425" stroke="#1f1f1f" strokeWidth="1" />
    </svg>
    <div className="absolute top-4 right-4 text-[10px] tracking-widest text-[#B8B0A5] font-cinzel">
      PROJECT 01 / MIRAGE
    </div>
  </div>
);

// Physic Hour Visual (Scientific & Psychological diagrams)
export const PhysicHourVisual = ({ className = "" }) => (
  <div className={`relative w-full h-full bg-[#0a0a0a] overflow-hidden border border-[#1f1f1f] ${className}`}>
    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:2rem_2rem]" />
    <svg viewBox="0 0 800 600" className="w-full h-full object-cover relative z-10">
      {/* Handwritten psychological diagram & wave lines */}
      <path d="M 50 300 Q 200 100 350 300 T 650 300 T 750 300" fill="none" stroke="#F2EFE9" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4" />
      <path d="M 50 300 Q 200 500 350 300 T 650 300 T 750 300" fill="none" stroke="#8E1018" strokeWidth="1" opacity="0.5" />
      {/* Vector nodes */}
      <circle cx="200" cy="200" r="40" fill="none" stroke="#B8B0A5" strokeWidth="1" opacity="0.5" />
      <circle cx="500" cy="400" r="60" fill="none" stroke="#8E1018" strokeWidth="1" strokeDasharray="2 4" />
      <text x="200" y="205" fill="#F2EFE9" fontSize="12" fontFamily="monospace" textAnchor="middle" opacity="0.6">OBSERVATION</text>
      <text x="500" y="405" fill="#8E1018" fontSize="12" fontFamily="monospace" textAnchor="middle" opacity="0.8">PERCEPTION</text>
      {/* Handwritten observation notes simulation */}
      <text x="80" y="100" fill="#B8B0A5" fontSize="14" fontFamily="serif" fontStyle="italic" opacity="0.5">"The brain creates reality before the eye receives it."</text>
      <text x="450" y="140" fill="#B8B0A5" fontSize="12" fontFamily="monospace" opacity="0.4">Δt = 0.04s [LATENCY OF CHOICE]</text>
      {/* Dark Sravan Portrait overlay */}
      <circle cx="400" cy="280" r="90" fill="#050505" stroke="#1f1f1f" strokeWidth="2" />
      <path d="M 360 260 Q 400 240 440 260" fill="none" stroke="#F2EFE9" strokeWidth="2" opacity="0.7" />
    </svg>
    <div className="absolute bottom-4 left-4 text-xs font-mono text-[#8E1018] tracking-widest">
      // EXPERIMENTAL OBSERVATION MARKS
    </div>
  </div>
);

// Sealed Confession Visual (Warm burgundy, paper, wax seal)
export const SealedConfessionVisual = ({ className = "" }) => (
  <div className={`relative w-full h-full bg-[#12080a] overflow-hidden border border-[#2a1216] ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2b0d13_0%,_#050505_90%)]" />
    <svg viewBox="0 0 800 600" className="w-full h-full object-cover relative z-10 opacity-90">
      {/* Old book & letter visual */}
      <rect x="250" y="150" width="300" height="380" rx="4" fill="#181314" stroke="#8E1018" strokeWidth="1.5" />
      <rect x="270" y="170" width="260" height="340" fill="#241a1c" stroke="#3a2428" strokeWidth="1" />
      {/* Page lines */}
      <line x1="300" y1="220" x2="500" y2="220" stroke="#8E1018" strokeWidth="1" opacity="0.3" />
      <line x1="300" y1="250" x2="480" y2="250" stroke="#F2EFE9" strokeWidth="1" opacity="0.2" />
      <line x1="300" y1="280" x2="510" y2="280" stroke="#F2EFE9" strokeWidth="1" opacity="0.2" />
      {/* Sealed Crimson Wax Envelope */}
      <polygon points="320,340 480,340 400,400" fill="#150a0d" stroke="#8E1018" strokeWidth="1" />
      <polygon points="320,340 320,440 480,440 480,340" fill="#1c0f13" stroke="#42141a" strokeWidth="1" />
      {/* Red Wax Seal */}
      <circle cx="400" cy="390" r="28" fill="#8E1018" stroke="#f2efe9" strokeWidth="1" />
      <text x="400" y="396" fill="#F2EFE9" fontSize="18" fontFamily="serif" textAnchor="middle" fontWeight="bold">S</text>
    </svg>
    <div className="absolute top-6 left-6 text-xs text-[#8E1018] tracking-widest uppercase font-cinzel">
      SEALED & CONFIDENTIAL
    </div>
  </div>
);

// Insider Visual (Parallel lines, dark mirror reflections)
export const InsiderVisual = ({ className = "" }) => (
  <div className={`relative w-full h-full bg-[#080808] overflow-hidden border border-[#1a1a1a] ${className}`}>
    <svg viewBox="0 0 800 600" className="w-full h-full object-cover opacity-80">
      {/* Corridor vanishing lines */}
      <line x1="0" y1="0" x2="400" y2="300" stroke="#F2EFE9" strokeWidth="1" opacity="0.3" />
      <line x1="800" y1="0" x2="400" y2="300" stroke="#F2EFE9" strokeWidth="1" opacity="0.3" />
      <line x1="0" y1="600" x2="400" y2="300" stroke="#8E1018" strokeWidth="1" opacity="0.4" />
      <line x1="800" y1="600" x2="400" y2="300" stroke="#8E1018" strokeWidth="1" opacity="0.4" />
      {/* Parallel frames */}
      <rect x="200" y="150" width="400" height="300" fill="none" stroke="#1f1f1f" strokeWidth="2" />
      <rect x="300" y="225" width="200" height="150" fill="none" stroke="#8E1018" strokeWidth="1" />
      {/* Sravan Silhouette reflection */}
      <path d="M 380 300 Q 400 270 400 250 Q 400 270 420 300 Z" fill="#F2EFE9" opacity="0.6" />
    </svg>
    <div className="absolute bottom-6 right-6 text-xs text-[#B8B0A5] tracking-widest uppercase font-mono opacity-60">
      // PARALLEL CONVERGENCE
    </div>
  </div>
);

// Craft Gallery Items (Cards, Coins, Books, Cubes, Letters, Watches, Predictions, Memory)
export const CraftItemVisual = ({ type, title }) => {
  return (
    <div className="relative w-full aspect-square bg-[#111111] border border-[#1a1a1a] rounded-sm flex flex-col items-center justify-center p-6 group hover:border-[#8E1018]/60 transition-all duration-500 overflow-hidden cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505] pointer-events-none" />
      
      {/* Render icon artwork based on type */}
      <div className="relative z-10 w-24 h-24 mb-4 text-[#F2EFE9] group-hover:scale-110 transition-transform duration-700">
        {type === 'cards' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <rect x="20" y="15" width="50" height="70" rx="4" fill="#080808" stroke="#8E1018" strokeWidth="2" />
            <rect x="30" y="25" width="50" height="70" rx="4" fill="#181818" stroke="#F2EFE9" strokeWidth="1.5" />
            <path d="M 55 50 L 50 40 L 60 40 Z" fill="#8E1018" />
            <path d="M 55 60 L 50 70 L 60 70 Z" fill="#8E1018" />
          </svg>
        )}
        {type === 'coins' && (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="36" fill="#121212" stroke="#B8B0A5" strokeWidth="2" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="#8E1018" strokeWidth="1" strokeDasharray="4 4" />
            <text x="50" y="56" fill="#F2EFE9" fontSize="20" fontFamily="serif" textAnchor="middle">S</text>
          </svg>
        )}
        {type === 'books' && (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 20 20 L 50 30 L 80 20 L 80 80 L 50 90 L 20 80 Z" fill="#141011" stroke="#8E1018" strokeWidth="2" />
            <line x1="50" y1="30" x2="50" y2="90" stroke="#F2EFE9" strokeWidth="1.5" />
            <line x1="25" y1="35" x2="45" y2="40" stroke="#B8B0A5" strokeWidth="1" opacity="0.4" />
            <line x1="55" y1="40" x2="75" y2="35" stroke="#B8B0A5" strokeWidth="1" opacity="0.4" />
          </svg>
        )}
        {type === 'cubes' && (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,15 85,32 50,50 15,32" fill="#222" stroke="#8E1018" strokeWidth="1.5" />
            <polygon points="15,32 50,50 50,85 15,67" fill="#111" stroke="#8E1018" strokeWidth="1.5" />
            <polygon points="50,50 85,32 85,67 50,85" fill="#080808" stroke="#8E1018" strokeWidth="1.5" />
            <line x1="50" y1="15" x2="50" y2="50" stroke="#F2EFE9" strokeWidth="0.5" opacity="0.5" />
          </svg>
        )}
        {type === 'letters' && (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="15" y="30" width="70" height="45" fill="#141414" stroke="#F2EFE9" strokeWidth="1.5" />
            <polygon points="15,30 50,55 85,30" fill="none" stroke="#8E1018" strokeWidth="1.5" />
            <circle cx="50" cy="55" r="8" fill="#8E1018" />
          </svg>
        )}
        {type === 'watches' && (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="55" r="30" fill="#0d0d0d" stroke="#F2EFE9" strokeWidth="2" />
            <circle cx="50" cy="20" r="6" fill="none" stroke="#F2EFE9" strokeWidth="1.5" />
            <line x1="50" y1="55" x2="50" y2="35" stroke="#8E1018" strokeWidth="2" />
            <line x1="50" y1="55" x2="68" y2="55" stroke="#F2EFE9" strokeWidth="1.5" />
          </svg>
        )}
        {type === 'predictions' && (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="25,20 75,15 70,80 20,85" fill="#181818" stroke="#8E1018" strokeWidth="1.5" />
            <line x1="30" y1="35" x2="65" y2="30" stroke="#F2EFE9" strokeWidth="1" strokeDasharray="2 3" />
            <line x1="30" y1="50" x2="60" y2="45" stroke="#F2EFE9" strokeWidth="1" strokeDasharray="2 3" />
          </svg>
        )}
        {type === 'memory' && (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="35" fill="none" stroke="#1f1f1f" strokeWidth="1" />
            <path d="M 20 50 Q 35 20 50 50 T 80 50" fill="none" stroke="#F2EFE9" strokeWidth="1.5" />
            <path d="M 20 50 Q 35 80 50 50 T 80 50" fill="none" stroke="#8E1018" strokeWidth="1.5" />
          </svg>
        )}
      </div>

      <span className="relative z-10 text-sm tracking-widest text-[#F2EFE9] font-cinzel uppercase font-semibold">
        {title}
      </span>
      <span className="relative z-10 text-[10px] text-[#B8B0A5] tracking-widest uppercase mt-1 opacity-60">
        PHYSICAL ELEMENT
      </span>
    </div>
  );
};

// Stage Performance Visual
export const StagePerformanceVisual = ({ className = "" }) => (
  <div className={`relative w-full h-96 bg-[#050505] overflow-hidden border border-[#1a1a1a] ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#242424_0%,_#050505_90%)]" />
    <svg viewBox="0 0 1000 500" className="w-full h-full object-cover relative z-10 opacity-85">
      {/* Central Dramatic Spotlight */}
      <polygon points="500,0 200,500 800,500" fill="#F2EFE9" opacity="0.06" />
      <polygon points="500,0 380,500 620,500" fill="#8E1018" opacity="0.08" />

      {/* Sravan center stage */}
      <path d="M 480 500 L 490 380 Q 500 350 500 320 Q 500 350 510 380 L 520 500 Z" fill="#111" stroke="#F2EFE9" strokeWidth="1.5" />
      <circle cx="500" cy="305" r="15" fill="#111" stroke="#F2EFE9" strokeWidth="1.5" />

      {/* Audience silhouettes */}
      <path d="M 0 500 Q 150 420 300 450 T 600 440 T 1000 460 L 1000 500 Z" fill="#030303" />
      <circle cx="120" cy="460" r="18" fill="#080808" />
      <circle cx="240" cy="450" r="20" fill="#080808" />
      <circle cx="760" cy="455" r="19" fill="#080808" />
      <circle cx="880" cy="465" r="22" fill="#080808" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
  </div>
);
