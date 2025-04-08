import { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import PatientSideBar from "./patient/PatientSideBar";
import "./patient/patientdash.css";
import Appointments from "./patient/Appointments";
import MedicalHistory from "./patient/MedicalHistory";
import Settings from "./patient/Settings";
import ViewPatientProfile from "./patient/ViewPatientProfile";

export const PatientContext = createContext(null);

const PatientDashboard = () => {
  const [patient, setPatient] = useState({});
  const [act, setAct] = useState("Appointments");
  const { id } = useParams();

  const fetchPatient = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/patient/getPatient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ regId: id }),
      });

      if (!response.ok) {
        throw new Error(`Error fetching patient: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      setPatient(result.data);
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  return (
    <PatientContext.Provider value={{ patient, setAct }}>
      <div className="container">
        <PatientSideBar />
        {(act=="View-Profile") && <ViewPatientProfile/>}
        {(act === "Appointments") && <Appointments />}
        {(act === "Medical History") && <MedicalHistory />}
        {(act === "Settings") && <Settings />}
      </div>
    </PatientContext.Provider>
  );
};

export default PatientDashboard;
