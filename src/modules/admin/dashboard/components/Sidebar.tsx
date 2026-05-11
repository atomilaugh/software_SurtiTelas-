import React from 'react';
import { DollarSign, Factory, Home, LogOut, Package, Settings, ShoppingCart, Users } from 'lucide-react';

const navItems = [
  { title: 'Dashboard', icon: Home, active: true },
  { title: 'Configuración', icon: Settings },
  { title: 'Compras', icon: ShoppingCart },
  { title: 'Ventas', icon: DollarSign },
  { title: 'Producción', icon: Factory },
];

const sections = [
  { title: 'Configuración', items: ['Roles', 'Usuarios', 'Accesos', 'Empleados'] },
  { title: 'Compras', items: ['Compras', 'Insumos', 'Categorías de Insumos', 'Proveedores'] },
  { title: 'Ventas', items: ['Ventas', 'Abonos', 'Devoluciones', 'Domicilios', 'Domiciliarios', 'Pedidos', 'Clientes'] },
  { title: 'Producción', items: ['Producción', 'Talleres', 'Productos', 'Categorías de Productos'] },
];

interface SidebarProps {
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => (
  <div className="flex h-full min-h-screen flex-col bg-slate-950 px-6 py-8 text-slate-100">
    <div className="mb-10 flex items-center gap-3 border-b border-slate-800 pb-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg">
        S
      </div>
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Surtitelas</p>
        <p className="text-lg font-semibold">Panel Admin</p>
      </div>
    </div>

    <div className="space-y-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
              item.active ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Icon size={18} />
            <span>{item.title}</span>
          </div>
        );
      })}
    </div>

    <div className="mt-10 space-y-5 text-slate-300">
      {sections.map((section) => (
        <div key={section.title} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{section.title}</p>
          <div className="space-y-2">
            {section.items.map((item) => (
              <div key={item} className="rounded-2xl px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div className="mt-auto border-t border-slate-800 pt-6">
      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-500 hover:text-emerald-300"
      >
        <LogOut size={18} />
        Cerrar sesión
      </button>
    </div>
  </div>
);

export default Sidebar;
