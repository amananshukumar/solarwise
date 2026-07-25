const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdminUser = async () => {
  const args = process.argv.slice(2);
  const email = args[0] || 'admin@solarwise.in';
  const password = args[1] || 'solar123';
  const name = args[2] || 'SolarWise Administrator';

  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/solarwise_india';
    console.log(`Connecting to MongoDB... (${mongoUri})`);
    
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('✔ Connected to MongoDB successfully.');

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      user.role = 'admin';
      await user.save();
      console.log(`✅ Success! Updated existing user "${email}" role to "admin".`);
    } else {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        role: 'admin',
        state: 'Maharashtra',
      });
      console.log(`✅ Success! Created new Admin User:`);
      console.log(`   - Name: ${user.name}`);
      console.log(`   - Email: ${user.email}`);
      console.log(`   - Role: ${user.role}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create admin user:', error.message);
    process.exit(1);
  }
};

createAdminUser();
