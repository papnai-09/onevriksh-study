'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, Search, MapPin, Briefcase, Users, FileText, Award } from 'lucide-react';
import { ExpandableCourseCarousel } from '@/components/ExpandableCourseCarousel';
import { SectionHeading } from '@/components/SectionHeading';
import { courses } from '@/data/site';

const whyChooseData = [
  {
    step: '01',
    title: 'Live Capstone Projects',
    desc: 'Work on practical briefs, assignments and projects related to your course.'
  },
  {
    step: '02',
    title: 'Small Cohorts',
    desc: 'Learn in small groups with more opportunities to ask questions and receive feedback.'
  },
  {
    step: '03',
    title: 'Career Support',
    desc: 'Get support with practical career preparation and interviews.'
  },
  {
    step: '04',
    title: 'Certifications',
    desc: 'Complete your course and receive the relevant course certification.'
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
      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="hero-media">
          <Image
            src="/img1.jpg"
            alt="ONEVRIKSH Study classroom in Connaught Place"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-kicker">OFFLINE COACHING • CONNAUGHT PLACE, NEW DELHI</span>
            <h1>
              Learn Skills. Build Your Future.
            </h1>
            <p className="hero-subhead">
              Offline courses in Digital Marketing, Graphic Design, German, French, Spanish, Italian and English.
            </p>
            <p className="hero-supporting">
              Learn through classroom training, practical assignments and personal guidance.
            </p>

            {/* HERO SEARCH BAR */}
            <div className="hero-search-container">
              <form onSubmit={handleSearchSubmit} className="hero-search-pill-form">
                <Search size={20} className="hero-search-pill-icon" />
                <input
                  type="text"
                  placeholder="Search courses or languages..."
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
                Book a Free Demo <ArrowRight size={18} />
              </Link>
              <Link href="/courses" className="button button-light button-large">
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="section intro-section">
        <div className="container intro-grid">
          <div className="intro-images">
            <div className="image-main">
              <Image
                src="/img2.jpg"
                alt="Classroom learning at ONEVRIKSH Study"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="ABOUT ONEVRIKSH STUDY"
              title="Practical Learning in the Classroom"
              text="ONEVRIKSH Study is an offline coaching institute in Connaught Place, New Delhi. We offer courses in Digital Marketing, Graphic Design, European Languages and English Communication."
            />
            <p style={{ color: 'var(--muted)', marginTop: '-12px', marginBottom: '20px', fontSize: '0.95rem' }}>
              Our courses are designed to provide classroom learning, practical work and personal guidance.
            </p>
            <div className="check-list">
              <span><Check /> Live trainer-led classes</span>
              <span><Check /> Practical assignments and projects</span>
              <span><Check /> Small batch learning</span>
              <span><Check /> Personal feedback</span>
              <span><Check /> Career support</span>
            </div>
            <Link href="/about" className="button button-ghost" style={{ marginTop: '16px' }}>
              About ONEVRIKSH <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. COURSES SECTION */}
      <section className="section courses-section">
        <div className="container">
          <ExpandableCourseCarousel
            courses={courses}
            eyebrow="OUR COURSES"
            title="Courses We Offer"
            text="Choose a course based on the skill you want to learn or the goal you want to work towards."
            viewAllHref="/courses"
          />
        </div>
      </section>

      {/* 4. WHY ONEVRIKSH SECTION */}
      <section className="section why-section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="WHY ONEVRIKSH"
            title="A Practical Way to Learn"
            text="Our focus is on classroom training, practical assignments and personal guidance."
          />
          <div className="why-grid">
            {whyChooseData.map((item) => (
              <div key={item.step} className="why-card">
                <span className="why-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow light">GET STARTED</span>
            <h2>Ready to Start Learning?</h2>
            <p>Book a free demo class and explore the course that suits you.</p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#CBD5E1', marginTop: '10px' }}>
              <MapPin size={15} /> Connaught Place, New Delhi
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/demo" className="button button-primary button-large hero-btn-red">
              Book Free Demo <ArrowRight size={16} />
            </Link>
            <Link href="/courses" className="button button-light button-large">
              View All Courses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
