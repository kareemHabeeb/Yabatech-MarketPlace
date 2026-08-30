import React from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import "./Details.css";

const ProductDetails = () => {
  const { id } = useParams();

  // MOCK DATA
  // Later this will come from your API
  const products = [
    {
      id: 1,
      name: "HP EliteBook Laptop",
      price: 250000,
      category: "Electronics",
      condition: "Used",
      seller: "John D.",
      department: "Computer Science",
      location: "YABATECH Main Campus",
      description:
        "A clean and well-maintained HP EliteBook laptop suitable for students, programming, assignments, research, and general use. The laptop is in good working condition.",
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
      department: "Business Administration",
      location: "YABATECH Main Campus",
      description:
        "High-quality wireless Bluetooth headphones with clear sound and comfortable ear cushions.",
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
      department: "Mechanical Engineering",
      location: "YABATECH Main Campus",
      description:
        "A useful engineering mathematics textbook in good condition. Suitable for students who need additional academic materials.",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    },
  ];

  const product = products.find(
    (item) => item.id === Number(id)
  );

  // PRODUCT NOT FOUND
  if (!product) {
    return (
      <>
        <main className="product-not-found">
          <h2>Product Not Found</h2>

          <p>
            The product you are looking for is not available.
          </p>

          <Link to="/marketplace">
            Back to Marketplace
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="product-details-page">

        {/* BREADCRUMB */}

        <section className="breadcrumb-section">

          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <Link to="/marketplace">
            Marketplace
          </Link>

          <span>/</span>

          <span>{product.category}</span>

        </section>


        {/* PRODUCT DETAILS */}

        <section className="product-details-container">

          {/* PRODUCT IMAGE */}

          <div className="product-details-image">

            <img
              src={product.image}
              alt={product.name}
            />

            <span className="product-condition">
              {product.condition}
            </span>

          </div>


          {/* PRODUCT INFORMATION */}

          <div className="product-details-info">

            <p className="details-category">
              {product.category}
            </p>

            <h1>
              {product.name}
            </h1>

            <h2 className="details-price">
              ₦{product.price.toLocaleString()}
            </h2>

            <div className="details-divider"></div>


            {/* PRODUCT INFORMATION */}

            <div className="details-meta">

              <div className="meta-item">
                <span className="meta-label">
                  Condition
                </span>

                <span className="meta-value">
                  {product.condition}
                </span>
              </div>

              <div className="meta-item">
                <span className="meta-label">
                  Category
                </span>

                <span className="meta-value">
                  {product.category}
                </span>
              </div>

              <div className="meta-item">
                <span className="meta-label">
                  Location
                </span>

                <span className="meta-value">
                  {product.location}
                </span>
              </div>

            </div>


            {/* CONTACT BUTTON */}

            <div className="product-action">

              <button className="contact-seller-btn">
                Contact Seller
              </button>

              <button className="save-product-btn">
                ♡ Save Product
              </button>

            </div>

          </div>

        </section>


        {/* DESCRIPTION AND SELLER */}

        <section className="product-extra-info">

          {/* DESCRIPTION */}

          <div className="product-description">

            <h2>Product Description</h2>

            <p>
              {product.description}
            </p>

          </div>


          {/* SELLER */}

          <div className="seller-card">

            <p className="seller-title">
              SOLD BY
            </p>

            <div className="seller-profile">

              <div className="seller-avatar">
                {product.seller.charAt(0)}
              </div>

              <div>
                <h3>
                  {product.seller}
                </h3>

                <p>
                  {product.department}
                </p>
              </div>

            </div>

            <p className="verified-seller">
              ✓ Verified Student
            </p>

            <button className="seller-contact-btn">
              Contact Seller
            </button>

          </div>

        </section>


        {/* RELATED PRODUCTS */}

        <section className="related-products-section">

          <div className="related-heading">

            <div>
              <p className="details-section-tag">
                YOU MAY ALSO LIKE
              </p>

              <h2>
                Related Products
              </h2>
            </div>

            <Link to="/marketplace">
              View Marketplace →
            </Link>

          </div>


          <div className="related-products-grid">

            {products
              .filter(
                (item) =>
                  item.category === product.category &&
                  item.id !== product.id
              )
              .map((item) => (

                <article
                  className="related-product-card"
                  key={item.id}
                >

                  <div className="related-product-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  </div>

                  <div className="related-product-info">

                    <p>
                      {item.category}
                    </p>

                    <h3>
                      {item.name}
                    </h3>

                    <h4>
                      ₦{item.price.toLocaleString()}
                    </h4>

                    <Link
                      to={`/products/${item.id}`}
                    >
                      View Product →
                    </Link>

                  </div>

                </article>

              ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;