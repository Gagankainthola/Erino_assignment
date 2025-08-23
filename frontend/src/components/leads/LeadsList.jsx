import React, { useState, useEffect, useCallback } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { leadsAPI } from '../../services/api';
import LeadModal from './LeadModal';
const LeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [gridApi, setGridApi] = useState(null);

const fetchLeads = useCallback(async () => {
  setLoading(true);
  setError('');
  try {
    console.log('Starting to fetch leads...');
    const response = await leadsAPI.getAll();
    console.log('Leads response:', response.data);
    setLeads(Array.isArray(response.data.data) ? response.data.data : []);
  } catch (error) {
    console.error('Error fetching leads:', error);
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Failed to fetch leads. Please check if the backend server is running on port 5000.';
    setError(errorMessage);
    setLeads([]);
  } finally {
    setLoading(false);
  }
}, []);


  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleCreateLead = () => {
    setEditingLead(null);
    setIsModalOpen(true);
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const handleDeleteLead = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadsAPI.delete(leadId);
        fetchLeads();
      } catch (error) {
        console.error('Error deleting lead:', error);
        const errorMessage = error.response?.data?.message || 'Error deleting lead';
        alert(errorMessage);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingLead(null);
  };

  const handleLeadSaved = () => {
    fetchLeads();
    handleModalClose();
  };

  
  if (error) {
    return (
      <div className="container">
        <div className="page-header">
          <h2>Leads Management</h2>
          <button onClick={handleCreateLead} className="btn btn-success">
            Create Lead
          </button>
        </div>
        
        <div style={{ 
          padding: '20px', 
          background: '#f8d7da', 
          border: '1px solid #f5c6cb', 
          borderRadius: '8px',
          color: '#721c24',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <h4>Error Loading Leads</h4>
          <p>{error}</p>
          <button onClick={fetchLeads} className="btn btn-primary" style={{ marginTop: '10px' }}>
            Retry
          </button>
        </div>

        {isModalOpen && (
          <LeadModal
            lead={editingLead}
            onClose={handleModalClose}
            onSave={handleLeadSaved}
          />
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h2>Leads Management</h2>
        <button onClick={handleCreateLead} className="btn btn-success">
          Create Lead
        </button>
      </div>

      {isModalOpen && (
        <LeadModal
          lead={editingLead}
          onClose={handleModalClose}
          onSave={handleLeadSaved}
        />
      )}
      <div className="container"> <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}> Leads List </h2> {leads.length === 0 ? ( <p style={{ textAlign: "center", color: "#666" }}>No leads found</p> ) : ( <div className="leads-list"> {leads.map((lead) => ( <div className="lead-card" key={lead._id}> <h3>{lead.first_name} {lead.last_name}</h3> <p><strong>Email:</strong> {lead.email}</p> <p><strong>Phone:</strong> {lead.phone}</p> <p><strong>Source:</strong> {lead.source}</p> <p><strong>Status:</strong> {lead.status}</p> <p><strong>Created:</strong> {new Date(lead.createdAt).toLocaleDateString()}</p> </div> ))} </div> )} </div>
    </div>
  );
};

export default LeadsList;