import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(true);

  // Load stored data when component mounts
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) {
      setUserProfile(storedProfile);
      setIsEditing(false); // If profile exists, show details
    }
  }, []);

  const handleChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!userProfile.name || !userProfile.phone || !userProfile.email) {
      alert("Please fill in all fields.");
      return;
    }
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    setIsEditing(false);
    alert("Profile Saved!");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    localStorage.removeItem("userProfile");
    setUserProfile({ name: "", phone: "", email: "" });
    setIsEditing(true);
    alert("Profile Deleted!");
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={userProfile.name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
          <input
            type="text"
            name="phone"
            value={userProfile.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
          />
          <input
            type="email"
            name="email"
            value={userProfile.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <div className="profile-display">
          <p><strong>Name:</strong> {userProfile.name}</p>
          <p><strong>Phone:</strong> {userProfile.phone}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete} style={{ background: "red" }}>Delete Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
