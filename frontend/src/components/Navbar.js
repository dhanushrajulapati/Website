import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.jpg';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('credentials');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('credentials');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-xl sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo and Brand (left) */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Pranayuv Logo"
            className="h-10 w-10 rounded-full shadow-md border-2 border-white object-cover bg-white"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/40?text=Logo')}
          />
          <span className="text-2xl font-extrabold tracking-wide text-white drop-shadow">
            Pranayuv
          </span>
        </Link>

        {/* Hamburger icon for mobile (right) */}
        <button
          className="md:hidden focus:outline-none transition-transform duration-200 text-white"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menu Items (right) */}
        <div
          className={`
            ${menuOpen ? 'block' : 'hidden'}
            absolute top-16 left-0 w-full bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 bg-opacity-95 shadow-lg rounded-b-xl
            md:static md:bg-transparent md:shadow-none md:rounded-none md:flex md:items-center md:space-x-2 md:w-auto ml-auto
          `}
        >
          <Link to="/" className="block py-2 px-3 rounded-lg md:inline text-white no-underline hover:text-blue-300 transition-colors duration-150">Home</Link>
          <Link to="/about" className="block py-2 px-3 rounded-lg md:inline text-white no-underline hover:text-blue-300 transition-colors duration-150">About</Link>
          <Link to="/products" className="block py-2 px-3 rounded-lg md:inline text-white no-underline hover:text-blue-300 transition-colors duration-150">Products</Link>
          <Link to="/blog" className="block py-2 px-3 rounded-lg md:inline text-white no-underline hover:text-blue-300 transition-colors duration-150">Blog</Link>
          <Link to="/services" className="block py-2 px-3 rounded-lg md:inline text-white no-underline hover:text-blue-300 transition-colors duration-150">Our Services</Link>
          <Link to="/contact" className="block py-2 px-3 rounded-lg md:inline text-white no-underline hover:text-blue-300 transition-colors duration-150">Contact</Link>
          {isAuthenticated ? (
            <>
              <Link
                to={role === 'ROLE_ADMIN' ? '/admin-dashboard' : '/user-dashboard'}
                className="block py-2 px-3 rounded-lg md:inline text-white no-underline hover:text-blue-300 transition-colors duration-150"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block py-2 px-3 rounded-lg md:inline text-white no-underline hover:text-red-300 transition-colors duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 px-3 rounded-lg md:inline text-white no-underline hover:text-blue-300 transition-colors duration-150">Login</Link>
              <Link to="/signup" className="block py-2 px-3 rounded-lg md:inline text-white no-underline hover:text-blue-300 transition-colors duration-150">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
