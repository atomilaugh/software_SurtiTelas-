// Types for the SurtiCamisetas application

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[]; // Galería de imágenes adicionales
  category: 'adolescentes' | 'adultos' | 'niños';
  sizes: string[];
  colors: string[];
  stock: number;
  brand?: string; // Marca del producto
  discount?: number; // Porcentaje de descuento (0-100)
  isOnSale?: boolean; // Si el producto está en oferta
  isFavorite?: boolean; // Si es favorito (para el usuario actual)
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface WorkshopAssignment {
  orderId: string;
  productName: string;
  quantity: number;
  deliveryDate: string;
}

export interface Workshop {
  id: string;
  name: string;
  type: 'estampado' | 'bordado' | 'confección';
  status: 'activo' | 'inactivo';
  capacity: number;
  currentOrders: number;
  assignments: WorkshopAssignment[];
}

export interface OrderTracking {
  status: 'recibido' | 'empaquetado' | 'en_transito' | 'entregado';
  date: string;
  description: string;
}

export interface PaymentProof {
  url: string;
  uploadDate: string;
  validationStatus: 'revision' | 'aprobado' | 'rechazado';
  validatedBy?: string;
  validatedDate?: string;
  rejectionReason?: string;
}

export interface OrderNotification {
  id: string;
  orderId: string;
  type: 'payment_validation' | 'order_status' | 'tracking_update';
  message: string;
  date: string;
  read: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  items: CartItem[];
  total: number;
  status: 'pendiente' | 'en_proceso' | 'completado' | 'cancelado';
  date: string;
  workshop?: string;
  paymentMethod?: 'efectivo' | 'transferencia' | 'tarjeta';
  paymentProof?: PaymentProof;
  tracking?: OrderTracking[];
  notifications?: OrderNotification[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'employee';
  phone?: string;
  address?: string;
  assignedAdvisorId?: string; // ID del asesor asignado (para clientes)
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'activo' | 'inactivo' | 'bloqueado';
  address?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  status: 'activo' | 'inactivo';
  productCount: number;
}

export interface Provider {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  products: string[];
  status: 'activo' | 'inactivo';
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: string;
  status: 'aprobado' | 'pendiente' | 'rechazado';
}

export interface SiteConfig {
  siteName: string;
  logo: string;
  slogan: string;
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    whatsapp: string;
  };
  policies: {
    privacy: string;
    terms: string;
    returns: string;
  };
}

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  discount: number;
  startDate: string;
  endDate: string;
  status: 'activo' | 'inactivo';
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'asesor' | 'vendedor' | 'gerente';
  status: 'activo' | 'inactivo' | 'vacaciones';
  hireDate: string;
  salesThisMonth: number;
  totalSales: number;
  ordersCompleted: number;
  commission: number;
  avatar?: string;
  department: string;
  assignedClientIds?: string[]; // IDs de clientes asignados (para asesores)
}

export interface ClientAdvisorRelation {
  clientId: string;
  clientName: string;
  advisorId: string;
  advisorName: string;
  assignedDate: string;
  status: 'activo' | 'completado';
}

export interface AdvisorRating {
  id: string;
  advisorId: string;
  advisorName: string;
  clientId: string;
  clientName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  response?: string;
  responseDate?: string;
  status: 'pendiente' | 'respondido';
}

export interface ProductRating {
  id: string;
  productId: string;
  productName: string;
  clientId: string;
  clientName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  status: 'pendiente' | 'aprobado' | 'rechazado';
}

export interface QuickMessage {
  id: string;
  clientId: string;
  clientName: string;
  email: string;
  advisorId?: string;
  advisorName?: string;
  message: string;
  date: string;
  status: 'pendiente' | 'leido' | 'respondido';
  response?: string;
  responseDate?: string;
}

export interface PendingPayment {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  total: number;
  paymentProofImage: string; // URL de la imagen del comprobante
  uploadDate: string;
  status: 'en_verificacion' | 'aprobado' | 'denegado';
  reviewedBy?: string;
  reviewedDate?: string;
  denialReason?: string;
}



