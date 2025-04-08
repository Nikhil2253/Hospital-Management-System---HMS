import { useState } from "react";
import "./patientdash.css";
import PatientProfile from "./PatientProfile";
import PasswordSection from "./PasswordSection";

const Settings = () => {
  const [opt, setOpt] = useState("");

  return (
    <div className="settings-container">
      <nav className="settings-header">
        <h2 className="settings-title">Settings</h2>
        <div className="settings-btns">
          <button 
            className={`settings-btn ${opt === "UpdateProfile" ? "active" : ""}`} 
            onClick={() => setOpt("UpdateProfile")}
          >
            Update Profile
          </button>
          <button 
            className={`settings-btn ${opt === "ChangePassword" ? "active" : ""}`} 
            onClick={() => setOpt("ChangePassword")}
          >
            Change Password
          </button>
        </div>
      </nav>
      <div className="settings-content">
        {opt === "UpdateProfile" && <PatientProfile />}
        {opt === "ChangePassword" && <PasswordSection />}
      </div>
    </div>
  );
};

export default Settings;
