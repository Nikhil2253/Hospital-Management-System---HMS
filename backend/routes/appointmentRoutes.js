import express from "express";
import { sendAppointment, bookHospitalAppointment, rejectAppointment, assignDoctorAppointment, getAppointmentsDetails,Cancel,reSchedule} from "../controllers/appointmentControllers.js";

const router=express.Router();

router.post("/book",sendAppointment);
router.post("/bookH",bookHospitalAppointment);
router.post("/reject",rejectAppointment);
router.post("/assignDoctor",assignDoctorAppointment);
router.post("/getAppointmentsDetails",getAppointmentsDetails);
router.post("/cancel",Cancel);
router.post("/reschedule",reSchedule);

export default router;