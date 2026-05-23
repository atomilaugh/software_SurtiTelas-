import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Download, Boxes, ShoppingCart, Users, BarChart3, ArrowUpRight } from 'lucide-react';
import DashboardLayout from './components/layout/DashboardLayout';
import KPIGrid from './components/analytics/KPIGrid';
import SalesLineChart from './components/analytics/SalesLineChart';
import AlertsPanel from './components/alerts/AlertsPanel';
import RecentOrdersTable from './components/tables/RecentOrdersTable';
import EmployeesWidget from './components/widgets/EmployeesWidget';
import CategoryPieChart from './components/analytics/CategoryPieChart';
import ProductionChart from './components/analytics/ProductionChart';
import { useAuth } from '@presentation/contexts/AuthContext';

const QUICK = [
  { label: 'Inventario',  icon: Boxes,        path: '/admin/inventario', c1: '#8b5cf6', c2: '#6366f1' },
  { label: 'Pedidos',     icon: ShoppingCart, path: '/admin/pedidos',    c1: '#10b981', c2: '#06b6d4' },
  { label: 'Clientes',    icon: Users,        path: '/admin/clientes',   c1: '#f59e0b', c2: '#f97316' },
  { label: 'Analytics',   icon: BarChart3,    path: '/admin/analytics',  c1: '#3b82f6', c2: '#6366f1' },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const nav = useNavigate();
  const h = new Date().getHours();
  const greet = h < 12 ? 'Buenos días' : h < 18 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <DashboardLayout>
      <div className="space-y-5">

        {/* ── Header row */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex items-center justify-between"
        >
          <div>
            <p className="text-[11.5px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
              {greet}, <span className="capitalize" style={{ color: 'var(--text-secondary)' }}>{user?.role ?? 'Admin'}</span>
            </p>
            <h1 className="text-[20px] font-bold tracking-tight mt-0.5" style={{ color: 'var(--text-primary)' }}>
              Panel de Control
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-[12px] font-medium transition-all duration-150"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-subtle)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
            >
              <Download size={12} /> Exportar
            </button>
            <button
              onClick={() => nav('/admin/inventario')}
              className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-[12px] font-semibold text-white transition-all duration-150"
              style={{ background: 'var(--text-primary)' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <Plus size={12} /> Nuevo
            </button>
          </div>
        </motion.div>

        {/* ── Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.04, ease: 'easeOut' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5"
        >
          {QUICK.map((q, i) => {
            const Icon = q.icon;
            return (
              <motion.button
                key={q.label}
                whileHover={{ y: -1.5, transition: { duration: 0.12 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => nav(q.path)}
                className="flex items-center gap-2.5 p-3 rounded-xl text-left transition-all duration-150 group"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-default)')}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `linear-gradient(135deg, ${q.c1}20, ${q.c2}20)` }}
                >
                  <Icon size={13} style={{ color: q.c1 }} />
                </div>
                <span className="flex-1 text-[12.5px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                  {q.label}
                </span>
                <ArrowUpRight size={11} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-tertiary)' }} />
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── KPIs */}
        <KPIGrid />

        {/* ── Row 1: Chart + Alerts */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.65fr_1fr] gap-4">
          <SalesLineChart />
          <AlertsPanel />
        </div>

        {/* ── Row 2: Table + Employees */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.8fr_1fr] gap-4">
          <RecentOrdersTable />
          <EmployeesWidget />
        </div>

        {/* ── Row 3: Pie + Bar */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <CategoryPieChart />
          <ProductionChart />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
