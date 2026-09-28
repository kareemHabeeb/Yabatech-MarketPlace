import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Register.css";
import { apiClient } from "../../config/AxiosInstance";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    matricNumber: "",
    department: "",
    level: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const FIELD_LABELS = {
    firstName: "First name",
    lastName: "Last name",
    matricNumber: "Matriculation number",
    department: "Department",
    level: "Level",
    email: "School email",
    phoneNumber: "Phone number",
    password: "Password",
    confirmPassword: "Confirm password",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Point out the first empty field instead of a generic message
    const firstEmptyKey = Object.keys(formData).find(
      (key) => !formData[key].trim(),
    );

    if (firstEmptyKey) {
      toast.error(`${FIELD_LABELS[firstEmptyKey]} is required.`);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await apiClient.post("user/register", formData);

      console.log("Registration response:", response.data);

      toast.success(response.data?.message || "Account created successfully!");

      // Pass the registered email to the OTP page
      navigate("/verifyOTP", {
        state: {
          email: formData.email,
          type: "registration",
        },
      });
    } catch (error) {
      console.error("Registration error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Unable to create your account. Please try again.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* LEFT SIDE */}
        <div className="register-banner">
          <div className="register-brand">
            <div className="brand-icon">CD</div>

            <h2>Campus Digital Marketplace</h2>
          </div>

          <div className="register-banner-content">
            <span className="yabatech-tag">JOIN THE COMMUNITY</span>

            <h1>
              Start Buying
              <br />
              and Selling Today.
            </h1>

            <p>
              Join the YABATECH Campus Digital Marketplace and discover products
              and services offered by fellow students.
            </p>
          </div>

          <div className="register-footer-text">
            Your Campus. Your Marketplace.
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="register-form-section">
          <div className="register-form">
            <Link to="/" className="back-home">
              ← Back to Home
            </Link>

            {/* FORM HEADING */}
            <div className="form-heading">
              <h2>Create an Account</h2>

              <p>Join the Campus Digital Marketplace community.</p>
            </div>

            {/* REGISTRATION FORM */}
            <form onSubmit={handleSubmit}>
              {/* FIRST NAME + LAST NAME */}
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* MATRIC NUMBER */}
              <div className="form-group">
                <label>Matriculation Number</label>

                <input
                  type="text"
                  name="matricNumber"
                  value={formData.matricNumber}
                  onChange={handleChange}
                  placeholder="Enter matric number"
                  disabled={loading}
                />
              </div>

              {/* DEPARTMENT + LEVEL */}
              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>

                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">Select department</option>

                    <option value="Computer Science">Computer Science</option>

                    <option value="Computer Engineering">
                      Computer Engineering
                    </option>

                    <option value="Business Administration">
                      Business Administration
                    </option>

                    <option value="Mass Communication">
                      Mass Communication
                    </option>

                    <option value="Science Laboratory Technology">
                      Science Laboratory Technology
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Level</label>

                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">Select level</option>

                    <option value="ND 1">ND 1</option>

                    <option value="ND 2">ND 2</option>

                    <option value="ND 3">ND 3</option>

                    <option value="HND 1">HND 1</option>

                    <option value="HND 2">HND 2</option>
                  </select>
                </div>
              </div>

              {/* EMAIL */}
              <div className="form-group">
                <label>School Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your school email"
                  disabled={loading}
                />
              </div>

              {/* PHONE NUMBER */}
              <div className="form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  disabled={loading}
                />
              </div>

              {/* PASSWORD + CONFIRM PASSWORD */}
              <div className="form-row">
                <div className="form-group">
                  <label>Password</label>

                  <div className="password-input-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create password"
                      disabled={loading}
                    />

                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={loading}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      tabIndex={-1}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>

                  <div className="password-input-wrap">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      disabled={loading}
                    />

                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      disabled={loading}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* LOGIN LINK */}
            <p className="auth-switch">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
