import { useContext } from "react";
import { HospitalContext } from "../HospitalDashboard";
import "./hospitaldash.css";

const SideBar = () => {
  const { hospital,setAct } = useContext(HospitalContext);

  const handleOverviewClick = () => {
    setAct("Overview");
  };

  const handleDoctorsClick = () => {
    setAct("Doctors");
  };

  const handlePatientsClick = () => {
    setAct("Patients");
  };

  const handleAppointmentsClick = () => {
    setAct("Appointments");
  };

  const handleSettingsClick = () => {
    setAct("Settings");
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div className="sidebar-avatar">H</div>
        <div className="sidebar-name">{hospital.name}</div>
        <div className="sidebar-role">Administrator</div>
        <button className="sidebar-button" onClick={() => setAct("Dashboard")}>Dashboard</button>
      </div>

      <ul className="sidebar-menu">
        <li onClick={handleOverviewClick}>Overview</li>
        <li onClick={handleDoctorsClick}>Doctors</li>
        <li onClick={handlePatientsClick}>Patients</li>
        <li onClick={handleAppointmentsClick}>Appointments</li>
        <li onClick={handleSettingsClick}>Settings</li>
      </ul>

      <div className="sidebar-footer">
        &copy; {new Date().getFullYear()} ManageIt Inc.
      </div>
    </div>
  );
};

export default SideBar;
