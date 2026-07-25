const mongoose = require('mongoose');

const calculationResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    inputs: {
      terraceLength: Number,
      terraceWidth: Number,
      state: String,
      city: String,
      monthlyBill: Number,
      electricityRate: Number,
      roofType: String,
      shadowLevel: String,
      panelType: String,
    },
    results: {
      totalRoofAreaSqFt: Number,
      usableRoofAreaSqFt: Number,
      recommendedKw: Number,
      monthlyUnitsGenerated: Number,
      annualUnitsGenerated: Number,
      grossSystemCost: Number,
      centralSubsidy: Number,
      netSystemCost: Number,
      monthlyBillSavings: Number,
      annualBillSavings: Number,
      paybackYears: Number,
      lifetimeSavings25Yr: Number,
      co2SavedTonsPerYear: Number,
      treesEquivalent: Number,
      cashFlow25Yr: [
        {
          year: Number,
          tariffRate: Number,
          annualSavings: Number,
          cumulativeSavings: Number,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CalculationResult', calculationResultSchema);
