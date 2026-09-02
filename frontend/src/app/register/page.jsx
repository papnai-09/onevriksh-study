'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Brand } from '@/components/Brand';
import { AuthLayout } from '@/components/AuthLayout';
import { User, Phone, Lock, Eye, EyeOff, ShieldCheck, LoaderCircle, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register, user } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) router.replace('/student');
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanPhone = phone.replace(/\D/g, '');
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register({ name: name.trim(), phone: cleanPhone, password });
      router.push('/student');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
          <h1>Create Account</h1>
          <p>Join ONEVRIKSH Study to access classroom materials, track attendance, and build skills.</p>
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
          {/* Full Name */}
          <label>
            <span>Full Name</span>
            <div className="input-icon">
              <User size={18} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                required
                autoFocus
                disabled={loading}
              />
            </div>
          </label>

          {/* Mobile Number */}
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
                  disabled={loading}
                />
              </div>
            </div>
          </label>

          {/* Password */}
          <label>
            <span>Password</span>
            <div className="input-icon">
              <Lock size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
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

          {/* Confirm Password */}
          <label>
            <span>Confirm Password</span>
            <div className="input-icon">
              <Lock size={18} />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
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
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>


          <button
            type="submit"
            className="button button-primary button-full"
            disabled={loading || !name.trim() || phone.length < 10 || !password || !confirmPassword}
            style={{ marginTop: '8px' }}
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="animate-spin" /> Creating Account...
              </>
            ) : (
              <>
                <ShieldCheck size={18} /> Create Account
              </>
            )}
          </button>
        </form>

        <div className="auth-footer" style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem' }}>
          <span>Already registered?</span>{' '}
          <Link href="/login" className="text-link" style={{ fontWeight: 600 }}>
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
