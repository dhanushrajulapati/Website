import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) {
      navigate('/login');
      return;
    }

    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/pran/getcart/${username}`);
        setCartItems(response.data.cart || []);
        setTotalPrice(response.data.price || 0);
      } catch (err) {
        setError('Failed to fetch cart items: ' + (err.response?.data || 'Error'));
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [username, navigate]);

  const handleRemoveFromCart = async (itemId) => {
    try {
      await api.delete(`/pran/deletefromcart/${itemId}`);
      // Update local state by removing the item
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
      // Recalculate total price (this would ideally come from the backend)
      const newTotal = cartItems.reduce((total, item) => {
        if (item.id !== itemId) {
          return total + (item.price * item.quantity);
        }
        return total;
      }, 0);
      setTotalPrice(newTotal);
    } catch (err) {
      setError('Failed to remove item: ' + (err.response?.data || 'Error'));
      console.error('Error removing item:', err);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      // Find the item in cartItems
      const itemToUpdate = cartItems.find(item => item.id === itemId);
      if (!itemToUpdate) return;

      // Update quantity in backend
      await api.put(`/pran/updatecart/${itemId}`, { 
        quantity: newQuantity 
      });

      // Update local state
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );

      // Recalculate total price
      const newTotal = cartItems.reduce((total, item) => {
        if (item.id === itemId) {
          return total + (item.price * newQuantity);
        }
        return total + (item.price * item.quantity);
      }, 0);
      setTotalPrice(newTotal);
    } catch (err) {
      setError('Failed to update quantity: ' + (err.response?.data || 'Error'));
      console.error('Error updating quantity:', err);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) return <div className="text-center py-8">Loading cart...</div>;
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Your Shopping Cart</h2>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">Your cart is empty</p>
            <Link 
              to="/products" 
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold">Cart Items ({cartItems.length})</h3>
                </div>
                <div className="divide-y">
                  {cartItems.map(item => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={`https://pranayuvbackendfinal-production.up.railway.app/api/product/${item.productId}/image`}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded"
                          onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=No+Image')}
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold">{item.name || `Product ${item.productId}`}</h4>
                        <p className="text-gray-600 mb-2">Brand: {item.brand || 'N/A'}</p>
                        <p className="text-blue-900 font-bold mb-4">${item.price?.toFixed(2) || '0.00'}</p>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-lg"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-lg"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-4 border-t">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/products"
                  className="block text-center mt-4 text-blue-600 hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;