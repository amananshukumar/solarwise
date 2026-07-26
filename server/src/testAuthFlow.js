const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

async function testAuthFlow() {
  console.log('--- Testing Registration & Login Flow in MongoDB ---');

  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/solarwise_india';
  await mongoose.connect(mongoUri);
  console.log('✔ Connected to MongoDB');

  const testEmail = `test_flow_${Date.now()}@solarwise.in`;
  const testPassword = 'Password123!';

  console.log(`1. Creating Test User: ${testEmail}`);
  const newUser = await User.create({
    name: 'Flow Tester',
    email: testEmail.trim().toLowerCase(),
    password: testPassword,
    state: 'Maharashtra',
  });

  console.log('✔ User created in MongoDB:', newUser._id);

  console.log('2. Querying User back with .select("+password")...');
  const fetchedUser = await User.findOne({ email: testEmail.trim().toLowerCase() }).select('+password');

  if (!fetchedUser) {
    throw new Error('User not found in MongoDB after creation!');
  }

  console.log('3. Testing matchPassword()...');
  const isMatch = await fetchedUser.matchPassword(testPassword);
  console.log('  Password Match Result:', isMatch);

  if (isMatch) {
    console.log('✅ Auth Flow Verification PASSED 100%');
  } else {
    throw new Error('Password hash match failed!');
  }

  // Cleanup test user
  await User.deleteOne({ _id: newUser._id });
  console.log('✔ Cleaned up test user.');
  process.exit(0);
}

testAuthFlow().catch((err) => {
  console.error('❌ Auth Flow Verification Failed:', err);
  process.exit(1);
});
