import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import logoImg from "@assets/images/logos/surtitelas-logo.jpg";
import { useCart } from "@presentation/contexts/CartContext";
import { useAuth } from "@presentation/contexts/AuthContext";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const goToCart = () => navigate("/carrito");
  const goToLogin = () => navigate("/login");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleUserClick = () => {
    if (user) navigate("/");
    else goToLogin();
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="brand">
          <Link to="/">
            <img src={logoImg} alt="Surticamisetas" className="main-logo" loading="lazy" onError={(e) => { const t = e.currentTarget; if (!t.src.includes('placeholders')) t.src = '/assets/images/placeholders/logo-light.svg'; }} />
          </Link>
        </div>

        <nav className="site-nav">
          <Link to="/">Inicio</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>

        <div className="header-actions">
          {user ? (
            <button
              className="icon-btn"
              title={role === "admin" ? "Panel Admin" : role === "asesor" ? "Panel Asesor" : role === "domiciliario" ? "Panel Domiciliario" : "Mi cuenta"}
              onClick={handleUserClick}
            >
              <User size={22} />
            </button>
          ) : (
            <button
              className="icon-btn"
              title="Iniciar sesión"
              onClick={goToLogin}
            >
              <User size={22} />
            </button>
          )}

          <button className="cart-wrapper-pro" onClick={goToCart}>
            <ShoppingCart size={24} color="#1a1a1a" />
            {totalItems > 0 && (
              <span className="cart-badge-dynamic">{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;



