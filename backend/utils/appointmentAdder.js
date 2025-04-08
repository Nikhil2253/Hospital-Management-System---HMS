import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Hospital from "../models/Hospital.js";
import Appointment from "../models/Appointments.js";

export const addinPatient = async (appointment) => {
  console.log('Add in Patient', appointment);
  try {
    const patient = await Patient.findOne({ regId: appointment.PatRegID });

    if (!patient) {
      console.error("Patient not found.");
      return;
    }

    

    patient.bookingAppointments.push(appointment);
    await patient.save();
    console.log("Appointment added to patient record.");
  } catch (error) {
    console.error("Error adding appointment to patient record:", error);
  }
};

export const addinDoctor = async (appointment) => {
  try {
    const doctor = await Doctor.findOne({ regId: appointment.selectedDoctor });
    
    if (!doctor) {
      console.error("Doctor not found.");
      return;
    }

    doctor.newAppointments.push(appointment);
    await doctor.save();
    console.log("Appointment added to doctor record.");
  } catch (error) {
    console.error("Error adding appointment to doctor record:", error);
  }
};

export const addinHospital = async (appointment) => {
  try {
    const appoint = await Appointment.findById(appointment);
    if (!appoint) return console.error("Appointment not found.");

    const hospital = await Hospital.findOne({ registrationId: appoint.hospitalId });
    if (!hospital) return console.error("Hospital not found for appointment ID:", appointment);

    hospital.appointments.push(appointment);
    await hospital.save();
    console.log("Appointment successfully added to hospital record.");
  } catch (error) {
    console.error("Error adding appointment to hospital record:", error.message);
  }
};

export const addinHospitalRequests = async (appointment) => {
  try {
    const appoint = await Appointment.findById(appointment);
    if (!appoint) return console.error("Appointment not found.");

    const hospital = await Hospital.findOne({ registrationId: appoint.hospitalId });
    if (!hospital) return console.error("Hospital not found for appointment ID:", appointment);

    hospital.newRequestedAppointments.push(appointment);
    await hospital.save();
    console.log("Appointment successfully added to hospital record.");
  } catch (error) {
    console.error("Error adding appointment to hospital record:", error.message);
  }
};
