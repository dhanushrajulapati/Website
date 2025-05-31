import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import CartPage from './components/CartPage';
import Wishlist from './components/Wishlist';
import MyOrders from './components/MyOrders';
import Payment from './components/Payment';
import ProductDetails from './components/ProductDetails';
import Products from './components/Products';
import Contact from './components/Contact';
import Blog from './components/Blog';
import About from './components/About';
import User from './components/User';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer'; // ✅ Import Footer
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/custom.css';
import TermsAndConditions from './components/TermsAndConditions';
import ServicePage from './components/ServicePage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/user/wishlist" element={<Wishlist />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/user/orders" element={<MyOrders />} />
          <Route path="/user/payment" element={<Payment />} />
          <Route path="/user/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<User />} />
          <Route path="/product-card/:id" element={<ProductCard />} />
        </Routes>
      </div>
      <Footer /> {/* ✅ Add Footer below Routes */}
    </Router>
  );
};

export default App;
