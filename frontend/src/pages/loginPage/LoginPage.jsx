import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import apiClient from '../api/apiClient';
import { signin } from '../../api/userApis';
import { UserContext } from '../../context/UserContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
 
  const {login}  = useContext(UserContext)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Both email and password are required.');
      setLoading(false);
      return;
    }

    try {
   
      const response = await signin(formData)
      console.log(response)
     login(response)
      
    
      
  
      navigate('/home'); // Redirect to dashboard page after login
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700">Login</h1>

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
