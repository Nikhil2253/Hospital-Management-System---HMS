import { useContext, useEffect, useState } from "react";
import { HospitalContext } from "../HospitalDashboard";
import "./hospitaldash.css";

const ScheduledAppointments = () => {
  const { hospital } = useContext(HospitalContext);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorFilter, setDoctorFilter] = useState("");
  const [patientFilter, setPatientFilter] = useState("");
  const [problemFilter, setProblemFilter] = useState("");
  const [sortOption, setSortOption] = useState("latest");

  const [reschedulingId, setReschedulingId] = useState(null);
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/appointment/getAppointmentsDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: hospital.appointments }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch appointments.");
        }

        const res = await response.json();
        setAppointments(res.data);
        setFilteredAppointments(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [hospital.appointments]);

  const handleCancel = async (id) => {
    try {
      const res = await fetch("http://localhost:5000/api/appointment/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setAppointments(prev => prev.filter(app => app._id !== id));
        setFilteredAppointments(prev => prev.filter(app => app._id !== id));
      } else {
        console.error("Failed to cancel appointment");
      }
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  const handleReschedule = (id) => {
    setReschedulingId(id);
    setNewDate("");
  };

  const handleRescheduleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/appointment/reschedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reschedulingId, newDate }),
      });

      if (res.ok) {
        setAppointments(prev => prev.map(app => app._id === reschedulingId ? { ...app, date: newDate } : app));
        setFilteredAppointments(prev => prev.map(app => app._id === reschedulingId ? { ...app, date: newDate } : app));
        setReschedulingId(null);
        setNewDate("");
      } else {
        console.error("Failed to reschedule");
      }
    } catch (err) {
      console.error("Reschedule error:", err);
    }
  };

  const handleRescheduleCancel = () => {
    setReschedulingId(null);
    setNewDate("");
  };

  const filterAppointments = () => {
    let filtered = appointments;
    if (doctorFilter) {
      filtered = filtered.filter(apt => apt.selectedDoctor.includes(doctorFilter));
    }
    if (patientFilter) {
      filtered = filtered.filter(apt => apt.PatRegID.includes(patientFilter));
    }
    if (problemFilter) {
      filtered = filtered.filter(apt => apt.problem.toLowerCase().includes(problemFilter.toLowerCase()));
    }
    switch (sortOption) {
      case "latest":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        filtered.sort((a, b) => a.problem.localeCompare(b.problem));
    }
    setFilteredAppointments(filtered);
  };

  useEffect(() => {
    filterAppointments();
  }, [doctorFilter, patientFilter, problemFilter, sortOption]);

  if (loading) return <div className="loading">Loading appointments...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="appointments-hos-container">
      <h2 className="appointments-title">Scheduled Appointments</h2>

      <div className="filter-container">
        <label>Sort by:</label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="latest">Latest Date</option>
          <option value="oldest">Oldest Date</option>
        </select>
      </div>

      <div className="filter-container">
        <label>Doctor ID:</label>
        <input type="text" value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)} />
        <label>Patient ID:</label>
        <input type="text" value={patientFilter} onChange={(e) => setPatientFilter(e.target.value)} />
        <label>Problem:</label>
        <input type="text" value={problemFilter} onChange={(e) => setProblemFilter(e.target.value)} />
      </div>

      {filteredAppointments.length > 0 ? (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Doctor Reg ID</th>
              <th>Patient Reg ID</th>
              <th>Date</th>
              <th>Problem</th>
              <th>Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((apt) => (
              <tr key={apt._id} className="appointment-row">
                <td>{apt.selectedDoctor}</td>
                <td>{apt.PatRegID}</td>
                <td>{apt.date}</td>
                <td>{apt.problem}</td>
                <td>{apt.mode}</td>
                <td>
                  {reschedulingId === apt._id ? (
                    <div style={{ backgroundColor:"white",display: "flex", flexDirection: "column", gap: "6px", padding: "10px", borderRadius: "6px" }}>
                      <input
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        style={{ padding: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
                      />
                      <div style={{ backgroundColor:"white",display: "flex", gap: "8px" }}>
                        <button onClick={handleRescheduleSave} style={{ backgroundColor: "#09a", color: "#fff", padding: "4px 8px", borderRadius: "4px", border: "none" }}>Save</button>
                        <button onClick={handleRescheduleCancel} style={{ backgroundColor: "orangered", color: "#fff", padding: "4px 8px", borderRadius: "4px", border: "none" }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button className="cancel-btn" onClick={() => handleCancel(apt._id)}>Cancel</button>
                      <button className="reschedule-btn" onClick={() => handleReschedule(apt._id)}>Reschedule</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-appointments">No scheduled appointments.</p>
      )}
    </div>
  );
};

export default ScheduledAppointments;
