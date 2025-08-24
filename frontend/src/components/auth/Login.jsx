  import React, { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { authAPI } from '../../services/api';
  import authService from '../../services/auth';

  const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
      setError('');
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
        console.log('Attempting login with:', formData.email);
        const response = await authAPI.login(formData);
        
        console.log('Login response status:', response.status);
        console.log('Login response data:', response.data);
        
        // For httpOnly cookies, successful login (200) means cookie is set automatically
        if (response.status === 200 && response.data.token) {
  authService.setToken(response.data.token);
  console.log('Token saved, navigating to /leads');
  navigate('/leads');
} else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
        
      } catch (error) {
        console.error('Login error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        
        // More specific error handling
        if (error.response?.status === 401) {
          setError('Invalid email or password');
        } else if (error.response?.status === 400) {
          setError(error.response?.data?.message || 'Invalid request');
        } else if (!error.response) {
          setError('Cannot connect to server. Make sure backend is running on port 5000.');
        } else {
          setError(error.response?.data?.message || 'Login failed. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="form-container">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '20px' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="form-link">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    );
  };

  export default Login;