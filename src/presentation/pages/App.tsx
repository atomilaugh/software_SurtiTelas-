import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from '@presentation/contexts/AuthContext';
import { CartProvider } from '@presentation/contexts/CartContext';
import { CartDrawerProvider } from '@presentation/contexts/CartDrawerContext';
import { ThemeProvider } from '@presentation/contexts/ThemeContext';
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import HomePage from "./public/HomePage";
import CatalogPage from "./features/CatalogPage";
import CartPage from "./features/CartPage";
import ContactPage from "./features/ContactPage";
import AboutPage from "./public/AboutPage";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import AdminLoginPage from "./auth/AdminLoginPage";
import AdminDashboard from "./dashboards/AdminDashboard";
import AsesorDashboard from "./dashboards/AsesorDashboard";
import DomiciliarioDashboard from "./dashboards/DomiciliarioDashboard";
import { CartDrawer } from "../components/CartDrawer";
import ScrollToTop from "../components/ScrollToTop";

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const hideGlobalLayout = location.pathname.startsWith('/admin') || location.pathname.startsWith('/asesor') || location.pathname.startsWith('/domiciliario');

  return (
    <div className="flex flex-col min-h-screen">
      {!hideGlobalLayout && <Navbar />}
      <CartDrawer />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/asesor/dashboard" element={<AsesorDashboard />} />
          <Route path="/domiciliario/dashboard" element={<DomiciliarioDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideGlobalLayout && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <CartDrawerProvider>
          <ThemeProvider>
            <BrowserRouter>
              <ScrollToTop />
              <AppRoutes />
            </BrowserRouter>
          </ThemeProvider>
        </CartDrawerProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;



