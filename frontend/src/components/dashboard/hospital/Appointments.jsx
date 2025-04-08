import { useState } from "react";
import "./hospitaldash.css";
import ScheduledAppointments from "./ScheduledAppointments";
import RequestedAppointments from "./RequestedAppointments";

const Appointments = () => {
  const [apt, setApt] = useState("Current");
  return (
    <div className="doc-containers">
      <div className="doc-nav">
        <div className="doc-title">Appointments</div>
        <div className="doc-buttons">
          <div
            className={`view-docs ${apt === "Current" ? "active" : ""}`}
            onClick={() => setApt("Current")}
          >
            Scheduled Appointments
          </div>
          <div
            className={`new-docs ${apt === "New" ? "active" : ""}`}
            onClick={() => setApt("New")}
          >
            New Appointments
          </div>
        </div>
      </div>
      <div className="doc-content">
        {(apt==="Current") && <ScheduledAppointments/>}
        {(apt==="New") && <RequestedAppointments/>}
      </div>
    </div>
  );
};

export default Appointments;
