import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PlacementStatus.css';

function PlacementStatus() {
  const navigate = useNavigate();

  return (
    <div className="placement-status">
      <h1>VIEW PLACEMENT</h1>
      <div className="placement-options">
        <div className="option">
          <button onClick={() => navigate('/student-details')}>View Students Details</button>
        </div>
        <div className="option">
          <button onClick={() => navigate('/student-status')}>Update Placement Status</button>
        </div>
        <div className="option">
          <button onClick={() => navigate('/record-feedback')}>Record Students Feedback</button>
        </div>
      </div>
    </div>
  );
}

export default PlacementStatus;
