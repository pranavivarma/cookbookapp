import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";


const Profile = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("path/to/default-profile.jpg");
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Username: "",
    Password: "",
    Phone: "",
    Address: "",
  });
  const [editableFields, setEditableFields] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.id) {
      navigate("/Profile");
      return;
    }
    
    setUserId(storedUser.id);
    
    axios.get(`http://localhost:3000/users/${storedUser.id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [navigate]);

  const enableEdit = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const saveChanges = () => {
    axios.put(`http://localhost:3000/users/${userId}`, formData)
      .then(() => {
        localStorage.setItem("user", JSON.stringify(formData));
        setEditableFields({});
        alert("Profile updated successfully!");
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  const updateProfilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <img src={profilePic} alt="Profile" className="profile-pic" />
      <input type="file" id="profilePicInput" hidden onChange={updateProfilePic} />
      <button className="upload-button" onClick={() => document.getElementById("profilePicInput").click()}>
        Upload
      </button>

      {Object.keys(formData).map((field) => (
        <div className="profile-field" key={field}>
          <label htmlFor={field}>{field.replace(/([A-Z])/g, " $1").trim()}:</label>
          <input
            type={field === "password" ? "password" : field === "dob" ? "date" : "text"}
            id={field}
            value={formData[field]}
            onChange={handleChange}
            disabled={!editableFields[field]}
          />
          <span className="edit-icon" onClick={() => enableEdit(field)}>✏</span>
        </div>
      ))}

      <button className="save-button" onClick={saveChanges}>Save Changes</button>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
