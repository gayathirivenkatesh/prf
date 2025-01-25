import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './StudentStatus.css'; // Import the CSS file

const RecordPlacementDetails = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // Change to object for selected student details
  const [placementStatus, setPlacementStatus] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [offerLetter, setOfferLetter] = useState('');

  // Simulate fetching student details from an API
  useEffect(() => {
    const fetchStudents = async () => {
      // Fetch student data from your API instead of static data
      const studentData = [
        { id: 1, name: 'John Doe', placementStatus: 'Not Placed' },
        { id: 2, name: 'Jane Smith', placementStatus: 'Placed' },
        { id: 3, name: 'Alice Johnson', placementStatus: 'In Progress' },
        { id: 4, name: 'Michael Brown', placementStatus: 'Placed' },
        { id: 5, name: 'Emily Davis', placementStatus: 'Not Placed' },
      ];
      setStudents(studentData);
    };
    fetchStudents();
  }, []);

  // Filter students as admin types in the search bar
  useEffect(() => {
    if (searchQuery) {
      const filtered = students.filter(student => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  }, [searchQuery, students]);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setPlacementStatus(student.placementStatus); // Prepopulate with the student's current status
    setSearchQuery(student.name); // Set the selected student name in the input field
    setFilteredStudents([]); // Clear the list of filtered students after selection
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudent || !placementStatus || !company || !location || !offerLetter) {
      alert('Please fill all the fields.');
      return;
    }

    // Update student placement details logic (e.g., call to backend API)
    console.log(`Updated details for ${selectedStudent.name}:`);
    console.log(`Placement Status: ${placementStatus}`);
    console.log(`Company: ${company}`);
    console.log(`Location: ${location}`);
    console.log(`Offer Letter: ${offerLetter}`);

    // Reset form after submission
    setSelectedStudent(null);
    setPlacementStatus('');
    setCompany('');
    setLocation('');
    setOfferLetter('');
    setSearchQuery('');
    alert('Placement details updated successfully!');
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="placement-details-container">
      <FaArrowLeft className="pre-icon" onClick={handleBack} />
      <h2>Record Placement Details</h2>
      <form className="placement-details-form" onSubmit={handleSubmit}>
        
        {/* Search Field for Student */}
        <div className="form-group">
          <label htmlFor="search">Search Student by Name:</label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type student name"
          />
        </div>

        {/* Display Filtered Students List */}
        {filteredStudents.length > 0 && (
          <ul className="student-list">
            {filteredStudents.map((student) => (
              <li 
                key={student.id} 
                onClick={() => handleStudentClick(student)}
                className="student-item"
              >
                {student.name}
              </li>
            ))}
          </ul>
        )}

        {/* Display Selected Student Details */}
        {selectedStudent && (
          <div className="selected-student-details">
            <h3>Selected Student: {selectedStudent.name}</h3>
            <div className="form-group">
              <label htmlFor="status">Placement Status:</label>
              <select
                id="status"
                value={placementStatus}
                onChange={(e) => setPlacementStatus(e.target.value)}
              >
                <option value="">-- Select Status --</option>
                <option value="Placed">Placed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Placed">Not Placed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="company">Company Name:</label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="offerLetter">Offer Letter Received:</label>
              <select
                id="offerLetter"
                value={offerLetter}
                onChange={(e) => setOfferLetter(e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        )}

        <button type="submit" className="submit-button" disabled={!selectedStudent}>
          Update Placement Details
        </button>
      </form>
    </div>
  );
};

export default RecordPlacementDetails;
