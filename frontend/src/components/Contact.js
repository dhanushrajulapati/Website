import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Validation helpers
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    phone === '' || /^[0-9+\-\s()]{7,15}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePhone(phoneNumber)) {
      setError('Please enter a valid phone number or leave it blank.');
      return;
    }
    if (!message.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        'https://pranayuvbackendfinal-production.up.railway.app/pran/contact',
        {
          email,
          phone_number: phoneNumber,
          message,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setSuccess('✅ Your message has been sent successfully!');
      setEmail('');
      setPhoneNumber('');
      setMessage('');
    } catch (error) {
      if (error.response?.status === 404) {
        setError('Contact endpoint not found. Please try again later.');
      } else {
        setError(
          `Failed to send message: ${error.response?.data?.message || error.message}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Company Info and Contact */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div className="row align-items-center g-4">
              <div className="col-md-7">
                <div className="d-flex align-items-center mb-2">
                  {/* Replace src with your logo path */}
                  <img src="/logo.png" alt="Pranayuv Logo" style={{ width: 40, height: 40, marginRight: 12 }} />
                  <h3 className="fw-bold mb-0">Pranayuv</h3>
                </div>
                <div className="mb-1 fw-semibold">Surpassing Expectations</div>
                <div className="text-muted mb-2" style={{ maxWidth: 420 }}>
                  Pranayuv places a strong emphasis on innovation, quality, and trust.
                </div>
              </div>
              <div className="col-md-5">
                <div className="fw-semibold mb-2">Reach us</div>
                <div>
                  <a href="mailto:info@pranayuv.com" className="text-decoration-none d-block mb-1">
                    info@pranayuv.com
                  </a>
                  <a href="tel:+919676448550" className="text-decoration-none d-block mb-1">
                    +91 9676448550
                  </a>
                  <div className="mb-1">Vijayawada, India</div>
                  <div className="fw-semibold mt-2">Corporate Office:</div>
                  <div>
                    Pranayuv Pvt Ltd, Vijayawada, Andhra Pradesh 520001
                  </div>
                  <div className="mt-3">
                    <a href="https://wa.me/919676448550" target="_blank" rel="noopener noreferrer" className="me-2">
                      <i className="bi bi-whatsapp" style={{ fontSize: '1.3rem' }}></i>
                    </a>
                    <a href="https://instagram.com/pranayuv" target="_blank" rel="noopener noreferrer" className="me-2">
                      <i className="bi bi-instagram" style={{ fontSize: '1.3rem' }}></i>
                    </a>
                    <a href="https://linkedin.com/company/pranayuv" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-linkedin" style={{ fontSize: '1.3rem' }}></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Form and Map */}
        <div className="row g-4 justify-content-center">
          {/* Contact Form */}
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-4">
                  <i className="bi bi-chat-dots text-primary me-2"></i>
                  Send Us a Message
                </h5>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      autoComplete="email"
                      required
                      disabled={loading}
                      aria-required="true"
                      aria-invalid={!!error && !validateEmail(email)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label fw-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="form-control"
                      autoComplete="tel"
                      disabled={loading}
                      aria-invalid={!!error && !validatePhone(phoneNumber)}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label fw-semibold">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="form-control"
                      rows="4"
                      required
                      disabled={loading}
                      aria-required="true"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                    aria-busy={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                  {success && (
                    <div className="alert alert-success mt-4 text-center" role="alert">
                      {success}
                    </div>
                  )}
                  {error && (
                    <div className="alert alert-danger mt-4 text-center" role="alert">
                      {error}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
          {/* Map */}
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  <i className="bi bi-geo-alt text-primary me-2"></i>
                  Find Us on Map
                </h5>
                <div className="ratio ratio-4x3 rounded" style={{ overflow: 'hidden' }}>
                  <iframe
  src="https://www.google.com/maps?q=16.4821158,80.6913732&z=17&output=embed"
  title="Velagapudi Ramakrishna Siddhartha Engineering College Location"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
