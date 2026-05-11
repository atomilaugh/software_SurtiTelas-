import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import KPICard from './KPICard';
import SalesChart from './SalesChart';
import OrdersPieChart from './OrdersPieChart';
import RecentSalesTable from './RecentSalesTable';
import AlertsPanel from './AlertsPanel';
import { kpiMetrics } from './mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {kpiMetrics.map((metric, index) => (
              <KPICard key={index} metric={metric} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SalesChart />
            <OrdersPieChart />
          </div>

          {/* Table and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentSalesTable />
            </div>
            <div>
              <AlertsPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;