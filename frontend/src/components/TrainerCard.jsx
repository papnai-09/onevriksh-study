'use client';

import { Award, CheckCircle } from 'lucide-react';

export function TrainerCard({ name, role, experience, expertise = [], initials = '' }) {
  const displayInitials = initials || name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <article
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--primary-soft)',
            color: 'var(--primary)',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 800,
            fontSize: '1.2rem',
            fontFamily: 'var(--font-display)'
          }}
        >
          {displayInitials}
        </div>
        <div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '2px' }}>{name}</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, margin: 0 }}>{role}</p>
        </div>
      </div>
      {experience && (
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '16px' }}>
          {experience}
        </p>
      )}
      {expertise.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: 'auto' }}>
          {expertise.map((skill) => (
            <span key={skill} className="badge badge-neutral">
              {skill}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
