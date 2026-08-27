import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { InteractiveMicroExperience } from './components/InteractiveMicroExperience';
import { ArchiveSection } from './components/ArchiveLightbox';
import { VideoModal } from './components/VideoModal';
import { BookingForm } from './components/BookingForm';

import {
  HeroTriplePortraitVisual,
  HistoryShowVisual,
  MirageVisual,
  InsiderVisual,
  StagePerformanceVisual,
  LogoEmblem,
  sravanTriple
} from './components/SravanVisuals';

import { ArrowDown, Play, ChevronRight, Sparkles, Clock, Crown, Shield } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoTitle, setVideoTitle] = useState('SHOWREEL');

  const openVideo = (title) => {
    setVideoTitle(title);
    setVideoModalOpen(true);
  };

  return (
    <div className="relative bg-[#050505] text-[#F2EFE9] min-h-screen font-sans-body selection:bg-[#8E1018] selection:text-[#F2EFE9]">
      {/* Background Film Grain */}
      <div className="film-grain" />

      {/* Opening Loading Sequence */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navigation />

      <main className="relative z-10">
        {/* ==================================================
            PAGE 01 — HERO (REGALE ROYALE STRUCTURE)
        ================================================== */}
        <section className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-between px-6 md:px-12 pt-28 pb-12 overflow-hidden border-b-2 border-[#C5A059]/30">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C5A059] opacity-5 blur-[160px] pointer-events-none rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8E1018] opacity-10 blur-[140px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
            {/* Text Side */}
            <div className="lg:col-span-6 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#120e09] border border-[#C5A059]/40 rounded-sm">
                <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-[10px] font-cinzel tracking-[0.3em] text-[#C5A059] uppercase font-semibold">
                  PSYCHOLOGICAL ILLUSION • PERFORMANCE ART
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-serif text-[#F2EFE9] tracking-tighter uppercase leading-[0.9]">
                MENTALIST <br />
                <span className="italic font-light text-[#C5A059]">SRAVAN</span>
              </h1>

              <div className="text-lg sm:text-xl md:text-3xl font-serif text-[#B8B0A5] tracking-widest uppercase italic border-l-2 border-[#C5A059] pl-4">
                WHERE THOUGHT <br />
                <span className="text-[#8E1018] not-italic font-bold">BECOMES THEATRE.</span>
              </div>

              <p className="text-xs sm:text-sm text-[#B8B0A5] font-light leading-relaxed max-w-md">
                Creating impossible experiences built around perception, psychology, choice, memory and human behaviour.
              </p>

              {/* Royale CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#mentalist"
                  className="px-8 py-4 bg-[#C5A059] text-[#050505] hover:bg-[#8E1018] hover:text-[#F2EFE9] text-xs font-cinzel tracking-[0.25em] uppercase font-bold transition-all duration-300 shadow-xl rounded-sm"
                  data-cursor="ENTER"
                >
                  ENTER THE EXPERIENCE
                </a>
                <a
                  href="#booking"
                  className="px-8 py-4 border-2 border-[#C5A059]/40 hover:border-[#C5A059] text-[#F2EFE9] text-xs font-cinzel tracking-[0.25em] uppercase transition-all duration-300 rounded-sm bg-[#080808]/80"
                  data-cursor="BOOK"
                >
                  BOOK SRAVAN
                </a>
              </div>
            </div>

            {/* Second Image (Triple Portrait) - Completely Visible */}
            <div className="lg:col-span-6 h-[480px] sm:h-[580px] lg:h-[650px] w-full z-10">
              <HeroTriplePortraitVisual className="h-full w-full" />
            </div>
          </div>

          {/* Bottom indicator */}
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-cinzel tracking-[0.25em] text-[#B8B0A5] uppercase border-t border-[#C5A059]/20 pt-4">
            <span className="flex items-center gap-2">
              <LogoEmblem className="h-6 w-auto" />
              ROYALE PERFORMANCE ARTIST
            </span>
            <a href="#mentalist" className="flex items-center gap-2 text-[#C5A059] hover:text-[#F2EFE9] transition-colors">
              SCROLL TO ENTER <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>
        </section>


        {/* ==================================================
            PAGE 02 — THE MENTALIST
        ================================================== */}
        <section id="mentalist" className="w-full bg-[#080808] text-[#F2EFE9] px-6 md:px-12 py-28 border-b border-[#1a1a1a]">
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

            {/* Sravan Triple Portrait Framing */}
            <div className="lg:col-span-5 h-[480px] lg:h-[580px] rounded-sm overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl relative bg-[#050505] p-3" data-cursor="VIEW">
              <img src={sravanTriple} alt="Mentalist Sravan Portrait" className="w-full h-full object-contain" />
              <div className="absolute bottom-4 left-4 text-xs font-cinzel text-[#C5A059] tracking-widest uppercase">
                MENTALIST SRAVAN
              </div>
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 03 — THE PHILOSOPHY
        ================================================== */}
        <section className="relative w-full min-h-[75vh] bg-[#050505] text-[#F2EFE9] px-6 md:px-12 py-28 flex items-center justify-center overflow-hidden border-b-2 border-[#C5A059]/30">
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10 border-2 border-[#C5A059]/30 p-8 md:p-14 rounded-sm bg-[#080808]/90 shadow-2xl">
            <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel block">
              PHILOSOPHY
            </span>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-widest uppercase leading-tight text-[#F2EFE9]">
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
        <section id="experiences" className="w-full bg-[#080808] text-[#F2EFE9] px-6 md:px-12 py-28 border-b border-[#1a1a1a]">
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

            {/* Editorial Experience Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* HISTORY SHOW Card */}
              <div className="bg-[#0c0a07] border-2 border-[#C5A059]/60 p-8 rounded-sm flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1 shadow-xl" data-cursor="ENTER">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#C5A059] font-cinzel tracking-widest uppercase mb-6">
                    <span>YEAR: 2025</span>
                    <span>FORMAT: GRAND STAGE</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif tracking-wider uppercase text-[#F2EFE9] group-hover:text-[#C5A059] transition-colors mb-4">
                    HISTORY SHOW
                  </h3>
                  <p className="text-sm text-[#B8B0A5] font-light leading-relaxed mb-8">
                    A grand theatrical mentalism production traveling through perception, human history, lost memories and historical decisions — where past choices and hidden secrets converge.
                  </p>
                </div>
                <a href="#historyshow" className="inline-flex items-center gap-2 text-xs font-cinzel tracking-widest text-[#C5A059] group-hover:text-[#F2EFE9] uppercase font-bold">
                  EXPLORE HISTORY SHOW <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* MIRAGE Card */}
              <div className="bg-[#0c0a07] border-2 border-[#C5A059]/30 hover:border-[#C5A059] p-8 rounded-sm flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1" data-cursor="ENTER">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#B8B0A5] font-cinzel tracking-widest uppercase mb-6">
                    <span>YEAR: 2025</span>
                    <span>FORMAT: THEATRE</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif tracking-wider uppercase text-[#F2EFE9] group-hover:text-[#C5A059] transition-colors mb-4">
                    MIRAGE
                  </h3>
                  <p className="text-sm text-[#B8B0A5] font-light leading-relaxed mb-8">
                    A theatrical mentalism experience built around perception, expectation and the fragile boundary between certainty and illusion.
                  </p>
                </div>
                <a href="#mirage" className="inline-flex items-center gap-2 text-xs font-cinzel tracking-widest text-[#F2EFE9] group-hover:text-[#C5A059] uppercase">
                  VIEW EXPERIENCE <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* INSIDER Card */}
              <div className="bg-[#0c0a07] border-2 border-[#C5A059]/30 hover:border-[#C5A059] p-8 rounded-sm flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1" data-cursor="ENTER">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#B8B0A5] font-cinzel tracking-widest uppercase mb-6">
                    <span>YEAR: 2024</span>
                    <span>FORMAT: THRILLER</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif tracking-wider uppercase text-[#F2EFE9] group-hover:text-[#C5A059] transition-colors mb-4">
                    INSIDER
                  </h3>
                  <p className="text-sm text-[#B8B0A5] font-light leading-relaxed mb-8">
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
            NEW SHOW — HISTORY SHOW (REPLACES PHYSIC & SEALED CONFESSION)
        ================================================== */}
        <section id="historyshow" className="w-full bg-[#050505] text-[#F2EFE9] px-6 md:px-12 py-28 border-b-2 border-[#C5A059]/30">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#C5A059]/30 pb-8">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
              <div className="p-6 bg-[#0a0a0a] border-2 border-[#C5A059]/30 rounded-sm">
                <span className="text-xs text-[#C5A059] font-cinzel tracking-widest uppercase block mb-2">01 / CHRONICLE</span>
                <h4 className="text-lg font-serif text-[#F2EFE9] uppercase mb-2">THE TIMELINE</h4>
                <p className="text-xs text-[#B8B0A5] leading-relaxed font-light">
                  A grand exploration of human history, forgotten decisions, and lost historical artifacts decoded in real-time.
                </p>
              </div>

              <div className="p-6 bg-[#0a0a0a] border-2 border-[#C5A059]/30 rounded-sm">
                <span className="text-xs text-[#C5A059] font-cinzel tracking-widest uppercase block mb-2">02 / PARADOX</span>
                <h4 className="text-lg font-serif text-[#F2EFE9] uppercase mb-2">THE CHOICE</h4>
                <p className="text-xs text-[#B8B0A5] leading-relaxed font-light">
                  Spectators select random historical events and key dates, witnessing how unscripted choices re-align history before their eyes.
                </p>
              </div>

              <div className="p-6 bg-[#0a0a0a] border-2 border-[#C5A059]/30 rounded-sm">
                <span className="text-xs text-[#C5A059] font-cinzel tracking-widest uppercase block mb-2">03 / CONVERGENCE</span>
                <h4 className="text-lg font-serif text-[#F2EFE9] uppercase mb-2">THE REVEAL</h4>
                <p className="text-xs text-[#B8B0A5] leading-relaxed font-light">
                  A staggering finale revealing that every historic decision made throughout the show was calculated hours before doors opened.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => openVideo('HISTORY SHOW — THEATRICAL TRAILER')}
                className="px-8 py-4 bg-[#C5A059] hover:bg-[#8E1018] text-[#050505] hover:text-[#F2EFE9] font-cinzel text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 inline-flex items-center gap-3 shadow-xl rounded-sm"
                data-cursor="WATCH"
              >
                <Play className="w-4 h-4 fill-current" /> WATCH HISTORY SHOW TRAILER
              </button>
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 05 — MIRAGE
        ================================================== */}
        <section id="mirage" className="w-full bg-[#080808] text-[#F2EFE9] px-6 md:px-12 py-28 border-b border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1a1a1a] pb-8">
              <div>
                <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel mb-2 block">
                  FEATURED WORK
                </span>
                <h2 className="text-5xl md:text-7xl font-serif tracking-tight uppercase">
                  MIRAGE
                </h2>
              </div>
              <div className="text-sm font-cinzel tracking-[0.25em] text-[#B8B0A5] uppercase italic mt-4 md:mt-0">
                WHAT YOU SEE IS ONLY THE BEGINNING.
              </div>
            </div>

            <MirageVisual />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
              <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-sm">
                <span className="text-xs text-[#C5A059] font-cinzel tracking-widest uppercase block mb-2">01 / DISCIPLINE</span>
                <h4 className="text-lg font-serif text-[#F2EFE9] uppercase mb-2">THE EXPERIENCE</h4>
                <p className="text-xs text-[#B8B0A5] leading-relaxed font-light">
                  A theatrical mentalism experience built around perception, expectation and the fragile boundary between certainty and illusion.
                </p>
              </div>

              <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-sm">
                <span className="text-xs text-[#C5A059] font-cinzel tracking-widest uppercase block mb-2">02 / TEMPORALITY</span>
                <h4 className="text-lg font-serif text-[#F2EFE9] uppercase mb-2">THE MOMENT</h4>
                <p className="text-xs text-[#B8B0A5] leading-relaxed font-light">
                  An unscripted psychological convergence where audience decisions alter the arc of the performance in real-time.
                </p>
              </div>

              <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-sm">
                <span className="text-xs text-[#C5A059] font-cinzel tracking-widest uppercase block mb-2">03 / RESONANCE</span>
                <h4 className="text-lg font-serif text-[#F2EFE9] uppercase mb-2">THE MEMORY</h4>
                <p className="text-xs text-[#B8B0A5] leading-relaxed font-light">
                  A lasting impression that lingers long after the house lights return, challenging what was witnessed.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 08 — INSIDER
        ================================================== */}
        <section id="insider" className="w-full bg-[#050505] text-[#F2EFE9] px-6 md:px-12 py-28 border-b-2 border-[#C5A059]/30">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1a1a1a] pb-8">
              <div>
                <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel mb-2 block">
                  FEATURED WORK
                </span>
                <h2 className="text-5xl md:text-7xl font-serif tracking-tight uppercase">
                  INSIDER
                </h2>
              </div>
              <div className="text-sm font-cinzel tracking-[0.25em] text-[#B8B0A5] uppercase italic mt-4 md:mt-0">
                THE MYSTERY OF PARALLELS
              </div>
            </div>

            <InsiderVisual />

            <div className="max-w-3xl mx-auto text-center space-y-4">
              <p className="text-xl md:text-2xl font-serif text-[#F2EFE9] italic">
                "What happens when two seemingly separate paths begin to converge?"
              </p>
              <p className="text-sm text-[#B8B0A5] font-light">
                INSIDER explores the strange territory between choice, coincidence and connection.
              </p>
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 10 — THE PERFORMER
        ================================================== */}
        <section className="w-full bg-[#080808] text-[#F2EFE9] px-6 md:px-12 py-28 border-b border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel block">
                LIVE PERFORMANCE
              </span>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight uppercase text-[#F2EFE9]">
                THE STAGE <br />
                <span className="italic text-[#C5A059]">CHANGES EVERYTHING.</span>
              </h2>
            </div>

            <StagePerformanceVisual />
          </div>
        </section>


        {/* ==================================================
            PAGE 11 — THE ARCHIVE
        ================================================== */}
        <ArchiveSection />


        {/* ==================================================
            PAGE 12 — ABOUT
        ================================================== */}
        <section id="about" className="w-full bg-[#080808] text-[#F2EFE9] px-6 md:px-12 py-28 border-b border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 h-[480px] rounded-sm overflow-hidden border-2 border-[#C5A059]/40 bg-[#050505] p-3">
              <img src={sravanTriple} alt="Mentalist Sravan" className="w-full h-full object-contain" />
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
            PAGE 13 — THE EXPERIENCE (Interactive Micro-Experience)
        ================================================== */}
        <InteractiveMicroExperience />


        {/* ==================================================
            PAGE 14 — PRESS / CREDIBILITY
        ================================================== */}
        <section className="w-full bg-[#050505] text-[#F2EFE9] px-6 md:px-12 py-24 border-b border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs text-[#C5A059] tracking-[0.3em] uppercase font-cinzel mb-3 block">
                ENGAGEMENT & MEDIA
              </span>
              <h2 className="text-3xl md:text-5xl font-serif tracking-tight uppercase">
                IN THE WORLD
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
              {['PRESS', 'INTERVIEWS', 'FEATURES', 'EVENTS', 'COLLABORATIONS', 'MEDIA'].map((badge) => (
                <div key={badge} className="p-6 bg-[#0a0a0a] border-2 border-[#C5A059]/30 rounded-sm flex flex-col items-center justify-center">
                  <span className="text-xs font-cinzel tracking-widest text-[#B8B0A5] uppercase">
                    {badge}
                  </span>
                  <span className="text-[9px] text-[#C5A059] font-mono tracking-widest uppercase mt-2">
                    [ VERIFIED ENTRY ]
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 15 — BOOKING
        ================================================== */}
        <BookingForm onOpenShowreel={() => openVideo('MENTALIST SRAVAN — SHOWREEL')} />
      </main>


      {/* ==================================================
          FINAL FOOTER (ROYALE)
      ================================================== */}
      <footer className="w-full bg-[#030303] text-[#F2EFE9] border-t-2 border-[#C5A059]/30 px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-[#1a1a1a]">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <LogoEmblem className="h-10 w-auto" />
              <h3 className="text-2xl font-cinzel tracking-[0.25em] font-bold text-[#F2EFE9]">
                MENTALIST SRAVAN
              </h3>
            </div>
            <p className="text-xs font-serif italic text-[#C5A059] tracking-widest uppercase">
              WHERE THOUGHT BECOMES THEATRE.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs font-cinzel tracking-widest text-[#B8B0A5] uppercase">
            <a href="#mentalist" className="block hover:text-[#C5A059] transition-colors">THE MENTALIST</a>
            <a href="#experiences" className="block hover:text-[#C5A059] transition-colors">EXPERIENCES</a>
            <a href="#historyshow" className="block hover:text-[#C5A059] transition-colors">HISTORY SHOW</a>
            <a href="#archive" className="block hover:text-[#C5A059] transition-colors">ARCHIVE</a>
            <a href="#about" className="block hover:text-[#C5A059] transition-colors">ABOUT</a>
            <a href="#booking" className="block hover:text-[#C5A059] transition-colors">BOOK</a>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs font-cinzel tracking-widest text-[#B8B0A5] uppercase">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block hover:text-[#C5A059] transition-colors">
              INSTAGRAM ↗
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

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        title={videoTitle}
      />
    </div>
  );
}
