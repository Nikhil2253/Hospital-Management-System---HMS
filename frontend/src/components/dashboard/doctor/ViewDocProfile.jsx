import { useContext } from "react";
import "./doctorDash.css"; // Add your custom styling for the doctor profile
import { DoctorContext } from "../DoctorDashboard"; // Adjust according to your context file

const ViewDocProfile = () => {
    const { doctor } = useContext(DoctorContext); // Access the doctor data from the context

    const renderField = (label, field) => (
        <div className="doc-profile-item">
            <span className="doc-field-label">{label}:</span>
            <span className="doc-field-value">{doctor[field] || "N/A"}</span>
        </div>
    );

    return (
        <div className="doc-profile-container">
            <h2>{doctor.name}</h2>
            <div className="doc-profile-details">
                {renderField("Name", "name")}
                {renderField("Specialization", "specialization")}
                {renderField("Registration ID", "regId")}
                {renderField("Gender", "gender")}
                {renderField("Phone", "phone")}
                {renderField("Email", "email")}
                {renderField("Hospital", "hospital")}
                {renderField("Experience", "experience")}

            </div>
        </div>
    );
};

export default ViewDocProfile;
