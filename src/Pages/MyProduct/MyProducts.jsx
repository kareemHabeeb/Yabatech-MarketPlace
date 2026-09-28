import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../Components/Footer";
import "./MyProducts.css";
import DashboardHeader from "../../Components/DashboardHeader";
import { apiClient } from "../../config/AxiosInstance";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState(null); // disables buttons on the product being updated/deleted

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("product/all-products");
      const list = res.data?.requiredProducts ?? [];

      setProducts(
        list.map((p) => ({
          id: p.id,
          name: p.productName,
          category: p.category,
          condition: p.condition,
          price: p.price,
          description: p.description,
          image: p.image,
          phoneNumber: p.phoneNumber,
          status: p.status,
        })),
      );
    } catch (err) {
      console.error("Fetch products error:", err);
      toast.error(
        err.response?.data?.message || "Could not load your products.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    setActioningId(id);
    try {
      const res = await apiClient.delete(`product/delete-product/${id}`);

      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast.success(res.data?.message || "Product deleted successfully.");
    } catch (err) {
      console.error("Delete product error:", err);
      toast.error(
        err.response?.data?.message || "Could not delete this product.",
      );
    } finally {
      setActioningId(null);
    }
  };

  const handleMarkAsSold = async (id) => {
    setActioningId(id);
    try {
      const res = await apiClient.patch(`product/product-status/${id}`, {
        status: "sold",
      });

      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, status: "sold" } : product,
        ),
      );
      toast.success(res.data?.message || "Product marked as sold.");
    } catch (err) {
      console.error("Update status error:", err);
      toast.error(
        err.response?.data?.message ||
          "Could not update this product's status.",
      );
    } finally {
      setActioningId(null);
    }
  };

  const isActive = (status) => status?.toLowerCase() === "available";
  const isSold = (status) => status?.toLowerCase() === "sold";

  const activeCount = products.filter((p) => isActive(p.status)).length;
  const soldCount = products.filter((p) => isSold(p.status)).length;

  return (
    <>
      <DashboardHeader />

      <main className="my-products-page">
        {/* HERO SECTION */}

        <section className="my-products-hero">
          <div className="my-products-hero-content">
            <div>
              <p className="my-products-tag">SELLER MANAGEMENT</p>

              <h1>My Products</h1>

              <p>
                Manage all the products and services you have listed on the
                Campus Digital Marketplace.
              </p>
            </div>

            <Link to="/sell" className="add-product-btn">
              + Add New Product
            </Link>
          </div>
        </section>

        {/* MAIN CONTENT */}

        <section className="my-products-content">
          {/* SUMMARY */}

          <div className="product-summary">
            <div className="summary-card">
              <p>Total Products</p>

              <h2>{loading ? "--" : products.length}</h2>
            </div>

            <div className="summary-card">
              <p>Active Products</p>

              <h2>{loading ? "--" : activeCount}</h2>
            </div>

            <div className="summary-card">
              <p>Sold Products</p>

              <h2>{loading ? "--" : soldCount}</h2>
            </div>
          </div>

          {/* SECTION HEADER */}

          <div className="my-products-heading">
            <div>
              <p className="section-tag">YOUR LISTINGS</p>

              <h2>Manage Your Products</h2>
            </div>

            <p className="product-count">
              {loading ? "Loading..." : `${products.length} product(s)`}
            </p>
          </div>

          {/* PRODUCTS */}

          {loading ? (
            <p>Loading your products...</p>
          ) : products.length > 0 ? (
            <div className="my-products-grid">
              {products.map((product) => (
                <article className="my-product-card" key={product.id}>
                  <div className="my-product-image">
                    <img src={product.image} alt={product.name} />

                    <span
                      className={
                        isActive(product.status)
                          ? "status active"
                          : "status sold"
                      }
                    >
                      {isActive(product.status) ? "Active" : "Sold"}
                    </span>
                  </div>

                  <div className="my-product-info">
                    <p className="my-product-category">{product.category}</p>

                    <h3>{product.name}</h3>

                    <h4>₦{Number(product.price ?? 0).toLocaleString()}</h4>

                    {/* ACTIONS */}

                    <div className="product-actions">
                      <Link
                        to={`/View-products/${product.id}`}
                        className="view-btn"
                      >
                        View
                      </Link>

                      <Link
                        to={`/edit-product/${product.id}`}
                        className="edit-btn"
                      >
                        Edit
                      </Link>

                      {isActive(product.status) && (
                        <button
                          className="sold-btn"
                          onClick={() => handleMarkAsSold(product.id)}
                          disabled={actioningId === product.id}
                        >
                          {actioningId === product.id
                            ? "Updating..."
                            : "Mark Sold"}
                        </button>
                      )}

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(product.id)}
                        disabled={actioningId === product.id}
                      >
                        {actioningId === product.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* EMPTY STATE */

            <div className="empty-products">
              <div className="empty-icon">📦</div>

              <h2>No Products Yet</h2>

              <p>
                You haven't posted any products yet. Start selling to other
                students on campus.
              </p>

              <Link to="/sell" className="empty-sell-btn">
                + Post Your First Product
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default MyProducts;
