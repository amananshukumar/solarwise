const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

async function checkUsers() {
  console.log('--- Inspecting Users in MongoDB Atlas Database ---');

  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/solarwise_india';
  await mongoose.connect(mongoUri);
  console.log('✔ Connected to MongoDB');

  const users = await User.find({}).select('+password');
  console.log(`Found ${users.length} users in database:`);

  users.forEach((u, i) => {
    console.log(`${i + 1}. Name: "${u.name}" | Email: "${u.email}" | Role: "${u.role}" | AdminRequested: ${u.adminRequested} | AdminStatus: "${u.adminStatus}" | HasPasswordHash: ${Boolean(u.password)}`);
  });

  process.exit(0);
}

checkUsers().catch((err) => {
  console.error('❌ Check Error:', err);
  process.exit(1);
});
