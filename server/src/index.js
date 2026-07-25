const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const calculatorRoutes = require('./routes/calculatorRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const { seedStateData } = require('./seed/seedStateData');

// Load environment variables
dotenv.config();

// Connect to Database & Seed Initial State Data
connectDB().then(() => {
  seedStateData();
});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('CORS Policy restriction for this origin'), false);
    },
    credentials: true,
  })
);

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    app: 'SolarWise India API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/calculator', calculatorRoutes);
app.use('/api/weather', weatherRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint Not Found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[SolarWise Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
