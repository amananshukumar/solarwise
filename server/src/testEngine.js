const { calculateSolarEngine } = require('./services/calculateSolar');

function runEngineTests() {
  console.log('Testing Phase 3 calculateSolar.js engine...');

  const inputPayload = {
    terraceLength: 30,
    terraceWidth: 20,
    state: 'Maharashtra',
    city: 'Mumbai',
    monthlyBill: 4500,
    electricityRate: 8.5,
    roofType: 'RCC',
    shadowLevel: 'None',
    panelType: 'Monocrystalline',
  };

  const output = calculateSolarEngine(inputPayload);

  console.log('✔ Roof Area:', output.roof.totalRoofAreaSqFt, 'sq.ft (', output.roof.usableRoofAreaSqM, 'm² usable)');
  console.log('✔ Recommended kW:', output.system.recommendedKw, 'kW');
  console.log('✔ Number of 550W Panels:', output.system.panelCount, 'panels');
  console.log('✔ Gross Cost:', '₹' + output.financial.grossInstallationCost.toLocaleString());
  console.log('✔ Central Subsidy:', '₹' + output.financial.centralSubsidy.toLocaleString());
  console.log('✔ Final Payable Amount:', '₹' + output.financial.finalPayableAmount.toLocaleString());
  console.log('✔ Annual Generation:', output.generation.annualGenerationKwh, 'kWh');
  console.log('✔ Annual Savings:', '₹' + output.generation.annualSavingsRs.toLocaleString());
  console.log('✔ Break-even Period:', output.financial.breakEvenYears, 'Years');
  console.log('✔ Annual CO2 Saved:', output.environmental.annualCo2SavedTons, 'Tons');
  console.log('✔ CO2 Saved Until Break-even:', output.environmental.co2SavedUntilBreakEvenTons, 'Tons');
  console.log('✔ Trees Equivalent:', output.environmental.treesEquivalent, 'trees/yr');
  console.log('✔ Cars Removed Equivalent:', output.environmental.carsRemovedEquivalent, 'cars/yr');
  console.log('✔ Coal Avoided:', output.environmental.coalAvoidedKg, 'kg coal/yr');
  console.log('✔ 25-Year Cumulative Savings:', '₹' + output.lifetime.total25YearSavings.toLocaleString());
  console.log('✔ Lifetime ROI:', output.lifetime.roiPercentage + '%');
  console.log('✔ Roof Suitability Score:', output.suitability.score + '/100 (' + output.suitability.rating + ')');

  console.log('\n✅ All Phase 3 calculations executed successfully!');
}

runEngineTests();
