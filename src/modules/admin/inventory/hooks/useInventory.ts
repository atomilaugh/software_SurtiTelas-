import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryService } from '../services/inventory.service';
import type { InventoryFilters } from '../types/inventory.types';
import type { ProductFormData, CategoryFormData, SupplierFormData, StockMovementFormData } from '../schemas/inventory.schema';
import toast from 'react-hot-toast';

export const INVENTORY_KEYS = {
  all: ['inventory'] as const,
  products: (filters?: Partial<InventoryFilters>) => ['inventory', 'products', filters] as const,
  product: (id: string) => ['inventory', 'product', id] as const,
  categories: () => ['inventory', 'categories'] as const,
  suppliers: () => ['inventory', 'suppliers'] as const,
  movements: (productId?: string) => ['inventory', 'movements', productId] as const,
  stats: () => ['inventory', 'stats'] as const,
};

export const useInventoryStats = () =>
  useQuery({ queryKey: INVENTORY_KEYS.stats(), queryFn: inventoryService.getStats });

export const useProducts = (filters: Partial<InventoryFilters> = {}) =>
  useQuery({
    queryKey: INVENTORY_KEYS.products(filters),
    queryFn: () => inventoryService.getProducts(filters),
    placeholderData: (prev) => prev,
  });

export const useProduct = (id: string) =>
  useQuery({ queryKey: INVENTORY_KEYS.product(id), queryFn: () => inventoryService.getProductById(id), enabled: !!id });

export const useCategories = () =>
  useQuery({ queryKey: INVENTORY_KEYS.categories(), queryFn: inventoryService.getCategories });

export const useSuppliers = () =>
  useQuery({ queryKey: INVENTORY_KEYS.suppliers(), queryFn: inventoryService.getSuppliers });

export const useStockMovements = (productId?: string) =>
  useQuery({ queryKey: INVENTORY_KEYS.movements(productId), queryFn: () => inventoryService.getMovements(productId) });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductFormData) => inventoryService.createProduct(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: INVENTORY_KEYS.all });
      toast.success('Producto creado exitosamente');
    },
    onError: () => toast.error('Error al crear producto'),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProductFormData> }) =>
      inventoryService.updateProduct(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: INVENTORY_KEYS.all });
      toast.success('Producto actualizado');
    },
    onError: () => toast.error('Error al actualizar producto'),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inventoryService.deleteProduct(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: INVENTORY_KEYS.all });
      toast.success('Producto eliminado');
    },
    onError: () => toast.error('Error al eliminar producto'),
  });
};

export const useToggleProductStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inventoryService.toggleProductStatus(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: INVENTORY_KEYS.all }),
    onError: () => toast.error('Error al cambiar estado'),
  });
};

export const useCreateCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryFormData) => inventoryService.createCategory(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: INVENTORY_KEYS.categories() });
      toast.success('Categoría creada');
    },
    onError: () => toast.error('Error al crear categoría'),
  });
};

export const useUpdateCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CategoryFormData> }) =>
      inventoryService.updateCategory(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: INVENTORY_KEYS.categories() });
      toast.success('Categoría actualizada');
    },
    onError: () => toast.error('Error al actualizar categoría'),
  });
};

export const useDeleteCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inventoryService.deleteCategory(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: INVENTORY_KEYS.categories() });
      toast.success('Categoría eliminada');
    },
    onError: () => toast.error('Error al eliminar categoría'),
  });
};

export const useCreateSupplier = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: SupplierFormData) => inventoryService.createSupplier(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: INVENTORY_KEYS.suppliers() });
      toast.success('Proveedor creado');
    },
    onError: () => toast.error('Error al crear proveedor'),
  });
};

export const useUpdateSupplier = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SupplierFormData> }) =>
      inventoryService.updateSupplier(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: INVENTORY_KEYS.suppliers() });
      toast.success('Proveedor actualizado');
    },
    onError: () => toast.error('Error al actualizar proveedor'),
  });
};

export const useDeleteSupplier = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inventoryService.deleteSupplier(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: INVENTORY_KEYS.suppliers() });
      toast.success('Proveedor eliminado');
    },
    onError: () => toast.error('Error al eliminar proveedor'),
  });
};

export const useCreateStockMovement = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ data, userId, userName }: { data: StockMovementFormData; userId: string; userName: string }) =>
      inventoryService.createMovement(data, userId, userName),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: INVENTORY_KEYS.all });
      toast.success('Movimiento registrado');
    },
    onError: () => toast.error('Error al registrar movimiento'),
  });
};
