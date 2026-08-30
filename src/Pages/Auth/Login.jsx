import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
const nav = useNavigate();
const handleSubmit = (e) => {
  e.preventDefault();
  nav("/user/dashboard"); 
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
                  placeholder="Enter your email or matric number"
                />
              </div>

              <div className="form-group">
                <div className="password-label">
                  <label>Password</label>

                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>

                <input type="password" placeholder="Enter your password" />
              </div>
              
                <button type="submit" className="auth-button">
                  Login
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
