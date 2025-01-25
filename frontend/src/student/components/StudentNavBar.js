import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './StudentNavBar.css';

const StudentNavBar = ({ onLogout, userName = "Guest" }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to toggle dropdown visibility
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    onLogout(); // Reset the login state
    setDropdownVisible(false); // Hide dropdown
    navigate('/'); // Redirect to login page
  };

  const handleProfile = () => {
    console.log("Navigating to profile...");
    setDropdownVisible(false);
    navigate('/student-profile');
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Close dropdown on outside click or Escape key press
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.dropdown') && !e.target.closest('.user')) {
        setDropdownVisible(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') setDropdownVisible(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3eKBrpJqokqflN1N3ooSWWLBb7H9zXgkr2-qSf0wWfOPHYQ64iMeS4pDY-z6CpQJeA&usqp=CAU" 
          alt="College Logo" 
          className="logo" 
        />
      </div>
      <div className="navbar-right">
        <FontAwesomeIcon icon={faBell} className="icon" />
        <FontAwesomeIcon icon={faUserCircle} className="icon user-icon" />
        <span 
          className="user" 
          onClick={toggleDropdown}
          role="button"
          aria-haspopup="true"
          aria-expanded={dropdownVisible}
        >
          {userName}
        </span>
        {dropdownVisible && (
          <div className="dropdown">
            <button className="dropdown-item" onClick={handleProfile}>
              <FontAwesomeIcon icon={faUser} className="dropdown-icon" />
              Profile
            </button>
            <button className="dropdown-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="dropdown-icon" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default StudentNavBar;
