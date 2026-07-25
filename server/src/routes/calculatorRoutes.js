const express = require('express');
const router = express.Router();
const {
  getLocationData,
  calculateSolar,
  getUserCalculationHistory,
  deleteCalculationHistory,
} = require('../controllers/calculatorController');
const { protect } = require('../middleware/authMiddleware');

router.get('/location-data', getLocationData);
router.post('/calculate', calculateSolar);

// Protected User History Routes
router.get('/history', protect, getUserCalculationHistory);
router.delete('/history/:id', protect, deleteCalculationHistory);

module.exports = router;
