import type { Product, User, Employee, AdvisorRating } from '../types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Camiseta Clásica',
    description: 'Camiseta cómoda para uso diario',
    category: 'Ropa',
    price: 29900,
    image: '/assets/images/products/camiseta-1.jpg',
    stock: 25,
    rating: 4.5,
  },
  {
    id: 'p2',
    name: 'Sudadera Deportiva',
    description: 'Sudadera ligera para entrenamiento',
    category: 'Deporte',
    price: 54900,
    image: '/assets/images/products/sudadera-1.jpg',
    stock: 18,
    rating: 4.2,
  },
  {
    id: 'p3',
    name: 'Pantalón Casual',
    description: 'Pantalón informal para oficina y fin de semana',
    category: 'Ropa',
    price: 45900,
    image: '/assets/images/products/pantalon-1.jpg',
    stock: 12,
    rating: 4.7,
  },
];

export const customers: User[] = [
  {
    id: 'c1',
    name: 'Ana Gómez',
    email: 'ana.gomez@example.com',
    role: 'cliente',
    city: 'Bogotá',
    totalSpent: 120000,
    orders: 8,
  },
  {
    id: 'c2',
    name: 'Luis Fernández',
    email: 'luis.fernandez@example.com',
    role: 'cliente',
    city: 'Medellín',
    totalSpent: 96000,
    orders: 5,
  },
];

export const employees: Employee[] = [
  {
    id: 'e1',
    name: 'María Pérez',
    position: 'Asesora',
    email: 'maria.perez@example.com',
    phone: '+57 300 123 4567',
    avatar: '/assets/images/users/asesora-1.jpg',
    status: 'Activo',
  },
  {
    id: 'e2',
    name: 'Carlos Ramírez',
    position: 'Domiciliario',
    email: 'carlos.ramirez@example.com',
    phone: '+57 310 987 6543',
    avatar: '/assets/images/users/domiciliario-1.jpg',
    status: 'Activo',
  },
];

export const advisorRatings: AdvisorRating[] = [
  {
    id: 'r1',
    client: 'Ana Gómez',
    rating: 5,
    comment: 'Excelente asesoría y respuesta rápida.',
    date: '2026-05-20',
    status: 'Completado',
  },
  {
    id: 'r2',
    client: 'Luis Fernández',
    rating: 4,
    comment: 'Buen servicio y recomendaciones útiles.',
    date: '2026-05-22',
    status: 'Completado',
  },
];
