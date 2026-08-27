import React, { useState } from 'react';
import { Eye, Key, Compass } from 'lucide-react';

export const InteractiveMicroExperience = () => {
  const [phase, setPhase] = useState('intro1'); // intro1, intro2, intro3, selection, calculating, reveal
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  const symbols = [
    { id: 'eye', name: 'THE UNBLINKING EYE', icon: Eye, description: 'Observation & Focus' },
    { id: 'key', name: 'THE SEALED KEY', icon: Key, description: 'Secret & Memory' },
    { id: 'compass', name: 'THE PARALLEL COMPASS', icon: Compass, description: 'Direction & Choice' }
  ];

  const handleSelect = (symbol) => {
    setSelectedSymbol(symbol);
    setPhase('calculating');
    setTimeout(() => {
      setPhase('reveal');
    }, 2800);
  };

  const handleReset = () => {
    setPhase('selection');
    setSelectedSymbol(null);
  };

  return (
    <section className="relative w-full min-h-screen bg-black text-[#F2EFE9] flex flex-col items-center justify-center px-6 py-24 border-y border-white/10 overflow-hidden">
      <div className="max-w-3xl w-full text-center relative z-10">
        <span className="text-xs text-[#8E1018] tracking-[0.3em] uppercase font-cinzel mb-8 block">
          PAGE 13 / THE EXPERIENCE
        </span>

        {/* Phase 1: Intro sequence */}
        {phase === 'intro1' && (
          <div className="space-y-6 animate-[fadeIn_1s_ease-out]">
            <h2 className="text-3xl md:text-5xl font-serif text-[#F2EFE9] tracking-widest uppercase">
              YOU HAVE BEEN WATCHING.
            </h2>
            <button
              onClick={() => setPhase('intro2')}
              className="mt-8 px-8 py-3 text-xs tracking-widest font-cinzel text-[#B8B0A5] hover:text-[#F2EFE9] border border-white/20 hover:border-white transition-all duration-300 uppercase"
            >
              CONTINUE →
            </button>
          </div>
        )}

        {phase === 'intro2' && (
          <div className="space-y-6 animate-[fadeIn_1s_ease-out]">
            <h2 className="text-3xl md:text-5xl font-serif text-[#F2EFE9] tracking-widest uppercase">
              NOW LOOK AGAIN.
            </h2>
            <button
              onClick={() => setPhase('intro3')}
              className="mt-8 px-8 py-3 text-xs tracking-widest font-cinzel text-[#8E1018] hover:text-[#F2EFE9] border border-[#8E1018]/50 hover:border-[#8E1018] transition-all duration-300 uppercase"
            >
              PROCEED →
            </button>
          </div>
        )}

        {phase === 'intro3' && (
          <div className="space-y-6 animate-[fadeIn_1s_ease-out]">
            <h2 className="text-2xl md:text-4xl font-serif text-[#F2EFE9] tracking-widest uppercase mb-4">
              THE MIND FILLS IN THE GAPS.
            </h2>
            <p className="text-sm md:text-base text-[#B8B0A5] font-light max-w-xl mx-auto leading-relaxed">
              Every choice you have made on this page — your scroll speed, your pause duration, the exact angle of your gaze — leaves a silent trace.
            </p>
            <button
              onClick={() => setPhase('selection')}
              className="mt-8 px-10 py-4 text-xs tracking-[0.25em] font-cinzel text-black bg-[#F2EFE9] hover:bg-[#8E1018] hover:text-[#F2EFE9] transition-all duration-500 uppercase font-semibold"
            >
              ENTER THE TEST
            </button>
          </div>
        )}

        {/* Phase 4: Symbol Selection */}
        {phase === 'selection' && (
          <div className="space-y-8 animate-[fadeIn_0.8s_ease-out]">
            <h3 className="text-xl md:text-2xl font-cinzel tracking-widest uppercase text-[#F2EFE9]">
              SILENTLY CHOOSE ONE SYMBOL
            </h3>
            <p className="text-xs text-[#B8B0A5] tracking-widest uppercase">
              Do not speak it aloud. Simply focus on its geometry.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {symbols.map((sym) => {
                const IconComponent = sym.icon;
                return (
                  <button
                    key={sym.id}
                    onClick={() => handleSelect(sym)}
                    className="p-8 bg-black hover:bg-white/5 flex flex-col items-center justify-center group transition-all duration-300"
                  >
                    <IconComponent className="w-12 h-12 text-[#B8B0A5] group-hover:text-[#8E1018] transition-colors duration-300 mb-4" />
                    <span className="text-xs font-cinzel tracking-widest uppercase text-[#F2EFE9] group-hover:text-[#8E1018]">
                      {sym.name}
                    </span>
                    <span className="text-[10px] text-[#B8B0A5]/60 tracking-wider uppercase mt-2">
                      {sym.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Phase 5: Calculating animation */}
        {phase === 'calculating' && (
          <div className="py-16 space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div className="w-16 h-16 border-2 border-white/10 border-t-[#8E1018] rounded-full animate-spin mx-auto" />
            <p className="text-xs font-cinzel tracking-[0.3em] text-[#B8B0A5] uppercase animate-pulse">
              ANALYZING PSYCHOLOGICAL PATTERNS...
            </p>
          </div>
        )}

        {/* Phase 6: Reveal */}
        {phase === 'reveal' && selectedSymbol && (
          <div className="space-y-8 animate-[fadeIn_1s_ease-out] bg-black p-8 md:p-12">
            <span className="text-[10px] text-[#8E1018] tracking-[0.3em] uppercase font-mono block">
              PSYCHOLOGICAL REVEAL
            </span>

            <div className="w-20 h-20 mx-auto rounded-full bg-black border border-[#8E1018] flex items-center justify-center text-[#8E1018]">
              {selectedSymbol.id === 'eye' && <Eye className="w-10 h-10 text-[#F2EFE9]" />}
              {selectedSymbol.id === 'key' && <Key className="w-10 h-10 text-[#F2EFE9]" />}
              {selectedSymbol.id === 'compass' && <Compass className="w-10 h-10 text-[#F2EFE9]" />}
            </div>

            <h3 className="text-2xl md:text-3xl font-serif text-[#F2EFE9] tracking-wider uppercase">
              YOU CHOSE {selectedSymbol.name}.
            </h3>

            <p className="text-sm md:text-base text-[#B8B0A5] font-light leading-relaxed max-w-lg mx-auto">
              You believe you made a free choice. But your eyes lingered on the contrast for precisely 420 milliseconds before clicking. The mind does not select randomly — it moves towards what it has already expected.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 text-xs font-cinzel tracking-widest text-[#B8B0A5] hover:text-[#F2EFE9] border border-white/20 hover:border-white transition-all uppercase"
              >
                TRY AGAIN
              </button>
              <a
                href="#booking"
                className="px-6 py-2.5 text-xs font-cinzel tracking-widest text-black bg-[#F2EFE9] hover:bg-[#8E1018] hover:text-[#F2EFE9] transition-all uppercase font-bold"
              >
                BOOK THE LIVE EXPERIENCE →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
