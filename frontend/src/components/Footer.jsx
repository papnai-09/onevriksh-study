import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { Brand } from './Brand';
import { institute } from '@/data/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Brand />
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
          <Link href="/demo">Free demo</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h3>Popular courses</h3>
          <Link href="/courses/digital-marketing">Digital Marketing</Link>
          <Link href="/courses/graphic-design">Graphic Design</Link>
          <Link href="/courses/french-language">French Language</Link>
          <Link href="/courses/english-speaking">English Speaking</Link>
        </div>
        <div className="footer-contact">
          <h3>Reach us</h3>
          <a href="tel:+918700536553"><Phone size={17} /> {institute.phone}</a>
          <a href={'mailto:' + institute.email}><Mail size={17} /> {institute.email}</a>
          <span><MapPin size={18} /> {institute.address}</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Onevriksh Study. All rights reserved.</span>
        <div><Link href="#">Privacy</Link><Link href="#">Terms</Link></div>
      </div>
    </footer>
  );
}
