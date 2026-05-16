import type { DeliveryPerson } from '../types/delivery.types';

const past = (days: number) => new Date(Date.now() - days * 86400000).toISOString();

export const mockDeliveryPeople: DeliveryPerson[] = [
  { id: 'del-1', fullName: 'Juan Pérez', email: 'juan@surtitelas.com', phone: '3001234567', document: '1234567890', vehicle: 'moto', status: 'online', activeOrders: 2, totalDeliveries: 145, rating: 4.8, zone: 'Norte', createdAt: past(180), updatedAt: past(0) },
  { id: 'del-2', fullName: 'María López', email: 'maria@surtitelas.com', phone: '3109876543', document: '9876543210', vehicle: 'moto', status: 'busy', activeOrders: 3, totalDeliveries: 98, rating: 4.6, zone: 'Sur', createdAt: past(120), updatedAt: past(0) },
  { id: 'del-3', fullName: 'Carlos Ruiz', email: 'carlos@surtitelas.com', phone: '3205551234', document: '5551234567', vehicle: 'bicicleta', status: 'offline', activeOrders: 0, totalDeliveries: 67, rating: 4.3, zone: 'Centro', createdAt: past(90), updatedAt: past(1) },
  { id: 'del-4', fullName: 'Ana García', email: 'ana@surtitelas.com', phone: '3154447890', document: '4447890123', vehicle: 'moto', status: 'online', activeOrders: 1, totalDeliveries: 210, rating: 4.9, zone: 'Occidente', createdAt: past(240), updatedAt: past(0) },
];
