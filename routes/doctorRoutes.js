const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.post('/', authenticateToken, roleAuthorization([ROLES.ADMIN]), doctorController.registerDoctor);
router.get('/', authenticateToken, roleAuthorization([ROLES.ADMIN]), doctorController.getAllDoctors);
router.get('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), doctorController.getDoctorById);
router.put('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), doctorController.updateDoctorById);
router.delete('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), doctorController.deleteDoctorById);

module.exports = router;