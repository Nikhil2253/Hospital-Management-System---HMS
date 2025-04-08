import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  regId:{
    type:String,
    unique:true
  },
  password:{
    type:String,
    unique:true
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  specialization: {
    type: String,
    required: true,
    trim: true,
  },

  experience: {
    type: Number,
    default: 0,
  },

  qualifications: {
    type: [String],
    default: [],
  },

  hospital: {
    type: String,
    required: true,
  },
  
  hospitalId: {
    type: String,
    required: true,
  },
  
  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  }],
  ongoingAppointments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  }],
  completedAppointments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  }],
  newAppointments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
