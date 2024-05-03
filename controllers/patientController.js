const { ipdModel } = require("../models/ipdModel");
const { opdModel } = require("../models/opdModel");
const { patientModel } = require("../models/patientModel");

const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerOPDPatient = async (req, res) => {
  try {
    const {
      username,
      password,
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      address,
      newPatient,
      opdIpd,
      bloodGrp,
      bloodPressure,
      height,
      weight,
      symptoms,
      depart,
      consultant,
      notes,
      charges,
      paymentMethod,
    } = req.body;

    const patient = new opdModel({
      username,
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      address,
      newPatient,
      opdIpd,
      bloodGrp,
      bloodPressure,
      height,
      weight,
      symptoms,
      depart,
      consultant,
      notes,
      charges,
      paymentMethod,
      password: dob,
      role: "patient",
      status: "active",
    });

    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    if (error.code === 11000 ) {
      res.status(400).json({ error: 'user is already registered.' });
    }
    else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};

const getOPDPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const opds = await opdModel.findById(id);
    res.status(200).json(opds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOPDPatients = async (req, res) => {
  try {
    const opds = await opdModel.find();
    res.status(200).json(opds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOPDPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      address,
      newPatient,
      opdIpd,
      bloodGrp,
      bloodPressure,
      height,
      weight,
      symptoms,
      depart,
      consultant,
      notes,
      charges,
      paymentMethod, } = req.body;
    const opd = await opdModel.findByIdAndUpdate(id, {
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      address,
      newPatient,
      opdIpd,
      bloodGrp,
      bloodPressure,
      height,
      weight,
      symptoms,
      depart,
      consultant,
      notes,
      charges,
      paymentMethod,
    });
    if (!opd) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(opd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOPDPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const opd = await opdModel.findByIdAndDelete(id);
    if (!opd) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerIPDPatient = async (req, res) => {
  try {
    const {
      username,
      password,
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      address,
      newPatient,
      opdIpd,
      bloodGrp,
      bloodPressure,
      height,
      weight,
      symptoms,
      depart,
      consultant,
      attendingConsultant,
      ward,
      bed,
      notes,
      charges,
      paymentMethod,
    } = req.body;

    const patient = new ipdModel({
      username,
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      address,
      newPatient,
      opdIpd,
      bloodGrp,
      bloodPressure,
      height,
      weight,
      symptoms,
      depart,
      consultant,
      attendingConsultant,
      ward,
      bed,
      notes,
      charges,
      paymentMethod,
      password: dob,
      role: "patient",
      status: "active",
    });

    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    if (error.code === 11000 ) {
      res.status(400).json({ error: 'user is already registered.' });
    }
    else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};

const getIPDPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const ipds = await ipdModel.findById(id);
    res.status(200).json(ipds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllIPDPatients = async (req, res) => {
  try {
    const ipds = await ipdModel.find();
    res.status(200).json(ipds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateIPDPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      address,
      newPatient,
      opdIpd,
      bloodGrp,
      bloodPressure,
      height,
      weight,
      symptoms,
      depart,
      consultant,
      attendingConsultant,
      ward,
      bed,
      notes,
      charges,
      paymentMethod, } = req.body;
    const ipd = await ipdModel.findByIdAndUpdate(id, {
      fname,
      lname,
      phone,
      email,
      dob,
      gender,
      address,
      newPatient,
      opdIpd,
      bloodGrp,
      bloodPressure,
      height,
      weight,
      symptoms,
      depart,
      consultant,
      attendingConsultant,
      ward,
      bed,
      notes,
      charges,
      paymentMethod,
    });
    if (!ipd) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(ipd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteIPDPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const ipd = await ipdModel.findByIdAndDelete(id);
    if (!ipd) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPatients,
  registerOPDPatient,
  getOPDPatientById,
  getAllOPDPatients,
  updateOPDPatientById,
  deleteOPDPatientById,
  registerIPDPatient,
  getIPDPatientById,
  getAllIPDPatients,
  updateIPDPatientById,
  deleteIPDPatientById,
};
