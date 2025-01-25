import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"; // For routing
import './RecordFeedback.css'; // Importing the CSS file

const RecordFeedback = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Define initial table data with blank cells for Name, Roll No, Year
  const data = [
    { id: 1, name: '', rollNo: '', year: '' },
    { id: 2, name: '', rollNo: '', year: '' },
    { id: 3, name: '', rollNo: '', year: '' },
    { id: 4, name: '', rollNo: '', year: '' },
    { id: 5, name: '', rollNo: '', year: '' },
    { id: 6, name: '', rollNo: '', year: '' },
    { id: 7, name: '', rollNo: '', year: '' },
    { id: 8, name: '', rollNo: '', year: '' },
    { id: 9, name: '', rollNo: '', year: '' },
    { id: 10, name: '', rollNo: '', year: '' },
    { id: 11, name: '', rollNo: '', year: '' },
  ];

  // Handle "View" button click to navigate to a new page
  const handleViewClick = () => {
    navigate('/reason'); // Change this to the path of your new page
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="table-container6">
      <FaArrowLeft className="pre-icon" onClick={handleBack} />
      <h1 className="feedback-title">Record Feedback</h1>

      <table className="custom-table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>ROLL NO</th>
            <th>YEAR</th>
            <th>VIEW BUTTON</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.rollNo}</td>
              <td>{row.year}</td>
              <td>
                <button onClick={handleViewClick}>View</button> {/* View Button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordFeedback;
