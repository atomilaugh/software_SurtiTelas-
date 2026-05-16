import DashboardLayout from '../../dashboard/components/layout/DashboardLayout';
import { StatsCard } from '@/shared/ui';
import { ShoppingCart, Clock, Package, Truck, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { useOrderStats } from '../hooks/useOrders';
import { formatCurrency } from '@/shared/utils';
import OrderFilters from '../components/OrderFilters';
import OrdersTable from '../components/OrdersTable';
import OrderDetails from '../components/OrderDetails';
import AssignDeliveryModal from '../components/AssignDeliveryModal';

const OrdersPage = () => {
  const { data: stats, isLoading } = useOrderStats();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pedidos</h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">Gestión y seguimiento de órdenes</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
          <StatsCard title="Total" value={stats?.total ?? 0} icon={<ShoppingCart size={16} />} iconColor="bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400" loading={isLoading} />
          <StatsCard title="Pendientes" value={stats?.pendiente ?? 0} icon={<Clock size={16} />} iconColor="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" loading={isLoading} />
          <StatsCard title="Preparando" value={stats?.preparando ?? 0} icon={<Package size={16} />} iconColor="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" loading={isLoading} />
          <StatsCard title="Enviados" value={stats?.enviado ?? 0} icon={<Truck size={16} />} iconColor="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" loading={isLoading} />
          <StatsCard title="Entregados" value={stats?.entregado ?? 0} icon={<CheckCircle size={16} />} iconColor="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" loading={isLoading} />
          <StatsCard title="Cancelados" value={stats?.cancelado ?? 0} icon={<XCircle size={16} />} iconColor="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" loading={isLoading} />
          <StatsCard title="Ingresos" value={stats ? formatCurrency(stats.revenue) : '$0'} icon={<DollarSign size={16} />} iconColor="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" loading={isLoading} />
        </div>

        {/* Filters */}
        <OrderFilters />

        {/* Table */}
        <OrdersTable />

        {/* Drawers & Modals */}
        <OrderDetails />
        <AssignDeliveryModal />
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
