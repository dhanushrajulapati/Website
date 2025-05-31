import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products');
        setProducts(response.data || []);
      } catch (error) {
        setError('Failed to load products: ' + (error.response?.data?.message || 'Please try again later'));
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-5">
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Products</h2>
          <p className="lead text-muted">Innovative healthcare solutions for modern needs</p>
        </div>
        
        {error && (
          <div className="alert alert-danger text-center mb-4">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        <div className="row g-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm product-card">
                  <div className="position-relative">
                    <img
                      src={`https://pranayuvbackendfinal-production.up.railway.app/api/product/${product.id}/image`}
                      alt={product.name}
                      className="card-img-top img-fluid product-image"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image')}
                    />
                    {product.stockQuantity > 0 ? (
                      <span className="badge bg-success position-absolute top-0 end-0 m-2">
                        In Stock
                      </span>
                    ) : (
                      <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <div className="card-body">
                    <h3 className="card-title h5">{product.name}</h3>
                    <p className="card-text text-muted">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="h5 text-primary mb-0">${product.price}</span>
                      <Link to={`/product/${product.id}`} className="btn btn-primary">
                        <i className="bi bi-eye me-1"></i> View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !error && (
              <div className="col-12 text-center py-5">
                <i className="bi bi-box-seam display-5 text-muted mb-3"></i>
                <h3 className="h4">coming soon</h3>
                <p className="text-muted">Check back later for our latest healthcare solutions</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;