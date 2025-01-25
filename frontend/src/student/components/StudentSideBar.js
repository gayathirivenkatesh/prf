import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './StudentSideBar.css';

function StudentSideBar() {
  return (
    <div className="sidebar open">
      <nav>
        <ul>
          <li>
            <Link to="/student-home">
              <FontAwesomeIcon icon={faHome} className="icon" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/student-job-offers">
              <FontAwesomeIcon icon={faBriefcase} className="icon" />
              Job Offers
            </Link>
          </li>
          <li>
            <Link to="/student-placement-status">
              <FontAwesomeIcon icon={faChartLine} className="icon" />
              Placement Status
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default StudentSideBar;
