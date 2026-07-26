const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

async function resetPassword() {
  const args = process.argv.slice(2);
  const email = args[0];
  const newPassword = args[1];
  const newRole = args[2] || 'admin';

  if (!email || !newPassword) {
    console.log('Usage: node src/resetPassword.js <email> <newPassword> [role]');
    process.exit(1);
  }

  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/solarwise_india';
  await mongoose.connect(mongoUri);
  console.log('✔ Connected to MongoDB');

  let user = await User.findOne({ email: email.toLowerCase() });

  if (user) {
    user.password = newPassword;
    user.role = newRole;
    user.adminRequested = true;
    user.adminStatus = 'approved';
    await user.save();
    console.log(`✅ Success! Updated password & role to "${newRole}" for user "${email}".`);
  } else {
    user = await User.create({
      name: 'Admin User',
      email: email.toLowerCase(),
      password: newPassword,
      role: newRole,
      state: 'Maharashtra',
      adminRequested: true,
      adminStatus: 'approved',
    });
    console.log(`✅ Success! Created new "${newRole}" user for "${email}".`);
  }

  process.exit(0);
}

resetPassword().catch((err) => {
  console.error('❌ Reset Password Error:', err.message);
  process.exit(1);
});
