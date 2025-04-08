import { useContext, useEffect, useState } from "react";
import { HospitalContext } from "../HospitalDashboard";
import "./hospitaldash.css";
const Patients = () => {
  const { hospital } = useContext(HospitalContext);
  const [patients, setPatients] = useState([]);

   useEffect(() => {
    console.log(hospital.patients);
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/hospital/getPatients",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: hospital.patients }),
          }
        );
        const patientData = await response.json();
        setPatients(patientData);
      } catch (error) {
        console.error("Error fetching Patients:", error);
      }
    };
    fetchPatients();
  }, [hospital]);
  
  const giveDOB = (date) => {
    const parsedDate = new Date(date);
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = parsedDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const dischargePatient=(id)=>{
    discharge(id);
  }

  const discharge=async(id)=>{
    try {
      const response = await fetch(
        "http://localhost:5000/api/hospital/dischargePatient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ regId: hospital.registrationId, id }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to discharge patient:", errorData.message);
        alert(`Error: ${errorData.message || "Unable to discharge patient."}`);
        return;
      }

      const result = await response.json();
      console.log("Patient discharged successfully:", result);
      alert("Patient discharged successfully.");
    } catch (error) {
      console.error("Error while discharging patient:", error.message);
      alert("An error occurred. Please try again later.");
    }
  }
  return (
    <div className="doc-containers">
      <div className="doc-nav">
        <div className="doc-title">Patients</div>
      </div>
      <div className="doc-content">
        {
          (patients.length===0 )&& (
            <div className="patient-div">
              No Patient is Currently Admitted in Hospital
            </div>
          )
        }
        {patients.length !== 0 && (
          <div className="patients-div">
            {patients.map((pat) => {
              return (
                <div key={pat.regId} className="patients-div-card">
                  <div className="pat-det">
                    <div className="pat-name">
                      Name: <span>{pat.name}</span>
                    </div>
                    <div className="pat-regId">
                      ID: <span>{pat.regId}</span>
                    </div>
                    <div className="pat-phone">
                      Contact:<span> {pat.phone}</span>
                    </div>
                    <div className="pat-email">
                      Email: <span>{pat.email}</span>
                    </div>
                    <div className="pat-email">
                      Address: <span>{pat.address}</span>
                    </div>
                    <div className="pat-email">
                      DOB: <span>{giveDOB(pat.dateOfBirth)}</span>
                    </div>
                    <div className="pat-email">
                      Gender: <span>{pat.gender}</span>
                    </div>
                  </div>

                  <div className="pat-button">
                    <div className="pat-discharge-button" onClick={()=>dischargePatient(pat._id)}>Discharge</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Patients;