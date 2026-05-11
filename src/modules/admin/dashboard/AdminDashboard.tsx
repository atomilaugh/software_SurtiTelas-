import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KPICard from './components/KPICard';
import SalesChart from './components/SalesChart';
import OrdersPieChart from './components/OrdersPieChart';
import RecentSalesTable from './components/RecentSalesTable';
import AlertsPanel from './components/AlertsPanel';
import { alerts, kpiMetrics, orderStatuses, recentSales, salesData } from './mockData';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="lg:grid lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block border-r border-slate-200 bg-slate-950">
          <Sidebar />
        </aside>
        <div className="min-h-screen">
          <Header moduleName="Dashboard" userName="Administrador" />

          <main className="space-y-8 p-6 sm:p-8 xl:p-10">
            <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Panel Gerencial</p>
                  <h2 className="mt-3 text-3xl font-semibold text-slate-950">Bienvenido al dashboard de Surtitelas</h2>
                </div>
                <p className="max-w-2xl text-sm text-slate-600">
                  Resumen de métricas clave, ventas y operación para la toma de decisiones estratégicas.
                </p>
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-3">
              {kpiMetrics.map((metric) => (
                <KPICard key={metric.title} metric={metric} />
              ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.6fr_0.95fr]">
              <div className="grid gap-6">
                <SalesChart data={salesData} />
                <OrdersPieChart data={orderStatuses} />
              </div>
              <AlertsPanel alerts={alerts} />
            </section>

            <section>
              <RecentSalesTable data={recentSales} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
