'use client';

export function SkeletonLoader({ type = 'card', count = 3 }) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === 'course-card') {
    return (
      <div className="card-grid-3">
        {items.map((i) => (
          <div key={i} className="course-card" style={{ height: '420px', padding: '0' }}>
            <div className="skeleton" style={{ height: '200px', width: '100%' }} />
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="skeleton" style={{ height: '14px', width: '30%' }} />
              <div className="skeleton" style={{ height: '24px', width: '85%' }} />
              <div className="skeleton" style={{ height: '48px', width: '100%' }} />
              <div className="skeleton" style={{ height: '36px', width: '100%', marginTop: 'auto' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((i) => (
          <div key={i} className="skeleton" style={{ height: '52px', width: '100%' }} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {items.map((i) => (
        <div key={i} className="skeleton" style={{ height: '80px', width: '100%' }} />
      ))}
    </div>
  );
}
