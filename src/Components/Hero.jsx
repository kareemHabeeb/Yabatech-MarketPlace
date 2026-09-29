import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import { apiClient } from "../config/AxiosInstance";

const Hero = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState("");

  const categories = [
    {
      icon: "👕",
      name: "Fashion",
      description: "Clothes, shoes and accessories",
    },
    {
      icon: "📚",
      name: "Books",
      description: "Textbooks and academic materials",
    },
    {
      icon: "💻",
      name: "Electronics",
      description: "Phones, laptops and gadgets",
    },
    {
      icon: "🍔",
      name: "Food",
      description: "Meals, snacks and drinks",
    },
    {
      icon: "🛋️",
      name: "Furniture",
      description: "Room and hostel essentials",
    },
    {
      icon: "🛠️",
      name: "Services",
      description: "Skills and student services",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        setProductError("");

        const response = await apiClient.get("/product/market-place");

        console.log("Marketplace response:", response.data);

        const allProducts = response.data.requiredProducts || [];

        // Only show the first 4 products on the Home page
        setProducts(allProducts.slice(0, 4));
      } catch (error) {
        console.error("Error fetching marketplace products:", error);

        setProductError(
          error?.response?.data?.message || "Unable to load featured products.",
        );
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <main className="home">
        {/* ================= HERO ================= */}

        <section className="hero-section">
          <div className="hero-content">
            <p className="hero-tag">YABATECH STUDENT MARKETPLACE</p>

            <h1>
              Buy. Sell. Connect.
              <span> All Within Campus.</span>
            </h1>

            <p className="hero-description">
              Campus Digital Marketplace makes it easier for YABATECH students
              to buy and sell products and services within the campus community.
            </p>

            <div className="hero-buttons">
              <Link to="/marketplace" className="primary-btn">
                Explore Marketplace
              </Link>

              <Link to="/register" className="secondary-btn">
                Start Selling
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card card-one">
              📚
              <span>Books</span>
            </div>

            <div className="hero-card card-two">
              👕
              <span>Fashion</span>
            </div>

            <div className="hero-card card-three">
              💻
              <span>Electronics</span>
            </div>

            <div className="hero-circle">
              <span>BUY</span>
              <span>SELL</span>
              <span>CONNECT</span>
            </div>
          </div>
        </section>

        {/* ================= SEARCH ================= */}

        <section className="search-section">
          <div className="search-container">
            <h2>What are you looking for?</h2>

            <div className="search-box">
              <input
                type="text"
                placeholder="Search for products or services..."
              />

              <button>Search</button>
            </div>
          </div>
        </section>

        {/* ================= CATEGORIES ================= */}

        <section className="categories-section">
          <div className="section-header">
            <div>
              <p className="section-tag">EXPLORE</p>

              <h2>Popular Categories</h2>
            </div>

            <Link to="/categories">View All Categories →</Link>
          </div>

          <div className="category-grid">
            {categories.map((category, index) => (
              <div className="category-card" key={index}>
                <div className="category-icon">{category.icon}</div>

                <h3>{category.name}</h3>

                <p>{category.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FEATURED PRODUCTS ================= */}

        <section className="products-section">
          <div className="section-header">
            <div>
              <p className="section-tag">MARKETPLACE</p>

              <h2>Featured Products</h2>
            </div>

            <Link to="/marketplace">View Marketplace →</Link>
          </div>

          {/* LOADING */}

          {loadingProducts && (
            <div className="products-message">
              <p>Loading products...</p>
            </div>
          )}

          {/* ERROR */}

          {!loadingProducts && productError && (
            <div className="products-message">
              <p>{productError}</p>
            </div>
          )}

          {/* NO PRODUCTS */}

          {!loadingProducts && !productError && products.length === 0 && (
            <div className="products-message">
              <p>No products available at the moment.</p>
            </div>
          )}

          {/* PRODUCTS */}

          {!loadingProducts && !productError && products.length > 0 && (
            <div className="product-grid">
              {products.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.productName} />

                    <span className="product-category">{product.category}</span>
                  </div>

                  <div className="product-info">
                    <h3>{product.productName}</h3>

                    <p className="product-price">
                      ₦{product.price?.toLocaleString()}
                    </p>

                    <Link
                      to={`/product/${product.id}`}
                      className="view-product"
                    >
                      View Product →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ================= HOW IT WORKS ================= */}

        <section className="how-section">
          <div className="how-intro">
            <p className="section-tag">SIMPLE PROCESS</p>

            <h2>How Campus Digital Marketplace Works</h2>

            <p>
              Buying and selling within the YABATECH community has never been
              easier.
            </p>
          </div>

          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">01</div>

              <h3>Create an Account</h3>

              <p>
                Register using your student information and become part of the
                campus marketplace community.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>

              <h3>Browse or Post</h3>

              <p>
                Browse available products or create a listing to sell your own
                products or services.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>

              <h3>Connect and Trade</h3>

              <p>
                Contact verified sellers and buyers and complete your
                transaction conveniently.
              </p>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}

        <section className="cta-section">
          <div className="cta-content">
            <p className="section-tag light-tag">JOIN THE COMMUNITY</p>

            <h2>Ready to Buy or Sell on Campus?</h2>

            <p>
              Join the Campus Digital Marketplace and connect with students
              across YABATECH.
            </p>

            <div className="cta-buttons">
              <Link to="/register" className="cta-primary">
                Create an Account
              </Link>

              <Link to="/marketplace" className="cta-secondary">
                Browse Marketplace
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Hero;
