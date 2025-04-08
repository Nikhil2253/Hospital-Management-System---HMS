import Appointment from "../models/Appointments.js";
import Patient from "../models/Patient.js";

export const PostPatient=async(req,res)=>{
    try {
        const { name, regId,gender,password, dateOfBirth, address, phone, email } = req.body;

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
    
        res.status(201).json({ message: "Patient created successfully", newPatient });
      } catch (error) {
        console.error("Error posting patient:", error);
        res.status(500).json({ message: "Error creating patient" });
      }
}

export const GetPatient = async (req, res) => {
  try {
    const { name, regId, password } = req.body;

    if (!name || !regId || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const patient = await Patient.findOne({ regId:regId });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (patient.name === name && patient.password === password) {
      return res.status(200).json({ message: "Patient Found", data: patient });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }

  } catch (error) {
    console.error("Error retrieving patient:", error);
    res.status(500).json({ message: "Error fetching patient" });
  }
};

export const givePatient = async (req, res) => {
  try {
    const { regId } = req.body;
    console.log(regId)
    if (!regId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const patient = await Patient.findOne({ regId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    
    return res.status(200).json({ message: "Patient Found", data: patient });
     
  } catch (error) {
    console.error("Error getting patient:", error);
    res.status(500).json({ message: "Error fetching patient" });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const { regId } = req.body;

    if (!regId) {
      return res.status(400).json({ message: "regId is required" });
    }

    const patient = await Patient.findOne({ regId });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const appointments = patient.ongoingAppointments || [];

    if (appointments.length === 0) {
      return res.status(200).json({ message: "No ongoing appointments", data: [] });
    }

    const apt = await Promise.all(appointments.map((e) => Appointment.findById(e)));

    return res.status(200).json({ message: "Appointments found", data: apt });
  } catch (error) {
    console.error("Error getting Appointments:", error);
    res.status(500).json({ message: "Error fetching Appointments" });
  }
};

export const SaveChange = async (req, res) => {
  try {
    const { regId, field, val } = req.body;

    if (!regId || !field || !val) {
      return res.status(400).json({ message: "Missing values are required" });
    }

    const updateQuery = { [field]: val }; 
    const patient = await Patient.updateOne({ regId: regId }, { $set: updateQuery });

    if (patient.matchedCount === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }
    
    if (patient.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes made to the patient data" });
    }
    

    return res.status(200).json({ message: "Patient updated successfully" });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ message: "Error updating patient" });
  }
};

export const PassChange = async (req, res) => {
  try {
    const { regId, password } = req.body;

    if (!regId || !password) {
      return res.status(400).json({ message: "Missing required values" });
    }

    const patient = await Patient.updateOne(
      { regId: regId },
      { $set: { password: password } }
    );

    if (patient.matchedCount === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (patient.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes made to the patient data" });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating patient password:", error);
    return res.status(500).json({ message: "Error updating patient password" });
  }
};
