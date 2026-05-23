import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersService } from '../services/orders.service';
import type { OrderFilters, OrderStatus } from '../types/orders.types';
import toast from 'react-hot-toast';

export const ORDERS_KEYS = {
  all: ['orders'] as const,
  list: (filters?: Partial<OrderFilters>) => ['orders', 'list', filters] as const,
  detail: (id: string) => ['orders', 'detail', id] as const,
  stats: () => ['orders', 'stats'] as const,
};

export const useOrderStats = () =>
  useQuery({ queryKey: ORDERS_KEYS.stats(), queryFn: ordersService.getOrderStats });

export const useOrders = (filters: Partial<OrderFilters> = {}) =>
  useQuery({
    queryKey: ORDERS_KEYS.list(filters),
    queryFn: () => ordersService.getOrders(filters),
    placeholderData: (prev) => prev,
  });

export const useOrder = (id: string) =>
  useQuery({ queryKey: ORDERS_KEYS.detail(id), queryFn: () => ordersService.getOrderById(id), enabled: !!id });

export const useUpdateOrderStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, userId, userName }: { id: string; status: OrderStatus; userId: string; userName: string }) =>
      ordersService.updateOrderStatus(id, status, userId, userName),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ORDERS_KEYS.all });
      toast.success('Estado actualizado');
    },
    onError: () => toast.error('Error al actualizar estado'),
  });
};

export const useAssignDelivery = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, deliveryId, deliveryName }: { id: string; deliveryId: string; deliveryName: string }) =>
      ordersService.assignDelivery(id, deliveryId, deliveryName),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ORDERS_KEYS.all });
      toast.success('Domiciliario asignado');
    },
    onError: () => toast.error('Error al asignar domiciliario'),
  });
};
