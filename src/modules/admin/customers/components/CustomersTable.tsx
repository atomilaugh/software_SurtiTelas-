import { Eye, MoreHorizontal, Ban, Trash2, ShieldCheck } from 'lucide-react';
import {
  Table, TableHead, TableBody, TableRow, TableCell, TableHeader,
  Button, DropdownMenu, EmptyState, SkeletonTable, Pagination, Avatar
} from '@/shared/ui';
import { CustomerSegmentBadge, CustomerStatusBadge } from './CustomerBadges';
import { useCustomers, useToggleBlockCustomer, useDeleteCustomer } from '../hooks/useCustomers';
import { useCustomersStore } from '../store/customers.store';
import { formatCurrency, formatDate } from '@/shared/utils';
import type { Customer } from '../types/customers.types';
import { Users } from 'lucide-react';

const CustomersTable = () => {
  const { search, segmentFilter, statusFilter, page, pageSize, setPage, openDetail } = useCustomersStore();
  const { data, isLoading } = useCustomers({ search, segment: segmentFilter, status: statusFilter, page, pageSize });
  const toggleBlock = useToggleBlockCustomer();
  const deleteCustomer = useDeleteCustomer();

  const customers = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  const getDropdownItems = (customer: Customer) => [
    { label: 'Ver detalle', icon: <Eye size={14} />, onClick: () => openDetail(customer) },
    { label: customer.status === 'active' ? 'Bloquear' : 'Desbloquear', icon: customer.status === 'active' ? <Ban size={14} /> : <ShieldCheck size={14} />, onClick: () => toggleBlock.mutate(customer.id) },
    { divider: true as const },
    { label: 'Eliminar', icon: <Trash2 size={14} />, danger: true, onClick: () => { if (confirm('¿Eliminar cliente?')) deleteCustomer.mutate(customer.id); } },
  ];

  if (isLoading) return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6">
      <SkeletonTable rows={6} cols={7} />
    </div>
  );

  if (!customers.length) return (
    <EmptyState icon={<Users size={32} />} title="No hay clientes" description="No se encontraron clientes con los filtros aplicados." />
  );

  return (
    <div className="space-y-4">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Cliente</TableHeader>
            <TableHeader>Documento</TableHeader>
            <TableHeader>Segmento</TableHeader>
            <TableHeader sortable>Pedidos</TableHeader>
            <TableHeader sortable>Total gastado</TableHeader>
            <TableHeader>Último pedido</TableHeader>
            <TableHeader>Estado</TableHeader>
            <TableHeader className="text-right">Acciones</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar name={customer.fullName} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-slate-900 dark:text-white">{customer.fullName}</p>
                    <p className="text-xs text-slate-400 dark:text-zinc-500">{customer.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-xs font-mono">{customer.documentType}: {customer.document}</span>
              </TableCell>
              <TableCell><CustomerSegmentBadge segment={customer.segment} /></TableCell>
              <TableCell><span className="font-semibold">{customer.totalOrders}</span></TableCell>
              <TableCell><span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(customer.totalSpent)}</span></TableCell>
              <TableCell className="text-xs text-slate-500 dark:text-zinc-400">
                {customer.lastOrderDate ? formatDate(customer.lastOrderDate) : '—'}
              </TableCell>
              <TableCell><CustomerStatusBadge status={customer.status} /></TableCell>
              <TableCell className="text-right">
                <DropdownMenu
                  trigger={<Button variant="ghost" size="icon-sm"><MoreHorizontal size={16} /></Button>}
                  items={getDropdownItems(customer)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={total} pageSize={pageSize} />
    </div>
  );
};

export default CustomersTable;
