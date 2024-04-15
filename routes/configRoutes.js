const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  upload.fields([
    { name: "HospitalIcon", maxCount: 1 },
    { name: "HospitalLogo", maxCount: 1 },
    { name: "HospitalStamp", maxCount: 1 },
  ]),
  configController.configHospitalInfo
);

module.exports = router;
