const StateData = require('../models/StateData');
const CalculationResult = require('../models/CalculationResult');
const { sampleStateData } = require('../seed/seedStateData');
const { calculateSolarEngine } = require('../services/calculateSolar');

// In-memory history buffer for dev/offline mode
let mockSavedHistory = [];

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

    const docData = {
      inputs: req.body,
      results: reportData,
      createdAt: new Date(),
    };

    if (req.user && req.user._id) {
      docData.userId = req.user._id;
    }

    // Always push to in-memory fallback
    const memoryRecord = {
      _id: 'calc_' + Date.now(),
      ...docData,
    };
    mockSavedHistory.unshift(memoryRecord);

    let savedDocId = memoryRecord._id;
    try {
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

// @desc    Explicitly save calculation report to user's MongoDB history
// @route   POST /api/calculator/save
// @access  Private / Optional Auth
const saveCalculation = async (req, res) => {
  try {
    const { inputs, results } = req.body;

    const docData = {
      inputs: inputs || results?.inputs || {},
      results: results || {},
      createdAt: new Date(),
      userId: req.user ? req.user._id : null,
    };

    const memoryRecord = {
      _id: 'calc_' + Date.now(),
      ...docData,
    };

    // Store in mock memory
    mockSavedHistory.unshift(memoryRecord);

    let createdDoc = memoryRecord;
    try {
      createdDoc = await CalculationResult.create(docData);
    } catch (dbErr) {
      console.warn('DB Save fallback warning:', dbErr.message);
    }

    return res.json({
      success: true,
      message: 'Solar calculation report saved to account successfully!',
      data: createdDoc,
    });
  } catch (error) {
    console.error('Error saving calculation report:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save calculation report',
    });
  }
};

// @desc    Get logged in user's calculation history
// @route   GET /api/calculator/history
// @access  Private / Optional Auth
const getUserCalculationHistory = async (req, res) => {
  try {
    let history = [];
    try {
      if (req.user && req.user._id) {
        history = await CalculationResult.find({
          $or: [{ userId: req.user._id }, { userId: null }],
        }).sort({ createdAt: -1 });
      } else {
        history = await CalculationResult.find().sort({ createdAt: -1 });
      }
    } catch (dbErr) {
      console.warn('DB history fetch failed, returning memory history:', dbErr.message);
    }

    if ((!history || history.length === 0) && mockSavedHistory.length > 0) {
      history = mockSavedHistory;
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
    mockSavedHistory = mockSavedHistory.filter((item) => item._id !== id);

    try {
      const doc = await CalculationResult.findById(id);
      if (doc) {
        await CalculationResult.findByIdAndDelete(id);
      }
    } catch (dbErr) {
      // Ignored in offline mode
    }

    return res.json({ success: true, message: 'Calculation record deleted successfully' });
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
  saveCalculation,
  getUserCalculationHistory,
  deleteCalculationHistory,
};
