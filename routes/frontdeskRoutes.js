const express = require('express');
const router = express.Router();
const frontdeskController = require('../controllers/frontdeskController');
const authenticateToken = require('../auth/authMiddleware');

router.post('/', authenticateToken, frontdeskController.registerFrontdesk);
router.get('/', authenticateToken, frontdeskController.getAllFrontdesks);
router.get('/:id', authenticateToken, frontdeskController.getFrontdeskById);
router.put('/:id', authenticateToken, frontdeskController.updateFrontdeskById);
router.delete('/:id', authenticateToken, frontdeskController.deleteFrontdeskById);

module.exports = router;