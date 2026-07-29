'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronRight, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Brand } from './Brand';

// Categorized Courses for Full-Width Side-Divided Hover Mega Dropdown
const courseCategories = [
  {
    category: 'Marketing',
    courses: [
      { title: 'Digital Marketing', href: '/courses/digital-marketing' }
    ]
  },
  {
    category: 'Design',
    courses: [
      { title: 'Graphic Design', href: '/courses/graphic-design' }
    ]
  },
  {
    category: 'Languages',
    courses: [
      { title: 'French Language', href: '/courses/french-language' },
      { title: 'German Language', href: '/courses/german-language' },
      { title: 'Spanish Language', href: '/courses/spanish-language' },
      { title: 'Italian Language', href: '/courses/italian-language' }
    ]
  },
  {
    category: 'Communication',
    courses: [
      { title: 'English Speaking', href: '/courses/english-speaking' }
    ]
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
 * Clean Header Component with Full-Width Hover Mega Dropdown (Auto Close on Mouse Leave)
 */
export function StudyWorldHeader() {
  const { user, login, register, logout } = useAuth();

  const [allCoursesOpen, setAllCoursesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(courseCategories[0].category);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const navRef = useRef(null);

  // Active category group object
  const activeGroup = courseCategories.find((c) => c.category === activeCategory) || courseCategories[0];

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

  const handleLogoutClick = (e) => {
    if (e) e.preventDefault();
    setUserDropdownOpen(false);
    setMobileDrawerOpen(false);
    logout();
  };

  return (
    <div
      className="up-header-wrapper"
      ref={navRef}
      style={{ position: 'relative' }}
      onMouseLeave={() => setAllCoursesOpen(false)}
    >
      <header className="up-header">
        {/* LEFT NAV GROUP: LOGO, ALL COURSES, CERTIFICATION, STUDY ABROAD, OFFLINE CENTERS */}
        <div className="up-left-nav-group">
          {/* BRAND LOGO */}
          <div className="up-brand-wrap">
            <Brand />
          </div>

          {/* ALL COURSES BUTTON (HOVER OPEN & CLOSE) */}
          <div
            className="up-dropdown-container up-desktop-only"
            onMouseEnter={() => setAllCoursesOpen(true)}
          >
            <button
              className={`up-courses-btn ${allCoursesOpen ? 'active' : ''}`}
              onClick={() => setAllCoursesOpen(!allCoursesOpen)}
            >
              <span className="up-nowrap">All Courses</span>
              <ChevronDown size={13} className={`up-chevron ${allCoursesOpen ? 'open' : ''}`} />
            </button>
          </div>

          {/* LEFT NAVIGATION LINKS */}
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
          {/* COMPACT SEARCH BAR */}
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

      {/* FULL-WIDTH STRETCHED MEGA DROPDOWN (AUTO CLOSES WHEN CURSOR LEAVES) */}
      {allCoursesOpen && (
        <div
          className="up-fullwidth-hover-mega up-fade-in"
          onMouseEnter={() => setAllCoursesOpen(true)}
          onMouseLeave={() => setAllCoursesOpen(false)}
        >
          <div className="up-fullwidth-side-body">
            {/* LEFT SIDEBAR CATEGORIES */}
            <div className="up-side-sidebar">
              {courseCategories.map((group) => (
                <button
                  key={group.category}
                  className={`up-side-cat-btn ${activeCategory === group.category ? 'active' : ''}`}
                  onMouseEnter={() => setActiveCategory(group.category)}
                  onClick={() => setActiveCategory(group.category)}
                >
                  <span>{group.category}</span>
                  <ChevronRight size={13} className="up-side-cat-arrow" />
                </button>
              ))}
            </div>

            {/* RIGHT CONTENT PANEL (COURSES) */}
            <div className="up-side-content">
              <div className="up-side-title">{activeGroup.category} Programs</div>
              <div className="up-side-courses-grid">
                {activeGroup.courses.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="up-side-course-card"
                    onClick={() => setAllCoursesOpen(false)}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE SEARCH BAR OVERLAY */}
      {mobileSearchOpen && (
        <div className="up-mobile-search-bar up-fade-in">
          <input
            type="text"
            placeholder="Search courses..."
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

          {/* CATEGORIZED COURSES IN DRAWER */}
          {courseCategories.map((group) => (
            <div key={group.category} className="up-drawer-section">
              <div className="up-drawer-section-title">{group.category}</div>
              {group.courses.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="up-drawer-nav-row"
                  onClick={() => setMobileDrawerOpen(false)}
                >
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          ))}

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

export function StudyWorldHeaderShowcase() {
  return (
    <div className="up-showcase-canvas">
      <StudyWorldHeader />
    </div>
  );
}

export default StudyWorldHeader;
