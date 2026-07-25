const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'solarwise_super_secret_jwt_key_2026_india');

      // Attempt to find user in MongoDB
      try {
        req.user = await User.findById(decoded.id).select('-password');
      } catch (dbErr) {
        // Fallback user state if DB is offline or mock user
        req.user = {
          _id: decoded.id,
          name: decoded.name || 'Solar User',
          email: decoded.email || 'user@solarwise.in',
          role: decoded.role || 'user',
        };
      }

      if (!req.user) {
        req.user = {
          _id: decoded.id,
          name: decoded.name || 'Solar User',
          email: decoded.email || 'user@solarwise.in',
          role: decoded.role || 'user',
        };
      }

      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token validation failed',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
    });
  }
};

module.exports = { protect };
