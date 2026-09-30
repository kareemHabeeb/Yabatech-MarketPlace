import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./DashboardHeader.css";
import { apiClient } from "../config/AxiosInstance";
import { clearUser } from "../global/userSlice";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await apiClient.post("user/logout");

      toast.success(res.data?.message || "Logged out successfully.");
    } catch (err) {
      console.error("Logout error:", err);
      // Even if the server call fails, still clear the local session below
      // so the user isn't stuck "logged in" on a broken request.
      toast.error(
        err.response?.data?.message ||
          "Could not reach the server, but you've been logged out locally.",
      );
    } finally {
      dispatch(clearUser());
      localStorage.removeItem("isLoggedIn");
      setLoggingOut(false);
      navigate("/login");
    }
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-wrapper">
        {/* Logo */}
        <div className="dashboard-logo">
          <Link to="/user/dashboard">
            <img
              src="https://i.postimg.cc/brFfQ0QN/Chat-GPT-Image-Aug-29-2026-03-48-33-PM-removebg-preview.png"
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
            disabled={loggingOut}
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
