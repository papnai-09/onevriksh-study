import Link from 'next/link';
import Image from 'next/image';

export function Brand({ compact = false }) {
  return (
    <Link
      href="/"
      className="brand"
      aria-label="ONEVRIKSH Study home"
      style={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        gap: '6px',
        textDecoration: 'none',
        lineHeight: 1
      }}
    >
      <span className="brand-mark-wrap" style={{ display: 'inline-flex', alignItems: 'flex-end', lineHeight: 1 }}>
        <Image
          src="/Black_Transparent.png"
          alt="ONEVRIKSH Logo"
          width={compact ? 80 : 100}
          height={compact ? 16 : 20}
          priority
          style={{ objectFit: 'contain', width: 'auto', height: compact ? '16px' : '20px', display: 'block', verticalAlign: 'bottom' }}
        />
      </span>
      <span
        className="brand-study-text"
        style={{
          fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: compact ? '0.88rem' : '1.05rem',
          fontWeight: 500,
          color: '#475569',
          lineHeight: 1,
          display: 'inline-block',
          letterSpacing: '0.01em',
          margin: 0,
          padding: 0,
          transform: 'translateY(2px)'
        }}
      >
        Study
      </span>
    </Link>
  );
}
