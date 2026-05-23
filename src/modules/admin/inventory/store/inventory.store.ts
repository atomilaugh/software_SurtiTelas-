import { create } from 'zustand';
import type { Product, Category, Supplier } from '../types/inventory.types';

type ModalType = 'product' | 'category' | 'supplier' | 'stock-movement' | 'kardex' | null;

interface InventoryStore {
  // Modal state
  activeModal: ModalType;
  selectedProduct: Product | null;
  selectedCategory: Category | null;
  selectedSupplier: Supplier | null;

  // Filters
  search: string;
  categoryFilter: string;
  supplierFilter: string;
  statusFilter: string;
  stockAlertFilter: boolean;
  page: number;
  pageSize: number;

  // Actions
  openModal: (type: ModalType, product?: Product, category?: Category, supplier?: Supplier) => void;
  closeModal: () => void;
  setSearch: (v: string) => void;
  setCategoryFilter: (v: string) => void;
  setSupplierFilter: (v: string) => void;
  setStatusFilter: (v: string) => void;
  setStockAlertFilter: (v: boolean) => void;
  setPage: (v: number) => void;
  resetFilters: () => void;
}

export const useInventoryStore = create<InventoryStore>((set) => ({
  activeModal: null,
  selectedProduct: null,
  selectedCategory: null,
  selectedSupplier: null,
  search: '',
  categoryFilter: '',
  supplierFilter: '',
  statusFilter: '',
  stockAlertFilter: false,
  page: 1,
  pageSize: 10,

  openModal: (type, product, category, supplier) =>
    set({ activeModal: type, selectedProduct: product || null, selectedCategory: category || null, selectedSupplier: supplier || null }),
  closeModal: () =>
    set({ activeModal: null, selectedProduct: null, selectedCategory: null, selectedSupplier: null }),
  setSearch: (v) => set({ search: v, page: 1 }),
  setCategoryFilter: (v) => set({ categoryFilter: v, page: 1 }),
  setSupplierFilter: (v) => set({ supplierFilter: v, page: 1 }),
  setStatusFilter: (v) => set({ statusFilter: v, page: 1 }),
  setStockAlertFilter: (v) => set({ stockAlertFilter: v, page: 1 }),
  setPage: (v) => set({ page: v }),
  resetFilters: () => set({ search: '', categoryFilter: '', supplierFilter: '', statusFilter: '', stockAlertFilter: false, page: 1 }),
}));
