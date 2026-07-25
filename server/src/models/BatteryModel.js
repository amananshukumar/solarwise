const mongoose = require('mongoose');

const BatteryModelSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    chemistry: { type: String, required: true }, // e.g. "LiFePO4 (LFP)" or "NMC" or "Lead-Acid Gel"
    capacity: { type: Number, required: true }, // Total Capacity (kWh)
    usableCapacity: { type: Number, required: true }, // Usable Capacity (kWh) at DoD
    voltage: { type: Number, default: 48 }, // Operating Voltage (V)
    roundTripEfficiency: { type: Number, default: 95 }, // Efficiency %
    lifespanYears: { type: Number, default: 12 },
    cycles: { type: Number, default: 6000 },
    warrantyYears: { type: Number, default: 10 },
    estimatedPrice: { type: Number, required: true }, // Estimated Price (₹)
    bestFor: { type: String, default: 'Standard Backup & Residential Solar' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BatteryModel', BatteryModelSchema);
