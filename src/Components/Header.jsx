import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-wrapper">

        {/* LOGO */}
        <Link to="/" className="logo-holder">
          <img
            src="/src/assets/Logo.png"
            alt="Campus Digital Marketplace Logo"
            className="logo"
          />

          <div className="logo-text">
            <span className="logo-title">Campus Digital</span>
            <span className="logo-subtitle">Marketplace</span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="nav-holder">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-route active" : "nav-route"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/marketplace"
            className={({ isActive }) =>
              isActive ? "nav-route active" : "nav-route"
            }
          >
            Marketplace
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? "nav-route active" : "nav-route"
            }
          >
            Categories
          </NavLink>
        </nav>

        {/* AUTH BUTTONS */}
        <div className="auth-actions">
          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="register-btn">
            Register
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;