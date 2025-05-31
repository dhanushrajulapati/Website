import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Encode credentials for Basic Auth
      const credentials = btoa(`${username}:${password}`);
      const testApi = api.create({
        baseURL: 'https://pranayuvbackendfinal-production.up.railway.app',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      });

      // Store credentials
      localStorage.setItem('credentials', credentials);
      localStorage.setItem('username', username);

      // Try admin endpoint
      try {
        await testApi.get('/admin/getmessages');
        localStorage.setItem('role', 'ROLE_ADMIN');
        setMessage('Login successful!');
        navigate('/admin-dashboard');
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Validate user credentials with public endpoint
          await testApi.get('/pran/home');
          localStorage.setItem('role', 'ROLE_USER');
          setMessage('Login successful!');
          navigate('/user-dashboard');
        } else {
          throw error;
        }
      }
    } catch (error) {
      setMessage(`Login failed: ${error.response?.status ? 'Invalid credentials' : 'Server error'}`);
      localStorage.removeItem('credentials');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
    }
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <h2 className="text-3xl fw-bold text-center mb-5">Login</h2>
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
                Login
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
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
            <p className="mt-2 text-center">
              Forgot password?{' '}
              <Link to="/forgot-password" className="text-primary hover:underline">
                Reset Password
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;