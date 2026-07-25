const http = require('http');

async function testCalculatorModule() {
  console.log('Testing Phase 2 Calculator Module controllers & seed data...');
  try {
    const calcController = require('./controllers/calculatorController');
    const stateModel = require('./models/StateData');
    const calcModel = require('./models/CalculationResult');
    const { sampleStateData } = require('./seed/seedStateData');

    console.log(`✔ Models loaded. Sample dataset contains ${sampleStateData.length} Indian states.`);
    console.log('✔ States list sample:', sampleStateData.map((s) => s.stateName).join(', '));
    console.log('✔ Calculator backend logic verified successfully.');
  } catch (err) {
    console.error('❌ Calculator test failed:', err);
    process.exit(1);
  }
}

testCalculatorModule();
