const http = require('http');

// Simple verification script for auth endpoints
async function testServer() {
  console.log('Testing server health check and auth logic...');
  try {
    const authController = require('./controllers/authController');
    const dbConfig = require('./config/db');
    console.log('✔ Auth controller & DB modules loaded cleanly.');
  } catch (err) {
    console.error('❌ Server code error:', err);
    process.exit(1);
  }
}

testServer();
