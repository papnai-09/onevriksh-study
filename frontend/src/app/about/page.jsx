import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Eye, Target } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { ExpandableTrainerCarousel } from '@/components/ExpandableTrainerCarousel';
import { ExpandableFeatureCarousel } from '@/components/ExpandableFeatureCarousel';

export const metadata = { title: 'About Us | ONEVRIKSH Study' };

const trainersData = [
  {
    name: 'Rohit Sharma',
    role: 'Digital Marketing & Performance Lead',
    experience: '9+ Years Industry Experience',
    bio: 'Chief Marketing Consultant having managed ₹5Cr+ in ad spends across Google Ads, Meta, and high-converting performance funnels.',
    expertise: ['Google Ads', 'GA4 Analytics', 'Technical SEO', 'Lead Funnels']
  },
  {
    name: 'Meera Kapoor',
    role: 'Brand & Visual Design Director',
    experience: '7+ Years Studio Experience',
    bio: 'Lead visual designer specializing in brand identity systems, typography, UI principles, and Adobe Creative Suite studio practice.',
    expertise: ['Photoshop', 'Illustrator', 'Brand Identity', 'UI/UX Basics']
  },
  {
    name: 'Ananya Verma',
    role: 'DELF Certified French Educator',
    experience: '6+ Years Language Training',
    bio: 'Certified French linguist specializing in CEFR A1-B2 exam readiness, DELF test strategies, and immersive speaking clinics.',
    expertise: ['DELF A1-B2', 'Campus France Prep', 'Spoken French', 'Grammar Labs']
  },
  {
    name: 'Nikhil Arora',
    role: 'Goethe Certified German Trainer',
    experience: '8+ Years German Faculty',
    bio: 'Goethe-Institut certified faculty guiding students through Goethe-Zertifikat exams, APS requirements, and German university SOPs.',
    expertise: ['Goethe A1-B1', 'German Grammar', 'Speaking Clubs', 'Study Abroad SOPs']
  },
  {
    name: 'Elena Rossi',
    role: 'CILS Certified Italian Trainer',
    experience: '5+ Years Italian Coaching',
    bio: 'Specialist in Italian language pedagogy, CILS exam modules, and visa interview preparation for students heading to Italy.',
    expertise: ['CILS Certification', 'Conversational Italian', 'Italian Culture', 'Visa Labs']
  },
  {
    name: 'Priya Malhotra',
    role: 'Soft Skills & Corporate Communication Coach',
    experience: '10+ Years Leadership Coach',
    bio: 'Corporate communications trainer helping students conquer stage fear, master public speaking, and excel in campus placement rounds.',
    expertise: ['Public Speaking', 'GD Mastery', 'Interview Coaching', 'Voice Modulation']
  }
];

const valuesData = [
  {
    step: '01',
    tag: 'Hands-on pedagogy',
    title: 'Practical First',
    desc: 'Students learn through actual application, live campaign execution, and portfolio creation, never through passive memorisation.',
    bullets: ['Live briefs over slides', 'Direct feedback loops', 'Real results as portfolio proof']
  },
  {
    step: '02',
    tag: 'Student-centric',
    title: 'Care Deeply',
    desc: 'Individual progress and confidence matter infinitely more than batch completion speeds. We stay by your side until concepts are crystal clear.',
    bullets: ['1-on-1 mentoring slots', 'Patient doubt resolution', 'Personalized career roadmap']
  },
  {
    step: '03',
    tag: 'Academic excellence',
    title: 'Raise the Bar',
    desc: 'Our teaching, curriculum, and placement outcomes must continuously earn the trust of ambitious learners and global recruiters.',
    bullets: ['Updated 2026 industry frameworks', 'Rigorous capstone reviews', 'Employer-aligned rubrics']
  },
  {
    step: '04',
    tag: 'Community',
    title: 'Grow Together',
    desc: 'A thriving learning community in our Connaught Place studio creates lifelong professional networks and peer learning.',
    bullets: ['Alumni network access', 'Study groups and speaking clubs', 'Collaborative project sprints']
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <span className="eyebrow">Our institute</span>
            <h1>
              We help ambition become <em>ability.</em>
            </h1>
            <p>ONEVRIKSH Study brings practical education, close mentoring and career direction together under one roof in Connaught Place.</p>
          </div>
          <div className="page-hero-image">
            <Image src="/img2.jpg" alt="Students at ONEVRIKSH Study" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container story-grid">
          <div className="story-image">
            <Image src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85" alt="Mentor working with students" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div>
            <SectionHeading eyebrow="Our story" title="A coaching institute built for the gap between theory and work." />
            <p className="lead">ONEVRIKSH began with a simple observation: students did not need more passive lectures. They needed practice, patient mentors and a place where questions were welcome.</p>
            <p>From our Connaught Place centre, we now train learners across digital skills, design, communication and international languages. Our classrooms stay small, our curriculum stays current, and our focus stays personal.</p>
            <Link href="/demo" className="button button-primary">
              Meet us in a free demo <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CORE VALUES EXPANDABLE CAROUSEL */}
      <section className="section values-section">
        <div className="container">
          <div className="mission-grid" style={{ marginBottom: '36px' }}>
            <article>
              <span><Target /></span>
              <h2>Our mission</h2>
              <p>Make career-relevant learning practical, personal and accessible to every serious learner.</p>
            </article>
            <article>
              <span><Eye /></span>
              <h2>Our vision</h2>
              <p>Build a trusted skills institute where education creates visible confidence and opportunity.</p>
            </article>
          </div>

          <ExpandableFeatureCarousel
            items={valuesData}
            eyebrow="Our Guiding Principles"
            title="Core Values That Drive ONEVRIKSH"
            text="Hover over each principle to explore the standards that govern our teaching and student mentorship."
          />
        </div>
      </section>

      {/* TRAINERS EXPANDABLE CAROUSEL */}
      <section className="section trainer-section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <ExpandableTrainerCarousel
            trainers={trainersData}
            eyebrow="Faculty & Mentorship"
            title="Learn from Certified Practitioners"
            text="Hover over any mentor card to see their credentials, experience, and core domains of expertise."
          />
        </div>
      </section>
    </>
  );
}

