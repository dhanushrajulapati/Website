import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg'; // Import the logo

const Footer = () => {
  return (
    <footer className="footer pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-4 d-flex align-items-center">
              <img
                src={logo}
                alt="Pranayuv Logo"
                className="me-2"
                style={{ height: '24px' }}
                onError={(e) => (e.target.src = 'https://via.placeholder.com/24?text=Logo')}
              />
              Pranayuv
            </h5>
            <p>Innovating Healthcare with Empathy and Technology</p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/products">Products</Link>
              </li>
              <li className="mb-2">
                <Link to="/about">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-4">Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                <a href="mailto:info@pranayuv.com">info@pranayuv.com</a>
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                <a href="tel:+919676448550">+91 9676448550</a>
              </li>
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i> Vijayawada, India
              </li>
              <li className="mb-2">
  <Link to="/terms">Terms & Conditions</Link>
</li>

            </ul>
          </div>
        </div>
        <hr className="mb-4" />
        <div className="text-center">
          <p className="mb-0">© 2025 Pranayuv. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;