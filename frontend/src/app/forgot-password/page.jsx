'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Brand } from '@/components/Brand';
import { AuthLayout } from '@/components/AuthLayout';
import { api } from '@/utils/api';
import { Phone, Lock, Eye, EyeOff, ShieldCheck, LoaderCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanPhone = phone.replace(/\D/g, '');
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
      const res = await api.resetPassword({ phone: cleanPhone, password });
      if (res.user && setUser) {
        setUser(res.user);
      }
      setSuccess(true);
      setTimeout(() => {
        router.push(res.user?.role === 'admin' ? '/admin' : '/student');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please verify your mobile number.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <div style={{ marginBottom: '20px' }}>
          <Brand />
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(238, 44, 60, 0.1)',
                color: '#EE2C3C',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 12px'
              }}
            >
              <CheckCircle2 size={28} />
            </div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '6px', color: 'var(--ink)' }}>Password Updated!</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0 }}>
              Your password has been reset successfully. Redirecting to your dashboard...
            </p>
          </div>
        ) : (
          <>
            <div className="auth-title" style={{ marginBottom: '18px' }}>
              <h1>Reset Password</h1>
              <p>Enter your registered mobile number and set a new password.</p>
            </div>

            {error && (
              <div className="auth-error-box" role="alert">
                <AlertCircle size={16} style={{ minWidth: 16 }} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label>
                <span>Mobile Number</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div className="phone-prefix">+91</div>
                  <div className="input-icon" style={{ flex: 1 }}>
                    <Phone size={16} />
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
                <span>New Password</span>
                <div className="input-icon">
                  <Lock size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    disabled={loading}
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} tabIndex={-1}>
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </label>

              <label>
                <span>Confirm New Password</span>
                <div className="input-icon">
                  <Lock size={16} />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                    required
                    disabled={loading}
                  />
                  <button type="button" onClick={() => setShowConfirm((v) => !v)} tabIndex={-1}>
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </label>

              <button
                type="submit"
                className="button button-primary button-full"
                disabled={loading || phone.length < 10 || !password || !confirmPassword}
                style={{ marginTop: '4px' }}
              >
                {loading ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" /> Updating...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={16} /> Update Password
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer" style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.82rem' }}>
              <span>Remember your password?</span>{' '}
              <Link href="/login" className="text-link" style={{ fontWeight: 600 }}>
                Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
