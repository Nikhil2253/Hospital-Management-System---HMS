import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  regId: {
    type: String,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    trim: true,
  },

  medicalHistory: [
    {
      condition: String,
      diagnosisDate: Date,
      doctor: String,
    },
  ],
  bookingAppointments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  ongoingAppointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],


  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },

  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

const Patient = mongoose.model("Patient", PatientSchema);

export default Patient;
