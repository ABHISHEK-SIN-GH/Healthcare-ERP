const express = require('express');
const router = express.Router();
const frontdeskController = require('../controllers/frontdeskController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.post('/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), frontdeskController.registerFrontdesk);
router.get('/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), frontdeskController.getAllFrontdesks);
router.get('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), frontdeskController.getFrontdeskById);
router.put('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), frontdeskController.updateFrontdeskById);
router.delete('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), frontdeskController.deleteFrontdeskById);

module.exports = router;