const { rankAndComparePanels } = require('../services/panelRecommendation');
const SolarPanel = require('../models/SolarPanel');
const { samplePanels } = require('../seed/seedBatteriesAndPanels');

// @desc    Get top solar panel recommendations
// @route   POST /api/panels/recommend
// @access  Public
const getPanelRecommendations = async (req, res) => {
  try {
    const result = await rankAndComparePanels(req.body);
    return res.json(result);
  } catch (error) {
    console.error('Error in getPanelRecommendations:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to rank solar panels: ' + error.message,
    });
  }
};

// @desc    Get all panels for side-by-side comparison matrix
// @route   GET /api/panels/compare
// @access  Public
const getPanelsComparison = async (req, res) => {
  try {
    const result = await rankAndComparePanels(req.query);
    return res.json(result);
  } catch (error) {
    console.error('Error in getPanelsComparison:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate comparison matrix',
    });
  }
};

// @desc    Get raw panel list
// @route   GET /api/panels
// @access  Public
const getAllPanels = async (req, res) => {
  try {
    let panels = [];
    try {
      panels = await SolarPanel.find();
    } catch (err) {
      panels = samplePanels;
    }
    if (!panels || panels.length === 0) panels = samplePanels;

    return res.json({
      success: true,
      count: panels.length,
      data: panels,
    });
  } catch (error) {
    console.error('Error in getAllPanels:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch panels list',
    });
  }
};

module.exports = {
  getPanelRecommendations,
  getPanelsComparison,
  getAllPanels,
};
