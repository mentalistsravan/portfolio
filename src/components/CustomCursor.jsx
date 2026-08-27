import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    document.body.classList.add('custom-cursor-active');
    setIsVisible(true);

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const text = target.getAttribute('data-cursor');
        setCursorText(text || '');
        setIsHovered(true);
      } else {
        const clickable = e.target.closest('a, button, [role="button"], input, textarea, select');
        if (clickable) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[99999] transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? 'w-16 h-16 bg-[#8E1018]/80 border-[#F2EFE9]/40 backdrop-blur-sm'
            : 'w-3 h-3 bg-[#F2EFE9] border-[#F2EFE9] opacity-80'
        }`}
      >
        {isHovered && cursorText && (
          <span className="text-[10px] font-cinzel tracking-widest text-[#F2EFE9] font-bold uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
