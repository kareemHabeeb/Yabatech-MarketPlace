import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || "student@yabatech.edu.ng";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setError(
        "Password must be at least 8 characters long."
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    // Later:
    // POST /api/auth/reset-password

    console.log("Password reset for:", email);

    alert("Password reset successfully!");

    navigate("/login");
  };

  return (
    <>
      {/* <Header /> */}

      <main className="reset-password-page">

        <section className="reset-password-card">

          <Link
            to="/login"
            className="reset-back-link"
          >
            ← Back to Login
          </Link>

          <div className="reset-icon">
            🔑
          </div>

          <div className="reset-heading">

            <h1>
              Reset Password
            </h1>

            <p>
              Create a new password for your
              Campus Digital Marketplace account.
            </p>

            <span>
              {email}
            </span>

          </div>


          <form onSubmit={handleSubmit}>

            {/* PASSWORD */}

            <div className="reset-form-group">

              <label>
                New Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                required
              />

              <small>
                Password must be at least 8 characters.
              </small>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="reset-form-group">

              <label>
                Confirm New Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                required
              />

            </div>


            {/* ERROR */}

            {error && (
              <p className="reset-error">
                {error}
              </p>
            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="reset-password-btn"
            >
              Reset Password
            </button>

          </form>


          <p className="reset-login-text">
            Remember your password?{" "}

            <Link to="/login">
              Login
            </Link>
          </p>

        </section>

      </main>

      {/* <Footer /> */}
    </>
  );
};

export default ResetPassword;