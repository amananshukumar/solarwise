const express = require('express');
const router = express.Router();
const {
  getPanelRecommendations,
  getPanelsComparison,
  getAllPanels,
} = require('../controllers/panelController');

router.get('/', getAllPanels);
router.post('/recommend', getPanelRecommendations);
router.get('/compare', getPanelsComparison);

module.exports = router;
