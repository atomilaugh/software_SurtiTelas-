import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  QrCode, 
  CheckCircle, 
  History, 
  User,
  LogOut,
  Menu,
  Bell,
  Navigation,
  Phone,
  X,
  Search,
  Edit,
  XCircle,
  Moon,
  Sun,
  Package,
  Star,
  MapPinned,
  Camera,
  ClipboardList,
  Clock,
  Circle
} from 'lucide-react';
import { useAuth } from '@presentation/contexts/AuthContext';
import toast from 'react-hot-toast';
import '../styles/DomiciliarioDashboard.css';

interface Ruta {
  id: number;
  numeroPedido: string;
  codigoQR: string;
  cliente: { nombre: string; telefono: string; direccion: string; barrio: string };
  productos: { nombre: string; cantidad: number }[];
  valorTotal: number;
  metodoPago: 'efectivo' | 'transferencia' | 'pagado';
  estado: 'pendiente' | 'en_ruta' | 'completada' | 'anulada';
}

interface Historial {
  id: number;
  numeroPedido: string;
  cliente: string;
  valorTotal: number;
  fecha: string;
  hora: string;
  estado: 'completada' | 'anulada';
  motivoAnulacion?: string;
}

const rutasIniciales: Ruta[] = [
  { id: 1, numeroPedido: 'PED-2024-001', codigoQR: 'QR-001', cliente: { nombre: 'María González', telefono: '+573001234567', direccion: 'Calle 45 #23-15, Apto 302', barrio: 'Chapinero' }, productos: [{ nombre: 'Camiseta Premium', cantidad: 2 }], valorTotal: 142000, metodoPago: 'efectivo', estado: 'pendiente' },
  { id: 2, numeroPedido: 'PED-2024-002', codigoQR: 'QR-002', cliente: { nombre: 'Carlos Mendoza', telefono: '+573105551234', direccion: 'Carrera 50 #12-30', barrio: 'El Refugio' }, productos: [{ nombre: 'Sudadera', cantidad: 1 }], valorTotal: 85000, metodoPago: 'transferencia', estado: 'en_ruta' },
  { id: 3, numeroPedido: 'PED-2024-003', codigoQR: 'QR-003', cliente: { nombre: 'Ana Rodríguez', telefono: '+573209876543', direccion: 'Avenida 68 #45-78', barrio: 'Villa Verde' }, productos: [{ nombre: 'Camisetas', cantidad: 3 }], valorTotal: 114000, metodoPago: 'pagado', estado: 'pendiente' },
];

const historialInicial: Historial[] = [
  { id: 1, numeroPedido: 'PED-2024-000', cliente: 'Pedro López', valorTotal: 95000, fecha: '10 Abr', hora: '10:30 AM', estado: 'completada' },
  { id: 2, numeroPedido: 'PED-2024-005', cliente: 'Laura Martínez', valorTotal: 78000, fecha: '9 Abr', hora: '02:15 PM', estado: 'anulada', motivoAnulacion: 'Cliente no encontrado' },
];

