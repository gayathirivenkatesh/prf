import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ReviewTitles.css';

const ReviewJobTitles = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    reviewAction: '',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review Submitted:', formData);
    // Send formData to the backend here
  };

  const handleReset = () => {
    setFormData({
      jobTitle: '',
      companyName: '',
      reviewAction: '',
      comments: '',
    });
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="review-job-titles-container">
      <div className="form-header">
        <FaArrowLeft className="back-icon" onClick={goBack} />
        <h2 className="form-heading">Admin Job Title Review</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Enter the job title"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter the company name"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="reviewAction">Action</label>
          <select
            id="reviewAction"
            name="reviewAction"
            value={formData.reviewAction}
            onChange={handleChange}
            required
          >
            <option value="">Select an action</option>
            <option value="approve">Approve</option>
            <option value="reject">Reject</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="comments">Comments</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Optional comments"
            rows="4"
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Submit Review</button>
          <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewJobTitles;
