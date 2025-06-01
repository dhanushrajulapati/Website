import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.jpg';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/blog', label: 'Blog' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

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
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close menu on navigation (mobile)
  const handleNavClick = () => setMenuOpen(false);

  return (
    <nav className="bg-blue-900 shadow-md sticky top-0 z-50 font-sans">
      <div className="container mx-auto flex items-center justify-between px-2 py-3">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2" onClick={handleNavClick}>
          <img
            src={logo}
            alt="Pranayuv Logo"
            className="h-10 w-10 rounded-full border-2 border-blue-600 object-cover bg-white shadow"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/40?text=Logo')}
          />
          <span className="text-2xl font-bold tracking-tight text-white">Pranayuv</span>
        </Link>

        {/* Hamburger icon for mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menu Items */}
        <div
  className={`
    ${menuOpen ? 'block' : 'hidden'}
    absolute top-16 left-0 w-full bg-blue-900 md:bg-transparent
    md:static md:flex md:items-center md:w-auto transition-all duration-200
  `}
>
  <div className="flex flex-col md:flex-row md:items-center md:justify-end md:space-x-1">
    {NAV_LINKS.map((link) => (
      <Link
        key={link.to}
        to={link.to}
        className="py-2 px-2 text-white hover:text-blue-600 hover:bg-blue-700 rounded transition-colors duration-150 font-medium"
        onClick={handleNavClick}
      >
        {link.label}
      </Link>
    ))}
    {isAuthenticated ? (
      <>
        <Link
          to={role === 'ROLE_ADMIN' ? '/admin-dashboard' : '/user-dashboard'}
          className="py-2 px-2 text-blue-900 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-150 font-medium"
          onClick={handleNavClick}
        >
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          className="py-2 px-2 text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors duration-150 font-medium mt-1 md:mt-0 md:ml-1"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <Link
          to="/login"
          className="py-2 px-2 text-white hover:text-blue-600 hover:bg-blue-700 rounded transition-colors duration-150 font-medium"
          onClick={handleNavClick}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="py-2 px-2 text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors duration-150 font-medium mt-1 md:mt-0 md:ml-1"
          onClick={handleNavClick}
        >
          Signup
        </Link>
      </>
    )}
  </div>
</div>

      </div>
    </nav>
  );
};

export default Navbar;
