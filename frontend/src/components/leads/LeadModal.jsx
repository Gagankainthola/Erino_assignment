import React from 'react';
import LeadForm from './LeadsForm.jsx';

const LeadModal = ({ lead, onClose, onSave }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{lead ? 'Edit Lead' : 'Create Lead'}</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>      
        
        <LeadForm
          lead={lead}
          onSave={onSave}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default LeadModal;