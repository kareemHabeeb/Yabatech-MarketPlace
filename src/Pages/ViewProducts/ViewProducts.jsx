import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { apiClient } from "../../config/AxiosInstance";
import "./ViewProducts.css";

const ViewProducts = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiClient.get(`/product/market-place/${id}`);

        console.log("Product response:", response.data);

        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);

        setError(
          error?.response?.data?.message || "Unable to load this product.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <>
        <Header />

        <main className="product-not-found">
          <div>
            <h1>Loading Product...</h1>

            <p>Please wait while we fetch the product details.</p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // Error / product not found
  if (error || !product) {
    return (
      <>
        <Header />

        <main className="product-not-found">
          <div>
            <h1>Product Not Found</h1>

            <p>
              {error ||
                "The product you are looking for does not exist or may have been removed."}
            </p>

            <Link to="/marketplace">Back to Marketplace</Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const handleContactSeller = () => {
    if (!product?.phoneNumber) {
      alert("Seller phone number is not available.");
      return;
    }

    const phoneNumber = product.phoneNumber
      .replace(/\s/g, "")
      .replace("+", "");

    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <>
      <Header />

      <main className="product-details-page">
        {/* BREADCRUMB */}

        <section className="product-breadcrumb">
          <Link to="/">Home</Link>

          <span>/</span>

          <Link to="/marketplace">Marketplace</Link>

          <span>/</span>

          <p>{product.productName}</p>
        </section>

        {/* PRODUCT DETAILS */}

        <section className="product-details-container">
          {/* PRODUCT IMAGE */}

          <div className="product-gallery">
            <div className="main-product-image">
              <img src={product.image} alt={product.productName} />
            </div>
          </div>

          {/* PRODUCT INFORMATION */}

          <div className="product-details-info">
            <p className="details-category">{product.category}</p>

            <h1>{product.productName}</h1>

            <h2>₦{product.price?.toLocaleString()}</h2>

            {/* CONDITION */}

            <div className="product-condition">
              <span>Condition</span>

              <strong>{product.condition}</strong>
            </div>

            {/* STATUS */}

            <div className="product-condition">
              <span>Status</span>

              <strong>{product.status}</strong>
            </div>

            {/* DESCRIPTION */}

            <div className="product-description">
              <h3>Product Description</h3>

              <p>{product.description}</p>
            </div>

            {/* SELLER INFORMATION */}

            <div className="seller-card">
              <div className="seller-avatar">
                {product.user?.firstName?.charAt(0).toUpperCase()}
              </div>

              <div className="seller-info">
                <p className="seller-label">SOLD BY</p>

                <h3>
                  {product.user?.firstName} {product.user?.lastName}
                </h3>

                <p>{product.user?.department}</p>
              </div>
            </div>

            {/* CONTACT BUTTON */}

            <button
              className="contact-seller-btn"
              onClick={handleContactSeller}
            >
              Contact Seller
            </button>

            <p className="contact-note">
              Contact the seller directly to ask questions or arrange a meeting.
            </p>
          </div>
        </section>

        {/* BACK BUTTON */}

        <section className="back-marketplace-section">
          <Link to="/marketplace" className="back-marketplace-btn">
            ← Back to Marketplace
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ViewProducts;
