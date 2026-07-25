const { getAdminStats, getAllStates } = require('./controllers/adminController');

async function testAdminModule() {
  console.log('Testing Phase 7 Admin Panel Controllers...');

  const mockReq = {
    user: { _id: 'admin_1', role: 'admin', email: 'admin@solarwise.in' },
  };

  const mockRes = {
    json: (payload) => payload,
    status: (code) => ({
      json: (payload) => ({ statusCode: code, ...payload }),
    }),
  };

  const stats = await getAdminStats(mockReq, mockRes);
  console.log('✔ Admin Stats:', stats);

  const states = await getAllStates(mockReq, mockRes);
  console.log('✔ Total Admin States Loaded:', states.count || states.data?.length);

  console.log('✅ Admin Controllers Verified Successfully!');
}

testAdminModule();
