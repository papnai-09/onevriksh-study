'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Brand } from './Brand';

// Course Categories for All Courses Dropdown
const courseCategories = [
  {
    title: 'Digital Marketing Mastery',
    desc: 'SEO, Ads, Analytics & Content Funnels',
    href: '/courses/digital-marketing-mastery',
    tag: 'Popular'
  },
  {
    title: 'Graphic Design Professional',
    desc: 'Photoshop, Illustrator & Visual Branding',
    href: '/courses/graphic-design-professional',
    tag: 'Top Rated'
  },
  {
    title: 'French Language Certification',
    desc: 'A1 to B1 Conversational & Exam Prep',
    href: '/courses/french-language-certification',
    tag: 'Trending'
  },
  {
    title: 'Full Stack Web Development',
    desc: 'React, Node.js, Express & MongoDB',
    href: '/courses',
    tag: 'New'
  }
];

const languages = [
  { code: 'EN', name: 'English' },
  { code: 'HI', name: 'Hindi' },
  { code: 'ES', name: 'Spanish' },
];

const countries = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'USA' },
  { code: 'UK', name: 'UK' },
  { code: 'AE', name: 'UAE' },
];

/**
 * Clean Header Component with Left-Grouped Nav Items, Right-Shifted Search Bar, and Equal Spacing
 */
