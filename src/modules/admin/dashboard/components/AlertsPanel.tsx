import React from 'react';
import { AlertTriangle, Package, RefreshCcw } from 'lucide-react';
import type { AlertItem } from '../dashboardTypes';

interface AlertsPanelProps {
  alerts: AlertItem[];
}

const iconMap = {
  warning: AlertTriangle,
  refresh: RefreshCcw,
  package: Package,
};

const labelMap: Record<AlertItem['type'], string> = {
  warning: 'Stock bajo',
  refresh: 'Devoluciones',
  package: 'Pedidos sin asignar',
};

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => (
  <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-5">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Alertas rápidas</p>
      <p className="mt-2 text-base text-slate-600">Incidencias que requieren atención prioritaria.</p>
    </div>
    <div className="space-y-4">
      {alerts.map((item) => {
        const Icon = iconMap[item.type];
        return (
          <div key={item.message} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-white">
              <Icon size={20} />
            </div>
            <div>
              <p className="font-semibold text-slate-900">{labelMap[item.type]}</p>
              <p className="text-sm text-slate-600">{item.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default AlertsPanel;
