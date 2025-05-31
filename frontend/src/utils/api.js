import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pranayuvbackendfinal-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include Authorization header
api.interceptors.request.use((config) => {
  const credentials = localStorage.getItem('credentials');
  if (credentials) {
    config.headers.Authorization = `Basic ${credentials}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle 401 and 403 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('credentials');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      window.location.href = '/login'; // Redirect to login on auth failure
    }
    return Promise.reject(error);
  }
);

export default api;