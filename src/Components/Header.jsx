import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header-wrapper">
        {/* LOGO */}
        <Link to="/" className="logo-holder" onClick={closeMenu}>
          <img
            src="https://i.postimg.cc/brFfQ0QN/Chat-GPT-Image-Aug-29-2026-03-48-33-PM-removebg-preview.png  "
            alt="Campus Digital Marketplace Logo"
            className="logo"
          />
          <div className="logo-text">
            <span className="logo-title">Campus Digital</span>
            <span className="logo-subtitle">Marketplace</span>
          </div>
        </Link>

        {/* HAMBURGER BUTTON */}
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* NAVIGATION */}
        <nav className={`nav-holder ${isMenuOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-route active" : "nav-route"
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/marketplace"
            className={({ isActive }) =>
              isActive ? "nav-route active" : "nav-route"
            }
            onClick={closeMenu}
          >
            Marketplace
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? "nav-route active" : "nav-route"
            }
            onClick={closeMenu}
          >
            Categories
          </NavLink>

          {/* Mobile auth buttons (inside nav) */}
          <div className="mobile-auth">
            <Link to="/login" className="login-btn" onClick={closeMenu}>
              Login
            </Link>
            <Link to="/register" className="register-btn" onClick={closeMenu}>
              Register
            </Link>
          </div>
        </nav>

        {/* AUTH BUTTONS (desktop) */}
        <div className="auth-actions">
          <Link to="/login" className="login-btn">
            Login
          </Link>
          <Link to="/register" className="register-btn">
            Register
          </Link>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;
