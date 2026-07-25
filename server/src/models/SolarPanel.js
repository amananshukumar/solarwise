const mongoose = require('mongoose');

const SolarPanelSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    cellTechnology: { type: String, required: true }, // e.g. "Monocrystalline PERC", "TOPCon", "HJT", "Polycrystalline"
    efficiency: { type: Number, required: true }, // Efficiency %
    power: { type: Number, required: true }, // Power Output (Watts, e.g., 550W, 575W, 600W)
    pricePerPanel: { type: Number, required: true }, // Price per panel (₹)
    temperatureCoefficient: { type: Number, default: -0.35 }, // % / °C
    warrantyProduct: { type: Number, default: 12 }, // Product Warranty (Years)
    warrantyPerformance: { type: Number, default: 25 }, // Performance Warranty (Years)
    dimensions: { type: String, default: '2278 × 1134 × 35 mm' },
    weight: { type: Number, default: 27.5 }, // kg
    degradationRate: { type: Number, default: 0.55 }, // % per year
    country: { type: String, default: 'India' },
    bestFor: { type: String, default: 'High Yield Residential & Commercial' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SolarPanel', SolarPanelSchema);
