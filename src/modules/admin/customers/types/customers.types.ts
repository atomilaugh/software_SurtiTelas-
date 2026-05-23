export type CustomerSegment = 'vip' | 'frecuente' | 'nuevo' | 'inactivo';
export type CustomerStatus = 'active' | 'blocked';

export interface CustomerAddress {
  id: string;
  label: string;
  street: string;
  city: string;
  department: string;
  isDefault: boolean;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  document: string;
  documentType: 'CC' | 'NIT' | 'CE' | 'PP';
  segment: CustomerSegment;
  status: CustomerStatus;
  addresses: CustomerAddress[];
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerFilters {
  search: string;
  segment: string;
  status: string;
  page: number;
  pageSize: number;
}
