'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  LayoutGrid,
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
  X,
  BookOpen,
  Sparkles,
  ChevronRight,
  Menu
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Brand } from './Brand';

// Course Categories for All Courses Dropdown (upGrad-style)
const courseCategories = [
  {
    title: 'Digital Marketing Mastery',
    desc: 'SEO, Ads, Analytics & Content Funnels',
    href: '/courses/digital-marketing-mastery',
    icon: Sparkles,
    tag: 'Popular'
  },
  {
    title: 'Graphic Design Professional',
    desc: 'Photoshop, Illustrator & Visual Branding',
    href: '/courses/graphic-design-professional',
    icon: Award,
    tag: 'Top Rated'
  },
  {
    title: 'French Language Certification',
    desc: 'A1 to B1 Conversational & Exam Prep',
    href: '/courses/french-language-certification',
    icon: Globe,
    tag: 'Trending'
  },
  {
    title: 'Full Stack Web Development',
    desc: 'React, Node.js, Express & MongoDB',
    href: '/courses',
    icon: BookOpen,
    tag: 'New'
  }
];

const languages = [
  { code: 'EN', name: 'English', flag: '🌐' },
  { code: 'HI', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
];

const countries = [
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'US', name: 'USA', flag: '🇺🇸' },
  { code: 'UK', name: 'UK', flag: '🇬🇧' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
];

/**
 * Fully Responsive upGrad-Style Onevriksh Navigation Header
 * Works seamlessly across Desktop, Laptop, Tablet, and Mobile
 */
export function StudyWorldHeader() {
  const { user, login, register, logout } = useAuth();

  const [allCoursesOpen, setAllCoursesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const navRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setAllCoursesOpen(false);
        setRegionDropdownOpen(false);
        setAccountDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileDrawerOpen]);

  const handleLoginClick = (e) => {
    if (e) e.preventDefault();
    setAccountDropdownOpen(false);
    setMobileDrawerOpen(false);
    login();
  };

  const handleRegisterClick = (e) => {
    if (e) e.preventDefault();
    setAccountDropdownOpen(false);
    setMobileDrawerOpen(false);
    register();
  };

  const handleLogoutClick = (e) => {
    if (e) e.preventDefault();
    setAccountDropdownOpen(false);
    setMobileDrawerOpen(false);
    logout();
  };

  return (
    <div className="up-header-wrapper" ref={navRef}>
      <header className="up-header">
        {/* 1. ONEVRIKSH LOGO */}
        <div className="up-brand-wrap">
          <Brand />
        </div>

        {/* 2. ALL COURSES BUTTON WITH MEGA DROPDOWN */}
        <div className="up-dropdown-container up-desktop-only">
          <button
            className={`up-courses-btn ${allCoursesOpen ? 'active' : ''}`}
            onClick={() => {
              setAllCoursesOpen(!allCoursesOpen);
              setRegionDropdownOpen(false);
              setAccountDropdownOpen(false);
            }}
          >
            <LayoutGrid size={18} className="up-grid-icon" />
            <span className="up-nowrap">All Courses</span>
            <ChevronDown size={15} className={`up-arrow ${allCoursesOpen ? 'open' : ''}`} />
          </button>

          {allCoursesOpen && (
            <div className="up-mega-dropdown up-fade-in">
              <div className="up-mega-header">
                <span>Explore Top Programs</span>
                <Link href="/courses" onClick={() => setAllCoursesOpen(false)}>
                  View All ({courseCategories.length}+) <ChevronRight size={14} />
                </Link>
              </div>
              <div className="up-mega-grid">
                {courseCategories.map((cat) => {
                  const IconComp = cat.icon;
                  return (
                    <Link
                      key={cat.title}
                      href={cat.href}
                      className="up-mega-card"
                      onClick={() => setAllCoursesOpen(false)}
                    >
                      <div className="up-mega-icon">
                        <IconComp size={18} />
                      </div>
                      <div className="up-mega-info">
                        <div className="up-mega-title-row">
                          <strong>{cat.title}</strong>
                          {cat.tag && <span className="up-tag">{cat.tag}</span>}
                        </div>
                        <p>{cat.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 3. LARGE 520PX DESKTOP/TABLET SEARCH BAR */}
        <div className={`up-search-box up-desktop-tablet-only ${searchFocused ? 'focused' : ''}`}>
          <input
            type="text"
            className="up-search-input"
            placeholder="Search for courses, skills, certifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {searchQuery ? (
            <button className="up-search-clear" onClick={() => setSearchQuery('')}>
              <X size={15} />
            </button>
          ) : (
            <div className="up-search-btn">
              <Search size={17} />
            </div>
          )}
        </div>

        {/* 4. CENTER NAVIGATION LINKS (DESKTOP) */}
        <nav className="up-nav-links up-desktop-only" aria-label="Header Links">
          <Link href="/courses?type=certification" className="up-nav-item">
            <Award size={17} className="up-nav-icon" />
            <span className="up-nowrap">Certification</span>
          </Link>
          <Link href="/demo" className="up-nav-item">
            <Globe size={17} className="up-nav-icon" />
            <span className="up-nowrap">Study Abroad</span>
          </Link>
          <Link href="/contact" className="up-nav-item">
            <Building2 size={17} className="up-nav-icon" />
            <span className="up-nowrap">Offline Centers</span>
          </Link>
        </nav>

        {/* 5. RIGHT CONTROLS GROUP (DESKTOP / TABLET) */}
        <div className="up-right-actions up-desktop-tablet-only">
          {/* COMBINED REGION / LANGUAGE SELECTOR */}
          <div className="up-dropdown-container">
            <button
              className="up-region-btn"
              onClick={() => {
                setRegionDropdownOpen(!regionDropdownOpen);
                setAllCoursesOpen(false);
                setAccountDropdownOpen(false);
              }}
              title="Select Language & Country"
            >
              <span>🌐 {selectedLang.code}</span>
              <span className="up-divider-pipe">|</span>
              <span>{selectedCountry.flag} {selectedCountry.code}</span>
              <ChevronDown size={14} className={`up-arrow ${regionDropdownOpen ? 'open' : ''}`} />
            </button>

            {regionDropdownOpen && (
              <div className="up-dropdown-menu up-fade-in">
                <div className="up-menu-section">
                  <div className="up-menu-title">Language</div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      className={`up-menu-row ${selectedLang.code === l.code ? 'active' : ''}`}
                      onClick={() => setSelectedLang(l)}
                    >
                      <span>{l.flag} {l.name}</span>
                      {selectedLang.code === l.code && <Check size={14} />}
                    </button>
                  ))}
                </div>

                <div className="up-menu-divider" />

                <div className="up-menu-section">
                  <div className="up-menu-title">Country</div>
                  {countries.map((c) => (
                    <button
                      key={c.code}
                      className={`up-menu-row ${selectedCountry.code === c.code ? 'active' : ''}`}
                      onClick={() => setSelectedCountry(c)}
                    >
                      <span>{c.flag} {c.name}</span>
                      {selectedCountry.code === c.code && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ENROLL NOW CTA (SINGLE LINE) */}
          <Link href="/courses" className="up-enroll-cta">
            <span className="up-nowrap">Enroll Now</span>
            <ArrowRight size={15} />
          </Link>

          {/* ACCOUNT BUTTON WITH DROPDOWN */}
          <div className="up-dropdown-container">
            <button
              className="up-account-btn"
              onClick={() => {
                setAccountDropdownOpen(!accountDropdownOpen);
                setAllCoursesOpen(false);
                setRegionDropdownOpen(false);
              }}
            >
              <User size={16} />
              <span className="up-nowrap">{user ? user.name.split(' ')[0] : 'Account'}</span>
              <ChevronDown size={14} className={`up-arrow ${accountDropdownOpen ? 'open' : ''}`} />
            </button>

            {accountDropdownOpen && (
              <div className="up-dropdown-menu up-dropdown-right up-fade-in">
                {user ? (
                  <>
                    <div className="up-user-info">
                      <strong>{user.name}</strong>
                      <small>{user.email}</small>
                    </div>
                    <div className="up-menu-divider" />
                    <Link
                      href={user.role === 'admin' ? '/admin' : '/student'}
                      className="up-menu-row"
                      onClick={() => setAccountDropdownOpen(false)}
                    >
                      <User size={15} />
                      <span>Student Dashboard</span>
                    </Link>
                    <button className="up-menu-row danger" onClick={handleLogoutClick}>
                      <span>Log out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="up-menu-title">Central IdP SSO</div>
                    <button className="up-menu-row" onClick={handleLoginClick}>
                      <LogIn size={15} />
                      <span>Login</span>
                    </button>
                    <button className="up-menu-row" onClick={handleRegisterClick}>
                      <UserPlus size={15} />
                      <span>Sign Up</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 6. MOBILE CONTROLS & HAMBURGER (MOBILE ONLY) */}
        <div className="up-mobile-controls">
          <button
            className="up-mobile-icon-btn"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Toggle Search"
          >
            <Search size={19} />
          </button>
          <button
            className="up-mobile-icon-btn"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* MOBILE SEARCH BAR OVERLAY */}
      {mobileSearchOpen && (
        <div className="up-mobile-search-bar up-fade-in">
          <input
            type="text"
            placeholder="Search courses, skills, certifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button onClick={() => setMobileSearchOpen(false)}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* 7. SLIDE-IN MOBILE RIGHT DRAWER (320px) */}
      <div className={`up-drawer-backdrop ${mobileDrawerOpen ? 'visible' : ''}`} onClick={() => setMobileDrawerOpen(false)} />
      <aside className={`up-drawer ${mobileDrawerOpen ? 'open' : ''}`}>
        <div className="up-drawer-header">
          <Brand />
          <button className="up-drawer-close" onClick={() => setMobileDrawerOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="up-drawer-body">
          {/* SEARCH IN DRAWER */}
          <div className="up-drawer-search">
            <Search size={16} className="up-drawer-search-icon" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* EXPLORE COURSES SECTION */}
          <div className="up-drawer-section">
            <div className="up-drawer-section-title">Explore Courses</div>
            {courseCategories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="up-drawer-nav-row"
                onClick={() => setMobileDrawerOpen(false)}
              >
                <span>{cat.title}</span>
                {cat.tag && <span className="up-tag">{cat.tag}</span>}
              </Link>
            ))}
          </div>

          <div className="up-drawer-divider" />

          {/* MAIN NAVIGATION LINKS */}
          <div className="up-drawer-section">
            <div className="up-drawer-section-title">Navigation</div>
            <Link href="/courses?type=certification" className="up-drawer-nav-row" onClick={() => setMobileDrawerOpen(false)}>
              <Award size={17} /> <span>Certification</span>
            </Link>
            <Link href="/demo" className="up-drawer-nav-row" onClick={() => setMobileDrawerOpen(false)}>
              <Globe size={17} /> <span>Study Abroad</span>
            </Link>
            <Link href="/contact" className="up-drawer-nav-row" onClick={() => setMobileDrawerOpen(false)}>
              <Building2 size={17} /> <span>Offline Centers</span>
            </Link>
          </div>

          <div className="up-drawer-divider" />

          {/* REGION SELECTION */}
          <div className="up-drawer-section">
            <div className="up-drawer-section-title">Region & Language</div>
            <div className="up-drawer-select-row">
              <label>Language:</label>
              <select
                value={selectedLang.code}
                onChange={(e) => setSelectedLang(languages.find((l) => l.code === e.target.value))}
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                ))}
              </select>
            </div>
            <div className="up-drawer-select-row">
              <label>Country:</label>
              <select
                value={selectedCountry.code}
                onChange={(e) => setSelectedCountry(countries.find((c) => c.code === e.target.value))}
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="up-drawer-divider" />

          {/* ENROLL CTA */}
          <Link href="/courses" className="up-drawer-primary-cta" onClick={() => setMobileDrawerOpen(false)}>
            <span>Enroll Now</span>
            <ArrowRight size={16} />
          </Link>

          {/* AUTHENTICATION */}
          {user ? (
            <button className="up-drawer-auth-btn logout" onClick={handleLogoutClick}>
              Logout ({user.name.split(' ')[0]})
            </button>
          ) : (
            <div className="up-drawer-auth-grid">
              <button className="up-drawer-auth-btn login" onClick={handleLoginClick}>
                <LogIn size={15} /> Login
              </button>
              <button className="up-drawer-auth-btn signup" onClick={handleRegisterClick}>
                <UserPlus size={15} /> Sign Up
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export const StudyWorldDesktopHeader = StudyWorldHeader;

/**
 * upGrad-Style Multi-Frame Responsive Showcase
 * Displays Desktop (1440px), Laptop (1024px), Tablet (768px), Mobile (390px), and Mobile Drawer Open
 */
export function StudyWorldHeaderShowcase() {
  const [activeFrame, setActiveFrame] = useState('all');

  return (
    <div className="up-showcase-canvas">
      <div className="up-showcase-bar">
        <div className="up-showcase-title">
          <div className="up-showcase-badge">Fully Responsive upGrad Header System</div>
          <h2>Onevriksh STUDY Cross-Device Responsive Artboards</h2>
          <p>Test Desktop (1440px), Laptop (1024px), Tablet (834px), Mobile (390px), and Mobile Drawer Open states</p>
        </div>

        <div className="up-showcase-tabs">
          <button className={`up-tab ${activeFrame === 'all' ? 'active' : ''}`} onClick={() => setActiveFrame('all')}>All Devices</button>
          <button className={`up-tab ${activeFrame === 'desktop' ? 'active' : ''}`} onClick={() => setActiveFrame('desktop')}>Desktop (1440px)</button>
          <button className={`up-tab ${activeFrame === 'laptop' ? 'active' : ''}`} onClick={() => setActiveFrame('laptop')}>Laptop (1024px)</button>
          <button className={`up-tab ${activeFrame === 'tablet' ? 'active' : ''}`} onClick={() => setActiveFrame('tablet')}>Tablet (834px)</button>
          <button className={`up-tab ${activeFrame === 'mobile' ? 'active' : ''}`} onClick={() => setActiveFrame('mobile')}>Mobile (390px)</button>
        </div>
      </div>

      <div className="up-showcase-grid">
        {(activeFrame === 'all' || activeFrame === 'desktop') && (
          <div className="up-artboard">
            <div className="up-artboard-header">
              <span className="up-artboard-tag">🖥️ Desktop Frame (1440px)</span>
              <span className="up-artboard-meta">Full 100% Stretched Navbar</span>
            </div>
            <div className="up-artboard-viewport up-desktop-frame">
              <StudyWorldHeader />
            </div>
          </div>
        )}

        {(activeFrame === 'all' || activeFrame === 'laptop') && (
          <div className="up-artboard">
            <div className="up-artboard-header">
              <span className="up-artboard-tag">💻 Laptop Frame (1024px)</span>
              <span className="up-artboard-meta">Compact Search Bar & Single Line Actions</span>
            </div>
            <div className="up-artboard-viewport up-laptop-frame">
              <StudyWorldHeader />
            </div>
          </div>
        )}

        {(activeFrame === 'all' || activeFrame === 'tablet') && (
          <div className="up-artboard">
            <div className="up-artboard-header">
              <span className="up-artboard-tag">📱 Tablet Frame (834px)</span>
              <span className="up-artboard-meta">Compact Region Selector & Responsive Actions</span>
            </div>
            <div className="up-artboard-viewport up-tablet-frame">
              <StudyWorldHeader />
            </div>
          </div>
        )}

        {(activeFrame === 'all' || activeFrame === 'mobile') && (
          <div className="up-artboard">
            <div className="up-artboard-header">
              <span className="up-artboard-tag">📱 Mobile Viewport (390px)</span>
              <span className="up-artboard-meta">Single-row Header with Search Trigger & Hamburger</span>
            </div>
            <div className="up-artboard-viewport up-mobile-frame">
              <StudyWorldHeader />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudyWorldHeader;
