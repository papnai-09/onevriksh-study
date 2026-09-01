import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, BriefcaseBusiness, Check, CirclePlay, UsersRound } from 'lucide-react';
import { CourseCard } from '@/components/CourseCard';
import { SectionHeading } from '@/components/SectionHeading';
import { courses, stats } from '@/data/site';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <Image src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=85" alt="Students learning together at Onevriksh Study" fill priority sizes="100vw" />
        </div>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <h1>Launch Your Dream Career with <em>Confidence.</em></h1>
            <p>Learn the skills companies actually hire for through immersive training, live projects, mock interviews, and career guidance.</p>
            <div className="hero-actions">
              <Link href="/demo" className="button button-primary button-large">Reserve Your Seat <ArrowRight size={18} /></Link>
              <Link href="/courses" className="button button-light button-large"><CirclePlay size={19} /> Explore Learning</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="container intro-grid">
          <div className="intro-images">
            <div className="image-main"><Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=85" alt="Onevriksh students collaborating" fill sizes="50vw" /></div>
            <div className="experience-card"><strong>8+</strong><span>Years of training excellence</span></div>
          </div>
          <div>
            <SectionHeading eyebrow="About Onevriksh" title="Learning feels different when it connects to real life." text="We are an offline-first coaching institute in the heart of New Delhi, built for students who want practical skills, close mentoring and a clear path to opportunity." />
            <div className="check-list">
              <span><Check /> Live, trainer-led classes</span>
              <span><Check /> Hands-on assignments and projects</span>
              <span><Check /> Personal feedback in small batches</span>
              <span><Check /> Career and certification guidance</span>
            </div>
            <Link href="/about" className="text-link">Discover our story <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="section courses-section">
        <div className="container">
          <div className="section-row">
            <SectionHeading eyebrow="Career-focused programs" title="Popular courses" text="Choose a practical program designed around the skills employers and global opportunities demand." />
            <Link className="button button-ghost desktop-only" href="/courses">View all courses <ArrowRight size={17} /></Link>
          </div>
          <div className="course-grid">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

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

      <section className="section outcomes-section">
        <div className="container">
          <SectionHeading align="center" eyebrow="Built around your outcome" title="More than classroom learning" text="Every part of the experience is designed to turn understanding into capability." />
          <div className="feature-grid">
            {[
              [BookOpenCheck, 'Learn by doing', 'Practice on live briefs, assignments and projects that become proof of your skills.'],
              [UsersRound, 'Mentors who know you', 'Small batches create room for questions, feedback and individual attention.'],
              [BriefcaseBusiness, 'Become career ready', 'Get portfolio reviews, interview practice and placement guidance that stays practical.']
            ].map(([Icon, title, text], index) => (
              <article className="feature-item" key={title}>
                <span className="feature-number">0{index + 1}</span>
                <div className="feature-icon"><Icon /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
