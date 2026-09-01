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
   * Send OTP to Mobile Number
   */
  const sendOtp = useCallback(async (phone) => {
    return await api.sendOtp(phone);
  }, []);

  /**
   * Mobile OTP Login
   */
  const login = useCallback(async (credentials) => {
    const data = await api.login(credentials);
    if (data && data.user) {
      setUser(data.user);
      return data.user;
    }
    throw new Error(data?.message || 'Login failed');
  }, []);

  /**
   * Mobile Registration
   */
  const register = useCallback(async (userData) => {
    const data = await api.register(userData);
    if (data && data.user) {
      setUser(data.user);
      return data.user;
    }
    throw new Error(data?.message || 'Registration failed');
  }, []);

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    try {
      await api.logout();
    } catch (err) {
      console.warn('Logout:', err.message);
    } finally {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isStudent: user?.role === 'student',
        sendOtp,
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
