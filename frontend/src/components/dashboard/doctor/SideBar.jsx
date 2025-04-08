import { useContext} from "react";
import { DoctorContext } from "../DoctorDashboard";
import "./doctordash.css";

const SideBar = () => {
  const {doctor,setAct} = useContext(DoctorContext);
  
  const handleAppointmentsClick = () => {
    setAct("Appointments");
  };

  const handlePatientsClick = () => {
    setAct("Patients");
  };

  const handleSettingsClick = () => {
    setAct("Settings");
  };

  const handleHospitalClick = () => {
    setAct("Hospital");
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div className="sidebar-avatar">
          {doctor.name ? doctor.name.charAt(0).toUpperCase() : "D"}
        </div>
        <div className="sidebar-name">Dr. {doctor.name || "Loading..."}</div>
        <div className="sidebar-role">{doctor.specialization}</div>
        <button className="sidebar-button" onClick={()=>setAct("View Profile")}>View Profile</button>
      </div>

      <ul className="sidebar-menu">
        <li onClick={handleAppointmentsClick}>Appointments</li>
        <li onClick={handlePatientsClick}>Patients</li>
        <li onClick={handleSettingsClick}>Settings</li>
        <li onClick={handleHospitalClick}>Hospital</li>
      </ul>

      <div className="sidebar-footer">
        &copy; {new Date().getFullYear()} ManageIt Inc.
      </div>
    </div>
  );
};

export default SideBar;
