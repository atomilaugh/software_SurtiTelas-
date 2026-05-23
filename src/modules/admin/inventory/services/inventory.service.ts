import type { Product, Category, Supplier, StockMovement, InventoryStats, InventoryFilters } from '../types/inventory.types';
import type { ProductFormData, CategoryFormData, SupplierFormData, StockMovementFormData } from '../schemas/inventory.schema';
import {
  mockProducts, mockCategories, mockSuppliers,
  mockStockMovements, mockInventoryStats
} from '../mock/inventory.mock';

// Simulate async delay
const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

let products = [...mockProducts];
let categories = [...mockCategories];
let suppliers = [...mockSuppliers];
let movements = [...mockStockMovements];

export const inventoryService = {
  // ── Products ──────────────────────────────────────────────
  async getProducts(filters: Partial<InventoryFilters> = {}): Promise<{ data: Product[]; total: number }> {
    await delay();
    let result = [...products];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    if (filters.categoryId) result = result.filter(p => p.categoryId === filters.categoryId);
    if (filters.supplierId) result = result.filter(p => p.supplierId === filters.supplierId);
    if (filters.status) result = result.filter(p => p.status === filters.status);
    if (filters.stockAlert) result = result.filter(p => p.stock <= p.minStock);
    const total = result.length;
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    return { data: result.slice((page - 1) * pageSize, page * pageSize), total };
  },

  async getProductById(id: string): Promise<Product | null> {
    await delay(200);
    return products.find(p => p.id === id) || null;
  },

  async createProduct(data: ProductFormData): Promise<Product> {
    await delay();
    const cat = categories.find(c => c.id === data.categoryId);
    const sup = suppliers.find(s => s.id === data.supplierId);
    const product: Product = {
      id: `prod-${Date.now()}`,
      ...data,
      description: data.description || '',
      categoryName: cat?.name || '',
      supplierName: sup?.name || '',
      images: [],
      tags: data.tags ? data.tags.split(',').map(t => t.trim()) : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    products = [product, ...products];
    return product;
  },

  async updateProduct(id: string, data: Partial<ProductFormData>): Promise<Product> {
    await delay();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Producto no encontrado');
    const cat = data.categoryId ? categories.find(c => c.id === data.categoryId) : null;
    const sup = data.supplierId ? suppliers.find(s => s.id === data.supplierId) : null;
    products[idx] = {
      ...products[idx],
      ...data,
      categoryName: cat?.name || products[idx].categoryName,
      supplierName: sup?.name || products[idx].supplierName,
      tags: data.tags ? data.tags.split(',').map(t => t.trim()) : products[idx].tags,
      updatedAt: new Date().toISOString(),
    };
    return products[idx];
  },

  async deleteProduct(id: string): Promise<void> {
    await delay();
    products = products.filter(p => p.id !== id);
  },

  async toggleProductStatus(id: string): Promise<Product> {
    await delay(200);
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Producto no encontrado');
    products[idx].status = products[idx].status === 'active' ? 'inactive' : 'active';
    products[idx].updatedAt = new Date().toISOString();
    return products[idx];
  },

  // ── Categories ────────────────────────────────────────────
  async getCategories(): Promise<Category[]> {
    await delay(200);
    return [...categories];
  },

  async createCategory(data: CategoryFormData): Promise<Category> {
    await delay();
    const cat: Category = {
      id: `cat-${Date.now()}`,
      ...data,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      productCount: 0,
      createdAt: new Date().toISOString(),
    };
    categories = [cat, ...categories];
    return cat;
  },

  async updateCategory(id: string, data: Partial<CategoryFormData>): Promise<Category> {
    await delay();
    const idx = categories.findIndex(c => c.id === id);
    if (idx === -1) throw new Error('Categoría no encontrada');
    categories[idx] = { ...categories[idx], ...data };
    return categories[idx];
  },

  async deleteCategory(id: string): Promise<void> {
    await delay();
    categories = categories.filter(c => c.id !== id);
  },

  // ── Suppliers ─────────────────────────────────────────────
  async getSuppliers(): Promise<Supplier[]> {
    await delay(200);
    return [...suppliers];
  },

  async createSupplier(data: SupplierFormData): Promise<Supplier> {
    await delay();
    const sup: Supplier = {
      id: `sup-${Date.now()}`,
      ...data,
      productCount: 0,
      createdAt: new Date().toISOString(),
    };
    suppliers = [sup, ...suppliers];
    return sup;
  },

  async updateSupplier(id: string, data: Partial<SupplierFormData>): Promise<Supplier> {
    await delay();
    const idx = suppliers.findIndex(s => s.id === id);
    if (idx === -1) throw new Error('Proveedor no encontrado');
    suppliers[idx] = { ...suppliers[idx], ...data };
    return suppliers[idx];
  },

  async deleteSupplier(id: string): Promise<void> {
    await delay();
    suppliers = suppliers.filter(s => s.id !== id);
  },

  // ── Stock Movements ───────────────────────────────────────
  async getMovements(productId?: string): Promise<StockMovement[]> {
    await delay(200);
    return productId ? movements.filter(m => m.productId === productId) : [...movements];
  },

  async createMovement(data: StockMovementFormData, userId: string, userName: string): Promise<StockMovement> {
    await delay();
    const product = products.find(p => p.id === data.productId);
    if (!product) throw new Error('Producto no encontrado');
    const previousStock = product.stock;
    let newStock = previousStock;
    if (data.type === 'entrada' || data.type === 'devolucion') newStock += data.quantity;
    else if (data.type === 'salida') newStock = Math.max(0, newStock - data.quantity);
    else if (data.type === 'ajuste') newStock = data.quantity;
    const idx = products.findIndex(p => p.id === data.productId);
    products[idx].stock = newStock;
    const movement: StockMovement = {
      id: `mov-${Date.now()}`,
      productId: data.productId,
      productName: product.name,
      productSku: product.sku,
      type: data.type,
      quantity: data.quantity,
      previousStock,
      newStock,
      reason: data.reason,
      reference: data.reference,
      userId,
      userName,
      createdAt: new Date().toISOString(),
    };
    movements = [movement, ...movements];
    return movement;
  },

  // ── Stats ─────────────────────────────────────────────────
  async getStats(): Promise<InventoryStats> {
    await delay(300);
    return {
      totalProducts: products.length,
      activeProducts: products.filter(p => p.status === 'active').length,
      lowStockProducts: products.filter(p => p.stock > 0 && p.stock <= p.minStock).length,
      outOfStockProducts: products.filter(p => p.stock === 0).length,
      totalValue: products.reduce((acc, p) => acc + p.stock * p.costPrice, 0),
      totalCategories: categories.filter(c => c.status === 'active').length,
      totalSuppliers: suppliers.filter(s => s.status === 'active').length,
    };
  },
};
