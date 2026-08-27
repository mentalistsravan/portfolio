import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AudioAmbient } from './AudioAmbient';
import { LogoEmblem } from './SravanVisuals';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'THE MENTALIST', href: '#mentalist' },
    { name: 'EXPERIENCES', href: '#experiences' },
    { name: 'HISTORY SHOW', href: '#historyshow' },
    { name: 'PORTRAITS', href: '#portraits' },
    { name: 'ABOUT', href: '#about' },
    { name: 'BOOK', href: '#booking' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md py-3 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo with Title ALWAYS 'Mentalist Sravan' */}
          <a
            href="#"
            className="flex items-center gap-3 group"
          >
            <LogoEmblem className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-serif font-semibold tracking-wider text-[#F2EFE9] group-hover:text-[#C5A059] transition-colors uppercase">
                Mentalist Sravan
              </span>
              <span className="text-[9px] font-cinzel tracking-[0.2em] text-[#C5A059] opacity-90 uppercase">
                PERFORMANCE ARTIST
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-cinzel tracking-[0.2em] text-[#B8B0A5] hover:text-[#C5A059] transition-colors duration-300 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A059] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center space-x-4">
            <AudioAmbient />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#F2EFE9] hover:text-[#C5A059] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#C5A059]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Plain Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col justify-center px-8 transition-all duration-500 lg:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <LogoEmblem className="h-12 w-auto" />
            <span className="text-xl font-serif font-bold tracking-wider text-[#F2EFE9] uppercase">
              Mentalist Sravan
            </span>
          </div>

          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-2xl md:text-3xl font-cinzel font-light tracking-[0.2em] text-[#F2EFE9] hover:text-[#C5A059] transition-colors duration-300 flex items-center justify-between border-b border-white/5 pb-3"
            >
              <span>{link.name}</span>
              <span className="text-xs text-[#C5A059] font-mono">0{idx + 1}</span>
            </a>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#B8B0A5] font-cinzel">
          <span>Mentalist Sravan</span>
          <span className="text-[#C5A059]">WHERE THOUGHT BECOMES THEATRE.</span>
        </div>
      </div>
    </>
  );
};
