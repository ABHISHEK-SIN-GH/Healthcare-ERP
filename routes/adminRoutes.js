const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.post('/', authenticateToken, roleAuthorization([ROLES.ADMIN]), adminController.registerAdmin);
router.get('/', authenticateToken, roleAuthorization([ROLES.ADMIN]), adminController.getAllAdmins);
router.get('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), adminController.getAdminById);
router.put('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), adminController.updateAdminById);
router.delete('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), adminController.deleteAdminById);

module.exports = router;