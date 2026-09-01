'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export const languages = [
  { code: 'EN', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'HI', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ES', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'FR', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'DE', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
];

export const countries = [
  { code: 'IN', name: 'India', currency: '₹', currencyCode: 'INR', flag: '🇮🇳' },
  { code: 'US', name: 'United States', currency: '$', currencyCode: 'USD', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', currency: '£', currencyCode: 'GBP', flag: '🇬🇧' },
  { code: 'AE', name: 'UAE', currency: 'AED', currencyCode: 'AED', flag: '🇦🇪' },
  { code: 'CA', name: 'Canada', currency: 'CA$', currencyCode: 'CAD', flag: '🇨🇦' },
  { code: 'DE', name: 'Germany', currency: '€', currencyCode: 'EUR', flag: '🇩🇪' },
];

const RegionContext = createContext({
  selectedLang: languages[0],
  selectedCountry: countries[0],
  setLanguage: () => {},
  setCountry: () => {},
  languages: [],
  countries: []
});

export function RegionProvider({ children }) {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('onevriksh_lang');
      if (savedLang) {
        const found = languages.find((l) => l.code === savedLang);
        if (found) setSelectedLang(found);
      }
      const savedCountry = localStorage.getItem('onevriksh_country');
      if (savedCountry) {
        const found = countries.find((c) => c.code === savedCountry);
        if (found) setSelectedCountry(found);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang) => {
    setSelectedLang(lang);
    try {
      localStorage.setItem('onevriksh_lang', lang.code);
    } catch {
      // ignore
    }
  };

  const setCountry = (country) => {
    setSelectedCountry(country);
    try {
      localStorage.setItem('onevriksh_country', country.code);
    } catch {
      // ignore
    }
  };

  return (
    <RegionContext.Provider
      value={{
        selectedLang,
        selectedCountry,
        setLanguage,
        setCountry,
        languages,
        countries
      }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
}
