import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../Components/Footer";
import "./EditProduct.css";
import DashboardHeader from "../../Components/DashboardHeader";
import { apiClient } from "../../config/AxiosInstance";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    condition: "",
    description: "",
    phoneNumber: "",
    status: "",
  });

  const [existingImage, setExistingImage] = useState(""); // current image URL from server
  const [newImage, setNewImage] = useState(null); // File, if user picks a replacement
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);

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

      setFormData({
        name: raw.productName ?? "",
        category: raw.category ?? "",
        price: raw.price ?? "",
        condition: raw.condition ?? "",
        description: raw.description ?? "",
        phoneNumber: raw.phoneNumber ?? "",
        status: raw.status ?? "available",
      });
      setExistingImage(raw.image ?? "");
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setNewImage(file);
  };

  // Since the backend requires "image" as binary on every update, if the
  // user didn't pick a new file we re-download the current image from its
  // URL and turn it back into a File so we always have something binary
  // to send.
  const resolveImageFile = async () => {
    if (newImage) return newImage;

    if (!existingImage) return null;

    const response = await fetch(existingImage);
    const blob = await response.blob();
    const filename = existingImage.split("/").pop() || "product-image.jpg";
    return new File([blob], filename, { type: blob.type || "image/jpeg" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const imageFile = await resolveImageFile();

      if (!imageFile) {
        toast.error("Please add a product image.");
        setSaving(false);
        return;
      }

      const payload = new FormData();
      payload.append("productName", formData.name);
      payload.append("category", formData.category);
      payload.append("condition", formData.condition);
      payload.append("price", formData.price);
      payload.append("description", formData.description);
      payload.append("phoneNumber", formData.phoneNumber);
      payload.append("status", formData.status);
      payload.append("image", imageFile);

      const response = await apiClient.put(`product/product/${id}`, payload, {
        headers: {
          "Content-Type": undefined,
        },
      });

      console.log("Product updated:", response.data);

      toast.success(response.data?.message || "Product updated successfully!");

      navigate(`/View-products/${id}`);
    } catch (err) {
      console.error("Update product error:", err);
      toast.error(
        err.response?.data?.message ||
          "Unable to update this product. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  // LOADING STATE

  if (loading) {
    return (
      <>
        <DashboardHeader />

        <main className="edit-not-found">
          <div>
            <h1>Loading product...</h1>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // PRODUCT NOT FOUND

  if (notFound) {
    return (
      <>
        <DashboardHeader />

        <main className="edit-not-found">
          <div>
            <h1>Product Not Found</h1>

            <p>The product you are trying to edit does not exist.</p>

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

      <main className="edit-product-page">
        {/* BREADCRUMB */}

        <section className="edit-breadcrumb">
          <Link to="/dashboard">Dashboard</Link>

          <span>/</span>

          <Link to="/my-products">My Products</Link>

          <span>/</span>

          <Link to={`/View-products/${id}`}>Manage Product</Link>

          <span>/</span>

          <p>Edit Product</p>
        </section>

        {/* PAGE HEADING */}

        <section className="edit-heading">
          <h1>Edit Product</h1>

          <p>Update the details of your product.</p>
        </section>

        {/* FORM */}

        <section className="edit-form-container">
          <form onSubmit={handleSubmit} className="edit-product-form">
            {/* PRODUCT NAME */}

            <div className="edit-form-group">
              <label>Product Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                disabled={saving}
                required
              />
            </div>

            {/* CATEGORY */}

            <div className="edit-form-group">
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={saving}
                required
              >
                <option value="">Select Category</option>

                <option value="Electronics">Electronics</option>

                <option value="Fashion">Fashion</option>

                <option value="Books & Academic Materials">
                  Books & Academic Materials
                </option>

                <option value="Food & Snacks">Food & Snacks</option>

                <option value="Services">Services</option>

                <option value="Other">Other</option>
              </select>
            </div>

            {/* PRICE */}

            <div className="edit-form-group">
              <label>Price (₦)</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter product price"
                disabled={saving}
                required
              />
            </div>

            {/* CONDITION */}

            <div className="edit-form-group">
              <label>Condition</label>

              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                disabled={saving}
                required
              >
                <option value="">Select Condition</option>

                <option value="nnew">New</option>

                <option value="used">Used</option>
              </select>
            </div>

            {/* PHONE NUMBER */}

            <div className="edit-form-group">
              <label>Phone Number / WhatsApp Number</label>

              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g. 08012345678"
                disabled={saving}
                required
              />
            </div>

            {/* STATUS */}

            <div className="edit-form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={saving}
                required
              >
                <option value="available">Available</option>

                <option value="sold">Sold</option>
              </select>
            </div>

            {/* PRODUCT IMAGE */}

            <div className="edit-form-group edit-full-width">
              <label>Product Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={saving}
              />

              <div className="edit-image-preview">
                <img
                  src={newImage ? URL.createObjectURL(newImage) : existingImage}
                  alt="Product preview"
                />
              </div>

              {!newImage && (
                <small>
                  Leave empty to keep the current image — it will be resent
                  automatically.
                </small>
              )}
            </div>

            {/* DESCRIPTION */}

            <div className="edit-form-group edit-full-width">
              <label>Product Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product"
                rows="6"
                disabled={saving}
                required
              />
            </div>

            {/* ACTION BUTTONS */}

            <div className="edit-form-actions">
              <Link to={`/View-products/${id}`} className="cancel-edit-btn">
                Cancel
              </Link>

              <button
                type="submit"
                className="update-product-btn"
                disabled={saving}
              >
                {saving ? "Updating..." : "Update Product"}
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
