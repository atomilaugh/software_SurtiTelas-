import type { Order, OrderStatus } from '../types/orders.types';

const past = (days: number, hours = 0) => new Date(Date.now() - days * 86400000 - hours * 3600000).toISOString();

const makeTimeline = (statuses: OrderStatus[], names: string[]) =>
  statuses.map((status, i) => ({
    id: `tl-${i}`,
    status,
    label: { pendiente: 'Pedido recibido', pagado: 'Pago confirmado', preparando: 'En preparación', enviado: 'Enviado', entregado: 'Entregado', cancelado: 'Cancelado' }[status],
    userId: 'usr-1',
    userName: names[i] || 'Sistema',
    createdAt: past(5 - i, 0),
  }));

export const mockOrders: Order[] = [
  {
    id: 'ord-1', orderNumber: 'SC-2024-0001',
    customerId: 'cus-1', customerName: 'Laura Gómez', customerEmail: 'laura@email.com', customerPhone: '3001234567',
    items: [
      { id: 'oi-1', productId: 'prod-1', productName: 'Camiseta Básica Algodón', productSku: 'CAM-001', quantity: 3, unitPrice: 35000, subtotal: 105000 },
      { id: 'oi-2', productId: 'prod-4', productName: 'Vestido Casual Floral', productSku: 'VES-001', quantity: 1, unitPrice: 75000, subtotal: 75000 },
    ],
    subtotal: 180000, discount: 10000, tax: 0, total: 170000,
    status: 'entregado', paymentStatus: 'pagado', paymentMethod: 'nequi',
    shippingAddress: { street: 'Cra 15 #45-20', city: 'Medellín', department: 'Antioquia' },
    deliveryId: 'del-1', deliveryName: 'Juan Pérez',
    timeline: makeTimeline(['pendiente', 'pagado', 'preparando', 'enviado', 'entregado'], ['Sistema', 'Admin', 'Admin', 'Juan Pérez', 'Juan Pérez']),
    createdAt: past(5), updatedAt: past(1),
  },
  {
    id: 'ord-2', orderNumber: 'SC-2024-0002',
    customerId: 'cus-2', customerName: 'Carlos Martínez', customerEmail: 'carlos@email.com', customerPhone: '3109876543',
    items: [
      { id: 'oi-3', productId: 'prod-2', productName: 'Camiseta Polo Premium', productSku: 'CAM-002', quantity: 2, unitPrice: 65000, subtotal: 130000 },
    ],
    subtotal: 130000, discount: 0, tax: 0, total: 130000,
    status: 'enviado', paymentStatus: 'pagado', paymentMethod: 'transferencia',
    shippingAddress: { street: 'Cll 72 #30-15', city: 'Bogotá', department: 'Cundinamarca' },
    deliveryId: 'del-2', deliveryName: 'María López',
    timeline: makeTimeline(['pendiente', 'pagado', 'preparando', 'enviado'], ['Sistema', 'Admin', 'Admin', 'María López']),
    createdAt: past(3), updatedAt: past(0),
  },
  {
    id: 'ord-3', orderNumber: 'SC-2024-0003',
    customerId: 'cus-3', customerName: 'Ana Rodríguez', customerEmail: 'ana@email.com', customerPhone: '3205551234',
    items: [
      { id: 'oi-4', productId: 'prod-5', productName: 'Chaqueta Denim Clásica', productSku: 'CHA-001', quantity: 1, unitPrice: 120000, subtotal: 120000 },
      { id: 'oi-5', productId: 'prod-6', productName: 'Cinturón Cuero Genuino', productSku: 'ACC-001', quantity: 1, unitPrice: 45000, subtotal: 45000 },
    ],
    subtotal: 165000, discount: 0, tax: 0, total: 165000,
    status: 'preparando', paymentStatus: 'pagado', paymentMethod: 'tarjeta',
    shippingAddress: { street: 'Av 3N #12-45', city: 'Cali', department: 'Valle del Cauca' },
    timeline: makeTimeline(['pendiente', 'pagado', 'preparando'], ['Sistema', 'Admin', 'Admin']),
    createdAt: past(1), updatedAt: past(0),
  },
  {
    id: 'ord-4', orderNumber: 'SC-2024-0004',
    customerId: 'cus-4', customerName: 'Pedro Sánchez', customerEmail: 'pedro@email.com', customerPhone: '3154447890',
    items: [
      { id: 'oi-6', productId: 'prod-7', productName: 'Camiseta Estampada Gráfica', productSku: 'CAM-003', quantity: 5, unitPrice: 42000, subtotal: 210000 },
    ],
    subtotal: 210000, discount: 21000, tax: 0, total: 189000,
    status: 'pagado', paymentStatus: 'pagado', paymentMethod: 'daviplata',
    shippingAddress: { street: 'Cra 7 #100-50', city: 'Barranquilla', department: 'Atlántico' },
    timeline: makeTimeline(['pendiente', 'pagado'], ['Sistema', 'Admin']),
    createdAt: past(0, 3), updatedAt: past(0, 1),
  },
  {
    id: 'ord-5', orderNumber: 'SC-2024-0005',
    customerId: 'cus-5', customerName: 'Sofía Torres', customerEmail: 'sofia@email.com', customerPhone: '3001112233',
    items: [
      { id: 'oi-7', productId: 'prod-3', productName: 'Jean Slim Fit Hombre', productSku: 'PAN-001', quantity: 2, unitPrice: 89000, subtotal: 178000 },
    ],
    subtotal: 178000, discount: 0, tax: 0, total: 178000,
    status: 'pendiente', paymentStatus: 'pendiente', paymentMethod: 'efectivo',
    shippingAddress: { street: 'Cll 50 #20-30', city: 'Pereira', department: 'Risaralda' },
    timeline: makeTimeline(['pendiente'], ['Sistema']),
    createdAt: past(0, 1), updatedAt: past(0, 1),
  },
  {
    id: 'ord-6', orderNumber: 'SC-2024-0006',
    customerId: 'cus-6', customerName: 'Diego Herrera', customerEmail: 'diego@email.com', customerPhone: '3209998877',
    items: [
      { id: 'oi-8', productId: 'prod-1', productName: 'Camiseta Básica Algodón', productSku: 'CAM-001', quantity: 10, unitPrice: 35000, subtotal: 350000 },
    ],
    subtotal: 350000, discount: 35000, tax: 0, total: 315000,
    status: 'cancelado', paymentStatus: 'reembolsado', paymentMethod: 'transferencia',
    shippingAddress: { street: 'Cra 30 #15-20', city: 'Manizales', department: 'Caldas' },
    notes: 'Cliente canceló por cambio de talla',
    timeline: makeTimeline(['pendiente', 'cancelado'], ['Sistema', 'Admin']),
    createdAt: past(7), updatedAt: past(6),
  },
];
