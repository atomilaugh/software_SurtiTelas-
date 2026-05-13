import React from 'react';
import Sidebar from '../../../presentation/components/admin/Sidebar';
import Header from '../../../presentation/components/admin/Header';
import KPICard from '../../../presentation/components/admin/KPICard';
import SalesChart from '../../../presentation/components/admin/SalesChart';
import OrdersPieChart from '../../../presentation/components/admin/OrdersPieChart';
import RecentSalesTable from '../../../presentation/components/admin/RecentSalesTable';
import AlertsPanel from '../../../presentation/components/admin/AlertsPanel';
import { kpiMetrics } from '../../../presentation/components/admin/mockData';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 shadow-lg">
              <div className="relative z-10">
                <h1 className="text-3xl font-bold text-white mb-2">Panel de Administración</h1>
                <p className="text-emerald-100 text-lg">Bienvenido al centro de control de Surtitelas</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-20">
                <svg className="w-40 h-40 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </section>

            {/* KPI Cards */}
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Métricas clave</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {kpiMetrics.map((metric, index) => (
                  <KPICard key={index} metric={metric} />
                ))}
              </div>
            </section>

            {/* Charts Row */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SalesChart />
              </div>
              <div>
                <OrdersPieChart />
              </div>
            </section>

            {/* Table and Alerts */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentSalesTable />
              </div>
              <div>
                <AlertsPanel />
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
