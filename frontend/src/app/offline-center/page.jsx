import Image from 'next/image';
import Link from 'next/link';
import { institute } from '@/data/site';
import { MapPin, Users, Monitor, Wifi, Coffee, Clock3, Navigation } from 'lucide-react';

export const metadata = {
  title: 'Offline Training Centre in Connaught Place | ONEVRIKSH Study',
  description:
    'Visit our modern classroom studio in Connaught Place, New Delhi. Air-conditioned classrooms, dedicated student workstations, high-speed Wi-Fi, and small batch sizes.'
};

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
          <div className="intro-grid">
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
        </div>
      </section>

      {/* Transit & Directions */}
      <section className="section" style={{ background: 'var(--surface-2)' }}>
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Easy Metro Connectivity</span>
            <h2>How to Reach Our Centre</h2>
            <p>Centrally located in Connaught Place with instant access to multiple metro stations.</p>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h3 style={{ fontSize: '1.08rem', margin: '0 0 10px', color: 'var(--ink)', fontWeight: 700 }}>By Delhi Metro</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--ink)' }}>Rajiv Chowk Metro (Yellow & Blue Lines):</strong> Take Gate No. 6. 5-minute walk to NDMC Market.<br />
                <strong style={{ color: 'var(--ink)' }}>Barakhamba Road Metro:</strong> 4-minute walk.
              </p>
            </div>

            <div className="feature-item">
              <h3 style={{ fontSize: '1.08rem', margin: '0 0 10px', color: 'var(--ink)', fontWeight: 700 }}>Physical Address</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                {institute.address}<br />
                Opposite Palika Bazaar / Regal Building area.
              </p>
            </div>

            <div className="feature-item">
              <h3 style={{ fontSize: '1.08rem', margin: '0 0 10px', color: 'var(--ink)', fontWeight: 700 }}>Operating Hours</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Monday – Saturday: 9:00 AM – 7:00 PM<br />
                Sunday: Demo batches & counselling by appointment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
