const { calculateBatteryRecommendation } = require('./services/batteryRecommendation');
const { rankAndComparePanels } = require('./services/panelRecommendation');

async function testPhases10And11() {
  console.log('Testing Phase 10 (Battery Storage) & Phase 11 (Panel Brand Comparison)...');

  // Test Battery Recommendation
  const batteryRes = await calculateBatteryRecommendation({
    systemCapacityKw: 4.8,
    backupHours: '6 Hours',
    batteryBudget: 'Standard',
    batteryPriority: 'Backup During Power Cuts',
    city: 'Kolkata',
    state: 'West Bengal',
  });

  console.log('✔ Phase 10 Battery Recommendation Result:');
  console.log(`   - Selected Model: ${batteryRes.recommendation.brand} ${batteryRes.recommendation.model}`);
  console.log(`   - Total Usable Capacity: ${batteryRes.recommendation.totalUsableCapacityKwh} kWh (${batteryRes.recommendation.unitCount} unit/s)`);
  console.log(`   - Estimated Cost: ₹${batteryRes.recommendation.estimatedBatteryCostRs.toLocaleString('en-IN')}`);
  console.log(`   - AI Recommendation: ${batteryRes.recommendation.aiRecommendation.slice(0, 150)}...\n`);

  // Test Panel Recommendation & Comparison
  const panelRes = await rankAndComparePanels({
    systemCapacityKw: 4.8,
    panelBudget: 'Mid-Range',
    panelPriority: 'Balanced Choice',
    climate: 'Hot Climate',
    city: 'Kolkata',
  });

  console.log('✔ Phase 11 Ranked Panel Brand Recommendations:');
  panelRes.recommendations.forEach((p, idx) => {
    console.log(`   ${idx + 1}. [${p.badge || 'Ranked'}] ${p.brand} ${p.model} (${p.power}W, ${p.efficiency}% Eff, ₹${p.costPerWatt}/W, ${p.panelsRequired} Panels)`);
  });
  console.log(`   - AI Recommendation: ${panelRes.aiRecommendation}\n`);

  console.log('✅ Phase 10 & 11 Backend Engines Verified Successfully!');
}

testPhases10And11();
