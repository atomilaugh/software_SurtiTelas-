import { create } from 'zustand';
import type { Order } from '../types/orders.types';

interface OrdersStore {
  selectedOrder: Order | null;
  showDetail: boolean;
  showAssignDelivery: boolean;
  search: string;
  statusFilter: string;
  paymentFilter: string;
  page: number;
  pageSize: number;

  setSelectedOrder: (order: Order | null) => void;
  openDetail: (order: Order) => void;
  closeDetail: () => void;
  openAssignDelivery: (order: Order) => void;
  closeAssignDelivery: () => void;
  setSearch: (v: string) => void;
  setStatusFilter: (v: string) => void;
  setPaymentFilter: (v: string) => void;
  setPage: (v: number) => void;
  resetFilters: () => void;
}

export const useOrdersStore = create<OrdersStore>((set) => ({
  selectedOrder: null,
  showDetail: false,
  showAssignDelivery: false,
  search: '',
  statusFilter: '',
  paymentFilter: '',
  page: 1,
  pageSize: 10,

  setSelectedOrder: (order) => set({ selectedOrder: order }),
  openDetail: (order) => set({ selectedOrder: order, showDetail: true }),
  closeDetail: () => set({ showDetail: false, selectedOrder: null }),
  openAssignDelivery: (order) => set({ selectedOrder: order, showAssignDelivery: true }),
  closeAssignDelivery: () => set({ showAssignDelivery: false }),
  setSearch: (v) => set({ search: v, page: 1 }),
  setStatusFilter: (v) => set({ statusFilter: v, page: 1 }),
  setPaymentFilter: (v) => set({ paymentFilter: v, page: 1 }),
  setPage: (v) => set({ page: v }),
  resetFilters: () => set({ search: '', statusFilter: '', paymentFilter: '', page: 1 }),
}));
