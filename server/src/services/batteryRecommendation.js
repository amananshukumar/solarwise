const BatteryModel = require('../models/BatteryModel');
const { sampleBatteries } = require('../seed/seedBatteriesAndPanels');

const calculateBatteryRecommendation = async (inputs = {}) => {
  const systemKw = Number(inputs.systemCapacityKw || inputs.capacity || 4.4);
  const backupHoursStr = String(inputs.backupHours || '6 Hours');
  const budget = inputs.batteryBudget || 'Standard';
  const priority = inputs.batteryPriority || 'Backup During Power Cuts';
  const city = inputs.city || 'Mumbai';
  const state = inputs.state || 'Maharashtra';

  // 1. Determine backup hours numeric value
  let backupHours = 6;
  if (backupHoursStr.includes('2')) backupHours = 2;
  else if (backupHoursStr.includes('4')) backupHours = 4;
  else if (backupHoursStr.includes('6')) backupHours = 6;
  else if (backupHoursStr.includes('8')) backupHours = 8;
  else if (backupHoursStr.includes('Night') || backupHoursStr.includes('10')) backupHours = 10;

  // 2. Compute required usable kWh capacity
  // Rule of thumb: Average hourly residential essential load = ~0.6 to 1.2 kW per hour
  const hourlyEssentialLoadKw = Math.min(2.5, Math.max(0.6, systemKw * 0.22));
  const rawUsableRequiredKwh = Number((hourlyEssentialLoadKw * backupHours).toFixed(1));

  // 3. DoD adjustment (LiFePO4 DoD = 85%)
  const dod = 0.85;
  const rawNominalRequiredKwh = Number((rawUsableRequiredKwh / dod).toFixed(1));

  // 4. Query DB or Fallback for best matching battery model
  let availableBatteries = [];
  try {
    availableBatteries = await BatteryModel.find();
  } catch (err) {
    availableBatteries = sampleBatteries;
  }
  if (!availableBatteries || availableBatteries.length === 0) {
    availableBatteries = sampleBatteries;
  }

  // Filter or sort by capacity & budget
  let selectedModel = availableBatteries.find((b) => b.capacity >= rawNominalRequiredKwh);
  if (!selectedModel) {
    // Pick the highest capacity available or calculate multi-units
    selectedModel = availableBatteries[availableBatteries.length - 1];
  }

  const unitCount = Math.max(1, Math.ceil(rawNominalRequiredKwh / (selectedModel.capacity || 5)));
  const totalNominalCapacityKwh = Number((selectedModel.capacity * unitCount).toFixed(1));
  const totalUsableCapacityKwh = Number((selectedModel.usableCapacity * unitCount).toFixed(1));
  const totalBatteryCost = selectedModel.estimatedPrice * unitCount;
  const estimatedLifespanYears = selectedModel.lifespanYears || 15;
  const replacementYear = new Date().getFullYear() + estimatedLifespanYears;
  const roundTripEfficiency = selectedModel.roundTripEfficiency || 95;

  // Additional annual savings from self-consumption / peak shaving (approx ₹1,800/kWh/yr)
  const additionalAnnualSavingsRs = Math.round(totalUsableCapacityKwh * 1800);

  // AI Recommendation text summary
  const aiRecommendation = `Based on your ${systemKw} kW rooftop solar plant in ${city}, ${state} and your preference for ${backupHoursStr} of backup, a ${totalNominalCapacityKwh} kWh ${selectedModel.chemistry} battery system (${unitCount} × ${selectedModel.brand} ${selectedModel.model}) offers the best balance of safety, 25-year compounding returns, and uninterrupted power. This LFP battery is expected to last ~${estimatedLifespanYears} years under normal usage.`;

  return {
    success: true,
    inputs: {
      systemKw,
      backupHours: `${backupHours} Hours`,
      budget,
      priority,
    },
    recommendation: {
      brand: selectedModel.brand,
      model: selectedModel.model,
      chemistry: selectedModel.chemistry,
      voltage: selectedModel.voltage || 48,
      singleUnitCapacityKwh: selectedModel.capacity,
      singleUnitUsableKwh: selectedModel.usableCapacity,
      unitCount,
      totalNominalCapacityKwh,
      totalUsableCapacityKwh,
      roundTripEfficiency,
      warrantyYears: selectedModel.warrantyYears || 10,
      estimatedLifespanYears,
      estimatedReplacementYear: replacementYear,
      estimatedBatteryCostRs: totalBatteryCost,
      additionalAnnualSavingsRs,
      estimatedBackupTimeHours: backupHours,
      co2ReductionImprovementTons: Number((totalUsableCapacityKwh * 0.12).toFixed(2)),
      aiRecommendation,
      bestFor: selectedModel.bestFor,
    },
  };
};

module.exports = {
  calculateBatteryRecommendation,
};
