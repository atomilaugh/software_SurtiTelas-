import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { analyticsData } from '../mock/analytics.mock';
import { formatCurrency } from '@/shared/utils';
import { Card, StatsCard } from '@/shared/ui';
import { DollarSign, ShoppingCart, TrendingUp, Users, BarChart3, Percent } from 'lucide-react';
import DashboardLayout from '../../dashboard/components/layout/DashboardLayout';

const { kpis, monthlySales, categoryRevenue, weeklyOrders, topProducts, customerSegments } = analyticsData;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl p-3 shadow-xl text-sm">
      <p className="font-semibold text-slate-900 dark:text-white mb-2">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} style={{ color: entry.color }} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: entry.color }} />
          {entry.name}: <span className="font-semibold">{typeof entry.value === 'number' && entry.value > 100000 ? formatCurrency(entry.value) : entry.value}</span>
        </p>
      ))}
    </div>
  );
};

const AnalyticsPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics</h1>
        <p className="text-slate-500 dark:text-zinc-400 mt-1">Métricas y rendimiento del negocio</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard title="Revenue Total" value={formatCurrency(kpis.totalRevenue)} change={kpis.revenueGrowth} changeLabel="vs mes ant." icon={<DollarSign size={16} />} iconColor="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" />
        <StatsCard title="Pedidos" value={kpis.totalOrders} change={kpis.ordersGrowth} changeLabel="vs mes ant." icon={<ShoppingCart size={16} />} iconColor="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" />
        <StatsCard title="Ticket Promedio" value={formatCurrency(kpis.avgOrderValue)} change={kpis.avgOrderGrowth} changeLabel="vs mes ant." icon={<TrendingUp size={16} />} iconColor="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400" />
        <StatsCard title="Conversión" value={`${kpis.conversionRate}%`} change={kpis.conversionGrowth} changeLabel="vs mes ant." icon={<Percent size={16} />} iconColor="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" />
        <StatsCard title="Nuevos Clientes" value={kpis.newCustomers} change={kpis.customersGrowth} changeLabel="vs mes ant." icon={<Users size={16} />} iconColor="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400" />
        <StatsCard title="Retención" value={`${kpis.returnRate}%`} change={kpis.returnGrowth} changeLabel="vs mes ant." icon={<BarChart3 size={16} />} iconColor="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" />
      </div>

      {/* Revenue Chart */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Ventas Mensuales</h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400">Comparativa ventas vs meta 2024</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlySales}>
            <defs>
              <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-zinc-800" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="ventas" name="Ventas" stroke="#6366f1" strokeWidth={2} fill="url(#colorVentas)" />
            <Area type="monotone" dataKey="meta" name="Meta" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fill="url(#colorMeta)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Orders */}
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Pedidos Semanales</h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">Pedidos vs entregados esta semana</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyOrders} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-zinc-800" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="pedidos" name="Pedidos" fill="#6366f1" radius={[6, 6, 0, 0]} />
              <Bar dataKey="entregados" name="Entregados" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Pie */}
        <Card>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Ventas por Categoría</h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mb-4">Distribución de ingresos</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryRevenue} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {categoryRevenue.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryRevenue.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.fill }} />
                  <span className="text-slate-600 dark:text-zinc-400">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Products + Customer Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Top Productos</h2>
          <div className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={product.sku} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-zinc-400 shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{product.name}</p>
                  <p className="text-xs text-slate-400 dark:text-zinc-500">{product.sold} vendidos</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{formatCurrency(product.revenue)}</p>
                  <p className={`text-xs font-medium ${product.growth >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {product.growth >= 0 ? '+' : ''}{product.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Customer Segments */}
        <Card>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Segmentación Clientes</h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mb-4">Distribución por segmento</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={customerSegments} cx="50%" cy="50%" outerRadius={85} paddingAngle={3} dataKey="value">
                {customerSegments.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {customerSegments.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.fill }} />
                <span className="text-slate-600 dark:text-zinc-400">{item.name}</span>
                <span className="font-semibold text-slate-900 dark:text-white ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </DashboardLayout>
);

export default AnalyticsPage;
