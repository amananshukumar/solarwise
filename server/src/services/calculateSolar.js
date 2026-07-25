/**
 * Solar Calculation Engine Service for SolarWise India
 * Phase 3 - Modular business logic for solar potential, financial ROI,
 * PM Surya Ghar subsidies, and environmental impact metrics.
 */

// Input Validation Helper
const validateSolarInputs = (inputs = {}) => {
  const errors = [];
  const lengthFt = Number(inputs.terraceLength);
  const widthFt = Number(inputs.terraceWidth);
  const monthlyBill = Number(inputs.monthlyBill);
  const electricityRate = Number(inputs.electricityRate);

  if (isNaN(lengthFt) || lengthFt < 1) errors.push('Terrace length must be a positive number');
  if (isNaN(widthFt) || widthFt < 1) errors.push('Terrace width must be a positive number');
  if (isNaN(monthlyBill) || monthlyBill < 100) errors.push('Monthly bill must be at least ₹100');
  if (isNaN(electricityRate) || electricityRate < 0.5) errors.push('Electricity rate must be at least ₹0.5/kWh');

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// 1. Calculate Roof Metrics (Area in sq ft & sq meters, Usable Area 80% rule & shadow factor)
const calculateRoofMetrics = (lengthFt, widthFt, shadowLevel = 'None') => {
  const totalRoofAreaSqFt = lengthFt * widthFt;
  const totalRoofAreaSqM = totalRoofAreaSqFt * 0.092903; // 1 sq ft = 0.092903 sq m

  // Standard 80% usable roof area rule
  const baseUsableAreaSqFt = totalRoofAreaSqFt * 0.80;
  const baseUsableAreaSqM = totalRoofAreaSqM * 0.80;

  // Shadow Level Adjustment
  let shadowMultiplier = 1.0;
  if (shadowLevel === 'Low') shadowMultiplier = 0.90;
  if (shadowLevel === 'Medium') shadowMultiplier = 0.75;
  if (shadowLevel === 'High') shadowMultiplier = 0.55;

  const usableRoofAreaSqFt = baseUsableAreaSqFt * shadowMultiplier;
  const usableRoofAreaSqM = baseUsableAreaSqM * shadowMultiplier;

  return {
    totalRoofAreaSqFt: Math.round(totalRoofAreaSqFt),
    totalRoofAreaSqM: Number(totalRoofAreaSqM.toFixed(2)),
    usableRoofAreaSqFt: Math.round(usableRoofAreaSqFt),
    usableRoofAreaSqM: Number(usableRoofAreaSqM.toFixed(2)),
    shadowLevel,
    shadowMultiplier,
  };
};

// 2. Calculate System Capacity & 550W Panel Count
const calculateSystemCapacity = (usableAreaSqM, monthlyBill, electricityRate) => {
  // Requirement 1: Recommended System Size (1 kW per 10 m² usable area)
  const maxKwByArea = usableAreaSqM / 10.0;

  // Requirement 2: Bill based recommended size (1 kW = ~120 kWh/mo)
  const monthlyUnitsNeeded = monthlyBill / electricityRate;
  const requiredKwByBill = monthlyUnitsNeeded / 120;

  // Select optimal capacity (clamped min 1 kW, rounded to 1 decimal place)
  let recommendedKw = Math.min(maxKwByArea, requiredKwByBill);
  recommendedKw = Math.max(1.0, Math.round(recommendedKw * 10) / 10);

  // Number of 550W Panels required
  // 550W = 0.55 kW per panel
  const panelWattageW = 550;
  const panelCount = Math.ceil((recommendedKw * 1000) / panelWattageW);

  return {
    recommendedKw,
    panelWattageW,
    panelCount,
    monthlyUnitsNeeded: Math.round(monthlyUnitsNeeded),
  };
};

// 3. Calculate Financials (Installation cost ₹55,000/kW, PM Surya Ghar subsidy, payable amount)
const calculateFinancials = (recommendedKw, panelType = 'Monocrystalline', roofType = 'RCC') => {
  // Base installation cost: ₹55,000 / kW
  let costPerKw = 55000;
  if (panelType === 'Polycrystalline') costPerKw = 48000;

  let roofMultiplier = 1.0;
  if (roofType === 'RCC') roofMultiplier = 1.02; // Elevated mounting
  if (roofType === 'Tile') roofMultiplier = 1.04;

  const grossInstallationCost = Math.round(recommendedKw * costPerKw * roofMultiplier);

  // Central Subsidy Rules (PM Surya Ghar Scheme)
  // 1 kW = ₹30,000; 2 kW = ₹60,000; 3 kW and above = ₹78,000 max
  let centralSubsidy = 0;
  if (recommendedKw < 1.5) {
    centralSubsidy = 30000;
  } else if (recommendedKw < 2.5) {
    centralSubsidy = 60000;
  } else {
    centralSubsidy = 78000;
  }

  const finalPayableAmount = Math.max(0, grossInstallationCost - centralSubsidy);

  return {
    costPerKw,
    grossInstallationCost,
    centralSubsidy,
    finalPayableAmount,
  };
};

// 4. Calculate Electricity Generation, Savings & Break-even
const calculateGenerationAndSavings = (recommendedKw, electricityRate, averageSunshineHours = 5.5) => {
  // Daily generation = System kW * sunshine hours * 0.80 performance ratio
  const dailyGenerationKwh = recommendedKw * averageSunshineHours * 0.80;
  const annualGenerationKwh = Math.round(dailyGenerationKwh * 365);
  const monthlyGenerationKwh = Math.round(annualGenerationKwh / 12);

  // Savings math
  const annualSavingsRs = Math.round(annualGenerationKwh * electricityRate);
  const monthlySavingsRs = Math.round(annualSavingsRs / 12);

  return {
    averageSunshineHours,
    dailyGenerationKwh: Number(dailyGenerationKwh.toFixed(2)),
    monthlyGenerationKwh,
    annualGenerationKwh,
    monthlySavingsRs,
    annualSavingsRs,
  };
};

// 5. Calculate Environmental Impact Metrics
const calculateEnvironmentalImpact = (annualGenerationKwh, breakEvenYears) => {
  // Annual CO2 reduction (0.82 kg / kWh)
  const annualCo2SavedKg = annualGenerationKwh * 0.82;
  const annualCo2SavedTons = Number((annualCo2SavedKg / 1000).toFixed(2));

  // CO2 saved until break-even
  const co2SavedUntilBreakEvenKg = Math.round(annualCo2SavedKg * breakEvenYears);
  const co2SavedUntilBreakEvenTons = Number((co2SavedUntilBreakEvenKg / 1000).toFixed(2));

  // Equivalencies:
  // 1 Tree absorbs ~20 kg CO2 / year
  const treesEquivalent = Math.round(annualCo2SavedKg / 20);

  // 1 Passenger Car emits ~2,300 kg CO2 / year
  const carsRemovedEquivalent = Number((annualCo2SavedKg / 2300).toFixed(2));

  // Coal avoided: 1 kWh = ~0.40 kg coal
  const coalAvoidedKg = Math.round(annualGenerationKwh * 0.40);

  return {
    annualCo2SavedKg: Math.round(annualCo2SavedKg),
    annualCo2SavedTons,
    co2SavedUntilBreakEvenKg,
    co2SavedUntilBreakEvenTons,
    treesEquivalent,
    carsRemovedEquivalent,
    coalAvoidedKg,
  };
};

// 6. Calculate 25-Year Lifetime ROI & Cash Flow
const calculateLifetimeROI = (finalPayableAmount, annualSavingsRs, electricityRate) => {
  let currentTariff = electricityRate;
  let cumulativeSavings = -finalPayableAmount;
  const cashFlow25Yr = [];

  for (let yr = 1; yr <= 25; yr++) {
    const yrSavings = Math.round(annualSavingsRs * Math.pow(1.05, yr - 1) * Math.pow(0.995, yr - 1));
    cumulativeSavings += yrSavings;

    cashFlow25Yr.push({
      year: yr,
      tariffRate: Number((currentTariff * Math.pow(1.05, yr - 1)).toFixed(2)),
      annualSavings: yrSavings,
      cumulativeSavings: Math.round(cumulativeSavings),
    });
  }

  const total25YearSavings = cashFlow25Yr[24].cumulativeSavings;
  const totalGrossReturns = cashFlow25Yr.reduce((acc, curr) => acc + curr.annualSavings, 0);

  // Return on Investment % = ((Gross Returns - Final Payable) / Final Payable) * 100
  const roiPercentage = Number((((totalGrossReturns - finalPayableAmount) / (finalPayableAmount || 1)) * 100).toFixed(1));

  return {
    total25YearSavings,
    totalGrossReturns,
    roiPercentage,
    cashFlow25Yr,
  };
};

// 7. Calculate Roof Suitability Score (0 to 100)
const calculateRoofSuitabilityScore = (usableAreaSqM, shadowLevel, recommendedKw) => {
  let score = 100;

  // Area deduction
  if (usableAreaSqM < 20) score -= 15;
  if (usableAreaSqM < 10) score -= 25;

  // Shadow deduction
  if (shadowLevel === 'Low') score -= 10;
  if (shadowLevel === 'Medium') score -= 25;
  if (shadowLevel === 'High') score -= 45;

  score = Math.max(20, Math.min(100, score));

  let rating = 'Excellent';
  if (score < 85) rating = 'Good';
  if (score < 70) rating = 'Moderate';
  if (score < 50) rating = 'Suboptimal';

  return {
    score,
    rating,
  };
};

// Master Function: calculateSolarEngine
const calculateSolarEngine = (inputData = {}) => {
  const validation = validateSolarInputs(inputData);
  if (!validation.isValid) {
    throw new Error(validation.errors.join(', '));
  }

  const lengthFt = Number(inputData.terraceLength);
  const widthFt = Number(inputData.terraceWidth);
  const monthlyBill = Number(inputData.monthlyBill);
  const electricityRate = Number(inputData.electricityRate);
  const shadowLevel = inputData.shadowLevel || 'None';
  const panelType = inputData.panelType || 'Monocrystalline';
  const roofType = inputData.roofType || 'RCC';
  const averageSunshineHours = Number(inputData.averageSunshineHours) || 5.5;

  // Execute modular calculations
  const roof = calculateRoofMetrics(lengthFt, widthFt, shadowLevel);
  const system = calculateSystemCapacity(roof.usableRoofAreaSqM, monthlyBill, electricityRate);
  const financial = calculateFinancials(system.recommendedKw, panelType, roofType);
  const generation = calculateGenerationAndSavings(system.recommendedKw, electricityRate, averageSunshineHours);

  // Break-even period
  const breakEvenYears = Number((financial.finalPayableAmount / (generation.annualSavingsRs || 1)).toFixed(1));

  const env = calculateEnvironmentalImpact(generation.annualGenerationKwh, breakEvenYears);
  const lifetime = calculateLifetimeROI(financial.finalPayableAmount, generation.annualSavingsRs, electricityRate);
  const suitability = calculateRoofSuitabilityScore(roof.usableRoofAreaSqM, shadowLevel, system.recommendedKw);

  return {
    inputs: {
      terraceLengthFt: lengthFt,
      terraceWidthFt: widthFt,
      state: inputData.state || 'Maharashtra',
      city: inputData.city || 'Mumbai',
      monthlyBill,
      electricityRate,
      roofType,
      shadowLevel,
      panelType,
      averageSunshineHours,
    },
    roof,
    system,
    financial: {
      ...financial,
      breakEvenYears,
    },
    generation,
    environmental: env,
    lifetime,
    suitability,
  };
};

module.exports = {
  validateSolarInputs,
  calculateRoofMetrics,
  calculateSystemCapacity,
  calculateFinancials,
  calculateGenerationAndSavings,
  calculateEnvironmentalImpact,
  calculateLifetimeROI,
  calculateRoofSuitabilityScore,
  calculateSolarEngine,
};
