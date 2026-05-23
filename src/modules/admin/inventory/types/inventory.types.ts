export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  supplierId: string;
  supplierName: string;
  price: number;
  costPrice: number;
  stock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  images: string[];
  status: 'active' | 'inactive' | 'discontinued';
  tags: string[];
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  image?: string;
  productCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  nit: string;
  status: 'active' | 'inactive';
  productCount: number;
  createdAt: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  type: 'entrada' | 'salida' | 'ajuste' | 'devolucion';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  reference?: string;
  userId: string;
  userName: string;
  createdAt: string;
}

export interface InventoryFilters {
  search: string;
  categoryId: string;
  supplierId: string;
  status: string;
  stockAlert: boolean;
  page: number;
  pageSize: number;
}

export interface InventoryStats {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalValue: number;
  totalCategories: number;
  totalSuppliers: number;
}
