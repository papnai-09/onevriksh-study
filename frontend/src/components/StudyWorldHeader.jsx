'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronRight, Check, Globe, MapPin } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Brand } from './Brand';
import { courses } from '@/data/site';

// Categorized Courses for Full-Width Side-Divided Hover Mega Dropdown
const courseCategories = [
  {
    category: 'Marketing',
    courses: [
      { title: 'Digital Marketing Foundation', href: '/digital-marketing-foundation' },
      { title: 'Digital Marketing Advanced', href: '/digital-marketing-advanced' },
      { title: 'Digital Marketing Mastery', href: '/digital-marketing-mastery' }
    ]
  },
  {
    category: 'Design',
    courses: [
      { title: 'Graphic Design', href: '/graphic-design' }
    ]
  },
  {
    category: 'Languages',
    courses: [
      { title: 'Spanish Language', href: '/spanish-language' },
      { title: 'German Language', href: '/german-language' },
      { title: 'French Language', href: '/french-language' },
      { title: 'Italian Language', href: '/italian-language' }
    ]
  },
  {
    category: 'Communication',
    courses: [
      { title: 'English Speaking', href: '/english-speaking' }
    ]
  }
];

const languages = [
  { code: 'EN', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'HI', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ES', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'FR', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'DE', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
];

const countries = [
  { code: 'IN', name: 'India', currency: '₹ INR', flag: '🇮🇳' },
  { code: 'US', name: 'United States', currency: '$ USD', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', currency: '£ GBP', flag: '🇬🇧' },
  { code: 'AE', name: 'UAE', currency: 'AED', flag: '🇦🇪' },
  { code: 'CA', name: 'Canada', currency: '$ CAD', flag: '🇨🇦' },
  { code: 'DE', name: 'Germany', currency: '€ EUR', flag: '🇩🇪' },
];

/**
 * Clean Header Component with 3-Line Ascending Hamburger Before Logo,
 * Live Real-time Course Search, and Functional Language & Region Selector
 */
export function StudyWorldHeader() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [allCoursesOpen, setAllCoursesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(courseCategories[0].category);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [regionTab, setRegionTab] = useState('lang'); // 'lang' | 'country'
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const navRef = useRef(null);
  const searchContainerRef = useRef(null);
  const regionContainerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Load saved language and country from localStorage
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('ovs_lang');
      if (savedLang) {
        const found = languages.find((l) => l.code === savedLang);
        if (found) setSelectedLang(found);
      }
      const savedCountry = localStorage.getItem('ovs_country');
      if (savedCountry) {
        const found = countries.find((c) => c.code === savedCountry);
        if (found) setSelectedCountry(found);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSelectLanguage = (lang) => {
    setSelectedLang(lang);
    try {
      localStorage.setItem('ovs_lang', lang.code);
    } catch {
      // ignore
    }
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    try {
      localStorage.setItem('ovs_country', country.code);
    } catch {
      // ignore
    }
  };

  // Live filter courses based on search query
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const showSearchResults = searchQuery.trim().length > 0 && searchFocused;

  const openAllCourses = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAllCoursesOpen(true);
  };

  const closeAllCourses = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setAllCoursesOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const activeGroup = courseCategories.find((c) => c.category === activeCategory) || courseCategories[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setAllCoursesOpen(false);
        setUserDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
      if (regionContainerRef.current && !regionContainerRef.current.contains(event.target)) {
        setRegionDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleSelectCourse = (slug) => {
    setSearchQuery('');
    setSearchFocused(false);
    setMobileSearchOpen(false);
    setMobileDrawerOpen(false);
    router.push(`/${slug}`);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults.length === 1) {
        handleSelectCourse(searchResults[0].slug);
      } else if (searchQuery.trim()) {
        router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
        setSearchFocused(false);
        setMobileSearchOpen(false);
      }
    } else if (e.key === 'Escape') {
      setSearchFocused(false);
    }
  };

  const handleLoginClick = (e) => {
    if (e) e.preventDefault();
    setUserDropdownOpen(false);
    setMobileDrawerOpen(false);
    router.push('/login');
  };

  const handleLogoutClick = async (e) => {
    if (e) e.preventDefault();
    setUserDropdownOpen(false);
    setMobileDrawerOpen(false);
    await logout();
    router.push('/login');
  };

  return (
    <div
      className="up-header-wrapper"
      ref={navRef}
      style={{ position: 'relative' }}
      onMouseLeave={closeAllCourses}
    >
      <header className="up-header">
        {/* LEFT NAV GROUP: (MOBILE: 3 ASCENDING LINES HAMBURGER BEFORE LOGO) + LOGO + ALL COURSES + LINKS */}
        <div className="up-left-nav-group">
          {/* 3 ASCENDING LINES HAMBURGER BUTTON (MOBILE ONLY — PLACED BEFORE LOGO) */}
          <button
            type="button"
            className="up-mobile-menu-btn up-mobile-only"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <span className="up-menu-bar up-bar-1" />
            <span className="up-menu-bar up-bar-2" />
            <span className="up-menu-bar up-bar-3" />
          </button>

          {/* BRAND LOGO */}
          <div className="up-brand-wrap">
            <Brand />
          </div>

          {/* ALL COURSES BUTTON (DESKTOP ONLY) */}
          <div
            className="up-dropdown-container up-desktop-only"
            onMouseEnter={openAllCourses}
            onMouseLeave={closeAllCourses}
          >
            <button
              className={`up-courses-btn ${allCoursesOpen ? 'active' : ''}`}
              onClick={() => setAllCoursesOpen(!allCoursesOpen)}
            >
              <span className="up-nowrap">All Courses</span>
              <ChevronDown size={13} className={`up-chevron ${allCoursesOpen ? 'open' : ''}`} />
            </button>
          </div>

          {/* LEFT NAVIGATION LINKS (DESKTOP ONLY) */}
          <nav className="up-nav-links up-desktop-only" aria-label="Header Links">
            <Link href="/certification" className="up-nav-item">
              <span className="up-nowrap">Certification</span>
            </Link>
            <Link href="/study-abroad" className="up-nav-item">
              <span className="up-nowrap">Study Abroad</span>
            </Link>
            <Link href="/offline-center" className="up-nav-item">
              <span className="up-nowrap">Offline Centers</span>
            </Link>
          </nav>
        </div>

        {/* RIGHT CONTROLS GROUP: SEARCH BAR, REGION SELECTOR, SIGN IN BUTTON */}
        <div className="up-right-actions up-desktop-tablet-only">
          {/* COMPACT LIVE SEARCH BAR */}
          <div className="up-search-wrapper" ref={searchContainerRef} style={{ position: 'relative' }}>
            <div className={`up-search-box ${searchFocused ? 'focused' : ''}`}>
              <input
                type="text"
                className="up-search-input"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                onKeyDown={handleSearchKeyDown}
              />
              {searchQuery ? (
                <button
                  className="up-search-clear"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchFocused(false);
                  }}
                  type="button"
                >
                  ✕
                </button>
              ) : (
                <div className="up-search-icon-btn-sm" title="Search">
                  <Search size={14} />
                </div>
              )}
            </div>

            {/* LIVE SEARCH RESULTS DROPDOWN (RIGHT-ANCHORED TO SEARCH BAR) */}
            {showSearchResults && (
              <div className="up-search-dropdown up-fade-in">
                <div className="up-search-dropdown-header">
                  <span>Courses ({searchResults.length})</span>
                </div>
                {searchResults.length > 0 ? (
                  <div className="up-search-dropdown-list">
                    {searchResults.map((course) => (
                      <div
                        key={course.slug}
                        className="up-search-result-item"
                        onMouseDown={() => handleSelectCourse(course.slug)}
                      >
                        <div className="up-search-result-info">
                          <span className="up-search-result-title">{course.title}</span>
                          <span className="up-search-result-meta">
                            {course.duration} • {course.level || 'All Levels'}
                          </span>
                        </div>
                        <span className="up-search-result-badge">{course.category}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="up-search-empty">
                    <span>No courses found matching &ldquo;{searchQuery}&rdquo;</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* COMBINED REGION / LANGUAGE SELECTOR */}
          <div className="up-dropdown-container" ref={regionContainerRef} style={{ position: 'relative' }}>
            <button
              type="button"
              className={`up-region-btn ${regionDropdownOpen ? 'active' : ''}`}
              onClick={() => {
                setRegionDropdownOpen(!regionDropdownOpen);
                setAllCoursesOpen(false);
                setUserDropdownOpen(false);
              }}
              title="Select Language & Country"
            >
              <span className="up-region-flag">{selectedCountry.flag}</span>
              <span>{selectedLang.code}</span>
              <span className="up-divider-pipe">|</span>
              <span>{selectedCountry.code}</span>
              <ChevronDown size={12} className={`up-chevron ${regionDropdownOpen ? 'open' : ''}`} />
            </button>

            {regionDropdownOpen && (
              <div className="up-dropdown-menu up-region-dropdown up-fade-in">
                {/* SELECTOR TABS */}
                <div className="up-region-tabs">
                  <button
                    type="button"
                    className={`up-region-tab ${regionTab === 'lang' ? 'active' : ''}`}
                    onClick={() => setRegionTab('lang')}
                  >
                    <Globe size={13} />
                    <span>Language</span>
                  </button>
                  <button
                    type="button"
                    className={`up-region-tab ${regionTab === 'country' ? 'active' : ''}`}
                    onClick={() => setRegionTab('country')}
                  >
                    <MapPin size={13} />
                    <span>Country ({selectedCountry.currency})</span>
                  </button>
                </div>

                {/* TAB 1: LANGUAGES */}
                {regionTab === 'lang' && (
                  <div className="up-menu-section">
                    <div className="up-menu-title">Select Preferred Language</div>
                    <div className="up-region-list">
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          type="button"
                          className={`up-menu-row ${selectedLang.code === l.code ? 'active' : ''}`}
                          onClick={() => {
                            handleSelectLanguage(l);
                            setRegionTab('country'); // seamlessly advance to country selection
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.05rem' }}>{l.flag}</span>
                            <strong>{l.native}</strong>
                            <small style={{ color: '#64748B', fontWeight: 500 }}>({l.name})</small>
                          </span>
                          {selectedLang.code === l.code && <Check size={14} style={{ color: '#0F766E' }} />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: COUNTRIES */}
                {regionTab === 'country' && (
                  <div className="up-menu-section">
                    <div className="up-menu-title">Select Region &amp; Currency</div>
                    <div className="up-region-list">
                      {countries.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          className={`up-menu-row ${selectedCountry.code === c.code ? 'active' : ''}`}
                          onClick={() => {
                            handleSelectCountry(c);
                            setRegionDropdownOpen(false); // close dropdown on final selection
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.05rem' }}>{c.flag}</span>
                            <strong>{c.name}</strong>
                            <span className="up-currency-badge">{c.currency}</span>
                          </span>
                          {selectedCountry.code === c.code && <Check size={14} style={{ color: '#0F766E' }} />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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
                <span className="up-nowrap">{user.name?.split(' ')[0] || user.phone?.slice(-5) || 'User'}</span>
                <ChevronDown size={12} className={`up-chevron ${userDropdownOpen ? 'open' : ''}`} />
              </button>

              {userDropdownOpen && (
                <div className="up-dropdown-menu up-dropdown-right up-fade-in">
                  <div className="up-user-info">
                    <strong>{user.name}</strong>
                    <small>{user.phone || user.email}</small>
                  </div>
                  <div className="up-menu-divider" />
                  <Link
                    href={user.role === 'admin' ? '/admin' : '/student'}
                    className="up-menu-row"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <span>{user.role === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}</span>
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

        {/* MOBILE RIGHT CONTROLS (SEARCH & SIGN IN) */}
        <div className="up-mobile-controls up-mobile-only">
          <button
            className="up-mobile-text-btn"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Toggle Search"
          >
            <Search size={16} />
          </button>
          {user ? (
            <button
              className="up-mobile-text-btn"
              onClick={() => router.push(user.role === 'admin' ? '/admin' : '/student')}
            >
              {user.name?.split(' ')[0] || 'Portal'}
            </button>
          ) : (
            <button className="up-mobile-text-btn" onClick={handleLoginClick}>
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* FULL-WIDTH STRETCHED MEGA DROPDOWN */}
      {allCoursesOpen && (
        <div
          className="up-fullwidth-hover-mega up-fade-in"
          onMouseEnter={openAllCourses}
          onMouseLeave={closeAllCourses}
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
          <div className="up-mobile-search-inner">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              autoFocus
            />
            <button onClick={() => setMobileSearchOpen(false)}>✕</button>
          </div>
          {searchQuery.trim().length > 0 && (
            <div className="up-mobile-search-results">
              {searchResults.length > 0 ? (
                searchResults.map((course) => (
                  <div
                    key={course.slug}
                    className="up-search-result-item"
                    onClick={() => handleSelectCourse(course.slug)}
                  >
                    <div className="up-search-result-info">
                      <span className="up-search-result-title">{course.title}</span>
                      <span className="up-search-result-meta">{course.duration}</span>
                    </div>
                    <span className="up-search-result-badge">{course.category}</span>
                  </div>
                ))
              ) : (
                <div className="up-search-empty">
                  <span>No courses found matching &ldquo;{searchQuery}&rdquo;</span>
                </div>
              )}
            </div>
          )}
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
              onKeyDown={handleSearchKeyDown}
            />
          </div>

          {searchQuery.trim().length > 0 && (
            <div className="up-drawer-search-results">
              {searchResults.length > 0 ? (
                searchResults.map((course) => (
                  <div
                    key={course.slug}
                    className="up-search-result-item"
                    onClick={() => handleSelectCourse(course.slug)}
                  >
                    <div className="up-search-result-info">
                      <span className="up-search-result-title">{course.title}</span>
                      <span className="up-search-result-meta">{course.duration}</span>
                    </div>
                    <span className="up-search-result-badge">{course.category}</span>
                  </div>
                ))
              ) : (
                <div className="up-search-empty">
                  <span>No courses found</span>
                </div>
              )}
            </div>
          )}

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
            <Link href="/certification" className="up-drawer-nav-row" onClick={() => setMobileDrawerOpen(false)}>
              <span>Certification</span>
            </Link>
            <Link href="/study-abroad" className="up-drawer-nav-row" onClick={() => setMobileDrawerOpen(false)}>
              <span>Study Abroad</span>
            </Link>
            <Link href="/offline-center" className="up-drawer-nav-row" onClick={() => setMobileDrawerOpen(false)}>
              <span>Offline Centers</span>
            </Link>
          </div>

          <div className="up-drawer-divider" />

          {/* REGION & LANGUAGE SELECTION IN DRAWER */}
          <div className="up-drawer-section">
            <div className="up-drawer-section-title">Language &amp; Region</div>
            <div className="up-drawer-select-row">
              <label>Language:</label>
              <select
                value={selectedLang.code}
                onChange={(e) => {
                  const l = languages.find((lang) => lang.code === e.target.value);
                  if (l) handleSelectLanguage(l);
                }}
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.native} ({l.name})
                  </option>
                ))}
              </select>
            </div>
            <div className="up-drawer-select-row">
              <label>Country:</label>
              <select
                value={selectedCountry.code}
                onChange={(e) => {
                  const c = countries.find((cntry) => cntry.code === e.target.value);
                  if (c) handleSelectCountry(c);
                }}
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} ({c.currency})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="up-drawer-divider" />

          {/* AUTHENTICATION / SIGN IN */}
          {user ? (
            <button className="up-drawer-auth-btn logout" onClick={handleLogoutClick}>
              Logout ({user.name?.split(' ')[0] || user.phone?.slice(-5) || 'User'})
            </button>
          ) : (
            <button className="up-drawer-auth-btn login" onClick={handleLoginClick}>
              Sign In with Mobile
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
