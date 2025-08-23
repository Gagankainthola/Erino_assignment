import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import authService from './auth';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // IMPORTANT: This sends cookies with requests
});

// Request interceptor (no need to add Authorization header for httpOnly cookies)
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
    console.log('With credentials (cookies):', config.withCredentials);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response successful for:', response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url
    });
    
    if (error.response?.status === 401) {
      console.log('401 Unauthorized - user session expired');
      authService.removeToken();
      authService.setAuthStatus(false);
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: async (credentials) => {
    try {
      console.log('Attempting login...');
      const response = await api.post('/auth/login', credentials);
      console.log('Login successful, response:', response.data);
      return response;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },
  register: (userData) => api.post('/auth/register', userData),
  logout: async () => {
    try {
      await api.post('/auth/logout'); // Call backend logout to clear cookie
      authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
      authService.logout(); // Force logout even if API call fails
    }
  }
};

// Leads APIs
export const leadsAPI = {
  getAll: async (params = {}) => {
    try {
      console.log('Fetching leads with cookies...');
      const response = await api.get('/leads', { params });
      console.log('Leads fetched successfully:', response.data?.length || 0, 'leads');
      return response;
    } catch (error) {
      console.error('Error fetching leads:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message
      });
      throw error;
    }
  },
  create: (leadData) => api.post('/leads', leadData),
  update: (id, leadData) => api.put(`/leads/${id}`, leadData),
  delete: (id) => api.delete(`/leads/${id}`),
};

export default api;