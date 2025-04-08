import express from "express";
import {GetDoctor,PostDoctor,giveDoc,getAllDoc,fetchAppointments,fetchNewAppointments,fetchCompletedAppointments,AcceptAppointment,RejectAppointment,getDoctors,complete,getPatients,SaveChange,PassChange} from "../controllers/doctorController.js";

const router=express.Router();

router.post("/login",GetDoctor);
router.post("/",PostDoctor);
router.post("/getDoc",giveDoc);
router.post("/getAll",getAllDoc);
router.post("/getDoctors",getDoctors);
router.post("/fetchAppointment",fetchAppointments);
router.post("/fetchNewAppointment",fetchNewAppointments);
router.post("/fetchCompletedAppointment",fetchCompletedAppointments);
router.post("/acceptAppointment",AcceptAppointment);
router.post("/rejectAppointment",RejectAppointment);
router.post("/complete",complete);
router.post("/getPatients",getPatients);
router.post("/savechanges",SaveChange);
router.post("/changepassword",PassChange);

export default router;