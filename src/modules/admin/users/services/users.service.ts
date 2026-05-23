export const usersService = {
  getUsers: async () => {
    return [
      { id: '1', fullName: 'Andres Murillo', email: 'andres@surtitelas.com', phone: '3001234567', role: 'admin' as const, status: 'active' as const, active: true, createdAt: '2024-01-01' },
      { id: '2', fullName: 'Carlos Perez', email: 'carlos@surtitelas.com', phone: '3109876543', role: 'asesor' as const, status: 'active' as const, active: true, createdAt: '2024-02-01' },
      { id: '3', fullName: 'Laura Gomez', email: 'laura@surtitelas.com', phone: '3205551234', role: 'domiciliario' as const, status: 'inactive' as const, active: false, createdAt: '2024-03-01' },
    ];
  },

  createUser: async (data: { fullName: string; email: string; role: string }) => {
    return { id: String(Date.now()), ...data, status: 'active' as const, active: true, createdAt: new Date().toISOString() };
  },
};