const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authenticateToken = require('../auth/authMiddleware');

router.post('/', authenticateToken, doctorController.registerDoctor);
router.get('/', authenticateToken, doctorController.getAllDoctors);
router.get('/:id', authenticateToken, doctorController.getDoctorById);
router.put('/:id', authenticateToken, doctorController.updateDoctorById);
router.delete('/:id', authenticateToken, doctorController.deleteDoctorById);

module.exports = router;