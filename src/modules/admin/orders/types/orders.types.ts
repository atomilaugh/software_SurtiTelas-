export type OrderStatus = 'pendiente' | 'pagado' | 'preparando' | 'enviado' | 'entregado' | 'cancelado';
export type PaymentStatus = 'pendiente' | 'pagado' | 'fallido' | 'reembolsado';
export type PaymentMethod = 'efectivo' | 'transferencia' | 'tarjeta' | 'nequi' | 'daviplata';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderAddress {
  street: string;
  city: string;
  department: string;
  zipCode?: string;
  reference?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: OrderAddress;
  deliveryId?: string;
  deliveryName?: string;
  notes?: string;
  timeline: OrderTimelineEvent[];
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface OrderTimelineEvent {
  id: string;
  status: OrderStatus;
  label: string;
  description?: string;
  userId: string;
  userName: string;
  createdAt: string;
}

export interface OrderFilters {
  search: string;
  status: string;
  paymentStatus: string;
  dateFrom: string;
  dateTo: string;
  page: number;
  pageSize: number;
}
