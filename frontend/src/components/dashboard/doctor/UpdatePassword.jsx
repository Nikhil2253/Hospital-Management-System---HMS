import { useContext, useState } from "react";
import "./doctordash.css";
import { DoctorContext } from "../DoctorDashboard";

const UpdatePassword = () => {
  const { doctor } = useContext(DoctorContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/doctor/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ regId: doctor.regId, password: newPassword }),
      });

      if (!response.ok) {
        throw new Error("Password update failed");
      }

      console.log("Password saved:", newPassword);
      setIsEditing(false);
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      console.error("Password update failed:", error);
      setError("Password update failed. Please try again.");
    }
  };

  const handleCancel = () => {
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setIsEditing(false);
  };

  return (
    <div className="doctor-password-container">
      <h2>Password Details</h2>
      <div className="doctor-password-details">
        {isEditing ? (
          <div className="doctor-password-edit">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="doctor-password-input"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="doctor-password-input"
            />
            {error && <p className="doctor-error-message">{error}</p>}
            <div className="doctor-password-buttons">
              <button className="doctor-save-button" onClick={handleSave}>
                Save Password
              </button>
              <button className="doctor-cancel-button" onClick={handleCancel}>
                Cancel Update
              </button>
            </div>
          </div>
        ) : (
          <div className="doctor-password-item">
            <span className="doctor-password-label">Password:</span>
            <span className="doctor-password-value">{doctor.password}</span>
            <button
              className="doctor-update-button"
              onClick={() => setIsEditing(true)}
            >
              Update Password
            </button>
          </div>
        )}
       
      </div>
    </div>
  );
};

export default UpdatePassword;
