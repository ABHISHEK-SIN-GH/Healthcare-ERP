const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurseController');
const authenticateToken = require('../auth/authMiddleware');

router.post('/', authenticateToken, nurseController.registerNurse);
router.get('/', authenticateToken, nurseController.getAllNurses);
router.get('/:id', authenticateToken, nurseController.getNurseById);
router.put('/:id', authenticateToken, nurseController.updateNurseById);
router.delete('/:id', authenticateToken, nurseController.deleteNurseById);

module.exports = router;