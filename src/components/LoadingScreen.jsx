import React, { useEffect, useState } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 500);  // "M"
    const timer2 = setTimeout(() => setStep(2), 1400); // "MENTALIST SRAVAN"
    const timer3 = setTimeout(() => setStep(3), 2300); // "WHERE THOUGHT BECOMES THEATRE."
    const timer4 = setTimeout(() => {
      setStep(4);
      setTimeout(onComplete, 600); // Fade out
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  if (step === 4) return null;

  return (
    <div className="fixed inset-0 z-[100000] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-700 pointer-events-none select-none px-6">
      <div className="text-center">
        {step >= 0 && (
          <div className="text-5xl md:text-7xl font-serif text-[#F2EFE9] tracking-widest transition-all duration-700 mb-4 opacity-90">
            M
          </div>
        )}

        {step >= 2 && (
          <div className="text-sm md:text-base font-cinzel text-[#F2EFE9] tracking-[0.3em] uppercase transition-all duration-700 mb-3 opacity-90">
            MENTALIST SRAVAN
          </div>
        )}

        {step >= 3 && (
          <div className="text-xs md:text-sm font-serif italic text-[#8E1018] tracking-widest uppercase transition-all duration-700 opacity-90">
            WHERE THOUGHT BECOMES THEATRE.
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-12 w-24 h-[1px] bg-[#1a1a1a] overflow-hidden">
        <div className="w-full h-full bg-[#8E1018] animate-[pulse_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  );
};
