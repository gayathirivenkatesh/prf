import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './StudentDetails.css';

const ViewStudentDetails = () => {
  const [students, setStudents] = useState([]);

  // Simulate fetching student details from an API
  useEffect(() => {
    // Replace with actual API call
    const fetchStudents = async () => {
      const studentData = [
        { id: 1, name: 'John Doe', placementStatus: 'Placed' },
        { id: 2, name: 'Jane Smith', placementStatus: 'In Progress' },
        { id: 3, name: 'Alice Johnson', placementStatus: 'Not Placed' },
        { id: 4, name: 'Michael Brown', placementStatus: 'Placed' },
        { id: 5, name: 'Emily Davis', placementStatus: 'In Progress' },
        { id: 6, name: 'David Wilson', placementStatus: 'Placed' },
        { id: 7, name: 'Sophia Martinez', placementStatus: 'Not Placed' },
        { id: 8, name: 'James Anderson', placementStatus: 'In Progress' },
        { id: 9, name: 'Olivia Thompson', placementStatus: 'Placed' },
        { id: 10, name: 'Daniel White', placementStatus: 'Not Placed' },
      ];
      setStudents(studentData);
    };
    fetchStudents();
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="student-details-dashboard">
      <FaArrowLeft className="pre-icon" onClick={handleBack} />
      <h2>Student Placement Details</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Placement Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td className={`status ${student.placementStatus.toLowerCase().replace(' ', '-')}`}>
                {student.placementStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudentDetails;
