import clsx from 'clsx';

interface StatusBadgeProps {
  label: string;
  status: 'Pendiente' | 'En producción' | 'En corte' | 'En confección' | 'En estampado' | 'Empacado' | 'Enviado' | 'Entregado' | 'Cancelado' | 'En ruta' | 'No entregado' | 'Reprogramado';
}

const styles: Record<StatusBadgeProps['status'], string> = {
  Pendiente: 'bg-amber-100 text-amber-800',
  'En producción': 'bg-sky-100 text-sky-800',
  'En corte': 'bg-blue-100 text-blue-800',
  'En confección': 'bg-violet-100 text-violet-800',
  'En estampado': 'bg-fuchsia-100 text-fuchsia-800',
  Empacado: 'bg-slate-100 text-slate-800',
  Enviado: 'bg-cyan-100 text-cyan-800',
  Entregado: 'bg-emerald-100 text-emerald-800',
  Cancelado: 'bg-rose-100 text-rose-800',
  'En ruta': 'bg-indigo-100 text-indigo-800',
  'No entregado': 'bg-rose-100 text-rose-800',
  Reprogramado: 'bg-amber-100 text-amber-800',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label, status }) => (
  <span className={clsx('inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-tight', styles[status])}>
    {label}
  </span>
);
