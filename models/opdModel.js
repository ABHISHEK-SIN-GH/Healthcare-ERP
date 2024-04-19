const mongoose = require("mongoose");
const { userModel } = require("./userModel");

const opdPatientSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
  },
  newPatient: {
    type: String,
    required: true,
  },
  opdIpd: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bloodGrp: {
    type: String,
    required: true,
  },
  bloodPressure: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  depart: {
    type: String,
    required: true,
  },
  consultant: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  charges: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const opdModel = userModel.discriminator("opdPatients", opdPatientSchema);

module.exports = { opdModel };
