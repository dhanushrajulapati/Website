import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/pran/register', { username, password });
      setMessage('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      setMessage('Signup failed: ' + (error.response?.data?.message || 'Error'));
    }
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <h2 className="text-3xl fw-bold text-center mb-5">Sign Up</h2>
            <form onSubmit={handleSubmit} className="admin-form p-4">
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
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
              {message && (
                <p
                  className={`mt-4 text-center ${
                    message.includes('failed') ? 'error-message' : 'success-message'
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
            <p className="mt-4 text-center">
              Already have an account?{' '}
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

export default Signup;