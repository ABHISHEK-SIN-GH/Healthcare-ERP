const mongoose = require("mongoose");
const { userModel } = require("./userModel");

const nurseSchema = new mongoose.Schema({
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
  depart: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const nurseModel = userModel.discriminator("Nurses", nurseSchema);

module.exports = { nurseModel };
