import crypto from 'crypto';

/**
 * Base64 URL encoding helper according to RFC 7636
 * @param {Buffer} buffer 
 * @returns {string}
 */
export function base64UrlEncode(buffer) {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Generate a high-entropy cryptographically random PKCE code verifier (48-128 chars)
 * @returns {string}
 */
export function generateCodeVerifier() {
  return base64UrlEncode(crypto.randomBytes(32));
}

/**
 * Generate PKCE code challenge (S256 method)
 * @param {string} codeVerifier 
 * @returns {string}
 */
export function generateCodeChallenge(codeVerifier) {
  const hash = crypto.createHash('sha256').update(codeVerifier).digest();
  return base64UrlEncode(hash);
}

/**
 * Generate secure random state token for CSRF protection
 * @returns {string}
 */
export function generateState() {
  return crypto.randomBytes(24).toString('hex');
}

/**
 * Generate secure random nonce token for replay protection in OIDC
 * @returns {string}
 */
export function generateNonce() {
  return crypto.randomBytes(24).toString('hex');
}

/**
 * Parse OIDC ID token payload safely (JWT decode without secret verification for user info extraction,
 * full validation happens on IdP server-to-server token endpoint response)
 * @param {string} idToken 
 * @returns {object|null}
 */
export function parseIdToken(idToken) {
  if (!idToken || typeof idToken !== 'string') return null;
  try {
    const parts = idToken.split('.');
    if (parts.length !== 3) return null;
    const payloadJson = Buffer.from(parts[1], 'base64').toString('utf8');
    return JSON.parse(payloadJson);
  } catch (err) {
    console.error('Error parsing OIDC ID token:', err.message);
    return null;
  }
}
