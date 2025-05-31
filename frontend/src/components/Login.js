import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import '../styles/Login.css'; // See CSS below

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = btoa(`${username}:${password}`);
      const testApi = api.create({
        baseURL: 'https://pranayuvbackendfinal-production.up.railway.app',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      });

      localStorage.setItem('credentials', credentials);
      localStorage.setItem('username', username);

      try {
        await testApi.get('/admin/getmessages');
        localStorage.setItem('role', 'ROLE_ADMIN');
        setMessage('Login successful!');
        navigate('/admin-dashboard');
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
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
    <section className="login-bg min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-card p-4 shadow-sm">
              <h2 className="login-title mb-4 text-center">Login</h2>
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
                <button type="submit" className="login-btn w-100 mt-2">
                  Login
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
                <span>Don't have an account?{' '}</span>
                <Link to="/signup" className="login-link">
                  Sign Up
                </Link>
              </div>
              <div className="mt-2 text-center small">
                <span>Forgot password?{' '}</span>
                <Link to="/forgot-password" className="login-link">
                  Reset Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
