import React, { createContext, useState, useEffect } from 'react';
import api from '../lib/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await api.get('/users/me');
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setError(null);
      await api.post('/register', userData);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      return false;
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      setError(null);
      const res = await api.post('/users/login', userData);
      setUser(res.data.user);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      return false;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await api.post('/logout');
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Delete account
  const deleteAccount = async () => {
    try {
      await api.delete('/users/me');
      setUser(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting account');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        deleteAccount,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};