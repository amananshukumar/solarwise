const express = require('express');
const router = express.Router();
const {
  getLocationData,
  calculateSolar,
  saveCalculation,
  getUserCalculationHistory,
  deleteCalculationHistory,
} = require('../controllers/calculatorController');
const { protect } = require('../middleware/authMiddleware');

router.get('/location-data', getLocationData);
router.post('/calculate', calculateSolar);

// Protected User History Routes
router.post('/save', protect, saveCalculation);
router.get('/history', protect, getUserCalculationHistory);
router.delete('/history/:id', protect, deleteCalculationHistory);

module.exports = router;
