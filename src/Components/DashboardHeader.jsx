import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DashboardHeader.css";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Temporary frontend logout
    // Later this will be replaced with the backend logout API
    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-wrapper">
        {/* Logo */}
        <div className="dashboard-logo">
          <Link to="/user/dashboard">
            <img
              src="https://i.postimg.cc/brFfQ0QN/Chat-GPT-Image-Aug-29-2026-03-48-33-PM-removebg-preview.png  https://i.postimg.cc/brFfQ0QN/Chat-GPT-Image-Aug-29-2026-03-48-33-PM-removebg-preview.png  "
              alt="Campus Digital Marketplace"
            />
          </Link>
        </div>

        {/* Student Navigation */}
        <nav className="dashboard-nav">
          <Link to="/user/dashboard">Dashboard</Link>

          <Link to="/my-products">My Products</Link>

          <Link to="/sell">Sell Product</Link>
        </nav>

        {/* Student Account */}
        <div className="dashboard-account">
          <Link to="/profile" className="profile-link">
            Profile
          </Link>

          <button
            type="button"
            className="dashboard-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
