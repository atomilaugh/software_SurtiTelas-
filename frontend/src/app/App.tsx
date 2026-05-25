import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { SurtitelasLanding } from './pages/SurtitelasLanding';
import AdminDashboard from './components/AdminDashboard';
import { SimpleLoginPage } from './components/SimpleLoginPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { apiClient } from '@infrastructure/http/apiClient';

type UserRole = 'admin' | 'asesor' | 'domiciliario' | 'cliente' | null;

interface User {
  role: UserRole;
  name: string;
  email: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [user, setUser] = useState<User | null>(null);

  const handleLoginRequest = () => {
    setCurrentView('login');
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser({
        role: user.role === 'user' ? 'cliente' : user.role,
        name: user.name || 'Usuario',
        email: user.email,
      });
      setCurrentView('dashboard');
      return true;
    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCurrentView('landing');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const handleNavigateToLanding = () => {
    setCurrentView('landing');
  };

  const handleUpdateUserName = (newName: string) => {
    if (user) {
      setUser({ ...user, name: newName });
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return (
          <SimpleLoginPage
            onLogin={handleLogin}
            onBackToLanding={handleBackToLanding}
          />
        );
      case 'dashboard':
        if (!user) {
          setCurrentView('landing');
          return null;
        }

        // Mostrar AdminDashboard para todos los roles (admin, asesor, domiciliario, cliente)
        return (
          <AdminDashboard
            onLogout={handleLogout}
            userRole={user.role as 'admin' | 'asesor' | 'domiciliario' | 'cliente'}
            userName={user.name}
            onUpdateUserName={handleUpdateUserName}
            onNavigateToLanding={handleNavigateToLanding}
          />
        );
      case 'landing':
      default:
        return (
          <SurtitelasLanding
            onLoginRequest={handleLoginRequest}
            user={user}
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      {renderContent()}
      <Toaster />
    </ThemeProvider>
  );
}



