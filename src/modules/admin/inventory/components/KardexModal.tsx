import { ArrowDown, ArrowUp, RefreshCw, RotateCcw } from 'lucide-react';
import { Modal, Table, TableHead, TableBody, TableRow, TableCell, TableHeader, Badge, EmptyState, Spinner } from '@/shared/ui';
import { useInventoryStore } from '../store/inventory.store';
import { useStockMovements } from '../hooks/useInventory';
import { formatDatetime } from '@/shared/utils';

const typeConfig = {
  entrada: { label: 'Entrada', icon: <ArrowDown size={12} />, variant: 'success' as const },
  salida: { label: 'Salida', icon: <ArrowUp size={12} />, variant: 'danger' as const },
  ajuste: { label: 'Ajuste', icon: <RefreshCw size={12} />, variant: 'info' as const },
  devolucion: { label: 'Devolución', icon: <RotateCcw size={12} />, variant: 'warning' as const },
};

const KardexModal = () => {
  const { activeModal, selectedProduct, closeModal } = useInventoryStore();
  const { data: movements = [], isLoading } = useStockMovements(
    activeModal === 'kardex' ? selectedProduct?.id : undefined
  );

  return (
    <Modal
      open={activeModal === 'kardex'}
      onClose={closeModal}
      title="Historial Kardex"
      description={selectedProduct ? `${selectedProduct.sku} — ${selectedProduct.name}` : ''}
      size="2xl"
    >
      {isLoading ? (
        <div className="flex justify-center py-12"><Spinner size="lg" /></div>
      ) : movements.length === 0 ? (
        <EmptyState title="Sin movimientos" description="Este producto no tiene movimientos registrados." />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Fecha</TableHeader>
              <TableHeader>Tipo</TableHeader>
              <TableHeader>Cantidad</TableHeader>
              <TableHeader>Stock Anterior</TableHeader>
              <TableHeader>Stock Nuevo</TableHeader>
              <TableHeader>Motivo</TableHeader>
              <TableHeader>Referencia</TableHeader>
              <TableHeader>Usuario</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {movements.map((mov) => {
              const config = typeConfig[mov.type];
              return (
                <TableRow key={mov.id}>
                  <TableCell className="text-xs">{formatDatetime(mov.createdAt)}</TableCell>
                  <TableCell>
                    <Badge variant={config.variant} dot>{config.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold ${mov.type === 'entrada' || mov.type === 'devolucion' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {mov.type === 'entrada' || mov.type === 'devolucion' ? '+' : '-'}{mov.quantity}
                    </span>
                  </TableCell>
                  <TableCell>{mov.previousStock}</TableCell>
                  <TableCell className="font-semibold text-slate-900 dark:text-white">{mov.newStock}</TableCell>
                  <TableCell className="max-w-[160px] truncate text-xs">{mov.reason}</TableCell>
                  <TableCell className="text-xs font-mono">{mov.reference || '—'}</TableCell>
                  <TableCell className="text-xs">{mov.userName}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Modal>
  );
};

export default KardexModal;
