'use client';

import { CTASection } from '@/components/CTASection';
import { ExpandableFeatureCarousel } from '@/components/ExpandableFeatureCarousel';

const examCards = [
  {
    country: 'France',
    flag: '🇫🇷',
    tag: 'DELF A1–B2',
    title: 'French Language & DELF Preparation',
    shortDesc: 'Classroom lessons and DELF exam practice.',
    desc: 'Learn French from basics to intermediate level with structured classroom lessons and preparation for DELF A1–B2 examinations.',
    linkHref: '/french-language',
    linkText: 'View French Course'
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    tag: 'Goethe A1–B1',
    title: 'German Language & Goethe Exam Preparation',
    shortDesc: 'Classroom lessons and Goethe exam practice.',
    desc: 'Learn German with structured grammar, speaking practice and preparation for Goethe-Zertifikat examinations.',
    linkHref: '/german-language',
    linkText: 'View German Course'
  },
  {
    country: 'Spain',
    flag: '🇪🇸',
    tag: 'DELE / SIELE',
    title: 'Spanish Language & DELE / SIELE Preparation',
    shortDesc: 'Classroom lessons and DELE exam practice.',
    desc: 'Learn Spanish through conversational practice, grammar foundations and preparation for DELE and SIELE exams.',
    linkHref: '/spanish-language',
    linkText: 'View Spanish Course'
  },
  {
    country: 'Italy',
    flag: '🇮🇹',
    tag: 'CILS Exam',
    title: 'Italian Language & CILS Preparation',
    shortDesc: 'Classroom lessons and CILS exam practice.',
    desc: 'Learn Italian language skills with classroom lessons, conversation drills and preparation for CILS examinations.',
    linkHref: '/italian-language',
    linkText: 'View Italian Course'
  }
];

const roadmapData = [
  {
    step: '01',
    tag: 'Level check',
    title: 'Level Assessment & Goal Setting',
    desc: 'Assess your current language level and plan your course timeline according to your study or career goals.'
  },
  {
    step: '02',
    tag: 'Classroom',
    title: 'Small-Batch Classroom Training',
    desc: 'Learn grammar, vocabulary, pronunciation, listening and speaking with experienced trainers in Connaught Place.'
  },
  {
    step: '03',
    tag: 'Mock tests',
    title: 'Exam Practice & Mock Tests',
    desc: 'Practice with previous exam patterns, sample questions and get personal feedback to improve your score.'
  },
  {
    step: '04',
    tag: 'Next steps',
    title: 'Certification & Guidance',
    desc: 'Receive guidance on registering for official examinations and preparing your language certificates.'
  }
];

export default function StudyAbroadPage() {
  return (
    <>
      <section className="simple-hero">
        <div className="container">
          <span className="eyebrow">LANGUAGE COURSES</span>
          <h1>Learn a New Language</h1>
          <p>
            Learn European languages with structured classroom training and preparation for internationally recognized language examinations.
          </p>
        </div>
      </section>

      {/* 1. EXAM TRACKS EXPANDABLE CAROUSEL */}
      <section className="section">
        <div className="container">
          <ExpandableFeatureCarousel
            items={examCards}
            eyebrow="LANGUAGE PROGRAMS"
            title="Available Language Courses"
            text="Explore our language courses designed with classroom practice, listening drills and exam preparation."
          />
        </div>
      </section>

      {/* 2. 4-STEP ROADMAP EXPANDABLE CAROUSEL */}
      <section className="section" style={{ background: 'var(--surface-2)' }}>
        <div className="container">
          <ExpandableFeatureCarousel
            items={roadmapData}
            eyebrow="LEARNING PATHWAY"
            title="How We Help You Learn"
            text="A step-by-step approach to help you build language confidence from your first day."
          />
        </div>
      </section>

      <CTASection
        title="Want to Learn a Language?"
        subtitle="Book a free demo class at our Connaught Place centre to see how our classes work."
        primaryCtaLabel="Book a Free Demo"
        primaryCtaHref="/demo"
        secondaryCtaLabel="View All Courses"
        secondaryCtaHref="/courses"
      />
    </>
  );
}


