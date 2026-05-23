import { useState } from 'react';
import { Truck } from 'lucide-react';
import { Modal, Select, Button } from '@/shared/ui';
import { useOrdersStore } from '../store/orders.store';
import { useAssignDelivery } from '../hooks/useOrders';

// Mock delivery people — in production, fetch from delivery service
const DELIVERY_OPTIONS = [
  { value: 'del-1|Juan Pérez', label: 'Juan Pérez' },
  { value: 'del-2|María López', label: 'María López' },
  { value: 'del-3|Carlos Ruiz', label: 'Carlos Ruiz' },
  { value: 'del-4|Ana García', label: 'Ana García' },
];

const AssignDeliveryModal = () => {
  const { showAssignDelivery, selectedOrder, closeAssignDelivery } = useOrdersStore();
  const assignDelivery = useAssignDelivery();
  const [selected, setSelected] = useState('');

  const handleAssign = async () => {
    if (!selected || !selectedOrder) return;
    const [deliveryId, deliveryName] = selected.split('|');
    await assignDelivery.mutateAsync({ id: selectedOrder.id, deliveryId, deliveryName });
    closeAssignDelivery();
    setSelected('');
  };

  return (
    <Modal
      open={showAssignDelivery}
      onClose={closeAssignDelivery}
      title="Asignar Domiciliario"
      description={selectedOrder ? `Pedido ${selectedOrder.orderNumber}` : ''}
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={closeAssignDelivery}>Cancelar</Button>
          <Button onClick={handleAssign} loading={assignDelivery.isPending} disabled={!selected} leftIcon={<Truck size={14} />}>
            Asignar
          </Button>
        </>
      }
    >
      <Select
        label="Seleccionar domiciliario"
        options={DELIVERY_OPTIONS}
        placeholder="Elige un domiciliario"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      />
    </Modal>
  );
};

export default AssignDeliveryModal;
