'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LoaderCircle, ExternalLink } from 'lucide-react';
import { Brand } from '@/components/Brand';

export default function LoginPage() {
  const { login } = useAuth();

  useEffect(() => {
    login();
  }, [login]);

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '440px',
        width: '100%',
        background: 'var(--surface, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Brand />
        </div>
        <div style={{
          width: '56px',
          height: '56px',
          margin: '0 auto 1.25rem',
          borderRadius: '50%',
          background: 'rgba(59, 130, 246, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2563eb'
        }}>
          <LoaderCircle size={28} className="spin" />
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--foreground)' }}>
          Redirecting to Central Authentication
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground, #64748b)', marginBottom: '1.5rem' }}>
          Transferring you securely to <strong>accounts.onevriksh.in</strong>...
        </p>
        <button
          onClick={() => login()}
          className="button button-primary button-wide"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          <span>Continue to Login</span>
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
}
