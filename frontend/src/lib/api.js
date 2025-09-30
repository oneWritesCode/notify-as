// NOTE: This helper is not used anymore; direct axios calls are used in pages.
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

export default api;

