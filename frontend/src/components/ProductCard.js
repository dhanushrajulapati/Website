import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleAddToCart = async () => {
    if (!username) {
      navigate('/login');
      return;
    }

    try {
      const cartItem = {
        username: username,
        productId: product.id,
        quantity: 1,
        addedDate: new Date()
      };

      const response = await api.post('/pran/addtocart', cartItem);
      
      if (response.data.price === -1000) {
        alert('Not enough stock available');
        return;
      }

      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={`https://pranayuvbackendfinal-production.up.railway.app/api/product/${product.id}/image`}
        alt={product.name}
        className="w-full h-48 object-cover"
        onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=No+Image')}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-1">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mb-3">
          {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
        </p>
        <div className="flex justify-between">
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            View Details
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product.stockQuantity <= 0}
            className={`px-3 py-1 rounded text-sm ${
              product.stockQuantity > 0
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;