const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
    },
    process.env.JWT_SECRET || 'solarwise_super_secret_jwt_key_2026_india',
    {
      expiresIn: '30d',
    }
  );
};

// In-memory fallback store for offline dev when MongoDB is not connected
const fallbackUsers = [];

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, state, monthlyBill } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    // Try MongoDB first
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email',
        });
      }

      const user = await User.create({
        name,
        email,
        password,
        state: state || 'Maharashtra',
        monthlyBill: monthlyBill || 0,
      });

      const token = generateToken(user);

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          state: user.state,
          monthlyBill: user.monthlyBill,
        },
      });
    } catch (dbErr) {
      // Fallback in-memory registration if Mongoose operation fails
      const existingInMemory = fallbackUsers.find((u) => u.email === email.toLowerCase());
      if (existingInMemory) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email',
        });
      }

      const newUser = {
        id: 'user_' + Date.now(),
        name,
        email: email.toLowerCase(),
        password, // In real DB this is hashed
        role: 'user',
        state: state || 'Maharashtra',
        monthlyBill: monthlyBill || 0,
      };
      fallbackUsers.push(newUser);

      const token = generateToken(newUser);

      return res.status(201).json({
        success: true,
        message: 'User registered successfully (Dev Mode)',
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          state: newUser.state,
          monthlyBill: newUser.monthlyBill,
        },
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration: ' + error.message,
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    try {
      const user = await User.findOne({ email }).select('+password');

      if (user && (await user.matchPassword(password))) {
        const token = generateToken(user);
        return res.json({
          success: true,
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            state: user.state,
            monthlyBill: user.monthlyBill,
          },
        });
      }
    } catch (dbErr) {
      // Check in-memory fallback
      const fbUser = fallbackUsers.find((u) => u.email === email.toLowerCase());
      if (fbUser && fbUser.password === password) {
        const token = generateToken(fbUser);
        return res.json({
          success: true,
          token,
          user: {
            id: fbUser.id,
            name: fbUser.name,
            email: fbUser.email,
            role: fbUser.role,
            state: fbUser.state,
            monthlyBill: fbUser.monthlyBill,
          },
        });
      }
    }

    // Default demo user fallback for testing out of box
    if (email === 'demo@solarwise.in' && password === 'solar123') {
      const demoUser = {
        id: 'demo_user_1',
        name: 'Rajesh Sharma',
        email: 'demo@solarwise.in',
        role: 'user',
        state: 'Maharashtra',
        monthlyBill: 4500,
      };
      const token = generateToken(demoUser);
      return res.json({
        success: true,
        token,
        user: demoUser,
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Check email and password.',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login: ' + error.message,
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    return res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
