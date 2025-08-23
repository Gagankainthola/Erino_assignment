// src/components/leads/LeadForm.js
// Replace your existing LeadForm.js with this version

import React, { useState } from 'react';
import { leadsAPI } from '../../services/api';
import { LEAD_STATUS_OPTIONS } from '../../utils/constants';

const LeadForm = ({ lead, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: lead?.first_name || '',
    last_name: lead?.last_name || '',
    email: lead?.email || '',
    phone: lead?.phone || '',
    source: lead?.source || '',
    status: lead?.status || 'new'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      console.log('Submitting lead data:', formData);
      if (lead) {
        await leadsAPI.update(lead._id, formData);
      } else {
        await leadsAPI.create(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving lead:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to save lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

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
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="source">Source:</label>
        <select
          id="source"
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">Select Source</option>
          <option value="website">Website</option>
          <option value="social_media">Social Media</option>
          <option value="referral">Referral</option>
          <option value="cold_call">Cold Call</option>
          <option value="email_campaign">Email Campaign</option>
          <option value="trade_show">Trade Show</option>
          <option value="advertisement">Advertisement</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="form-control"
          required
        >
          {LEAD_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="modal-footer">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default LeadForm;