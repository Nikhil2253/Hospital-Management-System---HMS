import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../DoctorDashboard";
import "./doctorDash.css";

const Scheduled = () => {
  const { doctor } = useContext(DoctorContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctor?.regId) return;

      try {
        const response = await fetch("http://localhost:5000/api/doctor/fetchAppointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ regId: doctor.regId }),
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
  }, [doctor]);

  const handleComplete = (id) => {
    console.log("Completed appointment:", id);
    completedAppointment(id);
  };
  
  const completedAppointment = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/doctor/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: id, regId: doctor.regId })
      });
  
      const res = await response.json();
  
      if (!response.ok) {
        throw new Error(res.message || "Failed to mark appointment as completed");
      }
  
      alert("Appointment marked as completed.");
    } catch (error) {
      console.error("Error completing appointment:", error.message);
      alert("Error completing appointment: " + error.message);
    }
  };
  

  return (
    <div className="scheduled-container">
      <h2 className="scheduled-header">Scheduled Appointments</h2>

      {loading ? (
        <p className="loading-message">Loading appointments...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : appointments.length === 0 ? (
        <p className="no-appointments">No scheduled appointments.</p>
      ) : (
        <div className="scheduled-list">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="scheduled-card">
              <div className="scheduled-card-header">
                <h3>{appointment.problem}</h3>
                <span className={`badge ${appointment.isEmergency ? "emergency" : ""}`}>
                  {appointment.isEmergency ? "Emergency" : "Routine"}
                </span>
              </div>
              <p className="scheduled-desc">{appointment.description || "No description provided"}</p>

              <div className="scheduled-info">
                <p><strong>Patient ID:</strong> {appointment.PatRegID}</p>
                <p><strong>Patient Name:</strong> {appointment.patientName || "N/A"}</p>
                <p><strong>Phone:</strong> {appointment.phone}</p>
                <p><strong>Email:</strong> {appointment.email}</p>
                <p><strong>Date:</strong> {appointment.date} | <strong>Time:</strong> {appointment.time}</p>
                <p><strong>Mode:</strong> {appointment.mode}</p>
              </div>

              <button className="complete-btn" onClick={() => handleComplete(appointment._id)}>
                Complete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Scheduled;
