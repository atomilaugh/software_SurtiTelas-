import { Search, Filter, X, AlertTriangle } from 'lucide-react';
import { Input, Select, Button, Badge } from '@/shared/ui';
import { useInventoryStore } from '../store/inventory.store';
import { useCategories, useSuppliers } from '../hooks/useInventory';

const ProductFilters = () => {
  const {
    search, categoryFilter, supplierFilter, statusFilter, stockAlertFilter,
    setSearch, setCategoryFilter, setSupplierFilter, setStatusFilter, setStockAlertFilter, resetFilters,
  } = useInventoryStore();

  const { data: categories = [] } = useCategories();
  const { data: suppliers = [] } = useSuppliers();

  const activeFilters = [categoryFilter, supplierFilter, statusFilter, stockAlertFilter].filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-4">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nombre o SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={16} />}
            rightIcon={search ? (
              <button onClick={() => setSearch('')} className="hover:text-slate-700 dark:hover:text-white transition-colors">
                <X size={14} />
              </button>
            ) : undefined}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Select
            options={categories.map(c => ({ value: c.id, label: c.name }))}
            placeholder="Categoría"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-40"
          />
          <Select
            options={suppliers.map(s => ({ value: s.id, label: s.name }))}
            placeholder="Proveedor"
            value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)}
            className="w-44"
          />
          <Select
            options={[
              { value: 'active', label: 'Activo' },
              { value: 'inactive', label: 'Inactivo' },
              { value: 'discontinued', label: 'Descontinuado' },
            ]}
            placeholder="Estado"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-36"
          />
          <Button
            variant={stockAlertFilter ? 'warning' : 'outline'}
            size="md"
            onClick={() => setStockAlertFilter(!stockAlertFilter)}
            leftIcon={<AlertTriangle size={14} />}
          >
            Stock bajo
          </Button>

          {activeFilters > 0 && (
            <Button variant="ghost" size="md" onClick={resetFilters} leftIcon={<X size={14} />}>
              Limpiar
              <Badge variant="danger" className="ml-1">{activeFilters}</Badge>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
