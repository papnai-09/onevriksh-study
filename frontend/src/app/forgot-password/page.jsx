'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Brand } from '@/components/Brand';
import { AuthLayout } from '@/components/AuthLayout';
import { api } from '@/utils/api';
import { Mail, LoaderCircle, AlertCircle, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.forgotPassword(email.trim());
      setSubmitted(true);
      if (res.resetToken) {
        setResetToken(res.resetToken);
      }
    } catch (err) {
      setError(err.message || 'Failed to process password reset request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <div style={{ marginBottom: '24px' }}>
          <Brand />
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--green-soft)',
                color: 'var(--green)',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 16px'
              }}
            >
              <CheckCircle2 size={32} />
            </div>
            <h1 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Check Your Email</h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '24px' }}>
              If an account is associated with <strong>{email}</strong>, we have sent instructions to reset your password.
            </p>

            {resetToken && (
              <div
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--line)',
                  padding: '14px',
                  borderRadius: '6px',
                  marginBottom: '24px',
                  fontSize: '0.82rem'
                }}
              >
                <strong>Direct Reset Link (Dev Mode):</strong>
                <div style={{ marginTop: '6px' }}>
                  <Link
                    href={`/reset-password?token=${resetToken}`}
                    style={{ color: 'var(--blue)', fontWeight: 700, wordBreak: 'break-all' }}
                  >
                    Click here to reset your password now &rarr;
                  </Link>
                </div>
              </div>
            )}

            <Link href="/login" className="button button-ghost button-wide">
              <ArrowLeft size={16} />
              <span>Return to Sign In</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="auth-title" style={{ marginBottom: '20px' }}>
              <span>Account Recovery</span>
              <h1>Reset Your Password</h1>
              <p>Enter the email address registered with your student account and we will help you recover access.</p>
            </div>

            {error && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: 'var(--red)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  marginBottom: '20px'
                }}
                role="alert"
              >
                <AlertCircle size={18} style={{ minWidth: '18px' }} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
              <label>
                <span>Email address</span>
                <div className="input-icon">
                  <Mail size={18} />
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
              </label>

              <button type="submit" className="button button-primary button-large button-wide" disabled={loading} style={{ marginTop: '8px' }}>
                {loading ? <LoaderCircle size={18} className="spin" /> : <ArrowRight size={18} />}
                <span>{loading ? 'Sending instructions...' : 'Send Reset Instructions'}</span>
              </button>
            </form>

            <div className="auth-switch" style={{ marginTop: '22px', textAlign: 'center', fontSize: '0.82rem' }}>
              <Link href="/login" style={{ color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <ArrowLeft size={15} />
                <span>Back to sign in</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
