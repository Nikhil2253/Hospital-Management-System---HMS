import { useContext, useEffect, useState } from "react";
import { PatientContext } from "../PatientDashboard";
import "./patientdash.css";

const ViewAppointments = () => {
  const { patient } = useContext(PatientContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!patient?.regId) return;

      try {
        const response = await fetch("http://localhost:5000/api/patient/getAppointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ regId: patient.regId }),
        });

        const res = await response.json();

        if (!response.ok) {
          throw new Error(res.message || "Failed to fetch appointments");
        }

        setAppointments(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patient]);

  if (loading) return <p className="loading-message">Loading appointments...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="view-appointments-container">
      <h2 className="view-appointments-header">Ongoing Appointments</h2>
      {appointments.length === 0 ? (
        <p className="no-appointments">No ongoing appointments.</p>
      ) : (
        <div className="view-appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment.appointmentId} className="view-appointments-card">
              <div className="view-appoinments-header">
                <h3>{appointment.problem}</h3>
                <span className={`badge ${appointment.isEmergency ? "emergency" : ""}`}>
                  {appointment.isEmergency ? "Emergency" : "Routine"}
                </span>
              </div>
              <p className="view-appointments-desc">{appointment.description}</p>

              <div className="view-appointments-info">
                <p><strong>Patient ID:</strong> {appointment.PatRegID}</p>
                <p><strong>Doctor ID:</strong> {appointment.selectedDoctor}</p>
                <p><strong>Age:</strong> {appointment.age} | <strong>Gender:</strong> {appointment.gender}</p>
                <p><strong>Mode:</strong> {appointment.mode}</p>
                <p><strong>Date:</strong> {appointment.date} | <strong>Time Slot:</strong> {appointment.timeSlot}</p>
                <p><strong>Phone:</strong> {appointment.phone}</p>
                <p><strong>Email:</strong> {appointment.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAppointments;
