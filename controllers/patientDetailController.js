const {
  patientVitalsModel,
  patientBloodGlucosesModel,
  patientBloodTransfusionsModel,
  patientIOChartsModel,
  patientTreatmentsModel,
  patientMedicationsModel,
  patientVisitsModel,
  patientNotesModel,
} = require("../models/patientDetailModel");

const getVitals = async (req, res) => {
  try {
    const { uid } = req.params;
    const patient = await patientVitalsModel.find({patientId:uid});
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addVitals = async (req, res) => {
  try {
    const { patientId, patientVitals } = req.body;
    const patient = new patientVitalsModel({ patientId, patientVitals });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVitals = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, patientVitals } = req.body;
    const patient = await patientVitalsModel.findByIdAndUpdate(id, {
      patientId,
      patientVitals,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBloodGlucoses = async (req, res) => {
  try {
    const { patientId, patientBloodGlucoses } = req.body;
    const patient = new patientBloodGlucosesModel({
      patientId,
      patientBloodGlucoses,
    });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBloodGlucoses = async (req, res) => {
  try {
    const { id, patientId, patientBloodGlucoses } = req.body;
    const patient = await patientBloodGlucosesModel.findByIdAndUpdate(id, {
      patientId,
      patientBloodGlucoses,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBloodTransfusions = async (req, res) => {
  try {
    const { patientId, patientBloodTransfusions } = req.body;
    const patient = new patientBloodTransfusionsModel({
      patientId,
      patientBloodTransfusions,
    });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBloodTransfusions = async (req, res) => {
  try {
    const { id, patientId, patientBloodTransfusions } = req.body;
    const patient = await patientBloodTransfusionsModel.findByIdAndUpdate(id, {
      patientId,
      patientBloodTransfusions,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addIOCharts = async (req, res) => {
  try {
    const { patientId, patientIOCharts } = req.body;
    const patient = new patientIOChartsModel({ patientId, patientIOCharts });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateIOCharts = async (req, res) => {
  try {
    const { id, patientId, patientIOCharts } = req.body;
    const patient = await patientIOChartsModel.findByIdAndUpdate(id, {
      patientId,
      patientIOCharts,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTreatments = async (req, res) => {
  try {
    const { patientId, patientTreatments } = req.body;
    const patient = new patientTreatmentsModel({
      patientId,
      patientTreatments,
    });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTreatments = async (req, res) => {
  try {
    const { id, patientId, patientTreatments } = req.body;
    const patient = await patientTreatmentsModel.findByIdAndUpdate(id, {
      patientId,
      patientTreatments,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMedications = async (req, res) => {
  try {
    const { patientId, patientMedications } = req.body;
    const patient = new patientMedicationsModel({
      patientId,
      patientMedications,
    });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMedications = async (req, res) => {
  try {
    const { id, patientId, patientMedications } = req.body;
    const patient = await patientMedicationsModel.findByIdAndUpdate(id, {
      patientId,
      patientMedications,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addVisits = async (req, res) => {
  try {
    const { patientId, patientVisits } = req.body;
    const patient = new patientVisitsModel({ patientId, patientVisits });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVisits = async (req, res) => {
  try {
    const { id, patientId, patientVisits } = req.body;
    const patient = await patientVisitsModel.findByIdAndUpdate(id, {
      patientId,
      patientVisits,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addNotes = async (req, res) => {
  try {
    const { patientId, patientNotes } = req.body;
    const patient = new patientNotesModel({ patientId, patientNotes });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNotes = async (req, res) => {
  try {
    const { id, patientId, patientNotes } = req.body;
    const patient = await patientNotesModel.findByIdAndUpdate(id, {
      patientId,
      patientNotes,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getVitals,
  addVitals,
  updateVitals,
  addBloodGlucoses,
  updateBloodGlucoses,
  addBloodTransfusions,
  updateBloodTransfusions,
  addIOCharts,
  updateIOCharts,
  addTreatments,
  updateTreatments,
  addMedications,
  updateMedications,
  addVisits,
  updateVisits,
  addNotes,
  updateNotes,
};
