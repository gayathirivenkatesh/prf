import React, { useState } from 'react';
import './StudentProfile.css';

const StudentProfile = ({ displayProfile = true }) => {
  const [profile, setProfile] = useState(initialProfileState);
  const [currentTab, setCurrentTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: files[0] }));
  };

  const handleSkillToggle = (e) => {
    const { name, checked } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      skills: checked
        ? [...prevState.skills, name]
        : prevState.skills.filter((skill) => skill !== name),
    }));
  };

  const handleTabSwitch = (tab) => setCurrentTab(tab);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const response = await fetch('http://localhost:5000/api/student/student-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Success message
            resetProfile(); // Clear the form
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error submitting profile:', error);
        alert('Failed to submit profile. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  const resetProfile = () => setProfile(initialProfileState);

  return (
    <div className="profile-container">
      <div className="tab-navigation">
        {displayProfile && (
          <button
            className={currentTab === 'basic' ? 'tab-active' : 'tab'}
            onClick={() => handleTabSwitch('basic')}
          >
            Personal Information
          </button>
        )}
        <button
          className={currentTab === 'education' ? 'tab-active' : 'tab'}
          onClick={() => handleTabSwitch('education')}
        >
          Academic Information
        </button>
        <button
          className={currentTab === 'extra' ? 'tab-active' : 'tab'}
          onClick={() => handleTabSwitch('extra')}
        >
          Additional Information
        </button>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        {currentTab === 'basic' && displayProfile && (
          <BasicInfo profile={profile} handleChange={handleChange} handleFileChange={handleFileChange} />
        )}

        {currentTab === 'education' && (
          <EducationInfo profile={profile} handleChange={handleChange} />
        )}

        {currentTab === 'extra' && (
          <ExtraInfo profile={profile} handleChange={handleChange} handleSkillToggle={handleSkillToggle} handleFileChange={handleFileChange} />
        )}

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
          <button type="button" className="reset-btn" onClick={resetProfile} disabled={isSubmitting}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

// BasicInfo Component
const BasicInfo = ({ profile, handleChange, handleFileChange }) => (
  <div className="section">
    <h3>Basic Information</h3>
    <div className="photo-section">
      {profile.photo ? (
        <img src={URL.createObjectURL(profile.photo)} alt="Profile" className="photo-preview" />
      ) : (
        <div className="photo-placeholder">No Photo</div>
      )}
      <input type="file" name="photo" accept="image/*" onChange={handleFileChange} className="photo-input" />
    </div>
    <div className="input-row">
      <InputGroup label="First Name" name="firstName" value={profile.firstName} onChange={handleChange} type='text' required />
      <InputGroup label="Last Name" name="lastName" value={profile.lastName} onChange={handleChange} type='text' required />
    </div>
    <div className="input-row">
      <InputGroup label="Registration No" name="registrationNumber" value={profile.registrationNumber} onChange={handleChange} type='text' />
      <InputGroup label="Department" name="department" value={profile.department} onChange={handleChange} type='text' />
    </div>
    <div className="input-row">
      <InputGroup label="Date of Birth" name="dob" value={profile.dob} onChange={handleChange} type="date" required />
      <GenderSelection gender={profile.gender} onChange={handleChange} />
    </div>
    <div className="input-row">
      <InputGroup label="Phone" name="phone" value={profile.phone} onChange={handleChange} type="tel" required />
      <InputGroup label="Email" name="email" value={profile.email} onChange={handleChange} type="email" required />
    </div>
  </div>
);

// EducationInfo Component
const EducationInfo = ({ profile, handleChange }) => (
  <div className="section">
    <h3>Education Information</h3>
    <div className="input-row">
      <InputGroup label="10th Percentage" name="tenth" value={profile.tenth} onChange={handleChange} type="number" />
      <InputGroup label="10th Passing Year" name="tenthPassedYear" value={profile.tenthPassedYear} onChange={handleChange} type="number" />
    </div>
    <div className="input-row">
      <InputGroup label="12th Percentage" name="twelfth" value={profile.twelfth} onChange={handleChange} type="number" />
      <InputGroup label="12th Passing Year" name="twelfthPassedYear" value={profile.twelfthPassedYear} onChange={handleChange} type="number" />
    </div>
    <div className="input-row">
      <InputGroup label="Diploma Percentage" name="diploma" value={profile.diploma} onChange={handleChange} type="number" />
      <InputGroup label="Diploma Passing Year" name="diplomaPassedYear" value={profile.diplomaPassedYear} onChange={handleChange} type="number" />
    </div>
    <div className="input-row">
      <InputGroup label="Undergrad CGPA" name="cgpa" value={profile.cgpa} onChange={handleChange} type="number" />
    </div>
  </div>
);

// ExtraInfo Component
const ExtraInfo = ({ profile, handleChange, handleSkillToggle, handleFileChange }) => (
  <div className="section">
    <h3>Additional Information</h3>
    <div className="input-row">
      <InputGroup label="Resume" name="resume" type="file" onChange={handleFileChange} />
      <InputGroup label="Alternate Phone" name="alternatePhone" value={profile.alternatePhone} onChange={handleChange} type="tel" />
    </div>
    <div className="input-row">
      <InputGroup label="City" name="city" value={profile.city} onChange={handleChange} type='text' />
      <InputGroup label="District" name="district" value={profile.district} onChange={handleChange} type='text' />
    </div>
    <div className="input-group">
      <SkillSelector selectedSkills={profile.skills} onToggle={handleSkillToggle} />
    </div>
    <div className="input-group">
      <TextArea label="Permanent Address" name="permanentAddress" value={profile.permanentAddress} onChange={handleChange} />
    </div>
  </div>
);

// InputGroup Component
const InputGroup = ({ label, name, type = 'text', value, onChange, required }) => (
  <div className="input-group">
    <label>{label}</label>
    <input name={name} type={type} value={value} onChange={onChange} required={required} />
  </div>
);

// GenderSelection Component
const GenderSelection = ({ gender, onChange }) => (
  <div className="input-group">
    <label>Gender</label>
    <div className="gender-options">
      {['Male', 'Female', 'Other'].map((g) => (
        <label key={g}>
          <input type="radio" name="gender" value={g} checked={gender === g} onChange={onChange} />
          {g}
        </label>
      ))}
    </div>
  </div>
);

// SkillSelector Component
const SkillSelector = ({ selectedSkills, onToggle }) => (
  <div className="skill-options">
    {['Java', 'C++', 'Python', 'JavaScript', 'React'].map((skill) => (
      <label key={skill}>
        <input
          type="checkbox"
          name={skill}
          checked={selectedSkills.includes(skill)}
          onChange={onToggle}
        />
        {skill}
      </label>
    ))}
  </div>
);

// TextArea Component
const TextArea = ({ label, name, value, onChange }) => (
  <div className="input-group">
    <label>{label}</label>
    <textarea name={name} value={value} onChange={onChange}></textarea>
  </div>
);

// Initial state
const initialProfileState = {
  firstName: '',
  lastName: '',
  registrationNumber: '',
  department: '',
  dob: '',
  gender: '',
  phone: '',
  email: '',
  photo: null,
  resume: null,
  skills: [],
  tenth: '',
  tenthPassedYear: '',
  twelfth: '',
  twelfthPassedYear: '',
  diploma: '',
  diplomaPassedYear: '',
  cgpa: '',
  alternatePhone: '',
  city: '',
  district: '',
  permanentAddress: '',
};

export default StudentProfile;
