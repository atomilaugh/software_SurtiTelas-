import type { Product, Category, Supplier, StockMovement, InventoryStats } from '../types/inventory.types';

const now = new Date().toISOString();
const past = (days: number) => new Date(Date.now() - days * 86400000).toISOString();

export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Camisetas', slug: 'camisetas', description: 'Camisetas de todo tipo', productCount: 45, status: 'active', createdAt: past(90) },
  { id: 'cat-2', name: 'Pantalones', slug: 'pantalones', description: 'Pantalones y jeans', productCount: 32, status: 'active', createdAt: past(85) },
  { id: 'cat-3', name: 'Vestidos', slug: 'vestidos', description: 'Vestidos y faldas', productCount: 28, status: 'active', createdAt: past(80) },
  { id: 'cat-4', name: 'Chaquetas', slug: 'chaquetas', description: 'Chaquetas y abrigos', productCount: 18, status: 'active', createdAt: past(75) },
  { id: 'cat-5', name: 'Accesorios', slug: 'accesorios', description: 'Cinturones, gorras, etc.', productCount: 55, status: 'active', createdAt: past(70) },
  { id: 'cat-6', name: 'Ropa Interior', slug: 'ropa-interior', description: 'Ropa interior y pijamas', productCount: 40, status: 'inactive', createdAt: past(60) },
];

export const mockSuppliers: Supplier[] = [
  { id: 'sup-1', name: 'Textiles Colombia S.A.S', contactName: 'Carlos Rodríguez', email: 'carlos@textilescol.com', phone: '3001234567', address: 'Cra 15 #45-20', city: 'Medellín', nit: '900123456-1', status: 'active', productCount: 120, createdAt: past(180) },
  { id: 'sup-2', name: 'Confecciones del Valle', contactName: 'María López', email: 'maria@confvalle.com', phone: '3109876543', address: 'Av 3N #12-45', city: 'Cali', nit: '800987654-2', status: 'active', productCount: 85, createdAt: past(150) },
  { id: 'sup-3', name: 'Industrias Textil Norte', contactName: 'Pedro Gómez', email: 'pedro@texnorte.com', phone: '3205551234', address: 'Cll 72 #30-15', city: 'Barranquilla', nit: '700456789-3', status: 'active', productCount: 60, createdAt: past(120) },
  { id: 'sup-4', name: 'Moda Express Ltda', contactName: 'Ana Martínez', email: 'ana@modaexpress.com', phone: '3154447890', address: 'Cra 7 #100-50', city: 'Bogotá', nit: '600321654-4', status: 'inactive', productCount: 30, createdAt: past(90) },
];

