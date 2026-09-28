import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../Components/Footer";
import "./SellProducts.css";
import DashboardHeader from "../../Components/DashboardHeader";
import { apiClient } from "../../config/AxiosInstance";

const SellProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    condition: "",
    description: "",
    contact: "",
  });

  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    "Fashion",
    "Electronics",
    "Books & Academic Materials",
    "Food & Snacks",
    "Beauty & Personal Care",
    "Furniture & Hostel Items",
    "Services",
    "Others",
  ];

  const conditions = ["New", "Used"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    setImages(selectedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please add at least one product image.");
      return;
    }

    setSuccessMessage("");

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("productName", formData.productName);
      payload.append("category", formData.category);
      payload.append("condition", formData.condition);
      payload.append("price", formData.price);
      payload.append("description", formData.description);
      payload.append("phoneNumber", formData.contact);
      // API expects a single binary file field ("image": string($binary))
      payload.append("image", images[0]);

      // IMPORTANT: apiClient sets a default "Content-Type: application/json"
      // header on the whole instance. Overriding it to undefined here (for
      // this request only) lets axios detect the FormData body and generate
      // the correct "multipart/form-data; boundary=..." header itself.
      // Without this, the File gets serialized as JSON and arrives as {}.
      const response = await apiClient.post("product/create-product", payload, {
        headers: {
          "Content-Type": undefined,
        },
      });

      console.log("Product created:", response.data);

      setSuccessMessage(
        response.data?.message || "Your product has been posted successfully!",
      );
      toast.success(response.data?.message || "Product posted successfully!");

      setTimeout(() => {
        navigate("/my-products");
      }, 1500);
    } catch (error) {
      console.error("Product creation error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Unable to post your product. Please try again.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardHeader />
      <main className="sell-product-page">
        {/* PAGE HERO */}

        <section className="sell-hero">
          <div className="sell-hero-content">
            <p className="sell-tag">START SELLING</p>

            <h1>Post Your Product</h1>

            <p>
              Reach more students by listing your product or service on the
              Campus Digital Marketplace.
            </p>
          </div>
        </section>

        {/* FORM SECTION */}

        <section className="sell-form-section">
          <form className="sell-form" onSubmit={handleSubmit}>
            {/* SUCCESS MESSAGE */}

            {successMessage && (
              <div className="success-message">✓ {successMessage}</div>
            )}

            {/* BASIC INFORMATION */}

            <div className="form-section">
              <div className="form-section-heading">
                <span>01</span>

                <div>
                  <h2>Product Information</h2>

                  <p>Tell students what you want to sell.</p>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Product Name</label>

                  <input
                    type="text"
                    name="productName"
                    placeholder="e.g. HP EliteBook Laptop"
                    value={formData.productName}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  >
                    <option value="">Select a category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Condition</label>

                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  >
                    <option value="">Select condition</option>

                    {conditions.map((condition) => (
                      <option key={condition} value={condition.toLowerCase()}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Price (₦)</label>

                  <input
                    type="number"
                    name="price"
                    placeholder="Enter product price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}

            <div className="form-section">
              <div className="form-section-heading">
                <span>02</span>

                <div>
                  <h2>Product Description</h2>

                  <p>Give buyers enough information about your product.</p>
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                  name="description"
                  placeholder="Describe your product, its condition, features and other important information..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* PRODUCT IMAGES */}

            <div className="form-section">
              <div className="form-section-heading">
                <span>03</span>

                <div>
                  <h2>Product Images</h2>

                  <p>Add clear pictures of the product you want to sell.</p>
                </div>
              </div>

              <div className="image-upload-container">
                <label htmlFor="productImages" className="image-upload-box">
                  <div className="upload-icon">↑</div>

                  <h3>Upload Product Images</h3>

                  <p>Click here to select images from your device.</p>

                  <span>You can select multiple images.</span>
                </label>

                <input
                  type="file"
                  id="productImages"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  disabled={loading}
                />
              </div>

              {/* IMAGE PREVIEW */}

              {images.length > 0 && (
                <div className="selected-images">
                  <p>{images.length} image(s) selected</p>

                  <div className="image-preview-grid">
                    {images.map((image, index) => (
                      <div className="image-preview" key={index}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CONTACT */}

            <div className="form-section">
              <div className="form-section-heading">
                <span>04</span>

                <div>
                  <h2>Contact Information</h2>

                  <p>Provide a way for interested buyers to contact you.</p>
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number / WhatsApp Number</label>

                <input
                  type="tel"
                  name="contact"
                  placeholder="e.g. 08012345678"
                  value={formData.contact}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* SUBMIT */}

            <div className="submit-product-section">
              <button
                type="submit"
                className="post-product-btn"
                disabled={loading}
              >
                {loading ? "Posting..." : "Post Product"}
              </button>

              <p>
                Your product will be visible to verified students on the Campus
                Digital Marketplace.
              </p>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SellProduct;
