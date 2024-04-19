const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.post('/', authenticateToken, roleAuthorization([ROLES.ADMIN]), userController.registerUser);
router.get('/', authenticateToken, roleAuthorization([ROLES.ADMIN]), userController.getAllUsers);
router.get('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), userController.getUserById);
router.put('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), userController.updateUserById);
router.delete('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), userController.deleteUserById);

module.exports = router;