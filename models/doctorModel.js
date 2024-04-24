const mongoose = require("mongoose");
const { userModel } = require("./userModel");

const doctorSchema = new mongoose.Schema({
  regNo: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bloodGrp: {
    type: String,
    required: true,
  },
  design: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  depart: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const doctorModel = userModel.discriminator("Doctors", doctorSchema);

module.exports = { doctorModel };
