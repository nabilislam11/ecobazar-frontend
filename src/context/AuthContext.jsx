import { createContext, useContext, useState } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('ecobazar_user');

    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const register = async (data) => {
    setLoading(true);

    try {
      const response = await registerUser(data);

      return response;
    } finally {
      setLoading(false);
    }
  };
  const login = async (data) => {
    setLoading(true)
    try {
      const response = await loginUser(data)
      // পরে backend token দিলে এখানে save করবে
      // if (response?.token) {
      //   localStorage.setItem(
      //     'ecobazar_token',
      //     response.token
      //   );
      // }
      if (response?.data) {
        setUser(response?.data);

        localStorage.setItem(
          'ecobazar_user',
          JSON.stringify(response?.data)
        );
      }
      return response
    } finally { setLoading(false) }
  }

  const logout = () => {
    localStorage.removeItem('ecobazar_token');
    localStorage.removeItem('ecobazar_user');

    setUser(null);
  };
  const isAuthenticated = !!user;
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}