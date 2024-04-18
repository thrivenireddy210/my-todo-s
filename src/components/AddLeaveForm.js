import React, { useState } from 'react';

const AddLeaveForm = ({ onSubmit }) => {
  const [leaveData, setLeaveData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    type: 'planned',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(leaveData);
    setLeaveData({
      name: '',
      startDate: '',
      endDate: '',
      type: 'planned',
    });
  };

  return (
    <div className="add-leave-form">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="leaveName" className="form-label">Name:</label>
          <input type="text" className="form-control" id="leaveName" name="name" value={leaveData.name} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label htmlFor="startDate" className="form-label">Start Date:</label>
          <input type="date" className="form-control" id="startDate" name="startDate" value={leaveData.startDate} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label htmlFor="endDate" className="form-label">End Date:</label>
          <input type="date" className="form-control" id="endDate" name="endDate" value={leaveData.endDate} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label htmlFor="leaveType" className="form-label">Type:</label>
          <select className="form-select" id="leaveType" name="type" value={leaveData.type} onChange={handleChange}>
            <option value="planned">Planned</option>
            <option value="unplanned">Unplanned</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddLeaveForm;
