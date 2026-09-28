import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../global/userSlice";
import { apiClient } from "../../config/AxiosInstance";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await apiClient.post("user/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("Login response:", response.data);

      /*
       * Store user information if returned by the backend.
       *
       * We will confirm the exact response structure from
       * your backend response after testing.
       */
      const responseData = response.data;

      const token =
        responseData?.token ||
        responseData?.accessToken ||
        responseData?.data?.token ||
        responseData?.data?.accessToken;

      const user =
        responseData?.user || responseData?.data?.user || responseData?.data;

      if (user) {
        dispatch(setUser(user));
      }

      if (token) {
        dispatch(setToken(token));
      }

      toast.success(responseData?.message || "Login successful!");

      // Go to user dashboard after successful login
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Unable to login. Please check your credentials and try again.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side */}
        <div className="auth-banner">
          <div className="auth-brand">
            <div className="brand-icon">CD</div>
            <h2>Campus Digital Marketplace</h2>
          </div>

          <div className="auth-banner-content">
            <span className="yabatech-tag">YABATECH STUDENTS</span>

            <h1>
              Buy. Sell.
              <br />
              Connect.
            </h1>

            <p>
              Discover products and services offered by students within the
              YABATECH community.
            </p>
          </div>

          <div className="auth-footer-text">Your Campus. Your Marketplace.</div>
        </div>

        {/* Right Side */}
        <div className="auth-form-section">
          <div className="auth-form">
            <Link to="/" className="back-home">
              ← Back to Home
            </Link>

            <div className="form-heading">
              <h2>Welcome Back 👋</h2>
              <p>Sign in to continue to your marketplace.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email or Matric Number</label>

                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email or matric number"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <div className="password-label">
                  <label>Password</label>

                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>

              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <p className="auth-switch">
              Don't have an account?{" "}
              <Link to="/register">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
