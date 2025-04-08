import "../../styles/patlogin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientLogin = () => {
  const [name, setName] = useState("");
  const [regId, setRegId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (e, type) => {
    if (type === "name") setName(e.target.value);
    if (type === "regId") setRegId(e.target.value);
    if (type === "password") setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/patient/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          regId: regId,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response Data:", data);

      navigate(`/patient/${regId}`);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="patient-login-container">
      <div className="login-pat-div">
        <div className="login-pat-header">Patient Login</div>
        <form className="login-pat-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Enter Your Name</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => handleChange(e, "name")}
            required
          />

          <label htmlFor="regId">Enter Your Registration ID</label>
          <input
            type="text"
            id="regId"
            value={regId}
            placeholder="Enter your Registration ID"
            onChange={(e) => handleChange(e, "regId")}
            required
          />

          <label htmlFor="password">Enter Your Password</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => handleChange(e, "password")}
            required
          />

          <button type="submit" className="login-pat-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientLogin;
