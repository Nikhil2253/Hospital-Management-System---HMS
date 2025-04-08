import Hospital from "../models/Hospital.js";
import Doctor from "../models/Doctor.js"
import Patient from "../models/Patient.js"
import Appointment from "../models/Appointments.js";

export const PostHospital = async (req, res) => {
  try {
    const { name, registrationId, address, password, phone, email } = req.body;
    console.log(name,registrationId,phone,password,address,email)
    if (!name || !registrationId || !address || !password || !phone || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newHospital = new Hospital({
      name,
      registrationId,
      address,
      password,
      phone,
      email,
    });

    await newHospital.save();

    res.status(201).json({ message: "Hospital created successfully", newHospital });
  } catch (error) {
    console.error("Error posting hospital:", error);
    res.status(500).json({ message: "Error creating hospital" });
  }
};


export const GetHospital = async (req, res) => {
  try {
    const { name, regId, password } = req.body;
    console.log(name,regId,password)
    const hospital = await Hospital.findOne({ registrationId:regId });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital Not Found" });
    }

    if (hospital.name === name && hospital.password === password) {
      return res.status(200).json({
        message: "Hospital Found",
        hospital: hospital,
      });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Error retrieving Hospital:", error);
    return res.status(500).json({ message: "Error extracting Hospital" });
  }
};

export const getAll = async (req, res) => {
  try {
    const hospitals = await Hospital.find({});

    if (!hospitals || hospitals.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No hospitals found",
        data: [],
      });
    }

    res.status(200).send({
      success: true,
      message: "Hospitals fetched successfully",
      data: hospitals,
    });

  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while retrieving hospitals",
      error: error.message,
    });
  }
};


