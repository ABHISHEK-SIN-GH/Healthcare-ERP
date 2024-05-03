const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  allergies: {
    type: String
  },
  preExistingConditions: {
    type: String
  },
  medicationHistory: {
    type: String
  },
  surgicalHistory: {
    type: String
  },
  familyHistory: {
    type: String
  },
  status: {
    type: String,
    required: true,
  },
});

const patientModel = mongoose.model("PatientsRecords", patientSchema);

module.exports = { patientModel };
