const { frontdeskModel } = require("../models/frontdeskModel");

const frontdesks = ["frontdesk1", "frontdesk2"];

const registerFrontdesk = async (req, res) => {
  try {
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
      address,
    } = req.body;

    const frontdesk = new frontdeskModel({
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
      role: "frontdesk",
      status: "active",
    });

    await frontdesk.save();
    res.status(201).json(frontdesk);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getFrontdeskById = async (req, res) => {
  try {
    const { id } = req.params;
    const frontdesk = await frontdeskModel.findById(id);
    res.status(200).json(frontdesk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllFrontdesks = async (req, res) => {
  try {
    const frontdesks = await frontdeskModel.find();
    res.status(200).json(frontdesks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFrontdeskById = async (req, res) => {
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
      address,
    } = req.body;
    const frontdesk = await frontdeskModel.findByIdAndUpdate(id, {
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
    if (!frontdesk) {
      return res.status(404).json({ message: "Frontdesk not found" });
    }
    res.status(200).json(frontdesk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFrontdeskById = async (req, res) => {
  try {
    const { id } = req.params;
    const frontdesk = await frontdeskModel.findByIdAndDelete(id);
    if (!frontdesk) {
      return res.status(404).json({ message: "Frontdesk not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Frontdesk deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerFrontdesk,
  getFrontdeskById,
  getAllFrontdesks,
  updateFrontdeskById,
  deleteFrontdeskById,
};
