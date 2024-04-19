const express = require('express');
const router = express.Router();
const authenticateToken = require('../auth/authMiddleware');
const roleAuthorization = require('../auth/authRole');
const ROLES = require('../constant');
const medicineController = require('../controllers/medicineController');

router.post('/', authenticateToken, roleAuthorization([ROLES.ADMIN]), medicineController.registerMedicine);
router.get('/', authenticateToken, roleAuthorization([ROLES.ADMIN]),  medicineController.getAllMedicines);
router.get('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), medicineController.getMedicineById);
router.put('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), medicineController.updateMedicineById);
router.delete('/:id', authenticateToken, roleAuthorization([ROLES.ADMIN]), medicineController.deleteMedicineById);

module.exports = router;