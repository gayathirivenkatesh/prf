import React from 'react';
import './ConfirmPlacement.css';

function ConfirmPlacement() {
  return (
    <div className="confirm-placement">
      <h1>Placement Confirmation</h1>
      <div className="placement-actions">
        <div className="action">
          <button>Review Placement Details</button>
        </div>
        <div className="action">
          <button>Confirm with Company</button>
        </div>
        <div className="action">
          <button>Notify Student</button>
        </div>
        <div className="action">
          <button>Send Confirmation</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPlacement;
