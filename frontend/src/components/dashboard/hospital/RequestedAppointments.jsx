import { useContext, useEffect, useState } from "react";
import { HospitalContext } from "../HospitalDashboard";
import "./hospitaldash.css";

const RequestedAppointments = () => {
  const { hospital } = useContext(HospitalContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assigningId, setAssigningId] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchRequestedAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/appointment/getAppointmentsDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ids: hospital.newRequestedAppointments })
        });

        if (!response.ok) {
          throw new Error("Failed to fetch requested appointments.");
        }

        const res = await response.json();
        setAppointments(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestedAppointments();

    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doctor/getDoctors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ids: hospital.doctors })
        });

        const data = await res.json();
        setDoctors(data || []);
      } catch (err) {
        console.error("Error loading doctors", err);
      }
    };

    fetchDoctors();
  }, [hospital.newRequestedAppointments, hospital.doctors]);

  const handleReject = (id) => {
    rejectAppointment(id);
  };

  const rejectAppointment = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/appointment/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: id, hospitalId: hospital.registrationId })
      });

      const res = await response.json();

      if (!response.ok) throw new Error(res.message || "Failed to reject appointment.");

      alert("Appointment rejected successfully.");
      setAppointments((prev) => prev.filter((apt) => apt._id !== id));
    } catch (error) {
      console.error("Error rejecting appointment:", error);
      alert("Error rejecting appointment. Please try again.");
    }
  };

  const handleAssignDoctor = (id) => {
    setAssigningId(id);
  };

  const handleAssignSubmit = async () => {
    if (!selectedDoctor) return alert("Please select a doctor.");
    try {
      const response = await fetch("http://localhost:5000/api/appointment/assignDoctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({hospitalId:hospital.registrationId, _id: assigningId, doctorRegId: selectedDoctor })
      });

      const res = await response.json();
      if (!response.ok) throw new Error(res.message || "Failed to assign doctor");

      alert("Doctor assigned successfully");
      setAssigningId(null);
      setSelectedDoctor("");
    } catch (err) {
      console.error(err);
      alert("Error assigning doctor");
    }
  };

  if (loading) return <div className="loading">Loading requested appointments...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="appointments-hos-container">
      <h2 className="appointments-title">Requested Appointments</h2>

      {appointments.length > 0 ? (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient Reg ID</th>
              <th>Date</th>
              <th>Problem</th>
              <th>Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt._id} className="appointment-row">
                <td>{apt.PatRegID}</td>
                <td>{apt.date}</td>
                <td>{apt.problem}</td>
                <td>{apt.mode}</td>
                <td>
                  <button className="cancel-btn" onClick={() => handleReject(apt._id)}>Reject</button>
                  <button className="reschedule-btn" onClick={() => handleAssignDoctor(apt._id)}>Assign Doctor</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-appointments">No requested appointments.</p>
      )}

      {assigningId && (
        <div className="assign-doctor-form-overlay">
          <div className="assign-doctor-form">
            <button className="close-btn" onClick={() => setAssigningId(null)}>✕</button>
            <h3>Assign Doctor</h3>
            <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
              <option value="">Select Doctor</option>
              {doctors.map(doc => (
                <option key={doc.regId} value={doc.regId}>
                  {doc.name} ({doc.regId})
                </option>
              ))}
            </select>
            <button onClick={handleAssignSubmit}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestedAppointments;
