import { useContext, useEffect, useState } from "react";
import "./doctordash.css";
import { DoctorContext } from "../DoctorDashboard";

const Patients = () => {
  const { doctor } = useContext(DoctorContext);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctor/getPatients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: doctor.patients }),
        });

        const res = await response.json();
        setPatients(res.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    if (doctor?.patients?.length > 0) {
      fetchPatients();
    }
  }, [doctor]);

  return (
    <div className="hos-containers">
      <div className="hos-nav">My Patients</div>
      <div className="hos-table-wrapper">
        <table className="hos-patient-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Reg ID</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td>
                  <div className="hos-avatar-circle">
                    {patient.name.charAt(0).toUpperCase()}
                  </div>
                </td>
                <td>{patient.name}</td>
                <td>{patient.regId}</td>
                <td>{patient.phone}</td>
                <td>{patient.email}</td>
                <td>{patient.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
