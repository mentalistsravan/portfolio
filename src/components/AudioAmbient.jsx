import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioAmbient = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);
  const gainRef = useRef(null);

  const toggleSound = () => {
    if (isPlaying) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          if (osc1Ref.current) osc1Ref.current.stop();
          if (osc2Ref.current) osc2Ref.current.stop();
          setIsPlaying(false);
        }, 1000);
      }
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
        const ctx = audioCtxRef.current;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2); // Soft subtle volume

        // Deep drone synth oscillators
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(55, ctx.currentTime); // Low A

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(110, ctx.currentTime); // A2 octave

        // Filter for warmth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
        gainRef.current = masterGain;

        setIsPlaying(true);
      } catch (err) {
        console.error("Audio initialization error:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      className="flex items-center gap-2 text-[10px] tracking-widest uppercase font-cinzel text-[#B8B0A5] hover:text-[#F2EFE9] transition-colors duration-300 py-1 px-2 rounded border border-[#1a1a1a] hover:border-[#8E1018]/50"
      title={isPlaying ? "Mute Atmospheric Soundscape" : "Enable Atmospheric Soundscape"}
      data-cursor="SOUND"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#8E1018] animate-pulse" />
          <span className="hidden sm:inline">ATMOSPHERE ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#B8B0A5]" />
          <span className="hidden sm:inline">SOUNDSCAPE</span>
        </>
      )}
    </button>
  );
};
