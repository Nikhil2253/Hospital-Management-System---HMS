import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../DoctorDashboard";

export default function NewRequests() {
  const { doctor } = useContext(DoctorContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctor?.regId) return;

      try {
        const response = await fetch("http://localhost:5000/api/doctor/fetchNewAppointment", {
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

  const handleAccept = async (id, patid) => {
    try {
      const response = await fetch("http://localhost:5000/api/doctor/acceptAppointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aptid: id, regId: doctor.regId, PatRegID: patid }),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || "Failed to accept appointment");
      }

      setAppointments((prev) => prev.filter((apt) => apt._id !== id));
      alert("Appointment accepted successfully!");
    } catch (error) {
      alert(error.message || "Something went wrong while accepting the appointment");
    }
  };

  const handleReject = async (id, patid) => {
    try {
      const response = await fetch("http://localhost:5000/api/doctor/rejectAppointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aptid: id, regId: doctor.regId, PatRegID: patid }),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || "Failed to reject appointment");
      }

      setAppointments((prev) => prev.filter((apt) => apt._id !== id));
      alert("Appointment rejected successfully!");
    } catch (error) {
      alert(error.message || "Something went wrong while rejecting the appointment");
    }
  };

  const styles = {
    container: {
      padding: "16px",
    },
    header: {
      fontSize: "20px",
      color: "#b00020",
      fontWeight: "bold",
      marginBottom: "12px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid #f8d7da",
    },
    th: {
      backgroundColor: "#ffe5e8",
      color: "#b00020",
      textAlign: "left",
      padding: "12px",
      borderBottom: "1px solid #f1c0c0",
    },
    td: {
      backgroundColor: "#fff5f5",
      padding: "12px",
      borderBottom: "1px solid #f1c0c0",
    },
    button: {
      padding: "6px 12px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      marginRight: "6px",
    },
    acceptBtn: {
      backgroundColor: "#2a9d8f",
      color: "white",
    },
    rejectBtn: {
      backgroundColor: "#e63946",
      color: "white",
    },
    loading: {
      fontStyle: "italic",
    },
    error: {
      color: "#e63946",
    },
    noData: {
      fontStyle: "italic",
      color: "#888",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>New Appointment Requests</h2>

      {loading ? (
        <p style={styles.loading}>Loading appointments...</p>
      ) : error ? (
        <p style={styles.error}>Error: {error}</p>
      ) : appointments.length === 0 ? (
        <p style={styles.noData}>No new requests.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Problem</th>
              <th style={styles.th}>Patient ID</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Mode</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Doctor</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td style={styles.td}>{appointment.problem}</td>
                <td style={styles.td}>{appointment.PatRegID}</td>
                <td style={styles.td}>{appointment.phone}</td>
                <td style={styles.td}>{appointment.email}</td>
                <td style={styles.td}>{appointment.date}</td>
                <td style={styles.td}>{appointment.time}</td>
                <td style={styles.td}>{appointment.mode}</td>
                <td style={styles.td}>{appointment.description || "N/A"}</td>
                <td style={styles.td}>{doctor.name}</td>
                <td style={styles.td}>Completed</td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.button, ...styles.acceptBtn }}
                    onClick={() => handleAccept(appointment._id, appointment.PatRegID)}
                  >
                    Accept
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.rejectBtn }}
                    onClick={() => handleReject(appointment._id, appointment.PatRegID)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
