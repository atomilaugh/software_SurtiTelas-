import { Eye, MoreHorizontal, Truck, Package } from 'lucide-react';
import {
  Table, TableHead, TableBody, TableRow, TableCell, TableHeader,
  Button, DropdownMenu, EmptyState, SkeletonTable, Pagination, Avatar
} from '@/shared/ui';
import { OrderStatusBadge, PaymentStatusBadge, ORDER_STATUS_CONFIG } from './OrderStatusBadge';
import { useOrders, useUpdateOrderStatus } from '../hooks/useOrders';
import { useOrdersStore } from '../store/orders.store';
import { formatCurrency, formatDate } from '@/shared/utils';
import { useAuth } from '@presentation/contexts/AuthContext';
import type { Order, OrderStatus } from '../types/orders.types';

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  pendiente: 'pagado',
  pagado: 'preparando',
  preparando: 'enviado',
  enviado: 'entregado',
};

const OrdersTable = () => {
  const { search, statusFilter, paymentFilter, page, pageSize, setPage, openDetail, openAssignDelivery } = useOrdersStore();
  const { data, isLoading } = useOrders({ search, status: statusFilter, paymentStatus: paymentFilter, page, pageSize });
  const updateStatus = useUpdateOrderStatus();
  const { user } = useAuth();

  const orders = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  const getDropdownItems = (order: Order) => {
    const nextStatus = NEXT_STATUS[order.status];
    const items = [
      { label: 'Ver detalle', icon: <Eye size={14} />, onClick: () => openDetail(order) },
    ];
    if (nextStatus) {
      items.push({
        label: `Marcar como ${ORDER_STATUS_CONFIG[nextStatus].label}`,
        icon: <Package size={14} />,
        onClick: () => updateStatus.mutate({ id: order.id, status: nextStatus, userId: user?.uid || '', userName: user?.email || '' }),
      });
    }
    if (order.status === 'pagado' || order.status === 'preparando') {
      items.push({ label: 'Asignar domiciliario', icon: <Truck size={14} />, onClick: () => openAssignDelivery(order) });
    }
    return items;
  };

  if (isLoading) return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6">
      <SkeletonTable rows={6} cols={7} />
    </div>
  );

  if (!orders.length) return (
    <EmptyState icon={<Package size={32} />} title="No hay pedidos" description="No se encontraron pedidos con los filtros aplicados." />
  );

  return (
    <div className="space-y-4">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Pedido</TableHeader>
            <TableHeader>Cliente</TableHeader>
            <TableHeader>Productos</TableHeader>
            <TableHeader sortable>Total</TableHeader>
            <TableHeader>Estado</TableHeader>
            <TableHeader>Pago</TableHeader>
            <TableHeader>Domiciliario</TableHeader>
            <TableHeader sortable>Fecha</TableHeader>
            <TableHeader className="text-right">Acciones</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white">{order.orderNumber}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar name={order.customerName} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-slate-900 dark:text-white">{order.customerName}</p>
                    <p className="text-xs text-slate-400 dark:text-zinc-500">{order.customerPhone}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">{order.items.length} ítem{order.items.length !== 1 ? 's' : ''}</span>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(order.total)}</span>
              </TableCell>
              <TableCell><OrderStatusBadge status={order.status} /></TableCell>
              <TableCell><PaymentStatusBadge status={order.paymentStatus} /></TableCell>
              <TableCell>
                {order.deliveryName
                  ? <span className="text-sm text-slate-600 dark:text-zinc-400">{order.deliveryName}</span>
                  : <span className="text-xs text-slate-400 dark:text-zinc-500">Sin asignar</span>
                }
              </TableCell>
              <TableCell className="text-xs text-slate-500 dark:text-zinc-400">{formatDate(order.createdAt)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu
                  trigger={<Button variant="ghost" size="icon-sm"><MoreHorizontal size={16} /></Button>}
                  items={getDropdownItems(order)}
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

export default OrdersTable;
