'use client';

import { CTASection } from '@/components/CTASection';
import { ExpandableFeatureCarousel } from '@/components/ExpandableFeatureCarousel';

const examCards = [
  {
    country: 'France & Francophone',
    flag: '🇫🇷',
    tag: 'DELF / DALF (A1-B2)',
    title: 'French DELF Exam Track',
    shortDesc: 'Official French Ministry of Education certification.',
    desc: 'Official French Ministry of Education certification mandatory for Campus France university applications, Grandes Écoles admissions, and work visas.',
    bullets: ['A1-B2 CEFR curriculum', 'Speaking & listening labs', 'Campus France guidance'],
    linkHref: '/french-language',
    linkText: 'French Program'
  },
  {
    country: 'Germany & Austria',
    flag: '🇩🇪',
    tag: 'Goethe-Zertifikat (A1-B1)',
    title: 'German Goethe Exam Track',
    shortDesc: 'Globally recognized certification for German universities.',
    desc: 'Internationally recognized certification required for German public university admissions (APS certificate), student visas, and opportunity cards (Chancenkarte).',
    bullets: ['Goethe exam mock tests', 'Speaking clubs & pronunciation', 'APS certificate support'],
    linkHref: '/german-language',
    linkText: 'German Program'
  },
  {
    country: 'Spain & Latin America',
    flag: '🇪🇸',
    tag: 'DELE / SIELE',
    title: 'Spanish DELE Exam Track',
    shortDesc: 'Official diplomas granted by Instituto Cervantes.',
    desc: 'Official diplomas granted by Instituto Cervantes on behalf of the Spanish Ministry of Education for higher studies and international careers.',
    bullets: ['DELE exam simulations', 'Cultural immersion sessions', 'Conversational fluency'],
    linkHref: '/spanish-language',
    linkText: 'Spanish Program'
  },
  {
    country: 'Italy',
    flag: '🇮🇹',
    tag: 'CILS / CELI',
    title: 'Italian CILS Exam Track',
    shortDesc: 'Certificates recognized by Italian Ministry of Foreign Affairs.',
    desc: 'Certificates of Italian as a Foreign Language recognized by the Italian Ministry of Foreign Affairs for university enrolment and visa interviews.',
    bullets: ['CILS exam format prep', 'Audio-visual labs', 'Visa interview clinics'],
    linkHref: '/italian-language',
    linkText: 'Italian Program'
  }
];

const roadmapData = [
  {
    step: '01',
    tag: 'Diagnostic',
    title: 'Language Assessment & Goal Setting',
    desc: 'Evaluate your current CEFR proficiency baseline and determine your target exam date aligned with university intake deadlines.',
    bullets: ['CEFR level test', 'Intake timeline mapping', 'Custom study plan']
  },
  {
    step: '02',
    tag: 'Core Training',
    title: 'Small-Batch Classroom Training',
    desc: 'Master listening, reading, writing, and speaking modules with native-certified trainers in our Connaught Place classrooms.',
    bullets: ['Max 15-20 students', 'Audio-visual listening drills', 'Grammar in real context']
  },
  {
    step: '03',
    tag: 'Simulation',
    title: 'Timed Exam Mock Simulations',
    desc: 'Attempt simulated DELF / Goethe / DELE exam papers under timed exam conditions with line-by-line trainer feedback.',
    bullets: ['Timed practice tests', '1-on-1 examiner feedback', 'Score improvement strategy']
  },
  {
    step: '04',
    tag: 'Visa & Admission',
    title: 'Documentation & Visa Guidance',
    desc: 'Receive comprehensive assistance on submitting your language certificates for university dossiers, APS certificates, and embassy visa files.',
    bullets: ['SOP & language profile check', 'Embassy interview guidance', 'Certification authentication']
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

      {/* 1. EXAM TRACKS EXPANDABLE CAROUSEL */}
      <section className="section">
        <div className="container">
          <ExpandableFeatureCarousel
            items={examCards}
            eyebrow="Targeted Exam Tracks"
            title="International Language Gateways & Certifications"
            text="Hover over any country card to explore official exam requirements, syllabus modules, and prep tracks."
          />
        </div>
      </section>

      {/* 2. 4-STEP ROADMAP EXPANDABLE CAROUSEL */}
      <section className="section" style={{ background: 'var(--surface-2)' }}>
        <div className="container">
          <ExpandableFeatureCarousel
            items={roadmapData}
            eyebrow="Our Support Process"
            title="Your Path from Classroom to Campus"
            text="Hover over each milestone to see our structured methodology for passing certification exams and securing overseas visas."
          />
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

