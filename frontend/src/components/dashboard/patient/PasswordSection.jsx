import { useContext, useState } from "react";
import "./patientdash.css";
import { PatientContext } from "../PatientDashboard";

const PasswordSection = () => {
    const {patient}=useContext(PatientContext); 
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
      const response = await fetch("http://localhost:5000/api/patient/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ regId: patient.regId,password: newPassword }),
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
    <div className="password-container">
      <h2>Password Details</h2>
      <div className="password-details">
        {isEditing ? (
          <div className="password-edit">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="password-input"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="password-input"
            />
            {error && <p className="error-message">{error}</p>}
            <div className="password-buttons">
              <button className="save-button" onClick={handleSave}>
                Save Password
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel Update
              </button>
            </div>
          </div>
        ) : (
          <div className="password-item">
            <span className="password-label">Password:</span>
            <span className="password-value">{patient.password}</span>
            <button
              className="update-button"
              onClick={() => setIsEditing(true)}
            >
              Update Password
            </button>
          </div>
        )}
        <div className="password-item">
          <span className="password-label">Last Updated:</span>
          <span className="password-value">2 weeks ago</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordSection;
