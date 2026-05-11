import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { OrderStatus } from '../dashboardTypes';

const slices = ['#16a34a', '#2563eb', '#f59e0b', '#7c3aed'];

interface OrdersPieChartProps {
  data: OrderStatus[];
}

const OrdersPieChart: React.FC<OrdersPieChartProps> = ({ data }) => (
  <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-5">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Estado de pedidos</p>
      <p className="mt-2 text-base text-slate-600">Seguimiento de entregas y producción</p>
    </div>
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="45%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell key={`${entry.status}-${index}`} fill={slices[index % slices.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [Number(value ?? 0), 'Pedidos']} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </section>
);

export default OrdersPieChart;
