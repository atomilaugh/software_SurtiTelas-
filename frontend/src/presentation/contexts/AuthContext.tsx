import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import axios from 'axios';
import {
  User,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { auth } from '@config/firebase';
import { apiClient } from '@infrastructure/http/apiClient';

export type UserRole =
  | 'admin'
  | 'asesor'
  | 'domiciliario'
  | 'cliente';

interface AuthUser {
  uid: string;
  email: string | null;
  role: UserRole;
}

interface LoginResult {
  success: boolean;
  role?: UserRole;
  error?: string;
}

interface AuthContextProps {
  user: AuthUser | null;
  loading: boolean;

  loginWithCredentials: (
    email: string,
    password: string
  ) => Promise<LoginResult>;

  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextProps | null>(
    null
  );

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: Props) => {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const loginWithCredentials = async (
    email: string,
    password: string
  ): Promise<LoginResult> => {
    try {
      const response = await apiClient.post('/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      const authUser: AuthUser = {
        uid: String(user.id) || crypto.randomUUID(),
        email: user.email,
        role: user.role as UserRole,
      };

      localStorage.setItem('token', token);
      localStorage.setItem('auth_user', JSON.stringify(authUser));
      setUser(authUser);

      return {
        success: true,
        role: authUser.role,
      };
    } catch (error) {
      console.error('Error en login:', error);
      let message = 'Credenciales inválidas';

      if (axios.isAxiosError(error) && error.response?.data?.error) {
        message = error.response.data.error;
      }

      return {
        success: false,
        error: message,
      };
    }
  };

  useEffect(() => {
    const storedUser =
      localStorage.getItem('auth_user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser: User | null) => {
          if (firebaseUser) {
            const authUser: AuthUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: 'cliente',
            };

            setUser(authUser);

            localStorage.setItem(
              'auth_user',
              JSON.stringify(authUser)
            );
          }
        }
      );

    setLoading(false);

    return unsubscribe;
  }, []);

  const logout = async () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('token');

    setUser(null);

    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth debe usarse dentro de AuthProvider'
    );
  }

  return context;
};



