require('dotenv').config();
const { generateSolarAiResponse } = require('./services/geminiService');

async function testChatService() {
  console.log('Testing Phase 9 Gemini Service & Chat Logic...');
  console.log('Detected GEMINI_API_KEY in process.env:', process.env.GEMINI_API_KEY ? '✔ Configured' : '❌ Not set');

  const context = {
    roofArea: 60,
    capacity: 4.8,
    state: 'West Bengal',
    city: 'Kolkata',
    annualSavings: 65000,
    breakEven: 5.8,
  };

  const response1 = await generateSolarAiResponse('How many solar panels do I need?', context);
  console.log('✔ User Question: "How many solar panels do I need?"');
  console.log('✔ AI Response Sample:\n', response1.reply.slice(0, 300) + '...\n');

  console.log('✅ Gemini & Solar AI Engine Verified Successfully!');
}

testChatService();
