import "../../styles/hosreg.css";
import { useState, useEffect } from "react";

const HospitalRegister = () => {
  const [name, setName] = useState("");
  const [regId, setRegId] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

 
  useEffect(() => {
    const randomRegId = "HOS-" + Math.floor(100000 + Math.random() * 900000); // Example: HOS-123456
    setRegId(randomRegId);
  }, []);

  const handleChange = (e, type) => {
    if (type === "name") setName(e.target.value);
    if (type === "password") setPassword(e.target.value);
    if (type === "address") setAddress(e.target.value);
    if (type === "phone") setPhone(e.target.value);
    if (type === "email") setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/hospital", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, registrationId:regId, password, address, phone, email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response Data:", data);
    } catch (error) {
      console.error("Error sending hospital data:", error);
    }
  };

  return (
    <div className="hospital-login-container">
      <div className="login-div">
        <div className="login-header">Hospital Registration</div>
        <form className="login-form" onSubmit={handleSubmit}>
    <label htmlFor="name">Enter Your Name</label>
    <input type="text" id="name" value={name} placeholder="Enter your name" onChange={(e) => handleChange(e, "name")} required />

    <label htmlFor="regId">Your Registration ID</label>
    <input type="text" id="regId" value={regId} readOnly />

    
    <div className="input-grid">
        <div>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={address} placeholder="Enter address" onChange={(e) => handleChange(e, "address")} required />
        </div>

        <div>
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" value={phone} placeholder="Enter phone" onChange={(e) => handleChange(e, "phone")} required />
        </div>

        <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} placeholder="Enter email" onChange={(e) => handleChange(e, "email")} required />
        </div>
    </div>

    <label htmlFor="password">Enter Your Password</label>
    <input type="password" id="password" value={password} placeholder="Enter your password" onChange={(e) => handleChange(e, "password")} required />

    <button type="submit" className="login-button">Register</button>
</form>

      </div>
    </div>
  );
};

export default HospitalRegister;
