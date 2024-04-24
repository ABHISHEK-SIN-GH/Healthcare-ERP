const mongoose = require("mongoose");
const { userModel } = require("./userModel");

const frontdeskSchema = new mongoose.Schema({
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
  address: {
    type: String,
    required: true,
  },
});

const frontdeskModel = userModel.discriminator("Frontdesks", frontdeskSchema);

module.exports = { frontdeskModel };