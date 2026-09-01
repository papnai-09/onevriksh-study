'use client';

import { Quote, Star } from 'lucide-react';

export function TestimonialCard({ name, course, quote, initials = '' }) {
  const displayInitials = initials || name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <article
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '3px', color: '#f59e0b' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <Quote size={24} style={{ color: 'var(--primary)', opacity: 0.3 }} />
        </div>
        <p style={{ fontSize: '0.92rem', lineHeight: '1.7', color: 'var(--ink-secondary)', marginBottom: '24px' }}>
          “{quote}”
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--primary-soft)',
            color: 'var(--primary)',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 800,
            fontSize: '0.85rem'
          }}
        >
          {displayInitials}
        </div>
        <div>
          <strong style={{ fontSize: '0.92rem', color: 'var(--ink)', display: 'block' }}>{name}</strong>
          <small style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{course}</small>
        </div>
      </div>
    </article>
  );
}
