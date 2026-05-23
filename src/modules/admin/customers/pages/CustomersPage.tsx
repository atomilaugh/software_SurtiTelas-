import DashboardLayout from '../../dashboard/components/layout/DashboardLayout';
import { StatsCard, Input, Select, Button } from '@/shared/ui';
import { Users, Crown, TrendingUp, UserX, Search, X } from 'lucide-react';
import { useCustomerStats } from '../hooks/useCustomers';
import { useCustomersStore } from '../store/customers.store';
import { formatCurrency } from '@/shared/utils';
import CustomersTable from '../components/CustomersTable';

const SEGMENT_OPTIONS = [
  { value: 'vip', label: 'VIP' },
  { value: 'frecuente', label: 'Frecuente' },
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'inactivo', label: 'Inactivo' },
];

const CustomersPage = () => {
  const { data: stats, isLoading } = useCustomerStats();
  const { search, segmentFilter, statusFilter, setSearch, setSegmentFilter, setStatusFilter, resetFilters } = useCustomersStore();
  const hasFilters = !!(search || segmentFilter || statusFilter);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Clientes</h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">Gestión y segmentación de clientes</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
          <StatsCard title="Total" value={stats?.total ?? 0} icon={<Users size={16} />} iconColor="bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400" loading={isLoading} />
          <StatsCard title="VIP" value={stats?.vip ?? 0} icon={<Crown size={16} />} iconColor="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" loading={isLoading} />
          <StatsCard title="Frecuentes" value={stats?.frecuente ?? 0} icon={<TrendingUp size={16} />} iconColor="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" loading={isLoading} />
          <StatsCard title="Bloqueados" value={stats?.blocked ?? 0} icon={<UserX size={16} />} iconColor="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" loading={isLoading} />
          <StatsCard title="Revenue Total" value={stats ? formatCurrency(stats.totalRevenue) : '$0'} icon={<TrendingUp size={16} />} iconColor="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" loading={isLoading} />
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1">
              <Input placeholder="Buscar por nombre, email o teléfono..." value={search} onChange={(e) => setSearch(e.target.value)} leftIcon={<Search size={16} />} rightIcon={search ? <button onClick={() => setSearch('')}><X size={14} /></button> : undefined} />
            </div>
            <div className="flex flex-wrap gap-3">
              <Select options={SEGMENT_OPTIONS} placeholder="Segmento" value={segmentFilter} onChange={(e) => setSegmentFilter(e.target.value)} className="w-36" />
              <Select options={[{ value: 'active', label: 'Activo' }, { value: 'blocked', label: 'Bloqueado' }]} placeholder="Estado" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-32" />
              {hasFilters && <Button variant="ghost" size="md" onClick={resetFilters} leftIcon={<X size={14} />}>Limpiar</Button>}
            </div>
          </div>
        </div>

        <CustomersTable />
      </div>
    </DashboardLayout>
  );
};

export default CustomersPage;
