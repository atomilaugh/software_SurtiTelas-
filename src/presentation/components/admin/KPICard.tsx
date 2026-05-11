import React from 'react';
import { LucideIcon, ShoppingCart, Package, AlertTriangle, TrendingUp, Wallet, Users } from 'lucide-react';
import { KPIMetric } from './mockData';

const iconMap: Record<string, LucideIcon> = {
  ShoppingCart,
  Package,
  AlertTriangle,
  TrendingUp,
  Wallet,
  Users,
};

const colorMap: Record<string, string> = {
  green: 'bg-green-100 text-green-600',
  blue: 'bg-blue-100 text-blue-600',
  orange: 'bg-orange-100 text-orange-600',
  purple: 'bg-purple-100 text-purple-600',
  red: 'bg-red-100 text-red-600',
  cyan: 'bg-cyan-100 text-cyan-600',
};

interface KPICardProps {
  metric: KPIMetric;
}

const KPICard: React.FC<KPICardProps> = ({ metric }) => {
  const IconComponent = iconMap[metric.icon];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{metric.title}</p>
          <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorMap[metric.color]}`}>
          <IconComponent className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default KPICard;