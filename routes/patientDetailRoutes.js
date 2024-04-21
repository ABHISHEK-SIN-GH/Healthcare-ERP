const express = require('express');
const router = express.Router();
const patientDetailController = require('../controllers/patientDetailController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.get('/vitals/:uid', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.getVitals);
router.post('/vitals/', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.addVitals);
router.put('/vitals/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), patientDetailController.updateVitals);

module.exports = router;