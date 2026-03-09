const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const appointmentRoutes = require("./routes/appointmentRoutes");
const recordRoutes = require("./routes/recordRoutes");

app.use("/appointments", appointmentRoutes);
app.use("/records", recordRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});