import React, { useContext, useState, useEffect } from 'react';
import { ContextData } from '../../App';
import axios from 'axios';

function UserDashboardProfile() {
  const { loginemail, isEditing, setIsEditing } = useContext(ContextData);

  const [formData, setFormData] = useState({
    userName: loginemail?.name || '',
    email: loginemail?.email || '',
    phone: loginemail?.number || '',
    education: loginemail?.education || '',
    dateOfBirth: loginemail?.DOB || '',
    interest: loginemail?.interest || ''
  });

  useEffect(() => {
    setFormData({
      userName: loginemail?.name || '',
      email: loginemail?.email || '',
      phone: loginemail?.number || '',
      education: loginemail?.education || '',
      dateOfBirth: loginemail?.DOB || '',
      interest: loginemail?.interest || ''
    });
  }, [loginemail]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const updateUserdata = async (e) => {
    e.preventDefault();
    try {
      const updateduser = await axios.put("http://127.0.0.1:3000/auth/register", {
        email: loginemail?.email,
        DOB: formData.dateOfBirth,
        education: formData.education,
        interest: formData.interest
      });
      console.log(updateduser.data.msg);
      if (updateduser.data.msg === "Added") {
        setIsEditing(false);
      }
    } catch (error) {
      console.log("new method error", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      {isEditing ? (
        <form onSubmit={updateUserdata}>
          <div className="mb-4">
            <label className="block text-gray-700">User Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              disabled
              className="w-full mt-2 p-2 border border-gray-300 rounded-md text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full mt-2 p-2 border border-gray-300 rounded-md text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              disabled
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Interest</label>
            <input
              type="text"
              name="interest"
              value={formData.interest}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
            onClick={handleEditToggle}
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p className="mb-2"><strong>User Name:</strong> {formData.userName}</p>
          <p className="mb-2"><strong>Email:</strong> {formData.email}</p>
          <p className="mb-2"><strong>Phone:</strong> {formData.phone}</p>
          <p className="mb-2"><strong>Education:</strong> {formData.education}</p>
          <p className="mb-4"><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
          <p className="mb-4"><strong>Interest:</strong> {formData.interest}</p>
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleEditToggle}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDashboardProfile;
