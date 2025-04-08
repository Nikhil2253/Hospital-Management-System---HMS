import { useState, useEffect, useContext } from "react";
import "./patientdash.css";
import { PatientContext } from "../PatientDashboard";

const BookHospitalAppointment = () => {
  const { patient } = useContext(PatientContext);
  const [hospitals, setHospitals] = useState([]);
  const [problem, setProblem] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/hospital/getAll",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        const res = await response.json();
        setHospitals(res.data);
      } catch (error) {
        console.error("Error fetching hospitals: ", error);
      }
    };
    fetchHospitals();
  }, []);

  const bookAppointment = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/api/appointment/bookH",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            PatRegID: patient.regId,
            email: patient.email,
            phone: patient.phone,
            problem,
            age,
            gender,
            description,
            date,
            timeSlot,
            hospitalId,
            isEmergency,
            mode: "In-Person",
          }),
        }
      );

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
    if (
      !problem ||
      !age ||
      !gender ||
      !description ||
      !date ||
      !timeSlot ||
      !hospitalId
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    console.log(patient.regId,patient.email,patient.phone,problem,age,gender,description,date,timeSlot,hospitalId,isEmergency);
    bookAppointment();
  };

  const resetForm = () => {
    setProblem("");
    setAge("");
    setGender("");
    setDescription("");
    setDate("");
    setTimeSlot("");
    setHospitalId("");
    setIsEmergency(false);
  };

  return (
    <div className="patient-appointment-book-cont">
      <form className="book-appointment-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Enter Problem"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <div className="gender-selection">
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            Female
          </label>
        </div>

        <textarea
          placeholder="Enter Description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <div className="time-doctor-container">
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          >
            <option value="">Select Preferred Time</option>
            <option value="Morning (9 AM - 12 PM)">
              Morning (9 AM - 12 PM)
            </option>
            <option value="Afternoon (12 PM - 4 PM)">
              Afternoon (12 PM - 4 PM)
            </option>
            <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
          </select>

          <select
            value={hospitalId}
            onChange={(e) => setHospitalId(e.target.value)}
            required
          >
            <option value="">Select Hospital</option>
            {hospitals.map((hospital) => (
              <option key={hospital._id} value={hospital.registrationId}>
                {hospital.name} - {hospital.registrationId}
              </option>
            ))}
          </select>
        </div>

        <label className="emergency-checkbox">
          <input
            type="checkbox"
            checked={isEmergency}
            onChange={() => setIsEmergency(!isEmergency)}
          />{" "}
          This is an emergency appointment
        </label>

        <button type="submit" disabled={loading} className="appointment-submit-btn ">
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default BookHospitalAppointment;
