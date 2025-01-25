import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import './PostJobOffer.css';

const AdminForm = () => {
  const [formData, setFormData] = useState({
    jobDetails: {
      jobTitle: '',
      companyName: '',
      jobDescription: '',
      salary: '',
      location: '',
      jobType: '',
      jobCategory: '',
      jobDate:'',
      jobFile: null,
    },
    eligibilityCriteria: {
      minCGPA: '',
      backlogsAllowed: false,
      educationalQualification: '',
      minAttendance: '',
      certifications: '',
      skills: '',
      softSkills: '',
      extracurriculars: '',
      conduct: '',
      registrationRequired: false,
      placementTests: '',
      branchStream: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e, section) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { jobDetails, eligibilityCriteria } = formData;

    // Log form data for debugging
    console.log('Form data before submission:', formData);

    // Validate required fields
    const requiredFields = ['jobTitle', 'companyName', 'jobDescription', 'salary', 'location', 'jobType', 'jobCategory', 'jobFile'];
    for (const field of requiredFields) {
      if (!jobDetails[field]) {
        toast.error(`Missing required field: ${field}`);
        return;
      }
    }

    setLoading(true);

    const formDataToSend = new FormData();

    // Append job details (without jobFile as it’s handled separately)
    Object.entries(jobDetails).forEach(([key, value]) => {
      if (key !== 'jobFile') formDataToSend.append(key, value);
    });
    formDataToSend.append('jobFile', jobDetails.jobFile); // Append file separately

    // Append eligibility criteria
    Object.entries(eligibilityCriteria).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Log FormData entries for debugging
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/post-job', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Job and eligibility criteria posted successfully!');
        resetForm();
      } else {
        toast.error(result.error || 'Something went wrong!');
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      jobDetails: {
        jobTitle: '',
        companyName: '',
        jobDescription: '',
        salary: '',
        location: '',
        jobType: '',
        jobCategory: '',
        jobDate:'',
        jobFile: null,
      },
      eligibilityCriteria: {
        minCGPA: '',
        backlogsAllowed: false,
        educationalQualification: '',
        minAttendance: '',
        certifications: '',
        skills: '',
        softSkills: '',
        extracurriculars: '',
        conduct: '',
        registrationRequired: false,
        placementTests: '',
        branchStream: '',
      },
    });
    document.getElementById('jobFile').value = null; // Clear file input
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="admin-form-container">
      <ToastContainer />
      {loading && <div className="loading-overlay">Submitting...</div>}
      <div className="heading-container">
        <FaArrowLeft className="back-icon" onClick={goBack} />
        <h2 className="admin-form-heading">Post a New Job and Set Eligibility Criteria</h2>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h3>Job Details</h3>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobDetails.jobTitle}
              onChange={(e) => handleChange(e, 'jobDetails')}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.jobDetails.companyName}
              onChange={(e) => handleChange(e, 'jobDetails')}
              required
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDetails.jobDescription}
              onChange={(e) => handleChange(e, 'jobDetails')}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.jobDetails.salary}
              onChange={(e) => handleChange(e, 'jobDetails')}
              required
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.jobDetails.location}
              onChange={(e) => handleChange(e, 'jobDetails')}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="jobType">Job Type</label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobDetails.jobType}
              onChange={(e) => handleChange(e, 'jobDetails')}
              required
            >
              <option value="">Select Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="jobCategory">Job Category</label>
            <select
              id="jobCategory"
              name="jobCategory"
              value={formData.jobDetails.jobCategory}
              onChange={(e) => handleChange(e, 'jobDetails')}
              required
            >
              <option value="">Select</option>
              <option value="service">Service Based</option>
              <option value="product">Product Based</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="jobdate">Date</label>
            <input             
              type="date"
              id="jobDate"
              name="jobDate"
              value={formData.jobDetails.jobDate}
              onChange={(e) => handleChange(e, 'jobDetails')}
              required 
            />
          </div>
          </div>
          <div className="input-row">
          <div className="input-group">
            <label htmlFor="jobFile">Job File</label>
            <input
              type="file"
              id="jobFile"
              name="jobFile"
              accept=".pdf" // Optional: Limit to specific file types
              onChange={(e) => handleChange(e, 'jobDetails')}
              required
            />
          </div>
        </div>

        
        <h3>Eligibility Criteria</h3>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="minCGPA">Minimum CGPA</label>
            <input
              type="number"
              id="minCGPA"
              name="minCGPA"
              value={formData.eligibilityCriteria.minCGPA}
              onChange={(e) => handleChange(e, 'eligibilityCriteria')}
            />
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="backlogsAllowed"
              name="backlogsAllowed"
              checked={formData.eligibilityCriteria.backlogsAllowed}
              onChange={(e) => handleChange(e, 'eligibilityCriteria')}
            />
            <label htmlFor="backlogsAllowed">Allow Backlogs</label>
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="educationalQualification">Educational Qualification</label>
            <input
              type="text"
              id="educationalQualification"
              name="educationalQualification"
              value={formData.eligibilityCriteria.educationalQualification}
              onChange={(e) => handleChange(e, 'eligibilityCriteria')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="minAttendance">Minimum Attendance (%)</label>
            <input
              type="number"
              id="minAttendance"
              name="minAttendance"
              value={formData.eligibilityCriteria.minAttendance}
              onChange={(e) => handleChange(e, 'eligibilityCriteria')}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="certifications">Required Certifications</label>
            <input
              type="text"
              id="certifications"
              name="certifications"
              value={formData.eligibilityCriteria.certifications}
              onChange={(e) => handleChange(e, 'eligibilityCriteria')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="skills">Technical Skills</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.eligibilityCriteria.skills}
              onChange={(e) => handleChange(e, 'eligibilityCriteria')}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="softSkills">Soft Skills</label>
            <input
              type="text"
              id="softSkills"
              name="softSkills"
              value={formData.eligibilityCriteria.softSkills}
              onChange={(e) => handleChange(e, 'eligibilityCriteria')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="extracurriculars">Extracurricular Activities</label>
            <input
              type="text"
              id="extracurriculars"
              name="extracurriculars"
              value={formData.eligibilityCriteria.extracurriculars}
              onChange={(e) => handleChange(e, 'eligibilityCriteria')}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="conduct">Behavioral Conduct</label>
            <input
              type="text"
              id="conduct"
              name="conduct"
              value={formData.eligibilityCriteria.conduct}
              onChange={(e) => handleChange(e, 'eligibilityCriteria')}
            />
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="registrationRequired"
              name="registrationRequired"
              checked={formData.eligibilityCriteria.registrationRequired}
              onChange={(e) => handleChange(e, 'eligibilityCriteria')}
            />
            <label htmlFor="registrationRequired">Registration Required</label>
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="placementTests">Placement Tests</label>
            <input
              type="text"
              id="placementTests"
              name="placementTests"
              value={formData.eligibilityCriteria.placementTests}
              onChange={(e) => handleChange(e, 'eligibilityCriteria')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="branchStream">Eligible Branch/Stream</label>
            <input
              type="text"
              id="branchStream"
              name="branchStream"
              value={formData.eligibilityCriteria.branchStream}
              onChange={(e) => handleChange(e, 'eligibilityCriteria')}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Post Job</button>
          <button type="button" className="reset-btn" onClick={resetForm}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;