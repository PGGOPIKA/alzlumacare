// src/Profile.js
import React, { useState } from 'react';
import './Profile.css'; // Add custom CSS if needed

function Profile() {
  // Static data for a single user
  const initialUser = {
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    phone: '987-654-3210',
    address: '5678 Oak Street, City, Country',
    dateOfBirth: '1985-06-15',
    alertDetails: [
      { name: 'Dr. John', phone: '321-654-9870', relation: 'Doctor' },
      { name: 'John Doe', phone: '987-654-3210', relation: 'Caregiver' },
      { name: 'Jane Smith', phone: '555-123-4567', relation: 'Family Member' },
    ],
  };

  const [user, setUser] = useState(initialUser);
  const [savedUser, setSavedUser] = useState(initialUser); // To store saved data

  // Calculate Age based on Date of Birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age;
  };

  // Handle profile field change
  const handleInputChange = (e, key) => {
    setUser({ ...user, [key]: e.target.value });
  };

  // Handle alerting details change
  const handleAlertChange = (index, field, value) => {
    const updatedAlertDetails = [...user.alertDetails];
    updatedAlertDetails[index][field] = value;
    setUser({ ...user, alertDetails: updatedAlertDetails });
  };

  // Handle adding new alert
  const addAlert = () => {
    const newAlert = { name: '', phone: '', relation: '' };
    setUser({ ...user, alertDetails: [...user.alertDetails, newAlert] });
  };

  // Save changes to the profile
  const saveProfile = () => {
    setSavedUser(user); // Save the current user data
    alert("Profile Saved Successfully!");
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      <div className="profile-details">
        <label>Name:</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => handleInputChange(e, 'name')}
        />

        <label>Email:</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => handleInputChange(e, 'email')}
        />

        <label>Phone:</label>
        <input
          type="text"
          value={user.phone}
          onChange={(e) => handleInputChange(e, 'phone')}
        />

        <label>Address:</label>
        <input
          type="text"
          value={user.address}
          onChange={(e) => handleInputChange(e, 'address')}
        />

        <label>Date of Birth:</label>
        <input
          type="date"
          value={user.dateOfBirth}
          onChange={(e) => handleInputChange(e, 'dateOfBirth')}
        />

        <label>Age:</label>
        <span>{calculateAge(user.dateOfBirth)} years</span>
      </div>

      <h3>Alerting Details</h3>
      <table className="alert-details-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Details (Doctor, Caregiver, Family Member, etc.)</th>
          </tr>
        </thead>
        <tbody>
          {user.alertDetails.map((alert, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={alert.name}
                  onChange={(e) =>
                    handleAlertChange(index, 'name', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={alert.phone}
                  onChange={(e) =>
                    handleAlertChange(index, 'phone', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={alert.relation}
                  onChange={(e) =>
                    handleAlertChange(index, 'relation', e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addAlert}>Add Alert</button>
      <br />
      <button onClick={saveProfile}>Save</button> {/* Save button */}

      {savedUser && (
        <div className="saved-profile">
          <h4>Saved Profile Details:</h4>
          <p><strong>Name:</strong> {savedUser.name}</p>
          <p><strong>Email:</strong> {savedUser.email}</p>
          <p><strong>Phone:</strong> {savedUser.phone}</p>
          <p><strong>Address:</strong> {savedUser.address}</p>
          <p><strong>Date of Birth:</strong> {savedUser.dateOfBirth}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
