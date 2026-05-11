import React from 'react';
import type { RecentSale } from '../dashboardTypes';

interface RecentSalesTableProps {
  data: RecentSale[];
}

const statusStyles: Record<RecentSale['status'], string> = {
  Pagado: 'bg-emerald-100 text-emerald-700',
  Pendiente: 'bg-amber-100 text-amber-700',
  Anulado: 'bg-rose-100 text-rose-700',
};

const RecentSalesTable: React.FC<RecentSalesTableProps> = ({ data }) => (
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div className="px-6 py-5">
      <h2 className="text-lg font-semibold text-slate-950">Últimas ventas registradas</h2>
      <p className="mt-2 text-sm text-slate-500">Ventas recientes del último periodo con estados de pago.</p>
    </div>
    <div className="overflow-x-auto px-6 pb-6">
      <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
        <thead>
          <tr className="text-slate-500">
            <th className="px-3 py-3">#</th>
            <th className="px-3 py-3">Cliente</th>
            <th className="px-3 py-3">Productos</th>
            <th className="px-3 py-3">Total</th>
            <th className="px-3 py-3">Estado</th>
            <th className="px-3 py-3">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sale) => (
            <tr key={sale.id} className="rounded-3xl bg-slate-50 text-slate-700 shadow-sm">
              <td className="px-3 py-4 font-semibold">{sale.id}</td>
              <td className="px-3 py-4">{sale.client}</td>
              <td className="px-3 py-4">{sale.products}</td>
              <td className="px-3 py-4 font-semibold text-slate-900">{sale.total}</td>
              <td className="px-3 py-4">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[sale.status]}`}>
                  {sale.status}
                </span>
              </td>
              <td className="px-3 py-4 text-slate-500">{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentSalesTable;
