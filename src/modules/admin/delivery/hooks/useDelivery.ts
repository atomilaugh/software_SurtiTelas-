import type { DeliveryPerson } from '../types/delivery.types';
import { mockDeliveryPeople } from '../mock/delivery.mock';
import { useQuery } from '@tanstack/react-query';

const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));
let deliveryPeople = [...mockDeliveryPeople];

export const deliveryService = {
  async getAll(): Promise<DeliveryPerson[]> {
    await delay();
    return [...deliveryPeople];
  },
  async getStats() {
    await delay(200);
    return {
      total: deliveryPeople.length,
      online: deliveryPeople.filter(d => d.status === 'online').length,
      busy: deliveryPeople.filter(d => d.status === 'busy').length,
      offline: deliveryPeople.filter(d => d.status === 'offline').length,
      totalDeliveries: deliveryPeople.reduce((acc, d) => acc + d.totalDeliveries, 0),
    };
  },
};

export const DELIVERY_KEYS = {
  all: ['delivery'] as const,
  list: () => ['delivery', 'list'] as const,
  stats: () => ['delivery', 'stats'] as const,
};

export const useDeliveryPeople = () =>
  useQuery({ queryKey: DELIVERY_KEYS.list(), queryFn: deliveryService.getAll });

export const useDeliveryStats = () =>
  useQuery({ queryKey: DELIVERY_KEYS.stats(), queryFn: deliveryService.getStats });
