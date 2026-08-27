import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const BookingForm = ({ onOpenShowreel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: 'Theatrical Engagement',
    date: '',
    location: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="booking" className="w-full bg-black text-[#F2EFE9] px-6 md:px-12 py-28 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs text-[#8E1018] tracking-[0.3em] uppercase font-cinzel mb-4 block">
            06 / BOOKING & INQUIRIES
          </span>
          <h2 className="text-3xl md:text-6xl font-serif tracking-tight uppercase max-w-3xl mx-auto leading-tight mb-6">
            READY TO QUESTION WHAT YOU KNOW?
          </h2>
          <p className="text-sm md:text-base text-[#B8B0A5] font-light max-w-2xl mx-auto leading-relaxed">
            Bring Mentalist Sravan into the room. Available for live theatre performances, private high-end engagements, bespoke theatrical experiences, and select private events.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="#booking-form"
              className="px-8 py-3.5 text-xs font-cinzel tracking-[0.25em] text-black bg-[#F2EFE9] hover:bg-[#8E1018] hover:text-[#F2EFE9] transition-all duration-300 uppercase font-semibold"
            >
              BOOK THE EXPERIENCE
            </a>
            <button
              onClick={onOpenShowreel}
              className="px-8 py-3.5 text-xs font-cinzel tracking-[0.25em] text-[#F2EFE9] border border-white/20 hover:border-white transition-all duration-300 uppercase"
            >
              STREAM SHOWREEL IN SITE
            </button>
          </div>
        </div>

        {/* Contact Form Plain */}
        <div id="booking-form" className="bg-black p-4 md:p-8 max-w-3xl mx-auto">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-[fadeIn_0.5s_ease-out]">
              <CheckCircle2 className="w-14 h-14 text-[#8E1018] mx-auto" />
              <h3 className="text-2xl font-serif uppercase tracking-wider text-[#F2EFE9]">
                CONVERSATION INITIATED
              </h3>
              <p className="text-sm text-[#B8B0A5] max-w-md mx-auto font-light">
                Thank you for your inquiry. Mentalist Sravan's management team will review details and connect with you directly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs font-cinzel tracking-widest text-[#8E1018] hover:text-[#F2EFE9] uppercase border-b border-[#8E1018] pb-1"
              >
                SUBMIT ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@domain.com"
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                    EVENT TYPE
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                  >
                    <option value="Theatrical Engagement">Theatrical Engagement</option>
                    <option value="Private Experience">Private Experience</option>
                    <option value="Exclusive Gathering">Exclusive Gathering</option>
                    <option value="Festival / Cultural Stage">Festival / Cultural Stage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                    PROPOSED DATE
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                    LOCATION / CITY
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, Country"
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                  MESSAGE / PERFORMANCE REQUIREMENTS
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding audience size, venue atmospheric preferences, or specific inquiries..."
                  className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#8E1018] hover:bg-[#a6131c] text-[#F2EFE9] font-cinzel text-xs tracking-[0.3em] uppercase font-bold transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                BEGIN THE CONVERSATION
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
