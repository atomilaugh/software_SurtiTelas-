import { UserEntity } from '../types/user.types';

export const USERS_MOCK: UserEntity[] = [
  { id: '1', fullName: 'Juan Pérez', email: 'juan@surticamisetas.com', phone: '3001234567', role: 'admin', status: 'active', active: true, createdAt: '2026-05-14' },
  { id: '2', fullName: 'María López', email: 'maria@surticamisetas.com', phone: '3019876543', role: 'asesor', status: 'active', active: true, createdAt: '2026-05-13' },
  { id: '3', fullName: 'Carlos Díaz', email: 'carlos@surticamisetas.com', phone: '3205551122', role: 'domiciliario', status: 'inactive', active: false, createdAt: '2026-05-12' },
];