export function StudyWorldHeader() {
  const { user, login, register, logout } = useAuth();

  const [allCoursesOpen, setAllCoursesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
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
        setUserDropdownOpen(false);
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
    setUserDropdownOpen(false);
    setMobileDrawerOpen(false);
    login();
  };

  const handleRegisterClick = (e) => {
    if (e) e.preventDefault();
    setUserDropdownOpen(false);
    setMobileDrawerOpen(false);
    register();
  };

  const handleLogoutClick = (e) => {
    if (e) e.preventDefault();
    setUserDropdownOpen(false);
    setMobileDrawerOpen(false);
    logout();
  };

  return (
    <div className="up-header-wrapper" ref={navRef}>
      <header className="up-header">
        {/* LEFT NAV GROUP: LOGO, ALL COURSES, CERTIFICATION, STUDY ABROAD, OFFLINE CENTERS */}
        <div className="up-left-nav-group">
          {/* BRAND LOGO */}
          <div className="up-brand-wrap">
            <Brand />
          </div>

          {/* ALL COURSES BUTTON (BORDERLESS) */}
          <div className="up-dropdown-container up-desktop-only">
            <button
              className={`up-courses-btn ${allCoursesOpen ? 'active' : ''}`}
              onClick={() => {
                setAllCoursesOpen(!allCoursesOpen);
                setRegionDropdownOpen(false);
                setUserDropdownOpen(false);
              }}
            >
              <span className="up-nowrap">All Courses</span>
              <ChevronDown size={13} className={`up-chevron ${allCoursesOpen ? 'open' : ''}`} />
            </button>

            {allCoursesOpen && (
              <div className="up-mega-dropdown up-fade-in">
                <div className="up-mega-header">
                  <span>Explore Top Programs</span>
                  <Link href="/courses" onClick={() => setAllCoursesOpen(false)}>
                    View All ({courseCategories.length}+) →
                  </Link>
                </div>
                <div className="up-mega-grid">
                  {courseCategories.map((cat) => (
                    <Link
                      key={cat.title}
                      href={cat.href}
                      className="up-mega-card"
                      onClick={() => setAllCoursesOpen(false)}
                    >
                      <div className="up-mega-info">
                        <div className="up-mega-title-row">
                          <strong>{cat.title}</strong>
                          {cat.tag && <span className="up-tag">{cat.tag}</span>}
                        </div>
                        <p>{cat.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* LEFT NAVIGATION LINKS (CERTIFICATION, STUDY ABROAD, OFFLINE CENTERS) */}
          <nav className="up-nav-links up-desktop-only" aria-label="Header Links">
            <Link href="/courses?type=certification" className="up-nav-item">
              <span className="up-nowrap">Certification</span>
            </Link>
            <Link href="/demo" className="up-nav-item">
              <span className="up-nowrap">Study Abroad</span>
            </Link>
            <Link href="/contact" className="up-nav-item">
              <span className="up-nowrap">Offline Centers</span>
            </Link>
          </nav>
        </div>

        {/* RIGHT CONTROLS GROUP: SEARCH BAR, REGION SELECTOR, SIGN IN BUTTON */}
        <div className="up-right-actions up-desktop-tablet-only">
          {/* COMPACT SEARCH BAR MOVED TO RIGHT SIDE */}
          <div className={`up-search-box ${searchFocused ? 'focused' : ''}`}>
            <input
              type="text"
              className="up-search-input"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchQuery ? (
              <button className="up-search-clear" onClick={() => setSearchQuery('')}>
                ✕
              </button>
            ) : (
              <div className="up-search-icon-btn-sm" title="Search">
                <Search size={14} />
              </div>
            )}
          </div>

          {/* COMBINED REGION / LANGUAGE SELECTOR */}
          <div className="up-dropdown-container">
            <button
              className="up-region-btn"
              onClick={() => {
                setRegionDropdownOpen(!regionDropdownOpen);
                setAllCoursesOpen(false);
                setUserDropdownOpen(false);
              }}
              title="Select Language & Country"
            >
              <span>{selectedLang.code}</span>
              <span className="up-divider-pipe">|</span>
              <span>{selectedCountry.code}</span>
              <ChevronDown size={12} className={`up-chevron ${regionDropdownOpen ? 'open' : ''}`} />
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
                      <span>{l.name} ({l.code})</span>
                      {selectedLang.code === l.code && <Check size={13} />}
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
                      <span>{c.name} ({c.code})</span>
                      {selectedCountry.code === c.code && <Check size={13} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIGN IN BUTTON */}
          {user ? (
            <div className="up-dropdown-container">
              <button
                className="up-signin-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <span className="up-nowrap">{user.name.split(' ')[0]}</span>
                <ChevronDown size={12} className={`up-chevron ${userDropdownOpen ? 'open' : ''}`} />
              </button>

              {userDropdownOpen && (
                <div className="up-dropdown-menu up-dropdown-right up-fade-in">
                  <div className="up-user-info">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                  <div className="up-menu-divider" />
                  <Link
                    href={user.role === 'admin' ? '/admin' : '/student'}
                    className="up-menu-row"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <span>Student Dashboard</span>
                  </Link>
                  <button className="up-menu-row danger" onClick={handleLogoutClick}>
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="up-signin-btn" onClick={handleLoginClick}>
              <span className="up-nowrap">Sign In</span>
            </button>
          )}
        </div>

        {/* MOBILE CONTROLS */}
        <div className="up-mobile-controls">
          <button
            className="up-mobile-text-btn"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Toggle Search"
          >
            <Search size={14} />
          </button>
          <button
            className="up-mobile-text-btn"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open Navigation Menu"
          >
            Menu
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
          <button onClick={() => setMobileSearchOpen(false)}>✕</button>
        </div>
      )}

      {/* SLIDE-IN MOBILE RIGHT DRAWER */}
      <div className={`up-drawer-backdrop ${mobileDrawerOpen ? 'visible' : ''}`} onClick={() => setMobileDrawerOpen(false)} />
      <aside className={`up-drawer ${mobileDrawerOpen ? 'open' : ''}`}>
        <div className="up-drawer-header">
          <Brand compact />
          <button className="up-drawer-close" onClick={() => setMobileDrawerOpen(false)}>✕</button>
        </div>

        <div className="up-drawer-body">
          {/* SEARCH IN DRAWER */}
          <div className="up-drawer-search">
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
              <span>Certification</span>
            </Link>
            <Link href="/demo" className="up-drawer-nav-row" onClick={() => setMobileDrawerOpen(false)}>
              <span>Study Abroad</span>
            </Link>
            <Link href="/contact" className="up-drawer-nav-row" onClick={() => setMobileDrawerOpen(false)}>
              <span>Offline Centers</span>
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
                  <option key={l.code} value={l.code}>{l.name} ({l.code})</option>
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
                  <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="up-drawer-divider" />

          {/* AUTHENTICATION / SIGN IN */}
          {user ? (
            <button className="up-drawer-auth-btn logout" onClick={handleLogoutClick}>
              Logout ({user.name.split(' ')[0]})
            </button>
          ) : (
            <button className="up-drawer-auth-btn login" onClick={handleLoginClick}>
              Sign In
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

export const StudyWorldDesktopHeader = StudyWorldHeader;

/**
 * Clean Multi-Frame Showcase Presentation
 */
export function StudyWorldHeaderShowcase() {
  const [activeFrame, setActiveFrame] = useState('all');

  return (
    <div className="up-showcase-canvas">
      <div className="up-showcase-bar">
        <div className="up-showcase-title">
          <div className="up-showcase-badge">Clean Design System</div>
          <h2>Onevriksh STUDY Header (Left Grouped Items, Right Shifted Search Bar & Un-bolded Study Text)</h2>
          <p>Black_Transparent.png Logo + Normal Weight Study Text, Left-grouped nav items with equal 20px gap, Right-shifted compact search bar, EN | IN region selector, and Sign In button</p>
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
              <span className="up-artboard-meta">Left Grouped Nav Items & Right Shifted Search Bar</span>
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
              <span className="up-artboard-meta">Compact Right Search Bar & Sign In Button</span>
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
              <span className="up-artboard-meta">Clean Region Selector & Sign In Button</span>
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
              <span className="up-artboard-meta">Clean Minimal Mobile Header</span>
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
