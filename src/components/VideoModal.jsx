import React from 'react';
import { X, Play } from 'lucide-react';

export const VideoModal = ({ isOpen, onClose, title = "SHOWREEL" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 md:p-12 animate-[fadeIn_0.3s_ease-out]">
      <div className="w-full max-w-4xl flex items-center justify-between mb-6">
        <div>
          <span className="text-xs text-[#8E1018] font-cinzel tracking-widest uppercase block">
            CINEMATIC PREVIEW
          </span>
          <h3 className="text-xl md:text-3xl font-serif text-[#F2EFE9] tracking-wider uppercase">
            {title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-3 text-[#F2EFE9] hover:text-[#8E1018] transition-colors rounded-full border border-[#1a1a1a] hover:border-[#8E1018]"
          data-cursor="CLOSE"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Atmospheric Video Container */}
      <div className="relative w-full max-w-4xl aspect-video bg-[#0a0a0a] border border-[#1a1a1a] rounded-sm overflow-hidden flex flex-col items-center justify-center p-8 group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#240d11_0%,_#050505_90%)]" />

        {/* Ambient Film Grain */}
        <div className="relative z-10 text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#8E1018] text-[#F2EFE9] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 cursor-pointer">
            <Play className="w-8 h-8 ml-1 fill-current" />
          </div>
          <span className="text-sm font-cinzel tracking-[0.25em] text-[#F2EFE9] uppercase block pt-4">
            TEASER PREVIEW TEASER
          </span>
          <p className="text-xs text-[#B8B0A5] max-w-md mx-auto font-light">
            [ Official film trailer & showreel release scheduled for live performance season ]
          </p>
        </div>

        <div className="absolute bottom-4 left-4 text-[10px] text-[#8E1018] font-mono tracking-widest">
          // 4K CINEMATIC AUDIO / VISUAL RECORDING
        </div>
      </div>
    </div>
  );
};
