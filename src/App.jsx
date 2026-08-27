import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { InteractiveMicroExperience } from './components/InteractiveMicroExperience';
import { ArchiveSection } from './components/ArchiveLightbox';
import { VideoModal } from './components/VideoModal';
import { BookingForm } from './components/BookingForm';

import {
  HeroPortraitVisual,
  ArtistPortraitVisual,
  PhilosophyCloseUpVisual,
  MirageVisual,
  PhysicHourVisual,
  SealedConfessionVisual,
  InsiderVisual,
  StagePerformanceVisual
} from './components/SravanVisuals';

import { ArrowDown, Play, ChevronRight } from 'lucide-react';

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
            PAGE 01 — HERO
        ================================================== */}
        <section className="relative w-full h-screen min-h-[700px] bg-[#050505] flex flex-col justify-between px-6 md:px-12 py-20 overflow-hidden">
          {/* Hero Portrait Background */}
          <div className="absolute inset-0 z-0 opacity-90">
            <HeroPortraitVisual />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full pt-16 md:pt-24 flex flex-col justify-start">
            <span className="text-xs md:text-sm font-cinzel tracking-[0.3em] text-[#8E1018] uppercase mb-4 font-semibold">
              Mentalism • Psychological Illusion • Live Performance
            </span>

            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-serif text-[#F2EFE9] tracking-tighter uppercase leading-[0.85] mb-6">
              MENTALIST <br />
              <span className="italic font-light text-[#F2EFE9]/90">SRAVAN</span>
            </h1>

            <div className="text-xl sm:text-2xl md:text-4xl font-serif text-[#B8B0A5] tracking-widest uppercase italic max-w-xl">
              WHERE THOUGHT <br />
              <span className="text-[#8E1018] not-italic font-bold">BECOMES THEATRE.</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="#mentalist"
                className="px-8 py-3.5 bg-[#F2EFE9] text-[#050505] hover:bg-[#8E1018] hover:text-[#F2EFE9] text-xs font-cinzel tracking-[0.25em] uppercase font-bold transition-all duration-300"
                data-cursor="ENTER"
              >
                ENTER THE EXPERIENCE
              </a>
              <a
                href="#booking"
                className="px-8 py-3.5 border border-[#1a1a1a] hover:border-[#8E1018] text-[#F2EFE9] text-xs font-cinzel tracking-[0.25em] uppercase transition-all duration-300"
                data-cursor="BOOK"
              >
                BOOK SRAVAN
              </a>
            </div>
          </div>

          {/* Bottom indicator */}
          <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-cinzel tracking-[0.25em] text-[#B8B0A5]/80 uppercase border-t border-[#1a1a1a]/60 pt-4">
            <span>PERFORMANCE ARTIST</span>
            <a href="#mentalist" className="flex items-center gap-2 hover:text-[#8E1018] transition-colors">
              SCROLL TO ENTER <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>
        </section>


        {/* ==================================================
            PAGE 02 — THE MENTALIST
        ================================================== */}
        <section id="mentalist" className="w-full bg-[#080808] text-[#F2EFE9] px-6 md:px-12 py-28 border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Side */}
            <div className="lg:col-span-7 space-y-8">
              <span className="text-xs text-[#8E1018] tracking-[0.3em] uppercase font-cinzel block">
                01 / THE ARTIST
              </span>

              <h2 className="text-4xl sm:text-6xl font-serif tracking-tight uppercase leading-none">
                THE <br />
                <span className="italic">MENTALIST</span>
              </h2>

              <div className="space-y-6 text-lg sm:text-xl md:text-2xl font-serif text-[#B8B0A5] font-light leading-relaxed">
                <p className="text-[#F2EFE9]">
                  Mentalism is not about seeing the future.
                </p>
                <p className="text-[#8E1018] italic">
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

            {/* Large Editorial Portrait Side */}
            <div className="lg:col-span-5 h-[500px] lg:h-[650px] rounded-sm overflow-hidden border border-[#1a1a1a] shadow-2xl relative" data-cursor="VIEW">
              <ArtistPortraitVisual />
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 03 — THE PHILOSOPHY
        ================================================== */}
        <section className="relative w-full min-h-[80vh] bg-[#050505] text-[#F2EFE9] px-6 md:px-12 py-32 flex items-center justify-center overflow-hidden border-t border-[#1a1a1a]">
          {/* Close up background */}
          <div className="absolute inset-0 opacity-50 pointer-events-none">
            <PhilosophyCloseUpVisual />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
            <span className="text-xs text-[#8E1018] tracking-[0.3em] uppercase font-cinzel block">
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
              <p className="text-[#F2EFE9] pt-4 font-normal">
                Mentalism lives in that space between what we know and what we think we know.
              </p>
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 04 — THE EXPERIENCES
        ================================================== */}
        <section id="experiences" className="w-full bg-[#080808] text-[#F2EFE9] px-6 md:px-12 py-28 border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-xs text-[#8E1018] tracking-[0.3em] uppercase font-cinzel mb-3 block">
                  02 / THE REPERTOIRE
                </span>
                <h2 className="text-4xl md:text-6xl font-serif tracking-tight uppercase">
                  THE <br /> EXPERIENCES
                </h2>
              </div>
              <div className="text-sm md:text-base font-cinzel text-[#B8B0A5] tracking-widest uppercase italic max-w-md">
                Not tricks. <br />
                Not demonstrations. <br />
                <span className="text-[#F2EFE9] not-italic font-bold">Experiences.</span>
              </div>
            </div>

            {/* Editorial Experience Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* MIRAGE Card */}
              <div className="bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#8E1018]/60 p-8 md:p-10 rounded-sm flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1" data-cursor="ENTER">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#B8B0A5] font-cinzel tracking-widest uppercase mb-6">
                    <span>YEAR: 2025</span>
                    <span>FORMAT: THEATRE</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif tracking-wider uppercase text-[#F2EFE9] group-hover:text-[#8E1018] transition-colors mb-4">
                    MIRAGE
                  </h3>
                  <p className="text-sm text-[#B8B0A5] font-light leading-relaxed mb-8">
                    A theatrical mentalism experience built around perception, expectation and the fragile boundary between certainty and illusion.
                  </p>
                </div>
                <a href="#mirage" className="inline-flex items-center gap-2 text-xs font-cinzel tracking-widest text-[#F2EFE9] group-hover:text-[#8E1018] uppercase">
                  VIEW EXPERIENCE <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* PHYSIC HOUR Card */}
              <div className="bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#8E1018]/60 p-8 md:p-10 rounded-sm flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1" data-cursor="ENTER">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#B8B0A5] font-cinzel tracking-widest uppercase mb-6">
                    <span>YEAR: 2025</span>
                    <span>FORMAT: EXPERIMENTAL</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif tracking-wider uppercase text-[#F2EFE9] group-hover:text-[#8E1018] transition-colors mb-4">
                    PHYSIC HOUR
                  </h3>
                  <p className="text-sm text-[#B8B0A5] font-light leading-relaxed mb-8">
                    A deeper encounter with perception. Where observation becomes participation, and the audience begins to question not the performer — but themselves.
                  </p>
                </div>
                <a href="#physichour" className="inline-flex items-center gap-2 text-xs font-cinzel tracking-widest text-[#F2EFE9] group-hover:text-[#8E1018] uppercase">
                  VIEW EXPERIENCE <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* SEALED CONFESSION Card */}
              <div className="bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#8E1018]/60 p-8 md:p-10 rounded-sm flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1" data-cursor="ENTER">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#B8B0A5] font-cinzel tracking-widest uppercase mb-6">
                    <span>YEAR: 2024</span>
                    <span>FORMAT: INTIMATE</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif tracking-wider uppercase text-[#F2EFE9] group-hover:text-[#8E1018] transition-colors mb-4">
                    SEALED CONFESSION
                  </h3>
                  <p className="text-sm text-[#B8B0A5] font-light leading-relaxed mb-8">
                    An intimate mentalism experience built around memory, identity, secrets and the stories we choose to reveal.
                  </p>
                </div>
                <a href="#sealedconfession" className="inline-flex items-center gap-2 text-xs font-cinzel tracking-widest text-[#F2EFE9] group-hover:text-[#8E1018] uppercase">
                  VIEW EXPERIENCE <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* INSIDER Card */}
              <div className="bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#8E1018]/60 p-8 md:p-10 rounded-sm flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1" data-cursor="ENTER">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#B8B0A5] font-cinzel tracking-widest uppercase mb-6">
                    <span>YEAR: 2024</span>
                    <span>FORMAT: THRILLER</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif tracking-wider uppercase text-[#F2EFE9] group-hover:text-[#8E1018] transition-colors mb-4">
                    INSIDER
                  </h3>
                  <p className="text-sm text-[#B8B0A5] font-light leading-relaxed mb-8">
                    What happens when two seemingly separate paths begin to converge? INSIDER explores the strange territory between choice, coincidence and connection.
                  </p>
                </div>
                <a href="#insider" className="inline-flex items-center gap-2 text-xs font-cinzel tracking-widest text-[#F2EFE9] group-hover:text-[#8E1018] uppercase">
                  VIEW EXPERIENCE <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 05 — MIRAGE
        ================================================== */}
        <section id="mirage" className="w-full bg-[#050505] text-[#F2EFE9] px-6 md:px-12 py-28 border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1a1a1a] pb-8">
              <div>
                <span className="text-xs text-[#8E1018] tracking-[0.3em] uppercase font-cinzel mb-2 block">
                  FEATURED WORK 01
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
                <span className="text-xs text-[#8E1018] font-cinzel tracking-widest uppercase block mb-2">01 / DISCIPLINE</span>
                <h4 className="text-lg font-serif text-[#F2EFE9] uppercase mb-2">THE EXPERIENCE</h4>
                <p className="text-xs text-[#B8B0A5] leading-relaxed font-light">
                  A theatrical mentalism experience built around perception, expectation and the fragile boundary between certainty and illusion.
                </p>
              </div>

              <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-sm">
                <span className="text-xs text-[#8E1018] font-cinzel tracking-widest uppercase block mb-2">02 / TEMPORALITY</span>
                <h4 className="text-lg font-serif text-[#F2EFE9] uppercase mb-2">THE MOMENT</h4>
                <p className="text-xs text-[#B8B0A5] leading-relaxed font-light">
                  An unscripted psychological convergence where audience decisions alter the arc of the performance in real-time.
                </p>
              </div>

              <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-sm">
                <span className="text-xs text-[#8E1018] font-cinzel tracking-widest uppercase block mb-2">03 / RESONANCE</span>
                <h4 className="text-lg font-serif text-[#F2EFE9] uppercase mb-2">THE MEMORY</h4>
                <p className="text-xs text-[#B8B0A5] leading-relaxed font-light">
                  A lasting impression that lingers long after the house lights return, challenging what was witnessed.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => openVideo('MIRAGE — TEASER TRAILER')}
                className="px-8 py-3.5 bg-[#8E1018] hover:bg-[#a6131c] text-[#F2EFE9] font-cinzel text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 inline-flex items-center gap-3"
                data-cursor="WATCH"
              >
                <Play className="w-4 h-4 fill-current" /> WATCH MIRAGE
              </button>
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 06 — PHYSIC HOUR
        ================================================== */}
        <section id="physichour" className="w-full bg-[#080808] text-[#F2EFE9] px-6 md:px-12 py-28 border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs text-[#8E1018] tracking-[0.3em] uppercase font-cinzel block">
                FEATURED WORK 02
              </span>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tight uppercase leading-none">
                PHYSIC <br />
                <span className="italic">HOUR</span>
              </h2>

              <p className="text-xl md:text-2xl font-serif text-[#B8B0A5] font-light leading-relaxed">
                A deeper encounter with perception.
              </p>

              <p className="text-sm md:text-base text-[#B8B0A5] leading-relaxed font-light">
                Where observation becomes participation, and the audience begins to question not the performer — but themselves.
              </p>

              <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-[#8E1018]">
                <span>[ DIAGRAMS ]</span>
                <span>[ MEASUREMENTS ]</span>
                <span>[ OBSERVATION MARKS ]</span>
              </div>
            </div>

            <div className="lg:col-span-6 h-[450px] lg:h-[550px] rounded-sm overflow-hidden border border-[#1a1a1a]">
              <PhysicHourVisual />
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 07 — SEALED CONFESSION
        ================================================== */}
        <section id="sealedconfession" className="w-full bg-[#12080a] text-[#F2EFE9] px-6 md:px-12 py-28 border-t border-[#2a1216]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 h-[450px] lg:h-[550px] rounded-sm overflow-hidden border border-[#3a181e] order-2 lg:order-1">
              <SealedConfessionVisual />
            </div>

            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <span className="text-xs text-[#8E1018] tracking-[0.3em] uppercase font-cinzel block">
                FEATURED WORK 03
              </span>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tight uppercase leading-none text-[#F2EFE9]">
                SEALED <br />
                <span className="italic text-[#8E1018]">CONFESSION</span>
              </h2>

              <p className="text-lg md:text-xl font-cinzel tracking-widest text-[#B8B0A5] uppercase italic">
                SOME THINGS ARE BETTER READ THAN EXPLAINED.
              </p>

              <p className="text-sm md:text-base text-[#B8B0A5] font-light leading-relaxed">
                An intimate mentalism experience built around memory, identity, secrets and the stories we choose to reveal.
              </p>
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 08 — INSIDER
        ================================================== */}
        <section id="insider" className="w-full bg-[#050505] text-[#F2EFE9] px-6 md:px-12 py-28 border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1a1a1a] pb-8">
              <div>
                <span className="text-xs text-[#8E1018] tracking-[0.3em] uppercase font-cinzel mb-2 block">
                  FEATURED WORK 04
                </span>
                <h2 className="text-5xl md:text-7xl font-serif tracking-tight uppercase">
                  INSIDER
                </h2>
              </div>
              <div className="text-sm font-cinzel tracking-[0.25em] text-[#B8B0A5] uppercase italic mt-4 md:mt-0">
                THE MYSTERY OF PARALLELS
              </div>
            </div>

            <div className="h-[450px] rounded-sm overflow-hidden border border-[#1a1a1a]">
              <InsiderVisual />
            </div>

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
        <section className="w-full bg-[#050505] text-[#F2EFE9] px-6 md:px-12 py-28 border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs text-[#8E1018] tracking-[0.3em] uppercase font-cinzel block">
                LIVE PERFORMANCE
              </span>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight uppercase text-[#F2EFE9]">
                THE STAGE <br />
                <span className="italic text-[#8E1018]">CHANGES EVERYTHING.</span>
              </h2>
            </div>

            <StagePerformanceVisual />

            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="text-lg md:text-xl font-cinzel tracking-widest uppercase text-[#F2EFE9]">
                ONE ROOM. ONE AUDIENCE. ONE IMPOSSIBLE MOMENT.
              </div>
              <p className="text-sm text-[#B8B0A5] font-light leading-relaxed">
                The performance is never completely the same twice. Because the most important variable is the person sitting across from him.
              </p>
            </div>
          </div>
        </section>


        {/* ==================================================
            PAGE 11 — THE ARCHIVE
        ================================================== */}
        <ArchiveSection />


        {/* ==================================================
            PAGE 12 — ABOUT
        ================================================== */}
        <section id="about" className="w-full bg-[#080808] text-[#F2EFE9] px-6 md:px-12 py-28 border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 h-[500px] rounded-sm overflow-hidden border border-[#1a1a1a]">
              <HeroPortraitVisual />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs text-[#8E1018] tracking-[0.3em] uppercase font-cinzel block">
                04 / THE ARTIST
              </span>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight uppercase leading-none">
                BEHIND <br />
                <span className="italic">THE MIND</span>
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
                <p className="text-[#F2EFE9] font-serif text-lg italic pt-4">
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
        <section className="w-full bg-[#050505] text-[#F2EFE9] px-6 md:px-12 py-24 border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs text-[#8E1018] tracking-[0.3em] uppercase font-cinzel mb-3 block">
                ENGAGEMENT & MEDIA
              </span>
              <h2 className="text-3xl md:text-5xl font-serif tracking-tight uppercase">
                IN THE WORLD
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
              {['PRESS', 'INTERVIEWS', 'FEATURES', 'EVENTS', 'COLLABORATIONS', 'MEDIA'].map((badge) => (
                <div key={badge} className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-sm flex flex-col items-center justify-center">
                  <span className="text-xs font-cinzel tracking-widest text-[#B8B0A5] uppercase">
                    {badge}
                  </span>
                  <span className="text-[9px] text-[#8E1018] font-mono tracking-widest uppercase mt-2">
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
          FINAL FOOTER
      ================================================== */}
      <footer className="w-full bg-[#030303] text-[#F2EFE9] border-t border-[#1a1a1a] px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-[#1a1a1a]">
          <div className="md:col-span-6 space-y-3">
            <h3 className="text-2xl font-cinzel tracking-[0.25em] font-bold text-[#F2EFE9]">
              MENTALIST SRAVAN
            </h3>
            <p className="text-xs font-serif italic text-[#8E1018] tracking-widest uppercase">
              WHERE THOUGHT BECOMES THEATRE.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs font-cinzel tracking-widest text-[#B8B0A5] uppercase">
            <a href="#mentalist" className="block hover:text-[#F2EFE9] transition-colors">THE MENTALIST</a>
            <a href="#experiences" className="block hover:text-[#F2EFE9] transition-colors">EXPERIENCES</a>
            <a href="#archive" className="block hover:text-[#F2EFE9] transition-colors">ARCHIVE</a>
            <a href="#about" className="block hover:text-[#F2EFE9] transition-colors">ABOUT</a>
            <a href="#booking" className="block hover:text-[#F2EFE9] transition-colors">BOOK</a>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs font-cinzel tracking-widest text-[#B8B0A5] uppercase">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block hover:text-[#8E1018] transition-colors">
              INSTAGRAM ↗
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="block hover:text-[#8E1018] transition-colors">
              YOUTUBE ↗
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-cinzel tracking-widest text-[#B8B0A5]/60 uppercase">
          <span>© MENTALIST SRAVAN. ALL RIGHTS RESERVED.</span>
          <span>MENTALISM • PSYCHOLOGICAL ILLUSION • LIVE PERFORMANCE</span>
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
