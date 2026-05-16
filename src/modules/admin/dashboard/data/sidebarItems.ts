import {
  LayoutDashboard,
  Settings,
  Users,
  Boxes,
  ShoppingCart,
  BarChart3,
  UserCircle,
  Bike,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    title: "Inventario",
    icon: Boxes,
    path: "/admin/inventario",
  },
  {
    title: "Pedidos",
    icon: ShoppingCart,
    path: "/admin/pedidos",
  },
  {
    title: "Clientes",
    icon: UserCircle,
    path: "/admin/clientes",
  },
  {
    title: "Domiciliarios",
    icon: Bike,
    path: "/admin/domiciliarios",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
  {
    title: "Usuarios",
    icon: Users,
    path: "/admin/users",
  },
  {
    title: "Configuración",
    icon: Settings,
    path: "/admin/configuracion",
  },
];