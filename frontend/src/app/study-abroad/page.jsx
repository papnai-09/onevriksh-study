import Link from 'next/link';
import { CTASection } from '@/components/CTASection';
import { Globe, Plane, GraduationCap, FileCheck, Languages, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Study Abroad & Language Exam Prep | Onevriksh Study',
  description:
    'Expert preparation for DELF (France), Goethe-Zertifikat (Germany), DELE (Spain), and CILS (Italy) language requirements and international student visa counselling.'
};

const examCards = [
  {
    country: 'France & Francophone Countries',
    exam: 'DELF / DALF (A1, A2, B1, B2)',
    flag: '🇫🇷',
    desc: 'Official French Ministry of Education certification required for campus France admissions, university courses, and work visas.',
    prepCourse: 'French Language Program',
    slug: 'french-language'
  },
  {
    country: 'Germany, Austria & Switzerland',
    exam: 'Goethe-Zertifikat (A1, A2, B1)',
    flag: '🇩🇪',
    desc: 'Internationally recognized certification for German university applications (APS certificate) and job-seeker visas.',
    prepCourse: 'German Language Program',
    slug: 'german-language'
  },
  {
    country: 'Spain & Latin America',
    exam: 'DELE / SIELE',
    flag: '🇪🇸',
    desc: 'Official diplomas granted by the Instituto Cervantes on behalf of the Spanish Ministry of Education.',
    prepCourse: 'Spanish Language Program',
    slug: 'spanish-language'
  },
  {
    country: 'Italy',
    exam: 'CILS / CELI',
    flag: '🇮🇹',
    desc: 'Certificates of Italian as a Foreign Language recognized by the Italian Ministry of Foreign Affairs for university enrolment.',
    prepCourse: 'Italian Language Program',
    slug: 'italian-language'
  }
];

export default function StudyAbroadPage() {
  return (
    <>
      <section className="simple-hero">
        <div className="container">
          <span className="eyebrow">International Language Gateways</span>
          <h1>Global Education & Language Exam Preparation</h1>
          <p>
            Prepare for mandatory European language proficiency tests (DELF, Goethe, DELE, CILS) with certified trainers at our Connaught Place centre.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Targeted Exam Tracks</span>
            <h2>International Language Certifications</h2>
            <p>We train students specifically according to the Common European Framework of Reference for Languages (CEFR).</p>
          </div>

          <div className="course-grid">
            {examCards.map((item) => (
              <div key={item.exam} className="course-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '2rem' }}>{item.flag}</span>
                    <span className="course-level" style={{ position: 'static' }}>{item.country}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{item.exam}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                    {item.desc}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <small style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>Course: <strong>{item.prepCourse}</strong></small>
                  <Link href={`/${item.slug}`} className="arrow-button icon-button" title="View Syllabus">
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Abroad Roadmap */}
      <section className="section" style={{ background: 'var(--surface-2)' }}>
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Our Support Process</span>
            <h2>Your Path from Classroom to Campus</h2>
            <p>Structured methodology to help you clear certification milestones on time.</p>
          </div>

          <div className="value-grid">
            {[
              { step: '01', title: 'Language Assessment', desc: 'Evaluate your current CEFR level and set target certification date.' },
              { step: '02', title: 'Small-Batch Training', desc: 'Master speaking, listening, reading, and writing modules with exam mocks.' },
              { step: '03', title: 'Exam Mock Simulations', desc: 'Attempt timed DELF/Goethe mock exams with individual trainer correction.' },
              { step: '04', title: 'Documentation Guidance', desc: 'Guidance on language certificate submission for university & visa files.' }
            ].map((s) => (
              <article key={s.step}>
                <strong style={{ fontSize: '1.5rem', color: 'var(--blue)', fontFamily: 'var(--font-display)', display: 'block', marginBottom: '10px' }}>
                  {s.step}
                </strong>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need Advice on Language Exams or University Requirements?"
        subtitle="Book a free consultation session with our international language counsellor at Connaught Place."
        primaryCtaLabel="Book Free Demo & Counselling"
        primaryCtaHref="/demo"
      />
    </>
  );
}
