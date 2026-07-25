/**
 * Service to handle server-to-server token exchange and OIDC communications with accounts.onevriksh.in
 */

const getIdpBaseUrl = () => process.env.ACCOUNTS_IDP_URL || 'https://accounts.onevriksh.in';
const getClientId = () => process.env.OAUTH_CLIENT_ID || 'client_study_123';
const getClientSecret = () => process.env.OAUTH_CLIENT_SECRET || 'study-oauth-secret';
const getRedirectUri = () => process.env.OAUTH_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';

/**
 * Exchange Authorization Code for Access Token, ID Token & Refresh Token
 * @param {object} params 
 * @param {string} params.code 
 * @param {string} params.codeVerifier 
 * @param {string} [params.redirectUri]
 * @returns {Promise<object>}
 */
export async function exchangeCodeForTokens({ code, codeVerifier, redirectUri }) {
  const idpUrl = getIdpBaseUrl();
  const targetRedirectUri = redirectUri || getRedirectUri();
  const clientId = getClientId();
  const clientSecret = getClientSecret();
  
  const tokenEndpoints = [
    `${idpUrl}/api/oauth/token`,
    `${idpUrl}/oauth/token`
  ];

  const jsonBody = JSON.stringify({
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: targetRedirectUri,
    code_verifier: codeVerifier
  });

  const formBody = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: targetRedirectUri,
    code_verifier: codeVerifier
  }).toString();

  let lastError = null;

  for (const endpoint of tokenEndpoints) {
    // Attempt 1: Content-Type: application/json (as specified in accounts.onevriksh.in API contract)
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: jsonBody
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorText = await response.text();
        lastError = new Error(`Token exchange failed at ${endpoint} (${response.status}): ${errorText}`);
      }
    } catch (err) {
      lastError = err;
    }

    // Attempt 2: Content-Type: application/x-www-form-urlencoded (standard OIDC fallback)
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: formBody
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      // Ignore fallback error
    }
  }

  throw lastError || new Error('Failed to connect to accounts.onevriksh.in token endpoint');
}

/**
 * Fetch authenticated user profile from IdP UserInfo endpoint
 * @param {string} accessToken 
 * @returns {Promise<object>}
 */
export async function fetchUserInfo(accessToken) {
  const idpUrl = getIdpBaseUrl();
  const userInfoEndpoints = [
    `${idpUrl}/api/oauth/userinfo`,
    `${idpUrl}/oauth/userinfo`,
    `${idpUrl}/api/auth/me`
  ];

  let lastError = null;

  for (const endpoint of userInfoEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.user || data;
      } else {
        const errorText = await response.text();
        lastError = new Error(`UserInfo fetch failed at ${endpoint} (${response.status}): ${errorText}`);
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to fetch user profile from accounts.onevriksh.in UserInfo endpoint');
}

/**
 * Refresh tokens with accounts.onevriksh.in
 * @param {string} refreshToken 
 * @returns {Promise<object>}
 */
export async function refreshIdpToken(refreshToken) {
  const idpUrl = getIdpBaseUrl();
  const endpoint = `${idpUrl}/api/oauth/token`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        client_id: getClientId(),
        client_secret: getClientSecret(),
        refresh_token: refreshToken
      })
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn(`Refresh token attempt failed:`, err.message);
  }

  throw new Error('Failed to refresh tokens with accounts.onevriksh.in');
}

/**
 * Revoke session/tokens at accounts.onevriksh.in
 * @param {string} token 
 */
export async function revokeIdpToken(token) {
  const idpUrl = getIdpBaseUrl();
  const endpoint = `${idpUrl}/api/oauth/revoke`;

  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: getClientId(),
        token
      })
    });
  } catch (err) {
    console.warn('Revoke token request failed:', err.message);
  }
}
