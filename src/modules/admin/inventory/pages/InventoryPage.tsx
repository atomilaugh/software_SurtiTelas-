import { useState } from 'react';
import { Plus, Tag, Truck, Package, ArrowUpDown } from 'lucide-react';
import DashboardLayout from '../../dashboard/components/layout/DashboardLayout';
import { Button, Tabs } from '@/shared/ui';
import ProductStats from '../components/ProductStats';
import ProductFilters from '../components/ProductFilters';
import ProductTable from '../components/ProductTable';
import ProductModal from '../components/ProductModal';
import StockMovementModal from '../components/StockMovementModal';
import KardexModal from '../components/KardexModal';
import CategoriesModal from '../components/CategoriesModal';
import { useInventoryStore } from '../store/inventory.store';

const InventoryPage = () => {
  const { openModal } = useInventoryStore();
  const [showCategories, setShowCategories] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Inventario</h1>
            <p className="text-slate-500 dark:text-zinc-400 mt-1">Gestión de productos, categorías y proveedores</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="md" onClick={() => setShowCategories(true)} leftIcon={<Tag size={16} />}>
              Categorías
            </Button>
            <Button variant="outline" size="md" onClick={() => openModal('stock-movement')} leftIcon={<ArrowUpDown size={16} />}>
              Movimiento
            </Button>
            <Button size="md" onClick={() => openModal('product')} leftIcon={<Plus size={16} />}>
              Nuevo Producto
            </Button>
          </div>
        </div>

        {/* Stats */}
        <ProductStats />

        {/* Filters */}
        <ProductFilters />

        {/* Table */}
        <ProductTable />

        {/* Modals */}
        <ProductModal />
        <StockMovementModal />
        <KardexModal />
        <CategoriesModal open={showCategories} onClose={() => setShowCategories(false)} />
      </div>
    </DashboardLayout>
  );
};

export default InventoryPage;
