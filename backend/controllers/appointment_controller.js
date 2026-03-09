async function bookAppointment(request, db) {

    const student_id = request.student_id;
    const doctor_id = request.doctor_id;
    const date = request.date;
    const time = request.time;
    const reason = request.reason;

    const today = new Date().toISOString().split("T")[0];

    if (date < today) {
        return "Invalid date";
    }

    // Check doctor availability
    const checkQuery = `
        SELECT * FROM APPOINTMENT 
        WHERE doctor_id = ? AND date = ? AND time = ?
    `;

    const [existing] = await db.query(checkQuery, [doctor_id, date, time]);

    if (existing.length > 0) {
        return "Slot unavailable";
    }

    try {

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
            return "Appointment booked";
        } else {
            await db.rollback();
            return "Booking failed";
        }

    } catch (error) {
        await db.rollback();
        return "Booking failed";
    }
}