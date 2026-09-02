import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import "./EditProduct.css";
import DashboardHeader from "../../Components/DashboardHeader";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary mock data
  // Later, this will come from your backend/API

  const products = [
    {
      id: 1,
      name: "HP EliteBook Laptop",
      category: "Electronics",
      price: 250000,
      condition: "Used - Like New",
      description:
        "A clean HP EliteBook laptop in excellent condition. It is suitable for programming, school work, assignments, and general use.",
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
        "A well-maintained Engineering Mathematics textbook suitable for students.",
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
        "Wireless Bluetooth headphones with good sound quality and long battery life.",
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
        "A stylish vintage denim jacket in good condition.",
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    },
  ];

  // Find the product using the ID from the URL

  const product = products.find(
    (item) => item.id === Number(id)
  );

  // Form state

  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price || "",
    condition: product?.condition || "",
    description: product?.description || "",
    image: product?.image || "",
  });


  // Handle input changes

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // Handle update

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later, this is where your API request will go
    // PUT /api/products/:id

    console.log("Updated Product:", formData);

    alert("Product updated successfully!");

    // Return to the Manage Product page

    navigate(`/my-products/${id}`);
  };


  // Product not found

  if (!product) {
    return (
      <>
        <DashboardHeader />

        <main className="edit-not-found">
          <div>
            <h1>Product Not Found</h1>

            <p>
              The product you are trying to edit does not exist.
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


  return (
    <>
      <DashboardHeader />

      <main className="edit-product-page">

        {/* BREADCRUMB */}

        <section className="edit-breadcrumb">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <span>/</span>

          <Link to="/my-products">
            My Products
          </Link>

          <span>/</span>

          <Link to={`/my-products/${id}`}>
            Manage Product
          </Link>

          <span>/</span>

          <p>
            Edit Product
          </p>

        </section>


        {/* PAGE HEADING */}

        <section className="edit-heading">

          <h1>
            Edit Product
          </h1>

          <p>
            Update the details of your product.
          </p>

        </section>


        {/* FORM */}

        <section className="edit-form-container">

          <form onSubmit={handleSubmit} className="edit-product-form">


            {/* PRODUCT NAME */}

            <div className="edit-form-group">

              <label>
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />

            </div>


            {/* CATEGORY */}

            <div className="edit-form-group">

              <label>
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Category
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Fashion">
                  Fashion
                </option>

                <option value="Books & Academic Materials">
                  Books & Academic Materials
                </option>

                <option value="Food & Snacks">
                  Food & Snacks
                </option>

                <option value="Services">
                  Services
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            {/* PRICE */}

            <div className="edit-form-group">

              <label>
                Price (₦)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter product price"
                required
              />

            </div>


            {/* CONDITION */}

            <div className="edit-form-group">

              <label>
                Condition
              </label>

              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Condition
                </option>

                <option value="Brand New">
                  Brand New
                </option>

                <option value="Used - Like New">
                  Used - Like New
                </option>

                <option value="Used - Good Condition">
                  Used - Good Condition
                </option>

                <option value="Used - Fair Condition">
                  Used - Fair Condition
                </option>

              </select>

            </div>


            {/* PRODUCT IMAGE */}

            <div className="edit-form-group edit-full-width">

              <label>
                Product Image
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />

              {formData.image && (

                <div className="edit-image-preview">

                  <img
                    src={formData.image}
                    alt="Product preview"
                  />

                </div>

              )}

            </div>


            {/* DESCRIPTION */}

            <div className="edit-form-group edit-full-width">

              <label>
                Product Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product"
                rows="6"
                required
              />

            </div>


            {/* ACTION BUTTONS */}

            <div className="edit-form-actions">

              <Link
                to={`/View-products/${id}`}
                className="cancel-edit-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="update-product-btn"
              >
                Update Product
              </button>

            </div>

          </form>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default EditProduct;