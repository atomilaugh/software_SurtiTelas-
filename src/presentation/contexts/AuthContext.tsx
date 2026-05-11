// src/presentation/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'admin' | 'asesor' | 'domiciliario' | 'cliente';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => { success: boolean; error?: string };
  loginWithCredentials: (email: string, password: string) => { success: boolean; role?: UserRole; error?: string };
  logout: () => void;
}

// Credenciales de prueba
const CREDENTIALS: Record<string, { password: string; role: UserRole; name: string }> = {
  // Admin
  'admin@surtitelas.com': { password: 'admin123', role: 'admin', name: 'Administrador' },
  // Asesor
  'asesor@surtitelas.com': { password: 'asesor123', role: 'asesor', name: 'Ana Jiménez' },
  // Domiciliario
  'domiciliario@surtitelas.com': { password: 'domi123', role: 'domiciliario', name: 'María García' },
  // Cliente
  'cliente@surtitelas.com': { password: 'cliente123', role: 'cliente', name: 'Cliente Example' },
};

const STORAGE_KEY = 'surtitelas_auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
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

  const login = (email: string, password: string, role: UserRole): { success: boolean; error?: string } => {
    const cred = CREDENTIALS[email as keyof typeof CREDENTIALS];
    
    if (cred && cred.password === password && cred.role === role) {
      const authUser: AuthUser = {
        id: email,
        name: cred.name,
        email: email,
        role: role,
      };
      
      setUser(authUser);
      setRole(role);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: authUser, role: role }));
      return { success: true };
    }
    
    return { success: false, error: 'Credenciales inválidas para este rol' };
  };

  const loginWithCredentials = (email: string, password: string): { success: boolean; role?: UserRole; error?: string } => {
    const cred = CREDENTIALS[email as keyof typeof CREDENTIALS];
    
    if (cred && cred.password === password) {
      const authUser: AuthUser = {
        id: email,
        name: cred.name,
        email: email,
        role: cred.role,
      };
      
      setUser(authUser);
      setRole(cred.role);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: authUser, role: cred.role }));
      return { success: true, role: cred.role };
    }
    
    return { success: false, error: 'Credenciales incorrectas' };
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value: AuthContextType = {
    user,
    role,
    isAuthenticated: !!user,
    isLoading: loading,
    loading,
    login,
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
