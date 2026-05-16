export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'asesor' | 'cliente' | 'domiciliario';
  status: 'active' | 'inactive';
  active?: boolean;
  createdAt: string;
}

// Alias for backward compatibility
export type UserEntity = User;