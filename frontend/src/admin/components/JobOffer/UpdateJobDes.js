import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './UpdateJobDes.css';

const AdminUpdateJob = ({ jobId }) => {
  const [jobDetails, setJobDetails] = useState({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    salary: '',
    location: '',
    jobType: '',
    jobFile: ''
  });

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`a/api/jobs/${jobId}`);
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setJobDetails((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(jobDetails).forEach((key) => {
        formData.append(key, jobDetails[key]);
      });

      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        console.log('Job updated successfully');
        // Add any additional success handling
      } else {
        console.error('Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleReset = () => {
    setJobDetails({
      jobTitle: '',
      companyName: '',
      jobDescription: '',
      salary: '',
      location: '',
      jobType: '',
      jobFile: ''
    });
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="admin-update-job-container">
      <div className="form-header">
        <FaArrowLeft className="back-icon" onClick={goBack} />
        <h2 className="form-heading">Update Job Details</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="jobTitle">Job Title</label>
            <input type="text" id="jobTitle" name="jobTitle" value={jobDetails.jobTitle} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="companyName">Company Name</label>
            <input type="text" id="companyName" name="companyName" value={jobDetails.companyName} onChange={handleChange} required />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea id="jobDescription" name="jobDescription" value={jobDetails.jobDescription} onChange={handleChange} required></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="salary">Salary</label>
            <input type="number" id="salary" name="salary" value={jobDetails.salary} onChange={handleChange} required />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" value={jobDetails.location} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="jobType">Job Type</label>
            <input type="text" id="jobType" name="jobType" value={jobDetails.jobType} onChange={handleChange} required />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="jobFile">Upload Job Description (PDF)</label>
            <input type="file" id="jobFile" name="jobFile" value={jobDetails.jobFile} onChange={handleChange} required />

          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Update Job</button>
          <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default AdminUpdateJob;
