import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  ShoppingCart, 
  MessageSquare, 
  Star, 
  User, 
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Package,
  DollarSign,
  LogOut,
  Moon,
  Sun,
  X,
  Send,
  Filter,
  LayoutDashboard,
  MessageCircle,
  Award,
  Settings,
  Box,
  Image,
  Tag,
  Bell,
  Briefcase,
  Shirt
} from 'lucide-react';
import { useAuth } from '@presentation/contexts/AuthContext';
import toast from 'react-hot-toast';
import '../styles/AsesorDashboard.css';

interface Cliente {
  id: number;
  nombre: string;
  cedula: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  tipo: 'Personal' | 'Empresa';
  estado: 'Activo' | 'Inactivo';
  fechaRegistro: string;
  totalCompras: number;
  pedidosRealizados: number;
}

interface Pedido {
  id: number;
  numero: string;
  cliente: string;
  productos: string;
  total: number;
  estado: 'Pendiente' | 'Proceso' | 'Enviado' | 'Entregado';
  fecha: string;
}

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  stock: number;
  estado: 'Activo' | 'Inactivo';
}

const clientesIniciales: Cliente[] = [
  {
    id: 1,
    nombre: 'María González',
    cedula: '1234567890',
    telefono: '+57 300 123 4567',
    email: 'maria@email.com',
    direccion: 'Calle 45 #23-15',
    ciudad: 'Bogotá',
    tipo: 'Personal',
    estado: 'Activo',
    fechaRegistro: '2024-01-15',
    totalCompras: 1250000,
    pedidosRealizados: 8
  },
  {
    id: 2,
    nombre: 'Carlos Mendoza',
    cedula: '9876543210',
    telefono: '+57 310 555 1234',
    email: 'carlos@empresa.com',
    direccion: 'Carrera 50 #12-30',
    ciudad: 'Medellín',
    tipo: 'Empresa',
    estado: 'Activo',
    fechaRegistro: '2024-02-20',
    totalCompras: 4500000,
    pedidosRealizados: 15
  },
  {
    id: 3,
    nombre: 'Ana Rodríguez',
    cedula: '5678901234',
    telefono: '+57 320 987 6543',
    email: 'ana@email.com',
    direccion: 'Avenida 68 #45-78',
    ciudad: 'Bogotá',
    tipo: 'Personal',
    estado: 'Inactivo',
    fechaRegistro: '2023-11-10',
    totalCompras: 350000,
    pedidosRealizados: 3
  },
  {
    id: 4,
    nombre: 'Juan Pérez',
    cedula: '1234098765',
    telefono: '+57 315 456 7890',
    email: 'juan@empresa.com',
    direccion: 'Calle 92 #15-60',
    ciudad: 'Cali',
    tipo: 'Empresa',
    estado: 'Activo',
    fechaRegistro: '2024-03-05',
    totalCompras: 2800000,
    pedidosRealizados: 12
  }
];

const pedidosRecientes: Pedido[] = [
  { id: 1, numero: 'PED-2024-001', cliente: 'María González', productos: '3 Camisetas, 2 Polos', total: 185000, estado: 'Pendiente', fecha: '2024-04-10' },
  { id: 2, numero: 'PED-2024-002', cliente: 'Carlos Mendoza', productos: '10 Polos Empresariales', total: 450000, estado: 'Proceso', fecha: '2024-04-09' },
  { id: 3, numero: 'PED-2024-003', cliente: 'Juan Pérez', productos: '5 Sudaderas', total: 325000, estado: 'Enviado', fecha: '2024-04-08' },
  { id: 4, numero: 'PED-2024-004', cliente: 'María González', productos: '2 Camisetas Premium', total: 130000, estado: 'Entregado', fecha: '2024-04-07' },
];

