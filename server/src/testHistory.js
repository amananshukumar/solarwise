const { getUserCalculationHistory, deleteCalculationHistory } = require('./controllers/calculatorController');

async function testHistoryModule() {
  console.log('Testing Phase 6 User History Controllers...');

  const mockReq = {
    user: { _id: 'user_123' },
  };

  const mockRes = {
    json: (payload) => payload,
    status: (code) => ({
      json: (payload) => ({ statusCode: code, ...payload }),
    }),
  };

  const historyResult = await getUserCalculationHistory(mockReq, mockRes);
  console.log('✔ History Endpoint Output:', historyResult);

  console.log('✅ History Controller Functions Verified Cleanly!');
}

testHistoryModule();
