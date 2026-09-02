'use client';

import { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Brand } from '@/components/Brand';
import { AuthLayout } from '@/components/AuthLayout';
import { Phone, Lock, Eye, EyeOff, ShieldCheck, LoaderCircle, AlertCircle } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user } = useAuth();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      const destination = user.role === 'admin' ? '/admin' : '/student';
      router.replace(destination);
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      const loggedInUser = await login({ phone: cleanPhone, password });
      const returnUrl = searchParams.get('returnUrl');
      if (returnUrl && returnUrl.startsWith('/')) {
        router.push(returnUrl);
      } else {
        router.push(loggedInUser.role === 'admin' ? '/admin' : '/student');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
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
        <h1>Sign In</h1>
        <p>Enter your mobile number and password to continue.</p>
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
          <span>Mobile Number</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                background: 'var(--surface-2)',
                border: '1px solid var(--line)',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.85rem',
                color: 'var(--ink)'
              }}
            >
              +91
            </div>
            <div className="input-icon" style={{ flex: 1 }}>
              <Phone size={18} />
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="98765 43210"
                required
                autoFocus
                disabled={loading}
              />
            </div>
          </div>
        </label>

        <label>
          <span>Password</span>
          <div className="input-icon">
            <Lock size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--muted)',
                display: 'flex',
                alignItems: 'center'
              }}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>

        <div style={{ textAlign: 'right', marginTop: '-8px' }}>
          <Link href="/forgot-password" className="text-link" style={{ fontSize: '0.82rem' }}>
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="button button-primary button-full"
          disabled={loading || phone.length < 10 || !password}
        >
          {loading ? (
            <>
              <LoaderCircle size={18} className="animate-spin" /> Signing in...
            </>
          ) : (
            <>
              <ShieldCheck size={18} /> Sign In
            </>
          )}
        </button>
      </form>

      <div className="auth-footer" style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem' }}>
        <span>New to ONEVRIKSH?</span>{' '}
        <Link href="/register" className="text-link" style={{ fontWeight: 600 }}>
          Create student account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <div className="auth-card" style={{ display: 'grid', placeItems: 'center', minHeight: '300px' }}>
            <LoaderCircle size={28} className="animate-spin" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
