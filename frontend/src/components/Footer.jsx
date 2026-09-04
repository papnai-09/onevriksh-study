import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { Brand } from './Brand';
import { institute } from '@/data/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Brand dark />
          <p>Practical, mentor-led training that helps students build real skills, stronger confidence and better careers.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
          </div>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/about">About us</Link>
          <Link href="/courses">All courses</Link>
          <Link href="/certification">Certification</Link>
          <Link href="/study-abroad">Study abroad</Link>
          <Link href="/offline-center">Offline centers</Link>
          <Link href="/demo">Free demo</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h3>Popular courses</h3>
          <Link href="/digital-marketing-foundation">Digital Marketing</Link>
          <Link href="/graphic-design">Graphic Design</Link>
          <Link href="/spanish-language">Spanish Language</Link>
          <Link href="/german-language">German Language</Link>
          <Link href="/french-language">French Language</Link>
          <Link href="/english-speaking">English Speaking</Link>
        </div>
        <div className="footer-contact">
          <h3>Reach us</h3>
          <Link href="/contact">
            <Mail size={17} /> {institute.email || 'study@onevriksh.com'}
          </Link>
          <span>
            <MapPin size={18} /> New Delhi Training Centre
          </span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 ONEVRIKSH Study. All rights reserved.</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
