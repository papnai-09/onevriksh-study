'use client';

import Image from 'next/image';
import Link from 'next/link';
import { institute } from '@/data/site';
import { Users, Monitor, Wifi, Coffee } from 'lucide-react';
import { ExpandableFeatureCarousel } from '@/components/ExpandableFeatureCarousel';

const facilitiesData = [
  {
    step: '01',
    tag: 'Focus Batches',
    title: 'Small Cohorts (15–20 Learners)',
    desc: 'Never get lost in an overcrowded lecture hall. Our studio classrooms cap every cohort at 15–20 learners so you get direct trainer attention.',
    bullets: ['Dedicated trainer time', 'Personal assignment grading', 'Interactive speaking environment']
  },
  {
    step: '02',
    tag: 'Tech Setup',
    title: 'Dual-Monitor Lab Displays',
    desc: 'Modern lab displays, projector rigs, and dedicated student workstation plugs for seamless live campaign execution and code sprints.',
    bullets: ['High-res display mirrors', 'Comfortable workstation desks', 'Ergonomic seating']
  },
  {
    step: '03',
    tag: 'Connectivity',
    title: 'High-Speed Student Wi-Fi',
    desc: 'Gigabit fiber optic internet throughout the studio for smooth software installs, Google Ads campaigns, and live data streaming.',
    bullets: ['Unrestricted gigabit Wi-Fi', 'Power backups in all labs', 'Dedicated cloud sandboxes']
  },
  {
    step: '04',
    tag: 'Collaboration',
    title: 'Student Lounge & Resource Library',
    desc: 'Comfortable breakout spaces with reference textbooks, international language exam archives, and tea/coffee stations for group discussions.',
    bullets: ['DELF / Goethe exam library', 'Peer discussion tables', 'Quiet revision pods']
  }
];

const connectivityData = [
  {
    step: '01',
    tag: 'Yellow & Blue Lines',
    title: 'Rajiv Chowk Metro (5 Min Walk)',
    desc: 'Exit via Gate No. 6 at Rajiv Chowk Metro station. A short 5-minute walk brings you right to our Connaught Place studio entrance.',
    bullets: ['Major interchange station', 'Gate No. 6 direct access', '500m walking distance']
  },
  {
    step: '02',
    tag: 'Blue Line Direct',
    title: 'Barakhamba Road Metro (4 Min Walk)',
    desc: 'Convenient access from the Blue Line with a brisk 4-minute walk from Barakhamba Road station.',
    bullets: ['Less crowded exit', 'Direct street connectivity', '400m walking distance']
  },
  {
    step: '03',
    tag: 'Central Address',
    title: 'Connaught Place Heritage Hub',
    desc: `${institute.address}, situated right opposite Palika Bazaar / Regal Building area in Central Delhi.`,
    bullets: ['Central landmark location', 'Safe and well-lit area', 'Ample public parking nearby']
  },
  {
    step: '04',
    tag: 'Timings & Access',
    title: 'Operating Hours & Studio Access',
    desc: 'Open Monday through Saturday from 9:00 AM to 7:00 PM. Demo batches and career counselling available on Sundays by appointment.',
    bullets: ['Mon–Sat: 9 AM – 7 PM', 'Sunday demo slots', 'Flexible weekday & weekend batches']
  }
];

export default function OfflineCenterPage() {
  return (
    <>
      <section className="simple-hero">
        <div className="container">
          <span className="eyebrow light">Central Delhi Training Hub</span>
          <h1>Our Connaught Place Classroom Studio</h1>
          <p>
            An offline-first learning space engineered for focused collaboration, hands-on lab workstations, and direct mentor-led skill building in Central Delhi.
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
                alt="OneVriksh Classroom in Connaught Place"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="eyebrow">Classroom Experience</span>
              <h2>Built for Small Batches & Close Mentoring</h2>
              <p style={{ marginBottom: '24px' }}>
                We believe practical skills cannot be absorbed in overcrowded lecture halls. Our Connaught Place centre limits every batch to 15-20 students, giving you dedicated trainer time and personal feedback on every assignment.
              </p>

              <div className="check-list">
                <span>
                  <Users size={16} /> Max 15-20 Students/Batch
                </span>
                <span>
                  <Monitor size={16} /> Modern Lab Displays
                </span>
                <span>
                  <Wifi size={16} /> High-Speed Student Wi-Fi
                </span>
                <span>
                  <Coffee size={16} /> Student Lounge & Library
                </span>
              </div>
            </div>
          </div>

          <ExpandableFeatureCarousel
            items={facilitiesData}
            eyebrow="Studio Infrastructure"
            title="Classroom & Lab Amenities"
            text="Hover over any amenity card to explore the physical infrastructure built for your learning comfort."
          />
        </div>
      </section>

      {/* Transit & Directions */}
      <section className="section" style={{ background: 'var(--surface-2)' }}>
        <div className="container">
          <ExpandableFeatureCarousel
            items={connectivityData}
            eyebrow="Easy Metro Connectivity"
            title="How to Reach Our Connaught Place Centre"
            text="Centrally located in Connaught Place with effortless walking access from multiple metro lines."
          />
        </div>
      </section>
    </>
  );
}

