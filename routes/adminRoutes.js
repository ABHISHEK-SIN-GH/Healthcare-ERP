const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.post('/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), adminController.registerAdmin);
router.get('/', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), adminController.getAllAdmins);
router.get('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), adminController.getAdminById);
router.put('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), adminController.updateAdminById);
router.delete('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN,ROLES.DOCTOR,ROLES.NURSE,ROLES.FRONTDESK,ROLES.PHARMACIST]), adminController.deleteAdminById);

module.exports = router;