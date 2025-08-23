import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>Leads Management</h1>
        <div className="header-actions">
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;