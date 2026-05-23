import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customersService } from '../services/customers.service';
import type { CustomerFilters, Customer } from '../types/customers.types';
import toast from 'react-hot-toast';

export const CUSTOMERS_KEYS = {
  all: ['customers'] as const,
  list: (filters?: Partial<CustomerFilters>) => ['customers', 'list', filters] as const,
  detail: (id: string) => ['customers', 'detail', id] as const,
  stats: () => ['customers', 'stats'] as const,
};

export const useCustomerStats = () =>
  useQuery({ queryKey: CUSTOMERS_KEYS.stats(), queryFn: customersService.getStats });

export const useCustomers = (filters: Partial<CustomerFilters> = {}) =>
  useQuery({
    queryKey: CUSTOMERS_KEYS.list(filters),
    queryFn: () => customersService.getCustomers(filters),
    placeholderData: (prev) => prev,
  });

export const useCustomer = (id: string) =>
  useQuery({ queryKey: CUSTOMERS_KEYS.detail(id), queryFn: () => customersService.getCustomerById(id), enabled: !!id });

export const useToggleBlockCustomer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => customersService.toggleBlock(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: CUSTOMERS_KEYS.all }); toast.success('Estado actualizado'); },
    onError: () => toast.error('Error al actualizar estado'),
  });
};

export const useDeleteCustomer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => customersService.deleteCustomer(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: CUSTOMERS_KEYS.all }); toast.success('Cliente eliminado'); },
    onError: () => toast.error('Error al eliminar cliente'),
  });
};

export const useUpdateCustomer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Customer> }) => customersService.updateCustomer(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: CUSTOMERS_KEYS.all }); toast.success('Cliente actualizado'); },
    onError: () => toast.error('Error al actualizar cliente'),
  });
};
