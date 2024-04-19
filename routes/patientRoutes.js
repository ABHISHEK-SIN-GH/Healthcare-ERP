const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.get('/all/', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientController.getAllPatients);

router.post('/opd/', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientController.registerOPDPatient);
router.get('/opd/', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientController.getAllOPDPatients);
router.get('/opd/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientController.getOPDPatientById);
router.put('/opd/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientController.updateOPDPatientById);
router.delete('/opd/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientController.deleteOPDPatientById);

router.post('/ipd/', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientController.registerIPDPatient);
router.get('/ipd/', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientController.getAllIPDPatients);
router.get('/ipd/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientController.getIPDPatientById);
router.put('/ipd/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientController.updateIPDPatientById);
router.delete('/ipd/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientController.deleteIPDPatientById);

module.exports = router;