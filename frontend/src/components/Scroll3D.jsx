'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function Scroll3D() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const selectors = [
      'section.section',
      'section.stats-band',
      'section.cta-band',
      '.course-card',
      '.feature-item',
      '.testimonial',
      '.form-card'
    ];

    const observerOptions = {
      root: null,
      rootMargin: '40px 0px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(selectors.join(','));
      elements.forEach((el) => {
        if (!el.classList.contains('visible')) {
          el.classList.add('fade-up');
          observer.observe(el);
        }
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
