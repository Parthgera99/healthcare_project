const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcrypt");
const Doctor = require("../model/doctorModel"); // Corrected variable name to 'doctor'
require("dotenv").config();

const registerDoctor = asyncHandler(async (req, res) => {
    const { name, email, speciality, phoneNumber, experience, address } = req.body;

    // Validate all required fields
    if (!name || !email || !speciality || !experience || !phoneNumber || !address) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if the user already exists
    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
        return res.status(400).json({ message: "Doctor already exists" });
    }


    // Create a new user
    const newDoctor = await Doctor.create({
        name,
        email,
        speciality,
        experience,
        address,
        phoneNumber,
        // password: hashedPassword,
    });

    res.status(201).json({ message: "Doctor registered successfully" });
});


const deleteDoctor = asyncHandler(async (req, res) => {
    const { email } = req.params; // Get the email from the request parameters

    // Find the doctor by email and delete
    const doctor = await Doctor.findOneAndDelete({ email });
    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
});



const getAllDoctors = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
});

const getDoctorByEmail = asyncHandler(async (req, res) => {
    const {email} = req.params;
    const doctor = await Doctor.findOne({email});
    if (!doctor) {
        res.status(404);
        throw new Error("Doctor not found");
    }
    res.status(200).json(doctor);
});


module.exports = { registerDoctor, getAllDoctors, getDoctorByEmail, deleteDoctor  };