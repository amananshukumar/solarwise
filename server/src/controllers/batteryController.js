const { calculateBatteryRecommendation } = require('../services/batteryRecommendation');
const BatteryModel = require('../models/BatteryModel');
const { sampleBatteries } = require('../seed/seedBatteriesAndPanels');

// @desc    Get AI Battery Storage Recommendation
// @route   POST /api/battery/recommend
// @access  Public
const getBatteryRecommendation = async (req, res) => {
  try {
    const result = await calculateBatteryRecommendation(req.body);
    return res.json(result);
  } catch (error) {
    console.error('Error in getBatteryRecommendation:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate battery recommendation: ' + error.message,
    });
  }
};

// @desc    Get all available Battery Models
// @route   GET /api/battery/models
// @access  Public
const getBatteryModels = async (req, res) => {
  try {
    let models = [];
    try {
      models = await BatteryModel.find();
    } catch (err) {
      models = sampleBatteries;
    }
    if (!models || models.length === 0) models = sampleBatteries;

    return res.json({
      success: true,
      count: models.length,
      data: models,
    });
  } catch (error) {
    console.error('Error in getBatteryModels:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch battery models',
    });
  }
};

module.exports = {
  getBatteryRecommendation,
  getBatteryModels,
};
