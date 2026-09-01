import Link from 'next/link';
import { Home, BookOpen, ArrowLeft, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center', background: 'var(--surface-2)' }}>
      <div style={{ maxWidth: '520px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-xl)', padding: '48px 32px', boxShadow: 'var(--shadow-lg)' }}>
        <span style={{ fontSize: '4rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--primary)', display: 'block', lineHeight: 1 }}>
          404
        </span>
        <h1 style={{ fontSize: '1.6rem', marginTop: '16px', marginBottom: '12px' }}>Page Not Found</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.92rem', marginBottom: '32px' }}>
          The page or course you are looking for may have been relocated or updated. Let&apos;s get you back on track.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="button button-primary">
            <Home size={16} />
            <span>Return Home</span>
          </Link>
          <Link href="/courses" className="button button-ghost">
            <BookOpen size={16} />
            <span>Explore Courses</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
