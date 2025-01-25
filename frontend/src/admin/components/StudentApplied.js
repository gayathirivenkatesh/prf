import React, { useEffect, useState } from 'react';
import './StudentApplied.css';

const StudentsApplied = () => {
  const [studentsApplied, setStudentsApplied] = useState([]); // List of students who applied
  const [loading, setLoading] = useState(true);

  // Simulate fetching the list of students who applied for jobs
  useEffect(() => {
    const fetchDemoData = () => {
      const demoData = [
        {
          id: 1,
          name: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          jobTitle: 'Software Developer',
          applicationDate: '2025-01-05',
          resume: '/resumes/alice-johnson.pdf',
        },
        {
          id: 2,
          name: 'Bob Smith',
          email: 'bob.smith@example.com',
          jobTitle: 'Data Analyst',
          applicationDate: '2025-01-06',
          resume: '/resumes/bob-smith.pdf',
        },
      ];

      setTimeout(() => {
        setStudentsApplied(demoData);
        setLoading(false);
      }, 1000); // Simulate a network delay
    };

    fetchDemoData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (studentsApplied.length === 0) {
    return <p>No students have applied for jobs yet.</p>;
  }

  return (
    <div className="students-applied">
      <h1>Students Who Applied for Jobs</h1>
      <div className="students-list">
        {studentsApplied.map((student) => (
          <div key={student.id} className="student-item">
            <div><strong>Name:</strong> {student.name}</div>
            <div><strong>Email:</strong> {student.email}</div>
            <div><strong>Job Title:</strong> {student.jobTitle}</div>
            <div><strong>Applied On:</strong> {new Date(student.applicationDate).toLocaleDateString()}</div>
            {student.resume && (
              <div>
                <strong>Resume:</strong>
                <a href={student.resume} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsApplied;
