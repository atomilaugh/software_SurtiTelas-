export type KPIIcon = 'ShoppingCart' | 'Package' | 'AlertTriangle' | 'TrendingUp' | 'Wallet' | 'Users';
export type KPIColor = 'green' | 'blue' | 'orange' | 'purple' | 'red' | 'cyan';

export interface KPIMetric {
  title: string;
  value: string;
  icon: KPIIcon;
  color: KPIColor;
}

export interface SalesData {
  month: string;
  sales: number;
}

export interface OrderStatus {
  status: string;
  count: number;
}

export interface RecentSale {
  id: number;
  client: string;
  products: string;
  total: string;
  status: 'Pagado' | 'Pendiente' | 'Anulado';
  date: string;
}

export interface AlertItem {
  type: 'warning' | 'refresh' | 'package';
  message: string;
}
