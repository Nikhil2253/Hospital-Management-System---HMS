import { useContext, useEffect, useState } from "react";
import { PatientContext } from "../PatientDashboard";

const MedicalRecords = () => {
  const { patient } = useContext(PatientContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100); 
  }, []);

  return (
    <div className="patient-appointment-container">
      <div className="patient-appointment-nav">
        <h2 className="patient-apointment-header">Medical History</h2>
      </div>
      <div className={`patient-appointment-content ${isVisible ? "fade-in-up" : ""}`}>
        {patient?.medicalHistory?.length > 0 ? (
          <table className="patient-medical-table">
            <thead>
              <tr>
                <th>Diagnosis Date</th>
                <th>Disease</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {patient.medicalHistory.map((record, index) => (
                <tr key={index}>
                  <td>
                    {record.diagnosisDate
                      ? new Date(record.diagnosisDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>{record.condition || "N/A"}</td>
                  <td>{record.doctor || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No medical records available.</p>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
