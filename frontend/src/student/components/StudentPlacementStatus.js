import React, { useState, useEffect } from 'react';
import './StudentPlacementStatus.css';

const StudentPlacementStatus = () => {
  const [companyDetails, setCompanyDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data (replace with your API call)
    const fetchCompanyDetails = async () => {
      setLoading(true);
      const data = [
        { id: 1, name: 'TechCorp', title: 'Software Engineer', startDate: '2025-01-15' },
        { id: 2, name: 'Innovate Solutions', title: 'Data Analyst', startDate: '2025-02-01' },
      ];
      setCompanyDetails(data);
      setLoading(false);
    };

    fetchCompanyDetails();
  }, []);

  return (
    <div className="placement-status-container">
      <h1>Get Your Updates Here!</h1>

      <div className="company-details">
        <h2>Company Details</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          companyDetails.map((company) => (
            <div key={company.id} className="company-info">
              <p><strong>Company:</strong> {company.name}</p>
              <p><strong>Title:</strong> {company.title}</p>
              <p><strong>Start Date:</strong> {company.startDate}</p>
            </div>
          ))
        )}
      </div>

      <div className="placement-details">
        <div className="placement-card">
          <h2>Check Your Placement Details Here!</h2>
          <button onClick={() => alert('Navigating to placement details!')}>Check Now</button>
        </div>
      </div>
    </div>
  );
};

export default StudentPlacementStatus;
