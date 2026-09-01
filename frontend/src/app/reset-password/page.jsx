'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Brand } from '@/components/Brand';
import { AuthLayout } from '@/components/AuthLayout';
import { api } from '@/utils/api';
import { Lock, Eye, EyeOff, LoaderCircle, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get('token') || '';

  const [token, setToken] = useState(tokenFromUrl);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token.trim()) {
      setError('Please provide a valid password reset token.');
      return;
    }

    if (password.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    try {
      await api.resetPassword(token.trim(), password);
      setSuccess(true);
      setTimeout(() => {
        router.push('/student');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to reset password. The token may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div style={{ marginBottom: '24px' }}>
        <Brand />
      </div>

      {success ? (
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
          <h1 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Password Reset Complete</h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '24px' }}>
            Your password has been successfully updated. Redirecting you to your student dashboard...
          </p>
          <Link href="/login" className="button button-primary button-wide">
            <span>Continue to Sign In</span>
          </Link>
        </div>
      ) : (
        <>
          <div className="auth-title" style={{ marginBottom: '20px' }}>
            <span>Account Security</span>
            <h1>Create New Password</h1>
            <p>Set a new, strong password to protect your student portal and records.</p>
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
            {!tokenFromUrl && (
              <label>
                <span>Reset Token</span>
                <input
                  id="reset-token"
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste your reset token"
                  required
                  disabled={loading}
                />
              </label>
            )}

            <label>
              <span>New Password</span>
              <div className="input-icon">
                <Lock size={18} />
                <input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{ border: 0, background: 'transparent', cursor: 'pointer', color: 'var(--muted)', padding: '2px', display: 'grid', placeItems: 'center' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <label>
              <span>Confirm New Password</span>
              <div className="input-icon">
                <Lock size={18} />
                <input
                  id="confirm-new-password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  required
                  disabled={loading}
                />
              </div>
            </label>

            <button type="submit" className="button button-primary button-large button-wide" disabled={loading} style={{ marginTop: '8px' }}>
              {loading ? <LoaderCircle size={18} className="spin" /> : <ArrowRight size={18} />}
              <span>{loading ? 'Updating password...' : 'Update Password & Sign In'}</span>
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}><LoaderCircle className="spin" size={32} /></div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
