'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Brand } from './Brand';
import { api } from '@/utils/api';
import {
  X,
  Phone,
  Lock,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  LoaderCircle,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export function AuthModalHost() {
  const router = useRouter();
  const { authModal, openAuthModal, closeAuthModal, login, register, user, setUser } = useAuth();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && authModal) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [authModal, closeAuthModal]);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Reset form when modal opens or view changes
  useEffect(() => {
    setError('');
    setSuccessMessage('');
    setLoading(false);
  }, [authModal]);

  const handleLoginSubmit = async (e) => {
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
      const loggedIn = await login({ phone: cleanPhone, password });
      closeAuthModal();
      router.push(loggedIn.role === 'admin' ? '/admin' : '/student');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
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
      const newUser = await register({ name: name.trim(), phone: cleanPhone, password });
      closeAuthModal();
      router.push('/student');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
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
      setSuccessMessage('Password updated successfully!');
      setTimeout(() => {
        closeAuthModal();
        router.push(res.user?.role === 'admin' ? '/admin' : '/student');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please verify your mobile number.');
    } finally {
      setLoading(false);
    }
  };

  if (!authModal) return null;

  return (
    <div
      className="auth-modal-backdrop"
      onClick={closeAuthModal}
      role="dialog"
      aria-modal="true"
    >
      <div className="auth-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* X Close Button */}
        <button
          className="auth-modal-close"
          onClick={closeAuthModal}
          aria-label="Close Modal"
        >
          <X size={18} />
        </button>

        <div className="auth-card">
          <div style={{ marginBottom: '20px' }}>
            <Brand />
          </div>

          {/* ──────── LOGIN VIEW ──────── */}
          {authModal === 'login' && (
            <>
              <div className="auth-title" style={{ marginBottom: '18px' }}>
                <h1>Sign In</h1>
                <p>Enter your mobile number and password to continue.</p>
              </div>

              {error && (
                <div className="auth-error-box" role="alert">
                  <AlertCircle size={16} style={{ minWidth: 16 }} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit}>
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
                  <span>Password</span>
                  <div className="input-icon">
                    <Lock size={16} />
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
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </label>

                <div style={{ textAlign: 'right', marginTop: '-4px' }}>
                  <button
                    type="button"
                    onClick={() => openAuthModal('forgot-password')}
                    className="text-link"
                    style={{ fontSize: '0.78rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="button button-primary button-full"
                  disabled={loading || phone.length < 10 || !password}
                  style={{ marginTop: '4px' }}
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={16} className="animate-spin" /> Signing in...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} /> Sign In
                    </>
                  )}
                </button>
              </form>

              <div className="auth-footer" style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.82rem' }}>
                <span>New to ONEVRIKSH?</span>{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('register')}
                  className="text-link"
                  style={{ fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Create account
                </button>
              </div>
            </>
          )}

          {/* ──────── REGISTER VIEW ──────── */}
          {authModal === 'register' && (
            <>
              <div className="auth-title" style={{ marginBottom: '18px' }}>
                <h1>Create Account</h1>
                <p>Join ONEVRIKSH Study to access classroom materials and records.</p>
              </div>

              {error && (
                <div className="auth-error-box" role="alert">
                  <AlertCircle size={16} style={{ minWidth: 16 }} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleRegisterSubmit}>
                <label>
                  <span>Full Name</span>
                  <div className="input-icon">
                    <User size={16} />
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
                        disabled={loading}
                      />
                    </div>
                  </div>
                </label>

                <label>
                  <span>Password</span>
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
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </label>

                <label>
                  <span>Confirm Password</span>
                  <div className="input-icon">
                    <Lock size={16} />
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
                      tabIndex={-1}
                    >
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </label>

                <button
                  type="submit"
                  className="button button-primary button-full"
                  disabled={loading || !name.trim() || phone.length < 10 || !password || !confirmPassword}
                  style={{ marginTop: '4px' }}
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={16} className="animate-spin" /> Creating Account...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} /> Create Account
                    </>
                  )}
                </button>
              </form>

              <div className="auth-footer" style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.82rem' }}>
                <span>Already registered?</span>{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="text-link"
                  style={{ fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Sign in
                </button>
              </div>
            </>
          )}

          {/* ──────── FORGOT PASSWORD VIEW ──────── */}
          {authModal === 'forgot-password' && (
            <>
              {successMessage ? (
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
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
                  <h2 style={{ fontSize: '1.2rem', marginBottom: '6px', color: 'var(--ink)' }}>
                    Password Updated!
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0 }}>
                    Redirecting you to your dashboard...
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

                  <form onSubmit={handleResetSubmit}>
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
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          tabIndex={-1}
                        >
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
                        <button
                          type="button"
                          onClick={() => setShowConfirm((v) => !v)}
                          tabIndex={-1}
                        >
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
                    <button
                      type="button"
                      onClick={() => openAuthModal('login')}
                      className="text-link"
                      style={{ fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      Sign in
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
