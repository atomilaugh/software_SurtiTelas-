import React from 'react';
import { Home, Settings, ShoppingBag, DollarSign, Cog, Truck, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const menuItems = [
    { name: 'Dashboard', icon: Home, active: true },
    { name: 'Configuración', icon: Settings, active: false, subItems: ['Roles', 'Usuarios', 'Accesos', 'Empleados'] },
    { name: 'Compras', icon: ShoppingBag, active: false, subItems: ['Compras', 'Insumos', 'Categorías de Insumos', 'Proveedores'] },
    { name: 'Ventas', icon: DollarSign, active: false, subItems: ['Ventas', 'Abonos', 'Devoluciones', 'Domicilios', 'Domiciliarios', 'Pedidos', 'Clientes'] },
    { name: 'Producción', icon: Cog, active: false, subItems: ['Producción', 'Talleres', 'Productos', 'Categorías de Productos'] },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-green-400">Surtitelas</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <div className={`flex items-center p-3 rounded-lg cursor-pointer ${item.active ? 'bg-green-600' : 'hover:bg-slate-800'}`}>
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </div>
              {item.subItems && (
                <ul className="ml-8 mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <li key={subItem} className="text-sm text-slate-400 hover:text-white cursor-pointer">
                      {subItem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <button onClick={handleLogout} className="w-full flex items-center p-3 rounded-lg hover:bg-slate-800 text-left">
          <Users className="w-5 h-5 mr-3" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
