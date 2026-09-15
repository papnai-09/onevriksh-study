import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Brand } from './Brand';
import { institute } from '@/data/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid-simple">
        <div className="footer-brand-col">
          <Brand dark />
          <p className="footer-tagline">
            Practical offline coaching in Connaught Place, New Delhi.
          </p>
          <div className="footer-contact-items">
            <a href={'tel:' + institute.phone.replace(/\s+/g, '')} className="footer-contact-item">
              <Phone size={15} /> {institute.phone}
            </a>
            <a href={'mailto:' + institute.email} className="footer-contact-item">
              <Mail size={15} /> {institute.email}
            </a>
            <span className="footer-contact-item">
              <MapPin size={15} /> {institute.address}
            </span>
          </div>
        </div>

        <div className="footer-links-col">
          <h3>Quick Links</h3>
          <nav className="footer-nav" aria-label="Footer Navigation">
            <Link href="/">Home</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>

        <div className="footer-cta-col">
          <h3>Start Learning</h3>
          <p>Book a free demo class to experience our classroom training.</p>
          <Link href="/demo" className="button button-primary">
            Book Free Demo
          </Link>
        </div>
      </div>

      <div className="container footer-bottom-simple">
        <span>© {new Date().getFullYear()} ONEVRIKSH Study. All rights reserved.</span>
        <div className="footer-legal-links">
          <Link href="/privacy">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

