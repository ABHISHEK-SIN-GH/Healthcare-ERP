const mongoose = require("mongoose");
const { userModel } = require("./userModel");

const adminSchema = new mongoose.Schema({
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
});

const adminModel = userModel.discriminator("Admins", adminSchema);

module.exports = { adminModel };
