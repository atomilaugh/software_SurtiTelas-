import React from 'react';
import { AlertTriangle, RefreshCw, Package } from 'lucide-react';
import { alerts } from './mockData';

const AlertsPanel: React.FC = () => {
  const iconMap = {
    warning: AlertTriangle,
    refresh: RefreshCw,
    package: Package,
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Alertas rápidas</h3>
      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const IconComponent = iconMap[alert.type];
          return (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <IconComponent className="w-5 h-5 text-gray-600 mr-3" />
              <span className="text-sm text-gray-700">{alert.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPanel;