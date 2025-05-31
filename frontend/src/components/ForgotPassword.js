import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [username, setUsername] = useState('');
  const [step, setStep] = useState('request'); // 'request' or 'verify'
  const [message, setMessage] = useState('');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/pran/forgotpassword/${email}`);
      setMessage('OTP sent to your email!');
      setStep('verify');
    } catch (error) {
      setMessage('Failed to send OTP: ' + (error.response?.data?.message || 'Error'));
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/pran/otp/${otp}/${newPassword}?username=${username}`);
      if (response.data === '') {
        setMessage('Password changed successfully!');
        setStep('request');
        setEmail('');
        setOtp('');
        setNewPassword('');
        setUsername('');
      } else {
        setMessage('Invalid OTP or error occurred.');
      }
    } catch (error) {
      setMessage('Failed to verify OTP: ' + (error.response?.data?.message || 'Error'));
    }
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <h2 className="text-3xl fw-bold text-center mb-5">Forgot Password</h2>
            {step === 'request' ? (
              <form onSubmit={handleRequestOtp} className="admin-form p-4">
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
                <button type="submit" className="btn btn-primary w-100">
                  Request OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="admin-form p-4">
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="otp" className="form-label">OTP</label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Change Password
                </button>
              </form>
            )}
            {message && (
              <p
                className={`mt-4 text-center ${
                  message.includes('Failed') || message.includes('Invalid')
                    ? 'error-message'
                    : 'success-message'
                }`}
              >
                {message}
              </p>
            )}
            <p className="mt-4 text-center">
              Back to{' '}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;