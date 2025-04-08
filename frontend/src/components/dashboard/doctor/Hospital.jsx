import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../DoctorDashboard";
import { FaHospital, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaCalendarAlt, FaUserMd, FaUserInjured } from "react-icons/fa";
import "./doctordash.css";

const Hospital = () => {
  const { doctor } = useContext(DoctorContext);
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/hospital/getDetails/${doctor.hospitalId}`);
        const res = await response.json();
        if (res.success) {
          setHospital(res.data);
        } else {
          console.error("Failed to fetch hospital details:", res.message);
        }
      } catch (error) {
        console.error("Error fetching hospital details:", error);
      }
    };

    if (doctor?.hospitalId) {
      fetchHospitalDetails();
    }
  }, [doctor]);

  return (
    <div className="hos-containers">
      <div className="hos-nav">
        <div className="hos-title">Hospitals</div>
      </div>
      <div className="hos-content">

      {hospital ? (
        <div className="hospital-card red-theme">
          <h2 className="hospital-name"><FaHospital style={{ marginRight: "8px" }} />{hospital.name}</h2>
          <div className="hospital-info-grid">
            <div><FaCalendarAlt /> <strong>Reg ID:</strong> {hospital.registrationId}</div>
            <div><FaPhoneAlt /> <strong>Phone:</strong> {hospital.phone}</div>
            <div><FaMapMarkerAlt /> <strong>Address:</strong> {hospital.address}</div>
            <div><FaEnvelope /> <strong>Email:</strong> {hospital.email}</div>
            <div><FaCalendarAlt /> <strong>Reg Date:</strong> {new Date(hospital.registrationDate).toLocaleDateString()}</div>
            <div><FaUserMd /> <strong>Doctors:</strong> {hospital.doctorsCount || 0}</div>
            <div><FaUserInjured /> <strong>Patients:</strong> {hospital.patientsCount || 0}</div>
          </div>
        </div>
      ) : (
        <p className="hos-loading">Loading hospital details...</p>
      )}
      </div>
    </div>
  );
};

export default Hospital;
