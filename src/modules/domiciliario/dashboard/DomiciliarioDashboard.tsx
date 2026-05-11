import React, { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { KpiCard } from '../../../components/ui/KpiCard';
import { DataTable, type Column } from '../../../components/ui/DataTable';
import { Badge } from '../../../components/ui/Badge';
import { domicilioKpis, domicilioTasks, domicilioHistory, domicilioRouteSeries } from '../../../services/dashboardService';
import type { DeliveryRecord, OrderRecord } from '../../../types/dashboard';

const taskColumns: Column<DeliveryRecord>[] = [
  { key: 'order', label: 'Pedido' },
  { key: 'customer', label: 'Cliente' },
  { key: 'address', label: 'Dirección' },
  { key: 'status', label: 'Estado', render: (record: DeliveryRecord) => <Badge label={record.status === 'En ruta' ? 'En ruta' : record.status} variant={record.status === 'Pendiente' ? 'warning' : record.status === 'Entregado' ? 'success' : 'info'} /> },
  { key: 'eta', label: 'ETA' },
];

const historyColumns: Column<OrderRecord>[] = [
  { key: 'order', label: 'Pedido' },
  { key: 'customer', label: 'Cliente' },
  { key: 'status', label: 'Estado', render: (record: OrderRecord) => <Badge label={record.status} variant={record.status === 'Entregado' ? 'success' : record.status === 'No entregado' ? 'danger' : 'warning'} /> },
  { key: 'total', label: 'Valor', render: (record: OrderRecord) => <span>{record.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</span> },
  { key: 'date', label: 'Fecha' },
];

export const DomiciliarioDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pendientes' | 'en_ruta' | 'entregados'>('pendientes');
  const filteredTasks = domicilioTasks.filter((task) => {
    if (activeTab === 'pendientes') return task.status === 'Pendiente';
    if (activeTab === 'en_ruta') return task.status === 'En ruta';
    return task.status === 'Entregado';
  });

  return (
    <DashboardLayout title="Dashboard Domiciliario" subtitle="Operaciones móviles optimizadas para entrega eficiente">
      <section className="grid gap-5 xl:grid-cols-4">
        {domicilioKpis.map((item) => (
          <KpiCard key={item.id} label={item.label} value={item.value} trend={item.trend} change={item.change} variant={item.variant} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-5">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Seguimiento de rutas</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">Panel de entregas del día</p>
              </div>
              <div className="inline-flex gap-2 rounded-full border border-slate-200 bg-slate-50 p-2 text-sm text-slate-700">
                <button className={`rounded-full px-4 py-2 ${activeTab === 'pendientes' ? 'bg-slate-900 text-white' : 'text-slate-600'}`} onClick={() => setActiveTab('pendientes')}>Pendientes</button>
                <button className={`rounded-full px-4 py-2 ${activeTab === 'en_ruta' ? 'bg-slate-900 text-white' : 'text-slate-600'}`} onClick={() => setActiveTab('en_ruta')}>En ruta</button>
                <button className={`rounded-full px-4 py-2 ${activeTab === 'entregados' ? 'bg-slate-900 text-white' : 'text-slate-600'}`} onClick={() => setActiveTab('entregados')}>Entregados</button>
              </div>
            </div>
            <DataTable<DeliveryRecord> title="Pedidos asignados" columns={taskColumns} data={filteredTasks} searchKey="customer" />
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Rutas activas</p>
            <div className="mt-6 grid gap-4">
              {domicilioTasks.map((task) => (
                <div key={task.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{task.customer}</p>
                      <p className="text-sm text-slate-500">{task.address}</p>
                    </div>
                    <Badge label={task.status === 'En ruta' ? 'En ruta' : task.status === 'Pendiente' ? 'Pendiente' : 'Entregado'} variant={task.status === 'En ruta' ? 'info' : task.status === 'Pendiente' ? 'warning' : 'success'} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                    <span>{task.order}</span>
                    <span>{task.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Historial de entregas</p>
            <DataTable<OrderRecord> title="Últimas entregas" columns={historyColumns} data={domicilioHistory} searchKey="order" />
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Rendimiento de la semana</p>
            <p className="mt-2 text-base font-semibold text-slate-950">Kilómetros, entregas y eficiencia</p>
          </div>
        </div>
        <div className="mt-6 h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={domicilioRouteSeries} margin={{ top: 20, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#E2E8F0" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: unknown) => {
                const numberValue = Number(value ?? 0);
                return [`${numberValue}`, 'Entregas'] as [string, string];
              }} />
              <Area type="monotone" dataKey="value" stroke="#0f172a" fill="#cbd5e1" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </DashboardLayout>
  );
};
