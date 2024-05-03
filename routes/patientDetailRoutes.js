const express = require('express');
const router = express.Router();
const patientDetailController = require('../controllers/patientDetailController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.get('/procedures/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.getProcedures);
router.post('/procedures/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.addProcedures);
router.put('/procedures/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.updateProcedures);


router.get('/vitals/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.getVitals);
router.post('/vitals/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.addVitals);
router.put('/vitals/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.updateVitals);

router.get('/blood-glucoses/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.getBloodGlucoses);
router.post('/blood-glucoses/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.addBloodGlucoses);
router.put('/blood-glucoses/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.updateBloodGlucoses);

router.get('/blood-transfusions/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.getBloodTransfusions);
router.post('/blood-transfusions/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.addBloodTransfusions);
router.put('/blood-transfusions/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.updateBloodTransfusions);

router.get('/io-charts/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.getIOCharts);
router.post('/io-charts/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.addIOCharts);
router.put('/io-charts/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.updateIOCharts);

router.get('/treatments/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.getTreatments);
router.post('/treatments/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.addTreatments);
router.put('/treatments/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.updateTreatments);

router.get('/medications/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.getMedications);
router.post('/medications/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.addMedications);
router.put('/medications/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.updateMedications);

router.get('/visits/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.getVisits);
router.post('/visits/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.addVisits);
router.put('/visits/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.updateVisits);

router.get('/notes/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.getNotes);
router.post('/notes/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.addNotes);
router.put('/notes/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), patientDetailController.updateNotes);

module.exports = router;