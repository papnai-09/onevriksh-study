'use client';

import { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Brand } from '@/components/Brand';
import { AuthLayout } from '@/components/AuthLayout';
import { Phone, ShieldCheck, LoaderCircle, AlertCircle, ArrowRight, RefreshCw, KeyRound, Sparkles } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, sendOtp, user } = useAuth();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Enter Phone, 2: Enter OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (user) {
      const destination = user.role === 'admin' ? '/admin' : '/student';
      router.replace(destination);
    }
  }, [user, router]);

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      await sendOtp(cleanPhone);
      setStep(2);
      setTimer(30);
      setCanResend(false);
      setOtp('123456'); // Pre-fill test OTP for instantaneous seamless testing
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!otp.trim()) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    try {
      const loggedInUser = await login({ phone, otp });
      const returnUrl = searchParams.get('returnUrl');
      if (returnUrl && returnUrl.startsWith('/')) {
        router.push(returnUrl);
      } else {
        const dest = loggedInUser.role === 'admin' ? '/admin' : '/student';
        router.push(dest);
      }
    } catch (err) {
      setError(err.message || 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role) => {
    setError('');
    setLoading(true);
    try {
      const demoPhone = role === 'admin' ? '9876543210' : '9812345678';
      const loggedInUser = await login({ phone: demoPhone, otp: '123456', role });
      const dest = loggedInUser.role === 'admin' ? '/admin' : '/student';
      router.push(dest);
    } catch (err) {
      setError(err.message);
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
        <span>Student & Staff Access</span>
        <h1>Sign In with Mobile</h1>
        <p>Enter your mobile number to receive an instant verification code.</p>
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

      {step === 1 ? (
        <form onSubmit={handleSendOtp} style={{ display: 'grid', gap: '16px' }}>
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
                  id="login-phone"
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
            <small style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
              We will send a 6-digit OTP for instant login.
            </small>
          </label>

          <button
            type="submit"
            className="button button-primary button-full"
            disabled={loading || phone.length < 10}
            style={{ marginTop: '4px' }}
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="animate-spin" /> Sending OTP...
              </>
            ) : (
              <>
                Get Verification Code <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} style={{ display: 'grid', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              background: 'var(--surface-2)',
              borderRadius: '6px',
              border: '1px solid var(--line)',
              fontSize: '0.85rem'
            }}
          >
            <span>
              Code sent to <strong>+91 {phone}</strong>
            </span>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setError('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#0F766E',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Change
            </button>
          </div>

          <label>
            <span>6-Digit Verification Code</span>
            <div className="input-icon">
              <KeyRound size={18} />
              <input
                id="login-otp"
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                required
                autoFocus
                disabled={loading}
                style={{ letterSpacing: '0.2em', fontWeight: 700, fontSize: '1.1rem' }}
              />
            </div>
            <small style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
              Default Test OTP: <strong>123456</strong>
            </small>
          </label>

          <button
            type="submit"
            className="button button-primary button-full"
            disabled={loading || otp.length < 6}
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="animate-spin" /> Verifying...
              </>
            ) : (
              <>
                <ShieldCheck size={18} /> Verify &amp; Sign In
              </>
            )}
          </button>

          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted)' }}>
            {canResend ? (
              <button
                type="button"
                onClick={handleSendOtp}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0F766E',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <RefreshCw size={13} /> Resend OTP
              </button>
            ) : (
              <span>Resend OTP in {timer}s</span>
            )}
          </div>
        </form>
      )}

      {/* QUICK DEMO ACCESS PANEL */}
      <div
        style={{
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid var(--line)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.05em' }}>
          Quick 1-Click Access
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            type="button"
            className="button button-ghost"
            style={{ fontSize: '0.78rem', padding: '8px 10px', justifyContent: 'center' }}
            onClick={() => handleQuickDemo('student')}
            disabled={loading}
          >
            <Sparkles size={14} /> Student Demo
          </button>
          <button
            type="button"
            className="button button-ghost"
            style={{ fontSize: '0.78rem', padding: '8px 10px', justifyContent: 'center' }}
            onClick={() => handleQuickDemo('admin')}
            disabled={loading}
          >
            <Sparkles size={14} /> Admin Demo
          </button>
        </div>
      </div>

      <div className="auth-footer" style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem' }}>
        <span>New to Onevriksh?</span>{' '}
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
