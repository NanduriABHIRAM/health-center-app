const db = require("../config/db");


// Get Today's Appointments for a Doctor
async function getDoctorAppointments(req, res) {

    try {

        const { doctor_id } = req.params;

        if (!doctor_id) {
            return res.status(400).json({
                message: "Doctor ID required"
            });
        }

        const today = new Date().toISOString().split("T")[0];

        const query = `
            SELECT appointment_id,
                   student_id,
                   date,
                   time,
                   status,
                   reason
            FROM APPOINTMENT
            WHERE doctor_id = ?
            AND date = ?
            ORDER BY time ASC
        `;

        const [appointments] = await db.query(query, [doctor_id, today]);

        if (appointments.length === 0) {
            return res.json({
                message: "No appointments today",
                data: []
            });
        }

        res.json({
            message: "Appointments fetched successfully",
            data: appointments
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }

}


// Update Appointment Status (Completed / Cancelled)
async function updateAppointmentStatus(req, res) {

    try {

        const { appointment_id, status } = req.body;

        if (!appointment_id || !status) {
            return res.status(400).json({
                message: "Appointment ID and status required"
            });
        }

        const query = `
            UPDATE APPOINTMENT
            SET status = ?
            WHERE appointment_id = ?
        `;

        const [result] = await db.query(query, [status, appointment_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        res.json({
            message: "Appointment status updated successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }

}


// 3️⃣ Get Doctor Details
async function getDoctorDetails(req, res) {

    try {

        const { doctor_id } = req.params;

        const query = `
            SELECT doctor_id,
                   name,
                   specialization,
                   timings
            FROM DOCTOR
            WHERE doctor_id = ?
        `;

        const [doctor] = await db.query(query, [doctor_id]);

        if (doctor.length === 0) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        res.json({
            message: "Doctor details fetched",
            data: doctor[0]
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }

}


// Export functions
module.exports = {
    getDoctorAppointments,
    updateAppointmentStatus,
    getDoctorDetails
};