const mongoose = require("mongoose");

const patientProceduresSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  patientProcedures: {
    type: String,
    required: true,
  },
});

const patientVitalsSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  patientVitals: {
    type: String,
    required: true,
  },
});

const patientBloodGlucosesSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  patientBloodGlucoses: {
    type: String,
    required: true,
  },
});

const patientBloodTransfusionsSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  patientBloodTransfusions: {
    type: String,
    required: true,
  },
});

const patientIOChartsSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  patientIOCharts: {
    type: String,
    required: true,
  },
});

const patientTreatmentsSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  patientTreatments: {
    type: String,
    required: true,
  },
});

const patientMedicationsSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  patientMedications: {
    type: String,
    required: true,
  },
});

const patientVisitsSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  patientVisits: {
    type: String,
    required: true,
  },
});

const patientNotesSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  patientNotes: {
    type: String,
    required: true,
  },
});

const patientProceduresModel = mongoose.model(
  "patientProcedures",
  patientProceduresSchema
);
const patientVitalsModel = mongoose.model(
  "patientVitals",
  patientVitalsSchema
);
const patientBloodGlucosesModel = mongoose.model(
  "patientBloodGlucoses",
  patientBloodGlucosesSchema
);
const patientBloodTransfusionsModel = mongoose.model(
  "patientBloodTransfusions",
  patientBloodTransfusionsSchema
);
const patientIOChartsModel = mongoose.model(
  "patientIOCharts",
  patientIOChartsSchema
);
const patientTreatmentsModel = mongoose.model(
  "patientTreatments",
  patientTreatmentsSchema
);
const patientMedicationsModel = mongoose.model(
  "patientMedications",
  patientMedicationsSchema
);
const patientVisitsModel = mongoose.model(
  "patientVisits",
  patientVisitsSchema
);
const patientNotesModel = mongoose.model(
  "patientNotes",
  patientNotesSchema
);

module.exports = {
  patientProceduresModel,
  patientVitalsModel,
  patientBloodGlucosesModel,
  patientBloodTransfusionsModel,
  patientIOChartsModel,
  patientTreatmentsModel,
  patientMedicationsModel,
  patientVisitsModel,
  patientNotesModel,
};
