const express = require('express');
const router = express.Router();
const pharmacistController = require('../controllers/pharmacistController');
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');

router.post('/', authenticateToken, roleAuthorization([ROLES.ADMIN]), pharmacistController.registerPharmacist);
router.get('/', authenticateToken, roleAuthorization([ROLES.ADMIN]), pharmacistController.getAllPharmacists);
router.get('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), pharmacistController.getPharmacistById);
router.put('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), pharmacistController.updatePharmacistById);
router.delete('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), pharmacistController.deletePharmacistById);

module.exports = router;