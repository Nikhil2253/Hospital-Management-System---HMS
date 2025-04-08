import { useContext, useEffect, useState } from "react";
import { HospitalContext } from "../HospitalDashboard";

const Form = ({ setForm, regId, addDoctor }) => {
  const [doctor, setDoctor] = useState({
    name: "",
    regId: generateRegId(),
    password: "",
    gender: "",
    phone: "",
    email: "",
    specialization: "",
    hospital: regId,
  });

  function generateRegId() {
    return `DOC-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const createDoctor = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/hospital/createDoctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: doctor.name,
            regId: doctor.regId,
            password: doctor.password,
            gender: doctor.gender,
            phone: doctor.phone,
            email: doctor.email,
            specialization: doctor.specialization,
            hospital: doctor.hospital,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        addDoctor(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createDoctor();
    setForm(false);
  };

  return (
    <div className="add-doc-form">
      <div className="form-cancel" onClick={() => setForm(false)}>
        X
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={doctor.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="regId"
          placeholder="Registration ID"
          value={doctor.regId}
          readOnly
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={doctor.password}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={doctor.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={doctor.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={doctor.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={doctor.specialization}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="hospital"
          placeholder="Hospital"
          value={regId}
          readOnly
        />
        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
};

const CurrDocs = () => {
  const { hospital } = useContext(HospitalContext);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(false);
  const [view, setView] = useState({ isView: false, viewIndex: -1 });

  useEffect(() => {
    console.log(hospital.doctors);
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/doctor/getDoctors",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: hospital.doctors }),
          }
        );
        const doctorData = await response.json();
        setDoctors(doctorData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, [hospital]);

  const addDoctor = (newDoctor) => {
    setDoctors((prev) => [...prev, newDoctor]);
  };
  const viewDoctor = (e, index) => {
    e.preventDefault();
    let newView = { isView: true, viewIndex: index };
    setView(newView);
    console.log(view);
  };
  const removeDoctor = (e, id) => {
    e.preventDefault();
    removeById(id);
  };

  const removeById = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/hospital/deleteDoctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ regId: hospital.registrationId, id }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete doctor:", errorData.message);
        alert(`Error: ${errorData.message || "Unable to delete doctor."}`);
        return;
      }

      const result = await response.json();
      console.log("Doctor deleted successfully:", result);
      alert("Doctor deleted successfully.");
    } catch (error) {
      console.error("Error while deleting doctor:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="curr-doc-containers">
      {doctors.length !== 0 && (
        <div className="doctors-div">
          {doctors.map((doc, index) => (
            <div key={doc.regId} className="doctors-div-card">
              <div className="doc-det">
                <div className="doc-name">
                  Name: <span>{doc.name}</span>
                </div>
                <div className="doc-regId">
                  ID: <span>{doc.regId}</span>
                </div>
                <div className="doc-phone">
                  Contact:<span> {doc.phone}</span>
                </div>
                <div className="doc-specialization">
                  Specialization: <span>{doc.specialization}</span>
                </div>
              </div>

              <div className="doc-btns">
                <div
                  className="doc-view-button"
                  onClick={(e) => viewDoctor(e, index)}
                >
                  View
                </div>
                <div
                  className="doc-remove-button"
                  onClick={(e) => removeDoctor(e, doc._id)}
                >
                  Remove
                </div>
              </div>
            </div>
          ))}
          <div className="add-doc">
            <div className="add-btn" onClick={() => setForm(true)}>
              +
            </div>
          </div>
        </div>
      )}

      {doctors.length === 0 && (
        <div className="add-doc">
          <div className="add-btn" onClick={() => setForm(true)}>
            +
          </div>
        </div>
      )}

      {form && (
        <Form
          setForm={setForm}
          regId={hospital.registrationId}
          addDoctor={addDoctor}
        />
      )}

      {view.isView && (
        <div className="view-doc-profile">
          <div
            className="view-cross"
            onClick={() => setView({ isView: false, viewIndex: -1 })}
          >
            X
          </div>
          <div className="view-data">
            <div className="view-doc-data">
              Name: <span>{doctors[view.viewIndex].name}</span>
            </div>
            <div className="view-doc-data">
              Registration ID: <span>{doctors[view.viewIndex].regId}</span>
            </div>
            <div className="view-doc-data">
              Gender: <span>{doctors[view.viewIndex].gender}</span>
            </div>
            <div className="view-doc-data">
              Phone: <span>{doctors[view.viewIndex].phone}</span>
            </div>
            <div className="view-doc-data">
              Email: <span>{doctors[view.viewIndex].email}</span>
            </div>
            <div className="view-doc-data">
              Specialization:{" "}
              <span>{doctors[view.viewIndex].specialization}</span>
            </div>
            <div className="view-doc-data">
              Hospital: <span>{doctors[view.viewIndex].hospital}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrDocs;
