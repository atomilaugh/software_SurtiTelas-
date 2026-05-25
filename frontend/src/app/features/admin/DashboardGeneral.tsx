import { useState, useEffect, useMemo } from 'react';
import { apiClient } from '@infrastructure/http/apiClient';
import { DashboardMetrics } from '../../types/dashboard';
import {
  Users,
  UserCheck,
  Boxes,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Factory,
  BarChart3,
  Star,
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DashboardGeneralProps {
  onNavigate: (moduleId: string) => void;
  metrics?: DashboardMetrics | null;
  loading?: boolean;
  userRole?: 'admin' | 'asesor' | 'domiciliario' | 'cliente' | null;
  userEmail?: string;
}

interface OrderSummary {
  id: string;
  cliente: string;
  monto: number;
  estado: string;
  fecha: string;
}

interface EmployeeSummary {
  id: number;
  nombre: string;
  rol: string;
  ventas: number;
}

export function DashboardGeneral({ onNavigate, metrics, loading = false, userRole }: DashboardGeneralProps) {
  const [rawOrders, setRawOrders] = useState<any[]>([]);
  const [latestOrders, setLatestOrders] = useState<OrderSummary[]>([]);
  const [employees, setEmployees] = useState<EmployeeSummary[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [employeesLoading, setEmployeesLoading] = useState(false);

  useEffect(() => {
    const loadDashboardLists = async () => {
      if (userRole !== 'admin') return;

      try {
        setOrdersLoading(true);
        const orderResponse = await apiClient.get('/api/orders');
        const fetchedOrders = Array.isArray(orderResponse.data) ? orderResponse.data : [];
        setRawOrders(fetchedOrders);
        setLatestOrders(
          fetchedOrders.slice(0, 5).map((order: any) => ({
            id: order.orderNumber || `PED-${order.id_order}`,
            cliente: order.client?.name || order.client?.email || 'Cliente',
            monto: order.total || 0,
            estado: order.status || 'Pendiente',
            fecha: order.createdAt ? new Date(order.createdAt).toLocaleDateString('es-CO') : '',
          }))
        );
      } catch (error) {
        console.error('Error cargando pedidos del dashboard', error);
      } finally {
        setOrdersLoading(false);
      }

      try {
        setEmployeesLoading(true);
        const employeeResponse = await apiClient.get('/api/users?role=asesor');
        const fetchedEmployees = Array.isArray(employeeResponse.data) ? employeeResponse.data : [];
        setEmployees(
          fetchedEmployees.slice(0, 6).map((user: any, index: number) => ({
            id: user.id_user || index,
            nombre: user.name || user.email || `Asesor ${index + 1}`,
            rol: 'Asesor',
            ventas: 0,
          }))
        );
      } catch (error) {
        console.error('Error cargando empleados del dashboard', error);
      } finally {
        setEmployeesLoading(false);
      }
    };

    loadDashboardLists();
  }, [userRole]);

  const advisorSalesById = useMemo(() => {
    const map = new Map<number, number>();
    rawOrders.forEach((order) => {
      const advisorId = order.advisor?.id_user;
      if (advisorId) {
        map.set(advisorId, (map.get(advisorId) || 0) + 1);
      }
    });
    return map;
  }, [rawOrders]);

  const displayedEmployees = useMemo(
    () =>
      employees.length
        ? employees.map((employee) => ({
            ...employee,
            ventas: advisorSalesById.get(employee.id) || 0,
          }))
        : [
            { id: 1, nombre: 'Luis García', rol: 'Asesor', ventas: 15 },
            { id: 2, nombre: 'Carmen Silva', rol: 'Asesor', ventas: 12 },
            { id: 3, nombre: 'Roberto Díaz', rol: 'Supervisor', ventas: 8 },
            { id: 4, nombre: 'Lucía Morales', rol: 'Asesor', ventas: 18 },
          ],
    [advisorSalesById, employees]
  );

  const ventasMesData = [
    { name: 'Ene', ventas: 45000, meta: 50000 },
    { name: 'Feb', ventas: 52000, meta: 50000 },
    { name: 'Mar', ventas: 48000, meta: 50000 },
    { name: 'Abr', ventas: 61000, meta: 55000 },
    { name: 'May', ventas: 55000, meta: 55000 },
    { name: 'Jun', ventas: 67000, meta: 60000 },
  ];

  const ventasPorCategoriaData = [
    { name: 'Básicas', value: 35, color: '#2563eb' },
    { name: 'Premium', value: 25, color: '#7c3aed' },
    { name: 'Polos', value: 20, color: '#f59e0b' },
    { name: 'Deportivas', value: 15, color: '#10b981' },
    { name: 'Otros', value: 5, color: '#64748b' },
  ];

  const produccionSemanalData = [
    { dia: 'Lun', corte: 120, confeccion: 95, estampado: 80 },
    { dia: 'Mar', corte: 135, confeccion: 110, estampado: 95 },
    { dia: 'Mié', corte: 145, confeccion: 125, estampado: 105 },
    { dia: 'Jue', corte: 150, confeccion: 135, estampado: 115 },
    { dia: 'Vie', corte: 160, confeccion: 145, estampado: 125 },
  ];

  const topProductosData = [
    { producto: 'Camiseta Básica Blanca', unidades: 245, ingresos: 3675000 },
    { producto: 'Camiseta Premium Negro', unidades: 180, ingresos: 3600000 },
    { producto: 'Polo Deportivo Azul', unidades: 150, ingresos: 3000000 },
    { producto: 'Camiseta Estampada', unidades: 135, ingresos: 2700000 },
    { producto: 'Camiseta Cuello V', unidades: 120, ingresos: 2400000 },
  ];

  const actualMetrics = metrics ?? {
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalClients: 0,
    totalUsers: 0,
    totalAdvisors: 0,
    totalDelivery: 0,
    totalAdminUsers: 0,
    lowStockProducts: 0,
    totalStock: 0,
    salesGrowth: 0,
    ordersGrowth: 0,
  };

  const formattedPrice = (value: number) =>
    Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

  const pendingOrdersCount = rawOrders.filter((order) => String(order.status || '').toLowerCase().includes('pendiente')).length;

  const getEstadoBadge = (estado: string) => {
    const normalized = estado.toLowerCase();
    if (normalized.includes('complet')) {
      return <Badge className="bg-[var(--emerald-dim)] text-green-800 border-green-200">Completado</Badge>;
    }
    if (normalized.includes('proceso')) {
      return <Badge className="bg-[var(--blue-dim)] text-blue-800 border-blue-200">En proceso</Badge>;
    }
    if (normalized.includes('pendiente')) {
      return <Badge className="bg-[var(--amber-dim)] text-[var(--amber)] border-[var(--border-default)]">Pendiente</Badge>;
    }
    return <Badge>{estado}</Badge>;
  };

  return (
    <div className="space-y-6 px-4 py-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--text-primary)]">Panel de Administración - Surti Camisetas</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Resumen general del sistema</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">Nueva acción</Button>
          <Button className="bg-[var(--text-primary)] text-white hover:bg-[var(--text-secondary)]">Exportar Datos</Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        <Card className="col-span-2 p-5 bg-[var(--bg-elevated)] rounded-3xl shadow-card">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--blue-dim)] text-[var(--blue)]">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-semibold">{actualMetrics.totalUsers}</p>
              <p className="text-sm text-[var(--text-secondary)]">Total usuarios</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-[var(--bg-elevated)] rounded-3xl shadow-card">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-purple-100 text-purple-600">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-semibold">{actualMetrics.totalAdvisors}</p>
              <p className="text-sm text-[var(--text-secondary)]">Empleados / asesores</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-[var(--bg-elevated)] rounded-3xl shadow-card">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--emerald-dim)] text-[var(--emerald)]">
              <Boxes className="h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-semibold">{actualMetrics.totalProducts}</p>
              <p className="text-sm text-[var(--text-secondary)]">Total insumos</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-[var(--bg-elevated)] rounded-3xl shadow-card">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#fde68a] text-[#b45309]">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-semibold">{formattedPrice(actualMetrics.totalSales)}</p>
              <p className="text-sm text-[var(--text-secondary)]">Ventas del mes</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-[var(--bg-elevated)] rounded-3xl shadow-card">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-700">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-semibold">{actualMetrics.totalOrders}</p>
              <p className="text-sm text-[var(--text-secondary)]">Pedidos</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <Card className="p-6 bg-[var(--bg-elevated)] rounded-3xl shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">Ventas del Mes</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Tendencia de ingresos y metas</p>
            </div>
            <TrendingUp className="h-5 w-5 text-[var(--emerald)]" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ventasMesData} margin={{ top: 10, right: 6, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.08)" />
                <XAxis dataKey="name" stroke="var(--text-tertiary)" />
                <YAxis stroke="var(--text-tertiary)" tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip formatter={(value: number) => formattedPrice(value)} />
                <Line type="monotone" dataKey="ventas" stroke="#111827" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="meta" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-[var(--bg-elevated)] rounded-3xl shadow-card">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-5">Alertas del Sistema</h2>
          <div className="space-y-4">
            <div className="rounded-3xl border border-[#fca5a5] bg-[#fee2e2] p-4 text-[#991b1b]">{actualMetrics.lowStockProducts ? `Productos con stock bajo: ${actualMetrics.lowStockProducts}` : 'Stock de productos estable'}</div>
            <div className="rounded-3xl border border-[#fef08a] bg-[#fef9c3] p-4 text-[#92400e]">{`Pedidos pendientes: ${pendingOrdersCount}`}</div>
            <div className="rounded-3xl border border-[#fbcfe8] bg-[#fdf2f8] p-4 text-[#9d174d]">Taller de confección con retraso en entrega</div>
            <div className="rounded-3xl border border-[#fef3c7] bg-[#fef9c3] p-4 text-[#92400e]">Pagos pendientes de confirmación</div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <Card className="p-6 bg-[var(--bg-elevated)] rounded-3xl shadow-card overflow-x-auto">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">Últimos Pedidos</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Pedidos recientes del sistema</p>
            </div>
            <Button variant="outline" className="text-sm" onClick={() => onNavigate('gestion-pedidos')}>
              Ver todos
            </Button>
          </div>
          <table className="min-w-full divide-y divide-[var(--border-default)] text-sm text-[var(--text-secondary)]">
            <thead className="border-b border-[var(--border-default)] text-[var(--text-secondary)]">
              <tr>
                <th className="py-3 px-3 text-left">ID</th>
                <th className="py-3 px-3 text-left">Cliente</th>
                <th className="py-3 px-3 text-left">Monto</th>
                <th className="py-3 px-3 text-left">Estado</th>
                <th className="py-3 px-3 text-left">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {ordersLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index} className="bg-[var(--bg-subtle)]">
                    <td className="py-4 px-3" />
                    <td className="py-4 px-3" />
                    <td className="py-4 px-3" />
                    <td className="py-4 px-3" />
                    <td className="py-4 px-3" />
                  </tr>
                ))
              ) : latestOrders.length > 0 ? (
                latestOrders.map((pedido) => (
                  <tr key={pedido.id} className="border-b border-[var(--border-subtle)] hover:bg-slate-50">
                    <td className="py-3 px-3 font-medium text-[var(--text-primary)]">{pedido.id}</td>
                    <td className="py-3 px-3">{pedido.cliente}</td>
                    <td className="py-3 px-3 font-semibold">{formattedPrice(pedido.monto)}</td>
                    <td className="py-3 px-3">{getEstadoBadge(pedido.estado)}</td>
                    <td className="py-3 px-3">{pedido.fecha}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 px-3 text-center text-[var(--text-secondary)]">No hay pedidos recientes disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>

        <Card className="p-6 bg-[var(--bg-elevated)] rounded-3xl shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">Empleados Activos</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Top asesores del mes</p>
            </div>
          </div>
          <div className="space-y-4">
            {employeesLoading && <p className="text-sm text-[var(--text-secondary)]">Cargando empleados...</p>}
            {displayedEmployees.map((empleado) => (
              <div key={empleado.id} className="flex items-center justify-between gap-3 rounded-3xl border border-[var(--border-default)] p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-slate-900 text-white font-semibold">{empleado.nombre.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{empleado.nombre}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{empleado.rol}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{empleado.ventas} ventas</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 bg-[var(--bg-elevated)] rounded-3xl shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">Ventas por Categoría</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Distribución de ventas por tipo</p>
            </div>
            <BarChart3 className="h-5 w-5 text-[var(--blue)]" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ventasPorCategoriaData} dataKey="value" nameKey="name" outerRadius={100} label>
                  {ventasPorCategoriaData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-[var(--bg-elevated)] rounded-3xl shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">Producción Semanal</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Avance de producción por día</p>
            </div>
            <Factory className="h-5 w-5 text-[var(--amber)]" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={produccionSemanalData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.08)" />
                <XAxis dataKey="dia" stroke="var(--text-tertiary)" />
                <YAxis stroke="var(--text-tertiary)" />
                <Tooltip />
                <Bar dataKey="corte" fill="#6366f1" radius={[8, 8, 0, 0]} />
                <Bar dataKey="confeccion" fill="#22c55e" radius={[8, 8, 0, 0]} />
                <Bar dataKey="estampado" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 bg-[var(--bg-elevated)] rounded-3xl shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">Top Productos</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Productos más vendidos</p>
            </div>
            <Star className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductosData} margin={{ top: 10, right: 0, left: -10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.08)" />
                <XAxis dataKey="producto" stroke="var(--text-tertiary)" fontSize={10} interval={0} angle={-30} textAnchor="end" />
                <YAxis stroke="var(--text-tertiary)" />
                <Tooltip formatter={(value: number) => formattedPrice(value)} />
                <Bar dataKey="unidades" fill="#2563eb" />
                <Bar dataKey="ingresos" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
