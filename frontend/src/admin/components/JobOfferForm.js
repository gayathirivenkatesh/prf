import React from 'react';
import { useNavigate } from 'react-router-dom';
import './JobOfferForm.css';

function JobOfferForm() {
  const navigate = useNavigate();

  return (
    <div className="job-offer-form">
      <h1>Add New Job Offers</h1>
      <div className="job-options">
        <div className="option">
          <button onClick={() => navigate('/post-job')}>Post Job Offers</button>
        </div>
        <div className="option">
          <button onClick={() => navigate('/update-job-description')}>Update Job Description</button>
        </div>
        <div className="option">
          <button onClick={() => navigate('/view-all-job-offers')}>View All Job Offers</button>
        </div>
        <div className="option">
          <button onClick={() => navigate('/delete-job-offer')}>Delete Job Offers</button>
        </div>
      </div>
    </div>
  );
}

export default JobOfferForm;
