const express = require("express");
const router = express.Router();

const { bookAppointment } = require("../controllers/appointment_controller");

router.post("/book", bookAppointment);

module.exports = router;