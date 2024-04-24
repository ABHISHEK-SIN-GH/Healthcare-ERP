const { medicineModel } = require("../models/medicineModel");

const registerMedicine = async (req, res) => {
  try {

    const {
      name,
      category,
      brand,
      buyPrice,
      sellPrice,
      sideEffect,
      description,
    } = req.body;

    const medicine = new medicineModel({
      name,
      category,
      brand,
      buyPrice,
      sellPrice,
      sideEffect,
      description,
      status: "active",
    });

    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    if (error.code === 11000 ) {
      res.status(400).json({ error: 'medicine is already registered.' });
    }
    else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};

const getMedicineById = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await medicineModel.findById(id);
    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMedicines = async (req, res) => {
  try {
    const medicines = await medicineModel.find();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMedicineById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      brand,
      buyPrice,
      sellPrice,
      sideEffect,
      description,
    } = req.body;
    const medicine = await medicineModel.findByIdAndUpdate(id, {
      name,
      category,
      brand,
      buyPrice,
      sellPrice,
      sideEffect,
      description,
    });
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMedicineById = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await medicineModel.findByIdAndDelete(id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerMedicine,
  getMedicineById,
  getAllMedicines,
  updateMedicineById,
  deleteMedicineById,
};
