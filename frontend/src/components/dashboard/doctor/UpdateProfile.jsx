import { useContext, useState } from "react";
import "./doctordash.css";
import { DoctorContext } from "../DoctorDashboard";

const UpdateProfile = () => {
  const { doctor } = useContext(DoctorContext);
  const [editingField, setEditingField] = useState("");
  const [editValue, setEditValue] = useState("");

  const handleEdit = (field) => {
    setEditingField(field);
    setEditValue(doctor[field] || "");
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleSave = (field) => {
    saveToDB(field, editValue);
    setEditingField("");
  };

  const saveToDB = async (field, value) => {
    try {
      const response = await fetch("http://localhost:5000/api/doctor/savechanges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ regId: doctor.regId, field, val: value }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error saving doctor data: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("Data saved successfully:", result);
      return result;
    } catch (error) {
      console.error("Error while saving to database:", error.message);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditingField("");
    setEditValue("");
  };

  const renderField = (label, field) => (
    <div className="docprofile-item">
      <span className="docprofile-label">{label}:</span>
      {field === "regId" ? (
        <div className="docprofile-display">
          <span className="docprofile-value">{doctor[field] || "N/A"}</span>
        </div>
      ) : editingField === field ? (
        <div className="docprofile-edit-container">
          <input
            type="text"
            value={editValue}
            onChange={handleChange}
            autoFocus
            className="docprofile-edit-input"
          />
          <button className="docprofile-save-button" onClick={() => handleSave(field)}>Save</button>
          <button className="docprofile-cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="docprofile-display">
          <span className="docprofile-value">{doctor[field] || "N/A"}</span>
          <button className="docprofile-edit-button" onClick={() => handleEdit(field)}>Edit</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="docprofile-container">
      <h2>Doctor Profile</h2>
      <div className="docprofile-details">
        {renderField("Name", "name")}
        {renderField("Specialization", "specialization")}
        {renderField("Gender", "gender")}
        {renderField("Registration ID", "regId")}
        {renderField("Phone", "phone")}
        {renderField("Email", "email")}
        {renderField("Experience", "experience")}
      </div>
    </div>
  );
};

export default UpdateProfile;
