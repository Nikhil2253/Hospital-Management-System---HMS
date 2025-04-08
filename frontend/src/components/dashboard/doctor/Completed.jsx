import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../DoctorDashboard";
import "./doctorDash.css";

const Completed = () => {
  const { doctor } = useContext(DoctorContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctor?.regId) return;

      try {
        const response = await fetch("http://localhost:5000/api/doctor/fetchCompletedAppointment", {
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

  return (
    <div className="scheduled-container">
      <h2 className="scheduled-header">Completed Appointments</h2>

      {loading ? (
        <p className="loading-message">Loading completed appointments...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : appointments.length === 0 ? (
        <p className="no-appointments">No completed appointments.</p>
      ) : (
        <div className="table-wrapper">
          <table className="appointment-table completed-theme">
            <thead>
              <tr>
                <th>Problem</th>
                <th>Patient ID</th>
                <th>Doctor Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.problem}</td>
                  <td>{appointment.PatRegID}</td>
                  <td>{doctor.name}</td>
                  <td>{appointment.phone}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.timeSlot}</td>
                  <td>{appointment.mode}</td>
                  <td className="status-cell">Completed</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Completed;
