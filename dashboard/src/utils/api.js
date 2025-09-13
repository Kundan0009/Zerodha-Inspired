import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const apiService = {
  // Holdings
  getAllHoldings: () => api.get('/allHoldings'),
  addHoldings: () => api.get('/addHoldings'),

  // Positions
  getAllPositions: () => api.get('/allPositions'),
  addPositions: () => api.get('/addPositions'),

  // Orders
  getAllOrders: () => api.get('/allOrders'),
  createOrder: (orderData) => api.post('/newOrder', orderData),

  // Health check
  healthCheck: () => api.get('/health'),
};

export default api;