import DashboardLayout from '../../dashboard/components/layout/DashboardLayout';
import { StatsCard, Table, TableHead, TableBody, TableRow, TableCell, TableHeader, Badge, Avatar, SkeletonTable, EmptyState } from '@/shared/ui';
import { Bike, Star, MapPin, Package, Wifi, WifiOff, Clock } from 'lucide-react';
import { useDeliveryPeople, useDeliveryStats } from '../hooks/useDelivery';
import type { DeliveryPerson, DeliveryStatus } from '../types/delivery.types';
import { cn } from '@/shared/utils';

const STATUS_CONFIG: Record<DeliveryStatus, { label: string; variant: 'success' | 'warning' | 'default'; icon: React.ReactNode }> = {
  online: { label: 'En línea', variant: 'success', icon: <Wifi size={12} /> },
  busy: { label: 'Ocupado', variant: 'warning', icon: <Clock size={12} /> },
  offline: { label: 'Desconectado', variant: 'default', icon: <WifiOff size={12} /> },
};

const VEHICLE_LABELS = { moto: '🏍️ Moto', bicicleta: '🚲 Bicicleta', pie: '🚶 A pie' };

const DeliveryPage = () => {
  const { data: stats, isLoading: statsLoading } = useDeliveryStats();
  const { data: people = [], isLoading } = useDeliveryPeople();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Domiciliarios</h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">Gestión y seguimiento de domiciliarios</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatsCard title="Total" value={stats?.total ?? 0} icon={<Bike size={16} />} iconColor="bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400" loading={statsLoading} />
          <StatsCard title="En línea" value={stats?.online ?? 0} icon={<Wifi size={16} />} iconColor="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" loading={statsLoading} />
          <StatsCard title="Ocupados" value={stats?.busy ?? 0} icon={<Clock size={16} />} iconColor="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" loading={statsLoading} />
          <StatsCard title="Desconectados" value={stats?.offline ?? 0} icon={<WifiOff size={16} />} iconColor="bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400" loading={statsLoading} />
          <StatsCard title="Entregas totales" value={stats?.totalDeliveries ?? 0} icon={<Package size={16} />} iconColor="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" loading={statsLoading} />
        </div>

        {isLoading ? (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6">
            <SkeletonTable rows={4} cols={7} />
          </div>
        ) : people.length === 0 ? (
          <EmptyState icon={<Bike size={32} />} title="No hay domiciliarios" description="Aún no hay domiciliarios registrados." />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Domiciliario</TableHeader>
                <TableHeader>Vehículo</TableHeader>
                <TableHeader>Zona</TableHeader>
                <TableHeader>Estado</TableHeader>
                <TableHeader>Pedidos activos</TableHeader>
                <TableHeader sortable>Total entregas</TableHeader>
                <TableHeader sortable>Calificación</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {people.map((person: DeliveryPerson) => {
                const statusConfig = STATUS_CONFIG[person.status];
                return (
                  <TableRow key={person.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar name={person.fullName} size="sm" />
                          <span className={cn(
                            'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900',
                            person.status === 'online' ? 'bg-emerald-500' : person.status === 'busy' ? 'bg-amber-500' : 'bg-slate-400'
                          )} />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-slate-900 dark:text-white">{person.fullName}</p>
                          <p className="text-xs text-slate-400 dark:text-zinc-500">{person.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{VEHICLE_LABELS[person.vehicle]}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-zinc-400">
                        <MapPin size={12} />{person.zone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusConfig.variant} dot>{statusConfig.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{person.activeOrders}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-slate-900 dark:text-white">{person.totalDeliveries}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-sm">{person.rating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DeliveryPage;
