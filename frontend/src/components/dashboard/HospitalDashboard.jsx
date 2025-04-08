import { useState, createContext, useEffect } from "react";
import SideBar from "./hospital/SideBar";
import Appointments from "./hospital/Appointments";
import Doctors from "./hospital/Doctors";
import Patients from "./hospital/Patients";
import Settings from "./hospital/Settings";
import HospitalOverview from "./hospital/HospitalOverview";
import "./hospital/hospitaldash.css";
import { useParams } from "react-router-dom";
import Statistics from "./hospital/Statistics";


export const HospitalContext = createContext(null);

const HospitalDashboard = () => {
  const [hospital, setHospital] = useState({});
  const [act, setAct] = useState("Overview");
  const { id } = useParams();

  const fetchHospital = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/hospital/getHospital", {
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

      setHospital(result.hospital);
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  };

  useEffect(() => {
    fetchHospital();
  }, [id]);

  return (
    <HospitalContext.Provider value={{ hospital,setAct }}>
      <div className="hospital-container">
        <SideBar />
        <div className="hospital-content">
          {act === "Dashboard" && <Statistics />}
          {act === "Overview" && <HospitalOverview />}
          {act === "Doctors" && <Doctors />}
          {act === "Patients" && <Patients />}
          {act === "Appointments" && <Appointments />}
          {act === "Settings" && <Settings />}
        </div>
      </div>
    </HospitalContext.Provider>
  );
};

export default HospitalDashboard;
