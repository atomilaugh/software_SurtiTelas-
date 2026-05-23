import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres').max(100),
  sku: z.string().min(2, 'SKU requerido').max(50),
  description: z.string().max(500).optional(),
  categoryId: z.string().min(1, 'Selecciona una categoría'),
  supplierId: z.string().min(1, 'Selecciona un proveedor'),
  price: z.preprocess((v) => Number(v), z.number().min(0, 'Precio inválido')),
  costPrice: z.preprocess((v) => Number(v), z.number().min(0, 'Costo inválido')),
  stock: z.preprocess((v) => Number(v), z.number().int().min(0)),
  minStock: z.preprocess((v) => Number(v), z.number().int().min(0)),
  maxStock: z.preprocess((v) => Number(v), z.number().int().min(0)),
  unit: z.string().min(1, 'Unidad requerida'),
  status: z.enum(['active', 'inactive', 'discontinued']),
  tags: z.string().optional(),
  weight: z.preprocess((v) => (v === '' || v === undefined ? undefined : Number(v)), z.number().min(0).optional()),
});

export const categorySchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres').max(60),
  description: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive']),
});

export const supplierSchema = z.object({
  name: z.string().min(2).max(100),
  contactName: z.string().min(2).max(100),
  email: z.string().email('Email inválido'),
  phone: z.string().min(7).max(20),
  address: z.string().min(5).max(200),
  city: z.string().min(2).max(60),
  nit: z.string().min(5).max(20),
  status: z.enum(['active', 'inactive']),
});

export const stockMovementSchema = z.object({
  productId: z.string().min(1, 'Selecciona un producto'),
  type: z.enum(['entrada', 'salida', 'ajuste', 'devolucion']),
  quantity: z.preprocess((v) => Number(v), z.number().int().min(1, 'Cantidad mínima 1')),
  reason: z.string().min(3, 'Describe el motivo').max(200),
  reference: z.string().max(50).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
export type SupplierFormData = z.infer<typeof supplierSchema>;
export type StockMovementFormData = z.infer<typeof stockMovementSchema>;
