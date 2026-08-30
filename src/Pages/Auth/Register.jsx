import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
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
            <span className="yabatech-tag">
              JOIN THE COMMUNITY
            </span>

            <h1>
              Start Buying
              <br />
              and Selling Today.
            </h1>

            <p>
              Join the YABATECH Campus Digital Marketplace and discover
              products and services offered by fellow students.
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

            <div className="form-heading">
              <h2>Create an Account</h2>

              <p>
                Join the Campus Digital Marketplace community.
              </p>
            </div>


            <form>

              <div className="form-row">

                <div className="form-group">
                  <label>First Name</label>

                  <input
                    type="text"
                    placeholder="Enter first name"
                  />
                </div>


                <div className="form-group">
                  <label>Last Name</label>

                  <input
                    type="text"
                    placeholder="Enter last name"
                  />
                </div>

              </div>


              <div className="form-group">
                <label>Matriculation Number</label>

                <input
                  type="text"
                  placeholder="Enter matric number"
                />
              </div>


              <div className="form-row">

                <div className="form-group">
                  <label>Department</label>

                  <select>
                    <option value="">
                      Select department
                    </option>

                    <option>Computer Science</option>
                    <option>Computer Engineering</option>
                    <option>Business Administration</option>
                    <option>Mass Communication</option>
                    <option>Science Laboratory Technology</option>
                  </select>
                </div>


                <div className="form-group">
                  <label>Level</label>

                  <select>
                    <option value="">
                      Select level
                    </option>

                    <option>ND 1</option>
                    <option>ND 2</option>
                    <option>ND 3</option>
                    <option>HND 1</option>
                    <option>HND 2</option>
                  </select>
                </div>

              </div>


              <div className="form-group">
                <label>School Email</label>

                <input
                  type="email"
                  placeholder="Enter your school email"
                />
              </div>


              <div className="form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  placeholder="Enter phone number"
                />
              </div>


              <div className="form-row">

                <div className="form-group">
                  <label>Password</label>

                  <input
                    type="password"
                    placeholder="Create password"
                  />
                </div>


                <div className="form-group">
                  <label>Confirm Password</label>

                  <input
                    type="password"
                    placeholder="Confirm password"
                  />
                </div>

              </div>


              <button
                type="submit"
                className="auth-button"
              >
                Create Account
              </button>

            </form>


            <p className="auth-switch">
              Already have an account?{" "}

              <Link to="/login">
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;