'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  GraduationCap,
  Award,
  Globe,
  Building2,
  Search,
  ChevronDown,
  User,
  LogIn,
  UserPlus,
  ArrowRight,
  Check,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { label: 'All Courses', href: '/courses', icon: BookOpen },
  { label: 'Certification', href: '/courses?type=certification', icon: Award },
  { label: 'Study Abroad', href: '/demo', icon: Globe },
  { label: 'Offline Centers', href: '/contact', icon: Building2 },
];

const languages = [
  { code: 'en', name: 'English', flag: '🌐' },
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

const countries = [
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
];

/**
 * Ultra-Luxury $50M EdTech Startup Navigation Header Component
 */
export function StudyWorldHeader() {
  const { user, login, register, logout } = useAuth();
  
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
        setLangDropdownOpen(false);
        setCountryDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLoginClick = (e) => {
    if (e) e.preventDefault();
    setAccountDropdownOpen(false);
    setDrawerOpen(false);
    login();
  };

  const handleRegisterClick = (e) => {
    if (e) e.preventDefault();
    setAccountDropdownOpen(false);
    setDrawerOpen(false);
    register();
  };

  const handleLogoutClick = (e) => {
    if (e) e.preventDefault();
    setAccountDropdownOpen(false);
    setDrawerOpen(false);
    logout();
  };

  return (
    <div className="sw-desktop-header-wrapper" ref={containerRef}>
      <header className="sw-lux-header">
        {/* LEFT: CURVED DARK NAVY BRAND LOGO SECTION */}
        <div className="sw-lux-brand-badge">
          <Link href="/" className="sw-lux-brand-link">
            <div className="sw-lux-logo-icon">
              <BookOpen size={20} className="sw-lux-book" />
              <GraduationCap size={15} className="sw-lux-cap" />
            </div>
            <div className="sw-lux-brand-text">
              <span className="sw-lux-brand-title">StudyWorld</span>
              <span className="sw-lux-brand-tagline">Learn. Grow. Succeed.</span>
            </div>
          </Link>
        </div>

        {/* CENTER NAVIGATION */}
        <nav className="sw-lux-nav" aria-label="Main Navigation">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link key={item.label} href={item.href} className="sw-lux-nav-item">
                <IconComponent size={17} className="sw-lux-nav-icon" />
                <span>{item.label}</span>
                <span className="sw-lux-underline" />
              </Link>
            );
          })}
        </nav>

        {/* MIDDLE: LARGE ROUNDED SEARCH BAR WITH INNER SHADOW */}
        <div className={`sw-lux-search-box ${searchFocused ? 'focused' : ''}`}>
          <input
            type="text"
            className="sw-lux-search-input"
            placeholder="Search for courses, skills, instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className="sw-lux-search-icon-btn">
            <Search size={18} />
          </div>
        </div>

        {/* RIGHT CONTROLS */}
        <div className="sw-lux-right-group">
          {/* LANGUAGE SELECTOR */}
          <div className="sw-lux-dropdown-wrap">
            <button
              className="sw-lux-pill-btn"
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setCountryDropdownOpen(false);
                setAccountDropdownOpen(false);
              }}
            >
              <Globe size={16} />
              <span>{selectedLang.name}</span>
              <ChevronDown size={14} className={`sw-arrow ${langDropdownOpen ? 'open' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className="sw-lux-dropdown sw-fade-in">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    className={`sw-lux-dropdown-row ${selectedLang.code === l.code ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedLang(l);
                      setLangDropdownOpen(false);
                    }}
                  >
                    <span>{l.flag} {l.name}</span>
                    {selectedLang.code === l.code && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* COUNTRY SELECTOR */}
          <div className="sw-lux-dropdown-wrap">
            <button
              className="sw-lux-pill-btn"
              onClick={() => {
                setCountryDropdownOpen(!countryDropdownOpen);
                setLangDropdownOpen(false);
                setAccountDropdownOpen(false);
              }}
            >
              <span>{selectedCountry.flag}</span>
              <span>{selectedCountry.name}</span>
              <ChevronDown size={14} className={`sw-arrow ${countryDropdownOpen ? 'open' : ''}`} />
            </button>

            {countryDropdownOpen && (
              <div className="sw-lux-dropdown sw-fade-in">
                {countries.map((c) => (
                  <button
                    key={c.code}
                    className={`sw-lux-dropdown-row ${selectedCountry.code === c.code ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCountry(c);
                      setCountryDropdownOpen(false);
                    }}
                  >
                    <span>{c.flag} {c.name}</span>
                    {selectedCountry.code === c.code && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRIMARY GRADIENT CTA WITH WHITE ARROW INSIDE CIRCLE */}
          <Link href="/courses" className="sw-lux-gradient-cta">
            <span>Enroll Now</span>
            <span className="sw-lux-arrow-circle">
              <ArrowRight size={14} />
            </span>
          </Link>

          {/* ACCOUNT BUTTON WITH DROPDOWN */}
          <div className="sw-lux-dropdown-wrap">
            <button
              className="sw-lux-account-btn"
              onClick={() => {
                setAccountDropdownOpen(!accountDropdownOpen);
                setLangDropdownOpen(false);
                setCountryDropdownOpen(false);
              }}
            >
              <User size={16} />
              <span>{user ? user.name.split(' ')[0] : 'Account'}</span>
              <ChevronDown size={14} className={`sw-arrow ${accountDropdownOpen ? 'open' : ''}`} />
            </button>

            {accountDropdownOpen && (
              <div className="sw-lux-dropdown sw-lux-dropdown-right sw-fade-in">
                {user ? (
                  <>
                    <div className="sw-lux-user-card">
                      <strong>{user.name}</strong>
                      <small>{user.email}</small>
                    </div>
                    <div className="sw-lux-divider" />
                    <Link
                      href={user.role === 'admin' ? '/admin' : '/student'}
                      className="sw-lux-dropdown-row"
                      onClick={() => setAccountDropdownOpen(false)}
                    >
                      <User size={15} />
                      <span>Student Dashboard</span>
                    </Link>
                    <button className="sw-lux-dropdown-row danger" onClick={handleLogoutClick}>
                      <span>Log out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="sw-lux-dropdown-row" onClick={handleLoginClick}>
                      <span className="sw-row-icon">→</span>
                      <span>Login</span>
                    </button>
                    <button className="sw-lux-dropdown-row" onClick={handleRegisterClick}>
                      <span className="sw-row-icon">＋</span>
                      <span>Sign Up</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export const StudyWorldDesktopHeader = StudyWorldHeader;

/**
 * Figma Showcase Component View
 */
export function StudyWorldHeaderShowcase() {
  return (
    <div className="sw-figma-canvas">
      <div className="sw-figma-bar">
        <div className="sw-figma-title">
          <div className="sw-figma-badge">Figma 16:9 UI Mockup</div>
          <h2>StudyWorld $50M EdTech Desktop Navigation System</h2>
          <p>Ultra-clean, modern, curved dark navy logo badge flowing into white 16px rounded navbar</p>
        </div>
      </div>
      <div className="sw-figma-grid">
        <div className="sw-artboard">
          <StudyWorldHeader />
        </div>
      </div>
    </div>
  );
}

export default StudyWorldHeader;
