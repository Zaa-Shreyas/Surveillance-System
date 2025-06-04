import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectPlan = async (plan) => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    console.log('Token sent in request:', token);
    try {
      const response = await fetch('http://localhost:5000/api/auth/subscribe', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });
      const data = await response.json();
      if (response.ok) {
        if (fetchUserProfile) {
          await fetchUserProfile(token);
        }
        navigate('/dashboard');
      } else {
        if (data.message === 'Token is not valid') {
          localStorage.removeItem('token'); // Clear the invalid token
          navigate('/login'); // Redirect to login
          setError('Session expired. Please log in again.');
        } else {
          setError(data.message || 'Failed to select plan');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="min-h-screen bg-[#333446] flex flex-col justify-center items-center p-8"
    >
      <h1 className="text-4xl font-bold text-white mb-8">Choose Your Subscription Plan</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Free Plan */}
        <motion.div
          className="bg-[#EAEFEF] p-6 rounded-xl shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-[#333446] mb-4">Free Plan</h2>
          <p className="text-gray-600 mb-4">Limited access to features</p>
          <ul className="text-left text-gray-600 mb-6">
            <li className="mb-2">✓ 1 device connection</li>
            <li className="mb-2">✓ Live feed access</li>
            <li className="mb-2">✗ Cloud storage</li>
            <li className="mb-2">✗ Advanced analytics</li>
          </ul>
          <motion.button
            onClick={() => handleSelectPlan('Free')}
            disabled={loading}
            className={`w-full bg-[#7F8CAA] text-white p-4 rounded-xl font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Processing...' : 'Select Free Plan'}
          </motion.button>
        </motion.div>
        {/* Premium Plan */}
        <motion.div
          className="bg-[#EAEFEF] p-6 rounded-xl shadow-lg border-2 border-[#7F8CAA]"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-[#333446] mb-4">Premium Plan</h2>
          <p className="text-gray-600 mb-4">Full access to all features</p>
          <ul className="text-left text-gray-600 mb-6">
            <li className="mb-2">✓ Unlimited device connections</li>
            <li className="mb-2">✓ Live feed access</li>
            <li className="mb-2">✓ Cloud storage</li>
            <li className="mb-2">✓ Advanced analytics</li>
          </ul>
          <motion.button
            onClick={() => handleSelectPlan('Premium')}
            disabled={loading}
            className={`w-full bg-[#7F8CAA] text-white p-4 rounded-xl font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Processing...' : 'Select Premium Plan'}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Subscription;