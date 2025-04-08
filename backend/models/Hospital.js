import mongoose from "mongoose"; 

const HospitalSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  registrationId: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  password:{
    type:String,
    required:true,
    unique:true
  },
  
  phone: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  }],

  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  }],
  appointments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  }],
  newRequestedAppointments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  }],
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

const Hospital=mongoose.model("Hospital", HospitalSchema);

export default Hospital;
