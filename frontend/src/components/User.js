import React from 'react';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const username = localStorage.getItem('username') || 'User';
  const navigate = useNavigate();

  if (!localStorage.getItem('credentials')) {
    navigate('/login');
    return null;
  }

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">User Profile</h2>
        <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Welcome, {username}!</h3>
          <p className="text-gray-600">User profile or account details will go here.</p>
        </div>
      </div>
    </section>
  );
};

export default User;