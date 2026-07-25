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
  Menu,
  X,
  LogIn,
  UserPlus,
  ArrowRight,
  Check,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Color & Design System Tokens
const TOKENS = {
  bg: '#F8FAFC',
  navbar: '#FFFFFF',
  primary: '#14B8A6',
  primaryHover: '#0D9488',
  dark: '#0F172A',
  border: '#E2E8F0',
  shadow: '0 12px 35px rgba(15,23,42,.08)',
  shadowHover: '0 16px 40px rgba(20,184,166,.2)',
  radius: '16px',
};

const navItems = [
  { label: 'All Courses', href: '/courses', icon: BookOpen, badge: null },
  { label: 'Certification', href: '/courses?type=certification', icon: Award, badge: 'Popular' },
  { label: 'Study Abroad', href: '/demo', icon: Globe, badge: null },
  { label: 'Offline Centers', href: '/contact', icon: Building2, badge: 'New' },
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
 * Main StudyWorld Production Header Component
 */
export function StudyWorldHeader({ isShowcase = false, activeViewport = 'desktop' }) {
  const { user, login, register, logout } = useAuth();
  
  // State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
    <header className={`sw-header-container ${isShowcase ? `sw-showcase-${activeViewport}` : ''}`} ref={dropdownRef}>
      <div className="sw-header-card">
        {/* BRAND LOGO */}
        <div className="sw-brand-section">
          <Link href="/" className="sw-brand-link">
            <div className="sw-logo-icon">
              <BookOpen size={20} className="sw-logo-book" />
              <GraduationCap size={16} className="sw-logo-cap" />
            </div>
            <div className="sw-brand-text">
              <span className="sw-brand-title">StudyWorld</span>
              <span className="sw-brand-tagline">Learn. Grow. Succeed.</span>
            </div>
          </Link>
        </div>

        {/* CENTER NAVIGATION (DESKTOP & TABLET) */}
        <nav className="sw-center-nav" aria-label="Main Navigation">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link key={item.label} href={item.href} className="sw-nav-link">
                <IconComponent size={17} className="sw-nav-icon" />
                <span>{item.label}</span>
                {item.badge && <span className="sw-nav-badge">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>

        {/* LARGE SEARCH BAR */}
        <div className={`sw-search-wrapper ${searchFocused ? 'sw-focused' : ''}`}>
          <Search size={18} className="sw-search-icon" />
          <input
            type="text"
            className="sw-search-input"
            placeholder="Search courses, skills, instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {searchQuery && (
            <button className="sw-search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </div>

        {/* MOBILE SEARCH TRIGGER (ICON ONLY) */}
        <button
          className="sw-mobile-search-trigger"
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          aria-label="Toggle search"
        >
          <Search size={20} />
        </button>

        {/* RIGHT SIDE CONTROLS */}
        <div className="sw-right-controls">
          {/* LANGUAGE SELECTOR */}
          <div className="sw-dropdown-container">
            <button
              className="sw-dropdown-btn"
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setCountryDropdownOpen(false);
                setAccountDropdownOpen(false);
              }}
              aria-label="Select Language"
            >
              <Globe size={16} />
              <span className="sw-btn-label">{selectedLang.name}</span>
              <ChevronDown size={14} className={`sw-arrow ${langDropdownOpen ? 'sw-open' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className="sw-dropdown-menu sw-animate-fade">
                <div className="sw-dropdown-header">Select Language</div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`sw-dropdown-item ${selectedLang.code === lang.code ? 'sw-active' : ''}`}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangDropdownOpen(false);
                    }}
                  >
                    <span>{lang.flag} {lang.name}</span>
                    {selectedLang.code === lang.code && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* COUNTRY SELECTOR */}
          <div className="sw-dropdown-container">
            <button
              className="sw-dropdown-btn"
              onClick={() => {
                setCountryDropdownOpen(!countryDropdownOpen);
                setLangDropdownOpen(false);
                setAccountDropdownOpen(false);
              }}
              aria-label="Select Country"
            >
              <span>{selectedCountry.flag}</span>
              <span className="sw-btn-label">{selectedCountry.name}</span>
              <ChevronDown size={14} className={`sw-arrow ${countryDropdownOpen ? 'sw-open' : ''}`} />
            </button>

            {countryDropdownOpen && (
              <div className="sw-dropdown-menu sw-animate-fade">
                <div className="sw-dropdown-header">Select Country</div>
                {countries.map((c) => (
                  <button
                    key={c.code}
                    className={`sw-dropdown-item ${selectedCountry.code === c.code ? 'sw-active' : ''}`}
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

          {/* PRIMARY GRADIENT CTA */}
          <Link href="/courses" className="sw-primary-cta">
            <Sparkles size={16} />
            <span>Enroll Now</span>
          </Link>

          {/* ACCOUNT BUTTON WITH DROPDOWN */}
          <div className="sw-dropdown-container">
            <button
              className="sw-account-btn"
              onClick={() => {
                setAccountDropdownOpen(!accountDropdownOpen);
                setLangDropdownOpen(false);
                setCountryDropdownOpen(false);
              }}
              aria-label="Account Menu"
            >
              <User size={17} />
              <span className="sw-account-label">
                {user ? user.name.split(' ')[0] : 'Account'}
              </span>
              <ChevronDown size={14} className={`sw-arrow ${accountDropdownOpen ? 'sw-open' : ''}`} />
            </button>

            {accountDropdownOpen && (
              <div className="sw-dropdown-menu sw-dropdown-menu-right sw-animate-fade">
                {user ? (
                  <>
                    <div className="sw-dropdown-userinfo">
                      <strong>{user.name}</strong>
                      <small>{user.email}</small>
                    </div>
                    <div className="sw-dropdown-divider" />
                    <Link
                      href={user.role === 'admin' ? '/admin' : '/student'}
                      className="sw-dropdown-item"
                      onClick={() => setAccountDropdownOpen(false)}
                    >
                      <User size={15} />
                      <span>Student Dashboard</span>
                    </Link>
                    <button className="sw-dropdown-item sw-danger" onClick={handleLogoutClick}>
                      <X size={15} />
                      <span>Log out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="sw-dropdown-header">accounts.onevriksh.in SSO</div>
                    <button className="sw-dropdown-item" onClick={handleLoginClick}>
                      <LogIn size={15} />
                      <span>Login</span>
                    </button>
                    <button className="sw-dropdown-item" onClick={handleRegisterClick}>
                      <UserPlus size={15} />
                      <span>Sign Up</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* MOBILE CONTROLS (RIGHT ICON GROUP + HAMBURGER) */}
        <div className="sw-mobile-controls">
          <button
            className="sw-mobile-icon-btn"
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            aria-label="Language selector"
          >
            <Globe size={20} />
          </button>
          <button
            className="sw-mobile-icon-btn"
            onClick={handleLoginClick}
            aria-label="User Profile"
          >
            <User size={20} />
          </button>
          <button
            className="sw-hamburger-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open mobile navigation drawer"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* MOBILE EXPANDABLE SEARCH BAR */}
      {mobileSearchOpen && (
        <div className="sw-mobile-search-bar sw-animate-fade">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search courses, skills, instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button onClick={() => setMobileSearchOpen(false)}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* MOBILE MENU SLIDE-IN DRAWER */}
      <div className={`sw-drawer-backdrop ${drawerOpen ? 'sw-visible' : ''}`} onClick={() => setDrawerOpen(false)} />

      <aside className={`sw-drawer ${drawerOpen ? 'sw-open' : ''}`} aria-label="Mobile Navigation Drawer">
        {/* DRAWER TOP */}
        <div className="sw-drawer-header">
          <Link href="/" className="sw-brand-link" onClick={() => setDrawerOpen(false)}>
            <div className="sw-logo-icon">
              <BookOpen size={18} className="sw-logo-book" />
              <GraduationCap size={14} className="sw-logo-cap" />
            </div>
            <div className="sw-brand-text">
              <span className="sw-brand-title">StudyWorld</span>
            </div>
          </Link>
          <button className="sw-drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close drawer">
            <X size={20} />
          </button>
        </div>

        <div className="sw-drawer-divider" />

        {/* DRAWER CONTENT SCROLLABLE */}
        <div className="sw-drawer-content">
          {/* NAVIGATION LINKS */}
          <div className="sw-drawer-section">
            <div className="sw-drawer-section-title">Navigation</div>
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="sw-drawer-nav-item"
                  onClick={() => setDrawerOpen(false)}
                >
                  <div className="sw-drawer-icon-wrap">
                    <IconComponent size={18} />
                  </div>
                  <span>{item.label}</span>
                  {item.badge && <span className="sw-nav-badge">{item.badge}</span>}
                </Link>
              );
            })}
          </div>

          <div className="sw-drawer-divider" />

          {/* LANGUAGE & COUNTRY SELECTORS */}
          <div className="sw-drawer-section">
            <div className="sw-drawer-section-title">Regional Settings</div>
            
            <label className="sw-drawer-select-label">
              <span>Language</span>
              <select
                className="sw-drawer-select"
                value={selectedLang.code}
                onChange={(e) => setSelectedLang(languages.find((l) => l.code === e.target.value))}
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="sw-drawer-select-label">
              <span>Country / Region</span>
              <select
                className="sw-drawer-select"
                value={selectedCountry.code}
                onChange={(e) => setSelectedCountry(countries.find((c) => c.code === e.target.value))}
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="sw-drawer-divider" />

          {/* GRADIENT ENROLL NOW CTA */}
          <div className="sw-drawer-section">
            <Link
              href="/courses"
              className="sw-drawer-primary-cta"
              onClick={() => setDrawerOpen(false)}
            >
              <span>Enroll Now</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="sw-drawer-divider" />

          {/* LARGE AUTHENTICATION BUTTONS */}
          <div className="sw-drawer-section">
            <div className="sw-drawer-section-title">Account</div>
            {user ? (
              <>
                <Link
                  href={user.role === 'admin' ? '/admin' : '/student'}
                  className="sw-drawer-auth-btn sw-auth-login"
                  onClick={() => setDrawerOpen(false)}
                >
                  <User size={18} />
                  <span>Student Dashboard</span>
                </Link>
                <button className="sw-drawer-auth-btn sw-auth-signup" onClick={handleLogoutClick}>
                  <span>Log out</span>
                </button>
              </>
            ) : (
              <div className="sw-drawer-auth-grid">
                <button className="sw-drawer-auth-btn sw-auth-login" onClick={handleLoginClick}>
                  <LogIn size={18} />
                  <span>Login</span>
                </button>
                <button className="sw-drawer-auth-btn sw-auth-signup" onClick={handleRegisterClick}>
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* DRAWER BOTTOM FOOTER */}
        <div className="sw-drawer-footer">
          <span>© StudyWorld</span>
          <small>Centralized IdP Connected</small>
        </div>
      </aside>
    </header>
  );
}

/**
 * Figma-Style Presentation Component showcasing Desktop, Tablet, Mobile, and Mobile Drawer Open states
 */
export function StudyWorldHeaderShowcase() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="sw-figma-canvas">
      {/* FIGMA PRESENTATION HEADER CONTROL BAR */}
      <div className="sw-figma-bar">
        <div className="sw-figma-title">
          <div className="sw-figma-badge">Figma UI Kit</div>
          <h2>StudyWorld Navigation Component System</h2>
          <p>Production-ready responsive layout variants (Desktop 1440px, Tablet 834px, Mobile 390px, Mobile Drawer)</p>
        </div>
        <div className="sw-figma-tabs">
          <button className={`sw-figma-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
            All Views
          </button>
          <button className={`sw-figma-tab ${activeTab === 'desktop' ? 'active' : ''}`} onClick={() => setActiveTab('desktop')}>
            Desktop (1440px)
          </button>
          <button className={`sw-figma-tab ${activeTab === 'tablet' ? 'active' : ''}`} onClick={() => setActiveTab('tablet')}>
            Tablet (834px)
          </button>
          <button className={`sw-figma-tab ${activeTab === 'mobile' ? 'active' : ''}`} onClick={() => setActiveTab('mobile')}>
            Mobile (390px)
          </button>
          <button className={`sw-figma-tab ${activeTab === 'drawer' ? 'active' : ''}`} onClick={() => setActiveTab('drawer')}>
            Mobile Drawer Open
          </button>
        </div>
      </div>

      {/* FIGMA ARTBOARD PRESENTATION GRID */}
      <div className="sw-figma-grid">
        {/* 1. DESKTOP HEADER FRAME */}
        {(activeTab === 'all' || activeTab === 'desktop') && (
          <div className="sw-artboard sw-artboard-desktop">
            <div className="sw-artboard-header">
              <span className="sw-artboard-tag">Desktop (1440px)</span>
              <span className="sw-artboard-meta">Full Navigation + Search + Language + Account Dropdown</span>
            </div>
            <div className="sw-artboard-viewport sw-desktop-viewport">
              <StudyWorldHeader isShowcase activeViewport="desktop" />
            </div>
          </div>
        )}

        {/* 2. TABLET HEADER FRAME */}
        {(activeTab === 'all' || activeTab === 'tablet') && (
          <div className="sw-artboard sw-artboard-tablet">
            <div className="sw-artboard-header">
              <span className="sw-artboard-tag">Tablet (768px – 1024px)</span>
              <span className="sw-artboard-meta">Compact Search & Language Dropdown</span>
            </div>
            <div className="sw-artboard-viewport sw-tablet-viewport">
              <StudyWorldHeader isShowcase activeViewport="tablet" />
            </div>
          </div>
        )}

        {/* 3. MOBILE HEADER FRAME */}
        {(activeTab === 'all' || activeTab === 'mobile') && (
          <div className="sw-artboard sw-artboard-mobile">
            <div className="sw-artboard-header">
              <span className="sw-artboard-tag">Mobile (320px – 767px)</span>
              <span className="sw-artboard-meta">Single-row Header with Hamburger</span>
            </div>
            <div className="sw-artboard-viewport sw-mobile-viewport">
              <StudyWorldHeader isShowcase activeViewport="mobile" />
            </div>
          </div>
        )}

        {/* 4. MOBILE DRAWER OPEN FRAME */}
        {(activeTab === 'all' || activeTab === 'drawer') && (
          <div className="sw-artboard sw-artboard-drawer">
            <div className="sw-artboard-header">
              <span className="sw-artboard-tag">Mobile Drawer Open (320px)</span>
              <span className="sw-artboard-meta">Slide-in Drawer with Navigation, Regional Settings, CTA & Auth</span>
            </div>
            <div className="sw-artboard-viewport sw-mobile-viewport sw-relative-container">
              {/* Rendered Mobile Header with Forced Drawer Open */}
              <div className="sw-drawer-preview">
                <div className="sw-drawer-preview-backdrop" />
                <aside className="sw-drawer sw-open sw-preview-drawer">
                  <div className="sw-drawer-header">
                    <div className="sw-brand-link">
                      <div className="sw-logo-icon">
                        <BookOpen size={18} className="sw-logo-book" />
                        <GraduationCap size={14} className="sw-logo-cap" />
                      </div>
                      <div className="sw-brand-text">
                        <span className="sw-brand-title">StudyWorld</span>
                      </div>
                    </div>
                    <button className="sw-drawer-close" aria-label="Close drawer">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="sw-drawer-divider" />
                  <div className="sw-drawer-content">
                    <div className="sw-drawer-section">
                      <div className="sw-drawer-section-title">Navigation</div>
                      {navItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={item.label} className="sw-drawer-nav-item">
                            <div className="sw-drawer-icon-wrap">
                              <IconComponent size={18} />
                            </div>
                            <span>{item.label}</span>
                            {item.badge && <span className="sw-nav-badge">{item.badge}</span>}
                          </div>
                        );
                      })}
                    </div>
                    <div className="sw-drawer-divider" />
                    <div className="sw-drawer-section">
                      <div className="sw-drawer-section-title">Regional Settings</div>
                      <label className="sw-drawer-select-label">
                        <span>Language</span>
                        <select className="sw-drawer-select" defaultValue="en">
                          {languages.map((l) => (
                            <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                          ))}
                        </select>
                      </label>
                      <label className="sw-drawer-select-label">
                        <span>Country / Region</span>
                        <select className="sw-drawer-select" defaultValue="IN">
                          {countries.map((c) => (
                            <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="sw-drawer-divider" />
                    <div className="sw-drawer-section">
                      <div className="sw-drawer-primary-cta">
                        <span>Enroll Now</span>
                        <ArrowRight size={18} />
                      </div>
                    </div>
                    <div className="sw-drawer-divider" />
                    <div className="sw-drawer-section">
                      <div className="sw-drawer-section-title">Account</div>
                      <div className="sw-drawer-auth-grid">
                        <button className="sw-drawer-auth-btn sw-auth-login">
                          <LogIn size={18} />
                          <span>Login</span>
                        </button>
                        <button className="sw-drawer-auth-btn sw-auth-signup">
                          <UserPlus size={18} />
                          <span>Sign Up</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="sw-drawer-footer">
                    <span>© StudyWorld</span>
                    <small>Centralized IdP Connected</small>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
