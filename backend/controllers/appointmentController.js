import Appointment from "../models/Appointments.js";
import Doctor from "../models/Doctor.js";
import Hospital from "../models/Hospital.js";
import Patient from "../models/Patient.js";
import { addinDoctor, addinPatient,addinHospital, addinHospitalRequests } from "../utils/appointmentAdder.js";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique ID generation

export const sendAppointment = async (req, res) => {
  try {
    const {
      PatRegID,
      email,
      phone,
      problem,
      age,
      gender,
      description,
      date,
      timeSlot,
      selectedDoctor,
      hospitalId,
      mode,
      isEmergency,
    } = req.body;

    if (
      !PatRegID ||
      !email ||
      !phone ||
      !problem ||
      !age ||
      !gender ||
      !description ||
      !date ||
      !timeSlot ||
      !selectedDoctor ||
      !mode ||
      !hospitalId ||
      isEmergency === undefined
    ) {
      return res.status(400).json({ message: "Missing Attribute" });
    }

    const uniqueAppointmentId = uuidv4();

    const newAppointment = new Appointment({
      appointmentId: uniqueAppointmentId,
      PatRegID,
      email,
      phone,
      problem,
      age,
      gender,
      description,
      date,
      timeSlot,
      selectedDoctor,
      hospitalId,
      mode,
      isEmergency,
    });

    await newAppointment.save();

    const patient = await Patient.findOne({ regId: PatRegID });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const hospital = await Hospital.findOne({ registrationId: hospitalId });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    hospital.patients.push(patient._id);
    await hospital.save();

    addinPatient(newAppointment);
    addinDoctor(newAppointment);

    res.status(201).json({ message: "Appointment Booked" });
  } catch (error) {
    console.error("Error in sending the request: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const bookHospitalAppointment = async (req, res) => {
  try {
    const {
      PatRegID,
      email,
      phone,
      problem,
      age,
      gender,
      description,
      date,
      timeSlot,
      hospitalId,
      mode,
      isEmergency,
    } = req.body;

    console.log(PatRegID,email,phone,problem,age,gender,description,date,timeSlot,hospitalId,mode,isEmergency);

    if (
      !PatRegID ||
      !email ||
      !phone ||
      !problem ||
      !age ||
      !gender ||
      !description ||
      !date ||
      !timeSlot ||
      !mode ||
      !hospitalId ||
      isEmergency === undefined
    ) {
      return res.status(400).json({ message: "Missing Attribute" });
    }

    const uniqueAppointmentId = uuidv4();

    const newAppointment = new Appointment({
      appointmentId: uniqueAppointmentId,
      PatRegID,
      email,
      phone,
      problem,
      age,
      gender,
      description,
      date,
      timeSlot,
      selectedDoctor:"To be Decided",
      hospitalId,
      mode,
      isEmergency,
    });

    await newAppointment.save();

    const patient = await Patient.findOne({ regId: PatRegID });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }


    addinPatient(newAppointment);
    addinHospitalRequests(newAppointment);

    res.status(201).json({ message: "Appointment Booked" });
  } catch (error) {
    console.error("Error in sending the request: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const rejectAppointment = async (req, res) => {
  try {
    const { _id, hospitalId } = req.body;

    if (!_id || !hospitalId) {
      return res.status(400).send({ message: "Missing Required Field" });
    }

    const hospital = await Hospital.findOne({ registrationId: hospitalId });
    if (!hospital) {
      return res.status(404).send({ message: "Hospital not found" });
    }

    const apt = await Appointment.findById(_id);
    if (!apt) {
      return res.status(404).send({ message: "Appointment not found" });
    }

    const patient = await Patient.findOne({ regId: apt.PatRegID });
    if (!patient) {
      return res.status(404).send({ message: "Patient not found" });
    }

    await Appointment.deleteOne({ _id });

    hospital.newRequestedAppointments = hospital.newRequestedAppointments.filter(
      (aptId) => aptId.toString() !== _id
    );

    patient.bookingAppointments = patient.bookingAppointments.filter(
      (aptId) => aptId.toString() !== _id
    );

    await hospital.save();
    await patient.save();

    res.status(200).send({ message: "Appointment rejected successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};





























export const assignDoctorAppointment = async (req, res) => {
  try {
    const { hospitalId, _id, doctorRegId } = req.body;

    if (!hospitalId || !_id || !doctorRegId) {
      return res.status(400).send({ message: "Missing Required Field" });
    }

    const doctor = await Doctor.findOne({ regId: doctorRegId });
    if (!doctor) {
      return res.status(404).send({ message: "Doctor not found" });
    }

    const hospital = await Hospital.findOne({ registrationId: hospitalId });
    if (!hospital) {
      return res.status(404).send({ message: "Hospital not found" });
    }

    const apt = await Appointment.findById(_id);
    if (!apt) {
      return res.status(404).send({ message: "Appointment not found" });
    }

    const patient = await Patient.findOne({ regId: apt.PatRegID });
    if (!patient) {
      return res.status(404).send({ message: "Patient not found" });
    }

    apt.selectedDoctor = doctorRegId;
    await apt.save();

    patient.bookingAppointments = patient.bookingAppointments.filter(
      (id) => id.toString() !== _id
    );

    const isPatientAlreadyAdded = doctor.patients.some(
      id => id.toString() === patient._id.toString()
    );
    if (!isPatientAlreadyAdded) {
      doctor.patients.push(patient._id); // Only push ObjectId
    }

    patient.ongoingAppointments.push(_id);
    await patient.save();

    doctor.ongoingAppointments.push(_id);
    await doctor.save();

    hospital.newRequestedAppointments = hospital.newRequestedAppointments.filter(
      (id) => id.toString() !== _id
    );
    hospital.appointments.push(_id);
    await hospital.save();

    res.status(200).send({ message: "Doctor assigned and appointment updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};







































export const getAppointmentsDetails = async (req, res) => {
  try {
    const { ids } = req.body;
    console.log(ids);

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid appointment IDs" });
    }

    const appointments = await Appointment.find({ _id: { $in: ids } });

    res.status(200).json({ message: "Appointments retrieved successfully", data: appointments });
  } catch (error) {
    console.error("Error in sending the request: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const Cancel = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Appointment ID is required" });
    }

    const apt = await Appointment.findById(id);
    if (!apt) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const doctor = await Doctor.findOne({ regId: apt.selectedDoctor });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const hospital = await Hospital.findOne({ registrationId: apt.hospitalId });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const patient = await Patient.findOne({ regId: apt.PatRegID });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    hospital.appointments = hospital.appointments.filter(a => a.toString() !== id);
    doctor.ongoingAppointments = doctor.ongoingAppointments.filter(a => a.toString() !== id);
    patient.ongoingAppointments = patient.ongoingAppointments.filter(a => a.toString() !== id);

    await hospital.save();
    await doctor.save();
    await patient.save();

    await Appointment.findByIdAndDelete(id);

    return res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return res.status(500).json({ message: "Error cancelling appointment" });
  }
};

export const reSchedule = async (req, res) => {
  try {
    const { id, newDate } = req.body;

    if (!id || !newDate) {
      return res.status(400).json({ message: "Appointment ID and new date are required" });
    }

    const result = await Appointment.updateOne(
      { _id: id },
      { $set: { date: newDate } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes made to the appointment" });
    }

    return res.status(200).json({ message: "Appointment rescheduled successfully" });
  } catch (error) {
    console.error("Error rescheduling appointment:", error);
    return res.status(500).json({ message: "Error rescheduling appointment" });
  }
};
