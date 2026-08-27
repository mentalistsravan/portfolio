import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AudioAmbient } from './AudioAmbient';

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
    { name: 'CRAFT', href: '#craft' },
    { name: 'ARCHIVE', href: '#archive' },
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
            ? 'bg-[#050505]/80 backdrop-blur-md border-b border-[#1a1a1a] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-lg md:text-xl font-cinzel font-bold tracking-[0.25em] text-[#F2EFE9] hover:text-[#8E1018] transition-colors duration-300"
            data-cursor="SRAVAN"
          >
            SRAVAN
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-cinzel tracking-[0.2em] text-[#B8B0A5] hover:text-[#F2EFE9] transition-colors duration-300 relative group py-1"
                data-cursor="GO"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8E1018] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center space-x-4">
            <AudioAmbient />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#F2EFE9] hover:text-[#8E1018] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#050505] flex flex-col justify-center px-8 transition-all duration-500 lg:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-6">
          <div className="text-xs text-[#8E1018] font-cinzel tracking-widest uppercase mb-4">
            NAVIGATION
          </div>
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-2xl md:text-3xl font-cinzel font-light tracking-[0.2em] text-[#F2EFE9] hover:text-[#8E1018] transition-colors duration-300 flex items-center justify-between border-b border-[#1a1a1a] pb-4"
            >
              <span>{link.name}</span>
              <span className="text-xs text-[#B8B0A5] font-mono">0{idx + 1}</span>
            </a>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[#1a1a1a] flex items-center justify-between text-xs text-[#B8B0A5] font-cinzel">
          <span>MENTALIST SRAVAN</span>
          <span>WHERE THOUGHT BECOMES THEATRE.</span>
        </div>
      </div>
    </>
  );
};
