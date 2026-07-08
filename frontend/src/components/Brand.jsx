import Link from 'next/link';
import Image from 'next/image';

export function Brand({ compact = false }) {
  return (
    <Link href="/" className="brand" aria-label="Onevriksh Study home">
      <span className="brand-mark">
        <Image
          src="/logo.png"
          alt="Onevriksh logo"
          width={compact ? 28 : 36}
          height={compact ? 28 : 36}
          priority
          style={{ objectFit: 'contain' }}
        />
      </span>
      <span className="brand-copy">
        <strong>Onevriksh</strong>
        {!compact && <small>STUDY</small>}
      </span>
    </Link>
  );
}
