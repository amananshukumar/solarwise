const express = require('express');
const router = express.Router();
const {
  getLocationData,
  calculateSolar,
  saveCalculation,
  getUserCalculationHistory,
  deleteCalculationHistory,
} = require('../controllers/calculatorController');
const { protect, optionalProtect } = require('../middleware/authMiddleware');

router.get('/location-data', getLocationData);
router.post('/calculate', optionalProtect, calculateSolar);
router.post('/save', optionalProtect, saveCalculation);

// Protected User History Routes
router.get('/history', optionalProtect, getUserCalculationHistory);
router.delete('/history/:id', protect, deleteCalculationHistory);

module.exports = router;
