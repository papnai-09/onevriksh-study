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
  ChevronRight
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
 * UpGrad-Style Fully Stretched Onevriksh Navigation Header
 */
export function StudyWorldHeader() {
  const { user, login, register, logout } = useAuth();

  const [allCoursesOpen, setAllCoursesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  
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

  const handleLoginClick = (e) => {
    if (e) e.preventDefault();
    setAccountDropdownOpen(false);
    login();
  };

  const handleRegisterClick = (e) => {
    if (e) e.preventDefault();
    setAccountDropdownOpen(false);
    register();
  };

  const handleLogoutClick = (e) => {
    if (e) e.preventDefault();
    setAccountDropdownOpen(false);
    logout();
  };

  return (
    <div className="up-header-wrapper" ref={navRef}>
      <header className="up-header">
        {/* 1. ONEVRIKSH LOGO */}
        <div className="up-brand-wrap">
          <Brand />
        </div>

        {/* 2. ALL COURSES BUTTON WITH DROPDOWN (UPGRAD-STYLE) */}
        <div className="up-dropdown-container">
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

        {/* 3. LARGE WIDE SEARCH BAR */}
        <div className={`up-search-box ${searchFocused ? 'focused' : ''}`}>
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

        {/* 4. CENTER NAVIGATION LINKS */}
        <nav className="up-nav-links" aria-label="Header Links">
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

        {/* 5. RIGHT CONTROLS GROUP */}
        <div className="up-right-actions">
          {/* COMBINED REGION / LANGUAGE SELECTOR (SHORT & CLEAN: 🌐 EN | 🇮🇳 IN ▼) */}
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

          {/* 6. ENROLL NOW GRADIENT CTA (SINGLE LINE) */}
          <Link href="/courses" className="up-enroll-cta">
            <span className="up-nowrap">Enroll Now</span>
            <ArrowRight size={15} />
          </Link>

          {/* 7. ACCOUNT BUTTON WITH DROPDOWN */}
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
      </header>
    </div>
  );
}

export const StudyWorldDesktopHeader = StudyWorldHeader;

/**
 * UpGrad-Style Figma Presentation Component
 */
export function StudyWorldHeaderShowcase() {
  return (
    <div className="up-showcase-canvas">
      <div className="up-showcase-bar">
        <div className="up-showcase-title">
          <div className="up-showcase-badge">upGrad.com Reference System</div>
          <h2>Onevriksh STUDY Stretched Header Architecture</h2>
          <p>Official Onevriksh Logo, All Courses Mega Dropdown, Large 520px Search Bar, 🌐 EN | 🇮🇳 IN Region Selector & Single Line CTAs</p>
        </div>
      </div>
      <div className="up-showcase-frame">
        <StudyWorldHeader />
      </div>
    </div>
  );
}

export default StudyWorldHeader;