const productosIniciales: Producto[] = [
  {
    id: 1,
    nombre: 'Camiseta Algodón Classic',
    descripcion: 'Camiseta de algodón 100%, perfecta para uso diario',
    precio: 25000,
    categoria: 'Camisetas',
    imagen: 'shirt',
    stock: 150,
    estado: 'Activo'
  },
  {
    id: 2,
    nombre: 'Polo Empresarial Premium',
    descripcion: 'Polo con logo bordado para empresas',
    precio: 45000,
    categoria: 'Polos',
    imagen: 'shirt',
    stock: 80,
    estado: 'Activo'
  },
  {
    id: 3,
    nombre: 'Sudadera con Capucha',
    descripcion: 'Sudadera cómoda con capucha y bolsa frontal',
    precio: 65000,
    categoria: 'Sudaderas',
    imagen: 'shirt',
    stock: 45,
    estado: 'Activo'
  },
  {
    id: 4,
    nombre: 'Camiseta Manga Larga',
    descripcion: 'Camiseta de manga larga para clima frío',
    precio: 32000,
    categoria: 'Camisetas',
    imagen: 'shirt',
    stock: 0,
    estado: 'Inactivo'
  }
];

export const AsesorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'inicio' | 'clientes' | 'pedidos' | 'productos' | 'mensajes' | 'calificaciones' | 'perfil'>('inicio');
  const [showModal, setShowModal] = useState(false);
  const [showProductoModal, setShowProductoModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [clientes, setClientes] = useState<Cliente[]>(clientesIniciales);
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeFilter, setActiveFilter] = useState('todos');
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
    navigate('/login');
  };

  const getProductoIcon = (imagen: string) => {
    switch (imagen) {
      case 'shirt': return <Shirt size={24} />;
      case 'tshirt': return <Shirt size={24} />;
      case 'coat': return <Shirt size={24} />;
      case 'pants': return <Shirt size={24} />;
      case 'accessory': return <Tag size={24} />;
      default: return <Shirt size={24} />;
    }
  };

  const getUserInitials = () => {
    if (user?.name) {
      const names = user.name.split(' ');
      return names.length > 1 ? `${names[0][0]}${names[1][0]}` : names[0].substring(0, 2);
    }
    return 'AJ';
  };

  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    email: '',
    direccion: '',
    ciudad: '',
    tipo: 'Personal' as 'Personal' | 'Empresa',
    notas: ''
  });

  const [productoFormData, setProductoFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    imagen: 'shirt',
    stock: 0,
    estado: 'Activo' as 'Activo' | 'Inactivo'
  });

  const resetForm = () => {
    setFormData({
      nombre: '',
      cedula: '',
      telefono: '',
      email: '',
      direccion: '',
      ciudad: '',
      tipo: 'Personal',
      notas: ''
    });
    setEditingCliente(null);
  };

  const resetProductoForm = () => {
    setProductoFormData({
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: '',
      imagen: 'shirt',
      stock: 0,
      estado: 'Activo'
    });
    setEditingProducto(null);
  };

  const handleSaveCliente = () => {
    if (editingCliente) {
      setClientes(clientes.map(c => c.id === editingCliente.id ? { ...c, ...formData } : c));
      toast.success('Cliente actualizado correctamente');
    } else {
      const newCliente: Cliente = {
        id: Date.now(),
        ...formData,
        estado: 'Activo',
        fechaRegistro: new Date().toISOString().split('T')[0],
        totalCompras: 0,
        pedidosRealizados: 0
      };
      setClientes([...clientes, newCliente]);
      toast.success('Cliente creado correctamente');
    }
    setShowModal(false);
    resetForm();
  };

  const handleEditCliente = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setFormData({
      nombre: cliente.nombre,
      cedula: cliente.cedula,
      telefono: cliente.telefono,
      email: cliente.email,
      direccion: cliente.direccion,
      ciudad: cliente.ciudad,
      tipo: cliente.tipo,
      notas: ''
    });
    setShowModal(true);
  };

  const handleDeleteCliente = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      setClientes(clientes.filter(c => c.id !== id));
      toast.success('Cliente eliminado');
    }
  };

  const handleSaveProducto = () => {
    if (editingProducto) {
      setProductos(productos.map(p => p.id === editingProducto.id ? { ...p, ...productoFormData } : p));
      toast.success('Producto actualizado correctamente');
    } else {
      const newProducto: Producto = {
        id: Date.now(),
        ...productoFormData
      };
      setProductos([...productos, newProducto]);
      toast.success('Producto creado correctamente');
    }
    setShowProductoModal(false);
    resetProductoForm();
  };

  const handleEditProducto = (producto: Producto) => {
    setEditingProducto(producto);
    setProductoFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria,
      imagen: producto.imagen,
      stock: producto.stock,
      estado: producto.estado
    });
    setShowProductoModal(true);
  };

  const handleDeleteProducto = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      setProductos(productos.filter(p => p.id !== id));
      toast.success('Producto eliminado');
    }
  };

  const filteredClientes = clientes.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.cedula.includes(searchTerm) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="asesor-dashboard">
      {/* Sidebar */}
      <aside className="asesor-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <Package size={20} />
            </div>
            <div>
              <h2>Surtitelas</h2>
              <span>Panel Asesor</span>
            </div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Principal</div>
            <button 
              className={`nav-item ${activeTab === 'inicio' ? 'active' : ''}`}
              onClick={() => setActiveTab('inicio')}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </button>
            <button 
              className={`nav-item ${activeTab === 'clientes' ? 'active' : ''}`}
              onClick={() => setActiveTab('clientes')}
            >
              <Users size={20} />
              Clientes
              <span className="nav-item-badge">48</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'pedidos' ? 'active' : ''}`}
              onClick={() => setActiveTab('pedidos')}
            >
              <ShoppingCart size={20} />
              Pedidos
            </button>
            <button 
              className={`nav-item ${activeTab === 'productos' ? 'active' : ''}`}
              onClick={() => setActiveTab('productos')}
            >
              <Box size={20} />
              Productos
            </button>
          </div>
          
          <div className="nav-section">
            <div className="nav-section-title">Comunicación</div>
            <button 
              className={`nav-item ${activeTab === 'mensajes' ? 'active' : ''}`}
              onClick={() => setActiveTab('mensajes')}
            >
              <MessageCircle size={20} />
              Mensajes
              <span className="nav-item-badge">3</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'calificaciones' ? 'active' : ''}`}
              onClick={() => setActiveTab('calificaciones')}
            >
              <Award size={20} />
              Calificaciones
            </button>
          </div>
          
          <div className="nav-section">
            <div className="nav-section-title">Cuenta</div>
            <button 
              className={`nav-item ${activeTab === 'perfil' ? 'active' : ''}`}
              onClick={() => setActiveTab('perfil')}
            >
              <Settings size={20} />
              Mi Perfil
            </button>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="asesor-main">
        {/* Header */}
        <header className="asesor-header">
          <div className="header-left">
            <h1>
              {activeTab === 'inicio' && 'Dashboard'}
              {activeTab === 'clientes' && 'Clientes'}
              {activeTab === 'pedidos' && 'Pedidos'}
              {activeTab === 'productos' && 'Productos'}
              {activeTab === 'mensajes' && 'Mensajes'}
              {activeTab === 'calificaciones' && 'Calificaciones'}
              {activeTab === 'perfil' && 'Mi Perfil'}
            </h1>
          </div>
          <div className="header-actions">
            <button className="header-btn theme-toggle" onClick={toggleTheme} title="Cambiar tema">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button className="header-btn">
              <Bell size={18} />
              <span className="badge">3</span>
            </button>
            <div className="user-menu">
              <div className="user-avatar">{getUserInitials()}</div>
              <div className="user-info">
                <span className="user-name">{user?.name || 'Ana Jiménez'}</span>
                <span className="user-role">Asesor de Ventas</span>
              </div>
            </div>
          </div>
        </header>

        {/* INICIO - Dashboard */}
        {activeTab === 'inicio' && (
          <div className="dashboard-content">
            {/* Métricas */}
            <div className="metrics-grid">
              <div className="metric-card sales">
                <div className="metric-icon">
                  <DollarSign size={24} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Ventas del Mes</span>
                  <span className="metric-value">$4.85M</span>
                  <span className="metric-change positive">
                    <TrendingUp size={14} /> +12.5%
                  </span>
                </div>
              </div>
              <div className="metric-card clients">
                <div className="metric-icon">
                  <Users size={24} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Clientes Activos</span>
                  <span className="metric-value">48</span>
                  <span className="metric-change positive">
                    <TrendingUp size={14} /> +5 este mes
                  </span>
                </div>
              </div>
              <div className="metric-card orders">
                <div className="metric-icon">
                  <Package size={24} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Pedidos Pendientes</span>
                  <span className="metric-value">12</span>
                  <span className="metric-change neutral">
                    4 en proceso
                  </span>
                </div>
              </div>
              <div className="metric-card rating">
                <div className="metric-icon">
                  <Star size={24} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Calificación</span>
                  <span className="metric-value">4.8</span>
                  <span className="metric-change positive">
                    <TrendingUp size={14} /> Excelente
                  </span>
                </div>
              </div>
            </div>

            {/* Grilla de contenido */}
            <div className="dashboard-grid">
              {/* Pedidos Recientes */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3>Pedidos Recientes</h3>
                  <button className="card-action" onClick={() => setActiveTab('pedidos')}>
                    Ver todos â†’
                  </button>
                </div>
                <div className="orders-table">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedidosRecientes.map(pedido => (
                        <tr key={pedido.id}>
                          <td><strong>{pedido.numero}</strong></td>
                          <td>{pedido.cliente}</td>
                          <td><strong>{formatCurrency(pedido.total)}</strong></td>
                          <td>
                            <span className={`status-badge ${pedido.estado.toLowerCase()}`}>
                              {pedido.estado}
                            </span>
                          </td>
                          <td>{pedido.fecha}</td>
                          <td>
                            <div className="action-btns">
                              <button className="action-btn"><Eye size={16} /></button>
                              <button className="action-btn"><Edit size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Stats Rápidos */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3>Resumen</h3>
                </div>
                <div className="quick-stats">
                  <div className="quick-stat-item">
                    <div className="quick-stat-icon blue">
                      <ShoppingCart size={20} />
                    </div>
                    <div className="quick-stat-info">
                      <span className="quick-stat-label">Pedidos Hoy</span>
                      <span className="quick-stat-value">8</span>
                    </div>
                  </div>
                  <div className="quick-stat-item">
                    <div className="quick-stat-icon green">
                      <Users size={20} />
                    </div>
                    <div className="quick-stat-info">
                      <span className="quick-stat-label">Clientes Nuevos</span>
                      <span className="quick-stat-value">3</span>
                    </div>
                  </div>
                  <div className="quick-stat-item">
                    <div className="quick-stat-icon purple">
                      <Star size={20} />
                    </div>
                    <div className="quick-stat-info">
                      <span className="quick-stat-label">Reseñas Nuevas</span>
                      <span className="quick-stat-value">5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CLIENTES - CRUD */}
        {activeTab === 'clientes' && (
          <div className="clientes-content">
            <div className="content-header">
              <div className="search-box">
                <Search size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar clientes por nombre, cédula o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="add-btn" onClick={() => { resetForm(); setShowModal(true); }}>
                <Plus size={18} /> Nuevo Cliente
              </button>
            </div>

            <div className="clientes-table">
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Cédula</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Ciudad</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClientes.map(cliente => (
                    <tr key={cliente.id}>
                      <td><strong>{cliente.nombre}</strong></td>
                      <td>{cliente.cedula}</td>
                      <td>{cliente.telefono}</td>
                      <td>{cliente.email}</td>
                      <td>{cliente.ciudad}</td>
                      <td>
                        <span className={`type-badge ${cliente.tipo.toLowerCase()}`}>
                          {cliente.tipo}
                        </span>
                      </td>
                      <td>
                        <span className={`estado-badge ${cliente.estado.toLowerCase()}`}>
                          {cliente.estado}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="table-action-btn" onClick={() => handleEditCliente(cliente)}>
                            <Edit size={16} />
                          </button>
                          <button className="table-action-btn delete" onClick={() => handleDeleteCliente(cliente.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PEDIDOS */}
        {activeTab === 'pedidos' && (
          <div className="pedidos-content">
            <div className="filter-bar">
              <div className="filter-tabs">
                {['todos', 'Pendiente', 'Proceso', 'Enviado', 'Entregado'].map(filter => (
                  <button 
                    key={filter}
                    className={`filter-tab ${activeFilter === filter.toLowerCase() ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter.toLowerCase())}
                  >
                    {filter === 'todos' ? 'Todos' : filter}
                  </button>
                ))}
              </div>
              <button className="add-btn">
                <Plus size={18} /> Nuevo Pedido
              </button>
            </div>

            <div className="pedidos-grid">
              {pedidosRecientes
                .filter(p => activeFilter === 'todos' || p.estado.toLowerCase() === activeFilter)
                .map(pedido => (
                <div key={pedido.id} className="pedido-card">
                  <div className="pedido-header">
                    <span className="pedido-number">{pedido.numero}</span>
                    <span className={`status-badge ${pedido.estado.toLowerCase()}`}>
                      {pedido.estado}
                    </span>
                  </div>
                  <div className="pedido-cliente">{pedido.cliente}</div>
                  <div className="pedido-productos">{pedido.productos}</div>
                  <div className="pedido-footer">
                    <span className="pedido-total">{formatCurrency(pedido.total)}</span>
                    <span className="pedido-fecha">{pedido.fecha}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTOS - Catálogo */}
        {activeTab === 'productos' && (
          <div className="productos-content">
            <div className="content-header">
              <div className="search-box">
                <Search size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar productos por nombre o categoría..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="add-btn" onClick={() => { resetProductoForm(); setShowProductoModal(true); }}>
                <Plus size={18} /> Nuevo Producto
              </button>
            </div>

            <div className="productos-table">
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos
                    .filter(p => 
                      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(producto => (
                    <tr key={producto.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div className="producto-imagen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {getProductoIcon(producto.imagen)}
                          </div>
                          <div>
                            <strong>{producto.nombre}</strong>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{producto.descripcion.substring(0, 50)}...</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="type-badge">{producto.categoria}</span>
                      </td>
                      <td><strong>{formatCurrency(producto.precio)}</strong></td>
                      <td>
                        <span className={`producto-stock ${producto.stock > 0 ? 'disponible' : 'agotado'}`}>
                          {producto.stock > 0 ? `${producto.stock} unidades` : 'Agotado'}
                        </span>
                      </td>
                      <td>
                        <span className={`estado-badge ${producto.estado.toLowerCase()}`}>
                          {producto.estado}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="table-action-btn" onClick={() => handleEditProducto(producto)}>
                            <Edit size={16} />
                          </button>
                          <button className="table-action-btn delete" onClick={() => handleDeleteProducto(producto.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MENSAJES */}
        {activeTab === 'mensajes' && (
          <div className="mensajes-content">
            <div className="messages-container">
              <div className="messages-list">
                <div className="messages-list-header">Conversaciones</div>
                {clientes.slice(0, 3).map((cliente, idx) => (
                  <div 
                    key={idx}
                    className={`message-item ${selectedMessage === idx ? 'active' : ''}`}
                    onClick={() => setSelectedMessage(idx)}
                  >
                    <div className="message-item-header">
                      <span className="message-item-name">{cliente.nombre}</span>
                      <span className="message-item-time">10:30</span>
                    </div>
                    <div className="message-item-preview">Hola, tengo una consulta sobre...</div>
                  </div>
                ))}
              </div>
              <div className="chat-area">
                {selectedMessage !== null ? (
                  <>
                    <div className="chat-header">
                      <div className="chat-user-avatar">{clientes[selectedMessage].nombre[0]}</div>
                      <div>
                        <div className="chat-user-name">{clientes[selectedMessage].nombre}</div>
                        <div className="chat-user-status">â— En línea</div>
                      </div>
                    </div>
                    <div className="chat-messages">
                      <div className="chat-bubble received">Hola, tengo una consulta sobre los pedidos</div>
                      <div className="chat-bubble sent">Claro, con gusto te ayudo. ¿Qué necesitas saber?</div>
                      <div className="chat-bubble received">Quiero saber el estado de mi pedido #PED-2024-001</div>
                    </div>
                    <div className="chat-input-area">
                      <input 
                        type="text" 
                        className="chat-input" 
                        placeholder="Escribe un mensaje..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                      />
                      <button className="chat-send-btn">
                        <Send size={18} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty-state">
                    <MessageSquare size={48} />
                    <h3>Selecciona una conversación</h3>
                    <p>Elige una conversación de la lista para ver los mensajes</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CALIFICACIONES */}
        {activeTab === 'calificaciones' && (
          <div className="calificaciones-content">
            <div className="rating-overview">
              <div className="rating-card">
                <div className="rating-big">4.8</div>
                <div className="rating-stars">â˜…â˜…â˜…â˜…â˜…</div>
                <div className="rating-count">Basado en 24 reseñas</div>
              </div>
              <div className="rating-bars-card">
                {[
                  { stars: 5, percent: 70 },
                  { stars: 4, percent: 20 },
                  { stars: 3, percent: 7 },
                  { stars: 2, percent: 3 },
                  { stars: 1, percent: 0 },
                ].map(item => (
                  <div key={item.stars} className="rating-bar-row">
                    <span className="rating-bar-label">{item.stars} â­</span>
                    <div className="rating-bar-track">
                      <div className="rating-bar-fill" style={{ width: `${item.percent}%` }}></div>
                    </div>
                    <span className="rating-bar-percent">{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="reviews-section">
              <h3>Reseñas Recientes</h3>
              <div className="reviews-list">
                {[
                  { name: 'María González', type: 'Cliente', stars: 5, text: 'Excelente calidad y entrega a tiempo. Muy recomendada la empresa.', date: '10 de Abril, 2024' },
                  { name: 'Carlos Mendoza', type: 'Empresa', stars: 5, text: 'Gran atención al cliente, siempre resuelven nuestras dudas.', date: '8 de Abril, 2024' },
                  { name: 'Ana Rodríguez', type: 'Cliente', stars: 4, text: 'Buen producto, solo tardó un poco más de lo esperado.', date: '5 de Abril, 2024' },
                ].map((review, idx) => (
                  <div key={idx} className="review-card">
                    <div className="review-header">
                      <div className="review-author">
                        <div className="review-avatar">{review.name[0]}</div>
                        <div>
                          <div className="review-author-name">{review.name}</div>
                          <div className="review-author-type">{review.type}</div>
                        </div>
                      </div>
                      <div className="review-stars">{'â˜…'.repeat(review.stars)}</div>
                    </div>
                    <p className="review-text">"{review.text}"</p>
                    <span className="review-date">{review.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PERFIL */}
        {activeTab === 'perfil' && (
          <div className="perfil-content">
            <div className="perfil-card">
              <div className="perfil-header-section">
                <div className="perfil-avatar-large">{getUserInitials()}</div>
                <div className="perfil-info">
                  <h3>{user?.name || 'Ana Jiménez'}</h3>
                  <p>{user?.email || 'asesor@surtitelas.com'}</p>
                </div>
                <button className="perfil-edit-btn">Editar Perfil</button>
              </div>
              <div className="perfil-details">
                <div className="perfil-field">
                  <span className="perfil-field-label">Teléfono</span>
                  <span className="perfil-field-value">+57 300 123 4567</span>
                </div>
                <div className="perfil-field">
                  <span className="perfil-field-label">Ciudad</span>
                  <span className="perfil-field-value">Bogotá</span>
                </div>
                <div className="perfil-field">
                  <span className="perfil-field-label">Fecha de Inicio</span>
                  <span className="perfil-field-value">15 de Enero, 2024</span>
                </div>
                <div className="perfil-field">
                  <span className="perfil-field-label">Rol</span>
                  <span className="perfil-field-value">Asesor de Ventas</span>
                </div>
              </div>
            </div>
            <div className="perfil-stats-grid">
              <div className="perfil-stat-card">
                <span className="perfil-stat-value">$12.5M</span>
                <span className="perfil-stat-label">Ventas Totales</span>
              </div>
              <div className="perfil-stat-card">
                <span className="perfil-stat-value">48</span>
                <span className="perfil-stat-label">Clientes</span>
              </div>
              <div className="perfil-stat-card">
                <span className="perfil-stat-value">4.8</span>
                <span className="perfil-stat-label">Calificación</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal de Cliente */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCliente ? 'Editar Cliente' : 'Nuevo Cliente'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre Completo *</label>
                <input 
                  type="text" 
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  placeholder="Ej: María González"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Cédula/NIT *</label>
                  <input 
                    type="text" 
                    value={formData.cedula}
                    onChange={(e) => setFormData({...formData, cedula: e.target.value})}
                    placeholder="1234567890"
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono *</label>
                  <input 
                    type="tel" 
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    placeholder="+57 300 123 4567"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="correo@email.com"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Dirección</label>
                  <input 
                    type="text" 
                    value={formData.direccion}
                    onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                    placeholder="Calle 45 #23-15"
                  />
                </div>
                <div className="form-group">
                  <label>Ciudad</label>
                  <input 
                    type="text" 
                    value={formData.ciudad}
                    onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                    placeholder="Bogotá"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Tipo de Cliente</label>
                <select 
                  value={formData.tipo}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value as 'Personal' | 'Empresa'})}
                >
                  <option value="Personal">Personal</option>
                  <option value="Empresa">Empresa</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-save" onClick={handleSaveCliente}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Producto */}
      {showProductoModal && (
        <div className="modal-overlay" onClick={() => setShowProductoModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProducto ? 'Editar Producto' : 'Nuevo Producto'}</h3>
              <button className="close-btn" onClick={() => setShowProductoModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre del Producto *</label>
                <input 
                  type="text" 
                  value={productoFormData.nombre}
                  onChange={(e) => setProductoFormData({...productoFormData, nombre: e.target.value})}
                  placeholder="Ej: Camiseta Algodón Classic"
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea 
                  value={productoFormData.descripcion}
                  onChange={(e) => setProductoFormData({...productoFormData, descripcion: e.target.value})}
                  placeholder="Descripción del producto..."
                  rows={3}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Precio *</label>
                  <input 
                    type="number" 
                    value={productoFormData.precio}
                    onChange={(e) => setProductoFormData({...productoFormData, precio: parseInt(e.target.value) || 0})}
                    placeholder="25000"
                  />
                </div>
                <div className="form-group">
                  <label>Stock *</label>
                  <input 
                    type="number" 
                    value={productoFormData.stock}
                    onChange={(e) => setProductoFormData({...productoFormData, stock: parseInt(e.target.value) || 0})}
                    placeholder="100"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Categoría *</label>
                  <select 
                    value={productoFormData.categoria}
                    onChange={(e) => setProductoFormData({...productoFormData, categoria: e.target.value})}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Camisetas">Camisetas</option>
                    <option value="Polos">Polos</option>
                    <option value="Sudaderas">Sudaderas</option>
                    <option value="Pantalones">Pantalones</option>
                    <option value="Accesorios">Accesorios</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Estado</label>
                  <select 
                    value={productoFormData.estado}
                    onChange={(e) => setProductoFormData({...productoFormData, estado: e.target.value as 'Activo' | 'Inactivo'})}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Icono</label>
                <select 
                  value={productoFormData.imagen}
                  onChange={(e) => setProductoFormData({...productoFormData, imagen: e.target.value})}
                >
                  <option value="shirt">Camiseta</option>
                  <option value="tshirt">Polo</option>
                  <option value="coat">Sudadera</option>
                  <option value="pants">Pantalón</option>
                  <option value="accessory">Accesorio</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowProductoModal(false)}>Cancelar</button>
              <button className="btn-save" onClick={handleSaveProducto}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AsesorDashboard;




