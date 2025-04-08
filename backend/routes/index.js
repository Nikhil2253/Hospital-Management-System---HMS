import express from "express"
import hospitalRoutes from "./hospitalRoutes.js"
import patientRoutes from "./patientRoutes.js"
import doctorRoutes from "./doctorRoutes.js"
import appointmentRoutes from "./appointmentRoutes.js";

const router=express.Router();

router.use('/hospital',hospitalRoutes);
router.use('/patient',patientRoutes);
router.use('/appointment',appointmentRoutes);
router.use('/doctor',doctorRoutes);

export default router;
