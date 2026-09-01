'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Brand } from '@/components/Brand';
import { AuthLayout } from '@/components/AuthLayout';
import { Lock, Mail, Eye, EyeOff, LoaderCircle, AlertCircle, ArrowRight } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    const destination = user.role === 'admin' ? '/admin' : '/student';
    router.replace(destination);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    try {
      const loggedInUser = await login({ email: email.trim(), password });
      const returnUrl = searchParams.get('returnUrl');
      if (returnUrl && returnUrl.startsWith('/')) {
        router.push(returnUrl);
      } else {
        const dest = loggedInUser.role === 'admin' ? '/admin' : '/student';
        router.push(dest);
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div style={{ marginBottom: '24px' }}>
        <Brand />
      </div>

      <div className="auth-title" style={{ marginBottom: '20px' }}>
        <span>Student & Staff Portal</span>
        <h1>Sign In to Onevriksh</h1>
        <p>Access your enrolled courses, live class schedules, and student progress.</p>
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
              id="login-email"
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

        <label>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Password</span>
            <Link href="/forgot-password" style={{ fontSize: '0.72rem', color: 'var(--blue)', fontWeight: 700 }}>
              Forgot password?
            </Link>
          </div>
          <div className="input-icon">
            <Lock size={18} />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
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

        <button type="submit" className="button button-primary button-large button-wide" disabled={loading} style={{ marginTop: '8px' }}>
          {loading ? <LoaderCircle size={18} className="spin" /> : <ArrowRight size={18} />}
          <span>{loading ? 'Signing in...' : 'Sign In to Portal'}</span>
        </button>
      </form>

      <div className="auth-switch" style={{ marginTop: '22px', textAlign: 'center', fontSize: '0.82rem' }}>
        <span>Don&apos;t have an account yet? </span>
        <Link href="/register" style={{ color: 'var(--blue)', fontWeight: 800 }}>
          Create student account
        </Link>
      </div>

      <div
        style={{
          marginTop: '24px',
          padding: '14px',
          background: 'var(--surface-2)',
          border: '1px solid var(--line)',
          borderRadius: '6px',
          fontSize: '0.75rem',
          color: 'var(--muted)'
        }}
      >
        <strong style={{ color: 'var(--ink)' }}>Default Test Credentials:</strong>
        <div style={{ marginTop: '4px' }}>Admin: <code>admin@onevriksh.com</code> / <code>Admin@123456</code></div>
        <div>Student: <code>student@onevriksh.com</code> / <code>Student@123456</code></div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}><LoaderCircle className="spin" size={32} /></div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
