'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/utils/api';
import { Brand } from '@/components/Brand';
import { ShieldCheck, AlertCircle, LoaderCircle } from 'lucide-react';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, reloadUser } = useAuth();
  
  const [status, setStatus] = useState('authenticating'); // authenticating | success | error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      setStatus('error');
      setErrorMessage('Authorization code was not provided by accounts.onevriksh.in');
      return;
    }

    let isMounted = true;

    async function processAuth() {
      try {
        const res = await api.handleCallback(code, state);
        if (!isMounted) return;

        if (res && res.user) {
          setUser(res.user);
          await reloadUser();
          setStatus('success');
          
          const destination = res.user.role === 'admin' ? '/admin' : '/student';
          setTimeout(() => {
            router.replace(destination);
          }, 800);
        } else {
          throw new Error(res?.message || 'Failed to authenticate session with accounts.onevriksh.in');
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('OAuth Callback Error:', err);
        setStatus('error');
        setErrorMessage(err.message || 'Authentication exchange failed. Please try logging in again.');
      }
    }

    processAuth();

    return () => {
      isMounted = false;
    };
  }, [searchParams, router, setUser, reloadUser]);

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '440px',
        width: '100%',
        background: 'var(--surface, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Brand />
        </div>

        {status === 'authenticating' && (
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 1.5rem',
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563eb'
            }}>
              <LoaderCircle size={32} className="spin" />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--foreground)' }}>
              Authenticating with Onevriksh Accounts
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground, #64748b)' }}>
              Verifying your secure token and preparing your learning dashboard...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 1.5rem',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669'
            }}>
              <ShieldCheck size={32} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--foreground)' }}>
              Authentication Successful
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground, #64748b)' }}>
              Welcome back! Redirecting you to your dashboard...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 1.5rem',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#dc2626'
            }}>
              <AlertCircle size={32} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--foreground)' }}>
              Authentication Failed
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#dc2626', marginBottom: '1.5rem' }}>
              {errorMessage}
            </p>
            <button
              onClick={() => router.push('/login')}
              className="button button-primary button-wide"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoaderCircle size={32} className="spin" />
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