export const fetchHospital = async (req, res) => {
  try {
    const { regId } = req.body;
    console.log(regId)
    const hospital = await Hospital.findOne({ registrationId:regId });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital Not Found" });
    }

   
      return res.status(200).json({
        message: "Hospital Found",
        hospital: hospital,
      });
    
  } catch (error) {
    console.error("Error retrieving Hospital:", error);
    return res.status(500).json({ message: "Error extracting Hospital" });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const {
      name,
      regId,
      password,
      gender,
      phone,
      email,
      specialization,
      hospital,
    } = req.body;

    if (
      !name ||
      !regId ||
      !password ||
      !gender ||
      !phone ||
      !email ||
      !specialization ||
      !hospital 
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const aspatal = await Hospital.findOne({ registrationId: hospital });
    if (!aspatal) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const newDoctor = new Doctor({
      name,
      regId,
      phone,
      email,
      password,
      gender,
      specialization,
      hospital: aspatal.name,
      hospitalId:hospital
    });

    await newDoctor.save();
    aspatal.doctors.push(newDoctor);
    await aspatal.save();

    res.status(201).json({ message: "Doctor created successfully", newDoctor });
  } catch (error) {
    console.error("Error posting doctor:", error);
    res.status(500).json({ message: "Error creating doctor" });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const { regId, id } = req.body;

    if (!id || !regId) {
      return res.status(400).json({ message: "Doctor ID and Hospital ID are required." });
    }

    const hospital = await Hospital.findOne({ registrationId: regId });

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found." });
    }

    const doctorIndex = hospital.doctors.findIndex((doc) => doc._id.toString() === id);

    if (doctorIndex === -1) {
      return res.status(404).json({ message: "Doctor not found in this hospital." });
    }

    hospital.doctors.splice(doctorIndex, 1);
    await hospital.save();

    res.status(200).json({ message: "Doctor deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};




export const createPatient = async (req, res) => {
  try {
    const { name, regId, gender, password, dateOfBirth, address, phone, email } = req.body;
  console.log( name, regId, gender, password, dateOfBirth, address, phone, email)
    if (!name || !regId || !gender || !dateOfBirth || !password || !address || !phone || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPatient = new Patient({
      name,
      regId,
      gender,
      dateOfBirth,
      address,
      password,
      phone,
      email,
    });

    await newPatient.save();

    const hospital = await Hospital.findOne({ registrationId: "HOS-889886" });

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found." });
    }

    hospital.patients.push(newPatient);
    await hospital.save();

    res.status(201).json({ message: "Patient created successfully", newPatient });
  } catch (error) {
    res.status(500).json({ message: "Error creating patient" });
  }
};



export const getPatients = async (req, res) => {
  try {
    const { ids } = req.body;
    console.log(ids);
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid patient IDs" });
    }

    const patients = await Patient.find({ _id: { $in: ids } });
    console.log(patients)

    if (!patients.length) {
      return res.status(404).json({ message: "No patients found" });
    }

    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching Patients:", error);
    res.status(500).json({ message: "Error fetching Patients" });
  }
};




export const dischargePatient = async (req, res) => {
  try {
    const { regId, id } = req.body;
    if (!regId || !id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hospital = await Hospital.findOne({ registrationId: regId });

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Properly filter out the patient ID
    hospital.patients = hospital.patients.filter(patientId => 
      patientId.toString() !== id.toString()
    );

    console.log("Hospital Patients:", hospital.patients);
    await hospital.save();

    res.status(200).json({ message: "Patient discharged successfully" });
  } catch (error) {
    console.error("Error discharging patient:", error);
    res.status(500).json({ message: "Error discharging patient" });
  }
};



export const updateProfile = async (req, res) => {
  try {
    const { regId, field, val } = req.body;
    if (!regId || !field || !val) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updateData = {};
    updateData[field] = val;

    const hospital = await Hospital.findOneAndUpdate(
      { registrationId: regId },
      { $set: updateData },
      { new: true }
    );

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", hospital });
  } catch (error) {
    console.error("Error updating Profile: ", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};



export const updatePassword = async (req, res) => {
  try {
    const { regId, password } = req.body;
    if (!regId || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hospital = await Hospital.findOneAndUpdate(
      { registrationId: regId },
      { $set: { password } },
      { new: true }
    );

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password: ", error);
    res.status(500).json({ message: "Error updating password" });
  }
};

export const Statistics = async (req, res) => {
  try {
    const { registrationId } = req.body;

    const hospital = await Hospital.findOne({ registrationId })
      .populate('doctors')
      .populate('patients');

    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });

    const totalDoctors = hospital.doctors.length;
    const totalPatients = hospital.patients.length;

    const appointments = await Appointment.find({ hospitalId: hospital.registrationId });

    const problemStats = {};
    for (let app of appointments) {
      problemStats[app.problem] = (problemStats[app.problem] || 0) + 1;
    }
    const barData = Object.keys(problemStats).map(key => ({
      name: key,
      count: problemStats[key]
    }));

    const genderCount = { Male: 0, Female: 0 };
    for (let app of appointments) {
      if (genderCount[app.gender] !== undefined) {
        genderCount[app.gender]++;
      }
    }
    const pieData = Object.entries(genderCount).map(([name, value]) => ({ name, value }));

    const monthCount = {
      Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
      Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
    };
    for (let app of appointments) {
      const dateObj = new Date(app.date);
      const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
      monthCount[month]++;
    }
    const lineData = Object.entries(monthCount).map(([month, appointments]) => ({ day: month, appointments }));

    res.status(200).json({
      totalDoctors,
      totalPatients,
      problemStats: barData,
      genderRatio: pieData,
      dailyStats: lineData
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getDetails = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    if (!id) {
      return res.status(400).json({ success: false, message: "Hospital registration ID is required." });
    }

    const hospital = await Hospital.findOne({ registrationId: id });

    if (!hospital) {
      return res.status(404).json({ success: false, message: "Hospital not found." });
    }

    const hospitalData = {
      name: hospital.name,
      registrationId: hospital.registrationId,
      address: hospital.address,
      phone: hospital.phone,
      email: hospital.email,
      registrationDate: hospital.registrationDate,
      doctorsCount: hospital.doctors?.length || 0,
      patientsCount: hospital.patients?.length || 0,
      
    };

    res.status(200).json({ success: true, data: hospitalData });
  } catch (error) {
    console.error("Error fetching hospital details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};