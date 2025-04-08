import { useContext } from "react";
import { PatientContext } from "../PatientDashboard";
import "./patientdash.css";

const SideBar = () => {
  const { patient, setAct } = useContext(PatientContext);
  return (
    <div className="patient-sidebar-container">
      <div className="patient-sidebar-header">
        <div className="patient-sidebar-avatar">
          {patient.name ? patient.name.charAt(0).toUpperCase() : "P"}
        </div>
        <div className="patient-sidebar-name">{patient.name || "Loading..."}</div>
        <div className="patient-sidebar-role">{patient.role || "Patient"}</div>
        <button className="patient-sidebar-button" onClick={()=>setAct("View-Profile")}>View Profile</button>
      </div>

      <ul className="patient-sidebar-menu">
        <li onClick={() => setAct("Appointments")} className="patient-sidebar-menu-item">Appointments</li>
        <li onClick={() => setAct("Medical History")} className="patient-sidebar-menu-item">Medical History</li>
        <li onClick={() => setAct("Settings")} className="patient-sidebar-menu-item">Settings</li>
      </ul>

      <div className="patient-sidebar-footer">
        &copy; {new Date().getFullYear()} ManageIt Inc.
      </div>
    </div>
  );
};

export default SideBar;
