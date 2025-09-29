import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// NOTE: Context removed; call API directly
import axios from 'axios';
import { API_BASE_URL } from '../lib/config';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
    return () => setError(null);
  }, [user, navigate, setError]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setError(null);
      await axios.post(`${API_BASE_URL}/users/register`, { username: formData.username, email: formData.email, password: formData.password }, { withCredentials: true });
      navigate('/login');
    } catch (e) {
      setError(e.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Register</h1>
          {error && <div className="mb-4 rounded border border-red-200 bg-red-50 text-red-700 p-3 text-sm">{error}</div>}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                value={formData.username} 
                onChange={onChange} 
                required 
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 text-base" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={onChange} 
                required 
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 text-base" 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={onChange} 
                required 
                minLength="6" 
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 text-base" 
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={onChange} 
                required 
                minLength="6" 
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 text-base" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-2 px-4 rounded-md bg-slate-800 text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 font-medium text-base"
            >
              Register
            </button>
          </form>
          <p className="mt-6 text-sm text-slate-600 text-center">
            Already have an account? <Link to="/login" className="text-blue-700 font-medium hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

