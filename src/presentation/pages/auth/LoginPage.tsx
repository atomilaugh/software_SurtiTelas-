// src/presentation/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { Mail, Lock, Eye, EyeOff, Users, Shield, Truck } from 'lucide-react';
import { auth } from '@config/firebase';
import { useAuth } from '@presentation/contexts/AuthContext';
import toast from 'react-hot-toast';
import '../styles/AuthPages.css';

type UserRole = 'admin' | 'asesor' | 'domiciliario' | 'cliente';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginWithCredentials } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('cliente');

  const roleInfo = {
    admin: { icon: Shield, label: 'Administrador', color: '#DC2626', desc: 'Gestión total del sistema' },
    asesor: { icon: Users, label: 'Asesor de Ventas', color: '#2563EB', desc: 'Gestión de clientes y pedidos' },
    domiciliario: { icon: Truck, label: 'Domiciliario', color: '#16A34A', desc: 'Entregas y rutas' },
    cliente: { icon: Users, label: 'Cliente', color: '#6B7280', desc: 'Comprar en línea' },
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // If admin/asesor/domiciliario, use role-based login
    if (selectedRole !== 'cliente') {
      const result = login(email, password, selectedRole);
      
      if (result.success) {
        toast.success(`Bienvenido, ${roleInfo[selectedRole].label}!`);
        
        if (selectedRole === 'admin') navigate('/admin/dashboard', { replace: true });
        else if (selectedRole === 'asesor') navigate('/asesor/dashboard', { replace: true });
        else if (selectedRole === 'domiciliario') navigate('/domiciliario/dashboard', { replace: true });
      } else {
        toast.error(result.error || 'Credenciales incorrectas');
      }
    } else {
      // Client login with Firebase
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Sesión iniciada correctamente');
        navigate('/catalogo', { replace: true });
      } catch (err: any) {
        toast.error('Correo o contraseña incorrectos');
      }
    }
    
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    if (selectedRole !== 'cliente') {
      toast.error('Google solo está disponible para clientes');
      return;
    }
    
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Sesión iniciada con Google');
      navigate('/catalogo', { replace: true });
    } catch (err) {
      toast.error('Error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Iniciar Sesión</h1>
          <p>Selecciona tu rol e ingresa tus credenciales</p>
        </div>

        {/* Role Selection */}
        <div className="role-selector">
          {(['admin', 'asesor', 'domiciliario', 'cliente'] as UserRole[]).map((role) => {
            const Info = roleInfo[role];
            return (
              <button
                key={role}
                className={`role-option ${selectedRole === role ? 'active' : ''}`}
                onClick={() => setSelectedRole(role)}
                style={{ 
                  borderColor: selectedRole === role ? Info.color : '#e5e5e5',
                  background: selectedRole === role ? `${Info.color}10` : 'white'
                }}
              >
                <Info.icon size={20} style={{ color: Info.color }} />
                <div>
                  <span className="role-label">{Info.label}</span>
                  <span className="role-desc">{Info.desc}</span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedRole !== 'cliente' && (
          <div className="demo-credentials">
            <strong>Credenciales de prueba:</strong>
            {selectedRole === 'admin' && <span>admin@surtitelas.com / admin123</span>}
            {selectedRole === 'asesor' && <span>asesor@surtitelas.com / asesor123</span>}
            {selectedRole === 'domiciliario' && <span>domiciliario@surtitelas.com / domi123</span>}
          </div>
        )}

        {selectedRole === 'cliente' ? (
          <>
            <button
              className="auth-google-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <span className="auth-google-icon">G</span>
              <span>Continuar con Google</span>
            </button>

            <div className="auth-divider">
              <span>o</span>
            </div>
          </>
        ) : (
          <div className="auth-divider">
            <span>Ingresa tus credenciales</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-field">
            <label>Correo electrónico</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon">
                <Mail size={16} />
              </span>
              <input
                type="email"
                placeholder={
                  selectedRole === 'admin' ? 'admin@surtitelas.com' :
                  selectedRole === 'asesor' ? 'asesor@surtitelas.com' :
                  selectedRole === 'domiciliario' ? 'domiciliario@surtitelas.com' :
                  'correo@ejemplo.com'
                }
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Contraseña</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon">
                <Lock size={16} />
              </span>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="auth-input-toggle"
                onClick={() => setShowPass(p => !p)}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-primary-btn"
            disabled={loading}
            style={{ 
              background: roleInfo[selectedRole].color 
            }}
          >
            {loading ? 'Verificando...' : `Iniciar como ${roleInfo[selectedRole].label}`}
          </button>
        </form>

        <div className="auth-footer-text">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="auth-link">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;






