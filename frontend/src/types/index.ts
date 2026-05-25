export * from './auth.types';
export * from './dashboard';

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
  phone?: string;
  company?: string;
  address?: string;
  status?: string;
  joinedAt?: string;
  city?: string;
  country?: string;
  totalSpent?: number;
  orders?: number;
  title?: string;
  description?: string;
  [key: string]: unknown;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  image?: string;
  stock?: number;
  rating?: number;
  sku?: string;
  company?: string;
  [key: string]: unknown;
}

export interface CartItem {
  id: string;
  productId?: string;
  name?: string;
  price?: number;
  quantity?: number;
  image?: string;
  total?: number;
  [key: string]: unknown;
}

export interface Order {
  id: string;
  customer?: string;
  date?: string;
  status?: string;
  total?: number;
  items?: number;
  deliveryAddress?: string;
  paymentMethod?: string;
  [key: string]: unknown;
}

export interface Employee {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  position?: string;
  avatar?: string;
  team?: string;
  status?: string;
  [key: string]: unknown;
}

export interface AdvisorRating {
  id: string;
  client?: string;
  rating?: number;
  comment?: string;
  date?: string;
  status?: string;
  [key: string]: unknown;
}

export interface ProductRating {
  id: string;
  productId?: string;
  rating?: number;
  comment?: string;
  user?: string;
  date?: string;
  [key: string]: unknown;
}

export interface QuickMessage {
  id: string;
  sender?: string;
  message?: string;
  date?: string;
  read?: boolean;
  [key: string]: unknown;
}
