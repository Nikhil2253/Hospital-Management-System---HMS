import express from "express"
import {PostHospital,GetHospital,getAll,fetchHospital,createDoctor,deleteDoctor,createPatient,getPatients,dischargePatient,updatePassword,updateProfile,Statistics,getDetails} from "../controllers/hospitalController.js"

const router=express.Router();

router.post("/login",GetHospital);
router.post("/getAll",getAll);
router.post("/",PostHospital);
router.post("/getHospital",fetchHospital);
router.post("/createDoctor",createDoctor);
router.post("/deleteDoctor",deleteDoctor);
router.post("/createPatient",createPatient);
router.post("/getPatients",getPatients);
router.post("/dischargePatient",dischargePatient);
router.post("/updateProfile",updateProfile);
router.post("/updatePassword",updatePassword);
router.post("/statistics",Statistics);
router.get("/getDetails/:id",getDetails);

export default router;