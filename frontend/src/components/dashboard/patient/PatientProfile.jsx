import { useContext, useState } from "react";
import "./patientdash.css";
import { PatientContext } from "../PatientDashboard";

const PatientProfile = () => {
    const { patient } = useContext(PatientContext);
    const [editingField, setEditingField] = useState("");
    const [editValue, setEditValue] = useState("");

    const handleEdit = (field) => {
        setEditingField(field);
        setEditValue(patient[field] || "");
    };

    const handleChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleSave = (field) => {
        saveToDB(field,editValue);
        setEditingField("");
    };

    const saveToDB = async (field, value) => {
        try {
            const response = await fetch("http://localhost:5000/api/patient/savechanges", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ regId:patient.regId, field:field, val: value }),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error saving patient data: ${response.status} - ${errorText}`);
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
        <div className="updateprofile-item">
            <span className="updateprofilefield-label">{label}:</span>
            {field === "regId" ? (
                <div className="updateprofilerender-field">
                    <span className="updateprofilefield-value">{patient[field] || "N/A"}</span>
                </div>
            ) : editingField === field ? (
                <div className="updateprofileedit-container">
                    <input
                        type="text"
                        value={editValue}
                        onChange={handleChange}
                        autoFocus
                        className="updateprofileedit-input"
                    />
                    <button className="updateprofilesave-button" onClick={() => handleSave(field)}>Save</button>
                    <button className="updateprofilecancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div className="updateprofilerender-field">
                    <span className="updateprofilefield-value">{patient[field] || "N/A"}</span>
                    <button className="updateprofileedit-button" onClick={() => handleEdit(field)}>Edit</button>
                </div>
            )}
        </div>
    );
    

    return (
        <div className="updateprofile-container">
            <h2>Patient Profile</h2>
            <div className="updateprofile-details">
                {renderField("Name", "name")}
                {renderField("Gender", "gender")}
                {renderField("Registration ID", "regId")}
                {renderField("Date of Birth", "dateOfBirth")}
                {renderField("Address", "address")}
                {renderField("Phone", "phone")}
                {renderField("Email", "email")}
            </div>
        </div>
    );
};

export default PatientProfile;
