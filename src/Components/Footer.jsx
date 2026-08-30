import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">

          <h2>
            Campus Digital
            <span> Marketplace</span>
          </h2>

          <p>
            A digital marketplace designed to make buying, selling, and
            connecting easier for students within the YABATECH community.
          </p>

        </div>


        {/* QUICK LINKS */}
        <div className="footer-links">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/marketplace">
            Marketplace
          </Link>

          <Link to="/categories">
            Categories
          </Link>

          <Link to="/register">
            Create Account
          </Link>

        </div>


        {/* MARKETPLACE */}
        <div className="footer-links">

          <h3>Marketplace</h3>

          <Link to="/marketplace">
            Browse Products
          </Link>

          <Link to="/sell">
            Start Selling
          </Link>

          <Link to="/services">
            Services
          </Link>

          <Link to="/help">
            Help & Support
          </Link>

        </div>


        {/* CONTACT */}
        <div className="footer-contact">

          <h3>Contact</h3>

          <p>Yaba College of Technology</p>

          <p>Yaba, Lagos, Nigeria</p>

          <p>
            Email:
            <br />
            support@campusmarketplace.com
          </p>

        </div>

      </div>


      {/* BOTTOM FOOTER */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Campus Digital Marketplace.
          All rights reserved.
        </p>

        <div className="footer-bottom-links">

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms of Use
          </Link>

        </div>

      </div>

    </footer>
  );
};

export default Footer;