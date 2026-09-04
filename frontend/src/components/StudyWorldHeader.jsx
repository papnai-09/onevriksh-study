'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Search,
  ChevronDown,
  ChevronRight,
  Check,
  Globe,
  MapPin,
  X,
  LayoutGrid,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRegion } from '@/context/RegionContext';
import { Brand } from './Brand';
import { courses } from '@/data/site';

// Categorized Courses for upGrad-Style 3-Column Mega Dropdown
const courseCategories = [
  {
    category: 'Digital Marketing',
    description: 'Master SEO, Performance Ads, GA4 Analytics & CRO',
    featured: {
      title: 'Performance Marketing Mastery',
      tag: '🔥 Placement Track',
      desc: 'Live campaigns with real ad spends & portfolio capstone defense.',
      href: '/digital-marketing-mastery',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80'
    },
    courses: [
      {
        title: 'Digital Marketing Foundation',
        href: '/digital-marketing-foundation',
        duration: '4 Months',
        badge: 'Beginner',
        tag: 'Live SEO Briefs',
        partner: 'ONEVRIKSH Studio'
      },
      {
        title: 'Digital Marketing Advanced',
        href: '/digital-marketing-advanced',
        duration: '8 Months',
        badge: 'Bestseller',
        tag: 'Google & Meta Ads',
        partner: 'Performance Lab'
      },
      {
        title: 'Digital Marketing Mastery',
        href: '/digital-marketing-mastery',
        duration: '12 Months',
        badge: '100% Placement*',
        tag: 'Full-Stack CRO & Capstone',
        partner: 'Industry Defense'
      }
    ]
  },
  {
    category: 'Global Languages',
    description: 'CEFR-Aligned European Language & Exam Preparation',
    featured: {
      title: 'German & European Fluency Track',
      tag: '🌍 CEFR Certified',
      desc: 'Complete Goethe, DELF, DELE & CILS exam coaching with native speaking labs.',
      href: '/german-language',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80'
    },
    courses: [
      {
        title: 'German Language',
        href: '/german-language',
        duration: '4 Months',
        badge: 'Goethe Aligned',
        tag: 'Speaking Club',
        partner: 'Goethe Prep'
      },
      {
        title: 'French Language',
        href: '/french-language',
        duration: '4 Months',
        badge: 'DELF Aligned',
        tag: 'Conversation Labs',
        partner: 'DELF Paris'
      },
      {
        title: 'Spanish Language',
        href: '/spanish-language',
        duration: '4 Months',
        badge: 'DELE Prep',
        tag: 'Cultural Immersion',
        partner: 'Cervantes Standard'
      },
      {
        title: 'Italian Language',
        href: '/italian-language',
        duration: '4 Months',
        badge: 'CILS Prep',
        tag: 'Native Certified',
        partner: 'CILS Siena'
      }
    ]
  },
  {
    category: 'Design & Creative',
    description: 'UI/UX, Visual Branding & Portfolio Studio',
    featured: {
      title: 'Graphic Design Studio Track',
      tag: '🎨 Portfolio Defense',
      desc: 'Build client-ready branding kits & Adobe suite mastery.',
      href: '/graphic-design',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80'
    },
    courses: [
      {
        title: 'Graphic Design Mastery',
        href: '/graphic-design',
        duration: '5 Months',
        badge: 'Bestseller',
        tag: 'Adobe Suite + Portfolio',
        partner: 'Creative Studio'
      }
    ]
  },
  {
    category: 'Communication',
    description: 'Spoken English, Fluency & Corporate Personality',
    featured: {
      title: 'Executive English & Personality',
      tag: '🎙️ Public Speaking',
      desc: 'Interview simulations, fluency labs & presentation mastery.',
      href: '/english-speaking',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80'
    },
    courses: [
      {
        title: 'English Speaking & Personality',
        href: '/english-speaking',
        duration: '3 Months',
        badge: 'Popular',
        tag: 'Daily Speaking Labs',
        partner: 'Fluency Hub'
      }
    ]
  }
];

