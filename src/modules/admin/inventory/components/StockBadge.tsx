import { Badge } from '@/shared/ui';
import type { Product } from '../types/inventory.types';

interface StockBadgeProps { product: Product; }

export const StockBadge = ({ product }: StockBadgeProps) => {
  if (product.stock === 0) return <Badge variant="danger" dot>Sin stock</Badge>;
  if (product.stock <= product.minStock) return <Badge variant="warning" dot>Stock bajo</Badge>;
  return <Badge variant="success" dot>En stock</Badge>;
};

interface StatusBadgeProps { status: Product['status']; }

export const ProductStatusBadge = ({ status }: StatusBadgeProps) => {
  const map = {
    active: <Badge variant="success">Activo</Badge>,
    inactive: <Badge variant="default">Inactivo</Badge>,
    discontinued: <Badge variant="danger">Descontinuado</Badge>,
  };
  return map[status];
};
