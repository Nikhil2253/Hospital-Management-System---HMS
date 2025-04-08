import "../../styles/docreg.css";
import { useState } from "react";

const DoctorRegister = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    regId: generateRegId(), 
    password: "",
    gender: "",
    phone: "",
    email: "",
    specialization: "",
    hospital: "",
    hospitalId: ""
  });

  function generateRegId() {
    return `DOC-${Math.floor(100000 + Math.random() * 900000)}`; 
  }

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !doctor.name ||
      !doctor.regId ||
      !doctor.password ||
      !doctor.gender ||
      !doctor.phone ||
      !doctor.email ||
      !doctor.specialization ||
      !doctor.hospital ||
      !doctor.hospitalId
    ) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(doctor)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Doctor registered successfully:", data);
    } catch (error) {
      console.error("Error registering doctor:", error);
    }
  };

  return (
    <div className="doctor-login-container">
      <div className="login-doc-div">
        <div className="login-doc-header">Doctor Registration</div>
        <form className="login-doc-form" onSubmit={handleSubmit}>
          <div className="grid-container">
            <div className="grid-item">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" value={doctor.name} onChange={handleChange} required />
            </div>

            <div className="grid-item">
              <label htmlFor="regId">Registration ID</label>
              <input type="text" name="regId" value={doctor.regId} readOnly />
            </div>

            <div className="grid-item">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={doctor.password} onChange={handleChange} required />
            </div>

            <div className="grid-item">
              <label htmlFor="gender">Gender</label>
              <select name="gender" value={doctor.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="grid-item">
              <label htmlFor="phone">Phone</label>
              <input type="text" name="phone" value={doctor.phone} onChange={handleChange} required />
            </div>

            <div className="grid-item">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={doctor.email} onChange={handleChange} required />
            </div>

            <div className="grid-item">
              <label htmlFor="specialization">Specialization</label>
              <input type="text" name="specialization" value={doctor.specialization} onChange={handleChange} required />
            </div>

            <div className="grid-item">
              <label htmlFor="hospital">Hospital</label>
              <input type="text" name="hospital" value={doctor.hospital} onChange={handleChange} required />
            </div>

            <div className="grid-item">
              <label htmlFor="hospitalId">Hospital ID</label>
              <input type="text" name="hospitalId" value={doctor.hospitalId} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="login-doc-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister;
