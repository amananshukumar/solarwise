const SolarPanel = require('../models/SolarPanel');
const { samplePanels } = require('../seed/seedBatteriesAndPanels');

const rankAndComparePanels = async (inputs = {}) => {
  const systemKw = Number(inputs.systemCapacityKw || inputs.capacity || 4.4);
  const budget = inputs.panelBudget || 'Mid-Range';
  const priority = inputs.panelPriority || 'Balanced Choice';
  const climate = inputs.climate || 'Normal';
  const city = inputs.city || 'Kolkata';

  let panels = [];
  try {
    panels = await SolarPanel.find();
  } catch (err) {
    panels = samplePanels;
  }
  if (!panels || panels.length === 0) {
    panels = samplePanels;
  }

  // Score each panel
  const scoredPanels = panels.map((panel) => {
    const panelsRequired = Math.ceil((systemKw * 1000) / panel.power);
    const totalCost = panelsRequired * panel.pricePerPanel;
    const costPerWatt = Number((panel.pricePerPanel / panel.power).toFixed(2));

    let score = 70;

    // Efficiency bonus
    score += (panel.efficiency - 20) * 8;

    // Temperature coefficient bonus (lower negative is better for hot climate)
    if (climate === 'Hot Climate' || climate === 'Humid') {
      score += Math.abs(panel.temperatureCoefficient) < 0.32 ? 10 : 0;
    }

    // Warranty bonus
    score += panel.warrantyPerformance >= 30 ? 8 : panel.warrantyPerformance >= 25 ? 5 : 0;

    // Priority adjustments
    if (priority === 'Lowest Cost') {
      score += (35 - costPerWatt) * 2;
    } else if (priority === 'Highest Efficiency') {
      score += panel.efficiency * 2;
    } else if (priority === 'Longest Warranty') {
      score += panel.warrantyPerformance * 1.5;
    }

    // Budget adjustments
    if (budget === 'Economy' && costPerWatt < 30) score += 8;
    if (budget === 'Premium' && panel.efficiency > 22) score += 10;

    return {
      _id: panel._id,
      brand: panel.brand,
      model: panel.model,
      cellTechnology: panel.cellTechnology,
      efficiency: panel.efficiency,
      power: panel.power,
      pricePerPanel: panel.pricePerPanel,
      costPerWatt,
      temperatureCoefficient: panel.temperatureCoefficient,
      warrantyProduct: panel.warrantyProduct,
      warrantyPerformance: panel.warrantyPerformance,
      degradationRate: panel.degradationRate,
      dimensions: panel.dimensions,
      weight: panel.weight,
      country: panel.country,
      bestFor: panel.bestFor,
      panelsRequired,
      totalCost,
      suitabilityScore: Math.min(99, Math.max(60, Math.round(score))),
    };
  });

  // Sort descending by score
  scoredPanels.sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  // Assign Badges to Top 3
  if (scoredPanels.length > 0) scoredPanels[0].badge = 'Best Value';
  if (scoredPanels.length > 1) {
    // Find highest efficiency or assign Highest Efficiency badge
    const highestEff = [...scoredPanels].sort((a, b) => b.efficiency - a.efficiency)[0];
    if (highestEff) highestEff.badge = 'Highest Efficiency';
  }
  if (scoredPanels.length > 2 && !scoredPanels[2].badge) {
    scoredPanels[2].badge = 'Longest Warranty';
  }

  const top3 = scoredPanels.slice(0, 3);
  const bestBrand = top3[0]?.brand || 'LONGi / Waaree';

  const aiRecommendation = `For your ${systemKw} kW rooftop solar system in ${city} with a ${budget} budget, ${top3[0]?.brand || 'Waaree'} and ${top3[1]?.brand || 'LONGi'} provide the best overall performance. They feature high efficiency (${top3[0]?.efficiency}%), robust temperature coefficients, and up to ${top3[0]?.warrantyPerformance}-year performance warranties.`;

  return {
    success: true,
    systemKw,
    recommendations: top3,
    allPanels: scoredPanels,
    aiRecommendation,
  };
};

module.exports = {
  rankAndComparePanels,
};
