import "../../styles/patreg.css";
import { useState } from "react";

const PatientRegister = () => {
  const [patient, setPatient] = useState({
    name: "",
    regId: generateRegId(),
    gender: "",
    password: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    email: "",
  });

  function generateRegId() {
    return `PAT-${Math.floor(100000 + Math.random() * 900000)}`; 
  }

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !patient.name ||
      !patient.regId ||
      !patient.gender ||
      !patient.dateOfBirth ||
      !patient.password ||
      !patient.address ||
      !patient.phone ||
      !patient.email
    ) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(patient)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Patient registered successfully:", data);
      alert("Patient registered successfully!");
    } catch (error) {
      console.error("Error registering patient:", error);
      alert("Error registering patient. Try again.");
    }
  };

  return (
    <div className="patient-login-container">
      <div className="login-pat-div">
        <div className="login-pat-header">Patient Registration</div>
        <form className="login-pat-form" onSubmit={handleSubmit}>
          <div className="grid-container">
            <div className="grid-item">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" value={patient.name} onChange={handleChange} required />
            </div>

            <div className="grid-item">
              <label htmlFor="regId">Registration ID</label>
              <input type="text" name="regId" value={patient.regId} readOnly />
            </div>

            <div className="grid-item">
              <label htmlFor="gender">Gender</label>
              <select name="gender" value={patient.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid-item">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input type="date" name="dateOfBirth" value={patient.dateOfBirth} onChange={handleChange} required />
            </div>

            <div className="grid-item">
              <label htmlFor="phone">Phone</label>
              <input type="text" name="phone" value={patient.phone} onChange={handleChange} required />
            </div>

            <div className="grid-item">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={patient.email} onChange={handleChange} required />
            </div>

            <div className="grid-item">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={patient.password} onChange={handleChange} required />
            </div>

            <div className="grid-item full-width">
              <label htmlFor="address">Address</label>
              <input type="text" name="address" value={patient.address} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="login-pat-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;
