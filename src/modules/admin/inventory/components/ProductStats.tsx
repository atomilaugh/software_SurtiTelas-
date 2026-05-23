import { Package, AlertTriangle, XCircle, DollarSign, Tag, Truck } from 'lucide-react';
import { StatsCard } from '@/shared/ui';
import { useInventoryStats } from '../hooks/useInventory';
import { formatCurrency } from '@/shared/utils';

const ProductStats = () => {
  const { data: stats, isLoading } = useInventoryStats();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatsCard
        title="Total Productos"
        value={stats?.totalProducts ?? 0}
        icon={<Package size={18} />}
        iconColor="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
        loading={isLoading}
      />
      <StatsCard
        title="Activos"
        value={stats?.activeProducts ?? 0}
        icon={<Package size={18} />}
        iconColor="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
        loading={isLoading}
      />
      <StatsCard
        title="Stock Bajo"
        value={stats?.lowStockProducts ?? 0}
        icon={<AlertTriangle size={18} />}
        iconColor="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
        loading={isLoading}
      />
      <StatsCard
        title="Sin Stock"
        value={stats?.outOfStockProducts ?? 0}
        icon={<XCircle size={18} />}
        iconColor="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
        loading={isLoading}
      />
      <StatsCard
        title="Valor Inventario"
        value={stats ? formatCurrency(stats.totalValue) : '$0'}
        icon={<DollarSign size={18} />}
        iconColor="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
        loading={isLoading}
      />
      <StatsCard
        title="Categorías"
        value={stats?.totalCategories ?? 0}
        icon={<Tag size={18} />}
        iconColor="bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
        loading={isLoading}
      />
    </div>
  );
};

export default ProductStats;
