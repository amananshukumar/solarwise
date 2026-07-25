const express = require('express');
const router = express.Router();
const { getBatteryRecommendation, getBatteryModels } = require('../controllers/batteryController');

router.post('/recommend', getBatteryRecommendation);
router.get('/models', getBatteryModels);

module.exports = router;
