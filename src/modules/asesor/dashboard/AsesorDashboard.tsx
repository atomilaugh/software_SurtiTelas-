import React from 'react';
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { KpiCard } from '../../../components/ui/KpiCard';
import { ChartCard } from '../../../components/ui/ChartCard';
import { DataTable, type Column } from '../../../components/ui/DataTable';
import { Badge } from '../../../components/ui/Badge';
import { asesorKpis, asesorOrders, asesorClients, asesorSalesSeries } from '../../../services/dashboardService';
import type { OrderRecord, ClientRecord } from '../../../types/dashboard';

const orderColumns: Column<OrderRecord>[] = [
  { key: 'order', label: 'Pedido' },
  { key: 'customer', label: 'Cliente' },
  { key: 'items', label: 'Detalle' },
  { key: 'status', label: 'Estado', render: (record: OrderRecord) => <Badge label={record.status} variant={record.status === 'Pendiente' ? 'warning' : record.status === 'Entregado' ? 'success' : 'info'} /> },
  { key: 'total', label: 'Total', render: (record: OrderRecord) => <span>{record.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</span> },
  { key: 'date', label: 'Fecha' },
];

const clientColumns: Column<ClientRecord>[] = [
  { key: 'name', label: 'Cliente' },
  { key: 'company', label: 'Empresa' },
  { key: 'orders', label: 'Pedidos' },
  { key: 'revenue', label: 'Ingresos', render: (record: ClientRecord) => <span>{record.revenue.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</span> },
  { key: 'lastContact', label: 'Último contacto' },
];

export const AsesorDashboardPage: React.FC = () => {
  return (
    <DashboardLayout title="Dashboard Asesor Comercial" subtitle="Flujo rápido de ventas, clientes y pedidos">
      <section className="grid gap-5 xl:grid-cols-4">
        {asesorKpis.map((item) => (
          <KpiCard key={item.id} label={item.label} value={item.value} trend={item.trend} change={item.change} variant={item.variant} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <ChartCard title="Ventas semanales" subtitle="Compare el volumen de pedidos">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={asesorSalesSeries} margin={{ top: 20, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#E2E8F0" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: unknown) => {
                const numberValue = Number(value ?? 0);
                return [`${numberValue}k`, 'Pedidos'] as [string, string];
              }} />
              <Area type="monotone" dataKey="value" stroke="#0f172a" fill="#cbd5e1" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="grid gap-5">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Pipeline comercial</p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Contactos nuevos</p>
                  <p className="mt-1 text-sm text-slate-500">Lead caliente agregado</p>
                </div>
                <Badge label="Activo" variant="success" />
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Cotizaciones abiertas</p>
                  <p className="mt-1 text-sm text-slate-500">Pendientes de aprobación</p>
                </div>
                <Badge label="En espera" variant="warning" />
              </div>
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Atajos</p>
            <div className="mt-6 grid gap-3">
              <button className="rounded-3xl border border-slate-200 bg-slate-950 px-4 py-4 text-left text-white transition hover:bg-slate-800">Registrar pedido</button>
              <button className="rounded-3xl border border-slate-200 bg-white px-4 py-4 text-left text-slate-900 transition hover:bg-slate-50">Buscar cliente</button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <DataTable<OrderRecord> title="Pedidos recientes" columns={orderColumns} data={asesorOrders} searchKey="customer" />
        <DataTable<ClientRecord> title="Clientes recientes" columns={clientColumns} data={asesorClients} searchKey="name" />
      </section>
    </DashboardLayout>
  );
};
