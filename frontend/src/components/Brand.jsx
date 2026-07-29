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
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        textDecoration: 'none',
        height: compact ? '20px' : '24px'
      }}
    >
      <span className="brand-mark-wrap" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
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
          fontSize: compact ? '0.88rem' : '1.05rem',
          fontWeight: 400,
          color: '#475569',
          lineHeight: 1,
          display: 'inline-flex',
          alignItems: 'center',
          margin: 0,
          padding: 0
        }}
      >
        Study
      </span>
    </Link>
  );
}
