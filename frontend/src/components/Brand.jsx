import Link from 'next/link';
import Image from 'next/image';

export function Brand({ compact = false }) {
  return (
    <Link href="/" className="brand" aria-label="Onevriksh Study home">
      <span className="brand-mark-wrap" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Image
          src="/Black_Transparent.png"
          alt="Onevriksh Logo"
          width={compact ? 120 : 160}
          height={compact ? 32 : 42}
          priority
          style={{ objectFit: 'contain', width: 'auto', height: compact ? '32px' : '40px' }}
        />
      </span>
    </Link>
  );
}
