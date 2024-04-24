const { pharmacistModel } = require("../models/pharmacistModel");

const registerPharmacist = async (req, res) => {
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
      address,
    } = req.body;

    const pharmacist = new pharmacistModel({
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
      address,
      role: "pharmacist",
      status: "active",
    });

    await pharmacist.save();
    res.status(201).json(pharmacist);
  } catch (error) {
    if (error.code === 11000 ) {
      res.status(400).json({ error: 'user is already registered.' });
    }
    else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};

const getPharmacistById = async (req, res) => {
  try {
    const { id } = req.params;
    const pharmacist = await pharmacistModel.findById(id);
    res.status(200).json(pharmacist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPharmacists = async (req, res) => {
  try {
    const pharmacists = await pharmacistModel.find();
    res.status(200).json(pharmacists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePharmacistById = async (req, res) => {
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
      address,
    } = req.body;
    const pharmacist = await pharmacistModel.findByIdAndUpdate(id, {
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
      address,
    });
    if (!pharmacist) {
      return res.status(404).json({ message: "Pharmacist not found" });
    }
    res.status(200).json(pharmacist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePharmacistById = async (req, res) => {
  try {
    const { id } = req.params;
    const pharmacist = await pharmacistModel.findByIdAndDelete(id);
    if (!pharmacist) {
      return res.status(404).json({ message: "Pharmacist not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Pharmacist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerPharmacist,
  getPharmacistById,
  getAllPharmacists,
  updatePharmacistById,
  deletePharmacistById,
};
