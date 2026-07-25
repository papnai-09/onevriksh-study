'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const data = await api.getMe();
      if (data && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  /**
   * Initiate OAuth 2.1 authentication flow with accounts.onevriksh.in
   */
  const login = useCallback(async (options = {}) => {
    setLoading(true);
    try {
      const authUrl = await api.initiateLogin(options);
      if (typeof window !== 'undefined') {
        window.location.href = authUrl;
      }
    } catch (error) {
      console.error('Failed to initiate authentication with accounts.onevriksh.in:', error);
      setLoading(false);
    }
  }, []);

  /**
   * Initiate OAuth 2.1 registration flow with accounts.onevriksh.in
   */
  const register = useCallback(async () => {
    return login({ prompt: 'signup' });
  }, [login]);

  /**
   * Single Logout - Invalidates local session and IdP session
   */
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.logout();
      setUser(null);
      if (typeof window !== 'undefined' && res && res.idpLogoutUrl) {
        window.location.href = res.idpLogoutUrl;
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setUser(null);
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        reloadUser: fetchUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
