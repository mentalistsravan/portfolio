import React, { createContext, useContext, useState, useEffect } from 'react';

const SETTINGS_STORAGE_KEY = 'ms_portfolio_live_settings';
const BOOKINGS_STORAGE_KEY = 'ms_portfolio_ticket_bookings';

export const initialShows = [
  {
    id: 'show-history-mumbai',
    title: 'HISTORY SHOW — THE CHRONICLE',
    subtitle: 'Where past choices, historical paradoxes and forgotten timelines converge live on stage.',
    date: '15 November 2025',
    time: '7:30 PM IST',
    venue: 'Royal Opera House',
    city: 'Mumbai',
    category: 'GRAND THEATRE',
    status: 'SELLING FAST', // 'AVAILABLE' | 'SELLING FAST' | 'SOLD OUT' | 'HIDDEN'
    tiers: [
      {
        id: 'tier-vip',
        name: 'VIP Front Circle',
        price: 2999,
        description: 'Front-row immersive table seating + exclusive post-show interaction with Mentalist Sravan.',
        seatsAvailable: 18,
        seatsTotal: 30
      },
      {
        id: 'tier-premier',
        name: 'Premier Theatrical',
        price: 1999,
        description: 'Prime central auditorium seating with optimal psychological sightlines.',
        seatsAvailable: 42,
        seatsTotal: 80
      },
      {
        id: 'tier-general',
        name: 'General Admission',
        price: 999,
        description: 'Standard balcony and theatre seating for the complete grand production.',
        seatsAvailable: 75,
        seatsTotal: 120
      }
    ]
  },
  {
    id: 'show-mirage-bengaluru',
    title: 'MIRAGE — THE ILLUSION OF CERTAINTY',
    subtitle: 'An intimate theatrical mentalism experience built around perception, expectation and human certainty.',
    date: '06 December 2025',
    time: '8:00 PM IST',
    venue: 'Chowdiah Memorial Hall',
    city: 'Bengaluru',
    category: 'THEATRE EXPERIENCE',
    status: 'AVAILABLE',
    tiers: [
      {
        id: 'tier-gold',
        name: 'Gold Circle',
        price: 2499,
        description: 'Premium front stalls with personal participation potential.',
        seatsAvailable: 35,
        seatsTotal: 50
      },
      {
        id: 'tier-silver',
        name: 'Silver Stalls',
        price: 1499,
        description: 'Mid-auditorium seating with excellent visual clarity.',
        seatsAvailable: 68,
        seatsTotal: 100
      }
    ]
  },
  {
    id: 'show-insider-delhi',
    title: 'INSIDER — PRIVATE CHAMBER EXPERIENCE',
    subtitle: 'Strictly limited to 50 guests. Exploring the delicate territory between choice, coincidence and connection.',
    date: '18 January 2026',
    time: '7:00 PM IST',
    venue: 'The Imperial Grand Ballroom',
    city: 'New Delhi',
    category: 'EXCLUSIVE CHAMBER',
    status: 'SELLING FAST',
    tiers: [
      {
        id: 'tier-chamber-vip',
        name: 'Exclusive Chamber Pass',
        price: 4999,
        description: 'Full evening bespoke mentalism experience, luxury cocktail reception, and private discussion.',
        seatsAvailable: 11,
        seatsTotal: 50
      }
    ]
  }
];

export const defaultSettings = {
  heroTitle: 'MENTALIST SRAVAN',
  heroTagline: 'WHERE THOUGHT BECOMES THEATRE.',
  heroSubtitle: 'Creating impossible experiences built around perception, psychology, choice, memory and human behaviour.',
  heroHighlight: 'PSYCHOLOGICAL ILLUSION • PERFORMANCE ART',
  bookingBadge: 'AVAILABLE FOR LIVE THEATRE & PRIVATE BESPOKE ENGAGEMENTS',
  enableLoadingSequence: true,
  announcementActive: false,
  announcementText: 'EXCLUSIVE 2025-2026 THEATRICAL TOUR DATES ANNOUNCED',
  announcementLink: '#tickets',
  historyShowVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  mirageVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  insiderVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  mainShowreelVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  // Razorpay Gateway Config
  razorpayKeyId: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_TUtOXJ88N8ANSp',
  razorpayMode: 'live', // 'test' | 'live'
  currency: 'INR',
  shows: initialShows
};

const SiteSettingsContext = createContext({
  settings: defaultSettings,
  updateSettings: () => {},
  resetSettings: () => {},
  shows: initialShows,
  addShow: () => {},
  updateShow: () => {},
  deleteShow: () => {},
  bookings: [],
  addBooking: () => {}
});

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const resolvedKeyId =
          parsed.razorpayKeyId && parsed.razorpayKeyId.trim().length > 5
            ? parsed.razorpayKeyId
            : (import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_TUtOXJ88N8ANSp');
        return {
          ...defaultSettings,
          ...parsed,
          razorpayKeyId: resolvedKeyId,
          razorpayMode: parsed.razorpayMode || 'live',
          shows: parsed.shows && parsed.shows.length > 0 ? parsed.shows : initialShows
        };
      }
    } catch (e) {
      console.warn('Failed to load saved settings from localStorage:', e);
    }
    return defaultSettings;
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load bookings from localStorage:', e);
    }
    return [];
  });

  const updateSettings = (newSettings) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save settings to localStorage:', e);
      }
      return updated;
    });
  };

  const resetSettings = () => {
    try {
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to reset settings:', e);
    }
    setSettings(defaultSettings);
  };

  // Show management helpers
  const addShow = (newShow) => {
    const showWithId = {
      ...newShow,
      id: newShow.id || `show-${Date.now()}`
    };
    const updatedShows = [showWithId, ...(settings.shows || [])];
    updateSettings({ shows: updatedShows });
    return showWithId;
  };

  const updateShow = (showId, updatedData) => {
    const updatedShows = (settings.shows || []).map((s) =>
      s.id === showId ? { ...s, ...updatedData } : s
    );
    updateSettings({ shows: updatedShows });
  };

  const deleteShow = (showId) => {
    const updatedShows = (settings.shows || []).filter((s) => s.id !== showId);
    updateSettings({ shows: updatedShows });
  };

  // Bookings management
  const addBooking = (newBooking) => {
    setBookings((prev) => {
      const updated = [newBooking, ...prev];
      try {
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save booking:', e);
      }
      return updated;
    });
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        shows: settings.shows || initialShows,
        addShow,
        updateShow,
        deleteShow,
        bookings,
        addBooking
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
