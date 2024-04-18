import React from 'react';
import AddLeaveForm from '../components/AddLeaveForm';

const AddLeavePopup = ({ show, onClose, onSubmit }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Leave</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <AddLeaveForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLeavePopup;
