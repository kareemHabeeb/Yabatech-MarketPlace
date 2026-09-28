import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../Components/Footer";
import "./Profile.css";
import DashboardHeader from "../../Components/DashboardHeader";
import { apiClient } from "../../config/AxiosInstance";

const EMPTY_USER = {
  firstName: "",
  lastName: "",
  email: "",
  matricNumber: "",
  department: "",
  level: "",
  phoneNumber: "",
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userData, setUserData] = useState(EMPTY_USER);
  const [formData, setFormData] = useState(EMPTY_USER);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/user/profile");
      const data = res.data?.data ?? res.data ?? {};

      const mapped = {
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        email: data.email ?? "",
        matricNumber: data.matricNumber ?? "",
        department: data.department ?? "",
        level: data.level ?? "",
        phoneNumber: data.phoneNumber ?? "",
      };

      setUserData(mapped);
      setFormData(mapped);
    } catch (err) {
      console.error("Failed to load profile:", err);
      toast.error(
        err.response?.data?.message || "Could not load your profile.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await apiClient.put("/user/update-profile", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        matricNumber: formData.matricNumber,
        department: formData.department,
        level: formData.level,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      });

      console.log("Profile update response:", response.data);

      const updated = response.data?.data ?? formData;
      setUserData((prev) => ({ ...prev, ...updated }));
      setFormData((prev) => ({ ...prev, ...updated }));
      setIsEditing(false);

      toast.success(response.data?.message || "Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(
        err.response?.data?.message ||
          "Unable to update your profile. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const fullName = `${userData.firstName} ${userData.lastName}`.trim();

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
            {fullName ? fullName.charAt(0) : "?"}
          </div>

          <div className="profile-header-info">
            <h1>{loading ? "Loading..." : fullName || "Your Profile"}</h1>

            <p>{userData.department}</p>

            <span>YABATECH Student</span>
          </div>

          {!isEditing && (
            <button
              className="edit-profile-btn"
              onClick={() => setIsEditing(true)}
              disabled={loading}
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

                <p>Manage your personal and academic information.</p>
              </div>
            </div>

            <div className="profile-form">
              {/* FIRST NAME */}

              <div className="profile-form-group">
                <label>First Name</label>

                <input
                  type="text"
                  name="firstName"
                  value={isEditing ? formData.firstName : userData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing || loading || saving}
                />
              </div>

              {/* LAST NAME */}

              <div className="profile-form-group">
                <label>Last Name</label>

                <input
                  type="text"
                  name="lastName"
                  value={isEditing ? formData.lastName : userData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing || loading || saving}
                />
              </div>

              {/* EMAIL */}

              <div className="profile-form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={isEditing ? formData.email : userData.email}
                  onChange={handleChange}
                  disabled={!isEditing || loading || saving}
                />
              </div>

              {/* MATRIC NUMBER */}

              <div className="profile-form-group">
                <label>Matric Number</label>

                <input
                  type="text"
                  name="matricNumber"
                  value={
                    isEditing ? formData.matricNumber : userData.matricNumber
                  }
                  onChange={handleChange}
                  disabled={!isEditing || loading || saving}
                />
              </div>

              {/* DEPARTMENT */}

              <div className="profile-form-group">
                <label>Department</label>

                <input
                  type="text"
                  name="department"
                  value={isEditing ? formData.department : userData.department}
                  onChange={handleChange}
                  disabled={!isEditing || loading || saving}
                />
              </div>

              {/* LEVEL (name attribute fixed to match state key) */}

              <div className="profile-form-group">
                <label>Level</label>

                <input
                  type="text"
                  name="level"
                  value={isEditing ? formData.level : userData.level}
                  onChange={handleChange}
                  disabled={!isEditing || loading || saving}
                />
              </div>

              {/* PHONE */}

              <div className="profile-form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phoneNumber"
                  value={
                    isEditing ? formData.phoneNumber : userData.phoneNumber
                  }
                  onChange={handleChange}
                  disabled={!isEditing || loading || saving}
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
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-profile-btn"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
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

              <strong className="verified-account">Verified</strong>
            </div>

            <div className="account-info">
              <span>Marketplace Access</span>

              <strong className="access-active">Active</strong>
            </div>

            <div className="account-note">
              <p>
                Your account is verified as a member of the campus community.
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
