const db = require("../config/db");

// STUDENT LOGIN (email)
async function studentLogin(req, res) {

    const { email, password } = req.body;

    const [rows] = await db.query(
        "SELECT * FROM STUDENT WHERE email=? AND password=?",
        [email, password]
    );

    if (rows.length > 0) {
        return res.json({ message: "Student login successful" });
    }

    return res.status(400).json({ message: "Invalid credentials" });
}


// DOCTOR LOGIN (doctor_id)
async function doctorLogin(req, res) {

    const { doctor_id, password } = req.body;

    const [rows] = await db.query(
        "SELECT * FROM DOCTOR WHERE doctor_id=? AND password=?",
        [doctor_id, password]
    );

    if (rows.length > 0) {
        return res.json({ message: "Doctor login successful" });
    }

    return res.status(400).json({ message: "Invalid credentials" });
}

module.exports = {
    studentLogin,
    doctorLogin
};