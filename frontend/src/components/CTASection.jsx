'use client';

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export function CTASection({
  title = 'Ready to Start Your Learning Journey?',
  subtitle = 'Experience our hands-on teaching methodology in a free demo session.',
  primaryCtaLabel = 'Book a Free Demo',
  primaryCtaHref = '/demo',
  secondaryCtaLabel = 'Contact Us',
  secondaryCtaHref = '/contact'
}) {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <span className="eyebrow light">Onevriksh Study</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href={primaryCtaHref} className="button button-light">
            <Calendar size={17} />
            <span>{primaryCtaLabel}</span>
          </Link>
          <Link
            href={secondaryCtaHref}
            className="button button-ghost"
            style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}
          >
            <span>{secondaryCtaLabel}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