const certificationCategories = [
  {
    category: 'Digital Marketing',
    courses: [
      { title: 'Digital Marketing Foundation Certificate', href: '/digital-marketing-foundation' },
      { title: 'Digital Marketing Advanced Certificate', href: '/digital-marketing-advanced' },
      { title: 'Digital Marketing Mastery Certificate', href: '/digital-marketing-mastery' },
    ]
  },
  {
    category: 'Global Languages',
    courses: [
      { title: 'German Language (Goethe CEFR Certificate)', href: '/german-language' },
      { title: 'French Language (DELF Certified Program)', href: '/french-language' },
      { title: 'Spanish Language (DELE Standard Certificate)', href: '/spanish-language' },
      { title: 'Italian Language (CILS Preparation Certificate)', href: '/italian-language' },
    ]
  },
  {
    category: 'Design & Creative',
    courses: [
      { title: 'Graphic Design Mastery Certificate', href: '/graphic-design' },
    ]
  },
  {
    category: 'Communication',
    courses: [
      { title: 'English Speaking & Personality Certificate', href: '/english-speaking' },
    ]
  }
];

const studyAbroadCategories = [];

const offlineCenterCategories = [
  {
    category: 'Connaught Place (Delhi)',
    courses: [
      { title: 'Digital Marketing Classroom Batches', href: '/digital-marketing-foundation' },
      { title: 'German Language Classroom Classes', href: '/german-language' },
      { title: 'French Language Classroom Classes', href: '/french-language' },
      { title: 'Spanish Language Classroom Classes', href: '/spanish-language' },
      { title: 'Italian Language Classroom Classes', href: '/italian-language' },
      { title: 'Graphic Design Studio Classes', href: '/graphic-design' },
      { title: 'English Speaking & Personality Batches', href: '/english-speaking' },
    ]
  },
  {
    category: 'GTB Nagar (Delhi)',
    courses: [
      { title: 'Digital Marketing Classroom Batches', href: '/digital-marketing-foundation' },
      { title: 'German Language Classroom Classes', href: '/german-language' },
      { title: 'French Language Classroom Classes', href: '/french-language' },
      { title: 'Spanish Language Classroom Classes', href: '/spanish-language' },
      { title: 'Italian Language Classroom Classes', href: '/italian-language' },
      { title: 'Graphic Design Studio Classes', href: '/graphic-design' },
      { title: 'English Speaking & Personality Batches', href: '/english-speaking' },
    ]
  }
];

const moreMenuCategories = [];

