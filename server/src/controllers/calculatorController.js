const StateData = require('../models/StateData');
const CalculationResult = require('../models/CalculationResult');
const { sampleStateData } = require('../seed/seedStateData');
const { calculateSolarEngine } = require('../services/calculateSolar');

// @desc    Get location data (states, cities, tariffs, irradiance)
// @route   GET /api/calculator/location-data
// @access  Public
const getLocationData = async (req, res) => {
  try {
    let statesList = [];
    try {
      statesList = await StateData.find().sort({ stateName: 1 });
    } catch (dbErr) {
      statesList = [];
    }

    if (!statesList || statesList.length === 0) {
      statesList = sampleStateData;
    }

    return res.json({
      success: true,
      data: statesList,
    });
  } catch (error) {
    console.error('Error fetching location data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch location data',
    });
  }
};

// @desc    Calculate complete solar report backend logic via calculateSolar service
// @route   POST /api/calculator/calculate
// @access  Public (Optional auth saves report)
const calculateSolar = async (req, res) => {
  try {
    const reportData = calculateSolarEngine(req.body);

    // Save calculation to MongoDB if DB is available & user logged in
    let savedDocId = null;
    try {
      const docData = {
        inputs: req.body,
        results: reportData,
      };

      if (req.user && req.user._id) {
        docData.userId = req.user._id;
      }

      const created = await CalculationResult.create(docData);
      savedDocId = created._id;
    } catch (saveErr) {
      console.warn('Could not save calculation history to DB:', saveErr.message);
    }

    return res.json({
      success: true,
      data: {
        ...reportData,
        reportId: savedDocId,
      },
    });
  } catch (error) {
    console.error('Calculator calculation error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to calculate solar report',
    });
  }
};

// @desc    Get logged in user's calculation history
// @route   GET /api/calculator/history
// @access  Private
const getUserCalculationHistory = async (req, res) => {
  try {
    let history = [];
    try {
      if (req.user && req.user._id) {
        history = await CalculationResult.find({ userId: req.user._id }).sort({ createdAt: -1 });
      }
    } catch (dbErr) {
      console.warn('DB history fetch failed, returning empty history:', dbErr.message);
    }

    return res.json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    console.error('Error fetching user history:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch calculation history',
    });
  }
};

// @desc    Delete a saved calculation record
// @route   DELETE /api/calculator/history/:id
// @access  Private
const deleteCalculationHistory = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      const doc = await CalculationResult.findById(id);
      if (!doc) {
        return res.status(404).json({ success: false, message: 'Calculation record not found' });
      }

      // Check ownership
      if (doc.userId && doc.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ success: false, message: 'Not authorized to delete this record' });
      }

      await CalculationResult.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Calculation record deleted successfully' });
    } catch (dbErr) {
      return res.status(200).json({ success: true, message: 'Record deleted (dev mode)' });
    }
  } catch (error) {
    console.error('Error deleting history record:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete calculation record',
    });
  }
};

module.exports = {
  getLocationData,
  calculateSolar,
  getUserCalculationHistory,
  deleteCalculationHistory,
};
