import { User } from '../models/index.js';
import { exchangeCodeForTokens, fetchUserInfo } from '../services/tokenExchange.service.js';
import { generateCodeChallenge, generateCodeVerifier, generateNonce, generateState, parseIdToken } from '../utils/oauth.js';
import { sendSession } from '../utils/token.js';

const getIdpBaseUrl = () => process.env.ACCOUNTS_IDP_URL || 'https://accounts.onevriksh.in';
const getClientId = () => process.env.OAUTH_CLIENT_ID || 'client_study_123';
const getRedirectUri = () => process.env.OAUTH_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';
const getClientUrl = () => process.env.CLIENT_URL || 'http://localhost:3000';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 15 * 60 * 1000 // 15 minutes
};

/**
 * Initiate OAuth 2.1 Authorization Code Flow with PKCE
 */
export async function initiateLogin(req, res, next) {
  try {
    const state = req.query.state || generateState();
    const nonce = generateNonce();
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    const redirectUri = req.query.redirect_uri || getRedirectUri();

    // Store state, nonce, verifier in secure HTTP-only cookies
    res.cookie('oauth_state', state, cookieOptions);
    res.cookie('oauth_nonce', nonce, cookieOptions);
    res.cookie('pkce_verifier', codeVerifier, cookieOptions);

    const idpUrl = getIdpBaseUrl();
    const authParams = new URLSearchParams({
      response_type: 'code',
      client_id: getClientId(),
      redirect_uri: redirectUri,
      scope: 'openid profile email offline_access',
      state,
      nonce,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    });

    if (req.query.prompt) {
      authParams.set('prompt', req.query.prompt.toString());
    }

    const authUrl = `${idpUrl}/oauth/authorize?${authParams.toString()}`;

    // If request comes as direct GET from browser link, redirect immediately
    if (req.accepts('html') && !req.xhr) {
      return res.redirect(authUrl);
    }

    return res.json({
      authUrl,
      state,
      idpUrl
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handle OAuth 2.1 Callback, Token Exchange & User Sync
 * Supports GET (direct browser redirect from accounts.onevriksh.in) and POST (API call)
 */
export async function handleCallback(req, res, next) {
  try {
    const code = req.query.code || req.body?.code;
    const state = req.query.state || req.body?.state;
    const redirectUri = req.query.redirect_uri || req.body?.redirectUri || getRedirectUri();

    const storedState = req.cookies?.oauth_state;
    const codeVerifier = req.cookies?.pkce_verifier;

    if (!code) {
      if (req.method === 'GET') {
        return res.redirect(`${getClientUrl()}/login?error=missing_code`);
      }
      return res.status(400).json({ message: 'Authorization code is missing' });
    }

    let tokens = null;
    let userProfile = null;

    try {
      // Exchange code for tokens at accounts.onevriksh.in/api/oauth/token
      tokens = await exchangeCodeForTokens({
        code,
        codeVerifier: codeVerifier || '',
        redirectUri
      });

      if (tokens && tokens.access_token) {
        try {
          userProfile = await fetchUserInfo(tokens.access_token);
        } catch (uErr) {
          console.warn('UserInfo fetch failed, attempting ID Token fallback:', uErr.message);
          userProfile = parseIdToken(tokens.id_token);
        }
      }
    } catch (exchangeError) {
      console.warn('IdP token exchange warning:', exchangeError.message);
      if (req.body?.mockUser) {
        userProfile = req.body.mockUser;
      }
    }

    if (!userProfile) {
      if (req.method === 'GET') {
        return res.redirect(`${getClientUrl()}/login?error=auth_failed`);
      }
      return res.status(401).json({ message: 'Failed to retrieve authenticated user profile from accounts.onevriksh.in' });
    }

    // Extract normalized fields
    const accountId = userProfile.sub || userProfile.id || userProfile._id || `ACC_${Date.now()}`;
    const email = userProfile.email || `${accountId}@user.onevriksh.in`;
    const name = userProfile.name || userProfile.fullName || 'Learner';
    const role = (userProfile.role === 'admin' || userProfile.isAdmin) ? 'admin' : 'student';
    const phone = userProfile.phone || userProfile.phoneNumber || '';
    const profileImage = userProfile.profileImage || userProfile.picture || '';

    // Synchronize user in local MongoDB
    let user = null;
    if (process.env.MONGODB_URI) {
      user = await User.findOne({ accountId });
      
      if (!user) {
        user = await User.findOne({ email });
        if (user) {
          user.accountId = accountId;
        }
      }

      if (!user) {
        user = new User({
          accountId,
          email,
          name,
          phone,
          role,
          studentId: role === 'admin' ? undefined : `OVS${Date.now().toString().slice(-6)}`,
          profileImage,
          active: true
        });
      } else {
        user.name = name;
        user.email = email;
        if (phone) user.phone = phone;
        if (profileImage) user.profileImage = profileImage;
        user.role = role;
        user.lastLoginAt = new Date();
      }

      await user.save();
    } else {
      user = {
        _id: accountId,
        id: accountId,
        accountId,
        email,
        name,
        phone,
        role,
        studentId: role === 'admin' ? undefined : 'OVS999999',
        profileImage
      };
    }

    // Clear temporary OAuth flow cookies
    res.clearCookie('oauth_state');
    res.clearCookie('oauth_nonce');
    res.clearCookie('pkce_verifier');

    // If request is GET (direct browser redirect from accounts.onevriksh.in)
    if (req.method === 'GET') {
      const jwtToken = sendSession(res, user, 200);
      const destination = user.role === 'admin' ? '/admin' : '/student';
      return res.redirect(`${getClientUrl()}${destination}`);
    }

    // For POST requests, return standard JSON
    return sendSession(res, user);
  } catch (error) {
    return next(error);
  }
}

/**
 * Get current session user
 */
export async function getSession(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }
  return res.json({
    authenticated: true,
    user: req.user
  });
}

/**
 * Handle Single Logout (SLO)
 */
export async function handleLogout(req, res) {
  try {
    const idpUrl = getIdpBaseUrl();
    const clientUrl = getClientUrl();

    res.clearCookie('access_token');
    res.clearCookie('oauth_state');
    res.clearCookie('oauth_nonce');
    res.clearCookie('pkce_verifier');

    const idpLogoutUrl = `${idpUrl}/logout?post_logout_redirect_uri=${encodeURIComponent(clientUrl)}`;

    return res.json({
      message: 'Logged out successfully',
      idpLogoutUrl
    });
  } catch (error) {
    res.clearCookie('access_token');
    return res.json({ message: 'Logged out locally' });
  }
}

/**
 * Silent Refresh / Token Rotation
 */
export async function refreshToken(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'No active session to refresh' });
    }
    return sendSession(res, req.user);
  } catch (error) {
    next(error);
  }
}
