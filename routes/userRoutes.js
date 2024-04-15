const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../auth/authMiddleware');

router.post('/', authenticateToken, userController.registerUser);
router.get('/', authenticateToken, userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.put('/:id', authenticateToken, userController.updateUserById);
router.delete('/:id', authenticateToken, userController.deleteUserById);

module.exports = router;