import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './admin/components/NavBar';
import SideBar from './admin/components/SideBar';
import Home from './admin/components/Home';
import AdminProfile from './admin/components/AdminProfile';
import JobOfferForm from './admin/components/JobOfferForm';
import PostJob from './admin/components/JobOffer/PostJoboffer';
import UpdateJobDescription from './admin/components/JobOffer/UpdateJobDes';
import ReviewJobTitles from './admin/components/JobOffer/ReviewTitles';
import PlacementStatus from './admin/components/PlacementStatus';
import StudentStatus from './admin/components/Placement/StudentStatus';
import StudentDetails from './admin/components/Placement/StudentDetails';
import RecordFeedback from './admin/components/Placement/RecordFeedback';
import ConfirmPlacement from './admin/components/ConfirmPlacement';
import StudentApplied from './admin/components/StudentApplied';

import StudentNavBar from './student/components/StudentNavBar';
import StudentHome from './student/components/StudentHome';
import StudentJobOffers from './student/components/StudentJobOffers';
import StudentPlacementStatus from './student/components/StudentPlacementStatus';
import StudentSideBar from './student/components/StudentSideBar';
import StudentProfile from './student/components/StudentProfile';

import Login from './LoginForm';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole('');
  };

  return (
    <Router>
      <div className="app">
        {/* Render NavBar based on the user's role */}
        {isLoggedIn && role === 'admin' && <NavBar onLogout={handleLogout} />}
        {isLoggedIn && role === 'student' && <StudentNavBar onLogout={handleLogout} />}

        <div className="main-section">
          {/* Render SideBar based on the user's role */}
          {isLoggedIn && role === 'admin' && <SideBar />}
          {isLoggedIn && role === 'student' && <StudentSideBar />}

          <div className={isLoggedIn ? "main-content" : "main-content-full"}>
            <Routes>
              {/* Login Route */}
              <Route path="/" element={<Login onLogin={handleLogin} />} />

              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Admin Routes */}
              {isLoggedIn && role === 'admin' && (
                <>
                  <Route path="/home" element={<Home />} />
                  <Route path="/job-offers" element={<JobOfferForm />} />
                  <Route path="/post-job" element={<PostJob />} />
                  <Route path="/update-job-description" element={<UpdateJobDescription />} />
                  <Route path="/review-job-titles" element={<ReviewJobTitles />} />
                  <Route path="/placement-status" element={<PlacementStatus />} />
                  <Route path='/student-status' element={<StudentStatus />} />
                  <Route path="/student-details" element={<StudentDetails />} />
                  <Route path='/record-feedback' element={<RecordFeedback />} />
                  <Route path="/confirm-placement" element={<ConfirmPlacement />} />
                  <Route path="/admin-profile" element={<AdminProfile />} />
                  <Route path="/student-applied" element={<StudentApplied />} />
                </>
              )}

              {/* Student Routes */}
              {isLoggedIn && role === 'student' && (
                <>
                  <Route path="/student-home" element={<StudentHome />} />
                  <Route path="/student-job-offers" element={<StudentJobOffers />} />
                  <Route path="/student-placement-status" element={<StudentPlacementStatus />} />
                  <Route path="/student-profile" element={<StudentProfile />} />
                </>
              )}

              {/* Redirect to appropriate home page or login if not logged in */}
              <Route path="*" element={
                isLoggedIn ? (
                  <Navigate to={role === 'admin' ? "/home" : "/student-home"} replace />
                ) : (
                  <Navigate to="/" replace />
                )
              } />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
