const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth_controller");

router.post("/student/login", authController.studentLogin);
router.post("/doctor/login", authController.doctorLogin);

module.exports = router;