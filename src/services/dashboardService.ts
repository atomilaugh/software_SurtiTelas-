import { KpiMetric, ChartPoint, OrderRecord, ProductionRecord, DeliveryRecord, ClientRecord, QuickAction } from '../types/dashboard';

export const adminKpis: KpiMetric[] = [
  { id: 'ventas-dia', label: 'Ventas del día', value: 'COP 1.240.000', trend: '+12%', change: 12, variant: 'success' },
  { id: 'ventas-mes', label: 'Ventas mensuales', value: 'COP 18.500.000', trend: '+8%', change: 8, variant: 'success' },
  { id: 'pedidos-pendientes', label: 'Pedidos pendientes', value: '24', trend: '-6%', change: -6, variant: 'warning' },
  { id: 'produccion-activa', label: 'Producción activa', value: '14', trend: '+4%', change: 4, variant: 'info' },
];

export const adminSalesSeries: ChartPoint[] = [
  { name: 'Lun', value: 4.1 },
  { name: 'Mar', value: 6.2 },
  { name: 'Mié', value: 7.7 },
  { name: 'Jue', value: 6.8 },
  { name: 'Vie', value: 8.1 },
  { name: 'Sáb', value: 7.2 },
  { name: 'Dom', value: 5.5 },
];

export const adminProductionSeries: ChartPoint[] = [
  { name: 'Corte', value: 34 },
  { name: 'Confección', value: 28 },
  { name: 'Estampado', value: 19 },
  { name: 'Empaque', value: 12 },
];

export const adminRevenueSeries: ChartPoint[] = [
  { name: 'Ene', value: 12 },
  { name: 'Feb', value: 15 },
  { name: 'Mar', value: 18 },
  { name: 'Abr', value: 21 },
  { name: 'May', value: 25 },
  { name: 'Jun', value: 23 },
];

export const adminOrders: OrderRecord[] = [
  { id: '1', order: 'PED-4201', customer: 'Empresa Águila', items: '30 camisetas', status: 'En producción', total: 420000, date: '10 May' },
  { id: '2', order: 'PED-4202', customer: 'Luz Moda', items: '15 gorras', status: 'Pendiente', total: 180000, date: '10 May' },
  { id: '3', order: 'PED-4210', customer: 'Fit Sport', items: '20 polos', status: 'Enviado', total: 380000, date: '09 May' },
  { id: '4', order: 'PED-4195', customer: 'Urban Studio', items: '10 busos', status: 'Entregado', total: 520000, date: '08 May' },
];

export const adminProduction: ProductionRecord[] = [
  { id: 'P-301', line: 'Línea 1', product: 'Camisetas Premium', stage: 'Corte', progress: 68, dueDate: '12 May' },
  { id: 'P-302', line: 'Línea 2', product: 'Busos personalizados', stage: 'Confección', progress: 52, dueDate: '13 May' },
  { id: 'P-303', line: 'Línea 3', product: 'Gorras bordadas', stage: 'Estampado', progress: 44, dueDate: '14 May' },
];

export const adminDeliveries: DeliveryRecord[] = [
  { id: 'D-110', order: 'PED-4201', customer: 'Empresa Águila', address: 'Av. 68 #12-45', status: 'En ruta', eta: '45 min' },
  { id: 'D-111', order: 'PED-4215', customer: 'Casa Verde', address: 'Cl. 10 #34-50', status: 'Pendiente', eta: 'Hoy' },
  { id: 'D-112', order: 'PED-4189', customer: 'Tienda Nova', address: 'Cra. 9 #20-11', status: 'No entregado', eta: 'Reprogramado' },
];

export const adminClients: ClientRecord[] = [
  { id: 'C-001', name: 'Nexa Group', company: 'Nexa Group', orders: 32, revenue: 3200000, lastContact: '2 May', status: 'Activo' },
  { id: 'C-002', name: 'Boutique Luisa', company: 'Boutique Luisa', orders: 18, revenue: 1210000, lastContact: '5 May', status: 'Nuevo' },
  { id: 'C-003', name: 'Eventos X', company: 'Eventos X', orders: 12, revenue: 860000, lastContact: '9 May', status: 'Activo' },
];

