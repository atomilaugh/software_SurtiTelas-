import { Edit, Trash2, MoreHorizontal, Eye, ArrowUpDown, Package } from 'lucide-react';
import {
  Table, TableHead, TableBody, TableRow, TableCell, TableHeader,
  Button, DropdownMenu, EmptyState, SkeletonTable, Pagination, Avatar
} from '@/shared/ui';
import { StockBadge, ProductStatusBadge } from './StockBadge';
import { useProducts, useDeleteProduct, useToggleProductStatus } from '../hooks/useInventory';
import { useInventoryStore } from '../store/inventory.store';
import { formatCurrency } from '@/shared/utils';
import type { Product } from '../types/inventory.types';

const ProductTable = () => {
  const { search, categoryFilter, supplierFilter, statusFilter, stockAlertFilter, page, pageSize, setPage, openModal } = useInventoryStore();
  const { data, isLoading } = useProducts({ search, categoryId: categoryFilter, supplierId: supplierFilter, status: statusFilter, stockAlert: stockAlertFilter, page, pageSize });
  const deleteProduct = useDeleteProduct();
  const toggleStatus = useToggleProductStatus();

  const products = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  const getDropdownItems = (product: Product) => [
    { label: 'Ver Kardex', icon: <Eye size={14} />, onClick: () => openModal('kardex', product) },
    { label: 'Editar', icon: <Edit size={14} />, onClick: () => openModal('product', product) },
    { label: product.status === 'active' ? 'Desactivar' : 'Activar', icon: <ArrowUpDown size={14} />, onClick: () => toggleStatus.mutate(product.id) },
    { label: 'Movimiento Stock', icon: <Package size={14} />, onClick: () => openModal('stock-movement', product) },
    { divider: true as const },
    { label: 'Eliminar', icon: <Trash2 size={14} />, danger: true, onClick: () => { if (confirm('¿Eliminar producto?')) deleteProduct.mutate(product.id); } },
  ];

  if (isLoading) return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6">
      <SkeletonTable rows={6} cols={7} />
    </div>
  );

  if (!products.length) return (
    <EmptyState
      icon={<Package size={32} />}
      title="No hay productos"
      description="No se encontraron productos con los filtros aplicados."
      action={<Button onClick={() => openModal('product')}>Crear producto</Button>}
    />
  );

  return (
    <div className="space-y-4">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Producto</TableHeader>
            <TableHeader>SKU</TableHeader>
            <TableHeader>Categoría</TableHeader>
            <TableHeader sortable>Precio</TableHeader>
            <TableHeader sortable>Stock</TableHeader>
            <TableHeader>Estado</TableHeader>
            <TableHeader>Proveedor</TableHeader>
            <TableHeader className="text-right">Acciones</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar name={product.name} size="sm" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{product.name}</p>
                    <p className="text-xs text-slate-400 dark:text-zinc-500 truncate max-w-[180px]">{product.description}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-mono text-xs bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded-lg">{product.sku}</span>
              </TableCell>
              <TableCell>{product.categoryName}</TableCell>
              <TableCell>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{formatCurrency(product.price)}</p>
                  <p className="text-xs text-slate-400 dark:text-zinc-500">Costo: {formatCurrency(product.costPrice)}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-slate-900 dark:text-white">{product.stock} {product.unit}</span>
                  <StockBadge product={product} />
                </div>
              </TableCell>
              <TableCell><ProductStatusBadge status={product.status} /></TableCell>
              <TableCell>
                <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-[140px] truncate">{product.supplierName}</p>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu
                  trigger={
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal size={16} />
                    </Button>
                  }
                  items={getDropdownItems(product)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={total}
        pageSize={pageSize}
      />
    </div>
  );
};

export default ProductTable;
