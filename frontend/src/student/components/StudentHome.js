import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import './StudentHome.css';

const Home = () => {
  const [upcomingCompanies, setUpcomingCompanies] = useState([]);
  const [appliedCompanies, setAppliedCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Determine the time-based greeting
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('GOOD MORNING');
    } else if (hours < 18) {
      setGreeting('GOOD AFTERNOON');
    } else {
      setGreeting('GOOD EVENING');
    }

    // Fetch company data
    const fetchCompanyData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/student');
        if (!response.ok) {
          throw new Error('Failed to fetch company details.');
        }
        const data = await response.json();
        setUpcomingCompanies(data.jobOffers.filter((job) => job.status === 'upcoming'));
        setAppliedCompanies(data.jobOffers.filter((job) => job.status === 'applied'));
      } catch (err) {
        setError('Failed to load company details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const handleRegister = (companyId) => {
    console.log(`View details or register for company ID: ${companyId}`);
    // Implement navigation or registration logic
  };

  return (
    <div className="home-container">
      <h1>
        {greeting}! <span role="img" aria-label="smile">😊</span>
      </h1>

      <div className="cards-container">
        {/* Upcoming Companies */}
        <div className="card upcoming">
          <h2 className="section-title">UPCOMING COMPANIES</h2>
          {upcomingCompanies.length > 0 ? (
            upcomingCompanies.map((company) => (
              <div key={company._id} className="company-detail">
                <div className="company-name">{company.companyName}</div>
                <div className="company-type">
                  <FontAwesomeIcon icon={faBuilding} className="icon" /> {company.jobType}
                </div>
                <div className="company-ctc">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="icon" /> {company.salary}
                </div>
                <button
                  className="status-button"
                  onClick={() => handleRegister(company._id)}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No upcoming companies available at the moment.</p>
          )}
        </div>

        {/* Applied Companies */}
        <div className="card applied">
          <h2 className="section-title">COMPANIES APPLIED</h2>
          {appliedCompanies.length > 0 ? (
            appliedCompanies.map((company) => (
              <div key={company._id} className="company-detail">
                <div className="company-name">{company.companyName}</div>
                <div className="company-type">
                  <FontAwesomeIcon icon={faBuilding} className="icon" /> {company.jobCategory}
                </div>
                <div className="company-ctc">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="icon" /> {company.salary}
                </div>
              </div>
            ))
          ) : (
            <p>No companies applied yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