export const adminQuickActions: QuickAction[] = [
  { id: 'crear-pedido', title: 'Crear pedido', description: 'Agregar pedido inmediato', color: 'bg-slate-900', icon: 'plus' },
  { id: 'registrar-produccion', title: 'Registrar producción', description: 'Actualizar estado de línea', color: 'bg-cyan-700', icon: 'package' },
  { id: 'gestionar-domicilios', title: 'Gestionar domicilios', description: 'Asignar rutas', color: 'bg-emerald-700', icon: 'navigation' },
  { id: 'control-inventario', title: 'Inventario', description: 'Ver alertas de stock', color: 'bg-amber-600', icon: 'layers' },
];

export const asesorKpis: KpiMetric[] = [
  { id: 'ventas-personales', label: 'Ventas personales', value: 'COP 5.600.000', trend: '+18%', change: 18, variant: 'success' },
  { id: 'pedidos-registrados', label: 'Pedidos registrados', value: '38', trend: '+9%', change: 9, variant: 'info' },
  { id: 'clientes-atendidos', label: 'Clientes atendidos', value: '12', trend: '+5%', change: 5, variant: 'success' },
  { id: 'comisiones', label: 'Comisiones', value: 'COP 420.000', trend: '+12%', change: 12, variant: 'success' },
];

export const asesorOrders: OrderRecord[] = [
  { id: '1', order: 'PED-4310', customer: 'Clienta VIP', items: '20 camisetas', status: 'Pendiente', total: 280000, date: '10 May' },
  { id: '2', order: 'PED-4302', customer: 'Empresa Deluxe', items: '50 poloshirts', status: 'Enviado', total: 980000, date: '09 May' },
  { id: '3', order: 'PED-4296', customer: 'Club Running', items: '10 buzos', status: 'Entregado', total: 560000, date: '08 May' },
];

export const asesorClients: ClientRecord[] = [
  { id: 'CL-04', name: 'María López', company: 'Freelance', orders: 7, revenue: 420000, lastContact: '8 May', status: 'Nuevo' },
  { id: 'CL-05', name: 'Andrés Ruiz', company: 'Distribuciones AR', orders: 19, revenue: 1400000, lastContact: '6 May', status: 'Activo' },
];

export const domicilioKpis: KpiMetric[] = [
  { id: 'entregas-dia', label: 'Entregas del día', value: '16', trend: '+5%', change: 5, variant: 'success' },
  { id: 'pendientes', label: 'Pedidos pendientes', value: '7', trend: '-14%', change: -14, variant: 'warning' },
  { id: 'entregados', label: 'Pedidos entregados', value: '22', trend: '+11%', change: 11, variant: 'success' },
  { id: 'rutas-activas', label: 'Rutas activas', value: '4', trend: '+2%', change: 2, variant: 'info' },
];

export const domicilioTasks: DeliveryRecord[] = [
  { id: 'R-101', order: 'PED-4319', customer: 'Juliana R.', address: 'Cl. 25 #14-10', status: 'En ruta', eta: '13 min' },
  { id: 'R-102', order: 'PED-4320', customer: 'Andrés B.', address: 'Cra. 18 #7-45', status: 'Pendiente', eta: '35 min' },
  { id: 'R-103', order: 'PED-4321', customer: 'Laura M.', address: 'Av. 1 #56-22', status: 'Reprogramado', eta: 'Hoy' },
];

export const domicilioHistory: OrderRecord[] = [
  { id: 'H-01', order: 'PED-4300', customer: 'Luis V.', items: '5 gorras', status: 'Entregado', total: 85000, date: '09 May' },
  { id: 'H-02', order: 'PED-4291', customer: 'Julia S.', items: '3 polos', status: 'No entregado', total: 57000, date: '08 May' },
];

export const domicilioRouteSeries: ChartPoint[] = [
  { name: 'Lun', value: 10 },
  { name: 'Mar', value: 14 },
  { name: 'Mié', value: 12 },
  { name: 'Jue', value: 16 },
  { name: 'Vie', value: 18 },
  { name: 'Sáb', value: 15 },
];

export const asesorSalesSeries: ChartPoint[] = [
  { name: 'Lun', value: 3.4 },
  { name: 'Mar', value: 4.2 },
  { name: 'Mié', value: 5.8 },
  { name: 'Jue', value: 6.0 },
  { name: 'Vie', value: 6.6 },
  { name: 'Sáb', value: 5.2 },
];
