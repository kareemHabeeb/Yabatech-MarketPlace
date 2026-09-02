import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./VerifyOTP.css";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const inputRefs = useRef([]);

  // This can be passed from Register or Forgot Password later
  const email =
    location.state?.email || "student@yabatech.edu.ng";

  const verificationType =
    location.state?.type || "registration";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);
    setError("");

    // Move to next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newOtp = [...otp];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(
      pastedData.length,
      otp.length - 1
    );

    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setIsLoading(true);

    // Temporary frontend verification
    // Later:
    // POST /api/auth/verify-otp

    setTimeout(() => {
      setIsLoading(false);

      if (enteredOtp !== "123456") {
        setError("Invalid OTP. Please try again.");
        return;
      }

      if (verificationType === "password-reset") {
        navigate("/reset-password", {
          state: {
            email: email,
          },
        });
      } else {
        navigate("/login");
      }
    }, 800);
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");

    // Later:
    // POST /api/auth/resend-otp

    alert("A new OTP has been sent.");
  };

  return (
    <>
      {/* <Header /> */}

      <main className="verify-otp-page">
        <section className="verify-otp-card">

          <Link
            to="/login"
            className="verify-back-link"
          >
            ← Back to Login
          </Link>

          <div className="verify-icon">
            ✉
          </div>

          <div className="verify-heading">
            <h1>Verify Your Account</h1>

            <p>
              We've sent a 6-digit verification code to
            </p>

            <strong>{email}</strong>
          </div>

          <form onSubmit={handleSubmit}>

            <div
              className="otp-input-container"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) =>
                    (inputRefs.current[index] = element)
                  }
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleChange(index, e.target.value)
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(index, e)
                  }
                  className={
                    error ? "otp-error" : ""
                  }
                />
              ))}
            </div>

            {error && (
              <p className="otp-error-message">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="verify-otp-btn"
              disabled={isLoading}
            >
              {isLoading
                ? "Verifying..."
                : "Verify OTP"}
            </button>

          </form>

          <div className="resend-section">
            <p>
              Didn't receive the code?
            </p>

            <button
              type="button"
              onClick={handleResend}
            >
              Resend OTP
            </button>
          </div>

          {/* Temporary development information */}

          <div className="dev-otp-note">
            <strong>Development OTP:</strong> 123456
          </div>

        </section>
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default VerifyOTP;