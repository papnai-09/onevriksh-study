'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Brand } from '@/components/Brand';
import { AuthLayout } from '@/components/AuthLayout';
import { Lock, Mail, User, Phone, Eye, EyeOff, LoaderCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register, user } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    router.replace('/student');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password
      });
      router.push('/student');
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your information.');
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

        <div className="auth-title" style={{ marginBottom: '20px' }}>
          <span>Student Registration</span>
          <h1>Create Your Student Account</h1>
          <p>Join Onevriksh Study to access classroom materials, track attendance, and build skills.</p>
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

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
          <label>
            <span>Full name</span>
            <div className="input-icon">
              <User size={18} />
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Sharma"
                required
                disabled={loading}
              />
            </div>
          </label>

          <label>
            <span>Email address</span>
            <div className="input-icon">
              <Mail size={18} />
              <input
                id="reg-email"
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
            <span>Mobile number</span>
            <div className="input-icon">
              <Phone size={18} />
              <input
                id="reg-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                disabled={loading}
              />
            </div>
          </label>

          <label>
            <span>Create password</span>
            <div className="input-icon">
              <Lock size={18} />
              <input
                id="reg-password"
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
            <span>Confirm password</span>
            <div className="input-icon">
              <Lock size={18} />
              <input
                id="reg-confirm"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
                disabled={loading}
              />
            </div>
          </label>

          <button type="submit" className="button button-primary button-large button-wide" disabled={loading} style={{ marginTop: '8px' }}>
            {loading ? <LoaderCircle size={18} className="spin" /> : <ArrowRight size={18} />}
            <span>{loading ? 'Creating account...' : 'Create Account & Access Portal'}</span>
          </button>
        </form>

        <div className="auth-switch" style={{ marginTop: '22px', textAlign: 'center', fontSize: '0.82rem' }}>
          <span>Already have an account? </span>
          <Link href="/login" style={{ color: 'var(--blue)', fontWeight: 800 }}>
            Sign in here
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
