import React, { useState } from 'react';

const AddSubEventPopup = ({ show, onClose, onSubmit }) => {
  const [subEventTitle, setSubEventTitle] = useState('');

  const handleChange = (e) => {
    setSubEventTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(subEventTitle);
    setSubEventTitle('');
    onClose();
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Add Sub Event</h3>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="sub-event-title" className="form-label">Sub Event Title:</label>
                <input type="text" className="form-control" id="sub-event-title" value={subEventTitle} onChange={handleChange} />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Add</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubEventPopup;

