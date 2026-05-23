export type DeliveryStatus = 'online' | 'offline' | 'busy';

export interface DeliveryPerson {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  document: string;
  vehicle: 'moto' | 'bicicleta' | 'pie';
  status: DeliveryStatus;
  activeOrders: number;
  totalDeliveries: number;
  rating: number;
  zone: string;
  createdAt: string;
  updatedAt: string;
}
