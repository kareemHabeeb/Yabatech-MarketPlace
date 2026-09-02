import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import "./Profile.css";
import DashboardHeader from "../../Components/DashboardHeader";

const Profile = () => {
  // Temporary user data
  // Later this will come from your API

  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "johndoe@student.yabatech.edu.ng",
    matricNumber: "ND/CSC/2023/001",
    department: "Computer Science",
    school: "School of Technology",
    phone: "08012345678",
  });

  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Later, send updated data to API
    // PUT /api/users/profile

    setUserData(formData);
    setIsEditing(false);

    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  return (
    <>
      <DashboardHeader />

      <main className="profile-page">
        {/* BREADCRUMB */}

        <section className="profile-breadcrumb">
          <Link to="/dashboard">Dashboard</Link>

          <span>/</span>

          <p>My Profile</p>
        </section>

        {/* PROFILE HEADER */}

        <section className="profile-header">
          <div className="profile-avatar">
            {userData.fullName.charAt(0)}
          </div>

          <div className="profile-header-info">
            <h1>{userData.fullName}</h1>

            <p>{userData.department}</p>

            <span>YABATECH Student</span>
          </div>

          {!isEditing && (
            <button
              className="edit-profile-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </section>

        {/* PROFILE CONTENT */}

        <section className="profile-container">
          <form onSubmit={handleSave} className="profile-card">
            <div className="profile-card-heading">
              <div>
                <h2>Personal Information</h2>

                <p>
                  Manage your personal and academic information.
                </p>
              </div>
            </div>

            <div className="profile-form">
              {/* FULL NAME */}

              <div className="profile-form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  value={
                    isEditing
                      ? formData.fullName
                      : userData.fullName
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* EMAIL */}

              <div className="profile-form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={
                    isEditing
                      ? formData.email
                      : userData.email
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* MATRIC NUMBER */}

              <div className="profile-form-group">
                <label>Matric Number</label>

                <input
                  type="text"
                  name="matricNumber"
                  value={
                    isEditing
                      ? formData.matricNumber
                      : userData.matricNumber
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* DEPARTMENT */}

              <div className="profile-form-group">
                <label>Department</label>

                <input
                  type="text"
                  name="department"
                  value={
                    isEditing
                      ? formData.department
                      : userData.department
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* SCHOOL */}

              <div className="profile-form-group">
                <label>School</label>

                <input
                  type="text"
                  name="school"
                  value={
                    isEditing
                      ? formData.school
                      : userData.school
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* PHONE */}

              <div className="profile-form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={
                    isEditing
                      ? formData.phone
                      : userData.phone
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* EDIT ACTIONS */}

            {isEditing && (
              <div className="profile-actions">
                <button
                  type="button"
                  className="cancel-profile-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-profile-btn"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>

          {/* ACCOUNT INFORMATION */}

          <aside className="account-card">
            <h2>Account Information</h2>

            <div className="account-info">
              <span>Account Type</span>

              <strong>Student</strong>
            </div>

            <div className="account-info">
              <span>Account Status</span>

              <strong className="verified-account">
                Verified
              </strong>
            </div>

            <div className="account-info">
              <span>Marketplace Access</span>

              <strong className="access-active">
                Active
              </strong>
            </div>

            <div className="account-note">
              <p>
                Your account is verified as a member of the campus
                community.
              </p>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Profile;