const express = require('express');
const router = express.Router();
const roofController = require('../controllers/roofController');

// POST /api/roof/analyze
router.post('/analyze', roofController.analyzeRoof);

module.exports = router;
