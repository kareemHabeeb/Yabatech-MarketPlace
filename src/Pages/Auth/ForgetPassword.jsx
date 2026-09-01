import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgetPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later, this will connect to your API
    // Example:
    // POST /forgot-password

    console.log("Password reset requested for:", email);

    setIsSubmitted(true);
  };

  return (
    <>
      {/* <Header /> */}

      <main className="forgot-password-page">
        <section className="forgot-password-container">
          <div className="forgot-password-card">
            {!isSubmitted ? (
              <>
                <Link to="/login" className="forgot-back-link">
                  ← Back to Login
                </Link>

                <div className="forgot-icon">
                  🔐
                </div>

                <div className="forgot-heading">
                  <h1>Forgot Password?</h1>

                  <p>
                    Don't worry. Enter your registered email address and we'll
                    help you reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="forgot-form-group">
                    <label>Email Address</label>

                    <input
                      type="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="forgot-submit-btn"
                  >
                    Send Reset Link
                  </button>
                </form>

                <p className="forgot-login-text">
                  Remember your password?{" "}
                  <Link to="/login">
                    Login
                  </Link>
                </p>
              </>
            ) : (
              <div className="forgot-success">
                <div className="success-icon">
                  ✓
                </div>

                <h1>Check Your Email</h1>

                <p>
                  If an account exists with <strong>{email}</strong>, a
                  password reset link will be sent to that email address.
                </p>

                <Link
                  to="/login"
                  className="back-login-btn"
                >
                  Back to Login
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default ForgotPassword;