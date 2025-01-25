import React, { useEffect, useState } from 'react';
import './StudentJobOffers.css';

const JobOffers = () => {
  const [jobOffers, setJobOffers] = useState([]); // Job offers
  const [ setAppliedJobs] = useState([]); // Applied jobs

  useEffect(() => {
    const fetchJobOffersAndEligibility = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/student');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        const combinedData = data.jobOffers.map((job, index) => ({
          ...job,
          eligibilityCriteria: data.eligibilityCriteria[index] || {},
          jobDate: job.jobDate ? new Date(job.jobDate) : null,
        }));
        setJobOffers(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchJobOffersAndEligibility();
  }, []);

  const applyForJob = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/student/apply/${jobId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      // Add the job to applied jobs and mark the job as applied
      setAppliedJobs((prev) => [...prev, data.job]);
      setJobOffers((prev) =>
        prev.map((job) =>
          job._id === jobId ? { ...job, status: 'applied' } : job
        )
      );
    } catch (error) {
      console.error('Error applying for job:', error.message);
    }
  };

  return (
    <div className="job-offers">
      <h1>WELCOME BACK! <span role="img" aria-label="wave">👋</span></h1>
      <h2>Get Your Job <span role="img" aria-label="arrow">⬇️</span></h2>

      <div className="job-offers-container">
        {/* Job Offers Section */}
        <div className="job-details">
          <h3>Available Job Offers</h3>
          {jobOffers.length > 0 ? (
            jobOffers.map((job, index) => (
              <div key={index} className="job-item">
                <div><strong>Job Title:</strong> {job.jobTitle}</div>
                <div><strong>Company:</strong> {job.companyName}</div>
                <div><strong>Job Description:</strong> {job.jobDescription}</div>
                <div><strong>Salary:</strong> {job.salary}</div>
                <div><strong>Location:</strong> {job.location}</div>
                <div><strong>Job Type:</strong> {job.jobType}</div>
                <div>
                  <strong>Date:</strong> {job.jobDate ? job.jobDate.toLocaleDateString() : 'Date not available'}
                </div>
                {job.jobFile && (
                  <div>
                    <strong>Job File:</strong>
                    <a href={`http://localhost:5000${job.jobFile}`} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  </div>
                )}

                {/* Eligibility Criteria Section */}
                <div className="eligibility-criteria">
                  <h4>Eligibility Criteria</h4>
                  <div><strong>Minimum CGPA:</strong> {job.eligibilityCriteria.minCGPA}</div>
                  <div><strong>Backlogs Allowed:</strong> {job.eligibilityCriteria.backlogsAllowed ? 'Yes' : 'No'}</div>
                  <div><strong>Educational Qualification:</strong> {job.eligibilityCriteria.educationalQualification}</div>
                  <div><strong>Minimum Attendance:</strong> {job.eligibilityCriteria.minAttendance}%</div>
                  <div><strong>Required Certifications:</strong> {job.eligibilityCriteria.certifications || 'None'}</div>
                  <div><strong>Skills:</strong> {job.eligibilityCriteria.skills || 'None'}</div>
                  <div><strong>Soft Skills:</strong> {job.eligibilityCriteria.softSkills || 'None'}</div>
                  <div><strong>Extracurriculars:</strong> {job.eligibilityCriteria.extracurriculars || 'None'}</div>
                  <div><strong>Conduct:</strong> {job.eligibilityCriteria.conduct || 'Not Specified'}</div>
                </div>

                {/* Apply Button */}
                <button
                  className="apply-button"
                  onClick={() => applyForJob(job._id)}
                  disabled={job.status === 'applied'}
                >
                  {job.status === 'applied' ? 'APPLIED' : 'APPLY'}
                </button>
              </div>
            ))
          ) : (
            <p>No job offers available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobOffers;
