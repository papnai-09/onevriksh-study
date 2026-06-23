'use client';

import Link from 'next/link';
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, Phone, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { Brand } from './Brand';
import { useAuth } from '@/context/AuthContext';

export function AuthCard({ mode = 'login' }) {
  const router = useRouter();
  const { login, register } = useAuth();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isLogin = mode === 'login';

  const submit = useCallback(async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString();

    try {
      if (isLogin) {
        const user = await login(email, password);
        if (user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/student');
        }
      } else {
        const name = formData.get('name')?.toString().trim();
        const phone = formData.get('phone')?.toString().trim();
        const confirmPassword = formData.get('confirmPassword')?.toString();

        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }

        const user = await register(name, email, phone, password);
        router.push('/student');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
      setLoading(false);
    }
  }, [isLogin, login, register, router]);

  return (
    <div className="auth-card">
      <Brand />
      <div className="auth-title">
        <span>{isLogin ? 'Student portal' : 'Create your account'}</span>
        <h1>{isLogin ? 'Welcome back' : 'Start learning with us'}</h1>
        <p>{isLogin ? 'Enter your details to continue to your dashboard.' : 'Register to manage your courses, fees and learning.'}</p>
      </div>
      {error && <div className="error-alert" style={{ color: 'var(--red)', background: 'rgba(239, 68, 68, 0.1)', padding: '10px 14px', borderRadius: '6px', fontSize: '14px', marginBottom: '16px', fontWeight: '500' }}>{error}</div>}
      <form onSubmit={submit}>
        {!isLogin && (
          <>
            <label>
              <span>Full name</span>
              <div className="input-icon"><User /><input name="name" placeholder="Your full name" required /></div>
            </label>
            <label>
              <span>Mobile number</span>
              <div className="input-icon"><Phone /><input name="phone" type="tel" placeholder="+91 98765 43210" required /></div>
            </label>
          </>
        )}
        <label>
          <span>Email address</span>
          <div className="input-icon"><Mail /><input name="email" type="email" placeholder="student@example.com" required /></div>
        </label>
        <label>
          <span>Password</span>
          <div className="input-icon">
            <LockKeyhole />
            <input name="password" type={visible ? 'text' : 'password'} placeholder="Enter your password" required />
            <button type="button" onClick={() => setVisible(!visible)} aria-label="Show password">{visible ? <EyeOff /> : <Eye />}</button>
          </div>
        </label>
        {!isLogin && (
          <label>
            <span>Confirm password</span>
            <div className="input-icon"><LockKeyhole /><input name="confirmPassword" type="password" placeholder="Repeat your password" required /></div>
          </label>
        )}
        {isLogin && (
          <div className="auth-options">
            <label className="checkbox"><input type="checkbox" /> Remember me</label>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>
        )}
        <button className="button button-primary button-wide" disabled={loading}>
          {loading && <LoaderCircle className="spin" />}
          {isLogin ? 'Login to dashboard' : 'Create account'}
        </button>
      </form>
      <p className="auth-switch">{isLogin ? 'New to Onevriksh?' : 'Already have an account?'} <Link href={isLogin ? '/register' : '/login'}>{isLogin ? 'Register now' : 'Login'}</Link></p>
      {isLogin && <div className="demo-login"><strong>Demo access</strong><span>Use any email and password to preview the student portal.</span></div>}
    </div>
  );
}
