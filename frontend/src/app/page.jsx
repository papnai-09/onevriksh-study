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
    tag: 'Hands-on practice',
    title: 'Learn by Doing on Live Briefs',
    desc: 'Work on live briefs, Google Ads campaigns, SEO audits, and creative design suites that become concrete proof in your job portfolio.',
    bullets: ['Live ad budget simulations', 'Real-world SEO & technical site audits', 'Industry project defense']
  },
  {
    step: '02',
    tag: 'Personal guidance',
    title: 'Mentors Who Know Your Strengths',
    desc: 'Small batch sizes (15–20 learners) ensure dedicated 1-on-1 feedback, doubt resolution, and tailored instruction at every milestone.',
    bullets: ['Max 20 students per batch', 'Daily interactive Q&A labs', 'Personalized assignment reviews']
  },
  {
    step: '03',
    tag: 'Career readiness',
    title: 'Placement Support & Mock Interviews',
    desc: 'Get end-to-end career guidance with resume teardowns, portfolio building, and technical mock interviews conducted by industry leaders.',
    bullets: ['Resume & LinkedIn optimization', '1-on-1 mock interviews', 'Direct hiring partner network']
  },
  {
    step: '04',
    tag: 'Global recognition',
    title: 'Recognized Certifications',
    desc: 'Earn verifiable course completion credentials and prepare for international benchmarks like DELF, Goethe-Zertifikat, and Google Certifications.',
    bullets: ['Verifiable certificate ID', 'CEFR European framework aligned', 'Lifetime credential verification']
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
            alt="Students learning together at ONEVRIKSH Study"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <h1>
              Launch Your Dream Career with <em>Confidence.</em>
            </h1>

            {/* HERO SEARCH BAR */}
            <div className="hero-search-container">
              <form onSubmit={handleSearchSubmit} className="hero-search-pill-form">
                <Search size={20} className="hero-search-pill-icon" />
                <input
                  type="text"
                  placeholder="Search courses"
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
                Reserve Your Seat <ArrowRight size={18} />
              </Link>
              <Link href="/courses" className="button button-light button-large">
                <CirclePlay size={19} /> Explore Learning
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
                alt="ONEVRIKSH students collaborating"
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
              eyebrow="About ONEVRIKSH"
              title="Learning feels different when it connects to real life."
              text="We are an offline-first coaching institute in the heart of New Delhi, built for students who want practical skills, close mentoring and a clear path to opportunity."
            />
            <div className="check-list">
              <span><Check /> Live, trainer-led classes</span>
              <span><Check /> Hands-on assignments and projects</span>
              <span><Check /> Personal feedback in small batches</span>
              <span><Check /> Career and certification guidance</span>
            </div>
            <Link href="/about" className="text-link">
              Discover our story <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. POPULAR COURSES EXPANDABLE CAROUSEL */}
      <section className="section courses-section">
        <div className="container">
          <ExpandableCourseCarousel
            courses={courses}
            eyebrow="Career-focused programs"
            title="Popular Programs & Specializations"
            text="Hover over any program to reveal full curriculum highlights, duration, fees, and syllabus details."
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
            eyebrow="Built around your outcome"
            title="More Than Classroom Learning"
            text="Hover over each pillar to explore how our teaching model turns understanding into verified industry capability."
          />
        </div>
      </section>

      {/* 6. STUDENT TESTIMONIALS EXPANDABLE CAROUSEL */}
      <section className="section" style={{ background: 'var(--surface-2)' }}>
        <div className="container">
          <ExpandableTestimonialCarousel
            testimonials={testimonials}
            eyebrow="Success Stories"
            title="What Our Students Say"
            text="Explore verified reviews from learners who trained at our Connaught Place classroom studio."
          />
        </div>
      </section>
    </>
  );
}
