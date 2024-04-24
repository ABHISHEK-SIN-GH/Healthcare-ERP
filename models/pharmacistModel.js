const mongoose = require("mongoose");
const { userModel } = require("./userModel");

const pharmacistSchema = new mongoose.Schema({
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
  address: {
    type: String,
    required: true,
  },
});

const pharmacistModel = userModel.discriminator("Pharmacists", pharmacistSchema);

module.exports = { pharmacistModel };
