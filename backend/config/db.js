const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Sesha@123",
    database: "health_center"
});

module.exports = db;