import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './NavBar.css'; // Different CSS file

const AdminNavBar = ({onLogout}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to toggle dropdown visibility
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    onLogout(); // Reset the login state
    setDropdownVisible(false); // Hide dropdown
    navigate('/'); // Redirect to login page
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  const handleProfile = () => {
    setDropdownVisible(false); // Hide dropdown
    navigate('/admin-profile'); // Navigate to the admin profile page
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-left">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3eKBrpJqokqflN1N3ooSWWLBb7H9zXgkr2-qSf0wWfOPHYQ64iMeS4pDY-z6CpQJeA&usqp=CAU" 
          alt="Logo" 
          className="admin-logo" 
        />
      </div>
      <div className="admin-navbar-right">
        <FontAwesomeIcon icon={faBell} className="admin-icon" />
        <FontAwesomeIcon icon={faUserCircle} className="admin-user-icon" />
        <span className="admin-user" onClick={toggleDropdown}>Rejina</span>
        {dropdownVisible && (
          <div className="admin-dropdown">
            <button className="admin-dropdown-item" onClick={handleProfile}>
              <FontAwesomeIcon icon={faUser} className="admin-dropdown-icon" />
              Profile
            </button>
            <button className="admin-dropdown-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="admin-dropdown-icon" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavBar;
