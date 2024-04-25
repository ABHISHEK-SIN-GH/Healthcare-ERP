const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadImage } = require("../controllers/uploadImageController");
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads/patients");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/patients");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.payload);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  authenticateToken,
  roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]),
  upload.fields([{ name: "patientImage", maxCount: 1 }]),
  uploadImage
);

module.exports = router;
