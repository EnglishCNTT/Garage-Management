import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'currentPassword':
        setCurrentPassword(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with the form data
  };

  return (
    <form onSubmit={handleSubmit} >
      <p style={{ color: 'gray' }}>Now you can create a new Password for your account  </p>
      <div>
        <label htmlFor="currentPassword">Current Password:</label>
        <br />
        <input size="large" type="password" name="currentPassword" value={currentPassword} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <br />
        <input size="large" type="password" name="newPassword" value={newPassword} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <br />
        <input size="large" type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
      </div>
      <div className="div-btn">
        <button type="submit">Save</button>
        <Link to="/view_profile">Cancel</Link>
      </div>
    </form>
  );
}

export default ChangePassword;
