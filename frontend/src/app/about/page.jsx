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
    role: 'Digital Marketing Trainer',
    experience: '9+ Years Experience',
    bio: 'Experienced digital marketing trainer helping students understand SEO, Google Ads, social media and analytics through practical campaigns.',
    expertise: ['Google Ads', 'Google Analytics', 'SEO', 'Social Media']
  },
  {
    name: 'Meera Kapoor',
    role: 'Graphic Design Trainer',
    experience: '7+ Years Experience',
    bio: 'Graphic design trainer focusing on Adobe Photoshop, Illustrator, typography and building practical student design portfolios.',
    expertise: ['Photoshop', 'Illustrator', 'Brand Design', 'Layout Design']
  },
  {
    name: 'Ananya Verma',
    role: 'French Language Trainer',
    experience: '6+ Years Experience',
    bio: 'Certified French educator helping learners develop daily conversation fluency and prepare for DELF examinations.',
    expertise: ['DELF Preparation', 'French Grammar', 'Conversation', 'Listening Practice']
  },
  {
    name: 'Nikhil Arora',
    role: 'German Language Trainer',
    experience: '8+ Years Experience',
    bio: 'German language faculty guiding students through Goethe-Zertifikat preparation, sentence structure and speaking practice.',
    expertise: ['Goethe Exams', 'German Grammar', 'Spoken German', 'Study in Germany']
  },
  {
    name: 'Elena Rossi',
    role: 'Italian Language Trainer',
    experience: '5+ Years Experience',
    bio: 'Italian language instructor helping students master everyday conversation and prepare for CILS certifications.',
    expertise: ['CILS Exam', 'Conversational Italian', 'Grammar', 'Italian Culture']
  },
  {
    name: 'Priya Malhotra',
    role: 'English & Communication Trainer',
    experience: '10+ Years Experience',
    bio: 'Communication trainer helping students overcome hesitation, improve public speaking and prepare for job interviews.',
    expertise: ['Public Speaking', 'Group Discussions', 'Interview Skills', 'Spoken English']
  }
];

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
            <span className="eyebrow">ABOUT ONEVRIKSH</span>
            <h1>
              Learn From the Classroom. <em>Practice in the Real World.</em>
            </h1>
            <p>
              ONEVRIKSH Study is an offline coaching institute in Connaught Place, New Delhi. We provide practical courses designed to build skills and confidence for your career.
            </p>
          </div>
          <div className="page-hero-image">
            <Image src="/img2.jpg" alt="Students at ONEVRIKSH Study" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container story-grid">
          <div className="story-image">
            <Image src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85" alt="Trainer working with students" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div>
            <SectionHeading eyebrow="OUR STORY" title="Built for Practical Learning & Career Growth" />
            <p className="lead">ONEVRIKSH Study started with a simple thought: learning works best when students practice what they learn, receive direct feedback and have patient mentors to guide them.</p>
            <p>From our centre in Connaught Place, New Delhi, we teach Digital Marketing, Graphic Design, Communication and Foreign Languages (German, French, Spanish, Italian). Our classes stay small, our trainers are experienced and our focus is on helping each student progress.</p>
            <Link href="/demo" className="button button-primary">
              Book a Free Demo <ArrowRight size={18} />
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
              <h2>Our Mission</h2>
              <p>To provide accessible, practical and high-quality classroom coaching that helps students build usable career skills.</p>
            </article>
            <article>
              <span><Eye /></span>
              <h2>Our Vision</h2>
              <p>To be a trusted coaching institute known for quality teaching, individual student care and genuine skill building.</p>
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

      {/* TRAINERS EXPANDABLE CAROUSEL */}
      <section className="section trainer-section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <ExpandableTrainerCarousel
            trainers={trainersData}
            eyebrow="OUR FACULTY"
            title="Learn from Experienced Trainers"
            text="Our trainers bring practical knowledge, structured lesson plans and personal mentoring into every classroom session."
          />
        </div>
      </section>
    </>
  );
}


