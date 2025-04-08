import { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./doctor/SideBar";
import  "./doctor/doctordash.css";
import Appointments from "./doctor/Appointments";
import Patients from "./doctor/Patients";
import Settings from "./doctor/Settings";
import ViewDocProfile from "./doctor/ViewDocProfile";
import Hospital from "./doctor/Hospital"
export const DoctorContext = createContext(null);

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState({});
  const [act, setAct] = useState("Appointments");
  const { id } = useParams();

  const fetchDoctor = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctor/getDoc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ regId: id }),
      });

      if (!response.ok) {
        throw new Error(`Error fetching doctor: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      setDoctor(result.data);
    } catch (error) {
      console.error("Error fetching doctor:", error);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  return (
    <DoctorContext.Provider value={{doctor,setAct}}>
      <div className="container">
        <SideBar />
        {(act=="View Profile") && <ViewDocProfile/>}
        {(act=="Appointments") && <Appointments/>}
        {(act=="Patients") && <Patients/>}
        {(act=="Settings") && <Settings/>}
        {(act=="Hospital") && <Hospital/>}
      </div>
    </DoctorContext.Provider>
  );
};

export default DoctorDashboard;
