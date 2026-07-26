const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  getAllStates,
  createState,
  updateState,
  deleteState,
  getPendingAdminRequests,
  approveAdminRequest,
  rejectAdminRequest,
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

// Pending Admin Request Routes
router.get('/pending-requests', getPendingAdminRequests);
router.put('/approve-request/:id', approveAdminRequest);
router.put('/reject-request/:id', rejectAdminRequest);

module.exports = router;
