const { userModel } = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { username, fname, lname, phone, email, dob, role, password } = req.body;
    const user = new userModel({
      username,
      fname,
      lname,
      phone,
      email,
      dob,
      role,
      password,
      status: "active",
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000 ) {
      res.status(400).json({ error: 'user is already registered.' });
    }
    else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await userModel.findById(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { fname, lname, phone, email, dob, role } = req.body;
    const user = await userModel.findByIdAndUpdate(id, {
      fname,
      lname,
      phone,
      email,
      dob,
      role,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
};
