import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

export function AuthLayout({ children }) {
  return (
    <main className="auth-layout">
      <Link href="/" className="auth-back"><ArrowLeft/> Back to website</Link>
      <section className="auth-visual">
        <Image src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1400&q=85" alt="Onevriksh students" fill priority />
        <div className="auth-visual-overlay"/>
        <div className="auth-visual-copy"><span>ONEVRIKSH STUDY</span><h2>Everything you need to keep moving forward.</h2><div><p><Check/> Track attendance and progress</p><p><Check/> Access notes and recorded lectures</p><p><Check/> Manage fees and test results</p></div></div>
      </section>
      <section className="auth-form-wrap">{children}</section>
    </main>
  );
}
