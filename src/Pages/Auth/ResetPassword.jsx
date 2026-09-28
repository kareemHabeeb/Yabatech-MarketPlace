import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ResetPassword.css";
import { apiClient } from "../../config/AxiosInstance";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "student@yabatech.edu.ng";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await apiClient.post("/user/reset-password", {
        email,
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      console.log("Password reset response:", response.data);

      toast.success(response.data?.message || "Password reset successfully!");

      navigate("/login");
    } catch (err) {
      console.error("Reset password error:", err);

      const errorMessage =
        err.response?.data?.message ||
        "Unable to reset your password. Please try again.";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Header /> */}

      <main className="reset-password-page">
        <section className="reset-password-card">
          <Link to="/login" className="reset-back-link">
            ← Back to Login
          </Link>

          <div className="reset-icon">🔑</div>

          <div className="reset-heading">
            <h1>Reset Password</h1>

            <p>
              Create a new password for your Campus Digital Marketplace account.
            </p>

            <span>{email}</span>
          </div>

          <form onSubmit={handleSubmit}>
            {/* PASSWORD */}

            <div className="reset-form-group">
              <label>New Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                disabled={loading}
                required
              />

              <small>Password must be at least 8 characters.</small>
            </div>

            {/* CONFIRM PASSWORD */}

            <div className="reset-form-group">
              <label>Confirm New Password</label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                disabled={loading}
                required
              />
            </div>

            {/* ERROR */}

            {error && <p className="reset-error">{error}</p>}

            {/* SUBMIT */}

            <button
              type="submit"
              className="reset-password-btn"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="reset-login-text">
            Remember your password? <Link to="/login">Login</Link>
          </p>
        </section>
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default ResetPassword;
