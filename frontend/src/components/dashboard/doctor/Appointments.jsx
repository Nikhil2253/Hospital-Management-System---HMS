import { useState } from "react";
import "./doctordash.css";
import Scheduled from "./Scheduled";
import NewRequests from "./NewRequests";
import Completed from "./Completed";


const Appointments = () => {
  const [apt,setApt]=useState("Scheduled");

  return (
    <div className="appointments-container">
      <div className="appointment-nav">
        <h2 className="nav-title">Appointments</h2>
        <button className={`nav-btn ${(apt==="Scheduled")?"active":""}`} onClick={()=>{setApt("Scheduled")}}>Scheduled</button>
        <button className={`nav-btn ${(apt==="New Requests")?"active":""}`} onClick={()=>{setApt("New Requests")}}>New Requests</button>
        <button className={`nav-btn ${(apt==="Completed")?"active":""}`} onClick={()=>{setApt("Completed")}}>Completed</button>
      </div>

      <div className="appointment-content">
        {(apt==="Scheduled") && <Scheduled/>}
        {(apt==="New Requests") && <NewRequests/>}
        {(apt==="Completed") && <Completed/>}
      </div>
    </div>
  );
};

export default Appointments;
