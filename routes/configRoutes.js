const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");
const multer = require("multer");
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

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

router.get(
  "/",
  authenticateToken, 
  roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]),
  configController.getHospitalInfo
);

router.post(
  "/",
  authenticateToken, 
  roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]),
  upload.fields([
    { name: "HospitalIcon", maxCount: 1 },
    { name: "HospitalLogo", maxCount: 1 },
    { name: "HospitalStamp", maxCount: 1 },
  ]),
  configController.configHospitalInfo
);

router.put(
  "/:id",
  authenticateToken, 
  roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]),
  upload.fields([
    { name: "HospitalIcon", maxCount: 1 },
    { name: "HospitalLogo", maxCount: 1 },
    { name: "HospitalStamp", maxCount: 1 },
  ]),
  configController.updateHospitalInfo
);

module.exports = router;
