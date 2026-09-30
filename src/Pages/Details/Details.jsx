import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import "./Details.css";
import DashboardHeader from "../../Components/DashboardHeader";
import { apiClient } from "../../config/AxiosInstance";

const ManageProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [actioning, setActioning] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const res = await apiClient.get(`product/product/${id}`);
      const raw = res.data?.data ?? res.data?.product ?? res.data;

      if (!raw || (!raw.productName && !raw._id && !raw.id)) {
        setNotFound(true);
        return;
      }

      setProduct({
        id: raw.id ?? raw._id,
        name: raw.productName,
        category: raw.category,
        price: raw.price,
        condition: raw.condition,
        status: raw.status,
        description: raw.description,
        image: raw.image,
        phoneNumber: raw.phoneNumber,
        datePosted: raw.createdAt
          ? new Date(raw.createdAt).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "",
      });
    } catch (err) {
      console.error("Fetch product error:", err);
      if (err.response?.status === 404) {
        setNotFound(true);
      } else {
        toast.error(
          err.response?.data?.message || "Could not load this product.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const isActive = (status) => status?.toLowerCase() === "available";

  const handleMarkSold = async () => {
    const confirmSold = window.confirm(
      "Are you sure you want to mark this product as sold?",
    );

    if (!confirmSold) return;

    setActioning(true);
    try {
      const res = await apiClient.put(`product/product-status/${id}`, {
        status: "sold",
      });

      setProduct((prev) => ({ ...prev, status: "sold" }));
      toast.success(res.data?.message || "Product marked as sold.");
    } catch (err) {
      console.error("Update status error:", err);
      toast.error(
        err.response?.data?.message ||
          "Could not update this product's status.",
      );
    } finally {
      setActioning(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    setActioning(true);
    try {
      const res = await apiClient.delete(`product/delete-product/${id}`);

      toast.success(res.data?.message || "Product deleted successfully.");
      navigate("/my-products");
    } catch (err) {
      console.error("Delete product error:", err);
      toast.error(
        err.response?.data?.message || "Could not delete this product.",
      );
      setActioning(false);
    }
  };

  // LOADING STATE

  if (loading) {
    return (
      <>
        <DashboardHeader />

        <main className="manage-not-found">
          <div>
            <h1>Loading product...</h1>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // PRODUCT NOT FOUND

  if (notFound || !product) {
    return (
      <>
        <Header />

        <main className="manage-not-found">
          <div>
            <h1>Product Not Found</h1>

            <p>This product does not exist or may have been removed.</p>

            <Link to="/my-products">← Back to My Products</Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <DashboardHeader />

      <main className="manage-product-page">
        {/* BACK LINK */}

        <section className="manage-breadcrumb">
          <Link to="/dashboard">Dashboard</Link>

          <span>/</span>

          <Link to="/my-products">My Products</Link>

          <span>/</span>

          <p>Manage Product</p>
        </section>

        {/* MAIN PRODUCT SECTION */}

        <section className="manage-product-container">
          {/* PRODUCT IMAGE */}

          <div className="manage-product-gallery">
            <div className="manage-main-image">
              <img src={product.image} alt={product.name} />

              <span
                className={
                  isActive(product.status)
                    ? "manage-status active"
                    : "manage-status sold"
                }
              >
                {isActive(product.status) ? "Active" : "Sold"}
              </span>
            </div>
          </div>

          {/* PRODUCT INFORMATION */}

          <div className="manage-product-info">
            <p className="manage-category">{product.category}</p>

            <h1>{product.name}</h1>

            <h2>₦{Number(product.price ?? 0).toLocaleString()}</h2>

            {/* PRODUCT INFORMATION */}

            <div className="manage-info-box">
              <div className="manage-info-row">
                <span>Condition</span>

                <strong>{product.condition}</strong>
              </div>

              <div className="manage-info-row">
                <span>Status</span>

                <strong
                  className={
                    isActive(product.status) ? "active-text" : "sold-text"
                  }
                >
                  {isActive(product.status) ? "Active" : "Sold"}
                </strong>
              </div>

              {product.datePosted && (
                <div className="manage-info-row">
                  <span>Date Posted</span>

                  <strong>{product.datePosted}</strong>
                </div>
              )}
            </div>

            {/* DESCRIPTION */}

            <div className="manage-description">
              <h3>Product Description</h3>

              <p>{product.description}</p>
            </div>

            {/* MANAGEMENT ACTIONS */}

            <div className="manage-actions">
              <Link
                to={`/edit-product/${product.id}`}
                className="manage-edit-btn"
              >
                Edit Product
              </Link>

              {isActive(product.status) && (
                <button
                  className="manage-sold-btn"
                  onClick={handleMarkSold}
                  disabled={actioning}
                >
                  {actioning ? "Updating..." : "Mark as Sold"}
                </button>
              )}

              <button
                className="manage-delete-btn"
                onClick={handleDelete}
                disabled={actioning}
              >
                {actioning ? "Deleting..." : "Delete Product"}
              </button>
            </div>

            <p className="manage-note">
              You can update, mark as sold, or remove this product from your
              listings.
            </p>
          </div>
        </section>

        {/* BACK BUTTON */}

        <section className="manage-back-section">
          <Link to="/my-products" className="manage-back-btn">
            ← Back to My Products
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ManageProduct;
