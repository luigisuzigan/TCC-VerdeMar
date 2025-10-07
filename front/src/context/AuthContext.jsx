import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken } from '../api/client.js';

const AuthCtx = createContext(null);

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY) || 'null'); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || '');

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const isAdmin = user?.role === 'ADMIN';
  const isSeller = user?.role === 'SELLER';

  async function login({ email, password, remember = true }) {
    const { data } = await api.post('/auth/login', { email, password });
    setUser(data.user);
    setToken(data.token);
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, data.token);
    storage.setItem(USER_KEY, JSON.stringify(data.user));
    if (!remember) localStorage.removeItem(TOKEN_KEY), localStorage.removeItem(USER_KEY);
    return data.user;
  }

  async function register({ name, email, password }) {
    const { data } = await api.post('/auth/register', { name, email, password });
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data.user;
  }

  function logout() {
    setUser(null);
    setToken('');
    setAuthToken('');
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  }

  const value = useMemo(() => ({ user, token, isAdmin, isSeller, login, register, logout }), [user, token, isAdmin, isSeller]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
