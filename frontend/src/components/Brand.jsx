import Link from 'next/link';
import Image from 'next/image';

export function Brand({ compact = false }) {
  return (
    <Link
      href="/"
      className="brand"
      aria-label="Onevriksh Study home"
      style={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        gap: '6px',
        textDecoration: 'none'
      }}
    >
      <span className="brand-mark-wrap" style={{ display: 'inline-flex', alignItems: 'flex-end' }}>
        <Image
          src="/Black_Transparent.png"
          alt="Onevriksh Logo"
          width={compact ? 80 : 100}
          height={compact ? 16 : 20}
          priority
          style={{ objectFit: 'contain', width: 'auto', height: compact ? '16px' : '20px', display: 'block' }}
        />
      </span>
      <span
        className="brand-study-text"
        style={{
          fontFamily: "'Outfit', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: compact ? '0.88rem' : '1.05rem',
          fontWeight: 500,
          color: '#475569',
          lineHeight: 1,
          display: 'inline-block',
          letterSpacing: '0.01em',
          margin: 0,
          padding: 0,
          alignSelf: 'flex-end',
          marginBottom: '1px'
        }}
      >
        Study
      </span>
    </Link>
  );
}
