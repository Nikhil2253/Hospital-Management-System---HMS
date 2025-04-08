import express from "express";
import {GetPatient,givePatient,PostPatient,getAppointments,SaveChange,PassChange} from "../controllers/patientController.js";

const router=express.Router();

router.post("/login",GetPatient);
router.post("/",PostPatient);
router.post("/getPatient",givePatient);
router.post("/getAppointments",getAppointments);
router.post("/savechanges",SaveChange);
router.post("/changepassword",PassChange);

export default router;