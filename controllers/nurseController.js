const { nurseModel } = require("../models/nurseModel");

const nurses = ["nurse1", "nurse2"];

const registerNurse = async (req, res) => {
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
      depart,
      address,
    } = req.body;

    const nurse = new nurseModel({
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
      depart,
      address,
      role: "nurse",
      status: "active",
    });

    await nurse.save();
    res.status(201).json(nurse);
  } catch (error) {
    if (error.code === 11000 ) {
      res.status(400).json({ error: 'user is already registered.' });
    }
    else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};

const getNurseById = async (req, res) => {
  try {
    const { id } = req.params;
    const nurses = await nurseModel.findById(id);
    res.status(200).json(nurses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllNurses = async (req, res) => {
  try {
    const nurses = await nurseModel.find();
    res.status(200).json(nurses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNurseById = async (req, res) => {
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
      depart,
      address,
    } = req.body;
    const nurse = await nurseModel.findByIdAndUpdate(id, {
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
      depart,
      address,
    });
    if (!nurse) {
      return res.status(404).json({ message: "Nurse not found" });
    }
    res.status(200).json(nurse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNurseById = async (req, res) => {
  try {
    const { id } = req.params;
    const nurse = await nurseModel.findByIdAndDelete(id);
    if (!nurse) {
      return res.status(404).json({ message: "Nurse not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Nurse deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerNurse,
  getNurseById,
  getAllNurses,
  updateNurseById,
  deleteNurseById,
};
