import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Marketplace.css";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Fashion",
    "Electronics",
    "Books",
    "Food",
    "Furniture",
    "Beauty",
    "Services",
  ];

  const products = [
    {
      id: 1,
      name: "HP EliteBook Laptop",
      price: 250000,
      category: "Electronics",
      condition: "Used",
      seller: "John D.",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    },
    {
      id: 2,
      name: "Wireless Bluetooth Headphones",
      price: 12000,
      category: "Electronics",
      condition: "New",
      seller: "Esther A.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 3,
      name: "Engineering Mathematics Textbook",
      price: 5000,
      category: "Books",
      condition: "Used",
      seller: "Michael O.",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    },
    {
      id: 4,
      name: "Vintage Denim Jacket",
      price: 8500,
      category: "Fashion",
      condition: "Used",
      seller: "David K.",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    },
    {
      id: 5,
      name: "Student Study Table",
      price: 15000,
      category: "Furniture",
      condition: "Used",
      seller: "Mary J.",
      image:
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85",
    },
    {
      id: 6,
      name: "Nike Sneakers",
      price: 18000,
      category: "Fashion",
      condition: "New",
      seller: "Daniel P.",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
      id: 7,
      name: "Homemade Jollof Rice",
      price: 2500,
      category: "Food",
      condition: "New",
      seller: "Campus Kitchen",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    },
    {
      id: 8,
      name: "Graphic Design Services",
      price: 5000,
      category: "Services",
      condition: "New",
      seller: "Creative Studio",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    },
    {
      id: 9,
      name: "Skincare Set",
      price: 9500,
      category: "Beauty",
      condition: "New",
      seller: "Beauty Hub",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
    <Header />
      <main className="marketplace-page">

        {/* HERO */}

        <section className="marketplace-hero">
          <div className="marketplace-hero-content">
            <p className="marketplace-tag">
              YABATECH DIGITAL MARKETPLACE
            </p>

            <h1>Explore Products Around Campus</h1>

            <p>
              Discover products and services offered by students within the
              YABATECH community.
            </p>

            {/* SEARCH */}

            <div className="marketplace-search">
              <input
                type="text"
                placeholder="Search for products or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button>
                Search
              </button>
            </div>
          </div>
        </section>

        {/* MARKETPLACE CONTENT */}

        <section className="marketplace-content">

          {/* CATEGORY FILTER */}

          <div className="marketplace-filter-section">

            <div className="marketplace-filter-heading">
              <h2>Browse Products</h2>

              <p>
                {filteredProducts.length} products available
              </p>
            </div>

            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    selectedCategory === category
                      ? "category-filter active-filter"
                      : "category-filter"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

          </div>

          {/* PRODUCT GRID */}

          <div className="marketplace-layout">

            {/* SIDE FILTERS */}

            <aside className="filter-sidebar">

              <h3>Filters</h3>

              <div className="filter-group">
                <label>Condition</label>

                <select>
                  <option>All Conditions</option>
                  <option>New</option>
                  <option>Used</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Price Range</label>

                <select>
                  <option>Any Price</option>
                  <option>₦0 - ₦5,000</option>
                  <option>₦5,000 - ₦20,000</option>
                  <option>₦20,000 - ₦100,000</option>
                  <option>Above ₦100,000</option>
                </select>
              </div>

              <button className="clear-filter-btn">
                Clear Filters
              </button>

            </aside>

            {/* PRODUCTS */}

            <div className="marketplace-products">

              {filteredProducts.length > 0 ? (
                <div className="marketplace-product-grid">

                  {filteredProducts.map((product) => (
                    <article
                      className="marketplace-product-card"
                      key={product.id}
                    >
                      <div className="marketplace-product-image">

                        <img
                          src={product.image}
                          alt={product.name}
                        />

                        <span>
                          {product.condition}
                        </span>

                      </div>

                      <div className="marketplace-product-info">

                        <p className="marketplace-product-category">
                          {product.category}
                        </p>

                        <h3>{product.name}</h3>

                        <p className="marketplace-price">
                          ₦{product.price.toLocaleString()}
                        </p>

                        <p className="marketplace-seller">
                          Seller: {product.seller}
                        </p>

                        <Link
                          to={`/product/${product.id}`}
                          className="marketplace-view-btn"
                        >
                          View Product
                        </Link>

                      </div>
                    </article>
                  ))}

                </div>
              ) : (
                <div className="no-products">
                  <h3>No products found</h3>

                  <p>
                    Try searching for something else or select another
                    category.
                  </p>
                </div>
              )}

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Marketplace;