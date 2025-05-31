import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    setSuccess(''); // Clear previous success
    try {
      const publicApi = axios.create({
        baseURL: 'https://pranayuvbackendfinal-production.up.railway.app',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await publicApi.post('/pran/contact', {
        email,
        phone_number: phoneNumber,
        message,
      });
      setSuccess('Message sent successfully!');
      setEmail('');
      setPhoneNumber('');
      setMessage('');
    } catch (error) {
      if (error.response?.status === 404) {
        setError('Contact endpoint not found. Please contact support.');
      } else {
        setError(`Failed to send message: ${error.response?.status || ''} ${error.response?.data?.message || error.message}`);
      }
      console.error('Contact error:', error);
    }
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <h2 className="text-3xl fw-bold text-center mb-5">Contact Us</h2>
            <form onSubmit={handleSubmit} className="admin-form p-4">
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-control"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
              {success && <p className="success-message mt-4 text-center">{success}</p>}
              {error && <p className="error-message mt-4 text-center">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;