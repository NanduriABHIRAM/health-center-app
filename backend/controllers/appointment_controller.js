const db = require("../config/db");

async function bookAppointment(req, res) {

    try {

        const { student_id, doctor_id, date, time, reason } = req.body;

        const today = new Date().toISOString().split("T")[0];

        // Validate date
        if (date < today) {
            return res.status(400).json({ message: "Invalid date" });
        }

        // Check doctor availability
        const checkQuery = `
            SELECT * FROM APPOINTMENT
            WHERE doctor_id = ? AND date = ? AND time = ?
        `;

        const [existing] = await db.query(checkQuery, [doctor_id, date, time]);

        if (existing.length > 0) {
            return res.status(400).json({ message: "Slot unavailable" });
        }

        // Start transaction
        await db.beginTransaction();

        const insertQuery = `
            INSERT INTO APPOINTMENT
            (student_id, doctor_id, date, time, status, reason)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(insertQuery, [
            student_id,
            doctor_id,
            date,
            time,
            "Booked",
            reason
        ]);

        if (result.affectedRows > 0) {
            await db.commit();
            return res.json({ message: "Appointment booked successfully" });
        } else {
            await db.rollback();
            return res.status(500).json({ message: "Booking failed" });
        }

    } catch (error) {

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
}

module.exports = { bookAppointment };