import React, { useState, useEffect } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw,
  ExternalLink,
  LogOut,
  Sliders,
  Inbox,
  Key,
  Download,
  Phone,
  Mail,
  Calendar,
  MapPin,
  RefreshCw,
  Search,
  Check,
  Video,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useSiteSettings, defaultSettings } from '../context/SiteSettingsContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { LogoEmblem } from './SravanVisuals';

const AUTH_STORAGE_KEY = 'ms_admin_auth_session';
const ACCESS_CODE_KEY = 'ms_admin_custom_code';
const DEFAULT_ACCESS_CODE = import.meta.env.VITE_ADMIN_ACCESS_CODE || 'SRAVAN2025';

export const AdminDashboard = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });
  const [inputCode, setInputCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'enquiries' | 'system'

  // Settings Hook
  const { settings, updateSettings, resetSettings } = useSiteSettings();
  const [formData, setFormData] = useState(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Enquiries CRM State
  const [enquiries, setEnquiries] = useState([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  // Change Access Code State
  const [currentCodeInput, setCurrentCodeInput] = useState('');
  const [newCodeInput, setNewCodeInput] = useState('');
  const [codeChangeSuccess, setCodeChangeSuccess] = useState(false);
  const [codeChangeError, setCodeChangeError] = useState('');

  // Sync local form state whenever context settings change
  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  // Fetch Enquiries from Supabase
  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching enquiries:', error);
        } else {
          setEnquiries(data || []);
        }
      }
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  // Subscribe to real-time additions when authenticated on enquiries tab
  useEffect(() => {
    if (isAuthenticated && activeTab === 'enquiries') {
      fetchEnquiries();

      if (isSupabaseConfigured && supabase) {
        const channel = supabase
          .channel('realtime_enquiries_admin')
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'enquiries' },
            (payload) => {
              setEnquiries((prev) => [payload.new, ...prev]);
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      }
    }
  }, [isAuthenticated, activeTab]);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    const currentAccessCode = localStorage.getItem(ACCESS_CODE_KEY) || DEFAULT_ACCESS_CODE;

    if (inputCode.trim() === currentAccessCode.trim()) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setInputCode('');
    } else {
      setLoginError('Invalid access code. Please verify and try again.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  // Save Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Reset to Defaults
  const handleResetSettings = () => {
    if (window.confirm('Reset all site settings to factory defaults?')) {
      resetSettings();
      setFormData(defaultSettings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Update Access Code
  const handleUpdateCode = (e) => {
    e.preventDefault();
    setCodeChangeError('');
    setCodeChangeSuccess(false);

    const currentSavedCode = localStorage.getItem(ACCESS_CODE_KEY) || DEFAULT_ACCESS_CODE;

    if (currentCodeInput.trim() !== currentSavedCode.trim()) {
      setCodeChangeError('Current access code is incorrect.');
      return;
    }

    if (newCodeInput.trim().length < 4) {
      setCodeChangeError('New access code must be at least 4 characters long.');
      return;
    }

    localStorage.setItem(ACCESS_CODE_KEY, newCodeInput.trim());
    setCodeChangeSuccess(true);
    setCurrentCodeInput('');
    setNewCodeInput('');
    setTimeout(() => setCodeChangeSuccess(false), 4000);
  };

  // Export Enquiries as CSV
  const handleExportCSV = () => {
    if (enquiries.length === 0) return;

    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Event Type', 'Proposed Date', 'Location', 'Message'];
    const rows = enquiries.map((e) => [
      e.id,
      new Date(e.created_at).toLocaleString(),
      `"${(e.name || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.phone || '').replace(/"/g, '""')}"`,
      `"${(e.event_type || '').replace(/"/g, '""')}"`,
      `"${(e.date || '').replace(/"/g, '""')}"`,
      `"${(e.location || '').replace(/"/g, '""')}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Mentalist_Sravan_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      (e.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.phone || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.message || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'ALL' || e.event_type === filterType;

    return matchesSearch && matchesType;
  });

  // =========================================================================
  // VIEW 1: ACCESS CODE LOCK SCREEN (When Not Authenticated)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-black text-[#F2EFE9] flex flex-col items-center justify-center p-6 selection:bg-[#8E1018] selection:text-[#F2EFE9]">
        <div className="w-full max-w-md bg-[#0a0a0a] border border-white/15 p-8 sm:p-10 shadow-2xl relative">
          {/* Brand header */}
          <div className="text-center space-y-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center mx-auto text-[#C5A059]">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-cinzel tracking-[0.35em] text-[#8E1018] uppercase block font-semibold">
                CONFIDENTIAL PORTAL
              </span>
              <h2 className="text-2xl font-serif tracking-wider uppercase text-[#F2EFE9]">
                MANAGEMENT ACCESS
              </h2>
              <p className="text-xs text-[#B8B0A5] font-light">
                Enter your private access code to manage live website settings.
              </p>
            </div>
          </div>

          {/* Access Code Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                ACCESS CODE
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Enter access code"
                  className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-sm tracking-widest outline-none transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8B0A5] hover:text-[#F2EFE9] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-[#8E1018]/20 border border-[#8E1018]/50 text-xs text-[#F2EFE9] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#8E1018] shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C5A059] hover:bg-[#8E1018] text-black hover:text-[#F2EFE9] font-cinzel text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Key className="w-4 h-4" /> UNLOCK MANAGEMENT
            </button>
          </form>

          {/* Exit Link */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[11px] font-cinzel tracking-widest text-[#B8B0A5] hover:text-[#C5A059] uppercase transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> RETURN TO PUBLIC SITE
            </a>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-black text-[#F2EFE9] font-sans-body selection:bg-[#8E1018] selection:text-[#F2EFE9]">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#070707]/95 backdrop-blur-md border-b border-white/10 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoEmblem className="h-8 w-auto" />
            <div>
              <h1 className="text-base font-serif tracking-wider uppercase text-[#F2EFE9]">
                MENTALIST SRAVAN
              </h1>
              <span className="text-[10px] font-cinzel tracking-[0.25em] text-[#C5A059] uppercase block">
                ADMINISTRATION &amp; LIVE CONTROLS
              </span>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-cinzel tracking-widest text-[#F2EFE9] border border-white/20 hover:border-white uppercase transition-colors flex items-center gap-1.5"
            >
              VIEW LIVE SITE <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-cinzel tracking-widest text-[#8E1018] hover:text-[#F2EFE9] border border-[#8E1018]/50 hover:bg-[#8E1018] uppercase transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> LOCK
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-6 mt-4 border-t border-white/10 pt-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-2 px-3 text-xs font-cinzel tracking-[0.2em] uppercase transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'content'
                ? 'border-[#C5A059] text-[#C5A059] font-bold'
                : 'border-transparent text-[#B8B0A5] hover:text-[#F2EFE9]'
            }`}
          >
            <Sliders className="w-4 h-4" /> LIVE CONTENT &amp; SETTINGS
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`py-2 px-3 text-xs font-cinzel tracking-[0.2em] uppercase transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'enquiries'
                ? 'border-[#C5A059] text-[#C5A059] font-bold'
                : 'border-transparent text-[#B8B0A5] hover:text-[#F2EFE9]'
            }`}
          >
            <Inbox className="w-4 h-4" /> ENQUIRIES CRM{' '}
            {enquiries.length > 0 && (
              <span className="bg-[#8E1018] text-[#F2EFE9] text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                {enquiries.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`py-2 px-3 text-xs font-cinzel tracking-[0.2em] uppercase transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'system'
                ? 'border-[#C5A059] text-[#C5A059] font-bold'
                : 'border-transparent text-[#B8B0A5] hover:text-[#F2EFE9]'
            }`}
          >
            <Key className="w-4 h-4" /> ACCESS CODE &amp; SYSTEM
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* ===============================================================
            TAB 1: LIVE CONTENT & SETTINGS
        =============================================================== */}
        {activeTab === 'content' && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wider text-[#F2EFE9]">
                  LIVE WEBSITE CONTENT
                </h2>
                <p className="text-xs text-[#B8B0A5] font-light">
                  Changes saved here immediately update the live public site for all visitors.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetSettings}
                  className="px-4 py-2.5 text-xs font-cinzel tracking-widest text-[#B8B0A5] hover:text-[#F2EFE9] border border-white/15 hover:border-white/40 uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> DEFAULTS
                </button>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-6 py-2.5 bg-[#C5A059] hover:bg-[#8E1018] text-black hover:text-[#F2EFE9] font-cinzel text-xs tracking-widest uppercase font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Save className="w-4 h-4" /> SAVE LIVE CHANGES
                </button>
              </div>
            </div>

            {saveSuccess && (
              <div className="p-4 bg-[#C5A059]/10 border border-[#C5A059] text-xs text-[#C5A059] flex items-center gap-2 font-cinzel tracking-wider uppercase animate-[fadeIn_0.2s_ease-out]">
                <CheckCircle2 className="w-4 h-4" />
                Live changes published successfully! Visiting the site will now reflect these updates.
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-8">
              {/* Section: Hero & Core Messaging */}
              <div className="bg-[#0a0a0a] border border-white/15 p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-lg font-serif uppercase tracking-wider text-[#F2EFE9] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" /> 01 / HERO &amp; HEADER MESSAGING
                  </h3>
                  <span className="text-[10px] font-cinzel tracking-widest text-[#C5A059] uppercase">
                    HOMEPAGE ABOVE THE FOLD
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                      HERO HEADLINE TITLE
                    </label>
                    <input
                      type="text"
                      value={formData.heroTitle}
                      onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                      className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                      HERO TAGLINE (SIGNATURE STATEMENT)
                    </label>
                    <input
                      type="text"
                      value={formData.heroTagline}
                      onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
                      className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                    HERO INTRODUCTORY PARAGRAPH
                  </label>
                  <textarea
                    rows={3}
                    value={formData.heroSubtitle}
                    onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                    BOOKING BADGE TEXT
                  </label>
                  <input
                    type="text"
                    value={formData.bookingBadge}
                    onChange={(e) => setFormData({ ...formData, bookingBadge: e.target.value })}
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Section: Announcement Banner */}
              <div className="bg-[#0a0a0a] border border-white/15 p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-lg font-serif uppercase tracking-wider text-[#F2EFE9] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#C5A059]" /> 02 / TOP ANNOUNCEMENT BANNER
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase">
                      {formData.announcementActive ? 'ACTIVE ON SITE' : 'DISABLED'}
                    </span>
                    <input
                      type="checkbox"
                      id="announcementActive"
                      checked={formData.announcementActive}
                      onChange={(e) => setFormData({ ...formData, announcementActive: e.target.checked })}
                      className="w-4 h-4 accent-[#C5A059] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                      BANNER TEXT MESSAGE
                    </label>
                    <input
                      type="text"
                      value={formData.announcementText}
                      onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                      placeholder="e.g. SPECIAL THEATRICAL TOUR 2025 — DATES ANNOUNCED"
                      className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                      BANNER LINK (URL OR ANCHOR)
                    </label>
                    <input
                      type="text"
                      value={formData.announcementLink}
                      onChange={(e) => setFormData({ ...formData, announcementLink: e.target.value })}
                      placeholder="#booking or https://..."
                      className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Media & Showreel Stream URLs */}
              <div className="bg-[#0a0a0a] border border-white/15 p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-lg font-serif uppercase tracking-wider text-[#F2EFE9] flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#C5A059]" /> 03 / STREAMING SHOWREEL &amp; PRODUCTION VIDEO LINKS
                  </h3>
                  <span className="text-[10px] font-cinzel tracking-widest text-[#C5A059] uppercase">
                    MP4 DIRECT STREAM URLS
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                      MAIN SHOWREEL VIDEO URL
                    </label>
                    <input
                      type="text"
                      value={formData.mainShowreelVideo}
                      onChange={(e) => setFormData({ ...formData, mainShowreelVideo: e.target.value })}
                      className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                      HISTORY SHOW TRAILER URL
                    </label>
                    <input
                      type="text"
                      value={formData.historyShowVideo}
                      onChange={(e) => setFormData({ ...formData, historyShowVideo: e.target.value })}
                      className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                      MIRAGE TRAILER URL
                    </label>
                    <input
                      type="text"
                      value={formData.mirageVideo}
                      onChange={(e) => setFormData({ ...formData, mirageVideo: e.target.value })}
                      className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                      INSIDER TRAILER URL
                    </label>
                    <input
                      type="text"
                      value={formData.insiderVideo}
                      onChange={(e) => setFormData({ ...formData, insiderVideo: e.target.value })}
                      className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Opening Sequence Loading Behavior */}
              <div className="bg-[#0a0a0a] border border-white/15 p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-serif uppercase tracking-wider text-[#F2EFE9]">
                      04 / OPENING SEQUENCE ANIMATION
                    </h3>
                    <p className="text-xs text-[#B8B0A5] font-light">
                      Enable or disable the 300-frame theatrical corridor loading animation when visitors enter the website.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-cinzel tracking-widest text-[#C5A059] uppercase">
                      {formData.enableLoadingSequence ? 'ENABLED' : 'BYPASSED'}
                    </span>
                    <input
                      type="checkbox"
                      id="enableLoadingSequence"
                      checked={formData.enableLoadingSequence}
                      onChange={(e) => setFormData({ ...formData, enableLoadingSequence: e.target.checked })}
                      className="w-4 h-4 accent-[#C5A059] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#C5A059] hover:bg-[#8E1018] text-black hover:text-[#F2EFE9] font-cinzel text-xs tracking-[0.25em] uppercase font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xl"
                >
                  <Save className="w-4 h-4" /> PUBLISH LIVE CHANGES
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ===============================================================
            TAB 2: REALTIME ENQUIRIES CRM
        =============================================================== */}
        {activeTab === 'enquiries' && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wider text-[#F2EFE9]">
                  CLIENT ENQUIRIES &amp; LEADS
                </h2>
                <p className="text-xs text-[#B8B0A5] font-light">
                  Live submissions received from the website booking form connected to Supabase.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={fetchEnquiries}
                  disabled={loadingEnquiries}
                  className="px-4 py-2.5 text-xs font-cinzel tracking-widest text-[#B8B0A5] hover:text-[#F2EFE9] border border-white/15 hover:border-white/40 uppercase transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingEnquiries ? 'animate-spin' : ''}`} /> REFRESH
                </button>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  disabled={enquiries.length === 0}
                  className="px-5 py-2.5 bg-[#F2EFE9] hover:bg-[#C5A059] text-black font-cinzel text-xs tracking-widest uppercase font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" /> EXPORT CSV
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#0a0a0a] border border-white/10 p-4 text-center">
                <span className="text-2xl font-serif font-bold text-[#C5A059] block">
                  {enquiries.length}
                </span>
                <span className="text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase">
                  TOTAL ENQUIRIES
                </span>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 p-4 text-center">
                <span className="text-2xl font-serif font-bold text-[#F2EFE9] block">
                  {enquiries.filter((e) => e.event_type?.includes('Theatrical')).length}
                </span>
                <span className="text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase">
                  THEATRICAL
                </span>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 p-4 text-center">
                <span className="text-2xl font-serif font-bold text-[#F2EFE9] block">
                  {enquiries.filter((e) => e.event_type?.includes('Private')).length}
                </span>
                <span className="text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase">
                  PRIVATE EVENTS
                </span>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 p-4 text-center">
                <span className="text-2xl font-serif font-bold text-[#8E1018] block">
                  {enquiries.filter((e) => e.phone).length}
                </span>
                <span className="text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase">
                  WITH PHONE NUMBERS
                </span>
              </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="bg-[#0a0a0a] border border-white/15 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-[#B8B0A5] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, phone, location..."
                  className="w-full bg-black border border-white/15 focus:border-[#C5A059] text-[#F2EFE9] pl-9 pr-4 py-2.5 text-xs tracking-wider outline-none transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                {['ALL', 'Theatrical Engagement', 'Private Experience', 'Exclusive Gathering', 'Festival / Cultural Stage'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1.5 text-[10px] font-cinzel tracking-widest uppercase transition-all whitespace-nowrap rounded-sm cursor-pointer ${
                      filterType === type
                        ? 'bg-[#C5A059] text-black font-bold'
                        : 'text-[#B8B0A5] hover:text-[#F2EFE9] border border-white/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Enquiries List */}
            {loadingEnquiries ? (
              <div className="text-center py-16 space-y-3 bg-[#0a0a0a] border border-white/10">
                <RefreshCw className="w-8 h-8 text-[#C5A059] animate-spin mx-auto" />
                <p className="text-xs font-cinzel tracking-widest text-[#B8B0A5] uppercase">
                  FETCHING LIVE ENQUIRIES FROM SUPABASE...
                </p>
              </div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="text-center py-16 space-y-3 bg-[#0a0a0a] border border-white/10">
                <Inbox className="w-10 h-10 text-[#B8B0A5]/40 mx-auto" />
                <p className="text-sm font-serif text-[#F2EFE9] uppercase">
                  NO ENQUIRIES FOUND
                </p>
                <p className="text-xs text-[#B8B0A5] max-w-sm mx-auto">
                  {searchTerm ? 'No submissions match your search query.' : 'Submissions through the booking form will show up here in real-time.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEnquiries.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#0a0a0a] border border-white/15 p-6 hover:border-[#C5A059]/50 transition-all space-y-4 relative group"
                  >
                    {/* Header line */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-serif text-[#F2EFE9] font-bold tracking-wider">
                          {item.name}
                        </span>
                        <span className="bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 text-[9px] font-cinzel tracking-widest px-2.5 py-0.5 uppercase">
                          {item.event_type || 'Enquiry'}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#B8B0A5]">
                        {new Date(item.created_at).toLocaleString()}
                      </span>
                    </div>

                    {/* Contact & Event Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                        <a
                          href={`mailto:${item.email}`}
                          className="text-[#F2EFE9] hover:text-[#C5A059] transition-colors underline truncate"
                        >
                          {item.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                        <a
                          href={`tel:${item.phone}`}
                          className="text-[#F2EFE9] hover:text-[#C5A059] transition-colors font-mono"
                        >
                          {item.phone}
                        </a>
                      </div>

                      {item.date && (
                        <div className="flex items-center gap-2 text-[#B8B0A5]">
                          <Calendar className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                          <span>Date: {item.date}</span>
                        </div>
                      )}

                      {item.location && (
                        <div className="flex items-center gap-2 text-[#B8B0A5]">
                          <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Message Body */}
                    {item.message && (
                      <div className="bg-black/60 border border-white/10 p-3.5 text-xs text-[#B8B0A5] leading-relaxed font-light">
                        <span className="text-[9px] font-cinzel tracking-widest text-[#C5A059] uppercase block mb-1">
                          MESSAGE:
                        </span>
                        {item.message}
                      </div>
                    )}

                    {/* Direct Contact Actions */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={`tel:${item.phone}`}
                        className="px-3.5 py-1.5 bg-[#8E1018] hover:bg-[#a6131c] text-[#F2EFE9] text-[10px] font-cinzel tracking-widest uppercase flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3 h-3" /> CALL NOW
                      </a>
                      <a
                        href={`mailto:${item.email}?subject=Regarding%20Your%20Mentalist%20Sravan%20Enquiry`}
                        className="px-3.5 py-1.5 border border-white/20 hover:border-white text-[#F2EFE9] text-[10px] font-cinzel tracking-widest uppercase flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3 h-3" /> EMAIL CLIENT
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===============================================================
            TAB 3: SYSTEM & ACCESS CODE
        =============================================================== */}
        {activeTab === 'system' && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            <div className="border-b border-white/10 pb-6">
              <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wider text-[#F2EFE9]">
                ACCESS CODE &amp; SYSTEM HEALTH
              </h2>
              <p className="text-xs text-[#B8B0A5] font-light">
                Configure your private dashboard passcode and verify database connectivity.
              </p>
            </div>

            {/* Change Access Code Card */}
            <div className="bg-[#0a0a0a] border border-white/15 p-6 md:p-8 space-y-6 max-w-xl">
              <div className="flex items-center gap-2 text-lg font-serif uppercase tracking-wider text-[#F2EFE9] border-b border-white/10 pb-4">
                <Key className="w-5 h-5 text-[#C5A059]" /> CHANGE ACCESS CODE
              </div>

              <form onSubmit={handleUpdateCode} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                    CURRENT ACCESS CODE
                  </label>
                  <input
                    type="password"
                    required
                    value={currentCodeInput}
                    onChange={(e) => setCurrentCodeInput(e.target.value)}
                    placeholder="Enter current passcode"
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2">
                    NEW ACCESS CODE
                  </label>
                  <input
                    type="text"
                    required
                    value={newCodeInput}
                    onChange={(e) => setNewCodeInput(e.target.value)}
                    placeholder="Enter new passcode (min 4 chars)"
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                  />
                </div>

                {codeChangeError && (
                  <div className="p-3 bg-[#8E1018]/20 border border-[#8E1018]/50 text-xs text-[#F2EFE9] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#8E1018] shrink-0" />
                    <span>{codeChangeError}</span>
                  </div>
                )}

                {codeChangeSuccess && (
                  <div className="p-3 bg-[#C5A059]/20 border border-[#C5A059]/50 text-xs text-[#C5A059] flex items-center gap-2 font-cinzel tracking-wider uppercase">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Access code updated successfully!</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C5A059] hover:bg-[#8E1018] text-black hover:text-[#F2EFE9] font-cinzel text-xs tracking-[0.2em] uppercase font-bold transition-all cursor-pointer"
                >
                  SAVE NEW ACCESS CODE
                </button>
              </form>
            </div>

            {/* Supabase Connection Details */}
            <div className="bg-[#0a0a0a] border border-white/15 p-6 md:p-8 space-y-4 max-w-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-lg font-serif uppercase tracking-wider text-[#F2EFE9]">
                  <ShieldCheck className="w-5 h-5 text-[#C5A059]" /> DATABASE STATUS
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-cinzel tracking-widest text-[#C5A059] uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> CONNECTED
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase block mb-1">
                    PROJECT ENDPOINT
                  </span>
                  <div className="bg-black p-2.5 font-mono text-[11px] text-[#F2EFE9] border border-white/10 truncate">
                    https://ivmeaeptqqjthbcwuhhr.supabase.co
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase block mb-1">
                    TARGET TABLE
                  </span>
                  <div className="bg-black p-2.5 font-mono text-[11px] text-[#F2EFE9] border border-white/10">
                    public.enquiries
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://supabase.com/dashboard/project/ivmeaeptqqjthbcwuhhr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-cinzel tracking-widest text-[#C5A059] hover:text-[#F2EFE9] uppercase border-b border-[#C5A059] pb-0.5 transition-colors"
                  >
                    OPEN SUPABASE DASHBOARD ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
