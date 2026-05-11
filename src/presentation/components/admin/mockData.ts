// mockData.ts
export interface KPIMetric {
  title: string;
  value: string;
  icon: string;
  color: string;
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
  status: string;
  date: string;
}

export interface Alert {
  type: 'warning' | 'refresh' | 'package';
  message: string;
}

export const kpiMetrics: KPIMetric[] = [
  { title: 'Ventas del mes', value: '$4.850.000', icon: 'ShoppingCart', color: 'green' },
  { title: 'Pedidos en producción', value: '12', icon: 'Package', color: 'blue' },
  { title: 'Stock bajo (alertas)', value: '5 productos', icon: 'AlertTriangle', color: 'orange' },
  { title: 'Producto más vendido', value: 'Camiseta Ref. 204', icon: 'TrendingUp', color: 'purple' },
  { title: 'Estado de cartera (saldo pendiente)', value: '$1.200.000', icon: 'Wallet', color: 'red' },
  { title: 'Usuarios activos', value: '4', icon: 'Users', color: 'cyan' },
];

export const salesData: SalesData[] = [
  { month: 'Ene', sales: 2850000 },
  { month: 'Feb', sales: 3200000 },
  { month: 'Mar', sales: 4100000 },
  { month: 'Abr', sales: 3800000 },
  { month: 'May', sales: 4850000 },
];

export const orderStatuses: OrderStatus[] = [
  { status: 'Recibido', count: 8 },
  { status: 'En producción', count: 12 },
  { status: 'Enviado', count: 5 },
  { status: 'Entregado', count: 20 },
];

export const recentSales: RecentSale[] = [
  { id: 1, client: 'María González', products: 'Camiseta básica x2', total: '$120.000', status: 'Pagado', date: '2025-05-10' },
  { id: 2, client: 'Carlos Rodríguez', products: 'Buso deportivo', total: '$180.000', status: 'Pendiente', date: '2025-05-09' },
  { id: 3, client: 'Ana López', products: 'Gorra ajustable x3', total: '$90.000', status: 'Pagado', date: '2025-05-08' },
  { id: 4, client: 'Juan Pérez', products: 'Camiseta Ref. 204', total: '$150.000', status: 'Anulado', date: '2025-05-07' },
  { id: 5, client: 'Laura Martínez', products: 'Pantalón deportivo', total: '$200.000', status: 'Pagado', date: '2025-05-06' },
];

export const alerts: Alert[] = [
  { type: 'warning', message: '5 insumos con stock bajo' },
  { type: 'refresh', message: '3 devoluciones pendientes de revisión' },
  { type: 'package', message: '2 pedidos sin asignar domiciliario' },
];