const roofAnalysisService = require('./services/roofAnalysisService');

async function testPhase13() {
  console.log('--- Testing Phase 13 AI Roof Analysis Engine ---');

  // Test Heuristic Fallback
  const fallback = roofAnalysisService.generateFallbackRoofAnalysis(25.5941, 85.1376);
  console.log('[Test Fallback Output]:', JSON.stringify(fallback, null, 2));

  if (!fallback.roofType || !fallback.recommendedCapacityKW || typeof fallback.roofSuitability !== 'number') {
    throw new Error('Fallback roof analysis structure invalid!');
  }

  // Test Vision Analysis
  const sampleBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  const result = await roofAnalysisService.analyzeRoofImage(sampleBase64, 'image/png', 25.5941, 85.1376);
  console.log('[Test Vision Output]:', JSON.stringify(result, null, 2));

  if (result.roofType && typeof result.roofSuitability === 'number') {
    console.log('✅ Phase 13 AI Roof Analysis Test Passed 100%');
  } else {
    throw new Error('Phase 13 AI Roof Analysis test failed!');
  }
}

testPhase13().catch((err) => {
  console.error('❌ Phase 13 Test Error:', err);
  process.exit(1);
});
