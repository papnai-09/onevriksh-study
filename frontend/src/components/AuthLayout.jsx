'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export function AuthLayout({ children }) {
  return (
    <main className="auth-layout">
      <section className="auth-visual">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=85"
          alt="OneVriksh Study Classroom"
          fill
          priority
          sizes="50vw"
        />
        <div className="auth-visual-overlay" />
        <div className="auth-visual-copy">
          <span>ONEVRIKSH STUDY PLATFORM</span>
          <h2>Root Your Skills. Rise Your Future.</h2>
          <div>
            <p>
              <CheckCircle2 size={18} /> Direct classroom instruction in Connaught Place
            </p>
            <p>
              <CheckCircle2 size={18} /> Live projects, mentor feedback & assignments
            </p>
            <p>
              <CheckCircle2 size={18} /> Real-time attendance, fee records & test results
            </p>
          </div>
        </div>
      </section>
      <section className="auth-form-wrap">{children}</section>
    </main>
  );
}
