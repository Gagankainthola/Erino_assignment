import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import LeadsList from './components/leads/LeadsList';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Header from './components/layout/Header';
import authService from './services/auth';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/leads"
            element={
              <ProtectedRoute>
                <Header />
                <LeadsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              authService.isAuthenticated() ? (
                <Navigate to="/leads" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
