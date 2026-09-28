import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../Components/Footer";
import "./Dashboard.css";
import DashboardHeader from "../../Components/DashboardHeader";
import { apiClient } from "../../config/AxiosInstance";

const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    soldItems: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
    fetchUserName();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/user/dashboard");
      const data = res.data ?? {};

      const dashboard = data.dashboard ?? {};
      setStats({
        totalListings: dashboard.totalListings ?? 0,
        activeListings: dashboard.activeListings ?? 0,
        soldItems: dashboard.soldItems ?? 0,
      });

      const products = data.requiredProducts ?? [];
      setRecentProducts(
        products.map((p) => ({
          id: p.id,
          name: p.productName,
          price: p.price,
          category: p.category,
          status: p.status,
          image: p.image,
        })),
      );
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      toast.error(
        err.response?.data?.message || "Could not load your dashboard.",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchUserName = async () => {
    try {
      const res = await apiClient.get("/user/profile");
      setFirstName(res.data?.data?.firstName ?? "");
    } catch (err) {
      // Silent on purpose: the greeting falls back to "Welcome back 👋"
      console.error("User name fetch error:", err);
    }
  };

  return (
    <>
      <DashboardHeader />

      <main className="dashboard-page">
        {/* ================= WELCOME SECTION ================= */}

        <section className="dashboard-welcome">
          <div className="welcome-content">
            <div>
              <p className="dashboard-tag">STUDENT DASHBOARD</p>

              <h1>Welcome back{firstName ? `, ${firstName}` : ""} 👋</h1>

              <p className="welcome-text">
                Manage your products and activities on the Campus Digital
                Marketplace.
              </p>
            </div>

            <Link to="/sell" className="dashboard-sell-btn">
              + Sell an Item
            </Link>
          </div>
        </section>

        {/* ================= DASHBOARD CONTENT ================= */}

        <section className="dashboard-content">
          {/* ================= STATISTICS ================= */}

          <div className="stats-grid">
            <article className="stat-card">
              <div className="stat-icon">📦</div>

              <div>
                <p>Total Listings</p>

                <h2>{loading ? "--" : stats.totalListings}</h2>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-icon">🟢</div>

              <div>
                <p>Active Listings</p>

                <h2>{loading ? "--" : stats.activeListings}</h2>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-icon">✓</div>

              <div>
                <p>Sold Items</p>

                <h2>{loading ? "--" : stats.soldItems}</h2>
              </div>
            </article>
          </div>

          {/* ================= RECENT PRODUCTS ================= */}

          <section className="dashboard-section">
            <div className="dashboard-section-header">
              <div>
                <p className="section-tag">YOUR ACTIVITY</p>

                <h2>Recent Listings</h2>
              </div>

              <Link to="/my-products" className="view-all-link">
                View All →
              </Link>
            </div>

            <div className="dashboard-products-grid">
              {loading ? (
                <p>Loading your listings...</p>
              ) : recentProducts.length === 0 ? (
                <p>You haven't listed any products yet.</p>
              ) : (
                recentProducts.map((product) => (
                  <article className="dashboard-product-card" key={product.id}>
                    <div className="dashboard-product-image">
                      <img src={product.image} alt={product.name} />

                      <span
                        className={
                          product.status?.toLowerCase() === "sold"
                            ? "product-status sold"
                            : "product-status active"
                        }
                      >
                        {product.status}
                      </span>
                    </div>

                    <div className="dashboard-product-info">
                      <p className="product-category">{product.category}</p>

                      <h3>{product.name}</h3>

                      <h4>₦{Number(product.price ?? 0).toLocaleString()}</h4>

                      <Link to={`/View-products/${product.id}`}>
                        View Product →
                      </Link>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          {/* ================= QUICK ACTIONS ================= */}

          <section className="dashboard-section">
            <div className="dashboard-section-header">
              <div>
                <p className="section-tag">QUICK ACCESS</p>

                <h2>Quick Actions</h2>
              </div>
            </div>

            <div className="quick-actions-grid">
              <Link to="/sell" className="quick-action-card">
                <div className="quick-action-icon">+</div>

                <h3>Sell an Item</h3>

                <p>Post a new product or service for other students.</p>
              </Link>

              <Link to="/my-products" className="quick-action-card">
                <div className="quick-action-icon">📦</div>

                <h3>My Products</h3>

                <p>Manage, edit or update your product listings.</p>
              </Link>

              <Link to="/profile" className="quick-action-card">
                <div className="quick-action-icon">👤</div>

                <h3>My Profile</h3>

                <p>View and manage your account information.</p>
              </Link>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Dashboard;
