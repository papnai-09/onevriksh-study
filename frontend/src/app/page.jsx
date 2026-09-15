'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, Search, MapPin } from 'lucide-react';
import { ExpandableCourseCarousel } from '@/components/ExpandableCourseCarousel';
import { ExpandableFeatureCarousel } from '@/components/ExpandableFeatureCarousel';
import { ExpandableTestimonialCarousel } from '@/components/ExpandableTestimonialCarousel';
import { SectionHeading } from '@/components/SectionHeading';
import { courses, stats, testimonials } from '@/data/site';

const whyChooseData = [
  {
    step: '01',
    tag: 'Hands-on practice',
    title: 'Practical Learning',
    desc: 'Learn concepts in class and apply them through assignments and projects.'
  },
  {
    step: '02',
    tag: 'Individual attention',
    title: 'Small Batches',
    desc: 'Learn in smaller groups so trainers can give students individual attention.'
  },
  {
    step: '03',
    tag: 'Mentor feedback',
    title: 'Personal Guidance',
    desc: 'Get feedback and guidance throughout your course.'
  },
  {
    step: '04',
    tag: 'Placement help',
    title: 'Career Support',
    desc: 'Get help with interview preparation, resume building and placement opportunities.'
  },
  {
    step: '05',
    tag: 'Connaught Place',
    title: 'Offline Classroom Learning',
    desc: 'Learn face-to-face at our Connaught Place centre with a focused classroom environment.'
  },
  {
    step: '06',
    tag: 'Certificate',
    title: 'Course Certification',
    desc: 'Receive a course certificate after completing the required training and assessments.'
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
            alt="Students at ONEVRIKSH Study Connaught Place"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-kicker">OFFLINE COACHING IN CONNAUGHT PLACE</span>
            <h1>
              Learn Skills. Build Your Career.
            </h1>
            <p>
              Practical offline courses in Digital Marketing, Graphic Design, German, French, Spanish, Italian and English. Learn from experienced trainers, work on practical projects and build skills that you can use in your career.
            </p>

            {/* HERO SEARCH BAR */}
            <div className="hero-search-container">
              <form onSubmit={handleSearchSubmit} className="hero-search-pill-form">
                <Search size={20} className="hero-search-pill-icon" />
                <input
                  type="text"
                  placeholder="Search courses..."
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
                View All Courses
              </Link>
            </div>

            <p style={{ marginTop: '16px', fontSize: '0.88rem', color: '#CBD5E1' }}>
              Learn in small batches with personal guidance, practical assignments and career support.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ABOUT / INTRO SECTION */}
      <section className="section intro-section">
        <div className="container intro-grid">
          <div className="intro-images">
            <div className="image-main">
              <Image
                src="/img2.jpg"
                alt="Students learning at ONEVRIKSH"
                fill
                sizes="50vw"
              />
            </div>
            <div className="experience-card">
              <strong>2+</strong>
              <span>Years of Teaching</span>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="ABOUT ONEVRIKSH"
              title="Learn From the Classroom. Practice in the Real World."
              text="ONEVRIKSH Study is an offline coaching institute in Connaught Place, New Delhi. We provide career-focused courses that combine classroom learning with practical work. Our goal is simple — help students understand the subject, practice their skills and become confident enough to use them in real work."
            />
            <div className="check-list">
              <span><Check /> Experienced trainers</span>
              <span><Check /> Practical classroom learning</span>
              <span><Check /> Small batch sizes</span>
              <span><Check /> Real projects and assignments</span>
              <span><Check /> Personal feedback</span>
              <span><Check /> Career and placement support</span>
            </div>
            <Link href="/about" className="text-link">
              Know More About Us <ArrowRight size={17} />
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
            title="Choose the Right Course for You"
            text="Explore our professional and language courses designed for students, working professionals and anyone looking to develop a new skill."
            viewAllHref="/courses"
          />
        </div>
      </section>

      {/* 4. STATS SECTION */}
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

      {/* 5. WHY CHOOSE US SECTION */}
      <section className="section outcomes-section">
        <div className="container">
          <ExpandableFeatureCarousel
            items={whyChooseData}
            eyebrow="WHY CHOOSE US"
            title="Why Choose ONEVRIKSH?"
            text="We focus on helping students learn properly, practice regularly and build confidence in their skills."
          />
        </div>
      </section>

      {/* 6. STUDENT REVIEWS SECTION */}
      <section className="section" style={{ background: 'var(--surface-2)' }}>
        <div className="container">
          <ExpandableTestimonialCarousel
            testimonials={testimonials}
            eyebrow="STUDENT REVIEWS"
            title="What Our Students Say"
            text="Hear from students who have learned with us and experienced our classroom training."
          />
        </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow light">START LEARNING</span>
            <h2>Ready to Start Learning?</h2>
            <p>Book a free demo class and see how our courses work before you decide.</p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#E2E8F0', marginTop: '8px' }}>
              <MapPin size={15} /> ONEVRIKSH Study, Connaught Place, New Delhi
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/demo" className="button button-light">
              <span>Book a Free Demo</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/courses"
              className="button button-ghost"
              style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}
            >
              <span>View All Courses</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

