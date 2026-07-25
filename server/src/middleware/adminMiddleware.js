const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.email === 'admin@solarwise.in' || req.user.email === 'demo@solarwise.in')) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied: Admin privileges required',
  });
};

module.exports = { adminOnly };
