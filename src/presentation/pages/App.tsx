import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { CartDrawer } from "../components/CartDrawer";
import ScrollToTop from "../components/ScrollToTop";

const AppRoutes: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
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



