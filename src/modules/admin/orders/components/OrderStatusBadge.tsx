import { Badge } from '@/shared/ui';
import type { OrderStatus, PaymentStatus } from '../types/orders.types';

export const ORDER_STATUS_CONFIG: Record<OrderStatus, { label: string; variant: 'default' | 'info' | 'warning' | 'success' | 'danger' | 'purple' }> = {
  pendiente: { label: 'Pendiente', variant: 'warning' },
  pagado: { label: 'Pagado', variant: 'info' },
  preparando: { label: 'Preparando', variant: 'purple' },
  enviado: { label: 'Enviado', variant: 'info' },
  entregado: { label: 'Entregado', variant: 'success' },
  cancelado: { label: 'Cancelado', variant: 'danger' },
};

export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, { label: string; variant: 'default' | 'info' | 'warning' | 'success' | 'danger' | 'purple' }> = {
  pendiente: { label: 'Pendiente', variant: 'warning' },
  pagado: { label: 'Pagado', variant: 'success' },
  fallido: { label: 'Fallido', variant: 'danger' },
  reembolsado: { label: 'Reembolsado', variant: 'info' },
};

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const config = ORDER_STATUS_CONFIG[status];
  return <Badge variant={config.variant} dot>{config.label}</Badge>;
};

export const PaymentStatusBadge = ({ status }: { status: PaymentStatus }) => {
  const config = PAYMENT_STATUS_CONFIG[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
};
