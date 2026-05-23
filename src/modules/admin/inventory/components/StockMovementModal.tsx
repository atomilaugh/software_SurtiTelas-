import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stockMovementSchema, type StockMovementFormData } from '../schemas/inventory.schema';
import { Modal, Input, Select, Button, Alert } from '@/shared/ui';
import { useInventoryStore } from '../store/inventory.store';
import { useCreateStockMovement, useProducts } from '../hooks/useInventory';
import { useAuth } from '@presentation/contexts/AuthContext';

const MOVEMENT_TYPES = [
  { value: 'entrada', label: 'Entrada' },
  { value: 'salida', label: 'Salida' },
  { value: 'ajuste', label: 'Ajuste' },
  { value: 'devolucion', label: 'Devolución' },
];

const StockMovementModal = () => {
  const { activeModal, selectedProduct, closeModal } = useInventoryStore();
  const { user } = useAuth();
  const createMovement = useCreateStockMovement();
  const { data: productsData } = useProducts({ pageSize: 100 });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<StockMovementFormData>({
    resolver: zodResolver(stockMovementSchema) as any,
    defaultValues: { productId: selectedProduct?.id || '', type: 'entrada', quantity: 1 },
  });

  const handleClose = () => { reset(); closeModal(); };

  const onSubmit = async (data: StockMovementFormData) => {
    await createMovement.mutateAsync({
      data,
      userId: user?.uid || 'unknown',
      userName: user?.email || 'Admin',
    });
    handleClose();
  };

  const products = productsData?.data ?? [];

  return (
    <Modal
      open={activeModal === 'stock-movement'}
      onClose={handleClose}
      title="Registrar Movimiento de Stock"
      description={selectedProduct ? `Producto: ${selectedProduct.name}` : 'Selecciona un producto'}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {!selectedProduct && (
          <Select
            label="Producto"
            error={errors.productId?.message}
            options={products.map(p => ({ value: p.id, label: `${p.sku} - ${p.name}` }))}
            placeholder="Seleccionar producto"
            {...register('productId')}
          />
        )}
        {selectedProduct && (
          <input type="hidden" value={selectedProduct.id} {...register('productId')} />
        )}

        <div className="grid grid-cols-2 gap-4">
          <Select label="Tipo" error={errors.type?.message} options={MOVEMENT_TYPES} {...register('type')} />
          <Input label="Cantidad" type="number" error={errors.quantity?.message} {...register('quantity')} min={1} />
        </div>

        <Input label="Motivo" error={errors.reason?.message} {...register('reason')} placeholder="Describe el motivo del movimiento" />
        <Input label="Referencia (opcional)" error={errors.reference?.message} {...register('reference')} placeholder="Ej: OC-2024-001, PED-1234" />

        {selectedProduct && (
          <Alert variant="info" title="Stock actual">
            El producto tiene <strong>{selectedProduct.stock} {selectedProduct.unit}</strong> en stock.
          </Alert>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={handleClose}>Cancelar</Button>
          <Button type="submit" loading={createMovement.isPending}>Registrar movimiento</Button>
        </div>
      </form>
    </Modal>
  );
};

export default StockMovementModal;
