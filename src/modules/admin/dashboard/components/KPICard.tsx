import React from 'react';
import { LucideIcon, AlertTriangle, Package, ShoppingCart, TrendingUp, Wallet, Users } from 'lucide-react';
import type { KPIMetric } from '../dashboardTypes';

const iconMap: Record<string, LucideIcon> = {
  ShoppingCart,
  Package,
  AlertTriangle,
  TrendingUp,
  Wallet,
  Users,
};

const colorMap: Record<NonNullable<KPIMetric['color']>, { bg: string; text: string }> = {
  green: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
  blue: { bg: 'bg-sky-100', text: 'text-sky-600' },
  orange: { bg: 'bg-amber-100', text: 'text-amber-600' },
  purple: { bg: 'bg-violet-100', text: 'text-violet-600' },
  red: { bg: 'bg-rose-100', text: 'text-rose-600' },
  cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600' },
};

interface KPICardProps {
  metric: KPIMetric;
}

const KPICard: React.FC<KPICardProps> = ({ metric }) => {
  const IconComponent = iconMap[metric.icon];
  const colors = colorMap[metric.color];

  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{metric.title}</p>
          <p className="mt-4 text-3xl font-semibold text-slate-950">{metric.value}</p>
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-3xl ${colors.bg} ${colors.text}`}>
          <IconComponent size={24} />
        </div>
      </div>
    </article>
  );
};

export default KPICard;
