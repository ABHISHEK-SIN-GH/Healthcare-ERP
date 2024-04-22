const express = require('express');
const router = express.Router();
const patientDetailController = require('../controllers/patientDetailController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.get('/vitals/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.getVitals);
router.post('/vitals/', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.addVitals);
router.put('/vitals/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.updateVitals);

router.get('/blood-glucoses/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.getBloodGlucoses);
router.post('/blood-glucoses/', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.addBloodGlucoses);
router.put('/blood-glucoses/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.updateBloodGlucoses);

router.get('/blood-transfusions/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.getBloodTransfusions);
router.post('/blood-transfusions/', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.addBloodTransfusions);
router.put('/blood-transfusions/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.updateBloodTransfusions);

router.get('/io-charts/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.getIOCharts);
router.post('/io-charts/', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.addIOCharts);
router.put('/io-charts/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.updateIOCharts);

router.get('/treatments/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.getTreatments);
router.post('/treatments/', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.addTreatments);
router.put('/treatments/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.updateTreatments);

router.get('/medications/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.getMedications);
router.post('/medications/', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.addMedications);
router.put('/medications/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.updateMedications);

router.get('/visits/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.getVisits);
router.post('/visits/', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.addVisits);
router.put('/visits/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.updateVisits);

router.get('/notes/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.getNotes);
router.post('/notes/', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.addNotes);
router.put('/notes/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.updateNotes);

module.exports = router;