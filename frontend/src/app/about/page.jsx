import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Eye, Target, Check } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { ExpandableFeatureCarousel } from '@/components/ExpandableFeatureCarousel';

export const metadata = { title: 'About Us | ONEVRIKSH Study' };

const valuesData = [
  {
    step: '01',
    tag: 'Hands-on practice',
    title: 'Practical Learning',
    desc: 'Students learn by doing — working on real assignments, practice exercises and projects rather than passive lectures.'
  },
  {
    step: '02',
    tag: 'Individual attention',
    title: 'Small Batches',
    desc: 'We keep batch sizes small so every student gets individual attention, feedback and time to clear their doubts.'
  },
  {
    step: '03',
    tag: 'Clear fundamentals',
    title: 'Quality Teaching',
    desc: 'Our trainers explain concepts clearly from basics to advanced levels, making sure students understand the core ideas.'
  },
  {
    step: '04',
    tag: 'Student community',
    title: 'Supportive Environment',
    desc: 'A friendly and focused classroom environment in Connaught Place where students can collaborate, practice and grow.'
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <span className="eyebrow">ABOUT ONEVRIKSH STUDY</span>
            <h1>
              Practical Learning in the Classroom
            </h1>
            <p>
              ONEVRIKSH Study is an offline coaching institute in Connaught Place, New Delhi. We offer courses in Digital Marketing, Graphic Design, European Languages and English Communication.
            </p>
          </div>
          <div className="page-hero-image">
            <Image src="/img2.jpg" alt="Classroom learning at ONEVRIKSH Study" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container story-grid">
          <div className="story-image">
            <Image src="/img1.jpg" alt="ONEVRIKSH Study Connaught Place Center" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div>
            <SectionHeading eyebrow="OUR APPROACH" title="Classroom Learning & Personal Guidance" />
            <p className="lead">Our courses are designed to provide classroom learning, practical work and personal guidance.</p>
            <p>From our center in Connaught Place, New Delhi, we teach Digital Marketing, Graphic Design, Communication and Foreign Languages (German, French, Spanish, Italian). Our classes are trainer-led, batch sizes are kept small, and our focus is on helping each student progress through hands-on work.</p>
            <div className="check-list" style={{ margin: '20px 0 24px' }}>
              <span><Check /> Live trainer-led classes</span>
              <span><Check /> Practical assignments and projects</span>
              <span><Check /> Small batch learning</span>
              <span><Check /> Personal feedback</span>
              <span><Check /> Career support</span>
            </div>
            <Link href="/demo" className="button button-primary">
              Book a Free Demo <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="section values-section" style={{ background: 'var(--surface-2)' }}>
        <div className="container">
          <div className="mission-grid" style={{ marginBottom: '36px' }}>
            <article>
              <span><Target /></span>
              <h2>Our Mission</h2>
              <p>To provide accessible, practical and high-quality classroom coaching that helps students build usable skills.</p>
            </article>
            <article>
              <span><Eye /></span>
              <h2>Our Vision</h2>
              <p>To be a trusted coaching institute known for quality teaching, individual student care and genuine skill development.</p>
            </article>
          </div>

          <ExpandableFeatureCarousel
            items={valuesData}
            eyebrow="OUR VALUES"
            title="What We Believe In"
            text="How we design our classes, support our students and deliver quality coaching every day."
          />
        </div>
      </section>
    </>
  );
}



