import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      if (localStorage.getItem('role') !== 'ROLE_USER') {
        if (isMounted) navigate('/login');
        return;
      }

      try {
        const response = await api.get(`/pran/getorders/${username}`);
        if (isMounted) {
          setOrders(response.data || []);
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to load orders: ' + (error.response?.data?.message || 'Error'));
        }
      }
    };
    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, [navigate, username]);

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">My Orders</h2>
        <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {orders.length > 0 ? (
            <div className="grid gap-4">
              {orders.map((order) => (
                <div key={order.id} className="border-b py-4">
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-600">Date: {new Date(order.orderDate).toLocaleString()}</p>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <p className="text-blue-900 font-bold">Total: ₹{order.totalAmount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No orders found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyOrders;