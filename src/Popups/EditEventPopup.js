import React, { useState } from 'react';

const EditEventPopup = ({ event, onSave, onClose }) => {
  const [editedEvent, setEditedEvent] = useState(event);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(editedEvent);
    onClose();
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Event</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={editedEvent.title} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="start" className="form-label">Start Date</label>
                <input type="datetime-local" className="form-control" id="start" name="start" value={editedEvent.start} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="end" className="form-label">End Date</label>
                <input type="datetime-local" className="form-control" id="end" name="end" value={editedEvent.end} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="priority" className="form-label">Priority</label>
                <select className="form-select" id="priority" name="priority" value={editedEvent.priority} onChange={handleChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventPopup;
