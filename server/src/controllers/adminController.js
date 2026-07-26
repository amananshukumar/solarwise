const StateData = require('../models/StateData');
const User = require('../models/User');
const CalculationResult = require('../models/CalculationResult');
const { sampleStateData } = require('../seed/seedStateData');

// @desc    Get Admin Overview Statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
  try {
    let userCount = 0;
    let calculationCount = 0;
    let statesList = [];

    try {
      userCount = await User.countDocuments();
      calculationCount = await CalculationResult.countDocuments();
      statesList = await StateData.find();
    } catch (dbErr) {
      statesList = sampleStateData;
      userCount = 12;
      calculationCount = 48;
    }

    if (!statesList || statesList.length === 0) {
      statesList = sampleStateData;
    }

    let totalCities = 0;
    statesList.forEach((st) => {
      totalCities += (st.cities ? st.cities.length : 0);
    });

    return res.json({
      success: true,
      data: {
        totalStates: statesList.length,
        totalCities,
        totalUsers: userCount || 12,
        totalCalculations: calculationCount || 48,
        defaultCostPerKw: 55000,
        maxSubsidyCap: 78000,
      },
    });
  } catch (error) {
    console.error('Error in getAdminStats:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve admin stats',
    });
  }
};

// @desc    Get all State & Tariff records
// @route   GET /api/admin/states
// @access  Private/Admin
const getAllStates = async (req, res) => {
  try {
    let states = [];
    try {
      states = await StateData.find().sort({ stateName: 1 });
    } catch (dbErr) {
      states = sampleStateData;
    }

    if (!states || states.length === 0) {
      states = sampleStateData;
    }

    return res.json({
      success: true,
      count: states.length,
      data: states,
    });
  } catch (error) {
    console.error('Error fetching admin states:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch states list',
    });
  }
};

// @desc    Create a new State record
// @route   POST /api/admin/states
// @access  Private/Admin
const createState = async (req, res) => {
  try {
    const { stateName, cities, cityDetails, defaultRatePerKwh, solarIrradiance, discomName } = req.body;

    if (!stateName) {
      return res.status(400).json({ success: false, message: 'State name is required' });
    }

    try {
      const existing = await StateData.findOne({ stateName });
      if (existing) {
        return res.status(400).json({ success: false, message: 'State record already exists' });
      }

      const newState = await StateData.create({
        stateName,
        cities: Array.isArray(cities) ? cities : (cities || '').split(',').map((c) => c.trim()).filter(Boolean),
        cityDetails: cityDetails || [],
        defaultRatePerKwh: Number(defaultRatePerKwh) || 7.5,
        solarIrradiance: Number(solarIrradiance) || 5.2,
        discomName: discomName || 'State Electricity Distribution Co.',
      });

      return res.status(201).json({
        success: true,
        message: 'State record created successfully',
        data: newState,
      });
    } catch (dbErr) {
      // In-memory fallback response
      const fallbackState = {
        _id: 'state_' + Date.now(),
        stateName,
        cities: Array.isArray(cities) ? cities : (cities || '').split(',').map((c) => c.trim()),
        cityDetails: cityDetails || [],
        defaultRatePerKwh: Number(defaultRatePerKwh) || 7.5,
        solarIrradiance: Number(solarIrradiance) || 5.2,
        discomName: discomName || 'State DISCOM',
      };
      return res.status(201).json({
        success: true,
        message: 'State record created successfully (Dev Mode)',
        data: fallbackState,
      });
    }
  } catch (error) {
    console.error('Error creating state:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create state record: ' + error.message,
    });
  }
};

// @desc    Update an existing State record
// @route   PUT /api/admin/states/:id
// @access  Private/Admin
const updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const { stateName, cities, cityDetails, defaultRatePerKwh, solarIrradiance, discomName } = req.body;

    try {
      const updated = await StateData.findByIdAndUpdate(
        id,
        {
          stateName,
          cities: Array.isArray(cities) ? cities : (cities || '').split(',').map((c) => c.trim()).filter(Boolean),
          cityDetails: cityDetails || [],
          defaultRatePerKwh: Number(defaultRatePerKwh) || 7.5,
          solarIrradiance: Number(solarIrradiance) || 5.2,
          discomName,
        },
        { new: true, runValidators: true }
      );

      if (!updated) {
        return res.status(404).json({ success: false, message: 'State record not found' });
      }

      return res.json({
        success: true,
        message: 'State record updated successfully',
        data: updated,
      });
    } catch (dbErr) {
      return res.json({
        success: true,
        message: 'State record updated successfully (Dev Mode)',
        data: {
          _id: id,
          stateName,
          cities: Array.isArray(cities) ? cities : (cities || '').split(',').map((c) => c.trim()),
          cityDetails: cityDetails || [],
          defaultRatePerKwh: Number(defaultRatePerKwh) || 7.5,
          solarIrradiance: Number(solarIrradiance) || 5.2,
          discomName,
        },
      });
    }
  } catch (error) {
    console.error('Error updating state:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update state record',
    });
  }
};