export const mockProducts: Product[] = [
  { id: 'prod-1', sku: 'CAM-001', name: 'Camiseta Básica Algodón', description: 'Camiseta 100% algodón peinado, suave y duradera', categoryId: 'cat-1', categoryName: 'Camisetas', supplierId: 'sup-1', supplierName: 'Textiles Colombia S.A.S', price: 35000, costPrice: 18000, stock: 150, minStock: 20, maxStock: 300, unit: 'und', images: [], status: 'active', tags: ['algodón', 'básica', 'unisex'], createdAt: past(60), updatedAt: past(2) },
  { id: 'prod-2', sku: 'CAM-002', name: 'Camiseta Polo Premium', description: 'Polo de alta calidad con bordado', categoryId: 'cat-1', categoryName: 'Camisetas', supplierId: 'sup-1', supplierName: 'Textiles Colombia S.A.S', price: 65000, costPrice: 32000, stock: 8, minStock: 15, maxStock: 100, unit: 'und', images: [], status: 'active', tags: ['polo', 'premium'], createdAt: past(55), updatedAt: past(1) },
  { id: 'prod-3', sku: 'PAN-001', name: 'Jean Slim Fit Hombre', description: 'Jean de corte slim, tela stretch', categoryId: 'cat-2', categoryName: 'Pantalones', supplierId: 'sup-2', supplierName: 'Confecciones del Valle', price: 89000, costPrice: 45000, stock: 0, minStock: 10, maxStock: 80, unit: 'und', images: [], status: 'active', tags: ['jean', 'slim', 'hombre'], createdAt: past(50), updatedAt: past(3) },
  { id: 'prod-4', sku: 'VES-001', name: 'Vestido Casual Floral', description: 'Vestido ligero con estampado floral', categoryId: 'cat-3', categoryName: 'Vestidos', supplierId: 'sup-2', supplierName: 'Confecciones del Valle', price: 75000, costPrice: 38000, stock: 45, minStock: 10, maxStock: 60, unit: 'und', images: [], status: 'active', tags: ['vestido', 'floral', 'casual'], createdAt: past(45), updatedAt: past(5) },
  { id: 'prod-5', sku: 'CHA-001', name: 'Chaqueta Denim Clásica', description: 'Chaqueta de jean clásica, corte regular', categoryId: 'cat-4', categoryName: 'Chaquetas', supplierId: 'sup-3', supplierName: 'Industrias Textil Norte', price: 120000, costPrice: 65000, stock: 5, minStock: 8, maxStock: 40, unit: 'und', images: [], status: 'active', tags: ['chaqueta', 'denim', 'clásica'], createdAt: past(40), updatedAt: past(1) },
  { id: 'prod-6', sku: 'ACC-001', name: 'Cinturón Cuero Genuino', description: 'Cinturón de cuero genuino con hebilla metálica', categoryId: 'cat-5', categoryName: 'Accesorios', supplierId: 'sup-3', supplierName: 'Industrias Textil Norte', price: 45000, costPrice: 22000, stock: 80, minStock: 15, maxStock: 150, unit: 'und', images: [], status: 'active', tags: ['cinturón', 'cuero', 'accesorio'], createdAt: past(35), updatedAt: past(7) },
  { id: 'prod-7', sku: 'CAM-003', name: 'Camiseta Estampada Gráfica', description: 'Camiseta con diseño gráfico exclusivo', categoryId: 'cat-1', categoryName: 'Camisetas', supplierId: 'sup-1', supplierName: 'Textiles Colombia S.A.S', price: 42000, costPrice: 21000, stock: 200, minStock: 30, maxStock: 400, unit: 'und', images: [], status: 'active', tags: ['estampada', 'gráfica'], createdAt: past(30), updatedAt: now },
  { id: 'prod-8', sku: 'PAN-002', name: 'Pantalón Cargo Táctico', description: 'Pantalón cargo con múltiples bolsillos', categoryId: 'cat-2', categoryName: 'Pantalones', supplierId: 'sup-2', supplierName: 'Confecciones del Valle', price: 95000, costPrice: 50000, stock: 3, minStock: 10, maxStock: 60, unit: 'und', images: [], status: 'inactive', tags: ['cargo', 'táctico'], createdAt: past(25), updatedAt: past(4) },
];

export const mockStockMovements: StockMovement[] = [
  { id: 'mov-1', productId: 'prod-1', productName: 'Camiseta Básica Algodón', productSku: 'CAM-001', type: 'entrada', quantity: 50, previousStock: 100, newStock: 150, reason: 'Reposición de inventario', reference: 'OC-2024-001', userId: 'usr-1', userName: 'Admin', createdAt: past(2) },
  { id: 'mov-2', productId: 'prod-2', productName: 'Camiseta Polo Premium', productSku: 'CAM-002', type: 'salida', quantity: 12, previousStock: 20, newStock: 8, reason: 'Venta pedido #1234', reference: 'PED-1234', userId: 'usr-1', userName: 'Admin', createdAt: past(1) },
  { id: 'mov-3', productId: 'prod-3', productName: 'Jean Slim Fit Hombre', productSku: 'PAN-001', type: 'salida', quantity: 15, previousStock: 15, newStock: 0, reason: 'Venta pedido #1235', reference: 'PED-1235', userId: 'usr-2', userName: 'Asesor', createdAt: past(3) },
  { id: 'mov-4', productId: 'prod-5', productName: 'Chaqueta Denim Clásica', productSku: 'CHA-001', type: 'ajuste', quantity: 3, previousStock: 8, newStock: 5, reason: 'Ajuste por inventario físico', userId: 'usr-1', userName: 'Admin', createdAt: past(1) },
  { id: 'mov-5', productId: 'prod-7', productName: 'Camiseta Estampada Gráfica', productSku: 'CAM-003', type: 'entrada', quantity: 100, previousStock: 100, newStock: 200, reason: 'Nuevo lote proveedor', reference: 'OC-2024-002', userId: 'usr-1', userName: 'Admin', createdAt: now },
];

export const mockInventoryStats: InventoryStats = {
  totalProducts: mockProducts.length,
  activeProducts: mockProducts.filter(p => p.status === 'active').length,
  lowStockProducts: mockProducts.filter(p => p.stock > 0 && p.stock <= p.minStock).length,
  outOfStockProducts: mockProducts.filter(p => p.stock === 0).length,
  totalValue: mockProducts.reduce((acc, p) => acc + p.stock * p.costPrice, 0),
  totalCategories: mockCategories.filter(c => c.status === 'active').length,
  totalSuppliers: mockSuppliers.filter(s => s.status === 'active').length,
};
