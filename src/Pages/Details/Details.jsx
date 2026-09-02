import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import "./Details.css";
import DashboardHeader from "../../Components/DashboardHeader";

const ManageProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary mock data
  // Later, this will come from your API

  const products = [
    {
      id: 1,
      name: "HP EliteBook Laptop",
      category: "Electronics",
      price: 250000,
      condition: "Used - Like New",
      status: "Active",
      description:
        "A clean HP EliteBook laptop in excellent condition. It is suitable for programming, school work, assignments, and general use. The laptop is working perfectly and has been properly maintained.",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
      datePosted: "August 20, 2026",
    },

    {
      id: 2,
      name: "Engineering Mathematics Textbook",
      category: "Books & Academic Materials",
      price: 5000,
      condition: "Used - Good Condition",
      status: "Active",
      description:
        "A well-maintained Engineering Mathematics textbook suitable for students. The book is clean and all pages are complete.",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80",
      datePosted: "August 18, 2026",
    },

    {
      id: 3,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 12000,
      condition: "Used - Like New",
      status: "Sold",
      description:
        "Wireless Bluetooth headphones with good sound quality and long battery life. Everything is working properly.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
      datePosted: "August 15, 2026",
    },

    {
      id: 4,
      name: "Vintage Denim Jacket",
      category: "Fashion",
      price: 15000,
      condition: "Used - Good Condition",
      status: "Active",
      description:
        "A stylish vintage denim jacket in good condition. Perfect for casual wear and suitable for students.",
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
      datePosted: "August 10, 2026",
    },
  ];

  const foundProduct = products.find(
    (product) => product.id === Number(id)
  );

  const [product, setProduct] = useState(foundProduct);

  // PRODUCT NOT FOUND

  if (!product) {
    return (
      <>
        <Header />

        <main className="manage-not-found">
          <div>
            <h1>Product Not Found</h1>

            <p>
              This product does not exist or may have been removed.
            </p>

            <Link to="/my-products">
              ← Back to My Products
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // MARK PRODUCT AS SOLD

  const handleMarkSold = () => {
    const confirmSold = window.confirm(
      "Are you sure you want to mark this product as sold?"
    );

    if (confirmSold) {
      setProduct({
        ...product,
        status: "Sold",
      });
    }
  };

  // DELETE PRODUCT

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      // Later:
      // DELETE /api/products/:id

      alert("Product deleted successfully.");

      navigate("/my-products");
    }
  };

  return (
    <>
      <DashboardHeader />

      <main className="manage-product-page">

        {/* BACK LINK */}

        <section className="manage-breadcrumb">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <span>/</span>

          <Link to="/my-products">
            My Products
          </Link>

          <span>/</span>

          <p>
            Manage Product
          </p>

        </section>


        {/* MAIN PRODUCT SECTION */}

        <section className="manage-product-container">


          {/* PRODUCT IMAGE */}

          <div className="manage-product-gallery">

            <div className="manage-main-image">

              <img
                src={product.image}
                alt={product.name}
              />

              <span
                className={
                  product.status === "Active"
                    ? "manage-status active"
                    : "manage-status sold"
                }
              >
                {product.status}
              </span>

            </div>

          </div>


          {/* PRODUCT INFORMATION */}

          <div className="manage-product-info">

            <p className="manage-category">
              {product.category}
            </p>

            <h1>
              {product.name}
            </h1>

            <h2>
              ₦{product.price.toLocaleString()}
            </h2>


            {/* PRODUCT INFORMATION */}

            <div className="manage-info-box">

              <div className="manage-info-row">

                <span>
                  Condition
                </span>

                <strong>
                  {product.condition}
                </strong>

              </div>


              <div className="manage-info-row">

                <span>
                  Status
                </span>

                <strong
                  className={
                    product.status === "Active"
                      ? "active-text"
                      : "sold-text"
                  }
                >
                  {product.status}
                </strong>

              </div>


              <div className="manage-info-row">

                <span>
                  Date Posted
                </span>

                <strong>
                  {product.datePosted}
                </strong>

              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="manage-description">

              <h3>
                Product Description
              </h3>

              <p>
                {product.description}
              </p>

            </div>


            {/* MANAGEMENT ACTIONS */}

            <div className="manage-actions">

              <Link
                to={`/edit-product/${product.id}`}
                className="manage-edit-btn"
              >
                Edit Product
              </Link>


              {product.status === "Active" && (

                <button
                  className="manage-sold-btn"
                  onClick={handleMarkSold}
                >
                  Mark as Sold
                </button>

              )}


              <button
                className="manage-delete-btn"
                onClick={handleDelete}
              >
                Delete Product
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

          <Link
            to="/my-products"
            className="manage-back-btn"
          >
            ← Back to My Products
          </Link>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default ManageProduct;