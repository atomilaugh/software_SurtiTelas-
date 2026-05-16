import { Search, X } from 'lucide-react';
import { Input, Select, Button } from '@/shared/ui';
import { useOrdersStore } from '../store/orders.store';

const ORDER_STATUS_OPTIONS = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'pagado', label: 'Pagado' },
  { value: 'preparando', label: 'Preparando' },
  { value: 'enviado', label: 'Enviado' },
  { value: 'entregado', label: 'Entregado' },
  { value: 'cancelado', label: 'Cancelado' },
];

const PAYMENT_OPTIONS = [
  { value: 'pendiente', label: 'Pago pendiente' },
  { value: 'pagado', label: 'Pagado' },
  { value: 'fallido', label: 'Fallido' },
  { value: 'reembolsado', label: 'Reembolsado' },
];

const OrderFilters = () => {
  const { search, statusFilter, paymentFilter, setSearch, setStatusFilter, setPaymentFilter, resetFilters } = useOrdersStore();
  const hasFilters = !!(search || statusFilter || paymentFilter);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-4">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Buscar por número, cliente o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={16} />}
            rightIcon={search ? <button onClick={() => setSearch('')}><X size={14} /></button> : undefined}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Select options={ORDER_STATUS_OPTIONS} placeholder="Estado pedido" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-40" />
          <Select options={PAYMENT_OPTIONS} placeholder="Estado pago" value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="w-40" />
          {hasFilters && (
            <Button variant="ghost" size="md" onClick={resetFilters} leftIcon={<X size={14} />}>Limpiar</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderFilters;
