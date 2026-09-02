import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer"
import "./MyProducts.css";
import DashboardHeader from "../../Components/DashboardHeader";

const MyProducts = () => {
  // Temporary mock data
  // Later this will come from your backend API

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "HP EliteBook Laptop",
      category: "Electronics",
      price: 250000,
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Engineering Mathematics Textbook",
      category: "Books & Academic Materials",
      price: 5000,
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 12000,
      status: "Sold",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Vintage Denim Jacket",
      category: "Fashion",
      price: 15000,
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
    },
  ]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleMarkAsSold = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, status: "Sold" }
          : product
      )
    );
  };

  return (
    <>
      <DashboardHeader />

      <main className="my-products-page">

        {/* HERO SECTION */}

        <section className="my-products-hero">

          <div className="my-products-hero-content">

            <div>

              <p className="my-products-tag">
                SELLER MANAGEMENT
              </p>

              <h1>
                My Products
              </h1>

              <p>
                Manage all the products and services you have listed on the
                Campus Digital Marketplace.
              </p>

            </div>

            <Link
              to="/sell"
              className="add-product-btn"
            >
              + Add New Product
            </Link>

          </div>

        </section>


        {/* MAIN CONTENT */}

        <section className="my-products-content">


          {/* SUMMARY */}

          <div className="product-summary">

            <div className="summary-card">

              <p>
                Total Products
              </p>

              <h2>
                {products.length}
              </h2>

            </div>


            <div className="summary-card">

              <p>
                Active Products
              </p>

              <h2>
                {
                  products.filter(
                    (product) => product.status === "Active"
                  ).length
                }
              </h2>

            </div>


            <div className="summary-card">

              <p>
                Sold Products
              </p>

              <h2>
                {
                  products.filter(
                    (product) => product.status === "Sold"
                  ).length
                }
              </h2>

            </div>

          </div>


          {/* SECTION HEADER */}

          <div className="my-products-heading">

            <div>

              <p className="section-tag">
                YOUR LISTINGS
              </p>

              <h2>
                Manage Your Products
              </h2>

            </div>

            <p className="product-count">
              {products.length} product(s)
            </p>

          </div>


          {/* PRODUCTS */}

          {products.length > 0 ? (

            <div className="my-products-grid">

              {products.map((product) => (

                <article
                  className="my-product-card"
                  key={product.id}
                >

                  <div className="my-product-image">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <span
                      className={
                        product.status === "Active"
                          ? "status active"
                          : "status sold"
                      }
                    >
                      {product.status}
                    </span>

                  </div>


                  <div className="my-product-info">

                    <p className="my-product-category">
                      {product.category}
                    </p>

                    <h3>
                      {product.name}
                    </h3>

                    <h4>
                      ₦{product.price.toLocaleString()}
                    </h4>


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


                      {product.status === "Active" && (

                        <button
                          className="sold-btn"
                          onClick={() =>
                            handleMarkAsSold(product.id)
                          }
                        >
                          Mark Sold
                        </button>

                      )}


                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(product.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            /* EMPTY STATE */

            <div className="empty-products">

              <div className="empty-icon">
                📦
              </div>

              <h2>
                No Products Yet
              </h2>

              <p>
                You haven't posted any products yet. Start selling to other
                students on campus.
              </p>

              <Link
                to="/sell"
                className="empty-sell-btn"
              >
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