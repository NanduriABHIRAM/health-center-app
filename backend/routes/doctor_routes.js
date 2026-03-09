const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctor_controller");

router.get("/:doctor_id/appointments", doctorController.getDoctorAppointments);

router.put("/update-status", doctorController.updateAppointmentStatus);

router.get("/:doctor_id", doctorController.getDoctorDetails);

module.exports = router;