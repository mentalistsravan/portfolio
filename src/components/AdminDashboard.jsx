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
  ArrowLeft,
  Ticket,
  CreditCard,
  Plus,
  Trash2,
  Edit3,
  Users,
  DollarSign,
  X
} from 'lucide-react';
import { useSiteSettings, defaultSettings, initialShows } from '../context/SiteSettingsContext';
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
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'enquiries' | 'ticketing' | 'system'

  // Settings & Shows Hook
  const {
    settings,
    updateSettings,
    resetSettings,
    shows,
    addShow,
    updateShow,
    deleteShow,
    bookings
  } = useSiteSettings();

  const [formData, setFormData] = useState(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Enquiries CRM State
  const [enquiries, setEnquiries] = useState([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  // Ticketing & Attendees State
  const [liveBookings, setLiveBookings] = useState(bookings || []);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [ticketSearch, setTicketSearch] = useState('');
  const [selectedShowFilter, setSelectedShowFilter] = useState('ALL');
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [editingShow, setEditingShow] = useState(null);

  // Show Form State
  const [showForm, setShowForm] = useState({
    title: '',
    subtitle: '',
    date: '',
    time: '',
    venue: '',
    city: '',
    category: 'GRAND THEATRE',
    status: 'AVAILABLE',
    tiers: [
      { id: 'tier-1', name: 'VIP Circle', price: 2999, description: 'VIP Seating', seatsAvailable: 30, seatsTotal: 30 },
      { id: 'tier-2', name: 'General Admission', price: 999, description: 'Standard Seating', seatsAvailable: 100, seatsTotal: 100 }
    ]
  });

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

        if (!error && data) {
          setEnquiries(data);
        }
      }
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  // Fetch Ticket Bookings from Supabase
  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('ticket_bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          // Merge Supabase with local bookings deduplicating by booking_ref
          const map = new Map();
          data.forEach((b) => map.set(b.booking_ref, b));
          (bookings || []).forEach((b) => {
            if (!map.has(b.booking_ref)) map.set(b.booking_ref, b);
          });
          setLiveBookings(Array.from(map.values()));
        } else {
          setLiveBookings(bookings || []);
        }
      } else {
        setLiveBookings(bookings || []);
      }
    } catch (err) {
      setLiveBookings(bookings || []);
    } finally {
      setLoadingBookings(false);
    }
  };

  // Subscribe to real-time additions when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'enquiries') {
        fetchEnquiries();
      }
      if (activeTab === 'ticketing') {
        fetchBookings();
      }
    }
  }, [isAuthenticated, activeTab, bookings]);

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
    if (e) e.preventDefault();
    updateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Reset to Defaults
  const handleResetSettings = () => {
    if (window.confirm('Reset all site settings and shows to factory defaults?')) {
      resetSettings();
      setFormData(defaultSettings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Open Show Modal for Add / Edit
  const handleOpenShowModal = (show = null) => {
    if (show) {
      setEditingShow(show);
      setShowForm({ ...show });
    } else {
      setEditingShow(null);
      setShowForm({
        title: '',
        subtitle: '',
        date: '',
        time: '',
        venue: '',
        city: '',
        category: 'GRAND THEATRE',
        status: 'AVAILABLE',
        tiers: [
          { id: `tier-${Date.now()}-1`, name: 'VIP Circle', price: 2999, description: 'VIP front row seating', seatsAvailable: 30, seatsTotal: 30 },
          { id: `tier-${Date.now()}-2`, name: 'General Admission', price: 999, description: 'General seating', seatsAvailable: 100, seatsTotal: 100 }
        ]
      });
    }
    setShowModalOpen(true);
  };

  // Save Show (Create / Update)
  const handleSaveShow = (e) => {
    e.preventDefault();
    if (editingShow) {
      updateShow(editingShow.id, showForm);
    } else {
      addShow(showForm);
    }
    setShowModalOpen(false);
  };

  // Delete Show
  const handleDeleteShow = (showId) => {
    if (window.confirm('Are you sure you want to remove this show from the schedule?')) {
      deleteShow(showId);
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

  // Export Attendees CSV
  const handleExportAttendeesCSV = () => {
    if (liveBookings.length === 0) return;

    const headers = [
      'Booking Ref',
      'Booking Date',
      'Guest Name',
      'Email',
      'Phone',
      'Show Title',
      'Show Date',
      'Show Time',
      'Venue',
      'City',
      'Tier',
      'Quantity',
      'Total Paid (INR)',
      'Payment ID',
      'Status'
    ];

    const rows = liveBookings.map((b) => [
      b.booking_ref,
      new Date(b.created_at || Date.now()).toLocaleString(),
      `"${(b.buyer_name || '').replace(/"/g, '""')}"`,
      `"${(b.buyer_email || '').replace(/"/g, '""')}"`,
      `"${(b.buyer_phone || '').replace(/"/g, '""')}"`,
      `"${(b.show_title || '').replace(/"/g, '""')}"`,
      `"${(b.show_date || '').replace(/"/g, '""')}"`,
      `"${(b.show_time || '').replace(/"/g, '""')}"`,
      `"${(b.venue || '').replace(/"/g, '""')}"`,
      `"${(b.city || '').replace(/"/g, '""')}"`,
      `"${(b.tier_name || '').replace(/"/g, '""')}"`,
      b.quantity,
      b.total_amount,
      b.payment_id,
      b.payment_status || 'PAID'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Mentalist_Sravan_Attendees_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Attendees
  const filteredBookings = liveBookings.filter((b) => {
    const matchesSearch =
      (b.buyer_name || '').toLowerCase().includes(ticketSearch.toLowerCase()) ||
      (b.buyer_email || '').toLowerCase().includes(ticketSearch.toLowerCase()) ||
      (b.buyer_phone || '').toLowerCase().includes(ticketSearch.toLowerCase()) ||
      (b.booking_ref || '').toLowerCase().includes(ticketSearch.toLowerCase()) ||
      (b.show_title || '').toLowerCase().includes(ticketSearch.toLowerCase());

    const matchesShow = selectedShowFilter === 'ALL' || b.show_id === selectedShowFilter;
    return matchesSearch && matchesShow;
  });

  // Calculate ticketing revenue
  const totalRevenue = liveBookings.reduce((sum, b) => sum + (Number(b.total_amount) || 0), 0);
  const totalTicketsSold = liveBookings.reduce((sum, b) => sum + (Number(b.quantity) || 0), 0);

  // =========================================================================
  // VIEW 1: ACCESS CODE LOCK SCREEN (When Not Authenticated)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-black text-[#F2EFE9] flex flex-col items-center justify-center p-6 selection:bg-[#8E1018] selection:text-[#F2EFE9]">
        <div className="w-full max-w-md bg-[#0a0a0a] border border-white/15 p-8 sm:p-10 shadow-2xl relative">
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
                Enter your private access code to manage live website settings and ticketing.
              </p>
            </div>
          </div>

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
                ADMINISTRATION &amp; BOX OFFICE
              </span>
            </div>
          </div>

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
            onClick={() => setActiveTab('ticketing')}
            className={`py-2 px-3 text-xs font-cinzel tracking-[0.2em] uppercase transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'ticketing'
                ? 'border-[#C5A059] text-[#C5A059] font-bold'
                : 'border-transparent text-[#B8B0A5] hover:text-[#F2EFE9]'
            }`}
          >
            <Ticket className="w-4 h-4 text-[#C5A059]" /> SHOWS &amp; TICKETING{' '}
            {liveBookings.length > 0 && (
              <span className="bg-[#C5A059] text-black text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold">
                {liveBookings.length}
              </span>
            )}
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
            <Key className="w-4 h-4" /> ACCESS CODE &amp; GATEWAY
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
                Live changes published successfully!
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-8">
              {/* Section: Hero & Core Messaging */}
              <div className="bg-[#0a0a0a] border border-white/15 p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-lg font-serif uppercase tracking-wider text-[#F2EFE9] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" /> 01 / HERO &amp; HEADER MESSAGING
                  </h3>
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
                      HERO TAGLINE
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
              </div>

              {/* Section: Top Announcement Banner */}
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
                      placeholder="#tickets or https://..."
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
                      03 / OPENING SEQUENCE ANIMATION
                    </h3>
                    <p className="text-xs text-[#B8B0A5] font-light">
                      Toggle the 300-frame theatrical corridor loading animation when visitors enter the site.
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
            TAB 2: SHOWS & TICKETING (RAZORPAY)
        =============================================================== */}
        {activeTab === 'ticketing' && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wider text-[#F2EFE9]">
                  SHOWS &amp; TICKETING SYSTEM
                </h2>
                <p className="text-xs text-[#B8B0A5] font-light">
                  Manage theatrical tour dates, ticket tiers, prices, and attendee registrations via Razorpay.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenShowModal(null)}
                  className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#8E1018] text-black hover:text-[#F2EFE9] font-cinzel text-xs tracking-widest uppercase font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" /> ADD NEW SHOW
                </button>
                <button
                  type="button"
                  onClick={handleExportAttendeesCSV}
                  disabled={liveBookings.length === 0}
                  className="px-5 py-2.5 bg-[#F2EFE9] hover:bg-[#C5A059] text-black font-cinzel text-xs tracking-widest uppercase font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" /> EXPORT ATTENDEES
                </button>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#0a0a0a] border border-white/10 p-4 text-center">
                <span className="text-2xl font-serif font-bold text-[#C5A059] block">
                  ₹{totalRevenue.toLocaleString()}
                </span>
                <span className="text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase">
                  TOTAL TICKET REVENUE
                </span>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 p-4 text-center">
                <span className="text-2xl font-serif font-bold text-[#F2EFE9] block">
                  {totalTicketsSold}
                </span>
                <span className="text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase">
                  TICKETS BOOKED
                </span>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 p-4 text-center">
                <span className="text-2xl font-serif font-bold text-[#F2EFE9] block">
                  {shows.length}
                </span>
                <span className="text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase">
                  SCHEDULED SHOWS
                </span>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 p-4 text-center">
                <span className="text-2xl font-serif font-bold text-[#8E1018] block">
                  {formData.razorpayMode === 'live' ? 'LIVE' : 'TEST'}
                </span>
                <span className="text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase">
                  GATEWAY STATUS
                </span>
              </div>
            </div>

            {/* Shows List Manager */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-serif uppercase tracking-wider text-[#F2EFE9] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C5A059]" /> SCHEDULED THEATRICAL PRODUCTIONS
                </h3>
                <span className="text-[10px] font-cinzel tracking-widest text-[#C5A059] uppercase">
                  LIVE ON PUBLIC SITE
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {shows.map((show) => (
                  <div
                    key={show.id}
                    className="bg-[#0a0a0a] border border-white/15 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C5A059]/50 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-serif font-bold uppercase text-[#F2EFE9]">
                          {show.title}
                        </span>
                        <span
                          className={`text-[9px] font-cinzel tracking-widest px-2.5 py-0.5 uppercase font-bold ${
                            show.status === 'AVAILABLE'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : show.status === 'SELLING FAST'
                              ? 'bg-[#8E1018] text-[#F2EFE9]'
                              : 'bg-white/10 text-white/50'
                          }`}
                        >
                          {show.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#B8B0A5]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#C5A059]" /> {show.date} • {show.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#C5A059]" /> {show.venue}, {show.city}
                        </span>
                      </div>

                      {/* Tiers summary */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {show.tiers?.map((t) => (
                          <span
                            key={t.id}
                            className="text-[10px] font-mono bg-black border border-white/10 px-2 py-0.5 text-[#F2EFE9]"
                          >
                            {t.name}: <strong className="text-[#C5A059]">₹{t.price}</strong>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => handleOpenShowModal(show)}
                        className="px-4 py-2 border border-white/20 hover:border-[#C5A059] text-xs font-cinzel tracking-widest uppercase text-[#F2EFE9] hover:text-[#C5A059] transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> EDIT SHOW
                      </button>
                      <button
                        onClick={() => handleDeleteShow(show.id)}
                        className="p-2 border border-[#8E1018]/40 hover:bg-[#8E1018] text-[#8E1018] hover:text-[#F2EFE9] transition-all cursor-pointer"
                        title="Delete Show"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booked Attendees CRM Table */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#C5A059]" />
                  <h3 className="text-lg font-serif uppercase tracking-wider text-[#F2EFE9]">
                    ATTENDEE ROSTER &amp; DOOR CHECK-IN ({filteredBookings.length})
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-[#B8B0A5] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={ticketSearch}
                      onChange={(e) => setTicketSearch(e.target.value)}
                      placeholder="Search guest, ref, email..."
                      className="w-full bg-black border border-white/15 focus:border-[#C5A059] text-[#F2EFE9] pl-9 pr-4 py-2 text-xs tracking-wider outline-none"
                    />
                  </div>
                  <button
                    onClick={fetchBookings}
                    className="p-2 text-[#B8B0A5] hover:text-[#F2EFE9] border border-white/15 cursor-pointer"
                    title="Refresh Bookings"
                  >
                    <RefreshCw className={`w-4 h-4 ${loadingBookings ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {filteredBookings.length === 0 ? (
                <div className="text-center py-12 bg-[#0a0a0a] border border-white/10 text-xs text-[#B8B0A5]">
                  No tickets booked yet. Confirmed Razorpay ticket bookings will show up here in real-time.
                </div>
              ) : (
                <div className="bg-[#0a0a0a] border border-white/15 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-black text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase border-b border-white/15">
                      <tr>
                        <th className="p-3.5">REF ID</th>
                        <th className="p-3.5">GUEST NAME</th>
                        <th className="p-3.5">CONTACT</th>
                        <th className="p-3.5">SHOW</th>
                        <th className="p-3.5">SEATING TIER</th>
                        <th className="p-3.5">QTY</th>
                        <th className="p-3.5">AMOUNT</th>
                        <th className="p-3.5">PAYMENT ID</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 font-sans-body">
                      {filteredBookings.map((b) => (
                        <tr key={b.booking_ref} className="hover:bg-white/5 transition-colors">
                          <td className="p-3.5 font-mono text-[11px] text-[#C5A059]">
                            {b.booking_ref}
                          </td>
                          <td className="p-3.5 font-serif font-bold text-[#F2EFE9]">
                            {b.buyer_name}
                          </td>
                          <td className="p-3.5 text-xs text-[#B8B0A5]">
                            <div>{b.buyer_email}</div>
                            <div className="font-mono text-[11px] text-[#F2EFE9]">{b.buyer_phone}</div>
                          </td>
                          <td className="p-3.5 font-serif text-[#F2EFE9]">
                            {b.show_title}
                          </td>
                          <td className="p-3.5 text-[#B8B0A5]">
                            {b.tier_name}
                          </td>
                          <td className="p-3.5 font-mono font-bold text-[#F2EFE9]">
                            {b.quantity}
                          </td>
                          <td className="p-3.5 font-mono text-[#C5A059] font-bold">
                            ₹{Number(b.total_amount || 0).toLocaleString()}
                          </td>
                          <td className="p-3.5 font-mono text-[10px] text-[#B8B0A5] truncate max-w-[120px]">
                            {b.payment_id}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===============================================================
            TAB 3: REALTIME ENQUIRIES CRM
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
              </div>
            </div>

            <div className="space-y-4">
              {enquiries.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0a0a0a] border border-white/15 p-6 hover:border-[#C5A059]/50 transition-all space-y-4"
                >
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <a href={`mailto:${item.email}`} className="text-[#F2EFE9] hover:text-[#C5A059] underline truncate">
                        {item.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <a href={`tel:${item.phone}`} className="text-[#F2EFE9] hover:text-[#C5A059] font-mono">
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

                  {item.message && (
                    <div className="bg-black/60 border border-white/10 p-3.5 text-xs text-[#B8B0A5] leading-relaxed font-light">
                      <span className="text-[9px] font-cinzel tracking-widest text-[#C5A059] uppercase block mb-1">
                        MESSAGE:
                      </span>
                      {item.message}
                    </div>
                  )}

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
          </div>
        )}

        {/* ===============================================================
            TAB 4: ACCESS CODE & GATEWAY SYSTEM
        =============================================================== */}
        {activeTab === 'system' && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            <div className="border-b border-white/10 pb-6">
              <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wider text-[#F2EFE9]">
                ACCESS CODE &amp; PAYMENT GATEWAY
              </h2>
              <p className="text-xs text-[#B8B0A5] font-light">
                Configure your Razorpay merchant keys, gateway modes, and portal access code.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Razorpay Gateway Configuration */}
              <div className="bg-[#0a0a0a] border border-white/15 p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-2 text-lg font-serif uppercase tracking-wider text-[#F2EFE9] border-b border-white/10 pb-4">
                  <CreditCard className="w-5 h-5 text-[#C5A059]" /> RAZORPAY PAYMENT GATEWAY
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2 font-semibold">
                      RAZORPAY KEY ID
                    </label>
                    <input
                      type="text"
                      value={formData.razorpayKeyId}
                      onChange={(e) => setFormData({ ...formData, razorpayKeyId: e.target.value })}
                      placeholder="e.g. rzp_test_... or rzp_live_..."
                      className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors font-mono"
                    />
                    <span className="text-[10px] text-[#B8B0A5] mt-1 block">
                      Found in Razorpay Dashboard &gt; Settings &gt; API Keys.
                    </span>
                  </div>

                  <div>
                    <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-2 font-semibold">
                      GATEWAY OPERATING MODE
                    </label>
                    <select
                      value={formData.razorpayMode}
                      onChange={(e) => setFormData({ ...formData, razorpayMode: e.target.value })}
                      className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-4 py-3 text-xs tracking-wider outline-none transition-colors"
                    >
                      <option value="test">Test Mode (Sandbox / Demo Payments)</option>
                      <option value="live">Live Production (Real Money Processing)</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    className="w-full py-3 bg-[#C5A059] hover:bg-[#8E1018] text-black hover:text-[#F2EFE9] font-cinzel text-xs tracking-[0.2em] uppercase font-bold transition-all cursor-pointer"
                  >
                    SAVE RAZORPAY CONFIGURATION
                  </button>
                </div>
              </div>

              {/* Change Access Code Card */}
              <div className="bg-[#0a0a0a] border border-white/15 p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-2 text-lg font-serif uppercase tracking-wider text-[#F2EFE9] border-b border-white/10 pb-4">
                  <Key className="w-5 h-5 text-[#C5A059]" /> CHANGE ADMIN PASSCODE
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
            </div>
          </div>
        )}
      </main>

      {/* ===============================================================
          ADD / EDIT SHOW MODAL
      =============================================================== */}
      {showModalOpen && (
        <div className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/20 p-6 md:p-8 shadow-2xl my-auto">
            <button
              onClick={() => setShowModalOpen(false)}
              className="absolute right-5 top-5 p-2 text-[#B8B0A5] hover:text-[#F2EFE9] transition-colors rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-white/10 pb-4 mb-6">
              <h3 className="text-2xl font-serif uppercase tracking-wider text-[#F2EFE9]">
                {editingShow ? 'EDIT PRODUCTION SHOW' : 'ADD NEW PRODUCTION SHOW'}
              </h3>
              <p className="text-xs text-[#B8B0A5]">
                Configure show details, date, venue, and seating tier ticket prices.
              </p>
            </div>

            <form onSubmit={handleSaveShow} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-1">
                    SHOW TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={showForm.title}
                    onChange={(e) => setShowForm({ ...showForm, title: e.target.value })}
                    placeholder="e.g. HISTORY SHOW — THE CHRONICLE"
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-3.5 py-2.5 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-1">
                    CATEGORY / FORMAT
                  </label>
                  <input
                    type="text"
                    value={showForm.category}
                    onChange={(e) => setShowForm({ ...showForm, category: e.target.value })}
                    placeholder="GRAND THEATRE / PRIVATE CHAMBER"
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-3.5 py-2.5 text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-1">
                  SHORT SUBTITLE / DESCRIPTION
                </label>
                <input
                  type="text"
                  value={showForm.subtitle}
                  onChange={(e) => setShowForm({ ...showForm, subtitle: e.target.value })}
                  placeholder="Where choices and perception collide..."
                  className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-3.5 py-2.5 text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-1">
                    SHOW DATE *
                  </label>
                  <input
                    type="text"
                    required
                    value={showForm.date}
                    onChange={(e) => setShowForm({ ...showForm, date: e.target.value })}
                    placeholder="e.g. 15 November 2025"
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-3.5 py-2.5 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-1">
                    SHOW TIME *
                  </label>
                  <input
                    type="text"
                    required
                    value={showForm.time}
                    onChange={(e) => setShowForm({ ...showForm, time: e.target.value })}
                    placeholder="e.g. 7:30 PM IST"
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-3.5 py-2.5 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-1">
                    VENUE NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={showForm.venue}
                    onChange={(e) => setShowForm({ ...showForm, venue: e.target.value })}
                    placeholder="e.g. Royal Opera House"
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-3.5 py-2.5 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-1">
                    CITY *
                  </label>
                  <input
                    type="text"
                    required
                    value={showForm.city}
                    onChange={(e) => setShowForm({ ...showForm, city: e.target.value })}
                    placeholder="e.g. Mumbai"
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-3.5 py-2.5 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase mb-1">
                    STATUS
                  </label>
                  <select
                    value={showForm.status}
                    onChange={(e) => setShowForm({ ...showForm, status: e.target.value })}
                    className="w-full bg-black border border-white/20 focus:border-[#C5A059] text-[#F2EFE9] px-3 py-2 text-xs outline-none"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="SELLING FAST">SELLING FAST</option>
                    <option value="SOLD OUT">SOLD OUT</option>
                    <option value="HIDDEN">HIDDEN (DRAFT)</option>
                  </select>
                </div>
              </div>

              {/* Tiers config */}
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[10px] font-cinzel tracking-widest text-[#B8B0A5] uppercase font-semibold">
                    SEATING TIERS &amp; TICKET PRICES (INR)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setShowForm({
                        ...showForm,
                        tiers: [
                          ...(showForm.tiers || []),
                          { id: `tier-${Date.now()}`, name: 'New Tier', price: 1499, description: 'Seating pass', seatsAvailable: 50, seatsTotal: 50 }
                        ]
                      })
                    }
                    className="text-[10px] font-cinzel tracking-widest text-[#C5A059] hover:text-[#F2EFE9] uppercase"
                  >
                    + ADD TIER
                  </button>
                </div>

                <div className="space-y-2">
                  {showForm.tiers?.map((tier, idx) => (
                    <div key={tier.id || idx} className="grid grid-cols-12 gap-2 bg-black p-2 border border-white/10 items-center text-xs">
                      <div className="col-span-5">
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => {
                            const newTiers = [...showForm.tiers];
                            newTiers[idx].name = e.target.value;
                            setShowForm({ ...showForm, tiers: newTiers });
                          }}
                          placeholder="Tier Name (e.g. VIP Circle)"
                          className="w-full bg-transparent border border-white/15 px-2 py-1.5 text-xs text-[#F2EFE9]"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          value={tier.price}
                          onChange={(e) => {
                            const newTiers = [...showForm.tiers];
                            newTiers[idx].price = Number(e.target.value);
                            setShowForm({ ...showForm, tiers: newTiers });
                          }}
                          placeholder="Price ₹"
                          className="w-full bg-transparent border border-white/15 px-2 py-1.5 text-xs text-[#C5A059] font-mono font-bold"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          value={tier.seatsAvailable}
                          onChange={(e) => {
                            const newTiers = [...showForm.tiers];
                            newTiers[idx].seatsAvailable = Number(e.target.value);
                            setShowForm({ ...showForm, tiers: newTiers });
                          }}
                          placeholder="Seats"
                          className="w-full bg-transparent border border-white/15 px-2 py-1.5 text-xs text-[#B8B0A5]"
                        />
                      </div>
                      <div className="col-span-1 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            const newTiers = showForm.tiers.filter((_, i) => i !== idx);
                            setShowForm({ ...showForm, tiers: newTiers });
                          }}
                          className="text-[#8E1018] hover:text-white"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModalOpen(false)}
                  className="px-5 py-2.5 border border-white/20 text-xs font-cinzel uppercase text-[#B8B0A5] hover:text-[#F2EFE9]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C5A059] hover:bg-[#8E1018] text-black hover:text-[#F2EFE9] font-cinzel text-xs uppercase font-bold transition-all"
                >
                  SAVE SHOW
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
