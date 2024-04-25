const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.get('/all/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientController.getAllPatients);

router.post('/opd/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientController.registerOPDPatient);
router.get('/opd/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientController.getAllOPDPatients);
router.get('/opd/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientController.getOPDPatientById);
router.put('/opd/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientController.updateOPDPatientById);
router.delete('/opd/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientController.deleteOPDPatientById);

router.post('/ipd/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientController.registerIPDPatient);
router.get('/ipd/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientController.getAllIPDPatients);
router.get('/ipd/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientController.getIPDPatientById);
router.put('/ipd/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientController.updateIPDPatientById);
router.delete('/ipd/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientController.deleteIPDPatientById);

module.exports = router;