import { Drawer, Badge, Button, Avatar } from '@/shared/ui';
import { OrderStatusBadge, PaymentStatusBadge, ORDER_STATUS_CONFIG } from './OrderStatusBadge';
import OrderTimeline from './OrderTimeline';
import { useOrdersStore } from '../store/orders.store';
import { useUpdateOrderStatus } from '../hooks/useOrders';
import { formatCurrency, formatDate } from '@/shared/utils';
import { useAuth } from '@presentation/contexts/AuthContext';
import { MapPin, Phone, Mail, Package, Truck } from 'lucide-react';
import type { OrderStatus } from '../types/orders.types';

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  pendiente: 'pagado', pagado: 'preparando', preparando: 'enviado', enviado: 'entregado',
};

const OrderDetails = () => {
  const { showDetail, selectedOrder, closeDetail, openAssignDelivery } = useOrdersStore();
  const updateStatus = useUpdateOrderStatus();
  const { user } = useAuth();

  if (!selectedOrder) return null;
  const order = selectedOrder;
  const nextStatus = NEXT_STATUS[order.status];

  return (
    <Drawer
      open={showDetail}
      onClose={closeDetail}
      title={`Pedido ${order.orderNumber}`}
      size="lg"
      footer={
        <div className="flex gap-2 w-full">
          {nextStatus && (
            <Button
              className="flex-1"
              loading={updateStatus.isPending}
              onClick={() => updateStatus.mutate({ id: order.id, status: nextStatus, userId: user?.uid || '', userName: user?.email || '' })}
            >
              Marcar como {ORDER_STATUS_CONFIG[nextStatus].label}
            </Button>
          )}
          {(order.status === 'pagado' || order.status === 'preparando') && (
            <Button variant="outline" onClick={() => openAssignDelivery(order)} leftIcon={<Truck size={14} />}>
              Asignar
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Status */}
        <div className="flex items-center gap-3 flex-wrap">
          <OrderStatusBadge status={order.status} />
          <PaymentStatusBadge status={order.paymentStatus} />
          <Badge variant="outline">{order.paymentMethod}</Badge>
        </div>

        {/* Customer */}
        <div className="bg-slate-50 dark:bg-zinc-800 rounded-xl p-4 space-y-2">
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-3">Cliente</p>
          <div className="flex items-center gap-3">
            <Avatar name={order.customerName} size="md" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{order.customerName}</p>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-zinc-400">
                <Mail size={11} />{order.customerEmail}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-zinc-400">
                <Phone size={11} />{order.customerPhone}
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-slate-50 dark:bg-zinc-800 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Dirección de envío</p>
          <div className="flex items-start gap-2 text-sm text-slate-700 dark:text-zinc-300">
            <MapPin size={14} className="mt-0.5 shrink-0 text-slate-400" />
            <span>{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.department}</span>
          </div>
        </div>

        {/* Items */}
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-3">Productos</p>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 py-2 border-b border-slate-100 dark:border-zinc-800 last:border-0">
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-slate-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{item.productName}</p>
                    <p className="text-xs text-slate-400 dark:text-zinc-500">{item.productSku} × {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold text-sm text-slate-900 dark:text-white">{formatCurrency(item.subtotal)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-zinc-700 space-y-1">
            <div className="flex justify-between text-sm text-slate-500 dark:text-zinc-400">
              <span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400">
                <span>Descuento</span><span>-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-slate-900 dark:text-white">
              <span>Total</span><span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Historial</p>
          <OrderTimeline events={order.timeline} />
        </div>

        {order.notes && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">Notas</p>
            <p className="text-sm text-amber-800 dark:text-amber-300">{order.notes}</p>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default OrderDetails;
