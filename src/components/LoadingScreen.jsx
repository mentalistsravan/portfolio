import React, { useEffect, useRef, useState, useCallback } from 'react';

// Eagerly import all 300 loading sequence frame URLs using Vite's glob import
const frameModules = import.meta.glob('../assets/loading/ezgif-frame-*.jpg', {
  eager: true,
  import: 'default'
});

// Sort numerically from 001 to 300
const frameUrls = Object.entries(frameModules)
  .sort(([a], [b]) => {
    const numA = parseInt(a.match(/(\d+)/)?.[0] || '0', 10);
    const numB = parseInt(b.match(/(\d+)/)?.[0] || '0', 10);
    return numA - numB;
  })
  .map(([, url]) => url);

export const LoadingScreen = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const animFrameIdRef = useRef(null);
  const currentFrameRef = useRef(0);
  const imagesRef = useRef([]);
  const isCompleteRef = useRef(false);
  const hasStartedRef = useRef(false);

  const finish = useCallback(() => {
    if (isCompleteRef.current) return;
    isCompleteRef.current = true;

    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }

    setFading(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  }, [onComplete]);

  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, []);

  useEffect(() => {
    if (frameUrls.length === 0) {
      finish();
      return;
    }

    let loadedCount = 0;
    const total = frameUrls.length;
    const images = new Array(total);
    imagesRef.current = images;

    const targetFps = 30;
    const frameInterval = 1000 / targetFps;

    const startPlayback = () => {
      if (hasStartedRef.current || isCompleteRef.current) return;
      hasStartedRef.current = true;
      setIsReady(true);

      drawFrame(0);

      let lastTime = performance.now();

      const loop = (now) => {
        if (isCompleteRef.current) return;

        const delta = now - lastTime;
        if (delta >= frameInterval) {
          const advance = Math.max(1, Math.floor(delta / frameInterval));
          lastTime = now - (delta % frameInterval);

          const nextIndex = currentFrameRef.current + advance;

          if (nextIndex >= total) {
            currentFrameRef.current = total - 1;
            drawFrame(total - 1);
            setProgress(100);
            finish();
            return;
          }

          const nextImg = images[nextIndex];
          if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
            currentFrameRef.current = nextIndex;
            drawFrame(nextIndex);
            setProgress(Math.round((nextIndex / (total - 1)) * 100));
          } else {
            // If target frame still loading, draw the latest loaded frame
            drawFrame(currentFrameRef.current);
          }
        }

        animFrameIdRef.current = requestAnimationFrame(loop);
      };

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    // Preload frames in priority sequence
    frameUrls.forEach((url, index) => {
      const img = new Image();
      img.src = url;

      const onImageLoaded = () => {
        loadedCount++;
        // Start animation once initial buffer is ready (first 10 frames)
        if (loadedCount >= Math.min(10, total) && !hasStartedRef.current) {
          startPlayback();
        }
      };

      if (img.complete && img.naturalWidth > 0) {
        onImageLoaded();
      } else {
        img.onload = onImageLoaded;
        img.onerror = onImageLoaded;
      }

      images[index] = img;
    });

    // Fallback: start playback after 800ms regardless to prevent hang
    const fallbackTimer = setTimeout(() => {
      if (!hasStartedRef.current) {
        startPlayback();
      }
    }, 800);

    return () => {
      clearTimeout(fallbackTimer);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawFrame, finish]);

  return (
    <div
      className={`fixed inset-0 z-[100000] bg-black flex flex-col items-center justify-center transition-opacity duration-700 select-none overflow-hidden ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Sequence Canvas: Stretched on desktop, preserved aspect ratio on mobile */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={720}
          height={1280}
          className="w-auto h-full max-h-screen max-w-full object-contain md:w-full md:h-full md:max-w-none md:max-h-none md:object-fill filter brightness-105 contrast-105"
        />

        {/* Minimal loading indicator while initial buffer fills */}
        {!isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
            <div className="w-12 h-12 rounded-full border border-[#C5A059]/30 border-t-[#C5A059] animate-spin mb-4" />
            <span className="text-[10px] font-cinzel tracking-[0.35em] text-[#C5A059] uppercase">
              INITIALIZING
            </span>
          </div>
        )}
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 z-20">
        <div
          className="h-full bg-[#C5A059] transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
