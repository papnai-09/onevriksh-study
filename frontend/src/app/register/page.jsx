'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Brand } from '@/components/Brand';
import { AuthLayout } from '@/components/AuthLayout';
import { User, Phone, BookOpen, ShieldCheck, KeyRound, LoaderCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { courses } from '@/data/site';

export default function RegisterPage() {
  const router = useRouter();
  const { register, sendOtp, user } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(courses[0].title);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Details, 2: OTP Verification
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    router.replace('/student');
  }

  const handleProceedToOtp = async (e) => {
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

    setLoading(true);
    try {
      await sendOtp(cleanPhone);
      setStep(2);
      setOtp('123456'); // Pre-fill test OTP
    } catch (err) {
      setError(err.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp.trim()) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: name.trim(),
        phone: phone.trim(),
        course,
        otp
      });
      router.push('/student');
    } catch (err) {
      setError(err.message || 'Registration failed.');
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
          <h1>Create Student Account</h1>
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

        {step === 1 ? (
          <form onSubmit={handleProceedToOtp} style={{ display: 'grid', gap: '15px' }}>
            <label>
              <span>Full name</span>
              <div className="input-icon">
                <User size={18} />
                <input
                  id="reg-name"
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
                    id="reg-phone"
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

            <label>
              <span>Interested Program</span>
              <div className="input-icon">
                <BookOpen size={18} />
                <select
                  id="reg-course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--line)',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    color: 'var(--ink)'
                  }}
                >
                  {courses.map((c) => (
                    <option key={c.slug} value={c.title}>
                      {c.title} ({c.category})
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <button
              type="submit"
              className="button button-primary button-full"
              disabled={loading || !name.trim() || phone.length < 10}
              style={{ marginTop: '8px' }}
            >
              {loading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" /> Sending OTP...
                </>
              ) : (
                <>
                  Verify Mobile &amp; Continue <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} style={{ display: 'grid', gap: '16px' }}>
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
                onClick={() => setStep(1)}
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
                  id="reg-otp"
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
                  <LoaderCircle size={18} className="animate-spin" /> Creating Account...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} /> Complete Registration
                </>
              )}
            </button>
          </form>
        )}

        <div className="auth-footer" style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem' }}>
          <span>Already registered?</span>{' '}
          <Link href="/login" className="text-link" style={{ fontWeight: 600 }}>
            Sign in with mobile
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
