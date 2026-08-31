import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import "./Dashboard.css";

const Dashboard = () => {
  // Temporary mock data
  // Later, this will come from your API

  const user = {
    name: "Kareem",
  };

  const recentProducts = [
    {
      id: 1,
      name: "HP EliteBook Laptop",
      price: 250000,
      category: "Electronics",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    },
    {
      id: 2,
      name: "Engineering Mathematics Textbook",
      price: 5000,
      category: "Books",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    },
    {
      id: 3,
      name: "Wireless Headphones",
      price: 12000,
      category: "Electronics",
      status: "Sold",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
  ];

  return (
    <>
      <Header />

      <main className="dashboard-page">

        {/* ================= WELCOME SECTION ================= */}

        <section className="dashboard-welcome">

          <div className="welcome-content">

            <div>
              <p className="dashboard-tag">
                STUDENT DASHBOARD
              </p>

              <h1>
                Welcome back, {user.name} 👋
              </h1>

              <p className="welcome-text">
                Manage your products and activities on the Campus Digital
                Marketplace.
              </p>
            </div>

            <Link
              to="/sell"
              className="dashboard-sell-btn"
            >
              + Sell an Item
            </Link>

          </div>

        </section>


        {/* ================= DASHBOARD CONTENT ================= */}

        <section className="dashboard-content">

          {/* ================= STATISTICS ================= */}

          <div className="stats-grid">

            <article className="stat-card">

              <div className="stat-icon">
                📦
              </div>

              <div>
                <p>Total Listings</p>

                <h2>12</h2>
              </div>

            </article>


            <article className="stat-card">

              <div className="stat-icon">
                🟢
              </div>

              <div>
                <p>Active Listings</p>

                <h2>8</h2>
              </div>

            </article>


            <article className="stat-card">

              <div className="stat-icon">
                ✓
              </div>

              <div>
                <p>Sold Items</p>

                <h2>4</h2>
              </div>

            </article>

          </div>


          {/* ================= RECENT PRODUCTS ================= */}

          <section className="dashboard-section">

            <div className="dashboard-section-header">

              <div>

                <p className="section-tag">
                  YOUR ACTIVITY
                </p>

                <h2>
                  Recent Listings
                </h2>

              </div>

              <Link
                to="/my-products"
                className="view-all-link"
              >
                View All →
              </Link>

            </div>


            <div className="dashboard-products-grid">

              {recentProducts.map((product) => (

                <article
                  className="dashboard-product-card"
                  key={product.id}
                >

                  <div className="dashboard-product-image">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <span
                      className={
                        product.status === "Sold"
                          ? "product-status sold"
                          : "product-status active"
                      }
                    >
                      {product.status}
                    </span>

                  </div>


                  <div className="dashboard-product-info">

                    <p className="product-category">
                      {product.category}
                    </p>

                    <h3>
                      {product.name}
                    </h3>

                    <h4>
                      ₦{product.price.toLocaleString()}
                    </h4>

                    <Link
                      to={`/View-products/${product.id}`}
                    >
                      View Product →
                    </Link>

                  </div>

                </article>

              ))}

            </div>

          </section>


          {/* ================= QUICK ACTIONS ================= */}

          <section className="dashboard-section">

            <div className="dashboard-section-header">

              <div>

                <p className="section-tag">
                  QUICK ACCESS
                </p>

                <h2>
                  Quick Actions
                </h2>

              </div>

            </div>


            <div className="quick-actions-grid">

              <Link
                to="/sell"
                className="quick-action-card"
              >

                <div className="quick-action-icon">
                  +
                </div>

                <h3>
                  Sell an Item
                </h3>

                <p>
                  Post a new product or service for other students.
                </p>

              </Link>


              <Link
                to="/my-products"
                className="quick-action-card"
              >

                <div className="quick-action-icon">
                  📦
                </div>

                <h3>
                  My Products
                </h3>

                <p>
                  Manage, edit or update your product listings.
                </p>

              </Link>


              <Link
                to="/profile"
                className="quick-action-card"
              >

                <div className="quick-action-icon">
                  👤
                </div>

                <h3>
                  My Profile
                </h3>

                <p>
                  View and manage your account information.
                </p>

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