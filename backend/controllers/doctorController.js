import Hospital from "../models/Hospital.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js"
import Appointment from "../models/Appointments.js";
import { addinHospital } from "../utils/appointmentAdder.js";

export const PostDoctor = async (req, res) => {
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
      hospitalId
    } = req.body;

    if (
      !name ||
      !regId ||
      !password ||
      !gender ||
      !phone ||
      !email ||
      !specialization ||
      !hospital ||
      !hospitalId
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hospitalDoc = await Hospital.findOne({ registrationId: hospitalId });
    if (!hospitalDoc) {
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
      hospital,
      hospitalId
    });

    await newDoctor.save();
    hospitalDoc.doctors.push(newDoctor._id);
    await hospitalDoc.save();

    res.status(201).json({ message: "Doctor created successfully", newDoctor });
  } catch (error) {
    console.error("Error posting doctor:", error);
    res.status(500).json({ message: "Error creating doctor" });
  }
};


export const GetDoctor = async (req, res) => {
  try {
    const { name, regId, password } = req.body;

    if (!name || !regId || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const doctor = await Doctor.findOne({ regId: regId });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (doctor.name === name && doctor.password === password) {
      return res.status(200).json({ message: "Doctor Found", data: doctor });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error getting doctor:", error);
    res.status(500).json({ message: "Error fetching doctor" });
  }
};

export const giveDoc = async (req, res) => {
  try {
    const { regId } = req.body;
    if (!regId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const doctor = await Doctor.findOne({ regId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    
    return res.status(200).json({ message: "Doctor Found", data: doctor });
     
  } catch (error) {
    console.error("Error getting doctor:", error);
    res.status(500).json({ message: "Error fetching doctor" });
  }
};

export const getAllDoc = async (req, res) => {
  console.log("Called")
  try {
    const doctors = await Doctor.find();
    console.log(doctors)
    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }

    const doctorData = doctors.map(doc => ({
      regId: doc.regId,
      name: doc.name,
      hospitalId:doc.hospitalId
    }));

    return res.status(200).json({ message: "Doctors found", data: doctorData });
  } catch (error) {
    console.error("Error getting doctors:", error);
    res.status(500).json({ message: "Error fetching doctors" });
  }
};

export const fetchAppointments = async (req, res) => {
  try {
    const { regId } = req.body;

    if (!regId) {
      return res.status(400).json({ message: "regId is required" });
    }

    const doctor = await Doctor.findOne({ regId });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const { ongoingAppointments } = doctor;

    if (!ongoingAppointments || ongoingAppointments.length === 0) {
      return res.status(200).json({ message: "No ongoing appointments", data: [] });
    }

    const appointments = await Appointment.find({ _id: { $in: ongoingAppointments } });
    console.log(appointments)
    return res.status(200).json({ message: "Appointments found", data: appointments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Appointments" });
  }
};

export const fetchNewAppointments = async (req, res) => {
  try {
    const { regId } = req.body;

    if (!regId) {
      return res.status(400).json({ message: "regId is required" });
    }

    const doctor = await Doctor.findOne({ regId });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const { newAppointments } = doctor;

    if (!newAppointments || newAppointments.length === 0) {
      return res.status(200).json({ message: "No ongoing appointments", data: [] });
    }

    const appointments = await Appointment.find({ _id: { $in: newAppointments } });
    console.log(appointments)
    return res.status(200).json({ message: "Appointments found", data: appointments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Appointments" });
  }
};

export const fetchCompletedAppointments = async (req, res) => {
  try {
    const { regId } = req.body;

    if (!regId) {
      return res.status(400).json({ message: "regId is required" });
    }

    const doctor = await Doctor.findOne({ regId });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const { completedAppointments } = doctor;

    if (!completedAppointments || completedAppointments.length === 0) {
      return res.status(200).json({ message: "No ongoing appointments", data: [] });
    }

    const appointments = await Appointment.find({ _id: { $in: completedAppointments } });
    console.log(appointments)
    return res.status(200).json({ message: "Appointments found", data: appointments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Appointments" });
  }
};

export const AcceptAppointment = async (req, res) => {
  try {
    const { aptid, regId, PatRegID } = req.body;
    console.log(aptid, regId);
    if (!aptid || !regId || !PatRegID) {
      return res.status(400).json({ message: "Missing Required Field" });
    }

    const doctor = await Doctor.findOne({ regId: regId });
    const patient = await Patient.findOne({ regId: PatRegID });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const appointmentIndex = doctor.newAppointments.findIndex((e) => e._id == aptid);
    if (appointmentIndex === -1) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const [acceptedAppointment] = doctor.newAppointments.splice(appointmentIndex, 1);
    doctor.ongoingAppointments.push(acceptedAppointment);

    const patappointmentIndex = patient.bookingAppointments.findIndex((e) => e._id == aptid);
    if (patappointmentIndex === -1) {
      return res.status(404).json({ message: "Patient appointment not found" });
    }
    
    const [patientAcceptAppointment] = patient.bookingAppointments.splice(patappointmentIndex, 1);
    patient.ongoingAppointments.push(patientAcceptAppointment);

    const isPatientAlreadyAdded = doctor.patients.some(
      id => id.toString() === patient._id.toString()
    );
    if (!isPatientAlreadyAdded) {
      doctor.patients.push(patient._id); // Only push ObjectId
    }

    addinHospital(patientAcceptAppointment);
    await doctor.save();
    await patient.save();
    res.status(200).json({ message: "Appointment accepted successfully!" });
  } catch (error) {
    console.error("Error accepting appointment:", error);
    res.status(500).json({ message: "Error Accepting Appointment" });
  }
};

export const RejectAppointment = async (req, res) => {
  try {
    const { aptid, regId, PatRegID } = req.body;
    console.log(aptid, regId, PatRegID);

    if (!aptid || !regId || !PatRegID) {
      return res.status(400).json({ message: "Missing Required Field" });
    }

    const doctor = await Doctor.findOne({ regId: regId });
    const patient = await Patient.findOne({ regId: PatRegID });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const appointmentIndex = doctor.newAppointments.findIndex((e) => e._id == aptid);
    if (appointmentIndex === -1) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const [rejectedAppointment] = doctor.newAppointments.splice(appointmentIndex, 1);

    const patappointmentIndex = patient.bookingAppointments.findIndex((e) => e._id == aptid);
    if (patappointmentIndex !== -1) {
      patient.bookingAppointments.splice(patappointmentIndex, 1);
    }
    else{
      return res.status(404).json({ message: "Appointment not found" });
    }

    
    await doctor.save();
    await patient.save();

    res.status(200).json({ message: "Appointment rejected successfully!" });
  } catch (error) {
    console.error("Error rejecting appointment:", error);
    res.status(500).json({ message: "Error Rejecting Appointment" });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const { ids } = req.body;
    console.log("called",ids);
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid doctor IDs" });
    }

    const doctors = await Doctor.find({ _id: { $in: ids } });
    console.log(doctors)

    if (!doctors.length) {
      return res.status(404).json({ message: "No doctors found" });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Error fetching doctors" });
  }
};

export const complete = async (req, res) => {
  try {
    const { _id, regId } = req.body;

    if (!_id || !regId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const apt = await Appointment.findById(_id);
    if (!apt) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const doctor = await Doctor.findOne({ regId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const patient = await Patient.findOne({ regId: apt.PatRegID });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const hospital = await Hospital.findOne({ registrationId: apt.hospitalId });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    patient.ongoingAppointments = patient.ongoingAppointments.filter(
      (app) => app.toString() !== apt._id.toString()
    );
    patient.medicalHistory.push({
      condition: apt.problem,
      diagnosisDate: apt.date,
      doctor: apt.selectedDoctor,
    });

    doctor.ongoingAppointments = doctor.ongoingAppointments.filter(
      (app) => app.toString() !== apt._id.toString()
    );
    doctor.completedAppointments.push(apt._id);

    hospital.appointments = hospital.appointments.filter(
      (app) => app.toString() !== apt._id.toString()
    );

    await patient.save();
    await doctor.save();
    await hospital.save();

    res.status(200).json({ message: "Appointment marked as completed successfully" });
  } catch (error) {
    console.error("Error in completing appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
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

    if (patients.length<=0) {
      return res.status(404).json({ message: "No patients found" });
    }

    res.status(200).json({message:"Fetched",data:patients});
  } catch (error) {
    console.error("Error fetching Patients:", error);
    res.status(500).json({ message: "Error fetching Patients" });
  }
};

export const SaveChange = async (req, res) => {
  try {
    const { regId, field, val } = req.body;

    if (!regId || !field || !val) {
      return res.status(400).json({ message: "Missing values are required" });
    }

    const updateQuery = { [field]: val };
    const doctor = await Doctor.updateOne({ regId: regId }, { $set: updateQuery });

    if (doctor.matchedCount === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (doctor.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes made to the doctor data" });
    }

    return res.status(200).json({ message: "Doctor updated successfully" });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Error updating doctor" });
  }
};

export const PassChange = async (req, res) => {
  try {
    const { regId, password } = req.body;

    if (!regId || !password) {
      return res.status(400).json({ message: "Missing required values" });
    }

    const doctor = await Doctor.updateOne(
      { regId: regId },
      { $set: { password: password } }
    );

    if (doctor.matchedCount === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (doctor.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes made to the doctor data" });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating doctor password:", error);
    return res.status(500).json({ message: "Error updating doctor password" });
  }
};
