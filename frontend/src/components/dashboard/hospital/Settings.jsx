import { useState, useContext } from "react";
import { HospitalContext } from "../HospitalDashboard";
import "./hospitaldash.css";

const Settings = () => {
  const { hospital } = useContext(HospitalContext);
  const [prof, setProf] = useState("Profile");
  const [editingField, setEditingField] = useState("");
  const [editValue, setEditValue] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const handleEdit = (field) => {
    setEditingField(field);
    setEditValue(hospital[field] || "");
  };

  const handleCancel = () => {
    setEditingField("");
    setEditValue("");
    setIsEditingPassword(false);
    setPassword("");
    setConfirmPassword("");
  };

  const handleSave = async (field) => {
    try {
      const response = await fetch("http://localhost:5000/api/hospital/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ regId: hospital.registrationId, field, val: editValue }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!" + (result.message ? ` ${result.message}` : ""));
        setEditingField("");
      } else {
        alert("Failed to update profile: " + (result.message || "Please try again."));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error occurred while updating profile. Please try again.");
    }
  };

  const updatePassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/hospital/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ regId: hospital.registrationId, password }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Password updated successfully!" + (result.message ? ` ${result.message}` : ""));
        setIsEditingPassword(false);
        setPassword("");
        setConfirmPassword("");
      } else {
        alert("Failed to update password: " + (result.message || "Please try again."));
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error occurred while updating password. Please try again.");
    }
  };

  return (
    <div className="doc-containers">
      <div className="doc-nav">
        <div className="doc-title">Settings</div>
        <div className="doc-buttons">
          <div className={`view-docs ${(prof === "Profile") ? "active" : ""}`} onClick={() => setProf("Profile")}>Update Profile</div>
          <div className={`new-docs ${(prof === "Password") ? "active" : ""}`} onClick={() => setProf("Password")}>Password</div>
        </div>
      </div>
      <div className="doc-content">
        {prof === "Profile" && (
          <div className="hos-update-profile">
            {Object.keys(hospital).map((field) => (
              !["_id", "doctors", "patients", "password","appointments","newRequestedAppointments", "__v"].includes(field) && (
                <div key={field} className="hos-updateprofile-item">
                  <span className="hos-updateprofilefield-label">{field.toUpperCase()}:</span>
                  {field === "registrationId" ? (
                    <div>
                     {hospital[field]}
                    </div>
                  ) : editingField === field ? (
                    <div>
                      <input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="update-input-field" />
                      <button onClick={() => handleSave(field)} className="hos-edit-btn">Save</button>
                      <button onClick={handleCancel} className="hos-cancel-btn">Cancel</button>
                    </div>
                  ) : (
                    <div>
                      {hospital[field]}
                      <button onClick={() => handleEdit(field)} className="hos-edit-btn">Edit</button>
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        )}
        {prof === "Password" && (
          <div className="hos-update-password">
            {!isEditingPassword ? (
              <button onClick={() => setIsEditingPassword(true)} className="hos-edit-btn">Change Password</button>
            ) : (
              <div className="hos-pass">
                <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} className="update-input-pass" />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="update-input-pass" />
                {password && confirmPassword && password === confirmPassword && (
                  <button onClick={updatePassword} className="hos-update-btn">Save</button>
                )}
                <button onClick={handleCancel} className="hos-cancel-btn">Cancel</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;