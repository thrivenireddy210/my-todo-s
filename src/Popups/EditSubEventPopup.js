import React, { useState, useEffect } from 'react';

const EditSubEventPopup = ({ show, onClose, subEvent, onSubmit }) => {
  const [editedSubEventTitle, setEditedSubEventTitle] = useState('');

  useEffect(() => {
    setEditedSubEventTitle(subEvent.title);
  }, [subEvent]);

  const handleChange = (e) => {
    setEditedSubEventTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(subEvent.id, editedSubEventTitle);
    onClose();
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Edit Sub Event</h3>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="edited-sub-event-title" className="form-label">Sub Event Title:</label>
                <input type="text" className="form-control" id="edited-sub-event-title" value={editedSubEventTitle} onChange={handleChange} />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubEventPopup;
