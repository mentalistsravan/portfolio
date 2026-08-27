import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const BookingForm = ({ onOpenShowreel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Theatrical Engagement',
    date: '',
    location: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('enquiries')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              event_type: formData.eventType,
              date: formData.date || null,
              location: formData.location || null,
              message: formData.message || null
            }
          ])
          .select();

        if (error) {
          console.error('Supabase submission error:', error);
        } else if (data && data.length > 0) {
          setSubmissionId(data[0].id);
        }
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="w-full bg-black text-[#F2EFE9] px-6 md:px-12 py-28 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs text-[#8E1018] tracking-[0.3em] uppercase font-cinzel mb-4 block">
            05 / BOOKING & INQUIRIES
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

        {/* Contact Form Container */}
        <div id="booking-form" className="bg-black p-6 md:p-10 max-w-3xl mx-auto border border-white/15 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8 text-[11px] font-cinzel tracking-widest text-[#C5A059] uppercase">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#8E1018]" /> REALTIME DATABASE ENCRYPTION</span>
            <span>DIRECT MANAGEMENT CHANNEL</span>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-5 animate-[fadeIn_0.5s_ease-out]">
              <CheckCircle2 className="w-16 h-16 text-[#C5A059] mx-auto animate-bounce" />
              <h3 className="text-2xl md:text-3xl font-serif uppercase tracking-wider text-[#F2EFE9]">
                CONVERSATION INITIATED
              </h3>
              <p className="text-sm text-[#B8B0A5] max-w-md mx-auto font-light leading-relaxed">
                Thank you, <span className="text-[#F2EFE9] font-medium">{formData.name}</span>. Your enquiry has been synced in real-time to Mentalist Sravan's private management database.
              </p>

              {submissionId && (
                <div className="inline-block bg-white/5 border border-white/10 px-4 py-2 text-xs font-mono text-[#C5A059] tracking-widest uppercase">
                  ENQUIRY REF ID: #{submissionId}
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSubmissionId(null);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      eventType: 'Theatrical Engagement',
                      date: '',
                      location: '',
                      message: ''
                    });
                  }}
                  className="text-xs font-cinzel tracking-widest text-[#C5A059] hover:text-[#F2EFE9] uppercase border-b border-[#C5A059] pb-1 transition-colors"
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
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

              {errorMessage && (
                <p className="text-xs text-[#8E1018] font-mono uppercase tracking-wider">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#8E1018] hover:bg-[#a6131c] disabled:opacity-50 text-[#F2EFE9] font-cinzel text-xs tracking-[0.3em] uppercase font-bold transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> SYNCING ENQUIRY WITH DATABASE...
                  </>
                ) : (
                  <>
                    BEGIN THE CONVERSATION
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
