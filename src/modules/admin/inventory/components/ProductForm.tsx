import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, type ProductFormData } from '../schemas/inventory.schema';
import { useCategories, useSuppliers } from '../hooks/useInventory';
import { Input, Select, Button, Alert } from '@/shared/ui';
import type { Product } from '../types/inventory.types';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const UNIT_OPTIONS = [
  { value: 'und', label: 'Unidad' },
  { value: 'kg', label: 'Kilogramo' },
  { value: 'm', label: 'Metro' },
  { value: 'rollo', label: 'Rollo' },
  { value: 'caja', label: 'Caja' },
  { value: 'par', label: 'Par' },
];

const STATUS_OPTIONS = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
  { value: 'discontinued', label: 'Descontinuado' },
];

const ProductForm = ({ product, onSubmit, onCancel, isLoading }: ProductFormProps) => {
  const { data: categories = [] } = useCategories();
  const { data: suppliers = [] } = useSuppliers();

  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: product ? {
      name: product.name,
      sku: product.sku,
      description: product.description,
      categoryId: product.categoryId,
      supplierId: product.supplierId,
      price: product.price,
      costPrice: product.costPrice,
      stock: product.stock,
      minStock: product.minStock,
      maxStock: product.maxStock,
      unit: product.unit,
      status: product.status,
      tags: product.tags.join(', '),
      weight: product.weight,
    } : { status: 'active', unit: 'und', stock: 0, minStock: 5, maxStock: 100 },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Nombre del producto" error={errors.name?.message} {...register('name')} placeholder="Ej: Camiseta Básica" />
        <Input label="SKU" error={errors.sku?.message} {...register('sku')} placeholder="Ej: CAM-001" />
      </div>

      <Input label="Descripción" error={errors.description?.message} {...register('description')} placeholder="Descripción del producto..." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Categoría"
          error={errors.categoryId?.message}
          options={categories.map(c => ({ value: c.id, label: c.name }))}
          placeholder="Seleccionar categoría"
          {...register('categoryId')}
        />
        <Select
          label="Proveedor"
          error={errors.supplierId?.message}
          options={suppliers.map(s => ({ value: s.id, label: s.name }))}
          placeholder="Seleccionar proveedor"
          {...register('supplierId')}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Input label="Precio venta" type="number" error={errors.price?.message} {...register('price')} placeholder="0" />
        <Input label="Precio costo" type="number" error={errors.costPrice?.message} {...register('costPrice')} placeholder="0" />
        <Select label="Unidad" error={errors.unit?.message} options={UNIT_OPTIONS} {...register('unit')} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input label="Stock actual" type="number" error={errors.stock?.message} {...register('stock')} />
        <Input label="Stock mínimo" type="number" error={errors.minStock?.message} {...register('minStock')} />
        <Input label="Stock máximo" type="number" error={errors.maxStock?.message} {...register('maxStock')} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select label="Estado" error={errors.status?.message} options={STATUS_OPTIONS} {...register('status')} />
        <Input label="Etiquetas (separadas por coma)" error={errors.tags?.message} {...register('tags')} placeholder="algodón, básica, unisex" />
      </div>

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" title="Revisa los campos">
          Hay errores en el formulario. Por favor corrígelos antes de continuar.
        </Alert>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" loading={isLoading}>
          {product ? 'Actualizar producto' : 'Crear producto'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
