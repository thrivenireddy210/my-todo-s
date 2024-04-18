import React, { useState } from 'react';
import { Plus } from 'react-bootstrap-icons';

const AddEventPopup = ({ show, onClose, onSubmit }) => {
  const [eventData, setEventData] = useState({
    title: '',
    start: '',
    end: '',
    priority: 'medium', 
    subEvents: [''], 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleAddSubEvent = () => {
    setEventData((prevState) => ({
      ...prevState,
      subEvents: [...prevState.subEvents, ''],
    }));
  };

  const handleSubEventChange = (index, value) => {
    const updatedSubEvents = [...eventData.subEvents];
    updatedSubEvents[index] = value;
    setEventData({
      ...eventData,
      subEvents: updatedSubEvents,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(eventData);
    setEventData({
      title: '',
      start: '',
      end: '',
      priority: 'medium', 
      subEvents: [''],
    });
    onClose();
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Create Event</h3>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="event-title" className="form-label custom-label">Event Title</label>
                <input type="text" className="form-control" id="event-title" name="title" value={eventData.title} onChange={handleChange} />
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="event-start" className="form-label custom-label">Start Time</label>
                  <input type="datetime-local" className="form-control" id="event-start" name="start" value={eventData.start} onChange={handleChange} />
                </div>
                <div className="col">
                  <label htmlFor="event-end" className="form-label custom-label">End Time</label>
                  <input type="datetime-local" className="form-control" id="event-end" name="end" value={eventData.end} onChange={handleChange} />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="event-priority" className="form-label custom-label">Priority</label>
                <select className="form-select" id="event-priority" name="priority" value={eventData.priority} onChange={handleChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="event-sub-events" className="form-label custom-label ">Sub Events</label>
                {eventData.subEvents.map((subEvent, index) => (
                  <div key={index} className="input-group mb-2">
                    <input type="text" className="form-control" value={subEvent} onChange={(e) => handleSubEventChange(index, e.target.value)} />
                    {index === eventData.subEvents.length - 1 && (
                     <button type="button" className="btn btn-outline-secondary btn-rounded" onClick={handleAddSubEvent}>
                     <Plus size={30} />
                   </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Create</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventPopup;
