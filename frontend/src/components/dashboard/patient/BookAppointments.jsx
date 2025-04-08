import { useState, useEffect, useContext } from "react";
import "./patientdash.css";
import { PatientContext } from "../PatientDashboard";

const BookAppointments = () => {
  const {patient}=useContext(PatientContext);
  const [doctors, setDoctors] = useState([]);
  const [PatRegID, setPatRegID] = useState(patient.regId);
  const [email, setEmail] = useState(patient.email);
  const [phone, setPhone] = useState(patient.phone);
  const [problem, setProblem] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [mode, setMode] = useState("In-Person");
  const [isEmergency, setIsEmergency] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctor/getAll", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const res = await response.json();
        setDoctors(res.data);
      } catch (error) {
        console.error("Error fetching doctors: ", error);
      }
    };
    fetchDoctors();
  }, []);

  const bookAppointment = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/appointment/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          PatRegID, email, phone, problem, age, gender, description, date, timeSlot, selectedDoctor: selectedDoctor.slice(-10), mode, isEmergency, hospitalId
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to book appointment. Please try again.");
      }
      alert("Appointment booked successfully!");
      resetForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!PatRegID || !email || !phone || !problem || !age || !gender || !description || !date || !timeSlot || !selectedDoctor) {
      setError("Please fill in all required fields.");
      return;
    }
    bookAppointment();
  };

  const resetForm = () => {
    setPatRegID("");
    setEmail("");
    setPhone("");
    setProblem("");
    setAge("");
    setGender("");
    setDescription("");
    setDate("");
    setTimeSlot("");
    setSelectedDoctor("");
    setHospitalId("");
    setMode("In-Person");
    setIsEmergency(false);
  };

  return (
    <div className="patient-appointment-book-cont">
      <form className="book-appointment-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <input type="text" placeholder="Enter Patient Registration ID" value={PatRegID} onChange={(e) => setPatRegID(e.target.value)} readOnly />
        <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}  readOnly/>
        <input type="text" placeholder="Enter Phone No" value={phone} onChange={(e) => setPhone(e.target.value)}  readOnly/>
        <input type="text" placeholder="Enter Problem" value={problem} onChange={(e) => setProblem(e.target.value)} required />
        <input type="number" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)} required />

        <div className="gender-selection">
          <label>Gender:</label>
          <label><input type="radio" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} /> Male</label>
          <label><input type="radio" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} /> Female</label>
        </div>

        <textarea placeholder="Enter Description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <div className="time-doctor-container">
          <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
            <option value="">Select Preferred Time</option>
            <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
            <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
            <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
          </select>

          <select value={selectedDoctor} onChange={(e) => {
            const selectedDoc = doctors.find(doc => doc.regId === e.target.value);
            setSelectedDoctor(e.target.value);
            setHospitalId(selectedDoc.hospitalId);
          }} required>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor.regId}>{doctor.name} - {doctor.regId}</option>
            ))}
          </select>
        </div>

        <div className="appointment-mode">
          <label>Mode of Appointment:</label>
          <label><input type="radio" name="mode" value="In-Person" checked={mode === "In-Person"} onChange={(e) => setMode(e.target.value)} /> In-Person</label>
          <label><input type="radio" name="mode" value="Online" checked={mode === "Online"} onChange={(e) => setMode(e.target.value)} /> Online</label>
        </div>

        <label className="emergency-checkbox">
          <input type="checkbox" checked={isEmergency} onChange={() => setIsEmergency(!isEmergency)} /> This is an emergency appointment
        </label>

        <button type="submit" disabled={loading} className="appointment-submit-btn ">{loading ? "Booking..." : "Book Appointment"}</button>
      </form>
    </div>
  );
};

export default BookAppointments;
