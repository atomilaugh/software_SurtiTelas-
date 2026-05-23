import type { Customer, CustomerFilters, CustomerStatus, CustomerSegment } from '../types/customers.types';
import { mockCustomers } from '../mock/customers.mock';

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));
let customers = [...mockCustomers];

export const customersService = {
  async getCustomers(filters: Partial<CustomerFilters> = {}): Promise<{ data: Customer[]; total: number }> {
    await delay();
    let result = [...customers];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(c => c.fullName.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q));
    }
    if (filters.segment) result = result.filter(c => c.segment === filters.segment);
    if (filters.status) result = result.filter(c => c.status === filters.status);
    const total = result.length;
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    return { data: result.slice((page - 1) * pageSize, page * pageSize), total };
  },

  async getCustomerById(id: string): Promise<Customer | null> {
    await delay(200);
    return customers.find(c => c.id === id) || null;
  },

  async createCustomer(data: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
    await delay();
    const customer: Customer = { ...data, id: `cus-${Date.now()}`, totalOrders: 0, totalSpent: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    customers = [customer, ...customers];
    return customer;
  },

  async updateCustomer(id: string, data: Partial<Customer>): Promise<Customer> {
    await delay();
    const idx = customers.findIndex(c => c.id === id);
    if (idx === -1) throw new Error('Cliente no encontrado');
    customers[idx] = { ...customers[idx], ...data, updatedAt: new Date().toISOString() };
    return customers[idx];
  },

  async toggleBlock(id: string): Promise<Customer> {
    await delay(200);
    const idx = customers.findIndex(c => c.id === id);
    if (idx === -1) throw new Error('Cliente no encontrado');
    customers[idx].status = customers[idx].status === 'active' ? 'blocked' : 'active';
    customers[idx].updatedAt = new Date().toISOString();
    return customers[idx];
  },

  async deleteCustomer(id: string): Promise<void> {
    await delay();
    customers = customers.filter(c => c.id !== id);
  },

  async getStats() {
    await delay(200);
    return {
      total: customers.length,
      active: customers.filter(c => c.status === 'active').length,
      blocked: customers.filter(c => c.status === 'blocked').length,
      vip: customers.filter(c => c.segment === 'vip').length,
      frecuente: customers.filter(c => c.segment === 'frecuente').length,
      nuevo: customers.filter(c => c.segment === 'nuevo').length,
      inactivo: customers.filter(c => c.segment === 'inactivo').length,
      totalRevenue: customers.reduce((acc, c) => acc + c.totalSpent, 0),
    };
  },
};
