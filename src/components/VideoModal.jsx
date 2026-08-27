import React, { useState, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

export const VideoModal = ({ isOpen, onClose, title = "SHOWREEL", videoSrc = null }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100000] bg-black/95 flex flex-col items-center justify-center p-4 md:p-10 animate-[fadeIn_0.2s_ease-out]">
      <div className="w-full max-w-5xl flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] text-[#C5A059] font-cinzel tracking-widest uppercase block">
            STREAMING MEDIA
          </span>
          <h3 className="text-xl md:text-3xl font-serif text-[#F2EFE9] tracking-wider uppercase">
            {title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-3 text-[#F2EFE9] hover:text-[#C5A059] transition-colors rounded-full bg-white/5 hover:bg-white/10"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Streamable Interactive Video Player Container */}
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-sm overflow-hidden flex items-center justify-center shadow-2xl group">
        <video
          ref={videoRef}
          src={videoSrc || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"}
          poster="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200"
          className="w-full h-full object-cover"
          autoPlay
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Video Overlay Stream Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
          <div className="flex items-center justify-between text-xs text-[#C5A059] font-cinzel tracking-widest uppercase">
            <span>MENTALIST SRAVAN • LIVE STREAM</span>
            <span>4K CINEMATIC</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={togglePlay}
              className="p-3 bg-[#C5A059] text-black rounded-full hover:bg-white transition-transform transform active:scale-95"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <div className="flex items-center gap-3 text-white">
              <button onClick={toggleMute} className="p-2 hover:text-[#C5A059] transition-colors">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullScreen} className="p-2 hover:text-[#C5A059] transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
