import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Payment = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    let isMounted = true;

    const fetchTotalAmount = async () => {
      if (localStorage.getItem('role') !== 'ROLE_USER') {
        if (isMounted) navigate('/login');
        return;
      }

      try {
        const response = await api.get(`/pran/getcart/${username}`);
        if (isMounted) {
          setTotalAmount(response.data.totalPrice || 0);
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to load cart: ' + (error.response?.data?.message || error.message || 'Server error'));
        }
      }
    };
    fetchTotalAmount();

    return () => {
      isMounted = false;
    };
  }, [navigate, username]);

  const handlePayment = async () => {
    try {
      // Fetch Razorpay Key
      const keyResponse = await api.get('/pran/get-key');
      console.log('Razorpay key:', keyResponse.data);
      const key = keyResponse.data;

      // Create Razorpay order
      const orderResponse = await api.post('/pran/create-order', null, {
        params: { amount: Math.round(totalAmount) }
      });
      console.log('Order response:', orderResponse.data);
      const order = JSON.parse(orderResponse.data);

      // Razorpay options
      const options = {
        key: key,
        amount: order.amount,
        currency: 'INR',
        name: 'Pranayuv',
        description: 'Order Payment',
        order_id: order.id,
        handler: async function (response) {
          try {
            console.log('Payment response:', response);
            await api.post('/pran/payment-callback', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            setSuccess('Payment successful! Order placed.');
            setTimeout(() => navigate('/user/orders'), 2000);
          } catch (error) {
            setError('Payment verification failed: ' + (error.response?.data?.message || error.message || 'Server error'));
            console.error('Payment verification error:', error);
          }
        },
        prefill: {
          name: username,
          email: localStorage.getItem('email') || ''
        },
        theme: {
          color: '#1E3A8A'
        },
        modal: {
          ondismiss: function () {
            setError('Payment cancelled by user');
          }
        }
      };

      // Initialize Razorpay
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setError('Payment failed: ' + (response.error.description || 'Error'));
        console.error('Payment failed:', response.error);
      });
      rzp.open();
    } catch (error) {
      const errorMessage = error.response?.status === 401
        ? 'Unauthorized access. Please log in again.'
        : 'Failed to initiate payment: ' + (error.response?.data?.message || error.message || 'Server error');
      setError(errorMessage);
      console.error('Payment initiation error:', error);
    }
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Payment</h2>
        <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
          <p className="text-gray-600 mb-4">Total Amount: ₹{totalAmount.toFixed(2)}</p>
          <button
            onClick={handlePayment}
            className="bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-700 w-full"
            disabled={totalAmount <= 0}
          >
            Pay Now
          </button>
          {error && <p className="mt-4 text-red-600">{error}</p>}
          {success && <p className="mt-4 text-green-600">{success}</p>}
        </div>
      </div>
    </section>
  );
};

export default Payment;