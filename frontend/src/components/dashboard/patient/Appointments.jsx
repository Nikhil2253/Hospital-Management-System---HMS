import { useState } from "react";
import "./patientdash.css";
import ViewAppointments from "./ViewAppointments";
import BookAppointments from "./BookAppointments";
import BookHospitalAppointment from "./BookHospital";
const Appointments = () => {
  const [view, setView] = useState("view");
  return (
    <>
     <div className="patient-appointment-container">
        <div className="patient-appointment-nav">
            <div className="patient-appointment-header">Appointments</div>
            <button className={`patient-appointment-button ${(view==="view")?"active":""}`} onClick={()=>{setView("view")}}>View Appoinments</button>
            <button className={`patient-appointment-button ${(view==="book")?"active":""}`} onClick={()=>{setView("book")}}>Book Appointments</button>
            <button className={`patient-appointment-button ${(view==="bookH")?"active":""}`} onClick={()=>{setView("bookH")}}>Book Hospital Appointments</button>
        </div>
        <div className="patient-appointment-content">
            {view==="view" && <ViewAppointments/>}
            {view==="book" && <BookAppointments/>}
            {view==="bookH" && <BookHospitalAppointment/>}
        </div>
     </div>
    </>
  )
}

export default Appointments;