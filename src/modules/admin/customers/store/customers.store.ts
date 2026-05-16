import { create } from 'zustand';
import type { Customer } from '../types/customers.types';

interface CustomersStore {
  selectedCustomer: Customer | null;
  showDetail: boolean;
  search: string;
  segmentFilter: string;
  statusFilter: string;
  page: number;
  pageSize: number;

  openDetail: (customer: Customer) => void;
  closeDetail: () => void;
  setSearch: (v: string) => void;
  setSegmentFilter: (v: string) => void;
  setStatusFilter: (v: string) => void;
  setPage: (v: number) => void;
  resetFilters: () => void;
}

export const useCustomersStore = create<CustomersStore>((set) => ({
  selectedCustomer: null,
  showDetail: false,
  search: '',
  segmentFilter: '',
  statusFilter: '',
  page: 1,
  pageSize: 10,

  openDetail: (customer) => set({ selectedCustomer: customer, showDetail: true }),
  closeDetail: () => set({ showDetail: false, selectedCustomer: null }),
  setSearch: (v) => set({ search: v, page: 1 }),
  setSegmentFilter: (v) => set({ segmentFilter: v, page: 1 }),
  setStatusFilter: (v) => set({ statusFilter: v, page: 1 }),
  setPage: (v) => set({ page: v }),
  resetFilters: () => set({ search: '', segmentFilter: '', statusFilter: '', page: 1 }),
}));
