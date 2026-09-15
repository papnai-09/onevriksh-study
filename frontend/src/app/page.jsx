'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, CirclePlay, Check, Search } from 'lucide-react';
import { ExpandableCourseCarousel } from '@/components/ExpandableCourseCarousel';
import { ExpandableFeatureCarousel } from '@/components/ExpandableFeatureCarousel';
import { ExpandableTestimonialCarousel } from '@/components/ExpandableTestimonialCarousel';
import { SectionHeading } from '@/components/SectionHeading';
import { courses, stats, testimonials } from '@/data/site';

const outcomesData = [
  {
    step: '01',
    tag: 'Live Capstone Projects',
    title: 'Simulation-First Practical Pedagogy',
    desc: 'Execute real-world briefs, manage live Google Ads budgets, conduct technical enterprise SEO audits, and defend professional design portfolios verified by industry hiring managers.',
    bullets: ['Live ad budget simulations', 'Technical enterprise SEO audits', 'Industry capstone defense']
  },
  {
    step: '02',
    tag: 'Small Cohorts (Max 15–20)',
    title: 'Direct Master Practitioner Mentorship',
    desc: 'Learn in focused, small cohorts where certified industry directors provide line-by-line project critiques, personal doubt resolution, and tailored skill roadmaps.',
    bullets: ['Strict 15–20 student batch cap', 'Daily interactive Q&A labs', '1-on-1 personalized project feedback']
  },
  {
    step: '03',
    tag: 'Career Acceleration Cell',
    title: 'End-to-End Placement & Interview Mastery',
    desc: 'Accelerate your career through executive resume teardowns, Behance/LinkedIn curation, technical mock interviews, and direct referrals to hiring partner networks.',
    bullets: ['Executive resume & portfolio polish', 'Rigorous 1-on-1 mock interviews', 'Direct corporate hiring referrals']
  },
  {
    step: '04',
    tag: 'Global Standards Aligned',
    title: 'Recognized & Verifiable Credentials',
    desc: 'Graduate with verifiable course completion credentials aligned with European CEFR linguistic frameworks, Google, and Meta corporate standards.',
    bullets: ['Instant Certificate ID verification', 'CEFR European benchmark aligned', 'Lifetime credential authenticity']
  }
];

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      router.push('/courses');
      return;
    }
    const matched = courses.find((c) =>
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q)
    );
    if (matched) {
      router.push('/' + matched.slug);
    } else {
      router.push('/courses?search=' + encodeURIComponent(q));
    }
  };

  return (
    <>
      {/* 1. HERO SECTION WITH BACKGROUND IMAGE & EMBEDDED SEARCH BAR */}
      <section className="hero">
        <div className="hero-media">
          <Image
            src="/img1.jpg"
            alt="Students collaborating at ONEVRIKSH Study Connaught Place"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-kicker">Premier Offline Coaching Hub • Connaught Place</span>
            <h1>
              Launch Your Dream Career with <em>Confidence & Practical Mastery.</em>
            </h1>
            <p>
              New Delhi’s offline-first institute for Performance Marketing, Brand Visual Design, Leadership Communication, and European Language Gateways (DELF, Goethe, DELE, CILS).
            </p>

            {/* HERO SEARCH BAR */}
            <div className="hero-search-container">
              <form onSubmit={handleSearchSubmit} className="hero-search-pill-form">
                <Search size={20} className="hero-search-pill-icon" />
                <input
                  type="text"
                  placeholder="Search digital marketing, graphic design, German, French..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="hero-search-pill-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="hero-search-clear-btn"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
                <button
                  type="submit"
                  className="hero-search-pill-btn"
                  aria-label="Search courses"
                  title="Search"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>

            {/* HERO ACTION BUTTONS */}
            <div className="hero-actions">
              <Link href="/demo" className="button button-primary button-large hero-btn-red">
                Reserve Free Demo Seat <ArrowRight size={18} />
              </Link>
              <Link href="/courses" className="button button-light button-large">
                <CirclePlay size={19} /> Explore All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT ONEVRIKSH INTRO SECTION */}
      <section className="section intro-section">
        <div className="container intro-grid">
          <div className="intro-images">
            <div className="image-main">
              <Image
                src="/img2.jpg"
                alt="ONEVRIKSH students collaborating in studio"
                fill
                sizes="50vw"
              />
            </div>
            <div className="experience-card">
              <strong>2+</strong>
              <span>Years of training excellence</span>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Academic Excellence & Pedagogy"
              title="Empowering Ambitious Minds with Real-World Industry Mastery."
              text="At ONEVRIKSH Study, we bridge the divide between theoretical education and real-world executive capability. Located at New Delhi’s premier Connaught Place business hub, our offline-first studio combines master practitioner mentoring, live capstone simulations, and high-impact career placement pathways."
            />
            <div className="check-list">
              <span><Check /> Live, practitioner-led interactive classes</span>
              <span><Check /> Real-budget campaigns & portfolio capstones</span>
              <span><Check /> 1-on-1 personalized feedback in small cohorts</span>
              <span><Check /> Verifiable certifications & placement support</span>
            </div>
            <Link href="/about" className="text-link">
              Discover our story & methodology <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. POPULAR COURSES EXPANDABLE CAROUSEL */}
      <section className="section courses-section">
        <div className="container">
          <ExpandableCourseCarousel
            courses={courses}
            eyebrow="Executive Career Tracks"
            title="Flagship Professional Programs"
            text="Hover over any program to explore full curriculum modules, real-world capstone briefs, duration, and tuition details."
            viewAllHref="/courses"
          />
        </div>
      </section>

      {/* 4. STATS BAND */}
      <section className="stats-band">
        <div className="container stats-grid">
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. OUTCOMES EXPANDABLE CAROUSEL */}
      <section className="section outcomes-section">
        <div className="container">
          <ExpandableFeatureCarousel
            items={outcomesData}
            eyebrow="The ONEVRIKSH Advantage"
            title="Engineered for Tangible Career Outcomes"
            text="Hover over each pillar to explore how our immersive studio model turns foundational concepts into verified executive capability."
          />
        </div>
      </section>

      {/* 6. STUDENT TESTIMONIALS EXPANDABLE CAROUSEL */}
      <section className="section" style={{ background: 'var(--surface-2)' }}>
        <div className="container">
          <ExpandableTestimonialCarousel
            testimonials={testimonials}
            eyebrow="Alumni Impact & Social Proof"
            title="What Our Certified Graduates Say"
            text="Explore verified reviews and placement outcomes from alumni who accelerated their careers at our Connaught Place studio."
          />
        </div>
      </section>
    </>
  );
}
