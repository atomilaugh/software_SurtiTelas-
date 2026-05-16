import type { Order, OrderStatus, OrderFilters } from '../types/orders.types';
import { mockOrders } from '../mock/orders.mock';

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));
let orders = [...mockOrders];

export const ordersService = {
  async getOrders(filters: Partial<OrderFilters> = {}): Promise<{ data: Order[]; total: number }> {
    await delay();
    let result = [...orders];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(o =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
      );
    }
    if (filters.status) result = result.filter(o => o.status === filters.status);
    if (filters.paymentStatus) result = result.filter(o => o.paymentStatus === filters.paymentStatus);
    const total = result.length;
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    return { data: result.slice((page - 1) * pageSize, page * pageSize), total };
  },

  async getOrderById(id: string): Promise<Order | null> {
    await delay(200);
    return orders.find(o => o.id === id) || null;
  },

  async updateOrderStatus(id: string, status: OrderStatus, userId: string, userName: string): Promise<Order> {
    await delay();
    const idx = orders.findIndex(o => o.id === id);
    if (idx === -1) throw new Error('Pedido no encontrado');
    const statusLabels: Record<OrderStatus, string> = {
      pendiente: 'Pedido recibido', pagado: 'Pago confirmado', preparando: 'En preparación',
      enviado: 'Enviado', entregado: 'Entregado', cancelado: 'Cancelado',
    };
    orders[idx] = {
      ...orders[idx],
      status,
      updatedAt: new Date().toISOString(),
      timeline: [
        ...orders[idx].timeline,
        { id: `tl-${Date.now()}`, status, label: statusLabels[status], userId, userName, createdAt: new Date().toISOString() },
      ],
    };
    return orders[idx];
  },

  async assignDelivery(id: string, deliveryId: string, deliveryName: string): Promise<Order> {
    await delay();
    const idx = orders.findIndex(o => o.id === id);
    if (idx === -1) throw new Error('Pedido no encontrado');
    orders[idx] = { ...orders[idx], deliveryId, deliveryName, updatedAt: new Date().toISOString() };
    return orders[idx];
  },

  async getOrderStats() {
    await delay(200);
    return {
      total: orders.length,
      pendiente: orders.filter(o => o.status === 'pendiente').length,
      preparando: orders.filter(o => o.status === 'preparando').length,
      enviado: orders.filter(o => o.status === 'enviado').length,
      entregado: orders.filter(o => o.status === 'entregado').length,
      cancelado: orders.filter(o => o.status === 'cancelado').length,
      revenue: orders.filter(o => o.paymentStatus === 'pagado').reduce((acc, o) => acc + o.total, 0),
    };
  },
};
