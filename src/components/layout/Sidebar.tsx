import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, ShoppingBag, Truck, BarChart3, Users2, Settings, ArrowLeftRight } from 'lucide-react';

const navItems = [
  { label: 'Administrador', path: '/admin/dashboard', icon: BarChart3 },
  { label: 'Asesor', path: '/asesor/dashboard', icon: ShoppingBag },
  { label: 'Domiciliario', path: '/domiciliario/dashboard', icon: Truck },
  { label: 'Pedidos', path: '/admin/dashboard', icon: ClipboardList },
  { label: 'Clientes', path: '/admin/dashboard', icon: Users2 },
  { label: 'Inventario', path: '/admin/dashboard', icon: ArrowLeftRight },
  { label: 'Configuración', path: '/admin/dashboard', icon: Settings },
];

export const Sidebar: React.FC = () => (
  <aside className="hidden w-72 flex-col gap-8 border-r border-slate-200 bg-slate-950 p-6 text-slate-100 lg:flex">
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-2xl font-black text-white shadow-lg shadow-slate-950/20">S</div>
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">SurtiCamisetas</p>
        <h1 className="text-xl font-semibold text-white">ERP interno</h1>
      </div>
    </div>

    <nav className="flex flex-1 flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-slate-800 text-white shadow-lg shadow-slate-950/15' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`
            }
          >
            <Icon size={18} className="text-slate-300 group-hover:text-white" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>

    <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 text-sm text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Operaciones</p>
      <p className="mt-3 text-sm leading-6 text-slate-200">Visualiza el estado del ERP, gestiona pedidos y controla entregas desde un solo panel.</p>
    </div>
  </aside>
);
