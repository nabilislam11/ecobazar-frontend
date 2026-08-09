import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);
const KEY = 'ecobazar_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { user: u } = await authService.login(email, password);
    setUser(u);
    localStorage.setItem(KEY, JSON.stringify(u));
    return u;
  };

  const register = async (payload) => {
    const { user: u } = await authService.register(payload);
    setUser(u);
    localStorage.setItem(KEY, JSON.stringify(u));
    return u;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
