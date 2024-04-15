const express = require('express');
const router = express.Router();
const pharmacistController = require('../controllers/pharmacistController');
const authenticateToken = require('../auth/authMiddleware');

router.post('/', authenticateToken, pharmacistController.registerPharmacist);
router.get('/', authenticateToken, pharmacistController.getAllPharmacists);
router.get('/:id', authenticateToken, pharmacistController.getPharmacistById);
router.put('/:id', authenticateToken, pharmacistController.updatePharmacistById);
router.delete('/:id', authenticateToken, pharmacistController.deletePharmacistById);

module.exports = router;