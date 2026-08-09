import { createContext, useContext, useEffect, useState } from 'react';
import * as adminService from '../services/adminService';

const AdminAuthContext = createContext(null);
const KEY = 'ecobazar_admin_auth';

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setAdmin(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { admin: a } = await adminService.adminLogin(email, password);
    setAdmin(a);
    localStorage.setItem(KEY, JSON.stringify(a));
    return a;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem(KEY);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loading, isAuthenticated: !!admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
