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

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await api.login(email, password);
      if (data && data.user) {
        setUser(data.user);
        return data.user;
      }
      throw new Error('Invalid login response');
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, phone, password) => {
    setLoading(true);
    try {
      const data = await api.register(name, email, phone, password);
      if (data && data.user) {
        setUser(data.user);
        return data.user;
      }
      throw new Error('Invalid register response');
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await api.logout();
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, reloadUser: fetchUser }}>
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
