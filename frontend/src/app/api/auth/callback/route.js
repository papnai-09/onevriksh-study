import { NextResponse } from 'next/server';

const ACCOUNTS_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL || 'https://accounts.onevriksh.in';
const CLIENT_ID = process.env.OAUTH_CLIENT_ID || 'client_study_123';
const BACKEND_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function GET(request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      return NextResponse.redirect(`${origin}/login?error=missing_code`);
    }

    // Attempt backend express callback handler first
    try {
      const backendRes = await fetch(`${BACKEND_API}/auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || '')}`, {
        method: 'GET',
        headers: {
          'Cookie': request.headers.get('cookie') || '',
          'Accept': 'application/json'
        }
      });

      if (backendRes.ok) {
        const data = await backendRes.json().catch(() => ({}));
        const cookieHeader = backendRes.headers.get('set-cookie');
        const destination = data.user?.role === 'admin' ? '/admin' : '/student';
        
        const response = NextResponse.redirect(`${origin}${destination}`);
        if (cookieHeader) {
          response.headers.set('set-cookie', cookieHeader);
        }
        return response;
      }
    } catch (err) {
      console.warn('Express backend callback error, performing direct Next.js OAuth token exchange:', err.message);
    }

    // Direct Next.js Token Exchange Fallback with accounts.onevriksh.in
    const redirectUri = `${origin}/api/auth/callback`;
    const tokenRes = await fetch(`${ACCOUNTS_URL}/api/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        code,
        redirect_uri: redirectUri
      })
    });

    if (!tokenRes.ok) {
      // If code was already exchanged or error, redirect to login page or callback view
      return NextResponse.redirect(`${origin}/auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || '')}`);
    }

    const tokens = await tokenRes.json();

    // Fetch UserInfo from accounts.onevriksh.in
    const userRes = await fetch(`${ACCOUNTS_URL}/api/oauth/userinfo`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });

    const user = userRes.ok ? await userRes.json() : {};

    const destination = (user.role === 'admin' || user.isAdmin) ? '/admin' : '/student';
    return NextResponse.redirect(`${origin}${destination}`);
  } catch (error) {
    console.error('Error in /api/auth/callback Next.js route:', error);
    const { origin } = new URL(request.url);
    return NextResponse.redirect(`${origin}/login?error=oauth_error`);
  }
}
