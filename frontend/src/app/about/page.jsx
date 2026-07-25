import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Eye, HeartHandshake, Lightbulb, Target, Users } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';

export const metadata = { title: 'About Us' };

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div><span className="eyebrow">Our institute</span><h1>We help ambition become <em>ability.</em></h1><p>Onevriksh Study brings practical education, close mentoring and career direction together under one roof.</p></div>
          <div className="page-hero-image"><Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85" alt="Students at Onevriksh Study" fill /></div>
        </div>
      </section>
      <section className="section">
        <div className="container story-grid">
          <div className="story-image"><Image src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85" alt="Mentor working with students" fill /></div>
          <div>
            <SectionHeading eyebrow="Our story" title="A coaching institute built for the gap between theory and work." />
            <p className="lead">Onevriksh began with a simple observation: students did not need more passive lectures. They needed practice, patient mentors and a place where questions were welcome.</p>
            <p>From our Connaught Place centre, we now train learners across digital skills, design, communication and international languages. Our classrooms stay small, our curriculum stays current, and our focus stays personal.</p>
            <Link href="/demo" className="button button-primary">Meet us in a free demo <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
      <section className="section values-section">
        <div className="container">
          <div className="mission-grid">
            <article><span><Target /></span><h2>Our mission</h2><p>Make career-relevant learning practical, personal and accessible to every serious learner.</p></article>
            <article><span><Eye /></span><h2>Our vision</h2><p>Build a trusted skills institute where education creates visible confidence and opportunity.</p></article>
          </div>
          <div className="value-grid">
            {[[Lightbulb,'Practical first','Students learn through application, not memorisation.'],[HeartHandshake,'Care deeply','Individual progress matters more than batch completion.'],[Award,'Raise the bar','Our teaching, feedback and outcomes must earn trust.'],[Users,'Grow together','A strong learning community makes everyone better.']].map(([Icon,t,d])=><article key={t}><Icon/><h3>{t}</h3><p>{d}</p></article>)}
          </div>
        </div>
      </section>
      <section className="section trainer-section">
        <div className="container trainer-grid">
          <div><SectionHeading eyebrow="Our trainers" title="Industry experience, translated for the classroom." text="Our faculty combines subject expertise with the patience to teach. Every trainer is selected for practical experience, communication and commitment to student outcomes." /><div className="achievement-row"><div><strong>12+</strong><span>Expert trainers</span></div><div><strong>8 yrs</strong><span>Average experience</span></div><div><strong>25</strong><span>Students per batch</span></div></div></div>
          <div className="trainer-image"><Image src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=85" alt="Onevriksh trainer" fill /></div>
        </div>
      </section>
    </>
  );
}
