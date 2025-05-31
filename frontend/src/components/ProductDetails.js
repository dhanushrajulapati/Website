import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError('Failed to load product: ' + (error.response?.data?.message || 'Error'));
      }
    };
    fetchProduct();
  }, [id]);

  if (!product && !error) return <div>Loading...</div>;

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Product Details</h2>
        <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <>
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-1">Brand: {product.brand}</p>
              <p className="text-gray-600 mb-1">Category: {product.category}</p>
              <p className="text-gray-600 mb-1">Description: {product.description}</p>
              <p className="text-blue-900 font-bold mb-1">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 mb-1">
                Status: {product.productAvailable ? 'Available' : 'Out of Stock'}
              </p>
              <p className="text-gray-600 mb-1">Stock: {product.stockQuantity}</p>
              <p className="text-gray-600 mb-4">
                Release Date: {new Date(product.releaseDate).toLocaleDateString()}
              </p>
              {product.imageData ? (
                <img
                  src={`data:${product.imageType};base64,${product.imageData}`}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded mb-4"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded mb-4 flex items-center justify-center">
                  <span>No Image</span>
                </div>
              )}
              <div className="flex gap-4">
                <button
                  className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={!product.productAvailable || product.stockQuantity === 0}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Add to Wishlist
                </button>
              </div>
              <Link to="/user" className="block mt-4 text-blue-600 hover:underline">
                Back to Dashboard
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;