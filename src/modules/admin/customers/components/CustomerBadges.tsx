import { Badge } from '@/shared/ui';
import type { CustomerSegment, CustomerStatus } from '../types/customers.types';

export const SEGMENT_CONFIG: Record<CustomerSegment, { label: string; variant: 'default' | 'info' | 'warning' | 'success' | 'danger' | 'purple' }> = {
  vip: { label: 'VIP', variant: 'purple' },
  frecuente: { label: 'Frecuente', variant: 'success' },
  nuevo: { label: 'Nuevo', variant: 'info' },
  inactivo: { label: 'Inactivo', variant: 'default' },
};

export const CustomerSegmentBadge = ({ segment }: { segment: CustomerSegment }) => {
  const config = SEGMENT_CONFIG[segment];
  return <Badge variant={config.variant} dot>{config.label}</Badge>;
};

export const CustomerStatusBadge = ({ status }: { status: CustomerStatus }) => (
  <Badge variant={status === 'active' ? 'success' : 'danger'} dot>
    {status === 'active' ? 'Activo' : 'Bloqueado'}
  </Badge>
);