export function StudyWorldHeader() {
  const router = useRouter();
  const { user, logout, openAuthModal } = useAuth();
  const { selectedLang, selectedCountry, setLanguage, setCountry, languages, countries } = useRegion();

  const [activeMenu, setActiveMenu] = useState(null); // 'courses' | 'cert' | 'abroad' | 'center' | 'more' | null
  const [activeCategory, setActiveCategory] = useState(courseCategories[0]?.category || '');
  const [activeCertCategory, setActiveCertCategory] = useState(certificationCategories[0]?.category || '');
  const [activeAbroadCategory, setActiveAbroadCategory] = useState(studyAbroadCategories[0]?.category || '');
  const [activeCenterCategory, setActiveCenterCategory] = useState(offlineCenterCategories[0]?.category || '');
  const [activeMoreCategory, setActiveMoreCategory] = useState(moreMenuCategories[0]?.category || '');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [regionTab, setRegionTab] = useState('lang'); // 'lang' | 'country'
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [openDrawerSection, setOpenDrawerSection] = useState(null); // 'courses' | 'cert' | 'abroad' | 'center' | 'more' | null
  const [openDrawerCategory, setOpenDrawerCategory] = useState(null);

  const toggleDrawerSection = (section) => {
    setOpenDrawerSection((prev) => {
      if (prev === section) return null;
      setOpenDrawerCategory(null);
      return section;
    });
  };

  const toggleDrawerCategory = (catKey) => {
    setOpenDrawerCategory((prev) => (prev === catKey ? null : catKey));
  };

  const navRef = useRef(null);
  const searchContainerRef = useRef(null);
  const regionContainerRef = useRef(null);
  const menuTimeoutRef = useRef(null);
  const lastMenuHoverTime = useRef(0);

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

  const cancelMenuClose = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
  };

  const openMenu = (menuName) => {
    cancelMenuClose();
    lastMenuHoverTime.current = Date.now();
    setActiveMenu(menuName);
  };

  const closeMenu = () => {
    cancelMenuClose();
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 280);
  };

  const toggleMenu = (e, menuName) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    cancelMenuClose();
    const now = Date.now();
    if (now - lastMenuHoverTime.current < 400 && activeMenu === menuName) {
      setActiveMenu(menuName);
      return;
    }
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  useEffect(() => {
    return () => {
      cancelMenuClose();
    };
  }, []);

  const activeGroup = courseCategories.find((c) => c.category === activeCategory) || courseCategories[0] || { category: '', courses: [] };
  const activeCertGroup = certificationCategories.find((c) => c.category === activeCertCategory) || certificationCategories[0] || { category: '', courses: [] };
  const activeAbroadGroup = studyAbroadCategories.find((c) => c.category === activeAbroadCategory) || studyAbroadCategories[0] || { category: '', courses: [] };
  const activeCenterGroup = offlineCenterCategories.find((c) => c.category === activeCenterCategory) || offlineCenterCategories[0] || { category: '', courses: [] };
  const activeMoreGroup = moreMenuCategories.find((c) => c.category === activeMoreCategory) || moreMenuCategories[0] || { category: '', courses: [] };

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveMenu(null);
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
    setAllCoursesOpen(false);
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
    openAuthModal('login');
  };

  const handleLogoutClick = async (e) => {
    if (e) e.preventDefault();
    setUserDropdownOpen(false);
    setMobileDrawerOpen(false);
    await logout();
    router.push('/');
  };

  return (
    <div
      className="up-header-wrapper"
      ref={navRef}
      onMouseLeave={closeMenu}
    >
      <header className="up-header">
        {/* LEFT NAV GROUP: MOBILE 3-LINE ASCENDING HAMBURGER BEFORE LOGO + LOGO + ALL COURSES + LINKS */}
        <div className="up-left-nav-group">
          {/* 3 ASCENDING LINES HAMBURGER BUTTON (MOBILE ONLY) */}
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

          {/* DESKTOP NAV LINKS ROW */}
          <nav className="up-nav-links up-desktop-only" aria-label="Header Links">
            {/* 1. ALL COURSES DROPDOWN TRIGGER */}
            <div
              className="up-dropdown-container"
              onMouseEnter={() => openMenu('courses')}
              onMouseLeave={closeMenu}
            >
              <button
                type="button"
                className={`up-nav-item up-nav-dropdown-trigger ${activeMenu === 'courses' ? 'active' : ''}`}
                onClick={(e) => toggleMenu(e, 'courses')}
                onMouseEnter={() => openMenu('courses')}
                aria-expanded={activeMenu === 'courses'}
              >
                <span className="up-nowrap">All Courses</span>
                <ChevronDown size={13} className={`up-chevron ${activeMenu === 'courses' ? 'open' : ''}`} />
              </button>
            </div>

            {/* 2. CERTIFICATION DROPDOWN TRIGGER */}
            <div
              className="up-dropdown-container"
              onMouseEnter={() => openMenu('cert')}
              onMouseLeave={closeMenu}
            >
              <button
                type="button"
                className={`up-nav-item up-nav-dropdown-trigger ${activeMenu === 'cert' ? 'active' : ''}`}
                onClick={(e) => toggleMenu(e, 'cert')}
                onMouseEnter={() => openMenu('cert')}
                aria-expanded={activeMenu === 'cert'}
              >
                <span className="up-nowrap">Certification</span>
                <ChevronDown size={13} className={`up-chevron ${activeMenu === 'cert' ? 'open' : ''}`} />
              </button>
            </div>

            {/* 3. STUDY ABROAD DROPDOWN TRIGGER */}
            <div
              className="up-dropdown-container"
              onMouseEnter={() => openMenu('abroad')}
              onMouseLeave={closeMenu}
            >
              <button
                type="button"
                className={`up-nav-item up-nav-dropdown-trigger ${activeMenu === 'abroad' ? 'active' : ''}`}
                onClick={(e) => toggleMenu(e, 'abroad')}
                onMouseEnter={() => openMenu('abroad')}
                aria-expanded={activeMenu === 'abroad'}
              >
                <span className="up-nowrap">Study Abroad</span>
                <ChevronDown size={13} className={`up-chevron ${activeMenu === 'abroad' ? 'open' : ''}`} />
              </button>
            </div>

            {/* 4. OFFLINE CENTERS DROPDOWN TRIGGER */}
            <div
              className="up-dropdown-container"
              onMouseEnter={() => openMenu('center')}
              onMouseLeave={closeMenu}
            >
              <button
                type="button"
                className={`up-nav-item up-nav-dropdown-trigger ${activeMenu === 'center' ? 'active' : ''}`}
                onClick={(e) => toggleMenu(e, 'center')}
                onMouseEnter={() => openMenu('center')}
                aria-expanded={activeMenu === 'center'}
              >
                <span className="up-nowrap">Offline Centers</span>
                <ChevronDown size={13} className={`up-chevron ${activeMenu === 'center' ? 'open' : ''}`} />
              </button>
            </div>

            {/* 5. MORE DROPDOWN TRIGGER */}
            <div
              className="up-dropdown-container"
              onMouseEnter={() => openMenu('more')}
              onMouseLeave={closeMenu}
            >
              <button
                type="button"
                className={`up-nav-item up-nav-dropdown-trigger ${activeMenu === 'more' ? 'active' : ''}`}
                onClick={(e) => toggleMenu(e, 'more')}
                onMouseEnter={() => openMenu('more')}
                aria-expanded={activeMenu === 'more'}
              >
                <span className="up-nowrap">More</span>
                <ChevronDown size={13} className={`up-chevron ${activeMenu === 'more' ? 'open' : ''}`} />
              </button>
            </div>
          </nav>
        </div>

        {/* RIGHT CONTROLS GROUP: REGION SELECTOR, SIGN IN BUTTON */}
        <div className="up-right-actions up-desktop-tablet-only">

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
              title="Select Language & Region"
            >
              <span>{selectedLang.code}</span>
              <ChevronDown size={12} className={`up-chevron ${regionDropdownOpen ? 'open' : ''}`} />
            </button>

            {regionDropdownOpen && (
              <div className="up-dropdown-menu up-region-dropdown up-fade-in">
                {/* MODAL HEADER WITH TABS & CLOSE BUTTON */}
                <div className="up-region-header-row">
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
                      <span>Country</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="up-region-close-btn"
                    onClick={() => setRegionDropdownOpen(false)}
                    aria-label="Close"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* TAB 1: LANGUAGES */}
                {regionTab === 'lang' && (
                  <div className="up-menu-section">
                    <div className="up-menu-title">Language</div>
                    <div className="up-region-list">
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          type="button"
                          className={`up-menu-row ${selectedLang.code === l.code ? 'active' : ''}`}
                          onClick={() => setLanguage(l)}
                        >
                          <span className="up-menu-row-label">
                            <span className="up-menu-native-text">{l.native}</span>
                            <span className="up-menu-en-text">({l.name})</span>
                          </span>
                          {selectedLang.code === l.code && <Check size={14} className="up-check-active" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: COUNTRIES */}
                {regionTab === 'country' && (
                  <div className="up-menu-section">
                    <div className="up-menu-title">Country</div>
                    <div className="up-region-list">
                      {countries.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          className={`up-menu-row ${selectedCountry.code === c.code ? 'active' : ''}`}
                          onClick={() => setCountry(c)}
                        >
                          <span className="up-menu-row-label">
                            <span className="up-menu-native-text">{c.name}</span>
                          </span>
                          {selectedCountry.code === c.code && <Check size={14} className="up-check-active" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* FOOTER DONE BUTTON */}
                <div className="up-region-footer">
                  <button
                    type="button"
                    className="up-region-apply-btn"
                    onClick={() => setRegionDropdownOpen(false)}
                  >
                    Done
                  </button>
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

      {/* 1. FULL-SCREEN WIDTH ALL COURSES DROPDOWN */}
      {activeMenu === 'courses' && (
        <div
          className="up-fullwidth-dropdown up-fade-in"
          onMouseEnter={cancelMenuClose}
          onMouseLeave={closeMenu}
        >
          <div className="up-fullwidth-inner">
            {/* LEFT: CATEGORIES SIDEBAR */}
            <div className="up-fullwidth-cats">
              {courseCategories.map((group) => {
                const isActive = activeCategory === group.category;
                return (
                  <button
                    key={group.category}
                    type="button"
                    className={`up-fullwidth-cat-btn ${isActive ? 'active' : ''}`}
                    onMouseEnter={cancelMenuClose}
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelMenuClose();
                      setActiveCategory(group.category);
                    }}
                  >
                    <span>{group.category}</span>
                  </button>
                );
              })}
            </div>

            {/* RIGHT: COURSES GRID */}
            <div className="up-fullwidth-courses">
              <div className="up-fullwidth-courses-grid">
                {activeGroup.courses.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="up-fullwidth-course-link"
                    onClick={() => setActiveMenu(null)}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER BAR: EXPLORE ALL COURSES */}
          <div className="up-fullwidth-footer-bar">
            <Link
              href="/courses"
              className="up-fullwidth-explore-btn"
              onClick={() => setActiveMenu(null)}
            >
              <span>Explore All Courses</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}

      {/* 2. FULL-SCREEN WIDTH CERTIFICATION DROPDOWN */}
      {activeMenu === 'cert' && (
        <div
          className="up-fullwidth-dropdown up-fade-in"
          onMouseEnter={cancelMenuClose}
          onMouseLeave={closeMenu}
        >
          <div className="up-fullwidth-inner">
            {/* LEFT: CATEGORIES SIDEBAR */}
            <div className="up-fullwidth-cats">
              {certificationCategories.map((group) => {
                const isActive = activeCertCategory === group.category;
                return (
                  <button
                    key={group.category}
                    type="button"
                    className={`up-fullwidth-cat-btn ${isActive ? 'active' : ''}`}
                    onMouseEnter={cancelMenuClose}
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelMenuClose();
                      setActiveCertCategory(group.category);
                    }}
                  >
                    <span>{group.category}</span>
                  </button>
                );
              })}
            </div>

            {/* RIGHT: COURSES GRID */}
            <div className="up-fullwidth-courses">
              <div className="up-fullwidth-courses-grid">
                {activeCertGroup.courses.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="up-fullwidth-course-link"
                    onClick={() => setActiveMenu(null)}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER BAR: EXPLORE ALL CERTIFICATIONS */}
          <div className="up-fullwidth-footer-bar">
            <Link
              href="/certification"
              className="up-fullwidth-explore-btn"
              onClick={() => setActiveMenu(null)}
            >
              <span>Explore All Certifications</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}

      {/* 3. FULL-SCREEN WIDTH STUDY ABROAD DROPDOWN */}
      {activeMenu === 'abroad' && (
        <div
          className="up-fullwidth-dropdown up-fade-in"
          onMouseEnter={cancelMenuClose}
          onMouseLeave={closeMenu}
        >
          <div className="up-fullwidth-inner">
            {/* LEFT: CATEGORIES SIDEBAR */}
            <div className="up-fullwidth-cats">
              {studyAbroadCategories.map((group) => {
                const isActive = activeAbroadCategory === group.category;
                return (
                  <button
                    key={group.category}
                    type="button"
                    className={`up-fullwidth-cat-btn ${isActive ? 'active' : ''}`}
                    onMouseEnter={cancelMenuClose}
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelMenuClose();
                      setActiveAbroadCategory(group.category);
                    }}
                  >
                    <span>{group.category}</span>
                  </button>
                );
              })}
            </div>

            {/* RIGHT: COURSES GRID */}
            <div className="up-fullwidth-courses">
              <div className="up-fullwidth-courses-grid">
                {activeAbroadGroup?.courses?.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="up-fullwidth-course-link"
                    onClick={() => setActiveMenu(null)}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER BAR: EXPLORE STUDY ABROAD */}
          <div className="up-fullwidth-footer-bar">
            <Link
              href="/study-abroad"
              className="up-fullwidth-explore-btn"
              onClick={() => setActiveMenu(null)}
            >
              <span>Explore Study Abroad</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}

      {/* 4. FULL-SCREEN WIDTH OFFLINE CENTERS DROPDOWN */}
      {activeMenu === 'center' && (
        <div
          className="up-fullwidth-dropdown up-fade-in"
          onMouseEnter={cancelMenuClose}
          onMouseLeave={closeMenu}
        >
          <div className="up-fullwidth-inner">
            {/* LEFT: CATEGORIES SIDEBAR */}
            <div className="up-fullwidth-cats">
              {offlineCenterCategories.map((group) => {
                const isActive = activeCenterCategory === group.category;
                return (
                  <button
                    key={group.category}
                    type="button"
                    className={`up-fullwidth-cat-btn ${isActive ? 'active' : ''}`}
                    onMouseEnter={cancelMenuClose}
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelMenuClose();
                      setActiveCenterCategory(group.category);
                    }}
                  >
                    <span>{group.category}</span>
                  </button>
                );
              })}
            </div>

            {/* RIGHT: COURSES GRID */}
            <div className="up-fullwidth-courses">
              <div className="up-fullwidth-courses-grid">
                {activeCenterGroup?.courses?.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="up-fullwidth-course-link"
                    onClick={() => setActiveMenu(null)}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER BAR: EXPLORE OFFLINE CENTERS */}
          <div className="up-fullwidth-footer-bar">
            <Link
              href="/offline-center"
              className="up-fullwidth-explore-btn"
              onClick={() => setActiveMenu(null)}
            >
              <span>Explore All Centers</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}

      {/* 5. FULL-SCREEN WIDTH MORE DROPDOWN */}
      {activeMenu === 'more' && (
        <div
          className="up-fullwidth-dropdown up-fade-in"
          onMouseEnter={cancelMenuClose}
          onMouseLeave={closeMenu}
        >
          <div className="up-fullwidth-inner">
            {/* LEFT: CATEGORIES SIDEBAR */}
            <div className="up-fullwidth-cats">
              {moreMenuCategories.map((group) => {
                const isActive = activeMoreCategory === group.category;
                return (
                  <button
                    key={group.category}
                    type="button"
                    className={`up-fullwidth-cat-btn ${isActive ? 'active' : ''}`}
                    onMouseEnter={cancelMenuClose}
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelMenuClose();
                      setActiveMoreCategory(group.category);
                    }}
                  >
                    <span>{group.category}</span>
                  </button>
                );
              })}
            </div>

            {/* RIGHT: COURSES GRID */}
            <div className="up-fullwidth-courses">
              <div className="up-fullwidth-courses-grid">
                {activeMoreGroup?.courses?.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="up-fullwidth-course-link"
                    onClick={() => setActiveMenu(null)}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER BAR: EXPLORE MORE ABOUT US */}
          <div className="up-fullwidth-footer-bar">
            <Link
              href="/about"
              className="up-fullwidth-explore-btn"
              onClick={() => setActiveMenu(null)}
            >
              <span>Explore About Us</span>
              <ArrowRight size={12} />
            </Link>
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
      {mobileDrawerOpen && (
        <div className="up-drawer-backdrop visible" onClick={() => setMobileDrawerOpen(false)} />
      )}
      <aside className={`up-drawer ${mobileDrawerOpen ? 'open' : ''}`}>
        <div className="up-drawer-header">
          <Brand compact />
          <button className="up-drawer-close" onClick={() => setMobileDrawerOpen(false)}>✕</button>
        </div>

        <div className="up-drawer-body">
          {/* 1. ALL COURSES ACCORDION */}
          <div className="up-drawer-acc-group">
            <button
              type="button"
              className={`up-drawer-acc-trigger ${openDrawerSection === 'courses' ? 'active' : ''}`}
              onClick={() => toggleDrawerSection('courses')}
            >
              <span>All Courses</span>
              <ChevronDown size={16} className={`up-drawer-acc-icon ${openDrawerSection === 'courses' ? 'rotated' : ''}`} />
            </button>
            {openDrawerSection === 'courses' && (
              <div className="up-drawer-acc-body">
                <div className="up-drawer-nested-cats">
                  {courseCategories.map((group) => {
                    const isCatOpen = openDrawerCategory === `courses_${group.category}`;
                    return (
                      <div key={group.category} className="up-drawer-subacc-item">
                        <button
                          type="button"
                          className={`up-drawer-subacc-trigger ${isCatOpen ? 'active' : ''}`}
                          onClick={() => toggleDrawerCategory(`courses_${group.category}`)}
                        >
                          <span>{group.category}</span>
                          <ChevronDown size={14} className={`up-drawer-subacc-icon ${isCatOpen ? 'rotated' : ''}`} />
                        </button>
                        {isCatOpen && (
                          <div className="up-drawer-subacc-body">
                            {group.courses.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                className="up-drawer-subcat-link"
                                onClick={() => setMobileDrawerOpen(false)}
                              >
                                <span>{item.title}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <Link href="/courses" className="up-drawer-acc-explore" onClick={() => setMobileDrawerOpen(false)}>
                  <span>Explore All Courses</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>

          {/* 2. CERTIFICATION ACCORDION */}
          <div className="up-drawer-acc-group">
            <button
              type="button"
              className={`up-drawer-acc-trigger ${openDrawerSection === 'cert' ? 'active' : ''}`}
              onClick={() => toggleDrawerSection('cert')}
            >
              <span>Certification</span>
              <ChevronDown size={16} className={`up-drawer-acc-icon ${openDrawerSection === 'cert' ? 'rotated' : ''}`} />
            </button>
            {openDrawerSection === 'cert' && (
              <div className="up-drawer-acc-body">
                <div className="up-drawer-nested-cats">
                  {certificationCategories.map((group) => {
                    const isCatOpen = openDrawerCategory === `cert_${group.category}`;
                    return (
                      <div key={group.category} className="up-drawer-subacc-item">
                        <button
                          type="button"
                          className={`up-drawer-subacc-trigger ${isCatOpen ? 'active' : ''}`}
                          onClick={() => toggleDrawerCategory(`cert_${group.category}`)}
                        >
                          <span>{group.category}</span>
                          <ChevronDown size={14} className={`up-drawer-subacc-icon ${isCatOpen ? 'rotated' : ''}`} />
                        </button>
                        {isCatOpen && (
                          <div className="up-drawer-subacc-body">
                            {group.courses.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                className="up-drawer-subcat-link"
                                onClick={() => setMobileDrawerOpen(false)}
                              >
                                <span>{item.title}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <Link href="/certification" className="up-drawer-acc-explore" onClick={() => setMobileDrawerOpen(false)}>
                  <span>Explore All Certifications</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>

          {/* 3. STUDY ABROAD ACCORDION */}
          <div className="up-drawer-acc-group">
            <button
              type="button"
              className={`up-drawer-acc-trigger ${openDrawerSection === 'abroad' ? 'active' : ''}`}
              onClick={() => toggleDrawerSection('abroad')}
            >
              <span>Study Abroad</span>
              <ChevronDown size={16} className={`up-drawer-acc-icon ${openDrawerSection === 'abroad' ? 'rotated' : ''}`} />
            </button>
            {openDrawerSection === 'abroad' && (
              <div className="up-drawer-acc-body">
                <div className="up-drawer-nested-cats">
                  <div className="up-drawer-subacc-item">
                    <button
                      type="button"
                      className={`up-drawer-subacc-trigger ${openDrawerCategory === 'abroad_programs' ? 'active' : ''}`}
                      onClick={() => toggleDrawerCategory('abroad_programs')}
                    >
                      <span>Global Education Programs</span>
                      <ChevronDown size={14} className={`up-drawer-subacc-icon ${openDrawerCategory === 'abroad_programs' ? 'rotated' : ''}`} />
                    </button>
                    {openDrawerCategory === 'abroad_programs' && (
                      <div className="up-drawer-subacc-body">
                        <Link
                          href="/study-abroad"
                          className="up-drawer-subcat-link"
                          onClick={() => setMobileDrawerOpen(false)}
                        >
                          <span>Overseas Education &amp; Admissions</span>
                        </Link>
                        <Link
                          href="/demo"
                          className="up-drawer-subcat-link"
                          onClick={() => setMobileDrawerOpen(false)}
                        >
                          <span>Book Free Abroad Counseling</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <Link href="/study-abroad" className="up-drawer-acc-explore" onClick={() => setMobileDrawerOpen(false)}>
                  <span>Explore Study Abroad</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>

          {/* 4. OFFLINE CENTERS ACCORDION */}
          <div className="up-drawer-acc-group">
            <button
              type="button"
              className={`up-drawer-acc-trigger ${openDrawerSection === 'center' ? 'active' : ''}`}
              onClick={() => toggleDrawerSection('center')}
            >
              <span>Offline Centers</span>
              <ChevronDown size={16} className={`up-drawer-acc-icon ${openDrawerSection === 'center' ? 'rotated' : ''}`} />
            </button>
            {openDrawerSection === 'center' && (
              <div className="up-drawer-acc-body">
                <div className="up-drawer-nested-cats">
                  {offlineCenterCategories.map((group) => {
                    const isCatOpen = openDrawerCategory === `center_${group.category}`;
                    return (
                      <div key={group.category} className="up-drawer-subacc-item">
                        <button
                          type="button"
                          className={`up-drawer-subacc-trigger ${isCatOpen ? 'active' : ''}`}
                          onClick={() => toggleDrawerCategory(`center_${group.category}`)}
                        >
                          <span>{group.category}</span>
                          <ChevronDown size={14} className={`up-drawer-subacc-icon ${isCatOpen ? 'rotated' : ''}`} />
                        </button>
                        {isCatOpen && (
                          <div className="up-drawer-subacc-body">
                            {group.courses.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                className="up-drawer-subcat-link"
                                onClick={() => setMobileDrawerOpen(false)}
                              >
                                <span>{item.title}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <Link href="/offline-center" className="up-drawer-acc-explore" onClick={() => setMobileDrawerOpen(false)}>
                  <span>Explore All Centers</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>

          {/* 5. MORE ACCORDION */}
          <div className="up-drawer-acc-group">
            <button
              type="button"
              className={`up-drawer-acc-trigger ${openDrawerSection === 'more' ? 'active' : ''}`}
              onClick={() => toggleDrawerSection('more')}
            >
              <span>More</span>
              <ChevronDown size={16} className={`up-drawer-acc-icon ${openDrawerSection === 'more' ? 'rotated' : ''}`} />
            </button>
            {openDrawerSection === 'more' && (
              <div className="up-drawer-acc-body">
                <div className="up-drawer-nested-cats">
                  <div className="up-drawer-subacc-item">
                    <button
                      type="button"
                      className={`up-drawer-subacc-trigger ${openDrawerCategory === 'more_links' ? 'active' : ''}`}
                      onClick={() => toggleDrawerCategory('more_links')}
                    >
                      <span>Company &amp; Support</span>
                      <ChevronDown size={14} className={`up-drawer-subacc-icon ${openDrawerCategory === 'more_links' ? 'rotated' : ''}`} />
                    </button>
                    {openDrawerCategory === 'more_links' && (
                      <div className="up-drawer-subacc-body">
                        <Link href="/about" className="up-drawer-subcat-link" onClick={() => setMobileDrawerOpen(false)}>
                          <span>About ONEVRIKSH</span>
                        </Link>
                        <Link href="/contact" className="up-drawer-subcat-link" onClick={() => setMobileDrawerOpen(false)}>
                          <span>Contact Us &amp; Centers</span>
                        </Link>
                        <Link href="/demo" className="up-drawer-subcat-link" onClick={() => setMobileDrawerOpen(false)}>
                          <span>Book Free 1-on-1 Demo</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <Link href="/about" className="up-drawer-acc-explore" onClick={() => setMobileDrawerOpen(false)}>
                  <span>Explore About Us</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>

          <div className="up-drawer-divider" />

          {/* 6. LANGUAGE SELECTOR */}
          <div className="up-drawer-section">
            <div className="up-drawer-section-title">Language</div>
            <div className="up-drawer-chips-grid">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  className={`up-drawer-chip ${selectedLang.code === l.code ? 'active' : ''}`}
                  onClick={() => setLanguage(l)}
                >
                  <strong>{l.native}</strong>
                  {selectedLang.code === l.code && <Check size={12} className="up-check-active" />}
                </button>
              ))}
            </div>
          </div>

          <div className="up-drawer-divider" />

          {/* 7. REGION & CURRENCY SELECTOR */}
          <div className="up-drawer-section">
            <div className="up-drawer-section-title">Region &amp; Currency</div>
            <div className="up-drawer-chips-grid">
              {countries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className={`up-drawer-chip ${selectedCountry.code === c.code ? 'active' : ''}`}
                  onClick={() => setCountry(c)}
                >
                  <strong>{c.name}</strong>
                  {selectedCountry.code === c.code && <Check size={12} className="up-check-active" />}
                </button>
              ))}
            </div>
          </div>
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
