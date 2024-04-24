const { adminModel } = require("../models/adminModel");

const registerAdmin = async (req, res) => {
  try {
    const {
      username,
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
    } = req.body;

    const admin = new adminModel({
      username,
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
      role: "admin",
      status: "active",
    });

    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    if (error.code === 11000 ) {
      res.status(400).json({ error: 'user is already registered.' });
    }
    else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admins = await adminModel.findById(id);
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
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
    } = req.body;
    const admin = await adminModel.findByIdAndUpdate(id, {
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      bloodGrp,
      password,
      design,
      qualification
    });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminModel.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerAdmin,
  getAdminById,
  getAllAdmins,
  updateAdminById,
  deleteAdminById,
};
