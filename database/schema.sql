CREATE DATABASE IF NOT EXISTS health_center;
USE health_center;

CREATE TABLE STUDENT(
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE DOCTOR(
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    specialization VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE APPOINTMENT(
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    doctor_id INT,
    date DATE,
    time TIME,
    status VARCHAR(20),
    reason TEXT
);

CREATE TABLE RECORD(
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT,
    diagnosis TEXT,
    notes TEXT,
    prescription TEXT
);