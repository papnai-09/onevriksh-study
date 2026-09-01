'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronRight, Check } from 'lucide-react';
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
 * Clean Header Component with Full-Width Hover Mega Dropdown and Live Real-time Course Search
 */
export function StudyWorldHeader() {
  const router = useRouter();
  const { user, logout } = useAuth();

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
  const searchContainerRef = useRef(null);
  const timeoutRef = useRef(null);

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

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchFocused(false);
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
        {/* LEFT NAV GROUP: LOGO, ALL COURSES, CERTIFICATION, STUDY ABROAD, OFFLINE CENTERS */}
        <div className="up-left-nav-group">
          {/* BRAND LOGO */}
          <div className="up-brand-wrap">
            <Brand />
          </div>

          {/* ALL COURSES BUTTON (HOVER OPEN & CLOSE) */}
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

          {/* LEFT NAVIGATION LINKS */}
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

            {/* LIVE SEARCH RESULTS DROPDOWN */}
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
                <span className="up-nowrap">{user.name?.split(' ')[0] || 'User'}</span>
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
              Logout ({user.name?.split(' ')[0] || 'User'})
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
