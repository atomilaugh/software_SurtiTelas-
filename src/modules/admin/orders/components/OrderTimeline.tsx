import { CheckCircle, Circle, XCircle } from 'lucide-react';
import type { OrderTimelineEvent, OrderStatus } from '../types/orders.types';
import { formatDatetime } from '@/shared/utils';
import { cn } from '@/shared/utils';

const STATUS_COLORS: Record<OrderStatus, string> = {
  pendiente: 'text-amber-500 border-amber-200 dark:border-amber-800',
  pagado: 'text-blue-500 border-blue-200 dark:border-blue-800',
  preparando: 'text-purple-500 border-purple-200 dark:border-purple-800',
  enviado: 'text-indigo-500 border-indigo-200 dark:border-indigo-800',
  entregado: 'text-emerald-500 border-emerald-200 dark:border-emerald-800',
  cancelado: 'text-red-500 border-red-200 dark:border-red-800',
};

interface OrderTimelineProps { events: OrderTimelineEvent[]; }

const OrderTimeline = ({ events }: OrderTimelineProps) => (
  <div className="relative">
    <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-zinc-700" />
    <div className="space-y-6">
      {events.map((event, i) => {
        const isLast = i === events.length - 1;
        const isCancelled = event.status === 'cancelado';
        return (
          <div key={event.id} className="relative flex gap-4 pl-10">
            <div className={cn(
              'absolute left-0 w-8 h-8 rounded-full border-2 bg-white dark:bg-zinc-900 flex items-center justify-center',
              STATUS_COLORS[event.status]
            )}>
              {isCancelled
                ? <XCircle size={16} className="text-red-500" />
                : isLast
                  ? <CheckCircle size={16} className="text-emerald-500" />
                  : <Circle size={16} className="text-slate-400" />
              }
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="font-semibold text-sm text-slate-900 dark:text-white">{event.label}</p>
                <span className="text-xs text-slate-400 dark:text-zinc-500">{formatDatetime(event.createdAt)}</span>
              </div>
              {event.description && <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">{event.description}</p>}
              <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">por {event.userName}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default OrderTimeline;
