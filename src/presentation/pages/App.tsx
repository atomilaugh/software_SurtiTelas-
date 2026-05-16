import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@presentation/contexts/AuthContext";
import { CartProvider } from "@presentation/contexts/CartContext";
import { CartDrawerProvider } from "@presentation/contexts/CartDrawerContext";
import { ThemeProvider } from "@presentation/contexts/ThemeContext";
import ProtectedRoute from "@presentation/routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import ScrollToTop from "../components/ScrollToTop";
import { CartDrawer } from "../components/CartDrawer";
import { Spinner } from "@/shared/ui";

// PUBLIC PAGES
import HomePage from "./public/HomePage";
import CatalogPage from "./features/CatalogPage";
import CartPage from "./features/CartPage";
import ContactPage from "./features/ContactPage";
import AboutPage from "./public/AboutPage";

// AUTH
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";

// ADMIN — lazy loaded
const AdminDashboard = lazy(() => import("@/modules/admin/dashboard/AdminDashboard"));
const UsersPage = lazy(() => import("@/modules/admin/users/users/UsersPage"));
const InventoryPage = lazy(() => import("@/modules/admin/inventory/pages/InventoryPage"));
const OrdersPage = lazy(() => import("@/modules/admin/orders/pages/OrdersPage"));
const CustomersPage = lazy(() => import("@/modules/admin/customers/pages/CustomersPage"));
const DeliveryPage = lazy(() => import("@/modules/admin/delivery/pages/DeliveryPage"));
const AnalyticsPage = lazy(() => import("@/modules/admin/analytics/pages/AnalyticsPage"));
const SettingsPage = lazy(() => import("@/modules/admin/settings/pages/SettingsPage"));

const AdminLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#09090B]">
    <Spinner size="lg" />
  </div>
);

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <CartDrawer />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute allowedRoles={["admin"]}>
    <Suspense fallback={<AdminLoader />}>{children}</Suspense>
  </ProtectedRoute>
);

const AppRoutes: React.FC = () => (
  <Routes>
    {/* PUBLIC */}
    <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
    <Route path="/catalogo" element={<PublicLayout><CatalogPage /></PublicLayout>} />
    <Route path="/carrito" element={<PublicLayout><CartPage /></PublicLayout>} />
    <Route path="/contacto" element={<PublicLayout><ContactPage /></PublicLayout>} />
    <Route path="/nosotros" element={<PublicLayout><AboutPage /></PublicLayout>} />

    {/* AUTH */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/registro" element={<RegisterPage />} />

    {/* ADMIN */}
    <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
    <Route path="/admin/users" element={<AdminRoute><UsersPage /></AdminRoute>} />
    <Route path="/admin/inventario" element={<AdminRoute><InventoryPage /></AdminRoute>} />
    <Route path="/admin/pedidos" element={<AdminRoute><OrdersPage /></AdminRoute>} />
    <Route path="/admin/clientes" element={<AdminRoute><CustomersPage /></AdminRoute>} />
    <Route path="/admin/domiciliarios" element={<AdminRoute><DeliveryPage /></AdminRoute>} />
    <Route path="/admin/analytics" element={<AdminRoute><AnalyticsPage /></AdminRoute>} />
    <Route path="/admin/configuracion" element={<AdminRoute><SettingsPage /></AdminRoute>} />

    {/* REDIRECT */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App: React.FC = () => (
  <AuthProvider>
    <CartProvider>
      <CartDrawerProvider>
        <ThemeProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: { borderRadius: '12px', fontSize: '14px' },
              }}
            />
          </BrowserRouter>
        </ThemeProvider>
      </CartDrawerProvider>
    </CartProvider>
  </AuthProvider>
);

export default App;