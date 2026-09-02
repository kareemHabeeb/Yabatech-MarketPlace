import React from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import "./ViewProducts.css";
import Header from "../../Components/Header";

const ViewProducts = () => {
  const { id } = useParams();

  // Temporary mock data
  // Later this will come from your API using the product ID

  const products = [
    {
      id: 1,
      name: "HP EliteBook Laptop",
      category: "Electronics",
      price: 250000,
      condition: "Used - Like New",
      description:
        "A clean HP EliteBook laptop in excellent condition. It is suitable for programming, school work, assignments, and general use. The laptop is working perfectly and has been properly maintained.",
      seller: "John Doe",
      department: "Computer Science",
      contact: "08012345678",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    },

    {
      id: 2,
      name: "Engineering Mathematics Textbook",
      category: "Books & Academic Materials",
      price: 5000,
      condition: "Used - Good Condition",
      description:
        "A well-maintained Engineering Mathematics textbook suitable for students. The book is clean and all pages are complete.",
      seller: "Mary James",
      department: "Mechanical Engineering",
      contact: "08098765432",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80",
    },

    {
      id: 3,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 12000,
      condition: "Used - Like New",
      description:
        "Wireless Bluetooth headphones with good sound quality and long battery life. Everything is working properly.",
      seller: "David Smith",
      department: "Electrical Engineering",
      contact: "08045678901",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    },

    {
      id: 4,
      name: "Vintage Denim Jacket",
      category: "Fashion",
      price: 15000,
      condition: "Used - Good Condition",
      description:
        "A stylish vintage denim jacket in good condition. Perfect for casual wear and suitable for students.",
      seller: "Sarah Williams",
      department: "Business Administration",
      contact: "08076543210",
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    },
  ];

  // Convert route ID to number
  const product = products.find(
    (item) => item.id === Number(id)
  );

  // If product is not found
  if (!product) {
    return (
      <>
        <Header />

        <main className="product-not-found">

          <div>

            <h1>Product Not Found</h1>

            <p>
              The product you are looking for does not exist or may have been
              removed.
            </p>

            <Link to="/marketplace">
              Back to Marketplace
            </Link>

          </div>

        </main>

        <Footer />
      </>
    );
  }

  const handleContactSeller = () => {
    // Temporary behaviour
    // Later you can connect this to a chat system

    window.location.href = `https://wa.me/234${product.contact.substring(1)}`;
  };

  return (
    <>
      <Header />

      <main className="product-details-page">

        {/* BREADCRUMB */}

        <section className="product-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <Link to="/marketplace">
            Marketplace
          </Link>

          <span>/</span>

          <p>
            {product.name}
          </p>

        </section>


        {/* PRODUCT DETAILS */}

        <section className="product-details-container">

          {/* PRODUCT IMAGE */}

          <div className="product-gallery">

            <div className="main-product-image">

              <img
                src={product.image}
                alt={product.name}
              />

            </div>

          </div>


          {/* PRODUCT INFORMATION */}

          <div className="product-details-info">

            <p className="details-category">
              {product.category}
            </p>

            <h1>
              {product.name}
            </h1>

            <h2>
              ₦{product.price.toLocaleString()}
            </h2>


            <div className="product-condition">

              <span>
                Condition
              </span>

              <strong>
                {product.condition}
              </strong>

            </div>


            <div className="product-description">

              <h3>
                Product Description
              </h3>

              <p>
                {product.description}
              </p>

            </div>


            {/* SELLER INFORMATION */}

            <div className="seller-card">

              <div className="seller-avatar">
                {product.seller.charAt(0)}
              </div>

              <div className="seller-info">

                <p className="seller-label">
                  SOLD BY
                </p>

                <h3>
                  {product.seller}
                </h3>

                <p>
                  {product.department}
                </p>

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
              Contact the seller directly to ask questions or arrange a
              meeting.
            </p>

          </div>

        </section>


        {/* BACK BUTTON */}

        <section className="back-marketplace-section">

          <Link
            to="/marketplace"
            className="back-marketplace-btn"
          >
            ← Back to Marketplace
          </Link>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default ViewProducts;