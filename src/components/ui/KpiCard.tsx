import clsx from 'clsx';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string;
  trend: string;
  change: number;
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

const accent: Record<NonNullable<KpiCardProps['variant']>, string> = {
  neutral: 'bg-slate-50',
  success: 'bg-emerald-50',
  warning: 'bg-amber-50',
  danger: 'bg-rose-50',
  info: 'bg-sky-50',
};

export const KpiCard: React.FC<KpiCardProps> = ({ label, value, trend, change, variant = 'neutral' }) => (
  <article className={clsx('rounded-3xl border border-slate-200 p-5 shadow-sm transition-shadow duration-200 hover:shadow-lg', accent[variant])}>
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <div className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
        {change >= 0 ? <ChevronUp size={16} className="text-emerald-500" /> : <ChevronDown size={16} className="text-rose-500" />}
        <span>{trend}</span>
      </div>
    </div>
    <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
    <p className="mt-2 text-sm text-slate-500">Comparado con la semana anterior</p>
  </article>
);
