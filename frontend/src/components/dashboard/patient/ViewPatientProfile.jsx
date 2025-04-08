import { useContext } from "react";
import "./patientdash.css";
import { PatientContext } from "../PatientDashboard";

const ViewPatientProfile = () => {
    const { patient } = useContext(PatientContext);
    const renderField = (label, field) => (
        <div className="profile-item">
            <span className="field-label">{label}:</span>
            <span className="field-value">{patient[field] || "N/A"}</span>
        </div>
    );

    return (
        <div className="profile-container">
            <h2>{patient.name}</h2>
            <div className="profile-details">
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

export default ViewPatientProfile;
