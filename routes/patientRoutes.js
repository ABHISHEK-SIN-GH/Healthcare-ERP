const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.post('/', authenticateToken, roleAuthorization([ROLES.DOCTOR]), patientController.registerPatient);
router.get('/', authenticateToken, roleAuthorization([ROLES.DOCTOR]), patientController.getAllPatients);
router.get('/:id', authenticateToken, roleAuthorization([ROLES.DOCTOR]), patientController.getPatientById);
router.put('/:id', authenticateToken, roleAuthorization([ROLES.DOCTOR]), patientController.updatePatientById);
router.delete('/:id', authenticateToken, roleAuthorization([ROLES.DOCTOR]), patientController.deletePatientById);

module.exports = router;