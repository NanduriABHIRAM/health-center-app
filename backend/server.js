const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// IMPORT ROUTES
const authRoutes = require("./routes/auth_routes");
const appointmentRoutes = require("./routes/appointment_routes");
const doctorRoutes = require("./routes/doctor_routes");

// USE ROUTES
app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/doctor", doctorRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});