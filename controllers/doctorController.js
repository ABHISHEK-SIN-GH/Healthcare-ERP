const { doctorModel } = require("../models/doctorModel");

const doctors = ["doctor1", "doctor2"];

const registerDoctor = async (req, res) => {
  try {
    const {
      username,
      regNo,
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      bloodGrp,
      password,
      design,
      qualification,
      specialty,
      depart,
      address
    } = req.body;

    const doctor = new doctorModel({
      username,
      regNo,
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      bloodGrp,
      password,
      design,
      qualification,
      specialty,
      depart,
      address,
      role: "doctor",
      status: "active",
    });

    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    console.log(error);
    if (error.code === 11000 ) {
      res.status(400).json({ error: 'user is already registered.' });
    }
    else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctors = await doctorModel.findById(id);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      regNo,
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      bloodGrp,
      password,
      design,
      qualification,
      specialty,
      depart,
      address } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(id, {
      regNo,
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      bloodGrp,
      password,
      design,
      qualification,
      specialty,
      depart,
      address
    });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await doctorModel.findByIdAndDelete(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerDoctor,
  getDoctorById,
  getAllDoctors,
  updateDoctorById,
  deleteDoctorById,
};
