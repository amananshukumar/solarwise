const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  getAllStates,
  createState,
  updateState,
  deleteState,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// Secure all admin routes with JWT protect + adminOnly check
router.use(protect, adminOnly);

router.get('/stats', getAdminStats);
router.get('/states', getAllStates);
router.post('/states', createState);
router.put('/states/:id', updateState);
router.delete('/states/:id', deleteState);

module.exports = router;
