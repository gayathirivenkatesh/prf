import React, { useState } from 'react';
import './AdminProfile.css';

const AdminProfile = ({ displayProfile = true }) => {
  const [profile, setProfile] = useState(initialAdminProfileState);
  const [currentTab, setCurrentTab] = useState('basic');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: files[0] }));
  };

  const handleTabSwitch = (tab) => setCurrentTab(tab);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Submission:', profile);
  };

  const resetProfile = () => setProfile(initialAdminProfileState);

  return (
    <div className="admin-profile-wrapper">
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
          className={currentTab === 'department' ? 'tab-active' : 'tab'}
          onClick={() => handleTabSwitch('department')}
        >
          Department Information
        </button>
        <button
          className={currentTab === 'extra' ? 'tab-active' : 'tab'}
          onClick={() => handleTabSwitch('extra')}
        >
          Additional Information
        </button>
      </div>

      <form className="admin-profile-form" onSubmit={handleSubmit}>
        {currentTab === 'basic' && displayProfile && (
          <AdminBasicInfo profile={profile} handleChange={handleChange} handleFileChange={handleFileChange} />
        )}

        {currentTab === 'department' && (
          <AdminDepartmentInfo profile={profile} handleChange={handleChange} />
        )}

        {currentTab === 'extra' && (
          <AdminExtraInfo profile={profile} handleChange={handleChange} />
        )}

        <div className="form-actions">
          <button type="submit" className="submit-btn">Save</button>
          <button type="button" className="reset-btn" onClick={resetProfile}>Reset</button>
        </div>
      </form>
    </div>
  );
};

const AdminBasicInfo = ({ profile, handleChange, handleFileChange }) => (
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
      <InputGroup label="Full Name" name="name" value={profile.name} onChange={handleChange} type='text' />
    </div>
    <div className="input-row">
      <InputGroup label="Email" name="email" value={profile.email} onChange={handleChange} type="email" />
      <InputGroup label="Phone" name="phone" value={profile.phone} onChange={handleChange} type="tel" />
    </div>
    <div className="input-row">
      <InputGroup label="Address" name="address" value={profile.address} onChange={handleChange} type="text" />
    </div>
  </div>
);

const AdminDepartmentInfo = ({ profile, handleChange }) => (
  <div className="section">
    <h3>Department Information</h3>
    <div className="input-row">
      <InputGroup label="Department" name="department" value={profile.department} onChange={handleChange} type="text" />
      <InputGroup label="Role" name="role" value={profile.role} onChange={handleChange} type="text" />
    </div>
  </div>
);

const AdminExtraInfo = ({ profile, handleChange }) => (
  <div className="section">
    <h3>Additional Information</h3>
    <div className="input-row">
      <InputGroup label="Alternate Phone" name="alternatePhone" value={profile.alternatePhone} onChange={handleChange} type="tel" />
    </div>
  </div>
);

const InputGroup = ({ label, name, type = 'text', value, onChange }) => (
  <div className="input-group">
    <label>{label}</label>
    <input name={name} type={type} value={value} onChange={onChange} required />
  </div>
);

const initialAdminProfileState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  department: '',
  role: '',
  alternatePhone: '',
  photo: null,
};

export default AdminProfile;
