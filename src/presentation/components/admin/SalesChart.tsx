import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { salesData } from './mockData';

const SalesChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Ventas por periodo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value: number) => `$${(value / 1000000).toFixed(1)}M`} />
          <Tooltip />
          <Bar dataKey="sales" fill="#39A900" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;