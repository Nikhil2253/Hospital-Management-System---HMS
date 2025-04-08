import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const AppointmentSchema=new mongoose.Schema({
  appointmentId: { type: String, default: uuidv4, unique: true },
   PatRegID:{
    type:String,
    required:true,
    unique:false
   },
   email:{
    type:String,
    required:true,
    unique:false
   },
   phone:{
    type:String,
    required:true,
    unique:false
   },
   problem:{
    type:String,
    required:true
   },
   age:{
    type:String,
    required:true
   },
   gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  description:{
    type:String,
    required:true
  },
  date: {
    type: String,
    required: true
  },  
  timeSlot:{
    type:String,
    required:true
  },
  selectedDoctor:{
    type:String,
  },
  hospitalId:{
    type:String,
    required:true
  },
  mode:{
    type: String,
    required: true,
    enum: ["In-Person","Online"],
  },
  isEmergency:{
    type:Boolean,
    required:true
  }
});

const Appointment=mongoose.model("Appointment",AppointmentSchema);

export default Appointment;
