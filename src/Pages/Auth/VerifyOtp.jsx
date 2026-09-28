import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiClient } from "../../config/AxiosInstance";
import "./VerifyOtp.css";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const inputRefs = useRef([]);

  /*
   * Email is passed from Register.jsx
   */
  const email = location.state?.email || "";

  /*
   * This allows this component to also be reused
   * later for password reset.
   */
  const verificationType = location.state?.type || "registration";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  /*
   ========================================
   HANDLE OTP INPUT
   ========================================
  */

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);
    setError("");

    // Move to next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /*
   ========================================
   HANDLE BACKSPACE
   ========================================
  */

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /*
   ========================================
   HANDLE OTP PASTE
   ========================================
  */

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) {
      return;
    }

    const newOtp = ["", "", "", "", "", ""];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);
    setError("");

    const nextIndex = Math.min(pastedData.length, otp.length - 1);

    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");

    // Check OTP length
    if (enteredOtp.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");

      return;
    }

    // Email is required
    if (!email) {
      setError("Email address is missing. Please return to registration.");

      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await apiClient.post("user/verify-email", {
        email: email,
        otp: enteredOtp,
      });

      console.log("OTP verification response:", response.data);

      toast.success(response.data?.message || "Email verified successfully!");

      /*
       * Password reset flow
       */
      if (verificationType === "password-reset") {
        navigate("/resetPassword", {
          state: {
            email: email,
          },
        });

        return;
      }

      /*
       * Registration flow
       */
      navigate("/login");
    } catch (error) {
      console.error("OTP verification error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Invalid or expired OTP. Please try again.";

      setError(errorMessage);

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /*
   ========================================
   RESEND OTP
   ========================================
  */

  const handleResend = async () => {
    if (!email) {
      toast.error("Email address is missing. Please return to registration.");

      return;
    }

    try {
      setIsResending(true);
      setError("");

      const response = await apiClient.post("/resend-otp", {
        email: email,
      });

      console.log("Resend OTP response:", response.data);

      // Clear current OTP
      setOtp(["", "", "", "", "", ""]);

      // Focus first OTP input
      inputRefs.current[0]?.focus();

      toast.success(
        response.data?.message || "A new OTP has been sent to your email.",
      );
    } catch (error) {
      console.error("Resend OTP error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Unable to resend OTP. Please try again.";

      setError(errorMessage);

      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <main className="verify-otp-page">
        <section className="verify-otp-card">
          {/* BACK LINK */}
          <Link to="/register" className="verify-back-link">
            ← Back to Register
          </Link>

          {/* ICON */}
          <div className="verify-icon">✉</div>

          {/* HEADING */}
          <div className="verify-heading">
            <h1>Verify Your Account</h1>

            <p>We've sent a 6-digit verification code to</p>

            <strong>{email || "your email address"}</strong>
          </div>

          {/* OTP FORM */}
          <form onSubmit={handleSubmit}>
            <div className="otp-input-container" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={error ? "otp-error" : ""}
                  disabled={isLoading}
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            {/* ERROR */}
            {error && <p className="otp-error-message">{error}</p>}

            {/* VERIFY BUTTON */}
            <button
              type="submit"
              className="verify-otp-btn"
              disabled={isLoading || isResending}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          {/* RESEND */}
          <div className="resend-section">
            <p>Didn't receive the code?</p>

            <button
              type="button"
              onClick={handleResend}
              disabled={isResending || isLoading}
            >
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default VerifyOTP;
