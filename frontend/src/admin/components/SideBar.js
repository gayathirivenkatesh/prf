import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faChartBar, faUsers } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css';

function SideBar() {
  return (
    <div className="sidebar open"> {/* Sidebar is always open */}
      <nav>
        <ul>
          <li>
            <Link to="/home">
              <FontAwesomeIcon icon={faHome} className="icon" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/job-offers">
              <FontAwesomeIcon icon={faBriefcase} className="icon" />
              Job Offers
            </Link>
          </li>
          <li>
            <Link to="/placement-status">
              <FontAwesomeIcon icon={faChartBar} className="icon" />
              Placement Status
            </Link>
          </li>
          <li>
            <Link to="/student-applied">
              <FontAwesomeIcon icon={faUsers} className="icon" />
              Students Applied
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
