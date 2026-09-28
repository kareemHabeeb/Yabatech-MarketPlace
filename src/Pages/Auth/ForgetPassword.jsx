import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiClient } from "../../config/AxiosInstance";
import "./ForgetPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await apiClient.post("user/forgot-password", {
        email: trimmedEmail,
      });

      console.log("Forgot password response:", response.data);

      toast.success(
        response.data?.message ||
          "A password reset code has been sent to your email.",
      );

      // Send the email to the OTP page
      navigate("/verifyOTP", {
        state: {
          email: trimmedEmail,
          type: "password-reset",
        },
      });
    } catch (error) {
      console.error("Forgot password error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Unable to process your request. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="forgot-password-page">
        <section className="forgot-password-container">
          <div className="forgot-password-card">
            <Link to="/login" className="forgot-back-link">
              ← Back to Login
            </Link>

            <div className="forgot-icon">🔐</div>

            <div className="forgot-heading">
              <h1>Forgot Password?</h1>

              <p>
                Don't worry. Enter your registered email address and we'll help
                you reset your password.
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
                  disabled={isLoading}
                  required
                />
              </div>

              <button
                type="submit"
                className="forgot-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p className="forgot-login-text">
              Remember your password? <Link to="/login">Login</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default ForgotPassword;