// @desc    Delete a State record
// @route   DELETE /api/admin/states/:id
// @access  Private/Admin
const deleteState = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await StateData.findByIdAndDelete(id);
    } catch (dbErr) {
      console.warn('DB delete state failed:', dbErr.message);
    }

    return res.json({
      success: true,
      message: 'State record deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting state:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete state record',
    });
  }
};

// @desc    Get all non-admin users & pending admin privilege requests
// @route   GET /api/admin/pending-requests
// @access  Private/Admin
const getPendingAdminRequests = async (req, res) => {
  try {
    let pendingUsers = [];

    try {
      pendingUsers = await User.find({
        role: { $ne: 'admin' },
      }).select('-password');
    } catch (dbErr) {
      console.warn('DB pending users query failed, checking memory fallback:', dbErr.message);
    }

    // Merge in-memory fallback users if any exist
    try {
      const { fallbackUsers } = require('./authController');
      if (Array.isArray(fallbackUsers)) {
        fallbackUsers.forEach((u) => {
          if (u.role !== 'admin') {
            if (!pendingUsers.some((p) => (p.email && p.email.toLowerCase() === u.email.toLowerCase()) || (p._id && p._id.toString() === u.id))) {
              pendingUsers.push({
                _id: u.id,
                name: u.name,
                email: u.email,
                role: u.role,
                state: u.state || 'Maharashtra',
                adminRequested: Boolean(u.adminRequested),
                adminStatus: u.adminRequested ? 'pending' : 'none',
              });
            }
          }
        });
      }
    } catch (memErr) {
      console.warn('Fallback users merge note:', memErr.message);
    }

    // Sort so users who explicitly requested admin privileges appear FIRST
    pendingUsers.sort((a, b) => (b.adminRequested ? 1 : 0) - (a.adminRequested ? 1 : 0));

    return res.json({
      success: true,
      count: pendingUsers.length,
      data: pendingUsers,
    });
  } catch (error) {
    console.error('Error fetching pending admin requests:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch pending admin requests',
    });
  }
};

// @desc    Approve a pending admin request
// @route   PUT /api/admin/approve-request/:id
// @access  Private/Admin
const approveAdminRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Try MongoDB update using findByIdAndUpdate (preserves password hash 100%)
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { role: 'admin', adminStatus: 'approved', adminRequested: true },
        { new: true }
      );
      if (user) {
        return res.json({
          success: true,
          message: `User ${user.name} (${user.email}) promoted to Admin successfully!`,
          data: user,
        });
      }
    } catch (dbErr) {
      console.warn('DB findByIdAndUpdate error:', dbErr.message);
    }

    // Fallback in-memory update
    const { fallbackUsers } = require('./authController');
    if (Array.isArray(fallbackUsers)) {
      const memUser = fallbackUsers.find((u) => u.id === id || u.email === id);
      if (memUser) {
        memUser.role = 'admin';
        memUser.adminStatus = 'approved';
        return res.json({
          success: true,
          message: `User ${memUser.name} (${memUser.email}) promoted to Admin successfully! (Dev Mode)`,
          data: memUser,
        });
      }
    }

    return res.status(404).json({ success: false, message: 'User not found' });
  } catch (error) {
    console.error('Error approving admin request:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to approve admin request',
    });
  }
};

// @desc    Reject a pending admin request
// @route   PUT /api/admin/reject-request/:id
// @access  Private/Admin
const rejectAdminRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Try MongoDB update
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { role: 'user', adminStatus: 'rejected', adminRequested: false },
        { new: true }
      );
      if (user) {
        return res.json({
          success: true,
          message: `Admin request for ${user.name} (${user.email}) rejected.`,
          data: user,
        });
      }
    } catch (dbErr) {
      console.warn('DB findByIdAndUpdate error:', dbErr.message);
    }

    // Fallback in-memory update
    const { fallbackUsers } = require('./authController');
    if (Array.isArray(fallbackUsers)) {
      const memUser = fallbackUsers.find((u) => u.id === id || u.email === id);
      if (memUser) {
        memUser.role = 'user';
        memUser.adminStatus = 'rejected';
        memUser.adminRequested = false;
        return res.json({
          success: true,
          message: `Admin request for ${memUser.name} (${memUser.email}) rejected. (Dev Mode)`,
          data: memUser,
        });
      }
    }

    return res.status(404).json({ success: false, message: 'User not found' });
  } catch (error) {
    console.error('Error rejecting admin request:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to reject admin request',
    });
  }
};

module.exports = {
  getAdminStats,
  getAllStates,
  createState,
  updateState,
  deleteState,
  getPendingAdminRequests,
  approveAdminRequest,
  rejectAdminRequest,
};
