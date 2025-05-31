import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import '../styles/Login.css'; // Reuse the same CSS as Login

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage('Signup failed: Passwords do not match');
      return;
    }
    try {
      await api.post('/pran/register', { username, password });
      setMessage('Signup successful! Please login.');
      setTimeout(() => navigate('/login'), 1200);
    } catch (error) {
      setMessage('Signup failed: ' + (error.response?.data?.message || 'Error'));
    }
  };

  return (
    <section className="login-bg min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-card p-4 shadow-sm">
              <h2 className="login-title mb-4 text-center">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="login-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                    required
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="login-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm" className="login-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="login-input"
                    required
                  />
                </div>
                <button type="submit" className="login-btn w-100 mt-2">
                  Sign Up
                </button>
                {message && (
                  <div
                    className={`mt-4 text-center fw-semibold ${
                      message.includes('failed')
                        ? 'login-error'
                        : 'login-success'
                    }`}
                  >
                    {message}
                  </div>
                )}
              </form>
              <div className="mt-4 text-center small">
                <span>Already have an account?{' '}</span>
                <Link to="/login" className="login-link">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
