import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { LoadingScreen } from './components/LoadingScreen';
import { PortraitGallery } from './components/PortraitGallery';
import { VideoModal } from './components/VideoModal';
import { BookingForm } from './components/BookingForm';
import { TicketingSection } from './components/TicketingSection';
import { AdminDashboard } from './components/AdminDashboard';
import { SiteSettingsProvider, useSiteSettings } from './context/SiteSettingsContext';

import {
  HeroTriplePortraitVisual,
  HistoryShowVisual,
  MirageVisual,
  InsiderVisual,
  StagePerformanceVisual,
  LogoEmblem,
  sravanTriple,
  sravanHandsSuit,
  sravanSpotlight,
  sravanSideProfile,
  InstagramIcon
} from './components/SravanVisuals';

import { ArrowDown, Play, ChevronRight, Crown, ExternalLink, ArrowRight } from 'lucide-react';

function PortfolioApp() {
  const { settings } = useSiteSettings();
  const [loading, setLoading] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoTitle, setVideoTitle] = useState('SHOWREEL');
  const [videoSrc, setVideoSrc] = useState(null);

  // Hidden route detection: /admin or #admin
  const [isAdmin, setIsAdmin] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path === '/admin' || path === '/admin/' || hash === '#admin';
  });

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      setIsAdmin(path === '/admin' || path === '/admin/' || hash === '#admin');
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const openVideo = (title, src = null) => {
    setVideoTitle(title);
    setVideoSrc(src);
    setVideoModalOpen(true);
  };

  // If visiting /admin or #admin, render secret Admin Dashboard
  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="relative bg-black text-[#F2EFE9] min-h-screen font-sans-body selection:bg-[#8E1018] selection:text-[#F2EFE9]">
      {/* Optional Top Announcement Banner (Controlled from Admin Dashboard) */}
      {settings.announcementActive && settings.announcementText && (
        <aside aria-label="Announcement" className="relative z-50 bg-[#8E1018] text-[#F2EFE9] px-4 py-2 text-center text-xs font-cinzel tracking-widest uppercase flex items-center justify-center gap-2">
          <span>{settings.announcementText}</span>
          {settings.announcementLink && (
            <a
              href={settings.announcementLink}
              className="underline font-bold hover:text-[#C5A059] transition-colors inline-flex items-center gap-1"
            >
              DETAILS <ArrowRight className="w-3 h-3" />
            </a>
          )}
        </aside>
      )}

      {/* Opening Loading Sequence (Toggleable in Admin Dashboard) */}
      {settings.enableLoadingSequence && loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      {/* Navigation Header - Always 'Mentalist Sravan' (No admin link) */}
      <Navigation />

      <main className="relative z-10 bg-black">
        {/* ==================================================
            PAGE 01 — HERO (PLAIN PURE BLACK LAYOUT)
        ================================================== */}
        <section className="relative w-full min-h-screen bg-black flex flex-col justify-between px-6 md:px-12 pt-28 pb-12 overflow-hidden border-b border-white/10">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
            {/* Text Side */}
            <div className="lg:col-span-6 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 py-1">
                <Crown className="w-4 h-4 text-[#C5A059]" />
                <span className="text-[11px] font-cinzel tracking-[0.3em] text-[#C5A059] uppercase font-semibold">
                  {settings.heroHighlight || 'PSYCHOLOGICAL ILLUSION • PERFORMANCE ART'}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-serif text-[#F2EFE9] tracking-tighter uppercase leading-[0.9]">
                {settings.heroTitle || 'MENTALIST SRAVAN'}
              </h1>

              <div className="text-lg sm:text-xl md:text-3xl font-serif text-[#B8B0A5] tracking-widest uppercase italic border-l-2 border-[#C5A059] pl-4">
                <span className="text-[#8E1018] not-italic font-bold">
                  {settings.heroTagline || 'WHERE THOUGHT BECOMES THEATRE.'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#B8B0A5] font-light leading-relaxed max-w-md">
                {settings.heroSubtitle ||
                  'Creating impossible experiences built around perception, psychology, choice, memory and human behaviour.'}
              </p>

              {/* Plain CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#mentalist"
                  className="px-8 py-4 bg-[#C5A059] text-black hover:bg-[#8E1018] hover:text-[#F2EFE9] text-xs font-cinzel tracking-[0.25em] uppercase font-bold transition-all duration-300 rounded-sm"
                >
                  ENTER THE EXPERIENCE
                </a>
                <a
                  href="#booking"
                  className="px-8 py-4 border border-white/20 hover:border-white text-[#F2EFE9] text-xs font-cinzel tracking-[0.25em] uppercase transition-all duration-300 rounded-sm"
                >
                  BOOK SRAVAN
                </a>
              </div>
            </div>

            {/* Hero Visual (Triple Portrait) */}
            <div className="lg:col-span-6 h-[480px] sm:h-[580px] lg:h-[650px] w-full z-10">
              <HeroTriplePortraitVisual className="h-full w-full" />
            </div>
          </div>

          {/* Bottom indicator */}
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-cinzel tracking-[0.25em] text-[#B8B0A5] uppercase border-t border-white/10 pt-4">
            <span className="flex items-center gap-2">
              <LogoEmblem className="h-6 w-auto" />
              Mentalist Sravan
            </span>
            <a href="#mentalist" className="flex items-center gap-2 text-[#C5A059] hover:text-[#F2EFE9] transition-colors">
              SCROLL TO ENTER <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>
        </section>


        {/* ==================================================
            PAGE 02 — THE MENTALIST
        ================================================== */}
        <section id="mentalist" className="w-full bg-black text-[#F2EFE9] px-6 md:px-12 py-28 border-b border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Side */}
            <div className="lg:col-span-7 space-y-8">
              <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel block">
                01 / THE ARTIST
              </span>

              <h2 className="text-4xl sm:text-6xl font-serif tracking-tight uppercase leading-none">
                THE <br />
                <span className="italic text-[#C5A059]">MENTALIST</span>
              </h2>

              <div className="space-y-6 text-lg sm:text-xl md:text-2xl font-serif text-[#B8B0A5] font-light leading-relaxed">
                <p className="text-[#F2EFE9]">
                  Mentalism is not about seeing the future.
                </p>
                <p className="text-[#8E1018] italic font-semibold">
                  It is about making the impossible feel uncomfortably close.
                </p>
                <p className="text-base sm:text-lg font-sans-body text-[#B8B0A5] leading-relaxed">
                  Mentalist Sravan creates intimate experiences built around perception, psychology, choice, memory and human behaviour.
                </p>
                <p className="text-base sm:text-lg font-sans-body text-[#B8B0A5] leading-relaxed">
                  His performances exist somewhere between theatre, psychological illusion and storytelling — where the audience is not simply watching the show.
                </p>
                <p className="text-xl sm:text-2xl font-serif text-[#F2EFE9] italic font-normal">
                  They become part of it.
                </p>
              </div>
            </div>

            {/* Sravan Clasped Hands Suit Portrait */}
            <div className="lg:col-span-5 h-[480px] lg:h-[580px] overflow-hidden bg-black flex items-center justify-center">
              <img src={sravanHandsSuit} alt="" role="presentation" className="w-full h-full object-contain filter brightness-105 contrast-110" />
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 03 — THE PHILOSOPHY (WITH SHADOW PROFILE)
        ================================================== */}
        <section className="relative w-full min-h-[70vh] bg-black text-[#F2EFE9] px-6 md:px-12 py-28 flex items-center justify-center border-b border-white/10 overflow-hidden">
          <div className="absolute inset-0 opacity-20 flex items-center justify-center pointer-events-none">
            <img src={sravanSideProfile} alt="" role="presentation" className="w-full h-full object-cover filter contrast-125 brightness-75" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
            <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel block">
              PHILOSOPHY
            </span>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-widest uppercase leading-tight text-[#F2EFE9] drop-shadow-lg">
              THE MIND <br />
              IS THE MOST <br />
              <span className="italic text-[#8E1018]">INTERESTING</span> STAGE.
            </h2>

            <div className="space-y-4 text-sm sm:text-lg font-cinzel tracking-widest text-[#B8B0A5] uppercase max-w-2xl mx-auto font-light leading-relaxed">
              <p>Every choice leaves a trace.</p>
              <p>Every memory can be questioned.</p>
              <p>Every certainty has a blind spot.</p>
              <p className="text-[#C5A059] pt-4 font-normal">
                Mentalism lives in that space between what we know and what we think we know.
              </p>
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 04 — THE EXPERIENCES (WITH HISTORY SHOW)
        ================================================== */}
        <section id="experiences" className="w-full bg-black text-[#F2EFE9] px-6 md:px-12 py-28 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel mb-3 block">
                  02 / THE REPERTOIRE
                </span>
                <h2 className="text-4xl md:text-6xl font-serif tracking-tight uppercase">
                  THE <br /> EXPERIENCES
                </h2>
              </div>
              <div className="text-sm md:text-base font-cinzel text-[#B8B0A5] tracking-widest uppercase italic max-w-md">
                Not tricks. <br />
                Not demonstrations. <br />
                <span className="text-[#C5A059] not-italic font-bold">Experiences.</span>
              </div>
            </div>

            {/* Experience List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* HISTORY SHOW */}
              <div className="bg-black flex flex-col justify-between group space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#C5A059] font-cinzel tracking-widest uppercase mb-4">
                    <span>YEAR: 2025</span>
                    <span>GRAND STAGE</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif tracking-wider uppercase text-[#F2EFE9] group-hover:text-[#C5A059] transition-colors mb-4">
                    HISTORY SHOW
                  </h3>
                  <p className="text-sm text-[#B8B0A5] font-light leading-relaxed mb-6">
                    A grand theatrical mentalism production traveling through perception, human history, lost memories and historical decisions — where past choices and hidden secrets converge.
                  </p>
                </div>
                <a href="#historyshow" className="inline-flex items-center gap-2 text-xs font-cinzel tracking-widest text-[#C5A059] group-hover:text-[#F2EFE9] uppercase font-bold">
                  EXPLORE HISTORY SHOW <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* MIRAGE */}
              <div className="bg-black flex flex-col justify-between group space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#B8B0A5] font-cinzel tracking-widest uppercase mb-4">
                    <span>YEAR: 2025</span>
                    <span>THEATRE</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif tracking-wider uppercase text-[#F2EFE9] group-hover:text-[#C5A059] transition-colors mb-4">
                    MIRAGE
                  </h3>
                  <p className="text-sm text-[#B8B0A5] font-light leading-relaxed mb-6">
                    A theatrical mentalism experience built around perception, expectation and the fragile boundary between certainty and illusion.
                  </p>
                </div>
                <a href="#mirage" className="inline-flex items-center gap-2 text-xs font-cinzel tracking-widest text-[#F2EFE9] group-hover:text-[#C5A059] uppercase">
                  VIEW EXPERIENCE <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* INSIDER */}
              <div className="bg-black flex flex-col justify-between group space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#B8B0A5] font-cinzel tracking-widest uppercase mb-4">
                    <span>YEAR: 2024</span>
                    <span>THRILLER</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif tracking-wider uppercase text-[#F2EFE9] group-hover:text-[#C5A059] transition-colors mb-4">
                    INSIDER
                  </h3>
                  <p className="text-sm text-[#B8B0A5] font-light leading-relaxed mb-6">
                    What happens when two seemingly separate paths begin to converge? INSIDER explores the strange territory between choice, coincidence and connection.
                  </p>
                </div>
                <a href="#insider" className="inline-flex items-center gap-2 text-xs font-cinzel tracking-widest text-[#F2EFE9] group-hover:text-[#C5A059] uppercase">
                  VIEW EXPERIENCE <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* ==================================================
            FEATURED PRODUCTION SHOW — HISTORY SHOW
        ================================================== */}
        <section id="historyshow" className="w-full bg-black text-[#F2EFE9] px-6 md:px-12 py-28 border-b border-white/10">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
              <div>
                <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel mb-2 block">
                  FEATURED PRODUCTION SHOW
                </span>
                <h2 className="text-5xl md:text-7xl font-serif tracking-tight uppercase text-[#F2EFE9]">
                  HISTORY <span className="italic text-[#C5A059]">SHOW</span>
                </h2>
              </div>
              <div className="text-sm font-cinzel tracking-[0.25em] text-[#C5A059] uppercase italic mt-4 md:mt-0">
                THE CHRONICLE OF IMPOSSIBLE TIME
              </div>
            </div>

            <HistoryShowVisual />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              <div>
                <span className="text-xs text-[#C5A059] font-cinzel tracking-widest uppercase block mb-2">01 / CHRONICLE</span>
                <h4 className="text-lg font-serif text-[#F2EFE9] uppercase mb-2">THE TIMELINE</h4>
                <p className="text-xs text-[#B8B0A5] leading-relaxed font-light">
                  A grand exploration of human history, forgotten decisions, and lost historical artifacts decoded in real-time.
                </p>
              </div>

              <div>
                <span className="text-xs text-[#C5A059] font-cinzel tracking-widest uppercase block mb-2">02 / PARADOX</span>
                <h4 className="text-lg font-serif text-[#F2EFE9] uppercase mb-2">THE CHOICE</h4>
                <p className="text-xs text-[#B8B0A5] leading-relaxed font-light">
                  Spectators select random historical events and key dates, witnessing how unscripted choices re-align history before their eyes.
                </p>
              </div>

              <div>
                <span className="text-xs text-[#C5A059] font-cinzel tracking-widest uppercase block mb-2">03 / CONVERGENCE</span>
                <h4 className="text-lg font-serif text-[#F2EFE9] uppercase mb-2">THE REVEAL</h4>
                <p className="text-xs text-[#B8B0A5] leading-relaxed font-light">
                  A staggering finale revealing that every historic decision made throughout the show was calculated hours before doors opened.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() =>
                  openVideo(
                    'HISTORY SHOW — THEATRICAL STREAM',
                    settings.historyShowVideo || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
                  )
                }
                className="px-8 py-4 bg-[#C5A059] hover:bg-[#8E1018] text-black hover:text-[#F2EFE9] font-cinzel text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 inline-flex items-center gap-3 rounded-sm cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" /> STREAM HISTORY SHOW TRAILER IN SITE
              </button>
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 04B — LIVE PERFORMANCES & TICKETS
        ================================================== */}
        <TicketingSection />


        {/* ==================================================
            PAGE 05 — MIRAGE
        ================================================== */}
        <section id="mirage" className="w-full bg-black text-[#F2EFE9] px-6 md:px-12 py-28 border-b border-white/10">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
              <div>
                <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel mb-2 block">
                  FEATURED WORK
                </span>
                <h2 className="text-5xl md:text-7xl font-serif tracking-tight uppercase">
                  MIRAGE
                </h2>
              </div>
              <button
                onClick={() =>
                  openVideo(
                    'MIRAGE — THEATRICAL STREAM',
                    settings.mirageVideo || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
                  )
                }
                className="text-xs font-cinzel tracking-widest text-[#C5A059] hover:text-[#F2EFE9] uppercase flex items-center gap-2 cursor-pointer"
              >
                STREAM TRAILER IN SITE <Play className="w-4 h-4 fill-current" />
              </button>
            </div>

            <MirageVisual />
          </div>
        </section>


        {/* ==================================================
            PAGE 08 — INSIDER
        ================================================== */}
        <section id="insider" className="w-full bg-black text-[#F2EFE9] px-6 md:px-12 py-28 border-b border-white/10">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
              <div>
                <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel mb-2 block">
                  FEATURED WORK
                </span>
                <h2 className="text-5xl md:text-7xl font-serif tracking-tight uppercase">
                  INSIDER
                </h2>
              </div>
              <button
                onClick={() =>
                  openVideo(
                    'INSIDER — THRILLER STREAM',
                    settings.insiderVideo || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
                  )
                }
                className="text-xs font-cinzel tracking-widest text-[#C5A059] hover:text-[#F2EFE9] uppercase flex items-center gap-2 cursor-pointer"
              >
                STREAM TRAILER IN SITE <Play className="w-4 h-4 fill-current" />
              </button>
            </div>

            <InsiderVisual />
          </div>
        </section>


        {/* ==================================================
            PAGE 11 — PORTRAIT GALLERY SECTION
        ================================================== */}
        <PortraitGallery />


        {/* ==================================================
            PAGE 12 — ABOUT
        ================================================== */}
        <section id="about" className="w-full bg-black text-[#F2EFE9] px-6 md:px-12 py-28 border-b border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 h-[480px] lg:h-[550px] overflow-hidden bg-black flex items-center justify-center">
              <img src={sravanSpotlight} alt="" role="presentation" className="w-full h-full object-contain filter brightness-105 contrast-110" />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel block">
                04 / THE ARTIST
              </span>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight uppercase leading-none">
                BEHIND <br />
                <span className="italic text-[#C5A059]">THE MIND</span>
              </h2>

              <div className="space-y-4 text-sm md:text-base text-[#B8B0A5] font-light leading-relaxed">
                <p>
                  Mentalist Sravan is a performing artist whose work explores the space between psychology, perception and illusion.
                </p>
                <p>
                  His performances are built not simply around what an audience sees, but around what it begins to believe.
                </p>
                <p>
                  Through intimate interactions, theatrical storytelling and carefully constructed moments, he turns spectators into participants.
                </p>
                <p className="text-[#F2EFE9] font-serif text-lg italic pt-4 border-l-2 border-[#C5A059] pl-4">
                  The objective is simple: Create a moment that remains impossible long after the performance ends.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 15 — BOOKING
        ================================================== */}
        <BookingForm
          onOpenShowreel={() =>
            openVideo(
              'MENTALIST SRAVAN — SHOWREEL STREAM',
              settings.mainShowreelVideo || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
            )
          }
        />
      </main>


      {/* ==================================================
          FINAL FOOTER (PLAIN PURE BLACK)
      ================================================== */}
      <footer className="w-full bg-black text-[#F2EFE9] border-t border-white/10 px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-white/10">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <LogoEmblem className="h-10 w-auto" />
              <h3 className="text-2xl font-serif font-bold tracking-wider text-[#F2EFE9] uppercase">
                Mentalist Sravan
              </h3>
            </div>
            <p className="text-xs font-serif italic text-[#C5A059] tracking-widest uppercase">
              {settings.heroTagline || 'WHERE THOUGHT BECOMES THEATRE.'}
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs font-cinzel tracking-widest text-[#B8B0A5] uppercase">
            <a href="#mentalist" className="block hover:text-[#C5A059] transition-colors">THE MENTALIST</a>
            <a href="#experiences" className="block hover:text-[#C5A059] transition-colors">EXPERIENCES</a>
            <a href="#historyshow" className="block hover:text-[#C5A059] transition-colors">HISTORY SHOW</a>
            <a href="#tickets" className="block hover:text-[#C5A059] transition-colors text-[#C5A059]">TICKETS &amp; SHOWS</a>
            <a href="#portraits" className="block hover:text-[#C5A059] transition-colors">PORTRAITS</a>
            <a href="#about" className="block hover:text-[#C5A059] transition-colors">ABOUT</a>
            <a href="#booking" className="block hover:text-[#C5A059] transition-colors">BOOK</a>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs font-cinzel tracking-widest text-[#B8B0A5] uppercase">
            <a href="https://www.instagram.com/mentalist_sravan/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#C5A059] transition-colors flex items-center gap-1">
              INSTAGRAM <InstagramIcon className="w-3.5 h-3.5" /> ↗
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="block hover:text-[#C5A059] transition-colors">
              YOUTUBE ↗
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-cinzel tracking-widest text-[#B8B0A5]/70 uppercase">
          <span>© MENTALIST SRAVAN. ALL RIGHTS RESERVED.</span>
          <span className="text-[#C5A059]">MENTALISM • PSYCHOLOGICAL ILLUSION • LIVE PERFORMANCE</span>
        </div>
      </footer>

      {/* Video Stream Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        title={videoTitle}
        videoSrc={videoSrc}
      />
    </div>
  );
}

export default function App() {
  return (
    <SiteSettingsProvider>
      <PortfolioApp />
    </SiteSettingsProvider>
  );
}
