'use client';

import Image from 'next/image';
import Link from 'next/link';
import { institute } from '@/data/site';
import { Users, Monitor, Wifi, Coffee, ArrowRight } from 'lucide-react';
import { ExpandableFeatureCarousel } from '@/components/ExpandableFeatureCarousel';
import { CTASection } from '@/components/CTASection';

const facilitiesData = [
  {
    step: '01',
    tag: 'Batch size',
    title: 'Small Batches (15–20 Students)',
    desc: 'Learn in smaller groups so trainers can give students individual attention and answer doubts patiently.'
  },
  {
    step: '02',
    tag: 'Classrooms',
    title: 'Modern Lab & Classroom Setup',
    desc: 'Classrooms equipped with displays, projectors and comfortable desks for practical assignments and exercises.'
  },
  {
    step: '03',
    tag: 'Internet',
    title: 'High-Speed Student Wi-Fi',
    desc: 'Fast internet access throughout the centre for practical exercises, research and campaign practice.'
  },
  {
    step: '04',
    tag: 'Study space',
    title: 'Student Area & Reference Materials',
    desc: 'Quiet reading space with textbooks, foreign language exam practice papers and areas for peer discussions.'
  }
];

const connectivityData = [
  {
    step: '01',
    tag: 'Yellow & Blue Lines',
    title: 'Rajiv Chowk Metro (5 Min Walk)',
    desc: 'Exit from Gate No. 6 at Rajiv Chowk Metro Station for an easy 5-minute walk to our centre.'
  },
  {
    step: '02',
    tag: 'Blue Line',
    title: 'Barakhamba Road Metro (4 Min Walk)',
    desc: 'Quick 4-minute walking distance from Barakhamba Road Metro Station.'
  },
  {
    step: '03',
    tag: 'Central Delhi',
    title: 'Connaught Place Location',
    desc: `${institute.address}, centrally located and easy to reach from all parts of Delhi NCR.`
  },
  {
    step: '04',
    tag: 'Hours',
    title: 'Centre Timings',
    desc: 'Open Monday to Saturday from 9:00 AM to 7:00 PM. Sunday demo sessions available by appointment.'
  }
];

export default function OfflineCenterPage() {
  return (
    <>
      <section className="simple-hero">
        <div className="container">
          <span className="eyebrow light">OFFLINE TRAINING CENTRE</span>
          <h1>Our Connaught Place Centre</h1>
          <p>
            A dedicated classroom learning space in Connaught Place, New Delhi, designed for small batches, hands-on practice and personal guidance.
          </p>
        </div>
      </section>

      {/* Facilities & Infrastructure Showcase */}
      <section className="section">
        <div className="container">
          <div className="intro-grid" style={{ marginBottom: '44px' }}>
            <div style={{ position: 'relative', height: '380px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--line)' }}>
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85"
                alt="ONEVRIKSH Classroom in Connaught Place"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="eyebrow">CLASSROOM EXPERIENCE</span>
              <h2>Small Batches. Personal Guidance.</h2>
              <p style={{ marginBottom: '24px' }}>
                We believe practical skills are best learned in small groups with active participation. Our Connaught Place centre limits every batch to 15–20 students, giving you direct time with your trainer and regular feedback on your work.
              </p>

              <div className="check-list">
                <span>
                  <Users size={16} /> Max 15–20 Students per Batch
                </span>
                <span>
                  <Monitor size={16} /> Practical Lab Displays
                </span>
                <span>
                  <Wifi size={16} /> High-Speed Wi-Fi
                </span>
                <span>
                  <Coffee size={16} /> Student Study Space
                </span>
              </div>
            </div>
          </div>

          <ExpandableFeatureCarousel
            items={facilitiesData}
            eyebrow="CENTRE AMENITIES"
            title="Classroom & Lab Facilities"
            text="Explore the classroom amenities built for your learning comfort."
          />
        </div>
      </section>

      {/* Transit & Directions */}
      <section className="section" style={{ background: 'var(--surface-2)' }}>
        <div className="container">
          <ExpandableFeatureCarousel
            items={connectivityData}
            eyebrow="METRO CONNECTIVITY"
            title="How to Reach Our Centre"
            text="Centrally located in Connaught Place with easy walking access from nearby metro stations."
          />
        </div>
      </section>

      <CTASection
        title="Visit Our Connaught Place Centre"
        subtitle="Book a free demo class and visit our classrooms before you decide."
        primaryCtaLabel="Book a Free Demo"
        primaryCtaHref="/demo"
        secondaryCtaLabel="Contact Us"
        secondaryCtaHref="/contact"
      />
    </>
  );
}


