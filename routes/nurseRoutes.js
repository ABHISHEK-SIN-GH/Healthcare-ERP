const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurseController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.post('/', authenticateToken, roleAuthorization([ROLES.ADMIN]), nurseController.registerNurse);
router.get('/', authenticateToken, roleAuthorization([ROLES.ADMIN]), nurseController.getAllNurses);
router.get('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), nurseController.getNurseById);
router.put('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), nurseController.updateNurseById);
router.delete('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), nurseController.deleteNurseById);

module.exports = router;