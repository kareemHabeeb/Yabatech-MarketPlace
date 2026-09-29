import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Marketplace.css";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { apiClient } from "../../config/AxiosInstance";

const PRICE_RANGES = {
  "Any Price": null,
  "₦0 - ₦5,000": [0, 5000],
  "₦5,000 - ₦20,000": [5000, 20000],
  "₦20,000 - ₦100,000": [20000, 100000],
  "Above ₦100,000": [100000, Infinity],
};

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All Conditions");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Any Price");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("product/market-place");
      const list = res.data?.requiredProducts ?? [];

      setProducts(
        list.map((p) => ({
          id: p.id,
          name: p.productName,
          price: p.price,
          category: p.category,
          condition: p.condition,
          description: p.description,
          image: p.image,
          phoneNumber: p.phoneNumber,
          status: p.status,
          seller: p.user?.fullName ?? "Unknown seller",
          sellerDepartment: p.user?.department ?? "",
        })),
      );
    } catch (err) {
      console.error("Fetch marketplace products error:", err);
      toast.error(
        err.response?.data?.message || "Could not load marketplace products.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Build the category filter list from whatever categories actually exist
  // in the fetched data, instead of a hardcoded list that may not match
  // real category names from the backend (e.g. "Phones").
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean)),
    );
    return ["All", ...unique];
  }, [products]);

  const conditions = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.condition).filter(Boolean)),
    );
    return ["All Conditions", ...unique];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesCondition =
      selectedCondition === "All Conditions" ||
      product.condition === selectedCondition;

    const range = PRICE_RANGES[selectedPriceRange];
    const matchesPrice =
      !range || (product.price >= range[0] && product.price < range[1]);

    return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
  });

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedCondition("All Conditions");
    setSelectedPriceRange("Any Price");
  };

  return (
    <>
      <Header />
      <main className="marketplace-page">
        {/* HERO */}

        <section className="marketplace-hero">
          <div className="marketplace-hero-content">
            <p className="marketplace-tag">YABATECH DIGITAL MARKETPLACE</p>

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

              <button type="button" onClick={() => {}}>
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
                {loading
                  ? "Loading products..."
                  : `${filteredProducts.length} products available`}
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

                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                >
                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Price Range</label>

                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                >
                  {Object.keys(PRICE_RANGES).map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <button className="clear-filter-btn" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </aside>

            {/* PRODUCTS */}

            <div className="marketplace-products">
              {loading ? (
                <div className="no-products">
                  <h3>Loading products...</h3>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="marketplace-product-grid">
                  {filteredProducts.map((product) => (
                    <article
                      className="marketplace-product-card"
                      key={product.id}
                    >
                      <div className="marketplace-product-image">
                        <img src={product.image} alt={product.name} />

                        <span>{product.condition}</span>
                      </div>

                      <div className="marketplace-product-info">
                        <p className="marketplace-product-category">
                          {product.category}
                        </p>

                        <h3>{product.name}</h3>

                        <p className="marketplace-price">
                          ₦{Number(product.price ?? 0).toLocaleString()}
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
                    Try searching for something else or select another category.
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