export const DomiciliarioDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeSection, setActiveSection] = useState<'rutas' | 'escanear' | 'confirmacion' | 'historial' | 'perfil'>('rutas');
  const [activeDeliveryTab, setActiveDeliveryTab] = useState<'pendientes' | 'en_ruta' | 'completadas' | 'anuladas'>('pendientes');
  const [rutas, setRutas] = useState<Ruta[]>(rutasIniciales);
  const [selectedRuta, setSelectedRuta] = useState<Ruta | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAnular, setShowAnular] = useState(false);
  const [confirmForm, setConfirmForm] = useState({ nombre: '', cedula: '' });
  const [anularForm, setAnularForm] = useState({ motivo: '', detalles: '' });
  const [qrInput, setQrInput] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRutaStatus, setActiveRutaStatus] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [profileData, setProfileData] = useState({
    nombre: 'María',
    apellido: 'García López',
    cedula: '1234567890',
    tipoVehiculo: 'motocicleta',
    placa: 'ABC-123',
    licencia: 'C2-87654321',
    telefono: '+57 310 555 9876',
    email: 'maria.garcia@surtitelas.com',
    direccion: 'Calle 80 #45-23, Bogotá',
    banco: 'Bancolombia',
    tipoCuenta: 'ahorros',
    numeroCuenta: '1234567890'
  });
  const [historial, setHistorial] = useState<Historial[]>(historialInicial);

  useEffect(() => { 
    document.documentElement.setAttribute('data-theme', theme); 
  }, [theme]);

  const toggleTheme = () => setTheme(p => p === 'light' ? 'dark' : 'light');
  
  const logoLight = '/assets/images/placeholders/logo-light.svg';
  const logoDark = '/assets/images/placeholders/logo-dark.svg';

  const cambiarEstadoRuta = (rutaId: number, nuevoEstado: Ruta['estado']) => {
    setRutas(prev => prev.map(r => 
      r.id === rutaId ? { ...r, estado: nuevoEstado } : r
    ));
    
    const ruta = rutas.find(r => r.id === rutaId);
    if (ruta && nuevoEstado === 'completada') {
      const nuevoRegistro: Historial = {
        id: Date.now(),
        numeroPedido: ruta.numeroPedido,
        cliente: ruta.cliente.nombre,
        valorTotal: ruta.valorTotal,
        fecha: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }),
        hora: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        estado: 'completada'
      };
      setHistorial(prev => [nuevoRegistro, ...prev]);
      toast.success('Entrega completada exitosamente');
    }
  };

  const buscarPorQR = () => {
    if (!qrInput.trim()) {
      toast.error('Ingresa un código QR');
      return;
    }
    
    const rutaEncontrada = rutas.find(r => 
      r.codigoQR.toLowerCase() === qrInput.trim().toLowerCase() || 
      r.numeroPedido.toLowerCase() === qrInput.trim().toLowerCase()
    );
    
    if (rutaEncontrada) {
      setSelectedRuta(rutaEncontrada);
      setShowDetails(true);
      toast.success('Pedido encontrado');
    } else {
      toast.error('Pedido no encontrado');
    }
  };

  const confirmarEntrega = () => {
    if (!confirmForm.nombre || !confirmForm.cedula) {
      toast.error('Completa todos los campos requeridos');
      return;
    }
    
    if (selectedRuta) {
      cambiarEstadoRuta(selectedRuta.id, 'completada');
      setShowConfirm(false);
      setShowDetails(false);
      setConfirmForm({ nombre: '', cedula: '' });
    }
  };

  const anularPedido = () => {
    if (!anularForm.motivo) {
      toast.error('Selecciona un motivo');
      return;
    }
    
    if (selectedRuta) {
      const nuevoRegistro: Historial = {
        id: Date.now(),
        numeroPedido: selectedRuta.numeroPedido,
        cliente: selectedRuta.cliente.nombre,
        valorTotal: selectedRuta.valorTotal,
        fecha: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }),
        hora: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        estado: 'anulada',
        motivoAnulacion: anularForm.motivo
      };
      setHistorial(prev => [nuevoRegistro, ...prev]);
      cambiarEstadoRuta(selectedRuta.id, 'anulada');
      setShowAnular(false);
      setShowDetails(false);
      setAnularForm({ motivo: '', detalles: '' });
      toast.success('Pedido anulado');
    }
  };

  const guardarPerfil = () => {
    setIsEditingProfile(false);
    toast.success('Perfil actualizado correctamente');
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleLogout = () => { logout(); toast.success('Sesión cerrada'); navigate('/login'); };
  
  const getInitials = () => user?.name?.split(' ').map(n => n[0]).join('') || 'MG';

  const formatCurrency = (v: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(v);

  const rutasPendientes = rutas.filter(r => r.estado === 'pendiente');
  const rutasEnRuta = rutas.filter(r => r.estado === 'en_ruta');
  const rutasCompletadas = rutas.filter(r => r.estado === 'completada');
  const rutasAnuladas = rutas.filter(r => r.estado === 'anulada');

  const getSaludo = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const menuItems = [
    { id: 'rutas', icon: <Navigation size={18} />, label: 'Rutas Asignadas' },
    { id: 'escanear', icon: <QrCode size={18} />, label: 'Escaneo QR' },
    { id: 'confirmacion', icon: <CheckCircle size={18} />, label: 'Confirmación' },
    { id: 'historial', icon: <History size={18} />, label: 'Historial' },
    { id: 'perfil', icon: <User size={18} />, label: 'Mi Perfil' },
  ];

  const getRutasFiltradas = () => {
    switch (activeDeliveryTab) {
      case 'pendientes': return rutasPendientes;
      case 'en_ruta': return rutasEnRuta;
      case 'completadas': return rutasCompletadas;
      case 'anuladas': return rutasAnuladas;
      default: return [];
    }
  };

  const handleRutaClick = (ruta: Ruta) => {
    setSelectedRuta(ruta);
    setShowDetails(true);
  };

  const handleIniciarRuta = (rutaId: number) => {
    cambiarEstadoRuta(rutaId, 'en_ruta');
    setActiveRutaStatus(rutaId);
    setCurrentStep(1);
    toast.success('Ruta iniciada');
  };

  const handleCloseStatus = () => {
    setActiveRutaStatus(null);
    setCurrentStep(0);
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <Package size={16} />;
      case 2: return <MapPin size={16} />;
      case 3: return <CheckCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getStepLabel = (step: number) => {
    switch (step) {
      case 1: return 'En camino';
      case 2: return 'En puerta';
      case 3: return 'Entregado';
      default: return '';
    }
  };

  const renderRutaCard = (ruta: Ruta) => (
    <div key={ruta.id} className="ruta-card" onClick={() => handleRutaClick(ruta)}>
      <div className="ruta-header">
        <div className="ruta-order">{ruta.numeroPedido}</div>
        <div className={`ruta-badge ${ruta.estado}`}>
          {ruta.estado === 'pendiente' && 'Pendiente'}
          {ruta.estado === 'en_ruta' && 'En Ruta'}
          {ruta.estado === 'completada' && 'Completada'}
          {ruta.estado === 'anulada' && 'Anulada'}
        </div>
      </div>
      <div className="ruta-client">
        <User size={14} />
        <span>{ruta.cliente.nombre}</span>
      </div>
      <div className="ruta-address">
        <MapPin size={14} />
        <span>{ruta.cliente.direccion} - {ruta.cliente.barrio}</span>
      </div>
      <div className="ruta-footer">
        <div className="ruta-amount">{formatCurrency(ruta.valorTotal)}</div>
        <div className="ruta-payment">{ruta.metodoPago === 'efectivo' ? 'ðŸ’µ' : ruta.metodoPago === 'transferencia' ? 'ðŸ“±' : 'âœ…'} {ruta.metodoPago}</div>
      </div>
      {ruta.estado === 'pendiente' && (
        <button className="ruta-start-btn" onClick={(e) => { e.stopPropagation(); handleIniciarRuta(ruta.id); }}>
          <Navigation size={14} /> Iniciar
        </button>
      )}
    </div>
  );

  return (
    <div className="domi-dashboard">
      <aside className={`domi-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img src={theme === 'light' ? logoLight : logoDark} alt="Surtitelas" className="sidebar-logo-img" onError={(e) => { const t = e.currentTarget; if (!t.src.includes('placeholders')) t.src = '/assets/images/placeholders/logo-light.svg'; }} />
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => { setActiveSection(item.id as any); setSidebarOpen(false); }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main className="domi-main">
        <header className="domi-header-top">
          <button className="menu-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}><Menu size={20} /></button>
        <div className="header-top-right">
          <button className="header-btn" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="notif-btn">
            <Bell size={20} />
            <span className="notif-badge">1</span>
          </button>
          <div className="user-header-info">
            <span className="user-name">{user?.name || 'María García López'}</span>
            <div className="user-avatar">{getInitials()}</div>
          </div>
        </div>
        </header>

        <div className="domi-content">
          {/* ============ RUTAS ASIGNADAS (POR DEFECTO) ============ */}
          {activeSection === 'rutas' && (
            <>
              {/* Welcome Banner */}
              <div className="welcome-banner">
                <div className="welcome-text">
                  <h1>¡{getSaludo()}, {user?.name?.split(' ')[0] || 'María'}!</h1>
                  <p>Bienvenida al sistema de gestión de entregas</p>
                </div>
                <div className="welcome-user">
                  <div className="welcome-avatar">{getInitials()}</div>
                  <span className="welcome-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{rutasPendientes.length}</div>
                  <div className="stat-label">PENDIENTES</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value route">{rutasEnRuta.length}</div>
                  <div className="stat-label">EN RUTA</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value done">{rutasCompletadas.length}</div>
                  <div className="stat-label">COMPLETADAS HOY</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value rating">4.8 <Star size={16} className="star-icon" /></div>
                  <div className="stat-label">CALIFICACIÃ“N</div>
                </div>
              </div>

              <h2 className="section-title"><span className="section-icon"><Navigation size={20} /></span> Rutas Asignadas</h2>
              
              <div className="deliveries-tabs">
                <button 
                  className={`delivery-tab ${activeDeliveryTab === 'pendientes' ? 'active' : ''}`}
                  onClick={() => setActiveDeliveryTab('pendientes')}
                >
                  Pendientes <span className="tab-count">{rutasPendientes.length}</span>
                </button>
                <button 
                  className={`delivery-tab ${activeDeliveryTab === 'en_ruta' ? 'active' : ''}`}
                  onClick={() => setActiveDeliveryTab('en_ruta')}
                >
                  En Ruta <span className="tab-count">{rutasEnRuta.length}</span>
                </button>
                <button 
                  className={`delivery-tab ${activeDeliveryTab === 'completadas' ? 'active' : ''}`}
                  onClick={() => setActiveDeliveryTab('completadas')}
                >
                  Completadas <span className="tab-count">{rutasCompletadas.length}</span>
                </button>
                <button 
                  className={`delivery-tab ${activeDeliveryTab === 'anuladas' ? 'active' : ''}`}
                  onClick={() => setActiveDeliveryTab('anuladas')}
                >
                  Anuladas <span className="tab-count">{rutasAnuladas.length}</span>
                </button>
              </div>

              <div className="rutas-grid">
                {getRutasFiltradas().length > 0 ? (
                  getRutasFiltradas().map(ruta => renderRutaCard(ruta))
                ) : (
                  <div className="empty-state">
                    <Package size={32} />
                    <p>No hay entregas en este estado</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ============ ESCANEAR QR ============ */}
          {activeSection === 'escanear' && (
            <div className="qr-section">
              <div className="qr-header">
                <div className="qr-icon"><QrCode size={40} /></div>
                <h2>Escanear Código QR</h2>
                <p>Ingresa el código QR del pedido para ver los detalles</p>
              </div>

              <div className="qr-input-group">
                <label className="qr-label">CÃ“DIGO QR DEL PEDIDO</label>
                <div className="qr-input-wrapper">
                  <input 
                    type="text" 
                    placeholder="Ej: QR-001 o PED-2024-001" 
                    value={qrInput}
                    onChange={e => setQrInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && buscarPorQR()}
                  />
                  <button className="qr-search-btn" onClick={buscarPorQR}><Search size={18} /> Buscar</button>
                </div>
                <button className="camera-btn">
                  <Camera size={18} />
                  <span>Escanear con Cámara</span>
                </button>
              </div>

              <div className="qr-examples">
                <div className="examples-column">
                  <label>CÃ“DIGOS QR:</label>
                  <button className="example-btn" onClick={() => { setQrInput('QR-001'); buscarPorQR(); }}>QR-001</button>
                  <button className="example-btn" onClick={() => { setQrInput('QR-002'); buscarPorQR(); }}>QR-002</button>
                  <button className="example-btn" onClick={() => { setQrInput('QR-003'); buscarPorQR(); }}>QR-003</button>
                </div>
                <div className="examples-column">
                  <label>PEDIDOS:</label>
                  <button className="example-btn" onClick={() => { setQrInput('PED-2024-001'); buscarPorQR(); }}>PED-2024-001</button>
                  <button className="example-btn" onClick={() => { setQrInput('PED-2024-002'); buscarPorQR(); }}>PED-2024-002</button>
                  <button className="example-btn" onClick={() => { setQrInput('PED-2024-003'); buscarPorQR(); }}>PED-2024-003</button>
                </div>
              </div>
            </div>
          )}

          {/* ============ CONFIRMACIÃ“N ============ */}
          {activeSection === 'confirmacion' && (
            <div className="confirm-section">
              <div className="confirm-header">
                <div className="confirm-icon"><CheckCircle size={40} /></div>
                <h2>Confirmar Entrega</h2>
                <p>Selecciona un pedido para confirmar la entrega</p>
              </div>

              <div className="confirm-list">
                {rutasEnRuta.length > 0 ? (
                  rutasEnRuta.map(ruta => (
                    <div key={ruta.id} className="confirm-card" onClick={() => { setSelectedRuta(ruta); setShowDetails(true); }}>
                      <div className="confirm-card-header">
                        <span className="confirm-order">{ruta.numeroPedido}</span>
                        <span className="confirm-badge">En Ruta</span>
                      </div>
                      <div className="confirm-client">
                        <User size={16} />
                        <span>{ruta.cliente.nombre}</span>
                      </div>
                      <div className="confirm-address">
                        <MapPin size={16} />
                        <span>{ruta.cliente.direccion}</span>
                      </div>
                      <div className="confirm-footer">
                        <span className="confirm-amount">{formatCurrency(ruta.valorTotal)}</span>
                        <button className="confirm-btn"><CheckCircle size={16} /> Confirmar</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state confirm-empty">
                    <div className="empty-icon confirm-empty-icon"><Package size={40} /></div>
                    <p className="empty-title">No hay entregas en ruta</p>
                    <p className="empty-subtitle">Inicia una ruta para confirmar entregas</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============ HISTORIAL ============ */}
          {activeSection === 'historial' && (
            <div className="history-section">
              <h2 className="section-title"><span className="section-icon"><History size={20} /></span> Historial de Entregas</h2>
              
              <div className="history-container">
                <div className="history-header-card">
                  <div className="history-icon"><ClipboardList size={24} /></div>
                  <div>
                    <h3>Registro de Entregas</h3>
                    <p>Todos los cambios de estado guardados</p>
                  </div>
                  <div className="history-total">TOTAL: {historial.length}</div>
                </div>
                
                {historial.length > 0 ? (
                  <div className="history-list">
                    {historial.map(item => (
                      <div key={item.id} className="history-item">
                        <div className="history-item-info">
                          <div className="history-order">{item.numeroPedido}</div>
                          <div className="history-client">{item.cliente}</div>
                        </div>
                        <div className="history-item-details">
                          <div className="history-amount">{formatCurrency(item.valorTotal)}</div>
                          <div className={`history-status ${item.estado}`}>
                            {item.estado === 'completada' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                            {item.estado === 'completada' ? 'Completada' : 'Anulada'}
                          </div>
                        </div>
                        <div className="history-item-time">
                          <span>{item.fecha}</span>
                          <span>{item.hora}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <History size={32} />
                    <p>No hay entregas registradas aún</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============ PERFIL ============ */}
          {activeSection === 'perfil' && (
            <div className="profile-section">
              <div className="profile-card">
                <div className="profile-header">
                  <div className="profile-icon"><User size={18} /></div>
                  <h2>Mi Información Personal</h2>
                  <button 
                    className="profile-edit-btn" 
                    onClick={() => isEditingProfile ? guardarPerfil() : setIsEditingProfile(true)}
                  >
                    <Edit size={14} />
                    {isEditingProfile ? 'Guardar' : 'Editar'}
                  </button>
                </div>

                <div className="profile-content">
                  <div className="profile-column">
                    <div className="profile-group-title">DATOS PERSONALES</div>
                    <div className="profile-fields-row">
                      <div className="profile-field">
                        <label>NOMBRE</label>
                        <input type="text" value={profileData.nombre} onChange={e => handleProfileChange('nombre', e.target.value)} disabled={!isEditingProfile} />
                      </div>
                      <div className="profile-field">
                        <label>APELLIDO</label>
                        <input type="text" value={profileData.apellido} onChange={e => handleProfileChange('apellido', e.target.value)} disabled={!isEditingProfile} />
                      </div>
                    </div>
                    <div className="profile-field">
                      <label>CÃ‰DULA</label>
                      <input type="text" value={profileData.cedula} onChange={e => handleProfileChange('cedula', e.target.value)} disabled={!isEditingProfile} />
                    </div>

                    <div className="profile-group-title">INFORMACIÃ“N DEL VEHÃCULO</div>
                    <div className="profile-field">
                      <label>TIPO DE VEHÃCULO</label>
                      <select value={profileData.tipoVehiculo} onChange={e => handleProfileChange('tipoVehiculo', e.target.value)} disabled={!isEditingProfile}>
                        <option value="motocicleta">Motocicleta</option>
                        <option value="carro">Carro</option>
                        <option value="bicicleta">Bicicleta</option>
                      </select>
                    </div>
                    <div className="profile-fields-row">
                      <div className="profile-field">
                        <label>PLACA</label>
                        <input type="text" value={profileData.placa} onChange={e => handleProfileChange('placa', e.target.value)} disabled={!isEditingProfile} />
                      </div>
                      <div className="profile-field">
                        <label>LICENCIA</label>
                        <input type="text" value={profileData.licencia} onChange={e => handleProfileChange('licencia', e.target.value)} disabled={!isEditingProfile} />
                      </div>
                    </div>
                  </div>

                  <div className="profile-column">
                    <div className="profile-group-title">INFORMACIÃ“N DE CONTACTO</div>
                    <div className="profile-field">
                      <label>TELÃ‰FONO</label>
                      <input type="tel" value={profileData.telefono} onChange={e => handleProfileChange('telefono', e.target.value)} disabled={!isEditingProfile} />
                    </div>
                    <div className="profile-field">
                      <label>EMAIL</label>
                      <input type="email" value={profileData.email} onChange={e => handleProfileChange('email', e.target.value)} disabled={!isEditingProfile} />
                    </div>
                    <div className="profile-field">
                      <label>DIRECCIÃ“N</label>
                      <input type="text" value={profileData.direccion} onChange={e => handleProfileChange('direccion', e.target.value)} disabled={!isEditingProfile} />
                    </div>

                    <div className="profile-group-title">INFORMACIÃ“N BANCARIA</div>
                    <div className="profile-field">
                      <label>BANCO</label>
                      <input type="text" value={profileData.banco} onChange={e => handleProfileChange('banco', e.target.value)} disabled={!isEditingProfile} />
                    </div>
                    <div className="profile-fields-row">
                      <div className="profile-field">
                        <label>TIPO DE CUENTA</label>
                        <select value={profileData.tipoCuenta} onChange={e => handleProfileChange('tipoCuenta', e.target.value)} disabled={!isEditingProfile}>
                          <option value="ahorros">Ahorros</option>
                          <option value="corriente">Corriente</option>
                        </select>
                      </div>
                      <div className="profile-field">
                        <label>NÃšMERO DE CUENTA</label>
                        <input type="text" value={profileData.numeroCuenta} onChange={e => handleProfileChange('numeroCuenta', e.target.value)} disabled={!isEditingProfile} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="profile-stats-footer">
                  <div className="profile-stat-footer">
                    <div className="profile-stat-value">{rutasCompletadas.length}</div>
                    <div className="profile-stat-label">ENTREGAS TOTALES</div>
                    <div className="profile-stat-desc">Pedidos completados</div>
                  </div>
                  <div className="profile-stat-footer">
                    <div className="profile-stat-value">4.8 â­</div>
                    <div className="profile-stat-label">CALIFICACIÃ“N</div>
                    <div className="profile-stat-desc">Promedio del servicio</div>
                  </div>
                  <div className="profile-stat-footer">
                    <div className="profile-stat-value">2 años</div>
                    <div className="profile-stat-label">EXPERIENCIA</div>
                    <div className="profile-stat-desc">En la plataforma</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal Details */}
      {showDetails && selectedRuta && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalles del Pedido</h3>
              <button className="close-btn" onClick={() => setShowDetails(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="detail-item"><span>Pedido</span><strong>{selectedRuta.numeroPedido}</strong></div>
              <div className="detail-item"><span>Cliente</span><strong>{selectedRuta.cliente.nombre}</strong></div>
              <div className="detail-item"><span>Teléfono</span><strong>{selectedRuta.cliente.telefono}</strong></div>
              <div className="detail-item"><span>Dirección</span><strong>{selectedRuta.cliente.direccion}</strong></div>
              <div className="detail-item"><span>Barrio</span><strong>{selectedRuta.cliente.barrio}</strong></div>
              <div className="detail-item"><span>Total</span><strong>{formatCurrency(selectedRuta.valorTotal)}</strong></div>
              <div className="detail-item"><span>Pago</span><strong style={{ textTransform: 'capitalize' }}>{selectedRuta.metodoPago}</strong></div>
              <div className="modal-actions">
                {selectedRuta.estado !== 'completada' && selectedRuta.estado !== 'anulada' && (
                  <button className="btn-confirm-full" onClick={() => { setShowDetails(false); setShowConfirm(true); }}>
                    <CheckCircle size={18} /> Confirmar Entrega
                  </button>
                )}
                <button className="btn-gps" onClick={() => window.open(`https://www.waze.com/ul?q=${encodeURIComponent(selectedRuta.cliente.direccion)}`, '_blank')}>
                  <MapPinned size={18} /> Abrir Waze
                </button>
                <button className="btn-call" onClick={() => window.location.href = `tel:${selectedRuta.cliente.telefono}`}>
                  <Phone size={18} /> Llamar
                </button>
                {selectedRuta.estado !== 'completada' && selectedRuta.estado !== 'anulada' && (
                  <button className="btn-cancel-full" onClick={() => { setShowDetails(false); setShowAnular(true); }}>
                    <XCircle size={18} /> Anular Pedido
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirm */}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirmar Entrega</h3>
              <button className="close-btn" onClick={() => setShowConfirm(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre de quien recibe *</label>
                <input type="text" value={confirmForm.nombre} onChange={e => setConfirmForm({...confirmForm, nombre: e.target.value})} placeholder="Nombre completo" />
              </div>
              <div className="form-group">
                <label>Cédula *</label>
                <input type="text" value={confirmForm.cedula} onChange={e => setConfirmForm({...confirmForm, cedula: e.target.value})} placeholder="Número de cédula" />
              </div>
              {selectedRuta?.metodoPago === 'efectivo' && (
                <div className="warning-box">ðŸ’° A recolectar: <strong>{selectedRuta && formatCurrency(selectedRuta.valorTotal)}</strong></div>
              )}
              <div className="modal-footer">
                <button className="btn-cancel-modal" onClick={() => setShowConfirm(false)}>Cancelar</button>
                <button className="btn-send" onClick={confirmarEntrega} disabled={!confirmForm.nombre || !confirmForm.cedula}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Anular */}
      {showAnular && (
        <div className="modal-overlay" onClick={() => setShowAnular(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Anular Pedido</h3>
              <button className="close-btn" onClick={() => setShowAnular(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="warning-anular">âš ï¸ Esta acción se registrará en el historial</div>
              <div className="form-group">
                <label>Motivo *</label>
                <select value={anularForm.motivo} onChange={e => setAnularForm({...anularForm, motivo: e.target.value})}>
                  <option value="">Selecciona un motivo</option>
                  <option value="Cliente no encontrado">Cliente no encontrado</option>
                  <option value="Cliente canceló">Cliente canceló</option>
                  <option value="Dirección incorrecta">Dirección incorrecta</option>
                  <option value="Producto dañado">Producto dañado</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel-modal" onClick={() => setShowAnular(false)}>Cancelar</button>
                <button className="btn-send" onClick={anularPedido} disabled={!anularForm.motivo}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Tracker Horizontal */}
      {activeRutaStatus !== null && (
        <div className="status-tracker-overlay" onClick={handleCloseStatus}>
          <div className="status-tracker-card" onClick={e => e.stopPropagation()}>
            <div className="status-tracker-header">
              <h3>Estado de Entrega</h3>
              <button className="close-btn" onClick={handleCloseStatus}><X size={18} /></button>
            </div>
            
            <div className="status-steps-horizontal">
              <div className={`status-step ${currentStep >= 1 ? 'active' : ''}`}>
                <div className="step-icon">{currentStep > 1 ? <CheckCircle size={16} /> : <Package size={16} />}</div>
              </div>
              <div className="step-line"></div>
              <div className={`status-step ${currentStep >= 2 ? 'active' : ''}`}>
                <div className="step-icon">{currentStep > 2 ? <CheckCircle size={16} /> : <MapPin size={16} />}</div>
              </div>
              <div className="step-line"></div>
              <div className={`status-step ${currentStep >= 3 ? 'active' : ''}`}>
                <div className="step-icon">{currentStep > 3 ? <CheckCircle size={16} /> : <CheckCircle size={16} />}</div>
              </div>
            </div>

            <div className="status-actions">
              <button 
                className="status-action-btn"
                onClick={() => setCurrentStep(prev => Math.min(prev + 1, 3))}
                disabled={currentStep >= 3}
              >
                Siguiente
              </button>
              <button 
                className="status-action-btn secondary"
                onClick={handleCloseStatus}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomiciliarioDashboard;


