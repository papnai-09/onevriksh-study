import Link from 'next/link';
import Image from 'next/image';

export function Brand({ compact = false }) {
  return (
    <Link href="/" className="brand" aria-label="Onevriksh Study home">
      <span className="brand-mark">
        <Image
          src="/logo.png"
          alt="Onevriksh logo"
          width={compact ? 22 : 28}
          height={compact ? 22 : 28}
          priority
          style={{ objectFit: 'contain', display: 'block' }}
        />
      </span>
      <span className="brand-copy">
        <strong>Onevriksh</strong>
        {!compact && <small>STUDY</small>}
      </span>
    </Link>
  );
}
