const express = require('express');
const router = express.Router();
const pharmacistController = require('../controllers/pharmacistController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.post('/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), pharmacistController.registerPharmacist);
router.get('/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), pharmacistController.getAllPharmacists);
router.get('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), pharmacistController.getPharmacistById);
router.put('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), pharmacistController.updatePharmacistById);
router.delete('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), pharmacistController.deletePharmacistById);

module.exports = router;