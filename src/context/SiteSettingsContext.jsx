import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'ms_portfolio_live_settings';

export const defaultSettings = {
  heroTitle: 'MENTALIST SRAVAN',
  heroTagline: 'WHERE THOUGHT BECOMES THEATRE.',
  heroSubtitle: 'Creating impossible experiences built around perception, psychology, choice, memory and human behaviour.',
  heroHighlight: 'PSYCHOLOGICAL ILLUSION • PERFORMANCE ART',
  bookingBadge: 'AVAILABLE FOR LIVE THEATRE & PRIVATE BESPOKE ENGAGEMENTS',
  enableLoadingSequence: true,
  announcementActive: false,
  announcementText: 'EXCLUSIVE 2025-2026 THEATRICAL TOUR DATES ANNOUNCED',
  announcementLink: '#booking',
  historyShowVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  mirageVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  insiderVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  mainShowreelVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
};

const SiteSettingsContext = createContext({
  settings: defaultSettings,
  updateSettings: () => {},
  resetSettings: () => {}
});

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultSettings, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load saved settings from localStorage:', e);
    }
    return defaultSettings;
  });

  const updateSettings = (newSettings) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save settings to localStorage:', e);
      }
      return updated;
    });
  };

  const resetSettings = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to reset settings:', e);
    }
    setSettings(defaultSettings);
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
