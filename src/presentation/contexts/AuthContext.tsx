// src/presentation/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithCredentials: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

// Credenciales de prueba
const CREDENTIALS: Record<string, { password: string; name: string }> = {
  'demo@surtitelas.com': { password: 'demo123', name: 'Usuario Demo' },
};

const STORAGE_KEY = 'surtitelas_auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setUser(data.user);
        setRole(data.role);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const loginWithCredentials = (email: string, password: string): { success: boolean; error?: string } => {
    const cred = CREDENTIALS[email as keyof typeof CREDENTIALS];
    
    if (cred && cred.password === password) {
      const authUser: AuthUser = {
        id: email,
        name: cred.name,
        email: email,
      };
      
      setUser(authUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: authUser }));
      return { success: true };
    }
    
    return { success: false, error: 'Credenciales incorrectas' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading: loading,
    loginWithCredentials,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return ctx;
};
