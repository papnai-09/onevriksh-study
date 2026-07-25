'use client';

import { useAuth } from '@/context/AuthContext';
import { Brand } from './Brand';
import { Shield, ExternalLink, LoaderCircle } from 'lucide-react';

export function AuthCard() {
  const { login, loading } = useAuth();

  return (
    <div className="auth-card" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <Brand />
      </div>
      <div className="auth-title">
        <span>Onevriksh Central Identity</span>
        <h1>Single Sign-On (SSO)</h1>
        <p>Log in or create your student account securely using <strong>accounts.onevriksh.in</strong>.</p>
      </div>

      <div style={{
        margin: '2rem 0',
        padding: '1.5rem',
        borderRadius: '12px',
        background: 'var(--surface-subtle, rgba(255, 255, 255, 0.05))',
        border: '1px solid var(--border, #e2e8f0)'
      }}>
        <Shield size={36} style={{ margin: '0 auto 0.75rem', color: '#2563eb' }} />
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Unified Account</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground, #64748b)' }}>
          One login for all Onevriksh services, courses, certificates, and student dashboard.
        </p>
      </div>

      <button
        onClick={() => login()}
        className="button button-primary button-wide"
        disabled={loading}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem', padding: '12px 20px' }}
      >
        {loading ? <LoaderCircle className="spin" size={18} /> : <ExternalLink size={18} />}
        <span>Continue with accounts.onevriksh.in</span>
      </button>

      <div className="demo-login" style={{ marginTop: '1.5rem' }}>
        <strong>Secure Authentication</strong>
        <span>Protected by OAuth 2.1, OIDC, PKCE and HTTP-only encrypted session security.</span>
      </div>
    </div>
  );
}
