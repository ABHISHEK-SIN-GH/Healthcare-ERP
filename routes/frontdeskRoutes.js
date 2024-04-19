const express = require('express');
const router = express.Router();
const frontdeskController = require('../controllers/frontdeskController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.post('/', authenticateToken, roleAuthorization([ROLES.ADMIN]), frontdeskController.registerFrontdesk);
router.get('/', authenticateToken, roleAuthorization([ROLES.ADMIN]), frontdeskController.getAllFrontdesks);
router.get('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), frontdeskController.getFrontdeskById);
router.put('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), frontdeskController.updateFrontdeskById);
router.delete('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), frontdeskController.deleteFrontdeskById);

module.exports = router;