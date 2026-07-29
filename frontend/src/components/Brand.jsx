import Link from 'next/link';
import Image from 'next/image';

export function Brand({ compact = false }) {
  return (
    <Link href="/" className="brand" aria-label="Onevriksh Study home" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
      <span className="brand-mark-wrap" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Image
          src="/Black_Transparent.png"
          alt="Onevriksh Logo"
          width={compact ? 100 : 130}
          height={compact ? 24 : 28}
          priority
          style={{ objectFit: 'contain', width: 'auto', height: compact ? '24px' : '28px' }}
        />
      </span>
      <span
        className="brand-study-text"
        style={{
          fontSize: compact ? '0.92rem' : '1.15rem',
          fontWeight: 400,
          color: '#475569',
          lineHeight: 1,
          display: 'inline-block'
        }}
      >
        Study
      </span>
    </Link>
  );
}
