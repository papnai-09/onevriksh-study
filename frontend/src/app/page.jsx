'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, CirclePlay, Check, Search } from 'lucide-react';
import { CourseCard } from '@/components/CourseCard';
import { SectionHeading } from '@/components/SectionHeading';
import { courses, stats } from '@/data/site';

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
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=85"
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
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=85"
                alt="ONEVRIKSH students collaborating"
                fill
                sizes="50vw"
              />
            </div>
            <div className="experience-card">
              <strong>8+</strong>
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

      {/* 3. POPULAR COURSES SECTION */}
      <section className="section courses-section">
        <div className="container">
          <div className="section-row">
            <SectionHeading
              eyebrow="Career-focused programs"
              title="Popular courses"
              text="Choose a practical program designed around the skills employers and global opportunities demand."
            />
            <Link className="button button-ghost desktop-only" href="/courses">
              View all courses <ArrowRight size={17} />
            </Link>
          </div>
          <div className="course-grid">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
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

      {/* 5. OUTCOMES SECTION */}
      <section className="section outcomes-section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Built around your outcome"
            title="More than classroom learning"
            text="Every part of the experience is designed to turn understanding into capability."
          />
          <div className="feature-grid">
            <article className="feature-item">
              <span className="feature-number">01</span>
              <h3>Learn by doing</h3>
              <p>Practice on live briefs, assignments and projects that become proof of your skills.</p>
            </article>
            <article className="feature-item">
              <span className="feature-number">02</span>
              <h3>Mentors who know you</h3>
              <p>Small batches create room for questions, feedback and individual attention.</p>
            </article>
            <article className="feature-item">
              <span className="feature-number">03</span>
              <h3>Become career ready</h3>
              <p>Get portfolio reviews, interview practice and placement guidance that stays practical.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
