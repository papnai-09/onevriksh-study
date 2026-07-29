'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function Scroll3D() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // A list of selectors to automatically animate as they scroll into view
    const selectors = [
      'section.section',
      'section.stats-band',
      'section.cta-band',
      '.course-card',
      '.feature-item',
      '.testimonial',
      '.value-grid article',
      '.mission-grid article',
      '.form-card',
      '.contact-grid > div'
    ];

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px', // triggers slightly before entering the viewport
      threshold: 0.02
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once animated, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Give the DOM a tiny fraction of time to render before selecting
    const timeoutId = setTimeout(() => {
      const elementsToObserve = document.querySelectorAll(selectors.join(','));
      elementsToObserve.forEach((el) => {
        // Only apply if not already visible to avoid reset flashes
        if (!el.classList.contains('visible')) {
          el.classList.add('scroll-3d');
          observer.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [pathname]); // Re-observe elements when route changes

  return null;
}
