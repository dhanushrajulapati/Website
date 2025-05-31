import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg'; // Import the logo

const Footer = () => {
  return (
    <footer className="footer pt-5 pb-4" style={{ background: '#f8f9fa' }}>
      <div className="container">
        <div className="row">
          {/* Company Description */}
          <div className="col-md-4 mb-4">
            <div className="d-flex align-items-center mb-2">
              <img
                src={logo}
                alt="Pranayuv Logo"
                className="me-2"
                style={{ height: '32px' }}
                onError={(e) => (e.target.src = 'https://via.placeholder.com/32?text=Logo')}
              />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>Pranayuv</span>
            </div>
            <div>
              <strong>Surpassing Expectations</strong>
            </div>
            <p style={{ marginTop: '8px' }}>
              Pranayuv places a strong emphasis on innovation, quality, and trust.<br />
             
            </p>
          </div>
          {/* Contact Details */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3" style={{ fontWeight: 'bold' }}>Reach us</h5>
            <div>
              <a href="mailto:info@pranayuv.com" style={{ display: 'block', color: '#007bff' }}>info@pranayuv.com</a>
              <span style={{ display: 'block' }}>+91 9676448550</span>
              <span style={{ display: 'block', marginBottom: '8px' }}>Vijayawada, India</span>
              <div style={{ fontWeight: 'bold' }}>Corporate Office:</div>
              <div>Pranayuv Pvt Ltd, Vijayawada, Andhra Pradesh 520001</div>
            </div>
          </div>
          {/* Navigation and Policies */}
          <div className="col-md-4 mb-4">
            <div className="row">
              <div className="col-6">
                <h5 className="mb-3" style={{ fontWeight: 'bold' }}>Company</h5>
                <ul className="list-unstyled">
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/careers">Careers</Link></li>
                  <li><Link to="/partners">Partner with Us</Link></li>
                </ul>
              </div>
              <div className="col-6">
                <h5 className="mb-3" style={{ fontWeight: 'bold' }}>Policies</h5>
                <ul className="list-unstyled">
                  <li><Link to="/terms">Terms & Conditions</Link></li>
                  <li><Link to="/privacy">Privacy Policy</Link></li>
                  <li><Link to="/refund">Return & Refund Policies</Link></li>
                  <li><Link to="/shipping">Shipping Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Social Media Icons */}
        <div className="d-flex justify-content-center mb-3">
         
          <a href="https://wa.me/919676448550" className="me-3" aria-label="WhatsApp"><i className="bi bi-whatsapp"></i></a>
          <a href="https://www.instagram.com/team_pranayuv/" className="me-3" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
          <a href="https://www.linkedin.com/company/pranayuv-technologies/" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
        </div>
        <hr className="mb-3" />
        <div className="text-center" style={{ fontSize: '0.95rem', color: '#6c757d' }}>
          © 2025 Pranayuv Pvt Ltd. All Rights Reserved. &nbsp;|&nbsp; *T&C apply. Product images displayed may differ from the actual.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
