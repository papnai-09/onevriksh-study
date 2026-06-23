import Link from 'next/link';
import { Sprout } from 'lucide-react';

export function Brand({ compact = false }) {
  return (
    <Link href="/" className="brand" aria-label="Onevriksh Study home">
      <span className="brand-mark"><Sprout size={compact ? 20 : 24} strokeWidth={2.4} /></span>
      <span className="brand-copy">
        <strong>Onevriksh</strong>
        {!compact && <small>STUDY</small>}
      </span>
    </Link>
  );
}
