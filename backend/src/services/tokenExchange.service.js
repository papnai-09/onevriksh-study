/**
 * Service to handle server-to-server token exchange and OIDC communications with accounts.onevriksh.in
 */

const getIdpBaseUrl = () => process.env.ACCOUNTS_IDP_URL || 'https://accounts.onevriksh.in';
const getClientId = () => process.env.OAUTH_CLIENT_ID || 'study-onevriksh-app';
const getClientSecret = () => process.env.OAUTH_CLIENT_SECRET || 'study-oauth-secret';
const getRedirectUri = () => process.env.OAUTH_REDIRECT_URI || 'https://study.onevriksh.in/auth/callback';

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
  
  // Try standard OIDC token endpoint first, then API fallback
  const tokenEndpoints = [
    `${idpUrl}/oauth/token`,
    `${idpUrl}/api/oauth/token`,
    `${idpUrl}/api/auth/token`
  ];

  const payload = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: getClientId(),
    client_secret: getClientSecret(),
    code,
    redirect_uri: targetRedirectUri,
    code_verifier: codeVerifier,
  });

  let lastError = null;

  for (const endpoint of tokenEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: payload.toString()
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
    `${idpUrl}/oauth/userinfo`,
    `${idpUrl}/api/oauth/userinfo`,
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
        // Return unwrapped user object if inside envelope
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
  const tokenEndpoints = [
    `${idpUrl}/oauth/token`,
    `${idpUrl}/api/oauth/token`
  ];

  const payload = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: getClientId(),
    client_secret: getClientSecret(),
    refresh_token: refreshToken
  });

  for (const endpoint of tokenEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: payload.toString()
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn(`Refresh token attempt failed at ${endpoint}:`, err.message);
    }
  }

  throw new Error('Failed to refresh tokens with accounts.onevriksh.in');
}

/**
 * Revoke session/tokens at accounts.onevriksh.in
 * @param {string} token 
 */
export async function revokeIdpToken(token) {
  const idpUrl = getIdpBaseUrl();
  const revokeEndpoints = [
    `${idpUrl}/oauth/revoke`,
    `${idpUrl}/api/oauth/revoke`
  ];

  const payload = new URLSearchParams({
    client_id: getClientId(),
    client_secret: getClientSecret(),
    token
  });

  for (const endpoint of revokeEndpoints) {
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload.toString()
      });
    } catch (err) {
      // Non-blocking log
      console.warn('Revoke token request failed:', err.message);
    }
  }
}
