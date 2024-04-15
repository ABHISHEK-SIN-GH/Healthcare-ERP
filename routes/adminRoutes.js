const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../auth/authMiddleware');

router.post('/', authenticateToken, adminController.registerAdmin);
router.get('/', authenticateToken, adminController.getAllAdmins);
router.get('/:id', authenticateToken, adminController.getAdminById);
router.put('/:id', authenticateToken, adminController.updateAdminById);
router.delete('/:id', authenticateToken, adminController.deleteAdminById);

module.exports = router;